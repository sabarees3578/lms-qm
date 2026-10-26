import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { courses } from '../data/courses.js'

export default function Dashboard() {
  const { user, enrolled, progress } = useStore()
  const list = courses.filter(c=>enrolled.includes(c.id))
  const done = Object.values(progress).filter(Boolean).length
  return (
    <div className="wrap">
      <div className="page-title">
        <div className="eyebrow">DASHBOARD</div>
        <h1>{user ? `Hello, ${user.name}` : 'Your learning dashboard'}</h1>
      </div>
      <div className="dashboard-stats">
        <div className="metric"><strong>{list.length}</strong><span>Enrolled Courses</span></div>
        <div className="metric"><strong>{done}</strong><span>Lessons Completed</span></div>
        <div className="metric"><strong>{Math.min(100, Math.round(done*5))}%</strong><span>Overall Progress</span></div>
      </div>
      <div className="section-head"><h2>Continue learning</h2><Link to="/courses" className="text-link">Browse more ↗</Link></div>
      <div className="grid">
        {list.length ? list.map(c=>(
          <article key={c.id} className="course">
            <div className="thumb"><Link to={`/course/${c.id}`}><img src={`/assets/courses/${encodeURIComponent(c.img)}`} alt={c.title} /></Link></div>
            <div className="course-info">
              <span className="course-tag">{c.category}</span>
              <h3>{c.title}</h3>
              <div className="progress"><span style={{width:'25%'}}></span></div>
              <span className="fine">25% complete</span>
              <Link to="/learning" className="btn" style={{marginTop:12}}>Resume</Link>
            </div>
          </article>
        )) : <div className="empty"><h3>No courses yet</h3><p>Enroll in a course to start learning.</p><Link to="/courses" className="btn">Browse courses</Link></div>}
      </div>
    </div>
  )
}
