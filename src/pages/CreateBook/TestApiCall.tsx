// CreateBook/TestApiCall.tsx
import { useState } from 'react'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../../firebase'

interface ApiResponse {
  data: {
    story: string
  }
}

function TestApiCall() {
  const [response, setResponse] = useState<string | null>(null)

  const callApi = async () => {
    try {
      const generateStory = httpsCallable(functions, 'generateStory')
      const result = await generateStory({ prompt: 'Once upon a time...' })
      setResponse((result as ApiResponse).data.story)
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
