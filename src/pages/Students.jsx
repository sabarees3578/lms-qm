import { useMemo, useState } from 'react'
import { studentDate, students } from '../data/students.js'

export default function Students() {
  const [query, setQuery] = useState('')
  const [scoreFilter, setScoreFilter] = useState('all')
  const scoredCount = students.filter(student => student.scorePercent !== null).length
  const averageScore = Math.round(
    students.reduce((total, student) => total + (student.scorePercent ?? 0), 0) / scoredCount
  )
  const filteredStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return students.filter(student => {
      const matchesQuery = !normalizedQuery || [
        student.name,
        student.college,
        student.course,
        student.department,
      ].some(value => value.toLowerCase().includes(normalizedQuery))
      const hasScore = student.scorePercent !== null
      const matchesScoreFilter = scoreFilter === 'all'
        || (scoreFilter === 'scored' && hasScore)
        || (scoreFilter === 'unscored' && !hasScore)
      return matchesQuery && matchesScoreFilter
    })
  }, [query, scoreFilter])

  return (
    <div className="wrap students-page">
      <div className="page-title students-title">
        <div>
          
          <h1>Students</h1>
          <p className="fine">A clear view of your class roster and IoT assessment results.</p>
        </div>
        <span className="students-total">829 learners</span>
      </div>

      <section className="student-metrics" aria-label="Student overview">
        <article className="student-metric student-metric-enrollment">
          <div className="student-metric-top">
            <span className="student-metric-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20m6-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-7.5a4 4 0 0 1 0 7.75M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="student-metric-label">Enrolment</span>
          </div>
          <strong className="student-metric-value">829</strong>
          <span className="student-metric-description">Total students</span>
        </article>
        <article className="student-metric student-metric-assessments">
          <div className="student-metric-top">
            <span className="student-metric-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="student-metric-label">Assessment</span>
          </div>
          <strong className="student-metric-value">{scoredCount}</strong>
          <span className="student-metric-description">Scores recorded</span>
        </article>
        <article className="student-metric student-metric-average">
          <div className="student-metric-top">
            <span className="student-metric-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 17.5 9.2 12l3.6 3.5L20 7.8M14.5 7.8H20v5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="student-metric-label">Class average</span>
          </div>
          <strong className="student-metric-value">{averageScore}%</strong>
          <span className="student-metric-description">Average assessment score</span>
          <div
            className="student-metric-progress"
            role="meter"
            aria-label="Average assessment score"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={averageScore}
          >
            <span style={{ width: `${averageScore}%` }} />
          </div>
        </article>
      </section>

      <section className="student-directory" aria-labelledby="student-list-heading">
        <div className="student-directory-heading">
          <div>
            <h2 id="student-list-heading">Class roster</h2>
            <p>829 of 829 students</p>
          </div>
          <div className="student-filters">
            <label className="student-search">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search students..."
                aria-label="Search students"
              />
            </label>
            
          </div>
        </div>

        <div className="student-table-scroll">
          <table className="student-table">
            <thead>
              <tr>
                <th scope="col"><h1>Student</h1></th>
                <th scope="col"><h1>Date</h1></th>
                <th scope="col"><h1>Department</h1></th>
                <th scope="col"><h1>Course</h1></th>
                <th scope="col"><h1>IoT assessment</h1></th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.name}>
                  <td>
                    <div className="student-identity">
                      <span className="student-avatar" aria-hidden="true">
                        {student.name.trim().charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <strong> <p3>{student.name}</p3></strong>
                        <span><p3>{student.college}</ p3></span>
                      </div>
                    </div>
                  </td>
                  <td><p3>{studentDate}</p3></td>
                  <td><p3>{student.department}</p3></td>
                  <td><p3>{student.course}</p3  ></td>
                  <td>
                    {student.scorePercent === null ? (
                      <span className="student-score-pending">No score recorded</span>
                    ) : (
                      <span className="student-score">
                        <strong><h3>{student.scorePercent}%</h3></strong>
                        <span><p2>{student.scoreMarks}/50</p2 ></span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td className="student-empty" colSpan="5">
                    No students match your search. Try another name or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
