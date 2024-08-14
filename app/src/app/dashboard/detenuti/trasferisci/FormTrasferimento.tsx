'use client'
import { TrasfDetenuto, getOccupanti, getTrasferimentoDetenuto } from "@/actions/action";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import { notFound } from 'next/navigation'
import SelectCelle from "../nuovo/SelectCelle";

export default function FormTrasferimento({params}: {
    params: {id_detenuto: string}
}) {
    const [id_cella_Libera, setCellaLibera] = useState('')
    const [occupanti, setOccupanti] = useState<any[]>([])
    const defaultDetenuto: TrasfDetenuto = {
        nome: "",
        cognome: "",
        CDI: "",
        cella: ""
    }
    const [detenuto, setDetenuto] = useState<TrasfDetenuto>(defaultDetenuto)
    /**
     * If id not passed in url then redirect to 404
     */
    if (params === undefined || params.id_detenuto === undefined) {
        return notFound()
    }
    const handleSelectChange = (id_cella_CSV: string) => {
        setCellaLibera(id_cella_CSV)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const detenutoData = await getTrasferimentoDetenuto(params.id_detenuto);
                setDetenuto(detenutoData)
            } catch (e) {
                console.log(e)
                throw new Error("Failed to fetch data")
            }
        };
        fetchData();
        const fetchOccupanti = async () => {
            try {
                const occupantiData = await getOccupanti(id_cella_Libera)
                console.log(occupantiData)
            } catch (e) {
                console.log(e)
                throw new Error("Failed to fetch occupanti")
            }
        }
        if (id_cella_Libera != '') {
            fetchOccupanti();
        }
    }, [id_cella_Libera]);
    return (
        <form className="bg-blue-50 pt-5 pl-5 rounded-lg w-full">
            <div className="flex flex-col">
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full ">
                        <label htmlFor="nome">Nome:</label>
                        <input className="py-2 px-2" value={detenuto.nome + " " + detenuto.cognome} type="text" name="nome" readOnly/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="id">Carta di identità:</label>
                        <input className="py-2 px-2" value={detenuto.CDI} type="text" name="id" readOnly/>
                    </div>
                </div>
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full">
                        <label htmlFor="celleLetto">Da:</label>
                        <input className="py-2 px-2" value={detenuto.cella} type="text" name="id_cella" readOnly/>
                    </div>
                    <div className="flex flex-col w-full">
                        <SelectCelle params={{onChange: handleSelectChange}}></SelectCelle>
                    </div>
                </div>
                <div className="invisible p-3 flex flex-row gap-x-5 justify-end">
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="posto">Con:</label>
                        <select defaultValue={'DEFAULT'} name="posto">
                            <option value="DEFAULT" label=" ">Scegli il detenuto con cui scambiare</option>
                            {occupanti != undefined}
                        </select>
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