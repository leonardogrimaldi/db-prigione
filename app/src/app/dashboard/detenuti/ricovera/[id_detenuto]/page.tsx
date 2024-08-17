'use client'

import FormRicovero from "../FormRicovero"
import FormIsolamento from "../FormRicovero"

export default function Page({params}: {
    params: {id_detenuto: string}
}) {
    return (
        <FormRicovero params={params}></FormRicovero>
    )
}