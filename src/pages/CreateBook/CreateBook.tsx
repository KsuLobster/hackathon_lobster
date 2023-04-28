import { Route, Routes } from 'react-router-dom'
import InputForm from './InputForm'
import Preview from './Preview'
import TestApiCall from './TestApiCall'

function CreateBook() {
  return (
    <Routes>
      <Route path="/" element={<InputForm />} />
      <Route path="/" element={<TestApiCall />} />
      <Route path="preview" element={<Preview />} />
    </Routes>
  )
}

export default CreateBook
