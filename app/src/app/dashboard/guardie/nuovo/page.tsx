'use client'
import { nuovoPersonale    } from "@/actions/action"
import Link from "next/link"
import { useState } from "react";
import { useFormState } from "react-dom"

export default function NuovaGuardia() {
    const [message, formAction] = useFormState(nuovoPersonale, null);
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }
    return (
        <div>
            <form action={formAction} className="bg-blue-50 pt-5 pl-5 rounded-lg w-full">
                <div className="flex flex-col">
                    <div className="p-3 flex flex-row gap-x-5"> 
                        <div className="flex flex-col w-full ">
                            <label htmlFor="nome">Nome:</label>
                            <input className="py-2 px-2" type="text" name="nome" placeholder="Inserisci il nome del personale" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="cognome">Cognome:</label>
                            <input className="py-2 px-2" type="text" name="cognome" placeholder="Inserisci il cognome del personale" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="cognome">Badge:</label>
                            <input className="py-2 px-2" type="text" minLength={4} maxLength={4} name="badge" placeholder="Inserisci il badge del personale" />
                        </div>
                    </div>
                    <div className="p-3 flex flex-row gap-x-5">
                        <div className="flex flex-col w-full">
                            <label htmlFor="carta_di_identita">Codice fiscale:</label>
                            <input className="py-2 px-2" minLength={16} maxLength={16} type="text" name="codice_fiscale" placeholder="Inserisci il codice fiscale del personale" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="sesso">Sesso:</label>
                            <select defaultValue={'DEFAULT'} name="sesso" className="py-2 px-2">
                                <option value="DEFAULT" disabled>Seleziona il sesso</option>
                                <option value="M">Maschio</option>
                                <option value="F">Femmina</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="amministratore">Amministratore</label>
                            <input type="checkbox" onChange={handleCheckboxChange} checked={isChecked} name="amministratore" className="h-full m-2"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="guardia">Guardia</label>
                            <input type="checkbox" className="h-full m-2" name="guardia"/>
                        </div>
                    </div>
                    <div className="p-3 flex flex-row gap-x-5">
                    {isChecked && 
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="password">Password amministratore</label>
                            <input type="text" placeholder="Inserisci la password dell'amministratore" className="px-2 py-2" name="password"/>
                        </div>
                    }
                    </div>
                    <div className="p-3 flex gap-x-5 justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Invia</button>
                        <Link href="/dashboard/personale">
                            <button className="cancella bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancella</button>
                        </Link>
                        
                    </div>
                </div>
            </form>
        </div>

    )
}