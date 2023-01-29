import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Projects from "./pages/Projects/index";
import NavBar from "./components/NavBar";
import Home from "./pages/Home/index";
import Absence from "./pages/Absence/index"
import Employee from "./pages/Employes/index";
import Sidebar from "./components/Sidebar";
import Style from "./style.module.scss"
import "./reset.scss"

function App() {
  // console.log(window.location.pathname)

  // if (window.location.pathname === '/login') {
  //   return 1
  // }

  return (
    <div style={{ textAlign: 'center' }}>

      <Router>
        <NavBar />
        <div className={Style.pageBody}>
          <Sidebar />
          <div className={Style.mainPage}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Projects" element={<Projects />} />
              <Route path="/Absence" element={<Absence />} />
              <Route path="/Employes" element={<Employee />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div >
  )
}

export default App
