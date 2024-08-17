import { notFound } from "next/navigation"
import SelectCellaMedica from "./SelectCellaMedica"
import { TrasfDetenuto, getTrasferimentoDetenuto, trasferisciDetenuto } from "@/actions/action"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"

export default function FormRicovero({params}: {
    params: {id_detenuto: string}
}) {
    if (params === undefined || params.id_detenuto === undefined) {
        return notFound()
    }
    const defaultDetenuto: TrasfDetenuto = {
        nome: "",
        cognome: "",
        CDI: "",
        id_blocco: "",
        id_piano: "",
        id_cella: ""
    }
    const [detenuto, setDetenuto] = useState<TrasfDetenuto>(defaultDetenuto)
    //const [message, formAction] = useFormState(, null);
    const [cellaSelezionata, setCellaSelezionata] = useState('')

    const handleSelectChange = (id_cella_CSV: string) => {
        setCellaSelezionata(id_cella_CSV)
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
    }, []);
    return (
        <form className="bg-blue-50 pt-5 pl-5 rounded-lg w-full">
            <div className="flex flex-col">
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full ">
                        <label htmlFor="nome">Nome:</label>
                        <input className="py-2 px-2" value="Mario Rossi" type="text" name="nome" readOnly/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="id">Id:</label>
                        <input className="py-2 px-2" value="012345" type="text" name="id" readOnly/>
                    </div>
                </div>
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-1/2">
                        <SelectCellaMedica params={{
                            onChange: null
                        }}></SelectCellaMedica>
                    </div>
                    <div className="flex flex-col w-1/4">
                        <label htmlFor="data_inizio">Data inizio:</label>
                        <input className="py-2 px-2" type="date" name="data_inizio"/>
                    </div>
                    <div className="flex flex-col w-1/4">
                        <label htmlFor="data_fine">Data fine:</label>
                        <input className="py-2 px-2" type="date" name="data_fine"/>
                    </div>
                </div>
                <div className="p-3 flex flex-col gap-x-5">
                    <label htmlFor="prognosi">Prognosi:</label>
                    <textarea className="resize-none py-2 px-2" name="prognosi" rows={5} placeholder="Scrivi qui la prognosi del paziente detenuto."></textarea>
                </div>
                <div className="p-3 flex gap-x-5 justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Invia</button>
                    <button className="cancella bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="submit">Cancella</button>
                </div>
            </div>      
      </form>
    )
}