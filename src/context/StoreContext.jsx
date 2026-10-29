import { createContext, useContext, useEffect, useState } from 'react'

const StoreContext = createContext()

const read = (k, d) => {
  try {
    const v = localStorage.getItem('kta_'+k)
    return v ? JSON.parse(v) : d
  } catch { return d }
}
const write = (k, v) => {
  try { localStorage.setItem('kta_'+k, JSON.stringify(v)) } catch {}
}

export function StoreProvider({ children }) {
  const [theme, setTheme] = useState(() => read('theme','light'))
  const [user, setUser] = useState(() => read('user', null))
  const [saved, setSaved] = useState(() => read('saved', []))
  const [enrolled, setEnrolled] = useState(() => read('enrolled', []))
  const [progress, setProgress] = useState(() => read('progress', {}))
  const [toast, setToast] = useState(null)

  useEffect(() => { document.documentElement.classList.toggle('dark', theme==='dark'); write('theme', theme) }, [theme])
  useEffect(() => { write('user', user) }, [user])
  useEffect(() => { write('saved', saved) }, [saved])
  useEffect(() => { write('enrolled', enrolled) }, [enrolled])
  useEffect(() => { write('progress', progress) }, [progress])

  const toggleTheme = () => setTheme(t => t==='light'?'dark':'light')
  const login = (u) => { setUser(u); showToast('Welcome back'); } 
  const logout = () => { setUser(null); showToast('Signed out'); }
  const toggleSave = (id) => {
    setSaved(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id])
  }
  const enroll = (id) => {
    if(enrolled.includes(id)) return showToast('Already enrolled')
    setEnrolled([...enrolled, id])
    showToast('Enrolled successfully')
  }
  const markDone = (id, lesson) => {
    setProgress(p => ({...p, [`${id}:${lesson}`]: true}))
  }
  const showToast = (msg) => {
    setToast(msg)
    setTimeout(()=>setToast(null), 2000)
  }

  return <StoreContext.Provider value={{theme,toggleTheme,user,login,logout,saved,toggleSave,enrolled,enroll,progress,markDone,toast,showToast}}>
    {children}
  </StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
