import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import CreateBook from './pages/CreateBook/CreateBook'
import RpgBook from './pages/RpgBook/RpgBook'
import About from './pages/About'
import Contact from './pages/Contact'
import { FirebaseAppProvider } from 'reactfire'
//FirebaseAppProvider コンポーネントを使用して、Firebase の設定をアプリケーション全体で共有する必要があるそうです
import { firebaseConfig } from './firebase'
// Firebase の設定が記述された箇所をインポート

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/rpg-book" element={<RpgBook />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>

      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        {/* アプリケーションのコンポーネントをここに記述 */
        /*ここでfirebaseConfigを共有したいコンポーネントを設定*/}
        <Signup />
      </FirebaseAppProvider>
    </>
  )
}

export default App
