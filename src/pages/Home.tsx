import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.top_title}>
        <span className={styles.big}>理想</span>の
        <span className={styles.big}>絵本</span>をつくります。
        <br />
        <span className={styles.big}>AI</span>が。
      </h1>
      <div className={styles.main}>
        {/* ナビゲーションセクション */}
        <section className={styles.navigation}>
          {/* 「絵本生成」へのリンク */}
          <Link to="/create-book" className={styles.navItem}>
            <img src="/assets/homeBookGeneration.png" alt="絵本生成" />
            <h2>絵本生成</h2>
          </Link>
          {/* 「絵本RPG」へのリンク */}
          <Link to="/rpg-book" className={styles.navItem}>
            <img src="/assets/homeBookRPG.png" alt="絵本RPG" />
            <h2>絵本RPG</h2>
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Home
