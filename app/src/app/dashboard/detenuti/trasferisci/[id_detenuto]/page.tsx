'use client'

import FormTrasferimento from "../FormTrasferimento"

export default function Page({params}: {
    params: {id_detenuto: string}
}) {
    return (
        <FormTrasferimento params={params}></FormTrasferimento>
    )
}