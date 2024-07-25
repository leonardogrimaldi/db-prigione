'use server'
import { NuovoDetenutoFormState } from "@/app/dashboard/detenuti/nuovo/page"
import pool from "../../utils/postgres"

export async function nuovoDetenuto(formData: NuovoDetenutoFormState) {

    const text =
        `
    INSERT INTO detenuto (nome, cognome, data_di_nascita, carta_di_identita, altezza)
    VALUES ($1, $2, $3, $4, $5)
    `
    try {
        const res = await pool.query(text, Object.values(formData))
        return {message: "Il detenuto è stato aggiunto"}
    } catch {
        return {message: "Non è stato possibile eseguire l'operazione"}
    }
}

export interface Cella {
    id_cella: string,
    id_piano: string,
    id_blocco: string
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