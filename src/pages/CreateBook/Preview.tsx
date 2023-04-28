// Preview.tsx
import React, { useEffect, useState } from 'react'
import styles from './Preview.module.css'

function Preview() {
  const [storyParts, setStoryParts] = useState<string[]>([]) // ストーリーの各部分
  const [currentPage, setCurrentPage] = useState(0) // 現在のページ番号

  // 次のページへ
  const handleNextPage = () => {
    if (currentPage < storyParts.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  // 前のページへ
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    // ダミーデータを用意
    const storyText =
      'むかしむかし、あるところに赤ちゃんがいました。その赤ちゃんはとても元気で、いつも走り回っていました。しかし、ある日、彼は森の中で迷子になってしまいました。幸いなことに、彼は森の動物たちに助けられ、無事に家に帰ることができました。それからというもの、彼は森を大切にするようになりました。そして、森の動物たちとも仲良くなりました。'

    // "。"で文章を分割し、配列を格納する
    const parts = storyText.split('。')
    setStoryParts(parts)
  }, [])

  return (
    <div className={styles.preview}>
      {storyParts.map((part, index) => (
        <div
          key={index}
          className={styles.page}
          style={{ display: currentPage === index ? 'block' : 'none' }}
        >
          <p>{part}</p>
          {/* ここで各パートに対応する絵を表示します */}
        </div>
      ))}
      <div className={styles.buttonContainer}>
        <button onClick={handlePreviousPage}>前へ</button>
        <button onClick={handleNextPage}>次へ</button>
      </div>
    </div>
  )
}

export default Preview
