import style from './Signin.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useState } from 'react'

function Signin() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const nav = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('Success to login')
        console.log(user)
        nav('/home')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error('Failed to login')
        console.error(errorCode, errorMessage)
      })
  }

  return (
    <div className={style.app}>
      <div className={style.form_container}>
        <h1>サインイン</h1>
        <form className={style.form} onSubmit={handleLogin}>
          <div>
            <div className={style.input_label}>メールアドレス</div>
            <input
              type="mail"
              placeholder="xxxxx@example.com"
              value={email}
              onInput={(e) => {
                setEmail(e.currentTarget.value)
              }}
            />
          </div>
          <div>
            <div className={style.input_label}>パスワード</div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onInput={(e) => {
                setPassword(e.currentTarget.value)
              }}
            />
          </div>
          <Link to="./forgot-password" className={style.notice}>
            パスワードを忘れた？
          </Link>
          <button type="submit" className={style.form_submit}>
            サインイン
          </button>
        </form>
        <hr />
        <div className={style.signup_nav_form}>
          <div className={style.notice}>まだアカウントをお持ちでない方</div>
          <Link to="./signup" className={style.link_signup}>
            サインアップ
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signin
