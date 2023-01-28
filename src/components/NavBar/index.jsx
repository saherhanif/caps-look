import style from './style.module.scss'
import { Link } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { AiOutlineSetting } from 'react-icons/ai'
const NavBar = () => {
  return (
    <div>
      <nav>
        <div style={{marginTop:'160px'}}>
          <Link to="/" className={style.link}>
            Home
          </Link>
          <br />
          <br />
          <Link to="/Sites" className={style.link}>
            Sites
          </Link>
          <br />
          <br />
          <Link to="/Projects" className={style.link}>
            Projects
          </Link>
          <br />
          <br />

          <Link to="/Absence" className={style.link}>
            Absence
          </Link>
          <br />
          <br />

          <Link to="/Employes" className={style.link}>
            Employess
          </Link>
          <br />
          <br />
          <hr />
          <Link to="/Settings" className={style.link}>
            Settings <AiOutlineSetting />
          </Link>
          <br />
          <br />
          <Link to="/" className={style.link}>
            Log Out <HiOutlineLogout color="white" size="20px" />
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
