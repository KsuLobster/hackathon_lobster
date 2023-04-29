//import '*'
import './Contact.css'
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
  radioContent: string
  textAddress: string
  textMatter: string
}

function Contact() {
  // useFormで必要な関数を取得し、デフォルト値を指定する
  const { control, getValues, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      radioContent: '',
      textAddress: '',
      textMatter: '',
    },
  })

  // 検証ルールを指定する
  const validationRules = {
    radioContent: {
      validate: (value: string) => value !== '' || 'いずれかを選択してください',
    },
    textAddress: {
      validate: (val: string) => {
        if (val == '') {
          return 'メールアドレスを入力してください。'
        }
        if (
          !val.match(
            /^[A-Za-z0-9][A-Za-z0-9_.-]*@[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/
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
    console.log(`submit: ${data.textAddress}`)
    console.log(`submit: ${data.textMatter}`)
  }

  return (
    <div className={'app-container'}>
      <h1>お問い合わせ</h1>
      <p>
        こちらはお問い合わせページです。
        <br />
        使い方に関しては、使い方のページを、
        ご質問に関しては、よくある質問のページを先にご覧ください。
      </p>
      <Container maxWidth="xs">
        <Stack
          component="form"
          noValidate
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
                    value="questions"
                    control={<Radio />}
                    label="ご質問"
                  />
                  <FormControlLabel
                    {...field}
                    value="suggestions"
                    control={<Radio />}
                    label="ご意見・提案"
                  />
                  <FormControlLabel
                    {...field}
                    value="others"
                    control={<Radio />}
                    label="その他"
                  />
                </RadioGroup>
                {getValues('radioContent') != '' && (
                  <Controller
                    name="textAddress"
                    control={control}
                    rules={validationRules.textAddress}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="text"
                        label="メールアドレス"
                        style={{ marginTop: 20 }}
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                )}
                {getValues('radioContent') == 'questions' && (
                  <Controller
                    name="textMatter"
                    control={control}
                    rules={validationRules.textMatter}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="text"
                        label="具体的な質問の内容を入力してください"
                        multiline
                        rows={4}
                        style={{ marginTop: 30 }}
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                )}
                {getValues('radioContent') == 'suggestions' && (
                  <Controller
                    name="textMatter"
                    control={control}
                    rules={validationRules.textMatter}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="text"
                        label="具体的な意見・提案の内容を入力してください"
                        multiline
                        rows={4}
                        style={{ marginTop: 30 }}
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                )}
                {getValues('radioContent') == 'others' && (
                  <Controller
                    name="textMatter"
                    control={control}
                    rules={validationRules.textMatter}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="text"
                        label="具体的なお問い合わせの内容を入力してください"
                        multiline
                        rows={4}
                        style={{ marginTop: 30 }}
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                )}
                {getValues('radioContent') != '' && (
                  <Button
                    style={{ marginTop: 30 }}
                    variant="contained"
                    type="submit"
                  >
                    送信する
                  </Button>
                )}
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Stack>
      </Container>
    </div>
  )
}

export default Contact
