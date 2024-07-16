export default function NuovoOrarioGuardia() {
    return (
        <form className="bg-blue-50 pt-5 pl-5 rounded-lg w-full">
            <div className="flex flex-col">
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full ">
                        <label htmlFor="guardia">Scegli una guardia:</label>
                        <input className="py-2 px-2" value="Mario Rossi" type="text" name="nome" readOnly />
                    </div>
                </div>
                <Orari></Orari>
                <div className="p-3 flex gap-x-5 justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Invia</button>
                    <button className="cancella bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="submit">Cancella</button>
                </div>
            </div>
        </form>
    )
}

function Orari() {
    return (
        <div className="flex flex-col">
            <div className="p-3 flex flex-row gap-x-5">
                <div className="flex flex-col w-1/4">
                    <label htmlFor="data_inizio">Data inizio:</label>
                    <input className="py-2 px-2" type="date" name="data_inizio" readOnly/>
                </div>
                <div className="flex flex-col w-1/4">
                    <label htmlFor="data_fine">Data fine:</label>
                    <input className="py-2 px-2" type="date" name="data_fine" readOnly/>
                </div>
                <div className="flex flex-col w-1/4">
                    <label htmlFor="blocco">Blocco:</label>
                    <input className="py-2 px-2" type="text" name="blocco" readOnly/>
                </div>
                <div className="flex flex-col w-1/4">
                    <label htmlFor="piano">Piano:</label>
                    <input className="py-2 px-2" type="text" name="piano" readOnly/>
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
                {Array.from(Array(7).keys()).map(e => {return <input key={e} type="checkbox" checked disabled/>})}
                <div>Pomeriggio</div>
                {Array.from(Array(7).keys()).map(e => {return <input key={e} type="checkbox" checked disabled/>})}
                <div>Sera</div>
                {Array.from(Array(7).keys()).map(e => {return <input key={e} type="checkbox" disabled/>})}
            </div>
        </div>
        
    )
}