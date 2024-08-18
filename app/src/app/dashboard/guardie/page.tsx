'use client'
import Link from "next/link";
import {getDetenutiPresenti, getDetenutiRientrati } from "@/actions/action";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DataTable from "../detenuti/DataTable";

export default function Guardie() {
    const [data, setData] = useState<any[]>(['']);

    const [selectedPersonale, setSelectedPersonale] = useState('')
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
                    <Link href={'/dashboard/guardie/nuovo'}>
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            Nuovo
                        </button>
                    </Link>
                </div>
                <DataTable data={data} setSelectedId={setSelectedPersonale}></DataTable>
            </div>
        </div>
    );
  }