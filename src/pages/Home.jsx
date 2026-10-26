import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { courses, categories } from '../data/courses.js'
import CourseCard from '../components/CourseCard.jsx'
import { useState } from 'react'

export default function Home() {
  const { user } = useStore()
  const [active, setActive] = useState('All courses')
  const list = active==='All courses' ? courses : courses.filter(c=>c.category===active)
  return (
    <div className="studio-home">
      <div className="studio-welcome">
        <div>
          <div className="eyebrow">YOUR PERSONAL LEARNING SPACE</div>
          <h1>{user ? `Welcome back, ${user.name.split(' ')[0]}.` : 'Hello, curious mind.'} <span>✦</span></h1>
          <p>Big ideas start with small steps. What will you build today?</p>
        </div>
        <Link to="/learning" className="btn outline">My workspace ↗</Link>
      </div>
      <div className="studio-top">
        <section className="studio-feature">
          <div className="studio-feature-copy">
            <span className="studio-pill">THE MAKER'S COLLECTION</span>
            <h2>Less scrolling.<br/>More <em>creating.</em></h2>
            <p>Get hands-on with electronics, connected devices and the technology all around us.</p>
            <Link to="/courses" className="btn">Find your next skill <span>↗</span></Link>
            <span className="studio-feature-foot">{courses.length} COURSES &nbsp; / &nbsp; ENDLESS POSSIBILITIES</span>
          </div>
          <div className="studio-feature-image">
            <img src="/assets/courses/PCB%20Fabrication.jpeg" alt="Learning PCB fabrication hands-on" />
            <span className="image-caption">MAKE SOMETHING THAT MATTERS.</span>
          </div>
        </section>
        <aside className="studio-path">
          <span className="studio-pill">A GOOD PLACE TO START</span>
          <div className="path-icon">⌁</div>
          <h3>From idea<br/>to your first circuit.</h3>
          <p>Discover the building blocks of real-world electronics.</p>
          <Link to="/course/1">Explore {courses[0]?.title} <span>↗</span></Link>
          <div className="path-dots"><b></b><span></span><span></span></div>
        </aside>
      </div>
      <div className="studio-metrics">
        <div><span className="metric-icon">▦</span><p><strong>0{courses.length}</strong><small>Specialist courses</small></p></div>
        <div><span className="metric-icon">◷</span><p><strong>Your pace</strong><small>A little progress, every day</small></p></div>
        <div><span className="metric-icon">↗</span><p><strong>Hands-on</strong><small>Learn by making things</small></p></div>
      </div>
      <section className="studio-course-section">
        <div className="section-head">
          <div>
            <div className="eyebrow">FIND YOUR NEXT CHALLENGE</div>
            <h2>Your next skill starts here.</h2>
          </div>
          <Link to="/courses" className="text-link">Browse collection ↗</Link>
        </div>
        <div className="tabs">
          {categories.map(c => <button key={c} className={`tab ${active===c?'active':''}`} onClick={()=>setActive(c)}>{c}</button>)}
        </div>
        <div className="grid">
          {list.map(c => <CourseCard key={c.id} c={c} />)}
        </div>
      </section>
      <section className="studio-bottom">
        <span className="bottom-symbol">✳</span>
        <div>
          <div className="eyebrow">STAY CURIOUS. KEEP BUILDING.</div>
          <h2>Make your next chapter a hands-on one.</h2>
          <p>Save an idea for later, or start something new today.</p>
        </div>
        <Link to="/saved" className="btn outline">Open wishlist ♡</Link>
      </section>
    </div>
  )
}
