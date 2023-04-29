import React, { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom' // ここにナビゲーションモジュール追加！
import 'firebase/auth'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import style from './Signup.module.css'

const Signup = (): JSX.Element => {
  const [displayName, setDisplayName] = useState<string>('名無し')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passworderror, setpasswordError] = useState<string>('')
  const [emailerror, setemailError] = useState<string>('')
  const navigate = useNavigate() // ページ遷移用のフック
  //firebaseと連携させている処理
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user
          updateProfile(user, {
            displayName: displayName,
          })
        }
      )
      // ユーザー登録が成功した後、userCredential.userを使ってユーザー情報を取得できる
      navigate('/home')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={style.app}>
      <div className={style.form_container}>
        <h1>サインアップ</h1>
        <form className={style.form} onSubmit={handleSubmit}>
          <div>
            <div className={style.input_label}>ユーザーネーム (表示名)</div>
            <input
              type="text"
              placeholder="名無し"
              value={displayName}
              onInput={(event: FormEvent<HTMLInputElement>): void => {
                setDisplayName(event.currentTarget.value)
              }}
            />
          </div>
          <div>
            <div className={style.input_label}>メールアドレス</div>
            <input
              type="mail"
              placeholder="xxxxx@example.com"
              value={email}
              onInput={(event: FormEvent<HTMLInputElement>): void => {
                setEmail(event.currentTarget.value)
              }}
            />
          </div>
          <div>
            <div className={style.input_label}>パスワード</div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onInput={(event: FormEvent<HTMLInputElement>): void => {
                setPassword(event.currentTarget.value)
              }}
            />
          </div>
          <button type="submit" className={style.form_submit}>
            サインアップ
          </button>
        </form>
        <hr />
        <div className={style.signin_nav_form}>
          <div className={style.notice}>すでにアカウントをお持ちの方</div>
          <Link to="/" className={style.link_signin}>
            ログイン
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
