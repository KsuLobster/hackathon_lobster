import AuthContext from '../../AuthContext'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import styles from './InputForm.module.css'

function InputForm() {
  // InputForm コンポーネント内で useContext フックを使って currentUser を取得する
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error(
      'AuthContext is undefined, did you forget to wrap your component in <AuthProvider>?'
    )
  }
  const { currentUser } = context

  const [condition1, setCondition1] = useState('元気')
  const [condition2, setCondition2] = useState('走り回る男の子')
  const [response, setResponse] = useState('むかしむかし、あるところに...')
  const [previewEnabled, setPreviewEnabled] = useState(false)
  const navigate = useNavigate() // ページ遷移用のフック

  // Previewページ遷移のハンドラ
  const handlePreview = () => {
    navigate('/create-book/preview', { state: { response } })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    // 非同期処理になるためasyncを追加
    e.preventDefault()

    // ユーザーがログインしていない場合、早期に関数を終了
    if (!currentUser) {
      console.error('サインインできてないよ！')
      return
    }

    // generateStoryPromptに条件フォームを使ってプロンプトを入れる
    const generateStoryPrompt = `${condition1}で${condition2}の子供向けな物語を書いて下さい。むかしむかし、あるところに...`

    // 環境変数からエンドポイントURLを取得
    const apiUrl = process.env.REACT_APP_STORY_GENERATOR_API_URL

    // OpenAI APIを呼び出し、絵本の内容を生成する処理をここに書く
    try {
      // APIへのリクエストを送信
      const response = await fetch(apiUrl as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: generateStoryPrompt,
        }),
      })

      // レスポンスが正常でない場合、エラーをスロー
      if (!response.ok) {
        throw new Error('Error calling API.')
      }

      // レスポンスのJSONを解析し、ストーリーをステートに設定
      const result = await response.json()
      console.log(result)
      setResponse(result.story)
      console.log(
        'responseに' +
          result.story +
          '(' +
          response +
          ')' +
          'をセットしました！'
      )
      setPreviewEnabled(true)
      console.log('データは取得できたよ！')

      // Firestoreに保存
      const db = getFirestore()

      const storiesCollection = collection(db, 'stories')
      await addDoc(storiesCollection, {
        userId: currentUser.uid,
        story: result.story,
      })
      console.log('通ったよ！')
    } catch (error) {
      // API呼び出しでエラーが発生した場合、コンソールにエラーを出力し、ステートにエラーメッセージを設定
      console.error('Error calling API:', error)
      console.error('Full error object:', JSON.stringify(error))
      setResponse('Error calling API.')
      console.log('エラーでたよ!')
    }
  }

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="condition1" className={styles.label}>
            どんなで？:{' '}
          </label>
          <input
            type="text"
            id="condition1"
            value={condition1}
            onChange={(e) => setCondition1(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="condition2" className={styles.label}>
            どのような？:{' '}
          </label>
          <input
            type="text"
            id="condition2"
            value={condition2}
            onChange={(e) => setCondition2(e.target.value)}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          生成
        </button>
        {previewEnabled && (
          <button
            type="button"
            onClick={handlePreview}
            className={styles.button}
          >
            プレビューを表示
          </button>
        )}
      </form>
      <textarea readOnly value={response} className={styles.textArea} />
    </div>
  )
}

export default InputForm
