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
  radioContent: number
  textAdress: string
  textMatter: string
}

function Contact() {
  // useFormで必要な関数を取得し、デフォルト値を指定する
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      radioContent: -1,
      textAdress: '',
      textMatter: '',
    },
  })

  // 検証ルールを指定する
  const validationRules = {
    radioContent: {
      validate: (value: number) => value !== -1 || 'いずれかを選択してください',
    },
    textAdress: {
      validate: (val: string) => {
        if (val == '') {
          return 'メールアドレスを入力してください。'
        }
        if (
          !val.match(
            /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/
          )
        ) {
          return '正しいメールアドレスを入力してください'
        }
        return true
      },
    },
    textMatter: {
      validate: (val: string) => {
        if (val == '') {
          return '問い合わせ内容を入力してください'
        }
        return true
      },
    },
  }

  // サブミット時の処理を作成する
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(`submit: ${data.radioContent}`)
    console.log(`submit: ${data.textAdress}`)
    console.log(`submit: ${data.textMatter}`)
  }

  return (
    <div className="App">
      <p>お問い合わせページのコンポーネントです。</p>
      <Container maxWidth="xs">
        <Stack
          component="form"
          noValidate
          justifyContent="center"
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
          sx={{ m: 2, width: '40ch' }}
        >
          <Controller
            name="radioContent"
            control={control}
            rules={validationRules.radioContent}
            render={({ field, fieldState }) => (
              <FormControl error={fieldState.invalid}>
                <FormLabel id="radio-buttons-group-lavel">
                  お問い合わせ内容
                </FormLabel>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
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
            name="textAdress"
            control={control}
            rules={validationRules.textAdress}
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
          <Controller
            name="textMatter"
            control={control}
            rules={validationRules.textMatter}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="具体的なお問い合わせ内容"
                multiline
                rows={4}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Button variant="contained" type="submit">
            送信する
          </Button>
        </Stack>
      </Container>
    </div>
  )
}

export default Contact
