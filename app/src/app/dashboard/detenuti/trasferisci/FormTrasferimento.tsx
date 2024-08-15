'use client'
import { Occupante, TrasfDetenuto, getOccupanti, getPostiLiberi, getTrasferimentoDetenuto, trasferisciDetenuto } from "@/actions/action";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import { notFound } from 'next/navigation'
import SelectCelle from "../nuovo/SelectCelle";
import Link from "next/link";
import SelectCellaTrasferimento from "./SelectCellaTrasferimento";
import { useFormState } from "react-dom";

export default function FormTrasferimento({params}: {
    params: {id_detenuto: string}
}) {
    const [message, formAction] = useFormState(trasferisciDetenuto, null);
    const [id_cella_Libera, setCellaLibera] = useState('')
    const [occupanti, setOccupanti] = useState<Array<Occupante>>([])
    const [postiLiberi, setPostiliberi] = useState(-1)
    const defaultDetenuto: TrasfDetenuto = {
        nome: "",
        cognome: "",
        CDI: "",
        id_blocco: "",
        id_piano: "",
        id_cella: ""
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

    const formatCella = (t: TrasfDetenuto) => {
        return detenuto.id_blocco + detenuto.id_piano + "-" + detenuto.id_cella;
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
                setOccupanti(occupantiData)
            } catch (e) {
                console.log(e)
                throw new Error("Failed to fetch occupanti")
            }
        }
        const fetchPostiLiberi = async () => {
            try {
                const postiLiberiData: number = await getPostiLiberi(id_cella_Libera)
                setPostiliberi(postiLiberiData)
            } catch (e) {
                console.log(e)
                throw new Error("Failed to fetch occupanti")
            }
        }
        if (id_cella_Libera != '') {
            fetchOccupanti();
            fetchPostiLiberi();
        }
    }, [id_cella_Libera]);
    return (
        <form action={formAction} className="bg-blue-50 pt-5 pl-5 rounded-lg w-full">
            <div className="flex flex-col">
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full ">
                        <label htmlFor="nome">Nome:</label>
                        <input className="py-2 px-2" value={detenuto.nome + " " + detenuto.cognome} type="text" readOnly/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="id">Carta di identità:</label>
                        <input className="py-2 px-2" value={detenuto.CDI} type="text" name="id" readOnly/>
                    </div>
                </div>
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full">
                        <label htmlFor="celleLetto">Da:</label>
                        <input value={detenuto.id_blocco} name="id_blocco" type="text" hidden readOnly></input>
                        <input value={detenuto.id_piano} name="id_piano" type="text" hidden readOnly></input>
                        <input value={detenuto.id_cella} name="id_cella" type="text" hidden readOnly></input>
                        <input className="py-2 px-2" value={formatCella(detenuto)} type="text" readOnly/>
                    </div>
                    <div className="flex flex-col w-full">
                        <SelectCellaTrasferimento params={{onChange: handleSelectChange, cellaCorrente: formatCella(detenuto)}}></SelectCellaTrasferimento>
                    </div>
                </div>
                <div className={occupanti.length == 0 ? 'invisible' : '' + " p-3 flex flex-row gap-x-5 justify-end"}>
                    <div className="invisible w-1/2"></div>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="posto">Con:</label>
                        <select className="py-2 px-2" defaultValue={'DEFAULT'} name="posto">
                            <option value="DEFAULT" label=" ">Scegli il detenuto con cui scambiare</option>
                            {occupanti.length != 0 && occupanti.map(o => {return <option key={o.CDI} value={o.CDI}>{o.CDI + " | " + o.nome + " " + o.cognome}</option>})}
                            {postiLiberi > 0 && <option value="DEFAULT">Posto libero ({postiLiberi})</option>}
                        </select>
                    </div>
                </div>
                <div className="p-3 flex gap-x-5 justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Invia</button>
                    <Link href="/dashboard/detenuti/">
                        <button className="cancella bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancella</button>
                    </Link>
                </div>
            </div>
      </form>
    )
}