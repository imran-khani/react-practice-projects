import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto">
           <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default RootLayout