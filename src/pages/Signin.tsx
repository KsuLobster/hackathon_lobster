import style from './Signin.module.css'
import { Link } from 'react-router-dom'

function Signin() {
  return (
    <div className={style.app}>
      <div className={style.form_container}>
        <h1>サインイン</h1>
        <form className={style.form}>
          <input type="mail" placeholder="メールアドレス" />
          <input type="password" placeholder="パスワード" />
          <button type="submit" className={style.form_submit}>
            サインイン
          </button>
          <Link to="./forget-password" className={style.notice}>
            パスワードを忘れた？
          </Link>
        </form>
        <hr />
        <Link to="./signup" className={style.link_signup}>
          サインアップ
        </Link>
      </div>
    </div>
  )
}

export default Signin
