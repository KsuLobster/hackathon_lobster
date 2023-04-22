import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import StoryInput from './components/Story/StoryInput'
import StoryPreview from './components/Story/StoryPreview'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/story-input" element={<StoryInput />} />
        <Route path="/story-preview" element={<StoryPreview />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
