import { DetenutoPresente } from "@/actions/action";
import { useEffect, useState } from "react";

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
                
            </tbody>
        </table>
    )
}

interface EntryProp {
    data: Map<string,string>
}
function Entry(prop: EntryProp) {
    return (
        <tr>
            {Object.keys(prop.data).map(v => {return <td>{v}</td>})}
        </tr>
    )
} 