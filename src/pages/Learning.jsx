import { useStore } from '../context/StoreContext.jsx'
import { courses } from '../data/courses.js'

export default function Learning() {
  const { enrolled, progress, markDone } = useStore()
  const list = courses.filter(c=>enrolled.includes(c.id))
  return (
    <div className="wrap">
      <div className="page-title">
        <div className="eyebrow">MY LEARNING</div>
        <h1>Continue where you left off</h1>
      </div>
      {list.length ? list.map(c=>(
        <div key={c.id} className="cart-row" style={{marginBottom:20}}>
          <img src={`/assets/courses/${encodeURIComponent(c.img)}`} alt={c.title} />
          <div style={{flex:1}}>
            <h3>{c.title}</h3>
            <p className="fine">{c.category} • {c.hours} hours</p>
            <div className="curriculum" style={{marginTop:16}}>
              {[1,2,3].map(l=>(
                <details key={l} open>
                  <summary>Lesson {l}: Module Content</summary>
                  <div className="lesson"><span>Reading material</span><button onClick={()=>markDone(c.id,l)}>{progress[`${c.id}:${l}`]?'Completed ✓':'Mark complete'}</button></div>
                </details>
              ))}
            </div>
          </div>
        </div>
      )) : <div className="empty"><h3>Nothing here yet</h3><p>Enroll in courses to see them in your learning space.</p></div>}
    </div>
  )
}
