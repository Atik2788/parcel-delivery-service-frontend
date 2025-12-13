
import { Outlet } from "react-router"
import CommonLayout from "./layout/CommonLayout"

function App() {

  return (
    <CommonLayout>
      <Outlet></Outlet>
    </CommonLayout>
  )
}

export default App
