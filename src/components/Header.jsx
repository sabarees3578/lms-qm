import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { useState } from 'react'
import logo from '../Quantummate Logo White.png'

export default function Header() {
  const { user, logout, saved, toggleTheme, theme } = useStore()
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const searchCourses = (event) => {
    event.preventDefault()
    const query = q.trim()
    nav(query ? `/courses?q=${encodeURIComponent(query)}` : '/courses')
  }
  return (
    <header>
      <Link to="/" aria-label="Quantummate home">
        <img src={logo} alt="Quantummate" className="logo" />
      </Link>
      <form className="search" role="search" onSubmit={searchCourses}>
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          aria-label="Search courses"
          placeholder="Search courses..."
          value={q}
          onChange={event => setQ(event.target.value)}
        />
      </form>
      <nav>
        <Link to="/courses">Solutions</Link>
        <Link to="/students">Students</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/learning">My Learning</Link>
        <Link to="/saved" className="icon">♡<span className="count">{saved.length}</span></Link>
        <button onClick={toggleTheme} className="icon">{theme==='dark'?'☀':'☾'}</button>
        {user ? <button onClick={logout} className="btn">Logout</button> : <Link to="/login" className="btn">Sign in</Link>}
      </nav>
    </header>
  )
}
