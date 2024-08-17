'use client'

import FormIsolamento from "../FormIsolamento"

export default function Page({params}: {
    params: {id_detenuto: string}
}) {
    return (
        <FormIsolamento params={params}></FormIsolamento>
    )
}