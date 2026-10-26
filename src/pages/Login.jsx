import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import loginImage from '../Untitled.png'

export default function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { login } = useStore()
  const nav = useNavigate()
  const submit = (e) => {
    e.preventDefault()
    if(!name || !email) return
    login({name, email})
    nav('/dashboard')
  }
  return (
    <div className="login">
      <div className="login-art">
        <img src="src/pages/Copy of Kanagam Business Card.png" alt="Login art" />
        <br />
        <span className="eyebrow">KANAGAM TECH ACADEMY</span>
        <h2>Make room for your next big idea.</h2>
        <p>Learn practical skills, explore new technology, and turn curiosity into something real.</p>
        
      </div>
      <form className="login-form" onSubmit={submit}>
        <h2>Sign in</h2>
        <p className="fine">Enter your details to access your dashboard</p>
        <label htmlFor="login-name">Full Name</label>
        <input id="login-name" className="field" autoComplete="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required />
        <label htmlFor="login-email">Email</label>
        <input id="login-email" className="field" type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" className="field" type="password" autoComplete="current-password" placeholder="••••••••" />
        <button className="btn">Continue</button>
        <p className="fine">By continuing, you agree to our terms.</p>
      </form>
    </div>
  )
}
