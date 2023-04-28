// CreateBook/CreateRpg.tsx
import { useState } from 'react'

function CreateRpg() {
  // ストーリーのレスポンスを管理するためのステート
  const [response, setResponse] = useState<string | null>(null)

  // APIを呼び出す非同期関数
  const callApi = async () => {
    // 環境変数からエンドポイントURLを取得
    const apiUrl = process.env.REACT_APP_STORY_GENERATOR_API_URL

    try {
      // APIへのリクエストを送信
      const response = await fetch(apiUrl as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt:
            '物語を3つ作り1.~~2.~~3.~~というようにタイトルのみ表示して下さい',
        }),
      })

      // レスポンスが正常でない場合、エラーをスロー
      if (!response.ok) {
        throw new Error('Error calling API.')
      }

      // レスポンスのJSONを解析し、ストーリーをステートに設定
      const result = await response.json()
      setResponse(result.story)
    } catch (error) {
      // API呼び出しでエラーが発生した場合、コンソールにエラーを出力し、ステートにエラーメッセージを設定
      console.error('Error calling API:', error)
      console.error('Full error object:', JSON.stringify(error))
      setResponse('Error calling API.')
    }
  }

  //1番のストーリーを生成
  const createFrom1 = async () => {
    // 環境変数からエンドポイントURLを取得
    const apiUrl = process.env.REACT_APP_STORY_GENERATOR_API_URL

    try {
      // APIへのリクエストを送信
      const response = await fetch(apiUrl as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: '1の続きをお願いします ',
        }),
      })

      // レスポンスが正常でない場合、エラーをスロー
      if (!response.ok) {
        throw new Error('Error calling API.')
      }

      // レスポンスのJSONを解析し、ストーリーをステートに設定
      const result = await response.json()
      setResponse(result.story)
    } catch (error) {
      // API呼び出しでエラーが発生した場合、コンソールにエラーを出力し、ステートにエラーメッセージを設定
      console.error('Error calling API:', error)
      console.error('Full error object:', JSON.stringify(error))
      setResponse('Error calling API.')
    }
  }

  return (
    <div>
      {/* API呼び出しをトリガーするボタン */}
      <button onClick={callApi}>Call API</button>
      <button onClick={createFrom1}>1</button>
      <button onClick={callApi}>2</button>
      <button onClick={callApi}>3</button>
      {response && <div>{response}</div>}
      {/* レスポンスがある場合、その内容を表示 */}
    </div>
  )
}

export default CreateRpg
