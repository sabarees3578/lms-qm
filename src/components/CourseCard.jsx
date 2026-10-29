import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'

export default function CourseCard({ c }) {
  const { saved, toggleSave } = useStore()
  return (
    <article className="course">
      <div className="thumb">
        <Link to={`/course/${c.id}`}><img src={`/assets/courses/${encodeURIComponent(c.img)}`} alt={c.imgAlt || c.title} /></Link>
        <span className="badge">{c.badge}</span>
        {c.imageAttribution && (
          <small className="image-attribution">
            <a href={c.imageAttribution.source} target="_blank" rel="noreferrer">{c.imageAttribution.creator}</a>
            {' / '}
            <a href={c.imageAttribution.licenseUrl} target="_blank" rel="noreferrer">{c.imageAttribution.license}</a>
          </small>
        )}
        <button className="save" onClick={()=>toggleSave(c.id)}>{saved.includes(c.id)?'♥':'♡'}</button>
      </div>
      <div className="course-info">
        <span className="course-tag"><h4>{c.category}</h4></span>
        <Link to={`/course/${c.id}`}><h1>{c.title}</h1></Link>
        <span className="instructor"> <h2>by</h2> <h3>{c.teacher}</h3></span>
        <div className="rating"><h1><span className="stars"><h1>★★★★★</h1></span><span>{c.rating} ({c.reviews})</span></h1></div>
        <div className="meta"><h3>{c.hours} Hours • {c.lessons} Lessons </h3></div>
        <div className="course-bottom">
          <span className="course-level">{c.level}</span>
          <Link to={`/course/${c.id}`} className="course-arrow">↗</Link>
        </div>
      </div>
    </article>
  )
}
