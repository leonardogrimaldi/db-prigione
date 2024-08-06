'use server'
import pool from "../../utils/postgres"
import { Cella, CellaSchema, Detenuto, DetenutoSchema, Registro, RegistroSchema, Trasferimento_Letto, Trasferimento_Letto_Schema } from "../../lib/types";
import z from "zod";
import { PoolClient } from "pg";
async function aggiornaPostiOccupati(c: Cella, client: PoolClient) {
    const postiOccupati =
    `
    SELECT COUNT(data_entrata) as occupanti
    FROM trasferimento_letto
    WHERE id_blocco = $1 AND id_piano = $2 AND id_cella = $3 AND data_uscita IS NULL;
    `
    const aggiornaPosti =
        `
    UPDATE cella
    SET posti_occupati = $1
    WHERE id_blocco = $2 AND id_piano = $3 AND id_cella = $4;
    `
    try {
        const res = await client.query(postiOccupati, [c.id_blocco, c.id_piano, c.id_cella])
        await client.query(aggiornaPosti, [z.string().parse(res.rows[0].occupanti), c.id_blocco, c.id_piano, c.id_cella])
    } catch(e) {
        console.log(e)
    }
}

export async function nuovoDetenuto(state: any, formData: FormData) {
    const client = await pool.connect()
    const insertDetenuto =
        `
    INSERT INTO detenuto (nome, cognome, data_di_nascita, carta_di_identita, altezza)
    VALUES ($1, $2, $3, $4, $5)
    `
    const insertRegistro =
        `
    INSERT INTO registro_detenzione (carta_di_identita, inizio_detenzione, fine_detenzione)
    VALUES ($1, $2, $3);
    `
    const insertTrasferimento =
        `
    INSERT INTO trasferimento_letto (data_entrata, id_blocco, id_piano, id_cella, inizio_detenzione, carta_di_identita)
    VALUES ($1, $2, $3, $4, $5, $6);
    `
    try {
        const detenuto: Detenuto = DetenutoSchema.parse({
            nome: formData.get('nome'),
            cognome: formData.get('cognome'),
            data_di_nascita: formData.get('data_di_nascita'),
            carta_di_identita: formData.get('carta_di_identita'),
            altezza: formData.get('altezza')
        })
        const registro: Registro = RegistroSchema.parse({
            carta_di_identita: detenuto.carta_di_identita,
            inizio_detenzione: formData.get('inizio_detenzione'),
            fine_detenzione: formData.get('fine_detenzione')
        })
        /**
         * Faccio il parse della stringa cella che l'utente invia, che sarà di tipo "A,3,1"
         *  A: id_blocco
         *  3: id_piano
         *  1: id_cella
         */
        const parsedCellaCSV = formData.get('cella')?.toString().split(',')
        if (parsedCellaCSV == undefined || parsedCellaCSV.length !== 3) {
            throw new TypeError("Il valore della cella non è corretto")
        }
        const cella: Cella = CellaSchema.parse({
            id_blocco: parsedCellaCSV[0],
            id_piano: parsedCellaCSV[1],
            id_cella: parsedCellaCSV[2]
        })
        const trasferimento: Trasferimento_Letto = Trasferimento_Letto_Schema.parse({
            data_entrata: registro.inizio_detenzione
        })
        await client.query('BEGIN')
        await client.query(insertDetenuto, Object.values(detenuto))
        await client.query(insertRegistro, Object.values(registro))
        const values = [trasferimento.data_entrata, Object.values(cella), registro.inizio_detenzione, registro.carta_di_identita].flat()
        console.log(values)
        await client.query(insertTrasferimento, values)
        aggiornaPostiOccupati(cella, client)
        await client.query('COMMIT')
        return { message: "Il detenuto è stato aggiunto" }
    } catch (e) {
        await client.query('ROLLBACK')
        console.log(e)
        return { error: e }
    }
}

export async function getCells() {
    const client = await pool.connect()
    const res = await client.query<Cella>(
        `
        SELECT cella.id_cella, cella.id_piano, cella.id_blocco 
        FROM cella
        WHERE posti_occupati < num_letti AND tipo = 'letto'
        `
    )

    return res.rows
}

export interface DetenutoPresente {
    CDI: string,
    Nome: string,
    Inizio: string,
    Fine: string,
    Cella: string,
    Deceduto: boolean
}
export async function getDetenutiPresenti() {
    console.log("XD")
    const client = await pool.connect()
    const res = await client.query<DetenutoPresente>(
        `
        SELECT d.carta_di_identita AS "CDI", d.nome AS "Nome", r.inizio_detenzione AS "Inizio", r.fine_detenzione AS "Fine", CONCAT(t.id_blocco, t.id_piano, '-', t.id_cella) AS "Cella", d.deceduto AS "Deceduto"
        FROM registro_detenzione r 
        JOIN detenuto d ON r.carta_di_identita = d.carta_di_identita
        JOIN trasferimento_letto t ON r.inizio_detenzione = t.inizio_detenzione AND r.carta_di_identita = t.carta_di_identita
        WHERE NOW() BETWEEN r.inizio_detenzione AND r.fine_detenzione
        ORDER BY t.data_entrata DESC
        LIMIT 1
        `
    )
    return res.rows
}