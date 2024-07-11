'use client'
import Link from "next/link"
import { useSelectedLayoutSegment } from 'next/navigation'
import { useEffect } from "react"

export default function NavBar() {
    const segment = useSelectedLayoutSegment()
    useEffect(() => {
        const selectedStyle = "bg-blue-300" 
        const links = Array.from(document.getElementsByClassName("pageLink"))
        const matches = links.filter(e => e.id == segment)
        links.forEach(e => e.classList.remove(selectedStyle))
        if (matches.length != 0) {
            matches[0]?.classList.add(selectedStyle)
        } else {
            document.getElementById("home")?.classList.add(selectedStyle)
        }
    })

    return (
        <nav className="flex flex-col justify-start h-screen bg-white">
            <div className="h-20 p-2 text-2xl">
                DB-Prigione
            </div>
            <Link href="/dashboard/">
                <div id="home" className="pageLink p-2 text-lg">
                    Home
                </div>
            </Link>
            <Link href="/dashboard/detenuti">
                <div id="detenuti" className="pageLink p-2 text-lg">
                    Detenuti
                </div>
            </Link>
            <Link href="/dashboard/guardie">
                <div id="guardie" className="pageLink p-2 text-lg">
                    Guardie
                </div>
            </Link>
            <Link href="/dashboard/orari">
                <div id="orari" className="pageLink p-2 text-lg">
                    Orari
                </div>
            </Link>
        </nav>
    )
}