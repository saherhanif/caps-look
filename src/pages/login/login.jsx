import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import style from './Login.module.scss'
import { useState } from 'react'
export default function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const sentData = () => {
    const data = { username: userName, password: password }
    checkuserNameAndPassword(data)
    console.log('check')
  }
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
        <Button
          className={style.LIButton}
          onClick={sentData}
          label="Log In"
          aria-label="Submit"
        />
      </form>
    </div>
  )
}
async function checkuserNameAndPassword(data) {
  console.log("I'm here")
  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const json_response = await response.json()
    console.log(response.body)
  } catch (error) {
    console.log(error)
  }
}
