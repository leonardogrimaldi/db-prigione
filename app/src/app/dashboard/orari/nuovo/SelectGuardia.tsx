"use client"
import { ChangeEvent, Fragment, useEffect, useState } from "react"
import { Guardie, Piano, getCelleLettoConSpazioLibero, getGuardie, getBloccoPianiConOrario } from "@/actions/action"

export default function SelectBlocco({params}: {
    params: {onChange: ((badge: string) => void) | null}
}) {
    const [guardie, setGuardie] = useState<Guardie[]>();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (params.onChange != null) {
            params.onChange(e.target.value)
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getGuardie();
                setGuardie(result);
            } catch {
                throw new Error("Failed to fetch data")
            }
        };
        fetchData();
    }, []);

    return (
        <Fragment>
            <label htmlFor="guardia">Guardia:</label>
            <select defaultValue={'DEFAULT'} name="guardia" onChange={e => handleChange(e)} className="py-2 px-2">
            <option value="DEFAULT" disabled>Scegli una guardia</option>
                {guardie?.map(g => {
                    return <option value={g.badge} key={g.badge}>{g.badge + " | " + g.nome + " " + g.cognome}</option>
                })
                }
            </select>
        </Fragment>
    )
}