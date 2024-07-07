import DataTable from "./DataTable";

export default function Page() {
    return (
        <div className="flex flex-col gap-y-10 mt-10 w-10/12">
            <div className="flex flex-row gap-x-2">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Nuovo
                </button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Elimina
                </button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Trasferisci
                </button>
            </div>
            <DataTable></DataTable>
        </div>
    );
  }