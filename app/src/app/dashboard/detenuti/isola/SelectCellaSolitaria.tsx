"use client"
import { ChangeEvent, Fragment, useEffect, useState } from "react"
import { getCelleLettoConSpazioLibero, getCelleSolitarieConSpazioLibero } from "@/actions/action"
import { Cella } from "../../../../../lib/types"

export default function SelectCellaSolitaria({params}: {
    params: {onChange: ((id_cella_CSV: string) => void) | null}
}) {
    const [celle, setCelle] = useState<Cella[]>();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (params.onChange != null) {
            params.onChange(e.target.value)
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getCelleSolitarieConSpazioLibero();
                setCelle(result);
            } catch {
                throw new Error("Failed to fetch data")
            }
        };
        fetchData();
    }, []);

    return (
        <Fragment>
            <label htmlFor="cella">Cella:</label>
            <select defaultValue={'DEFAULT'} name="cella" onChange={e => handleChange(e)} className="py-2 px-2">
            <option value="DEFAULT" disabled>Seleziona una cella</option>
                {celle?.map(c => {
                    const cellaCSV: string = c.id_blocco + "," + c.id_piano + "," + c.id_cella
                    return <option value={cellaCSV} key={c.id_blocco + c.id_piano + c.id_cella}>Solitaria {c.id_blocco + c.id_piano + "-" + c.id_cella}</option>
                })
                }
            </select>
        </Fragment>
    )
}