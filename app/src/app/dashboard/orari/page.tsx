'use client'
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import SelectBlocco from "./SelectBlocco";
import { getDate, getDateOfWeek, getWeekNumber, turni, zeroPad } from "../../../../utils/utils";
import { PersonaleOrario, getOrario } from "@/actions/action";
export default function Orari() {
    const today = new Date()
    /**
     * Uses zeroPad to pad getWeekNumber: example 1 becomes 01 
     * to make it conform to the <input type="week"> defaultValue 
     */
    const dateDefaultValue= today.getFullYear() + "-W" + zeroPad(getWeekNumber(today), 2)
    const [date, setDate] = useState(dateDefaultValue)
    const [bloccoPianoCSV, setBloccoPiano] = useState('')
    const [data, setData] = useState<PersonaleOrario[]>()

    const handleBloccoChange = (blocco_piano_CSV: string) => {
        setBloccoPiano(blocco_piano_CSV)
    }

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const bloccoPiano = bloccoPianoCSV.split(',')
                const yearWeek = date.split('-W')
                const dateISO = getDateOfWeek(parseInt(yearWeek[0]), parseInt(yearWeek[1]))
                const result = await getOrario(bloccoPiano[0], bloccoPiano[1], dateISO);
                console.log(result)
                setData(result)
            } catch (e) {
                console.log(e)
                throw new Error("Failed to fetch data")
            }
        };
        if (bloccoPianoCSV != '') {
            fetchData();
        }
    }, [bloccoPianoCSV, date])
    return(
        <div className="flex flex-col">
            <div className="flex flex-row gap-x-2">
                    <Link href="/dashboard/orari/nuovo">
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            Nuovo
                        </button>
                    </Link>
                </div>
            <div className="flex flex-row gap-x-4 justify-center bg-gray-200 items-center">
                <SelectBlocco params={{
                    onChange: handleBloccoChange
                }}></SelectBlocco>
                <label className="py-2 px-2" htmlFor="settimana">Settimana:</label>
                <input className="py-2 px-2"  type="week" name="settimana" defaultValue={dateDefaultValue} onChange={(e) => handleDateChange(e)} ></input>
            </div>
            {data && data.length != 0 && <TableOrario params={data}></TableOrario>}
        </div>
    )
}

function TableOrario({params}: {
    params: PersonaleOrario[]
}) {
    return (
        <div className="grid grid-cols-8 grid-rows-4 bg-blue-200 rounded-md w-fit">
                <div></div>
                {['Lunedì','Martedì', 'Mercoledì','Giovedì','Venerdì','Sabato','Domenica'].map(d => {
                    return <div className="border-l-4 border-gray-100 flex items-center justify-center">{d}</div>
                })}
                <div className="border-2 border-white rounded-md bg-yellow-400 flex items-center justify-center">Mattina</div>
                {Array.from(Array(7).keys()).map(e => {return <div key={e} id={"m" + e}>{params.filter(g => g.giorno == e && g.ora_inizio == turni.mattina).map(g => {return <Guardia key={g.badge} params={g}/>})}</div>})}
                <div className="border-2 border-white rounded-md bg-blue-400 flex items-center justify-center">Pomeriggio</div>
                {Array.from(Array(7).keys()).map(e => {return <div key={e} id={"p" + e}>{params.filter(g => g.giorno == e && g.ora_inizio == turni.pomeriggio).map(g => {return <Guardia key={g.badge} params={g}/>})}</div>})}
                <div className="border-2 border-white rounded-md bg-gray-400 flex items-center justify-center">Sera</div>
                {Array.from(Array(7).keys()).map(e => {return <div key={e} id={"s" + e}>{params.filter(g => g.giorno == e && g.ora_inizio == turni.sera).map(g => {return <Guardia key={g.badge} params={g}/>})}</div>})}
            </div>
    )
}

function Guardia({params}: {
    params: PersonaleOrario 
}) {
    return (
        <div className="hover:bg-blue-300 bg-white drop-shadow-lg p-2 rounded-xl text-sm" id={params.badge}>
            {params.badge + " | " + params.nome + " " + params.cognome}
        </div>
    )
}