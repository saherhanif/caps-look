import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import style from './Login.module.scss'
import { useState } from 'react'
function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className={style.LoginContainer}>
      <form className={style.LoginFeilds}>
        <span className="p-input-icon-left">
          <i className="pi pi-user" />
          <InputText
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="UserName"
          />
        </span>

        <div className="p-input-icon-left">
          <i className="pi pi-lock z-1" />
          <Password
            className={style.passwordField}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            toggleMask
            feedback={false}
          />
        </div>

        <div
          className={
            'flex align-items-center align-self-start ' + style.remember
          }
        >
          <Checkbox
            inputId="rememberMe"
            name="remember"
            value={rememberMe}
            onChange={(e) => setRememberMe(e.checked)}
            checked={rememberMe}
          />
          <label htmlFor="rememberMe" className="ml-2">
            Remember Me
          </label>
        </div>
        <Button className={style.LIButton} label="Log In" aria-label="Submit" />
      </form>
    </div>
  )
}

export default Login
