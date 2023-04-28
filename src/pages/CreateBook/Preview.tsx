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
      {/* storyPartsをmap関数を使ってループし、各部分を表示します。
      ただし、現在のページ番号とindexが一致する場合のみ表示され、それ以外は非表示にします。 */}
      {storyParts.map((part, index) => (
        <div
          key={index}
          className={styles.page}
          style={{ display: currentPage === index ? 'block' : 'none' }}
        >
          {/* 各部分に対応する画像を表示します。 */}
          <img src="/assets/dummy.png" alt="文章を説明する絵" />
          <p>{part}</p>
        </div>
      ))}
      {/* 前へと次へのボタンを表示します。クリックするとそれぞれhandlePreviousPage、handleNextPage関数が実行されます。 */}
      <div className={styles.buttonContainer}>
        <button onClick={handlePreviousPage}>前へ</button>
        <button onClick={handleNextPage}>次へ</button>
      </div>
    </div>
  )
}

export default Preview
