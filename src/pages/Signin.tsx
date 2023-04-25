import style from './Signin.module.css'
import { Link } from 'react-router-dom'

function Signin() {
  return (
    <div className={style.app}>
      <div className={style.form_container}>
        <h1>サインイン</h1>
        <form className={style.form}>
          <div>
            <div className={style.input_label}>メールアドレス</div>
            <input type="mail" placeholder="xxxxx@example.com" />
          </div>
          <div>
            <div className={style.input_label}>パスワード</div>
            <input type="password" placeholder="password" />
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
