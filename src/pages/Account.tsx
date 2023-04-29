import { Button, Stack, TextField } from '@mui/material'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import style from './Account.module.css'
import { updateProfile } from 'firebase/auth'

const Account = () => {
  const [user] = useAuthState(auth)

  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ''
  )

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '')
    }
  }, [user])

  return (
    <div className={style.app_container}>
      <h1>アカウント設定</h1>
      <Stack spacing={3}>
        <TextField
          className={style.input_box}
          label="ディスプレイネーム"
          variant="outlined"
          value={displayName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDisplayName(event.target.value)
          }}
        />
        <TextField
          className={style.input_box}
          disabled
          label="メールアドレス"
          variant="outlined"
          value={user?.email || ''}
        />
        {displayName != user?.displayName && (
          <Button
            variant="contained"
            onClick={() => {
              if (user) {
                updateProfile(user, {
                  displayName: displayName,
                }).then(() => {
                  console.log(user.displayName, displayName)
                })
              }
            }}
          >
            変更を保存
          </Button>
        )}
      </Stack>
    </div>
  )
}

export default Account
