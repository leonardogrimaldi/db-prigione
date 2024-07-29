"use client"
import { Fragment, useEffect, useState } from "react"
import {getCells } from "@/actions/action"
import { Cella } from "../../../../../lib/types"

export default function SelectCelle() {
    const [celle, setCelle] = useState<Cella[]>();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getCells();
                setCelle(result);
            } catch {
                throw new Error("Failed to fetch data")
            }
        };
        fetchData();
    }, []);

    return (
        <Fragment>
            <label htmlFor="celle">Cella:</label>
            <select name="celle" className="py-2 px-2">
                {celle?.map(c => {return <option key={c.id_blocco + c.id_piano + c.id_cella}>{c.id_blocco + c.id_piano + c.id_cella}</option>})}
            </select>
        </Fragment>
    )
}