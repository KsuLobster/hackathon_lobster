// CreateBook/TestApiCall.tsx
import { useState } from 'react'

function TestApiCall() {
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
          prompt: 'むかしむかし、あるところに...',
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
      {/* レスポンスがある場合、その内容を表示 */}
      {response && <div>{response}</div>}
    </div>
  )
}

export default TestApiCall
