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

export const DetenutoRegistroSchema = z.object({
    DetenutoSchema,
    RegistroSchema
})


export type Detenuto = z.infer<typeof DetenutoSchema>