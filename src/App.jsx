import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Courses from './pages/Courses.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Learning from './pages/Learning.jsx'
import Saved from './pages/Saved.jsx'
import Login from './pages/Login.jsx'
import Students from './pages/Students.jsx'
import { useStore } from './context/StoreContext.jsx'

export default function App() {
  const { toast } = useStore()
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/login" element={<Login />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </main>
      <Footer />
      {toast && <div id="toast" style={{display:'block'}}>{toast}</div>}
    </div>
  )
}
