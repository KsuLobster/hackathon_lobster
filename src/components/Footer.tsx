import style from './Footer.module.css'

function Footer() {
  return (
    <footer>
      <a href="/" className={style.logo}>
        絵本ツクール
      </a>
      <div className={style.links}>
        <a href="./usage">使い方</a>
        <a href="./terms">利用規約</a>
        <a href="./privacy">プライバシーポリシー</a>
        <a href="./contact">お問い合わせ</a>
      </div>
      <div className={style.copyright_notice}>KSU Lobster © 2023</div>
    </footer>
  )
}

export default Footer
