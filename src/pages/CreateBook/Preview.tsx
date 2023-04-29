// Preview.tsx
import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import styles from './Preview.module.css'

function Preview() {
  const [storyParts, setStoryParts] = useState<string[]>([]) // ストーリーの各部分
  const [currentPage, setCurrentPage] = useState(0) // 現在のページ番号
  const location = useLocation()
  const previewRef = useRef<HTMLDivElement | null>(null)

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

  // PDFを生成・ダウンロード
  const handleDownloadPdf = async () => {
    if (!previewRef.current) return // previewRef.currentがnullでないことを確認

    const doc = new jsPDF('p', 'px', [
      previewRef.current.clientWidth,
      previewRef.current.clientHeight,
    ])

    for (let i = 0; i < storyParts.length; i++) {
      setCurrentPage(i)
      await new Promise((r) => setTimeout(r, 200)) // レンダリングが完了するまで待つ
      const canvas = await html2canvas(previewRef.current)
      const imgData = canvas.toDataURL('image/png')
      doc.addImage(
        imgData,
        'PNG',
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight()
      ) // 修正: 幅と高さを指定
      if (i < storyParts.length - 1) {
        doc.addPage([
          previewRef.current.clientWidth,
          previewRef.current.clientHeight,
        ])
      }
    }
    doc.save('story.pdf') // PDFをダウンロード
  }

  useEffect(() => {
    // InputFormから生成データを受け取る
    const storyText = location.state.response

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
        <button onClick={handleDownloadPdf}>PDFをダウンロード</button>
      </div>
    </div>
  )
}

export default Preview
