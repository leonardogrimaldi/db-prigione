"use client"
import { ChangeEvent, Fragment, useEffect, useState } from "react"
import { Piano, getCelleLettoConSpazioLibero, getBloccoPianiConOrario, getBloccoPiani } from "@/actions/action"

export default function SelectBloccoPianoConOrario({params}: {
    params: {onChange: ((id_cella_CSV: string) => void) | null}
}) {
    const [piani, setPiani] = useState<Piano[]>();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (params.onChange != null) {
            params.onChange(e.target.value)
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getBloccoPianiConOrario();
                setPiani(result);
            } catch {
                throw new Error("Failed to fetch data")
            }
        };
        fetchData();
    }, []);

    return (
        <Fragment>
            <label htmlFor="blocco_piano">Blocco-piano:</label>
            <select defaultValue={'DEFAULT'} name="blocco_piano" onChange={e => handleChange(e)} className="py-2 px-2">
            <option value="DEFAULT" disabled>Seleziona una coppia blocco-piano</option>
                {piani?.map(p => {
                    const pianoCSV: string = p.id_blocco + "," + p.id_piano
                    return <option value={pianoCSV} key={p.id_blocco + p.id_piano}>{p.id_blocco + p.id_piano}</option>
                })
                }
            </select>
        </Fragment>
    )
}

export function SelectBloccoPiano({params}: {
    params: {onChange: ((id_cella_CSV: string) => void) | null}
}) {
    const [piani, setPiani] = useState<Piano[]>();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (params.onChange != null) {
            params.onChange(e.target.value)
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getBloccoPiani();
                setPiani(result);
            } catch {
                throw new Error("Failed to fetch data")
            }
        };
        fetchData();
    }, []);

    return (
        <Fragment>
            <label htmlFor="blocco_piano">Blocco-piano:</label>
            <select defaultValue={'DEFAULT'} name="blocco_piano" onChange={e => handleChange(e)} className="py-2 px-2">
            <option value="DEFAULT" disabled>Seleziona una coppia blocco-piano</option>
                {piani?.map(p => {
                    const pianoCSV: string = p.id_blocco + "," + p.id_piano
                    return <option value={pianoCSV} key={p.id_blocco + p.id_piano}>{p.id_blocco + p.id_piano}</option>
                })
                }
            </select>
        </Fragment>
    )
}