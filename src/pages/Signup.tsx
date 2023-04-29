import React, { useState, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // ここにナビゲーションモジュール追加！
import 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Signup = (): JSX.Element => {
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
    console.log('登録', email, password)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      // ユーザー登録が成功した後、userCredential.userを使ってユーザー情報を取得できる
      const user = userCredential.user

      navigate('/create-book')
    } catch (error) {
      console.log(error)
    }
  }
  //emailを設定している処理
  const handleChangeEmail = (event: FormEvent<HTMLInputElement>): void => {
    setEmail(event.currentTarget.value)
  }
  //パスワードを設定している処理
  const handleChangePassword = (event: FormEvent<HTMLInputElement>): void => {
    setPassword(event.currentTarget.value)
  }

  //emailアドレスじゃないものを設定されたときにエラーを出す処理
  useEffect(() => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setemailError('有効なメールアドレスを入力してください')
    } else {
      setemailError('有効なメールアドレスです！')
    }
  }, [email])
  //パスワードが六文字に満たないとエラーを出す処理
  useEffect(() => {
    if (password.length < 6) {
      setpasswordError(
        'パスワードとして使用できません。パスワードは6文字以上で入力してください'
      )
    } else {
      setpasswordError('パスワードとして使用できます！')
    }
  }, [password])

  return (
    <div>
      <h1>ユーザ登録</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={(event) => handleChangeEmail(event)}
            value={email}
          />
        </div>
        <div>{emailerror}</div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            onChange={(event) => handleChangePassword(event)}
            value={password}
          />
        </div>
        <div>{passworderror}</div>
        <div>
          <button type="submit">登録</button>
        </div>
      </form>
    </div>
  )
}

export default Signup
