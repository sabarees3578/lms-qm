import { useStore } from '../context/StoreContext.jsx'
import { courses } from '../data/courses.js'
import CourseCard from '../components/CourseCard.jsx'

export default function Saved() {
  const { saved } = useStore()
  const list = courses.filter(c=>saved.includes(c.id))
  return (
    <div className="wrap">
      <div className="page-title">
        <div className="eyebrow">WISHLIST</div>
        <h1>Saved courses</h1>
      </div>
      <div className="grid">
        {list.length ? list.map(c=><CourseCard key={c.id} c={c} />) : <div className="empty"><h3>No saved courses</h3><p>Save courses to revisit them later.</p></div>}
      </div>
    </div>
  )
}
