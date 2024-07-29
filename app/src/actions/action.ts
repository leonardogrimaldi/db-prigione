'use server'
import pool from "../../utils/postgres"
import { Cella, CellaSchema, Detenuto, DetenutoSchema, Registro, RegistroSchema, Trasferimento_Letto, Trasferimento_Letto_Schema } from "../../lib/types";



export async function nuovoDetenuto(state: any, formData: FormData) {
    const insertDetenuto =
        `
    INSERT INTO detenuto (nome, cognome, data_di_nascita, carta_di_identita, altezza)
    VALUES ($1, $2, $3, $4, $5)
    `
    const insertRegistro =  `
    INSERT INTO registro_detenzione (carta_di_identita, inizio_detenzione, fine_detenzione)
    VALUES ($1, $2, $3)
    `
    const insertTrasferimento = `
    INSERT INTO trasferimento_letto (data_entrata, id_blocco, id_piano, id_cella, inizio_detenzione, carta_di_identita)
    VALUES ($1, $2, $3, $4, $5, $6)
    ` 
    throw new Error("Non è stato implementato il controllo sulla data di entrata che deve essere quella dopo l'ultimo trasferimento se c'è")
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
        const cella: Cella = CellaSchema.parse({
            id_blocco: 'A',
            id_piano: '1',
            id_cella: '1'
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