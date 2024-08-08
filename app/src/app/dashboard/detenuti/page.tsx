'use client'
import Link from "next/link";
import DataTable from "./DataTable";
import { DetenutoPresente, getDetenutiPresenti } from "@/actions/action";
import { useEffect, useState } from "react";

export default function DetenutiPage() {
    const [data, setData] = useState<Array<DetenutoPresente>>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDetenutiPresenti();
                console.log(result)
                setData(result)
            } catch (e) {
                console.log(e)
                throw new Error("Failed to fetch data")
            }
        };
        fetchData();
    }, []);
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
                
            </div>
        </div>
    );
  }