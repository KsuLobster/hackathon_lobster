import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import Home from './Home'
import style from './Signin.module.css'

function Signin() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // ユーザーのログイン状態を保持するstate
  const [user] = useAuthState(auth)

  // ログインボタンが押されたときの処理
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('Success to login')
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error('Failed to login')
        console.error(errorCode, errorMessage)
      })
  }

  if (user) {
    // ログイン済みの場合、Homeコンポーネントを表示
    return <Home />
  }
  // 未ログインの場合、ログイン画面を表示
  else
    return (
      <div className={style.app}>
        <div className={style.form_container}>
          <h1>ログイン</h1>
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
              ログイン
            </button>
          </form>
          <hr />
          <div className={style.signup_nav_form}>
            <div className={style.notice}>まだアカウントをお持ちでない方</div>
            <Link to="./signup" className={style.link_signup}>
              無料でサインアップ
            </Link>
          </div>
        </div>
      </div>
    )
}

export default Signin
