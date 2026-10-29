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
          <div className="eyebrow">QUANTUM LEARNING PLATFORM</div>
          <h1>{user ? `Welcome back, ${user.name.split(' ')[0]}.` : 'Science meets possibility.'} <span>⚛</span></h1>
          <p>Connecting ambitious learners and institutions with simulation software, advanced laboratory equipment and practical technology education.</p>
        </div>
        <Link to="/learning" className="btn outline">My workspace ↗</Link>
      </div>
      <div className="studio-top">
        <section className="studio-feature">
          <div className="studio-feature-copy">
            <span className="studio-pill">THE FUTURE OF APPLIED LEARNING</span>
            <h2>Explore<br/>the <em>quantum</em> frontier.</h2>
            <p>Hands-on simulations, advanced labs, and cutting-edge technology education for tomorrow's innovators.</p>
            <Link to="/courses" className="btn">Explore solutions <span>↗</span></Link>
            <span className="studio-feature-foot">{courses.length} SOLUTIONS &nbsp; / &nbsp; SIMULATION SOFTWARE & LAB EQUIPMENT</span>
          </div>
          <div className="studio-feature-image">
            <img src="/assets/courses/PCB%20Fabrication.jpeg" alt="Quantum simulation lab" />
            <span className="image-caption">THE FUTURE STARTS HERE.</span>
          </div>
        </section>
        <aside className="studio-path">
          <span className="studio-pill">GET STARTED</span>
          <div className="path-icon">⚛</div>
          <h3>From theory<br/>to simulation.</h3>
          <p>Experience advanced laboratory equipment and practical technology education.</p>
          <Link to="/course/1">Explore {courses[0]?.title} <span>↗</span></Link>
          <div className="path-dots"><b></b><span></span><span></span></div>
        </aside>
      </div>
      <div className="studio-metrics">
        <div><span className="metric-icon">⚛</span><p><strong>0{courses.length}</strong><small>Simulation Solutions</small></p></div>
        <div><span className="metric-icon">🔬</span><p><strong>Advanced Labs</strong><small>State-of-the-art equipment</small></p></div>
        <div><span className="metric-icon">↗</span><p><strong>Applied Learning</strong><small>Practical technology education</small></p></div>
      </div>
      <section className="studio-course-section">
        <div className="section-head">
          <div>
            <div className="eyebrow">DISCOVER OUR SOLUTIONS</div>
            <h2>Simulation software & lab equipment.</h2>
          </div>
          <Link to="/courses" className="text-link">Browse all solutions ↗</Link>
        </div>
        <div className="tabs">
          {categories.map(c => <button key={c} className={`tab ${active===c?'active':''}`} onClick={()=>setActive(c)}>{c}</button>)}
        </div>
        <div className="grid">
          {list.map(c => <CourseCard key={c.id} c={c} />)}
        </div>
      </section>
      <section className="studio-bottom">
        <span className="bottom-symbol">⚛</span>
        <div>
          <div className="eyebrow">SCIENCE MEETS POSSIBILITY</div>
          <h2>The future of applied learning.</h2>
          <p>Connect with simulation software, advanced laboratory equipment and practical technology education.</p>
        </div>
        <Link to="/courses" className="btn">Explore solutions ↗</Link>
      </section>
    </div>
  )
}
