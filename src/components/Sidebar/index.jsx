import style from './style.module.scss'
import { Link } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { AiOutlineSetting } from 'react-icons/ai'
import api from '../../config'

const Sidebar = (props) => {
  const logout = async () => {
    try {
      await fetch(`${api.apiRequest}/Logout`, {
        credentials: 'include'
      })
      window.location.href = '/'
    } catch (err) {
      console.log(err)
    }
  }
const Sidebar = () => {
  return (
    <div>
      <nav className={style.sidebar}>
        <Link to="/home" className={style.link}>
          Home
        </Link>
        <Link to="/Sites" className={style.link}>
          Sites
        </Link>
        <Link to="/Projects" className={style.link}>
          Projects
        </Link>

        <Link to="/Absence" className={style.link}>
          Absence
        </Link>

        <Link to="/Employes" className={style.link}>
          Employess
        </Link>
        <hr className={style.cutter} />
        <Link to="/Settings" className={style.link}>
          Settings <AiOutlineSetting size="30px" />
        </Link>
        {/* <Link to="/" className={style.link}>
          Logout <HiOutlineLogout color="white" size="30px" onClick={logout} />
        </Link> */}
        <a href="/" className={style.link} onClick={logout}>
          Logout
          <HiOutlineLogout color="white" size="30px" />
        </a>
      </nav>
    </div>
  )
}
}

export default Sidebar
