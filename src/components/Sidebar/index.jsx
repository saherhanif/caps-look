import style from './style.module.scss'
import { Link } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { AiOutlineSetting } from 'react-icons/ai'

const Sidebar = () => {
  return (
    <nav className={style.sidebar}>
      <Link to="/" className={style.link}>
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
        Settings <AiOutlineSetting />
      </Link>
      <Link to="/" className={style.link}>
        Logout <HiOutlineLogout color="white" size="20px" />
      </Link>
    </nav>
  )
}

export default Sidebar
