import NavBar from "./NavBar"

export default function Layout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
  return (
    <div className="flex flex-row gap-x-5">
      <div>
        <NavBar></NavBar>
      </div>
      <div className="w-10/12 mt-10">
        {children}
      </div>
    </div>
  )
}