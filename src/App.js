import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Projects from "./pages/projects/index";
import NavBar from "./components/NavBar";
import Home from "./pages/Home/index";
import Absence from "./pages/Absence/index"
import Employee from "./pages/Employes/index";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <div style={{ textAlign: 'center' }}>

      <Router>
        <NavBar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Absence" element={<Absence />} />
          <Route path="/Employes" element={<Employee />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
