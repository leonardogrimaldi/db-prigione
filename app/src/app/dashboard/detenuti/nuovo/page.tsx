'use client'
function getDate() { 
    let todayDate = new Date()
    const offset = todayDate.getTimezoneOffset()
    todayDate = new Date(todayDate.getTime() - (offset*60*1000))
    return todayDate.toISOString().split('T')[0]
}

export default function NuovoDetenuto() {
    return (
        <form className="bg-blue-50 pt-5 pl-5 rounded-lg w-full">
            <div className="flex flex-col">
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full ">
                        <label htmlFor="nome">Nome:</label>
                        <input className="py-2 px-2" type="text" name="nome" placeholder="Inserisci il nome del detenuto"/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="cognome">Cognome:</label>
                        <input className="py-2 px-2" type="text" name="cognome" placeholder="Inserisci il cognome del detenuto"/>
                    </div>
                </div>
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full">
                        <label htmlFor="data_di_nascita">Data di nascita:</label>
                        <input className="py-2 px-2" type="date" name="data_di_nascita"/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="carta_di_identita">Carta di identità:</label>
                        <input className="py-2 px-2" type="text" name="carta_di_identita" placeholder="Inserisci il numero della carta di identità del detenuto"/>
                    </div>
                </div>
                <div className="p-3 flex flex-row gap-x-5">
                    <div className="flex flex-col w-full">
                        <label htmlFor="altezza">Altezza:</label>
                        <input className="py-2 px-2" min={0} max={300} type="number" name="altezza" placeholder="in centimetri"/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="cella">Cella:</label>
                        <input className="py-2 px-2" type="text" value="Cella A2-3" name="cella" readOnly/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="inizio_detenzione">Inizio detenzione:</label>
                        <input className="py-2 px-2" type="date" value={getDate()} name="inizio_detenzione" readOnly/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="fine_detenzione">Fine detenzione:</label>
                        <input className="py-2 px-2" type="date" name="fine_detenzione"/>
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