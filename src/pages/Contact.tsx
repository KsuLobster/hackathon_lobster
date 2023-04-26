//import '*'
import { ChangeEvent, useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material'
import { TextareaAutosize } from '@mui/material'

function Contact() {
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  return (
    <div className="App">
      <p>お問い合わせページのコンポーネントです。</p>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          当てはまるものを選択してください
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="contact-radio-buttons-group-label"
          defaultValue="request"
          name="radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="question"
            control={<Radio />}
            label="ご質問"
          />
          <FormControlLabel
            value="suggestion"
            control={<Radio />}
            label="ご提案"
          />
          <FormControlLabel value="other" control={<Radio />} label="その他" />
        </RadioGroup>
      </FormControl>
      {value === 'question' && (
        <div>
          <TextareaAutosize minRows={3} placeholder="question" />
        </div>
      )}
      {value === 'suggestion' && (
        <div>
          <TextareaAutosize minRows={3} placeholder="suggestion" />
        </div>
      )}
      {value === 'other' && (
        <div>
          <TextareaAutosize minRows={3} placeholder="other" />
        </div>
      )}
    </div>
  )
}

export default Contact
