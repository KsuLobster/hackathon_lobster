import style from './Footer.module.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <Link to="/" className={style.logo}>
        絵本ツクール
      </Link>
      <div className={style.links}>
        <Link to="./usage">使い方</Link>
        <Link to="./terms">利用規約</Link>
        <Link to="./privacy">プライバシーポリシー</Link>
        <Link to="./contact">お問い合わせ</Link>
      </div>
      <div className={style.copyright_notice}>KSU Lobster © 2023</div>
    </footer>
  )
}

export default Footer
