'use server'
import pool from "../../utils/postgres"
import { Cella, CellaSchema, Detenuto, DetenutoSchema, Registro, RegistroSchema, Trasferimento_Letto, Trasferimento_Letto_Schema } from "../../lib/types";

async function aggiornaPostiOccupati(c: Cella) {
    throw new Error("Query non verificate")
    const postiOccupati =
    `
    SELECT COUNT(*)
    FROM trasferimento_letto
    WHERE id_blocco = $1 AND id_piano = $2 AND id_cella = $3 AND data_uscita IS NULL
    `
    const aggiornaPosti = 
    `
    UPDATE cella
    SET posti_occupati = $1
    WHERE id_blocco = $2 AND id_piano = $3 AND id_cella = $4
    `
    const res = await pool.query(postiOccupati, Object.values(c))
    await pool.query(aggiornaPosti, [res.rows[0], c.id_blocco, c.id_piano, c.id_cella])
}

export async function nuovoDetenuto(state: any, formData: FormData) {
    const insertDetenuto =
    `
    INSERT INTO detenuto (nome, cognome, data_di_nascita, carta_di_identita, altezza)
    VALUES ($1, $2, $3, $4, $5)
    `
    const insertRegistro =
    `
    INSERT INTO registro_detenzione (carta_di_identita, inizio_detenzione, fine_detenzione)
    VALUES ($1, $2, $3)
    `
    const insertTrasferimento = 
    `
    INSERT INTO trasferimento_letto (data_entrata, id_blocco, id_piano, id_cella, inizio_detenzione, carta_di_identita)
    VALUES ($1, $2, $3, $4, $5, $6)
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
        await pool.query('BEGIN')
        await pool.query(insertDetenuto, Object.values(detenuto))
        await pool.query(insertRegistro, Object.values(registro))
        const values = [trasferimento.data_entrata, Object.values(cella), registro.inizio_detenzione, registro.carta_di_identita].flat()
        console.log(values)
        await pool.query(insertTrasferimento, values)
        aggiornaPostiOccupati(cella)
        await pool.query('COMMIT')
        return {message: "Il detenuto è stato aggiunto"}    
    } catch (e){
        await pool.query('ROLLBACK')
        console.log(e)
        return {error: "Non è stato possibile eseguire l'operazione"}
    }
}

export async function getCells() {
    const res = await pool.query<Cella>(
        `
        SELECT cella.id_cella, cella.id_piano, cella.id_blocco 
        FROM cella
        WHERE posti_occupati < num_letti AND tipo = 'letto'
        `
    )

    return res.rows
}