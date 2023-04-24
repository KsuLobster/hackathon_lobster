import React, { useState } from 'react'

function InputForm() {
  const [condition1, setCondition1] = useState('')
  const [condition2, setCondition2] = useState('')
  const [condition3, setCondition3] = useState('')
  const [condition4, setCondition4] = useState('')
  const [condition5, setCondition5] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ここで入力データをPreview.tsxに渡す処理を実装する
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
        <div>
          <label htmlFor="condition3">条件3: </label>
          <input
            type="text"
            id="condition3"
            value={condition3}
            onChange={(e) => setCondition3(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="condition4">条件4: </label>
          <input
            type="text"
            id="condition4"
            value={condition4}
            onChange={(e) => setCondition4(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="condition5">条件5: </label>
          <input
            type="text"
            id="condition5"
            value={condition5}
            onChange={(e) => setCondition5(e.target.value)}
          />
        </div>
        <button type="submit">生成</button>
      </form>
    </div>
  )
}

export default InputForm
