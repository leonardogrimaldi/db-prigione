'use server'
import { Cella, CellaSchema, Detenuto, DetenutoSchema, Registro, RegistroSchema, Trasferimento_Letto, Trasferimento_Letto_Schema } from "../../lib/types";
import z from "zod";
import { Client} from "pg";
async function aggiornaPostiOccupati(c: Cella, client: Client) {
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
    } catch (e) {
        console.log(e)
    }
}

async function aggiornaPostiOccupatiNoClient(c: Cella) {
    const client = await new Client()
    await client.connect()
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
    } catch (e) {
        console.log(e)
    } finally {
        await client.end()
    }
}

export async function nuovoDetenuto(state: any, formData: FormData) {
    const client = await new Client()
    await client.connect()
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
    } finally {
        await client.end()
    }
}

export async function getCelleLettoConSpazioLibero() {
    const client = await new Client()
    await client.connect()
    const res = await client.query<Cella>(
        `
        SELECT cella.id_cella, cella.id_piano, cella.id_blocco 
        FROM cella
        WHERE posti_occupati < num_letti AND tipo = 'letto'
        `
    )
    client.end()
    return res.rows
}

export async function getCelleLetto() {
    const client = await new Client()
    await client.connect()
    const res = await client.query<Cella>(
        `
        SELECT cella.id_cella, cella.id_piano, cella.id_blocco 
        FROM cella
        WHERE tipo = 'letto'
        `
    )
    client.end()
    return res.rows
}

export async function getCella(id_detenuto: string) {
    const client = await new Client()
    await client.connect()
    const query = 
    `
    SELECT id_blocco, id_piano, id_cella
    FROM trasferimento_letto t
    WHERE t.carta_di_identita = $1 AND t.data_uscita IS NULL
    `
    const res = await client.query<Cella>(query, [id_detenuto])
    client.end()

    return res.rows[0]
}

export async function getDetenutiPresenti(): Promise<any[]> {
    const types = require('pg').types
    types.setTypeParser(1082, (val: string) => new Date(val).toISOString().split('T')[0]);
    types.setTypeParser(16, (val: boolean) => val ? 'no' : 'si');
    const client = await new Client()
    await client.connect()
    const query =
        `
    SELECT d.carta_di_identita AS "CDI", TRIM(d.nome) AS "Nome", TRIM(d.cognome) as "Cognome", r.inizio_detenzione AS "Inizio", r.fine_detenzione AS "Fine", CONCAT(t.id_blocco, t.id_piano, '-', t.id_cella) AS "Cella", d.deceduto AS "Deceduto"
    FROM registro_detenzione r
    JOIN detenuto d ON r.carta_di_identita = d.carta_di_identita
    JOIN trasferimento_letto t ON r.inizio_detenzione = t.inizio_detenzione AND r.carta_di_identita = t.carta_di_identita
    WHERE NOW() BETWEEN r.inizio_detenzione AND r.fine_detenzione AND d.deceduto IS NOT TRUE
    ORDER BY t.data_entrata DESC
    `
    const res = await client.query(query)
    await client.end()
    return res.rows
}

export async function getDetenutiRientrati(): Promise<any[]> {
    throw Error('Todo query')
    const types = require('pg').types
    types.setTypeParser(1082, (val: string) => new Date(val).toISOString().split('T')[0]);
    const client = await new Client()
    await client.connect()
    const query =
        `
    SELECT d.carta_di_identita AS "CDI", TRIM(d.nome) AS "Nome", TRIM(d.cognome) as "Cognome", r.inizio_detenzione AS "Inizio", r.fine_detenzione AS "Fine", CONCAT(t.id_blocco, t.id_piano, '-', t.id_cella) AS "Cella", d.deceduto AS "Deceduto"
    FROM registro_detenzione r
    JOIN detenuto d ON r.carta_di_identita = d.carta_di_identita
    JOIN trasferimento_letto t ON r.inizio_detenzione = t.inizio_detenzione AND r.carta_di_identita = t.carta_di_identita
    WHERE NOW() BETWEEN r.inizio_detenzione AND r.fine_detenzione
    ORDER BY t.data_entrata DESC
    LIMIT 1
    `
    const res = await client.query(query)
    await client.end()
    return res.rows
}


export interface TrasfDetenuto {
    nome: string,
    cognome: string,
    CDI: string,
    id_blocco: string,
    id_piano: string,
    id_cella: string
}
export async function getTrasferimentoDetenuto(id_detenuto: string) {
    const client = await new Client()
    await client.connect()
    const query =
        `
    SELECT TRIM(nome) AS nome, TRIM(cognome) AS cognome, d.carta_di_identita AS "CDI", t.id_blocco, t.id_piano, t.id_cella 
    FROM trasferimento_letto t
    JOIN detenuto d ON t.carta_di_identita = d.carta_di_identita
    WHERE t.carta_di_identita = $1 AND t.data_uscita IS NULL
    ORDER BY t.data_entrata DESC
    LIMIT 1
    `
    const res = await client.query<TrasfDetenuto>(query, [id_detenuto])
    client.end()
    return res.rows[0]
}

