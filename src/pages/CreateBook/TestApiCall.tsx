// CreateBook/TestApiCall.tsx
import { useState } from 'react'

function TestApiCall() {
  const [response, setResponse] = useState<string | null>(null)

  const callApi = async () => {
    try {
      const response = await fetch(
        'https://us-central1-lobster-b93b4.cloudfunctions.net/generateStory/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: 'むかしむかし、あるところに...',
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Error calling API.')
      }

      const result = await response.json()
      setResponse(result.story)
    } catch (error) {
      console.error('Error calling API:', error)
      console.error('Full error object:', JSON.stringify(error))
      setResponse('Error calling API.')
    }
  }

  return (
    <div>
      <button onClick={callApi}>Call API</button>
      {response && <div>{response}</div>}
    </div>
  )
}

export default TestApiCall
