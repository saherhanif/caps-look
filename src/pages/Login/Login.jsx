import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import style from './Login.module.scss'
import { useState } from 'react'
function Login() {
  const [Email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState(false)
  const RESPONSE_STATUS = {
    FAIL: false,
    SUCSSESS: true
  }
  const submitUser = async () => {
    try {
      if (Email.length === 0 || password.length === 0) setError(true)
      else {
        const data = { Email: Email, password: password }
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        const result = await response.json()
        if (result.success === RESPONSE_STATUS.SUCSSESS) {
          window.location.href = '/home'
        } else {
          setError(true)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={style.LoginContainer}>
      <form className={style.LoginFeilds}>
        <span className="p-input-icon-left">
          <i className="pi pi-user" />
          <InputText
            name="username"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
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
        <Button
          className={style.LIButton}
          label="Log In"
          onClick={submitUser}
          type="button"
          aria-label="Submit"
        />
        {error ? <label className="message"> Something went wrong!</label> : ''}
      </form>
    </div>
  )
}

export default Login
