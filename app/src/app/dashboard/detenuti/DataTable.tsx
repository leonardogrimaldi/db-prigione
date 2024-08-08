import { DetenutoPresente } from "@/actions/action";
import { useEffect, useState } from "react";
import { string } from "zod";

interface DataTableProps {
    data: Map<string,string>[]
}

export default function DataTable(props: DataTableProps) {
    return (
        <table className="table-auto w-full bg-white">
            <thead>
                <tr>
                    {Object.keys(props.data[0]).map(k => {return <th>{k}</th>})}                    
                </tr>
            </thead>
            <tbody>
                {props.data.map(m => {return <Entry data={m}/>})}
            </tbody>
        </table>
    )
}

interface EntryProp {
    data: Map<string,string>
}
function Entry(prop: EntryProp) {
    console.log(prop)
    return (
        <tr>
            {Object.values(prop.data).map(v => {
                return <td>{v}</td>
                })}
        </tr>
    )
} 