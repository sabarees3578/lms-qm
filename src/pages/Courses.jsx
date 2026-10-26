import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { courses, categories } from '../data/courses.js'
import CourseCard from '../components/CourseCard.jsx'

export default function Courses() {
  const [params] = useSearchParams()
  const [active, setActive] = useState('All courses')
  const [q, setQ] = useState(params.get('q')||'')
  let list = active==='All courses' ? courses : courses.filter(c=>c.category===active)
  if(q) list = list.filter(c=> (c.title+c.desc+c.category).toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="wrap">
      <div className="page-title">
        <div className="eyebrow">COURSE CATALOG</div>
        <h1>Courses</h1>
        <p className="fine">Hands-on learning for electronics, embedded systems, IoT and more.</p>
      </div>
      <div className="filters">
        <input placeholder="Search by title or topic..." value={q} onChange={e=>setQ(e.target.value)} />
        <select value={active} onChange={e=>setActive(e.target.value)}>
          {categories.map(c=><option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid">
        {list.length ? list.map(c=><CourseCard key={c.id} c={c} />) : <div className="empty"><h3>No courses found</h3><p>Try adjusting your search or filter.</p></div>}
      </div>
    </div>
  )
}
