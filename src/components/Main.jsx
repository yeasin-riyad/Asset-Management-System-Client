import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Main = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet className="container"></Outlet>
    </div>
  )
}

export default Main