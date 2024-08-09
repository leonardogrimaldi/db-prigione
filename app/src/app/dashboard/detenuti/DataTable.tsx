import { QueryResult } from "pg";
import { MouseEvent } from "react";

interface DataTableProps {
    data: any[]
}

export default function DataTable(props: DataTableProps) {
    return (
        <table className="table-auto w-full bg-white">
            <thead>
                <tr>
                    {Object.keys(props.data[0]).map(k => {return <th key={k}>{k}</th>})}                    
                </tr>
            </thead>
            <tbody>
                {props.data.map(m => {return <TableRow key={m} data={m}/>})}
            </tbody>
        </table>
    )
}

interface EntryProp {
    data: Array<string>
}
/**
 * Assumes that first element of Array<string> is the identificator
 * @param prop 
 * @returns 
 */
function TableRow(prop: EntryProp) {
    function rowClicked(e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>) {
        console.log(e.currentTarget.firstElementChild?.nodeValue)
    }
    return (
        <tr id={Object.values(prop.data)[0]} onClick={e=> rowClicked(e)} className="hover:bg-blue-200">
            {Object.values(prop.data).map(v => {
                return <td key={v}>{v}</td>
                })}
        </tr>
    )
} 