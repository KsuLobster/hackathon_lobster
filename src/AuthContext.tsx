// AuthContext.tsx
import React from 'react'
import { User } from 'firebase/auth'

interface AuthContextInterface {
	currentUser: User | null
	setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

// 値を初期化（この時点ではまだユーザーは認証されていない）
const AuthContext = React.createContext<AuthContextInterface | undefined>(undefined)

export default AuthContext
