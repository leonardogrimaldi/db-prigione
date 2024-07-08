'use client'
import DataTable from "./DataTable";
import FormIsolamento from "./FormIsolamento";
import FormRicovero from "./FormRicovero";

export default function Page() {
    function trasferisciDetenuto() {
        
    }

    return (
        <div className="flex flex-col mt-10 w-full">
            <div className="mr-10">
                <div className="flex flex-row gap-x-2">
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Nuovo
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Elimina
                    </button>
                    <button onClick={trasferisciDetenuto} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Trasferisci
                    </button>
                </div>
                <DataTable></DataTable>
                <FormIsolamento></FormIsolamento>
            </div> 
        </div>
    );
  }