import { QueryResult } from "pg";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";

export interface DataTableProps {
    data: Array<Array<string>>,
    setSelectedId: Dispatch<SetStateAction<string>>
}

export default function DataTable(props: DataTableProps) {
    const [activeElement, setActiveElement] = useState('')
    const updateActiveElement = (id: string) => {
        props.setSelectedId(id)
        setActiveElement(activeElement !== id ? id : '')
    }
    return (
        <table className="table-auto w-full bg-white">
            <thead>
                <tr>
                    {Object.keys(props.data[0]).map(k => {return <th key={k}>{k}</th>})}                    
                </tr>
            </thead>
            <tbody>
                {props.data.map(m => {if (m.length != 0) {return <TableRow onClick={(val: string) => updateActiveElement(val)} activeElement={activeElement} key={Object.values(m)[0]} data={m} />}})}
            </tbody>
        </table>
    )
}

interface EntryProp {
    data: Array<string>
    activeElement: string
    onClick: (val: string) => void
}
/**
 * Assumes that first element of Array<string> is the identificator
 * @param prop 
 * @returns 
 */
function TableRow(prop: EntryProp) {
    const id: string = Object.values(prop.data)[0]
    const activeStyle = "bg-blue-400 "
    const toggleClassCheck = id === prop.activeElement ? activeStyle : ''
    function rowClicked() {
        prop.onClick(id)
    }
    return (
        <tr id={id} onClick={rowClicked} className={toggleClassCheck + "hover:bg-blue-200"}>
            {Object.values(prop.data).map(v => {
                return <td key={v}>{v}</td>
                })}
        </tr>
    )
} 