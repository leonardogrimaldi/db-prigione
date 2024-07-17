import { Fragment } from "react"

export default function NuovoOrarioGuardia() {
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
    return (
        <form className="bg-blue-50 pt-5 pl-5 rounded-lg w-full">
            <div className="flex flex-col">
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full ">
                        <label htmlFor="guardia">Scegli una guardia:</label>
                        <input className="py-2 px-2" value="Mario Rossi" type="text" name="nome" readOnly />
                    </div>
                </div>
                <CardOrario {...ora} ></CardOrario>
                <InputOrario></InputOrario>
                <div className="p-3 flex gap-x-5 justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Invia</button>
                    <button className="cancella bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="submit">Cancella</button>
                </div>
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
                <div className="flex flex-col w-1/4">
                    <div>Data inizio:</div>
                    <div className="py-2 px-2 bg-white">{e.data_inizio}</div>
                </div>
                <div className="flex flex-col w-1/4">
                    <div>Data fine:</div>
                    <div className="py-2 px-2 bg-white">{e.data_fine}</div>
                </div>
                <div className="flex flex-col w-1/4">
                    <div>Blocco:</div>
                    <div className="py-2 px-2 bg-white">{e.blocco}</div>
                </div>
                <div className="flex flex-col w-1/4">
                    <div>Piano:</div>
                    <div className="py-2 px-2 bg-white">{e.piano}</div>
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
    return (
        <div className="flex flex-col">
            <div className="p-3">Nuovo orario</div>
            <div className="p-3 flex flex-row gap-x-5">
                <div className="flex flex-col w-1/4">
                    <label htmlFor="data_inizio">Data inizio:</label>
                    <input className="py-2 px-2" type="date" name="data_inizio"/>
                </div>
                <div className="flex flex-col w-1/4">
                    <label htmlFor="data_fine">Data fine:</label>
                    <input className="py-2 px-2" type="date" name="data_fine"/>
                </div>
                <div className="flex flex-col w-1/4">
                    <label htmlFor="blocco">Blocco:</label>
                    <input className="py-2 px-2" type="text" name="blocco"/>
                </div>
                <div className="flex flex-col w-1/4">
                    <label htmlFor="piano">Piano:</label>
                    <input className="py-2 px-2" type="text" name="piano"/>
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
                {Array.from(Array(7).keys()).map(e => {return <input key={e} type="checkbox"/>})}
                <div>Pomeriggio</div>
                {Array.from(Array(7).keys()).map(e => {return <input key={e} type="checkbox"/>})}
                <div>Sera</div>
                {Array.from(Array(7).keys()).map(e => {return <input key={e} type="checkbox"/>})}
            </div>
        </div>
        
    )
}