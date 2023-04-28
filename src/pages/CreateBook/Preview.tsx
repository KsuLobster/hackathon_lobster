// Preview.tsx
import React, { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

function Preview() {
  const [story, setStory] = useState('')
  console.log('Preview.tsxにきたよ!')

  useEffect(() => {
    const fetchStory = async () => {
      const db = getFirestore()
      const auth = getAuth()
      const user = auth.currentUser
      if (user) {
        const docRef = doc(db, 'stories', user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setStory(docSnap.data().story)
        } else {
          console.log('No such document!')
        }
      } else {
        // ユーザーがログインしていない場合のエラーハンドリング
        console.error('No user is signed in!!!!')
      }
    }
    fetchStory()
  }, [])

  return (
    <div className="App">
      <h1>Preview.tsx</h1>
      <p>プレビューのコンポーネントです。</p>
      <p>{story}</p>
    </div>
  )
}

export default Preview
