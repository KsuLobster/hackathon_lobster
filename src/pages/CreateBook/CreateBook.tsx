import { useState } from 'react'
import InputForm from './InputForm'
import Preview from './Preview'

function CreateBook() {
  const [inputData, setInputData] = useState({})

  const handleInputData = (data: any) => {
    setInputData(data)
  }

  return (
    <div className="App">
      <h1>絵本生成</h1>
      <InputForm />
      <Preview />
    </div>
  )
}

export default CreateBook
