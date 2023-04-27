import { useState } from 'react'
import InputForm from './InputForm'
import Preview from './Preview'
import TestApiCall from './TestApiCall'

function CreateBook() {
  const [inputData, setInputData] = useState({})

  const handleInputData = (data: any) => {
    setInputData(data)
  }

  return (
    <div className="App">
      <h1>CreateBook.tsx</h1>
      <InputForm />
      <TestApiCall />
      <Preview />
      <p>絵本生成ページのコンポーネントです。</p>
    </div>
  )
}

export default CreateBook
