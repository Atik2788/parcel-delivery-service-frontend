
import { Outlet } from "react-router"
import CommonLayout from "./layout/CommonLayout"
import Navbar from "./layout/Navbar"
import { Footer } from "./layout/Footer"

function App() {

  return (
    <CommonLayout>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </CommonLayout>
  )
}

export default App
