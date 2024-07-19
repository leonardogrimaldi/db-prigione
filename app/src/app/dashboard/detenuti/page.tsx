'use client'
import Link from "next/link";
import DataTable from "./DataTable";

export default function DetenutiPage() {
    return (
        <div className="flex flex-col w-full">
            <div className="mr-10">
                <div className="flex flex-row gap-x-2">
                    <Link href={'/dashboard/detenuti/nuovo'}>
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            Nuovo
                        </button>
                    </Link>
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Elimina
                    </button>
                    <Link href={'/dashboard/detenuti/trasferisci'}>
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            Trasferisci
                        </button>
                    </Link>
                    <Link href={'/dashboard/detenuti/isola'}>
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            Isola
                        </button>
                    </Link>
                    <Link href={'/dashboard/detenuti/ricovera'}>
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            Ricovera
                        </button>
                    </Link>
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Visualizza: Rientrati
                    </button>
                </div>
                <DataTable></DataTable>
            </div>
        </div>
    );
  }