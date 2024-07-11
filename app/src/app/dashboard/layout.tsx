import Link from "next/link"

function NavBar() {
    return (
        <nav className="flex flex-col justify-start h-screen bg-white">
            <div className="h-20 p-2">
                DB-Prigione
            </div>
            <Link href="/dashboard/">
                <div className="p-2">
                    Home
                </div>
            </Link>
            <Link href="/dashboard/detenuti">
                <div className="p-2">
                    Detenuti
                </div>
            </Link>
            <Link href="/dashboard/guardie">
            <div className="p-2">
                Guardie
            </div>
            </Link>
        </nav>
    )
}
export default function Layout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
  return (
    <div className="flex flex-row gap-x-5">
        <NavBar></NavBar>
        {children}
    </div>
  )
}