// AuthProvider.tsx
// Firebaseの認証情報を保存し、アプリ全体で利用可能にするコンポーネントです。

// 必要なモジュールをインポートします。
import React, { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import AuthContext from './AuthContext'
import { User } from 'firebase/auth'

// 子要素を受け取るための型を定義します。
interface AuthProviderProps {
  children: React.ReactNode
}

// FirebaseAuthProviderコンポーネントを定義します。
// このコンポーネントはアプリ全体をラップし、アプリ内のどこからでも認証情報にアクセスできるようにします。
const FirebaseAuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 現在の認証ユーザー情報を保持するためのステートを作成します。
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // マウント時に一度だけ実行されるエフェクトを定義します。
  // Firebaseの認証状態が変更されたときにステートを更新するリスナーを設定します。
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user))

    // コンポーネントのアンマウント時にリスナーを解除します。
    return () => unsubscribe()
  }, [])

  // AuthContext.Providerコンポーネントを返します。
  // このコンポーネントはアプリ全体をラップし、value propを通じて認証情報を提供します。
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default FirebaseAuthProvider
