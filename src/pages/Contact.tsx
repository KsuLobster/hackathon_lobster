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
  FormHelperText,
} from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

// 入力値の定義をする
type Inputs = {
  content: number
  adress: string
}

function Contact() {
  // useFormで必要な関数を取得し、デフォルト値を指定する
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      content: -1,
      adress: '',
    },
  })

  // 検証ルールを指定する
  const validationRules = {
    content: {
      validate: (value: number) => value !== -1 || 'いずれかを選択してください',
    },
    adress: {
      validate: (val: string) => {
        if (val == null) {
          return 'メールアドレスを入力してください。'
        }
        return true
      },
    },
  }

  // サブミット時の処理を作成する
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(`submit: ${data.content}`)
    console.log(`submit: ${data.adress}`)
  }
  // const [value, setValue] = useState('')
  //
  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setValue((event.target as HTMLInputElement).value)
  // }

  return (
    <div className="App">
      <p>お問い合わせページのコンポーネントです。</p>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{ m: 2, width: '25ch' }}
      >
        <Controller
          name="content"
          control={control}
          rules={validationRules.content}
          render={({ field, fieldState }) => (
            <FormControl error={fieldState.invalid}>
              <FormLabel id="radio-buttons-group-lavel">test</FormLabel>
              <RadioGroup
                aria-lavelledby="radio-buttons-group-label"
                value={field.value}
                name="content"
              >
                <FormControlLabel
                  {...field}
                  value={1}
                  control={<Radio />}
                  label="質問"
                />
                <FormControlLabel
                  {...field}
                  value={2}
                  control={<Radio />}
                  label="提案"
                />
              </RadioGroup>
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Button variant="contained" type="submit">
          送信する
        </Button>
      </Stack>
      {/*<Container maxWidth="xs">*/}
      {/*  <FormControl>*/}
      {/*    <FormLabel id="radio-buttons-group-label">*/}
      {/*      当てはまるものを選択してください*/}
      {/*    </FormLabel>*/}
      {/*    <RadioGroup*/}
      {/*      row*/}
      {/*      aria-labelledby="contact-radio-buttons-group-label"*/}
      {/*      defaultValue="request"*/}
      {/*      name="radio-buttons-group"*/}
      {/*      value={value}*/}
      {/*      onChange={handleChange}*/}
      {/*    >*/}
      {/*      <FormControlLabel*/}
      {/*        value="question"*/}
      {/*        control={<Radio />}*/}
      {/*        label="ご質問"*/}
      {/*      />*/}
      {/*      <FormControlLabel*/}
      {/*        value="suggestion"*/}
      {/*        control={<Radio />}*/}
      {/*        label="ご提案"*/}
      {/*      />*/}
      {/*      <FormControlLabel*/}
      {/*        value="other"*/}
      {/*        control={<Radio />}*/}
      {/*        label="その他"*/}
      {/*      />*/}
      {/*    </RadioGroup>*/}
      {/*  </FormControl>*/}
      {/*  <FormControl>*/}
      {/*    <FormLabel id="mailadress-input-textarea-label">*/}
      {/*      メールアドレスをご入力ください*/}
      {/*    </FormLabel>*/}
      {/*    <TextField placeholder="youradress@xxx" />*/}
      {/*    {value === 'question' && (*/}
      {/*      <div>*/}
      {/*        <TextField*/}
      {/*          minRows={3}*/}
      {/*          placeholder="question"*/}
      {/*          variant="outlined"*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*    {value === 'suggestion' && (*/}
      {/*      <div>*/}
      {/*        <TextField minRows={3} placeholder="suggestion" />*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*    {value === 'other' && (*/}
      {/*      <div>*/}
      {/*        <TextField minRows={3} placeholder="other" />*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </FormControl>*/}
      {/*</Container>*/}
    </div>
  )
}

export default Contact
