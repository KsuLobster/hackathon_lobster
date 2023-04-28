import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

function InputForm() {
  const [condition1, setCondition1] = useState('')
  const [condition2, setCondition2] = useState('')
  const [generateStoryPrompt, setGenerateStoryPrompt] = useState('')
  const [response, setResponse] = useState('')
  const navigate = useNavigate() // ページ遷移用のフック


  const handleSubmit = async (e: React.FormEvent) => { // 非同期処理になるためasyncを追加
    e.preventDefault()
    // generateStoryPromptに条件フォームを使ってプロンプトを入れる
    setGenerateStoryPrompt(`${condition1}で${condition2}な子供向けな物語を書いて下さい。むかしむかし、あるところに...`)

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
      setResponse(result.story)

      // Firestoreに保存
      const db = getFirestore()
      const auth = getAuth()
      const user = auth.currentUser
      if (user) {
        const docRef = doc(db, "stories", user.uid)
        await setDoc(docRef, { story: result.story })
      } else {
        // ユーザーがログインしていない場合のエラーハンドリング
        console.error("No user is signed in!!!!")
      }
    } catch (error) {
      // API呼び出しでエラーが発生した場合、コンソールにエラーを出力し、ステートにエラーメッセージを設定
      console.error('Error calling API:', error)
      console.error('Full error object:', JSON.stringify(error))
      setResponse('Error calling API.')
    }

    // プレビューページへ遷移
    navigate('/create-book/preview')
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="condition1">条件1: </label>
          <input
            type="text"
            id="condition1"
            value={condition1}
            onChange={(e) => setCondition1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="condition2">条件2: </label>
          <input
            type="text"
            id="condition2"
            value={condition2}
            onChange={(e) => setCondition2(e.target.value)}
          />
        </div>
        <button type="submit">生成</button>
      </form>
    </div>
  )
}

export default InputForm
