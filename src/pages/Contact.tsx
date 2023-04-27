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
                  label="ご質問"
                />
                <FormControlLabel
                  {...field}
                  value={2}
                  control={<Radio />}
                  label="ご意見・提案"
                />
                <FormControlLabel
                  {...field}
                  value={0}
                  control={<Radio />}
                  label="その他"
                />
              </RadioGroup>
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="adress"
          control={control}
          rules={validationRules.adress}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="text"
              label="メールアドレス"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button variant="contained" type="submit">
          送信する
        </Button>
      </Stack>
    </div>
  )
}

export default Contact
