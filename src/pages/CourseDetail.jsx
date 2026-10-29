import { useParams, Link } from 'react-router-dom'
import { courses } from '../data/courses.js'
import { useStore } from '../context/StoreContext.jsx'

export default function CourseDetail() {
  const { id } = useParams()
  const c = courses.find(x=>x.id==id)
  const { enroll, enrolled } = useStore()
  if(!c) return <div className="wrap"><p>Course not found</p></div>
  return (
    <div className="wrap detail">
      <div>
        <div className="eyebrow">{c.category}</div>
        <h1>{c.title}</h1>
        <p>{c.desc}</p>
        <div className="checklist">
          <div>• Hands-on labs and exercises</div>
          <div>• Practical project work</div>
          <div>• Step-by-step guided learning</div>
          <div>• Certificate of completion</div>
        </div>
        <h3>Curriculum</h3>
        <div className="curriculum">
          {[1,2,3,4].map(m=>(
            <details key={m} open={m===1}>
              <summary>Module {m}: Core Concepts</summary>
              <div className="lesson"><span>Lesson {m}.1 - Introduction</span><span>15 min</span></div>
              <div className="lesson"><span>Lesson {m}.2 - Practical Exercise</span><span>25 min</span></div>
              <div className="lesson"><span>Lesson {m}.3 - Assessment</span><span>10 min</span></div>
            </details>
          ))}
        </div>
      </div>
      <aside className="buy-card">
        <img src={`/assets/courses/${encodeURIComponent(c.img)}`} alt={c.imgAlt || c.title} />
        {c.imageAttribution && (
          <small className="image-attribution detail-image-attribution">
            Image: <a href={c.imageAttribution.source} target="_blank" rel="noreferrer">{c.imageAttribution.creator}</a>
            {' / '}
            <a href={c.imageAttribution.licenseUrl} target="_blank" rel="noreferrer">{c.imageAttribution.license}</a>
          </small>
        )}
        <div className="price">Free <span className="level">{c.level}</span></div>
        <button className="btn" onClick={()=>enroll(c.id)}>{enrolled.includes(c.id)?'Enrolled ✓':'Enroll for free'}</button>
        <Link to="/learning" className="btn outline" style={{marginTop:10}}>Go to My Learning</Link>
        <p className="fine" style={{marginTop:16}}>{c.hours} hours • {c.lessons} lessons • {c.reviews} reviews</p>
      </aside>
    </div>
  )
}
