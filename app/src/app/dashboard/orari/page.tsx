'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import SelectBlocco from "./SelectBlocco";
import { getDate, getWeekNumber, zeroPad } from "../../../../utils/utils";

export default function Orari() {
    const today = new Date()
    /**
     * Uses zeroPad to pad getWeekNumber: example 1 becomes 01 
     * to make it conform to the <input type="week"> defaultValue 
     */
    const dateDefaultValue= today.getFullYear() + "-W" + zeroPad(getWeekNumber(today), 2)
    const [date, setDate] = useState()
    const [bloccoPiano, setBloccoPiano] = useState('')
    console.log()
    return(
        <div className="flex flex-col">
            <div className="flex flex-row gap-x-2">
                    <Link href="/dashboard/orari/nuovo">
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            Nuovo
                        </button>
                    </Link>
                </div>
            <div className="flex flex-row gap-x-4 justify-center bg-gray-200">
                <SelectBlocco params={{
                    onChange: null
                }}></SelectBlocco>
                <label className="py-2 px-2" htmlFor="settimana">Settimana:</label>
                <input className="py-2 px-2"  type="week" name="settimana" defaultValue={dateDefaultValue}  ></input>
            </div>
            <div className="grid grid-cols-8 grid-rows-4">
                <div></div>
                <div>Lunedì</div>
                <div>Martedì</div>
                <div>Mercoledì</div>
                <div>Giovedì</div>
                <div>Venerdì</div>
                <div>Sabato</div>
                <div>Domenica</div>
                <div>Mattina</div>
                {Array.from(Array(7).keys()).map(e => {return <Guardia key={e} badge={e} text={e.toString()}/>})}
                <div>Pomeriggio</div>
                {Array.from(Array(7).keys()).map(e => {return <Guardia key={e} badge={e} text={e.toString()}/>})}
                <div>Sera</div>
                {Array.from(Array(7).keys()).map(e => {return <Guardia key={e} badge={e} text={e.toString()}/>})}
            </div>
        </div>
    )
}

function Guardia({badge, text}: {badge: number; text: string}) {
    return (
        <div className="hover:bg-blue-300" id={badge.toString()}>
            {text}
        </div>
    )
}