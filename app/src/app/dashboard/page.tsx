'use client'
import { GiornoCont, getAndamentoSettimanale } from '@/actions/action';
import { BarChart, BarChartProps } from '@mui/x-charts';
import { Fragment, SetStateAction, useEffect, useState } from 'react';
import DataTable from './detenuti/DataTable';
export default function HomePage() {
    const [topFive, setTopFive] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAndamentoSettimanale();
                //setTopFive(result);
            } catch {
                throw new Error("Failed to fetch data")
            }
        };
        fetchData();
    }, [])
    return (
        <div className="flex flex-col mt-10 w-full">
            <Grafico></Grafico>
            {topFive && <DataTable data={[]} setSelectedId={function (value: SetStateAction<string>): void {
                throw new Error('Function not implemented.');
            } }></DataTable>}
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
            {chartData && chartData.length != 0 &&
            <Fragment>
                <div className="text-2xl">Andamento settimanale</div>
                <BarChart xAxis={[{scaleType: 'band', data: chartData.map(d => d.date)}]} series={[{data: chartData.map(d => d.numero)}]} width={500} height={300}></BarChart>
            </Fragment>
            }  
        </div>
    )
}