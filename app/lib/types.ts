import z from "zod";

export const DetenutoSchema = z.object({
    nome: z.string().trim(),
    cognome: z.string().trim(),
    data_di_nascita: z.string().trim(),
    carta_di_identita: z.string().trim(),
    altezza: z.string().trim(),
})
export const RegistroSchema = z.object({
    carta_di_identita: z.string().trim(),
    inizio_detenzione: z.string().trim(),
    fine_detenzione: z.string().trim()
})
export const CellaSchema = z.object({
    id_blocco: z.string().trim(),
    id_piano: z.string().trim(),
    id_cella: z.string().trim()
})
export const Trasferimento_Letto_Schema = z.object({
    data_entrata: z.string().trim(),
    data_uscita: z.string().trim().optional(),
})



export type Detenuto = z.infer<typeof DetenutoSchema>
export type Registro = z.infer<typeof RegistroSchema>
export type Cella = z.infer<typeof CellaSchema>
export type Trasferimento_Letto = z.infer<typeof Trasferimento_Letto_Schema>