export interface Occupante {
    CDI: string,
    nome: string,
    cognome: string
}


function cellaCSVToObj(id_cella_CSV: string): Cella {
    const parsedCellaCSV = id_cella_CSV.split(',')
    if (parsedCellaCSV == undefined || parsedCellaCSV.length !== 3) {
        throw new TypeError("Il valore della cella non è corretto")
    }
    const cella: Cella = CellaSchema.parse({
        id_blocco: parsedCellaCSV[0],
        id_piano: parsedCellaCSV[1],
        id_cella: parsedCellaCSV[2]
    })
    return cella
}
export async function getOccupanti(id_cella: string) {
    const cella = cellaCSVToObj(id_cella)
    const query =
    `
    SELECT t.carta_di_identita AS "CDI", TRIM(d.nome) AS nome, TRIM(d.cognome) AS cognome
    FROM trasferimento_letto t
    JOIN detenuto d ON t.carta_di_identita = d.carta_di_identita
    WHERE id_blocco = $1 AND id_piano = $2 AND id_cella = $3 AND data_uscita IS NULL
    `
    const client = await new Client()
    await client.connect()
    const res = await client.query<Occupante>(query, [cella.id_blocco, cella.id_piano, cella.id_cella])
    client.end()
    
    return res.rows
}
interface PostoLibero {
    posti_occupati: number,
    num_letti: number
}
/**
 * 
 * @param id_cella 
 * @returns quanti posti liberi ci sono per la cella
 */
export async function getPostiLiberi(id_cella: string): Promise<number> {
    const cella = cellaCSVToObj(id_cella)
    const query = 
    `
    SELECT posti_occupati, num_letti
    FROM cella
    WHERE id_blocco = $1 AND id_piano = $2 AND id_cella = $3
    `
    const client = await new Client()
    await client.connect()
    const res = await client.query<PostoLibero>(query, [cella.id_blocco, cella.id_piano, cella.id_cella])
    client.end()

    return res.rows[0].num_letti - res.rows[0].posti_occupati
}

export async function trasferisciDetenuto(state: any, formData: FormData) {
    const cdi = formData.get('id') as string
    /**
     * Cella di cdi
     */
    const cellaPrimo: Cella = await getCella(cdi)
    /**
     * Cella destinazione
     */
    const destinazione_form: Cella = cellaCSVToObj(formData.get('cella') as string)
    /**
     * Posto destinazione: se 'DEFAULT' allora qualunque, altrimenti è il CDI del detenuto con cui scambiare
     */
    const cdi_altro = formData.get('posto') as string
    const setDataUscita =
    `
    UPDATE trasferimento_letto t
    SET data_uscita = NOW()
    WHERE t.carta_di_identita = $1 AND data_uscita IS NULL
    `
    const insertTrasferimento =
    `
    INSERT INTO trasferimento_letto (data_entrata, id_blocco, id_piano, id_cella, inizio_detenzione, carta_di_identita)
    VALUES (NOW(), $1, $2, $3, (SELECT inizio_detenzione
    FROM registro_detenzione r
    WHERE r.carta_di_identita = $4
    ORDER BY r.inizio_detenzione DESC
    LIMIT 1), $4);
    `
    
    const client = await new Client()
    await client.connect()
    try {
        await client.query('BEGIN')
        await client.query(setDataUscita, [cdi])
        await client.query(insertTrasferimento, [destinazione_form.id_blocco, destinazione_form.id_piano, destinazione_form.id_cella, cdi])
        if (cdi_altro != 'DEFAULT') {
            const cellaDestinazione = await getCella(cdi_altro) 
            if (cellaDestinazione.id_blocco !== destinazione_form.id_blocco || cellaDestinazione.id_piano !== destinazione_form.id_piano
                || cellaDestinazione.id_cella !== destinazione_form.id_cella
            ) {
                console.log(cdi_altro)
                console.log(await getCella(cdi_altro))
                console.log(destinazione_form)
                throw new TypeError("Il detenuto con cui scambiare non appartiene alla cella di destinazione")
            }
            await client.query(setDataUscita, [cdi_altro])
            await client.query(insertTrasferimento, [cellaPrimo.id_blocco, cellaPrimo.id_piano, cellaPrimo.id_cella, cdi_altro])
        }
        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        console.log(e)
    } finally {
        aggiornaPostiOccupatiNoClient(destinazione_form)
        aggiornaPostiOccupatiNoClient(cellaPrimo)
        await client.end()
    }
    
}