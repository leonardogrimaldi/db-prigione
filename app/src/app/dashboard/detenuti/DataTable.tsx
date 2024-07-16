import data from "./data.json"

export default function DataTable() {
    type myEntry = {
        one: string,
        two: string
    }
    const entries: myEntry = JSON.parse(JSON.stringify(data))
    return (
        <table className="table-auto w-full bg-white">
            <thead>
                <tr>
                    {Object.keys(entries).map(e => {return <th key={e}>{e}</th>})}
                </tr>
            </thead>
            <tbody>
                <tr id="01" className="hover:bg-blue-300">
                    <td>Mario</td>
                    <td>Rossi</td>
                    <td>1961-01-02</td>
                    <td>1962-02-03</td>
                    <td>A3-2</td>
                    <td>No</td>
                </tr>
                <tr id="02">
                    <td>Witchy Woman</td>
                    <td>The Eagles</td>
                    <td>1972</td>
                </tr>
                <tr>
                    <td>Shining Star</td>
                    <td>Earth, Wind, and Fire</td>
                    <td>1975</td>
                </tr>
            </tbody>
        </table>
    )
}