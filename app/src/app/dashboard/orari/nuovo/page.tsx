'use client'
import { Fragment, useState } from "react"
import SelectGuardia from "./SelectGuardia"
import SelectBlocco from "../SelectBlocco"
import Link from "next/link"
import { useFormState } from "react-dom"
import { nuovoOrarioGuardia } from "@/actions/action"

export default function NuovoOrarioGuardia() {
    const [message, formAction] = useFormState(nuovoOrarioGuardia, null)

    const ora: Orario = {
        id: "1",
        data_inizio: "2024-02-02",
        data_fine: "2025-03-03",
        blocco: "A",
        piano: "3",
        orario: new Map<string, boolean[]>([
            ["Mattina", [false, false, true,false, true, true, true]],
            ["Pomeriggio", [true, false, true,true, false, false, false]],
            ["Sera", [false, false, false,false, true, false, false]]
        ])
    }

    const [guardia, setGuardia] = useState<string>()
    const guardiaChanged = (badge: string) => {
        setGuardia(badge)
    }

    return (
        <form action={formAction} className="bg-blue-50 pt-5 pl-5 pr-5 rounded-lg w-full">
            <div className="flex flex-col">
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full ">
                        <SelectGuardia params={{
                            onChange: guardiaChanged
                        }}></SelectGuardia>
                    </div>
                </div>
                {guardia && <Fragment>
                    <InputOrario></InputOrario>
                    <CardOrario {...ora} ></CardOrario>
                    <div className="p-3 flex gap-x-5 justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Invia</button>
                        <Link href={"/dashboard/orari"}>
                            <button className="cancella bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="submit">Cancella</button>
                        </Link>
                    </div>
                </Fragment>
                }
            </div>
        </form>
    )
}
type Orario = {
    id: string,
    data_inizio: string,
    data_fine: string,
    blocco: string,
    piano: string,
    orario: Map<string, boolean[]>
}
function CardOrario(e: Orario) {
    return (
        <div className="flex flex-col">
            <div className="p-3">Orario {e.id}</div>
            <div className="p-3 flex flex-row gap-x-5">
                <div className="flex flex-col w-full">
                    <div>Data inizio:</div>
                    <div className="py-2 px-2 bg-white">{e.data_inizio}</div>
                </div>
                <div className="flex flex-col w-full">
                    <div>Data fine:</div>
                    <div className="py-2 px-2 bg-white">{e.data_fine}</div>
                </div>
                <div className="flex flex-col w-full">
                    <div>Blocco-piano:</div>
                    <div className="py-2 px-2 bg-white">{e.blocco + e.piano}</div>
                </div>
            </div>
            <div className="p-3 grid grid-cols-8 grid-rows-4">
                <div></div>
                <div>Lunedì</div>
                <div>Martedì</div>
                <div>Mercoledì</div>
                <div>Giovedì</div>
                <div>Venerdì</div>
                <div>Sabato</div>
                <div>Domenica</div>
                {
                    Array.from(e.orario.keys()).map(k => {
                        return (
                            <Fragment key={k}>
                                <div>{k}</div> 
                                {e.orario.get(k)?.map(e => {
                                    return e ? <input key={k} type="checkbox" checked disabled/> : <input key={k} type="checkbox" disabled/>
                                })}
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
        
    )
}

function InputOrario() {
    const [tabellaOrari, setTabellaOrari] = useState(new Map<string, Array<boolean>>([
        ["m", new Array(7).fill(false)],
        ["p", new Array(7).fill(false)],
        ["s", new Array(7).fill(false)]
    ]))

    const handleCheckBoxClick = (key: string, index: number) => {
        
        
    }
    return (
        <div className="flex flex-col bg-blue-100">
            <div className="p-3">Nuovo orario</div>
            <div className="p-3 flex flex-row gap-x-5">
                <div className="flex flex-col w-full">
                    <label htmlFor="data_inizio">Data inizio:</label>
                    <input className="py-2 px-2" type="date" name="data_inizio"/>
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="data_fine">Data fine:</label>
                    <input className="py-2 px-2" type="date" name="data_fine"/>
                </div>
                <div className="flex flex-col w-full">
                    <SelectBlocco params={{
                        onChange: null
                    }}></SelectBlocco>
                </div>
                
            </div>
            <div className="p-3 grid grid-cols-8 grid-rows-4">
                <div></div>
                <div>Lunedì</div>
                <div>Martedì</div>
                <div>Mercoledì</div>
                <div>Giovedì</div>
                <div>Venerdì</div>
                <div>Sabato</div>
                <div>Domenica</div>
                <div>Mattina</div>
                {tabellaOrari.get('m')?.map((val, index) => {return <input key={index} onClick={() => handleCheckBoxClick("m", index)} name={"m-" + index} type="checkbox"/>})}
                <div>Pomeriggio</div>
                {tabellaOrari.get('p')?.map((val, index) => {return <input key={index} name={"p-" + index} type="checkbox"/>})}
                <div>Sera</div>
                {tabellaOrari.get('s')?.map((val, index) => {return <input key={index} name={"s-" + index} type="checkbox"/>})}
            </div>
        </div>
    )
}