function NavBar() {
    return (
        <nav className="flex flex-col justify-start h-screen bg-white">
            <div className="h-20 p-2">
                DB-Prigione
            </div>
            <div className="p-2">
                Home
            </div>
            <div className="p-2">
                Detenuti
            </div>
            <div className="p-2">
                Guardie
            </div>
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