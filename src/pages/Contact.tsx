//import '*'
import { ChangeEvent, useState } from 'react'
import {
  Container,
  Stack,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Button,
} from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

function Contact() {
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  return (
    <div className="App">
      <p>お問い合わせページのコンポーネントです。</p>
      <Container maxWidth="xs">
        <FormControl>
          <FormLabel id="radio-buttons-group-label">
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
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="その他"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="mailadress-input-textarea-label">
            メールアドレスをご入力ください
          </FormLabel>
          <TextField placeholder="youradress@xxx" />
          {value === 'question' && (
            <div>
              <TextField
                minRows={3}
                placeholder="question"
                variant="outlined"
              />
            </div>
          )}
          {value === 'suggestion' && (
            <div>
              <TextField minRows={3} placeholder="suggestion" />
            </div>
          )}
          {value === 'other' && (
            <div>
              <TextField minRows={3} placeholder="other" />
            </div>
          )}
        </FormControl>
      </Container>
    </div>
  )
}

export default Contact
