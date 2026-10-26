import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { useState } from 'react'
import logo from '../pages/Kanagam technology solutions 2026.png'

export default function Header() {
  const { user, logout, saved, toggleTheme, theme } = useStore()
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const go = (e) => {
    if(e.key === 'Enter') {
      nav('/courses?q='+encodeURIComponent(q))
    }
  }
  return (
    <header>
      <Link to="/"><img className="logo" src={logo} alt="Kanagam Tech" /></Link>
      
      <nav>
        <Link to="/courses">Courses</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/students">Students</Link>
        <Link to="/learning">My Learning</Link>
        <Link to="/saved" className="icon">♡<span className="count">{saved.length}</span></Link>
        <button onClick={toggleTheme} className="icon">{theme==='dark'?'☀':'☾'}</button>
        {user ? <button onClick={logout} className="btn">Logout</button> : <Link to="/login" className="btn">Sign in</Link>}
      </nav>
    </header>
  )
}
