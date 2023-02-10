import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  useMatch
} from 'react-router-dom'
import Projects from './pages/Projects/index'
import NavBar from './components/NavBar'
import Home from './pages/Home/index'
import Absence from './pages/Absence/index'
import Cadence from './pages/Cadence/index'
import Employee from './pages/Employes/index'
import Sidebar from './components/Sidebar'
import Login from './pages/Login/Login'
import Style from './style.module.scss'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import './reset.scss'
import './App.scss'

function App() {
  if (window.location.pathname === '/') {
    return (
      <div style={{ textAlign: 'center' }}>
        <NavBar />

        <Login />
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Router>
        <NavBar />
        <div className={Style.pageBody}>
          <Sidebar />
          <div className={Style.mainPage}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/Projects" element={<Projects />} />
              <Route path="/Absence" element={<Absence />} />
              <Route path="/Employes" element={<Employee />} />
              <Route path="/Cadence" element={<Cadence />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
