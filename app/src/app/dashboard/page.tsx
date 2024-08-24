'use client'
import { GiornoCont, SpostamentoSolitaria, getAndamentoSettimanale, topCinqueSpostamentiSolitaria } from '@/actions/action';
import { BarChart, BarChartProps } from '@mui/x-charts';
import { Fragment, SetStateAction, useEffect, useState } from 'react';
import DataTable from './detenuti/DataTable';
export default function HomePage() {
    const [topFive, setTopFive] = useState<any[]>([''])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await topCinqueSpostamentiSolitaria();
                setTopFive(result);
            } catch {
                throw new Error("Failed to fetch data")
            }
        };
        fetchData();
    }, [])
    return (
        <div className="flex flex-col mt-10 w-full">
            <Grafico></Grafico>
            <div className="mt-5 bg-blue-200 p-4 rounded-lg w-full drop-shadow-lg">
                <div className='text-2xl'>Top cinque detenuti spostati in celle solitarie</div>
            {topFive && <DataTable data={topFive} setSelectedId={function (value: SetStateAction<string>): void {
                throw new Error('Function not implemented.');
            } }></DataTable>}
            </div>
        </div>
    );
}

function Grafico() {
    const [chartData, setData] = useState<GiornoCont[]>()
    console.log(chartData)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAndamentoSettimanale();
                setData(result);
            } catch {
                throw new Error("Failed to fetch data")
            }
        };
        fetchData();
    }, [])
    return (
        <div className="bg-blue-200 p-4 rounded-lg w-max drop-shadow-lg">
            <div className="text-2xl">Andamento settimanale</div>
            {chartData && chartData.length != 0 &&
            <Fragment>
                <BarChart xAxis={[{scaleType: 'band', data: chartData.map(d => d.date)}]} series={[{data: chartData.map(d => d.numero)}]} width={500} height={300}></BarChart>
            </Fragment>
            }  
        </div>
    )
}