import React, { useState, FormEvent } from 'react'
import 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    console.log('登録', email, password)
    try {
      createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeEmail = (event: FormEvent<HTMLInputElement>): void => {
    setEmail(event.currentTarget.value)
  }

  const handleChangePassword = (event: FormEvent<HTMLInputElement>): void => {
    setPassword(event.currentTarget.value)
  }

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
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            onChange={(event) => handleChangePassword(event)}
            value={password}
          />
        </div>
        <div>
          <button type="submit">登録</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
