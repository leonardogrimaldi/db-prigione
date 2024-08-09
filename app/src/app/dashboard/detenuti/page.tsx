'use client'
import Link from "next/link";
import DataTable from "./DataTable";
import {getDetenutiPresenti, getDetenutiRientrati } from "@/actions/action";
import { useEffect, useState } from "react";
import { QueryResult } from "pg";

export default function DetenutiPage() {
    const [data, setData] = useState<any[]>(['']);
    const [activeButton, setActiveButton] = useState(0);
    const activeButtonStyle: string = "border-2 border-blue-500 "
    const toggleClassCheck = (number: number) => activeButton == number ? activeButtonStyle : '' 
    useEffect(() => {
        visualizzaPresenti();
    }, []);

    function visualizzaPresenti() {
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
        setActiveButton(0)
    }
    function visualizzaRientrati() {
        const fetchData = async () => {
            try {
                const result = await getDetenutiRientrati();
                console.log(result)
                setData(result)
            } catch (e) {
                console.log(e)
                throw new Error("Failed to fetch data")
            }
        };
        fetchData();
        setActiveButton(1)
    }
    return (
        <div className="flex flex-col w-full">
            <div className="mr-10">
                <div className="flex flex-row gap-x-2">
                    <Link href={'/dashboard/detenuti/nuovo'}>
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            Nuovo
                        </button>
                    </Link>
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
                    <button onClick={visualizzaPresenti} className={toggleClassCheck(0) + "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"}>
                        Visualizza: Presenti
                    </button>
                    <button onClick={visualizzaRientrati} className={toggleClassCheck(1) + "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"}>
                        Visualizza: Rientrati
                    </button>
                </div>
                <DataTable key={activeButton} data={data}></DataTable>
            </div>
        </div>
    );
  }