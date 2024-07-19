import { FormEvent, Fragment } from "react"
import pool from "../../../../../utils/postgres"
function getDate() {
    let todayDate = new Date()
    const offset = todayDate.getTimezoneOffset()
    todayDate = new Date(todayDate.getTime() - (offset * 60 * 1000))
    return todayDate.toISOString().split('T')[0]
}

export interface Cella {
    id_cella: string,
    id_piano: string,
    id_blocco: string
}

export async function getCells() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await pool.query<Cella>(
        `
        SELECT cella.id_cella, cella.id_piano, cella.id_blocco 
        FROM cella
        WHERE posti_occupati < num_letti AND tipo = 'letto'
        `
    )
    return res.rows
}

export function OptionCella(c: Cella) {
    const value = c.id_blocco + c.id_piano + "-" + c.id_cella
    return (
        <option value={value}>{value}</option>
    )
}

async function SelectCelle() {
    const rows = await getCells()
    return (
        <Fragment>
            <label htmlFor="celle">Cella:</label>
            <select name="celle" className="py-2 px-2">
                {
                    rows.map(r => { return <OptionCella key={r.id_blocco + r.id_cella + r.id_piano} {...r}></OptionCella> })
                }
            </select>
        </Fragment>
    )
}
export default function NuovoDetenuto() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const formData = new FormData(event.currentTarget)
            const response = await fetch('/api/submit', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }

            // Handle response if necessary
            const data = await response.json()
            // ...
        } catch (error) {
            console.error(error)
        } finally {
            
        }
    }

    return (
        <form className="bg-blue-50 pt-5 pl-5 rounded-lg w-full">
            <div className="flex flex-col">
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full ">
                        <label htmlFor="nome">Nome:</label>
                        <input className="py-2 px-2" type="text" name="nome" placeholder="Inserisci il nome del detenuto" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="cognome">Cognome:</label>
                        <input className="py-2 px-2" type="text" name="cognome" placeholder="Inserisci il cognome del detenuto" />
                    </div>
                </div>
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full">
                        <label htmlFor="data_di_nascita">Data di nascita:</label>
                        <input className="py-2 px-2" type="date" name="data_di_nascita" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="carta_di_identita">Carta di identità:</label>
                        <input className="py-2 px-2" minLength={9} maxLength={9} type="text" name="carta_di_identita" placeholder="Inserisci il numero della carta di identità del detenuto" />
                    </div>
                </div>
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full">
                        <label htmlFor="altezza">Altezza:</label>
                        <input className="py-2 px-2" min={0} max={300} type="number" name="altezza" placeholder="in centimetri" />
                    </div>
                    <div className="flex flex-col w-full">
                        <SelectCelle />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="inizio_detenzione">Inizio detenzione:</label>
                        <input className="py-2 px-2" type="date" value={getDate()} name="inizio_detenzione" readOnly />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="fine_detenzione">Fine detenzione:</label>
                        <input className="py-2 px-2" type="date" name="fine_detenzione" />
                    </div>
                </div>
                <div className="p-3 flex gap-x-5 justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Invia</button>
                    <button className="cancella bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="submit">Cancella</button>
                </div>
            </div>
        </form>
    )
}