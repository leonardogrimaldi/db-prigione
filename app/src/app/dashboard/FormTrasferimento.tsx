export default function FormTrasferimento() {
    return (
        <form className="bg-blue-50 pt-5 pl-5 rounded-lg">
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
                    <div className="flex flex-col w-full">
                        <label htmlFor="celleLetto">Da:</label>
                        <input className="py-2 px-2" value="Cella C42" type="text" name="id_cella" readOnly/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="celleLetto">A:</label>
                        <select className="py-2 px-2" name="celleLetto">
                            <option label=" ">Scegli una cella</option>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                        </select>
                    </div>
                </div>
                <div className="invisible p-3 flex flex-row gap-x-5 justify-end">
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="celleLetto">Con:</label>
                        <select className="py-2 px-2" name="celleLetto">
                            <option label=" ">Scegli una cella</option>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
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