import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useAuth } from 'reactfire'

function SignUp() {
  //authを定義
  const auth = useAuth()

  // emailを記述する場所
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = e.currentTarget
      .elements as typeof e.currentTarget.elements & {
      email: { value: string }
      password: { value: string }
    }
    // アカウントとパスワードを作る場所
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      )
      const user = userCredential.user
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
      </div>
      <button type="submit">Sign up</button>
    </form>
  )
}
export default SignUp
