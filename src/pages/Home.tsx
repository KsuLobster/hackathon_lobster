import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
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
      </main>
    </div>
  )
}

export default Home
