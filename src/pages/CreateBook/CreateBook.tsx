import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import InputForm from './InputForm'
import Preview from './Preview'
import TestApiCall from './TestApiCall'

function CreateBook() {
  const [inputData, setInputData] = useState({})

  const handleInputData = (data: any) => {
    setInputData(data)
  }

  return (
    <Routes>
      <Route path="/" element={<InputForm />} />
      <TestApiCall />
      <Route path="preview" element={<Preview />} />
    </Routes>
  )
}

export default CreateBook
