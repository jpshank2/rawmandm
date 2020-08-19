import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
    let [results, setResults] = useState([])
    let [kudos, setKudos] = useState(0)
    let [visit, setVisit] = useState(0)
    let [open, setOpen] = useState(0)
    let [mentor, setMentor] = useState(0)
    let [homeroom, setHomeroom] = useState(0)
    let [teach, setTeach] = useState(0)
    let [attend, setAttend] = useState(0)
    let [recruit, setRecruit] = useState(0)
    let [interview, setInterview] = useState(0)
    let [resume, setResume] = useState(0)
    let [total, setTotal] = useState(0)
    let userName = Office.context.mailbox.userProfile.emailAddress.substring(0, (Office.context.mailbox.userProfile.emailAddress.length - 9))

    useEffect(() => {
        fetch(`http://bmss-devops.bmss.com/mandm/${userName}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setKudos(data.recordsets[0][0].KUDOS >= 12 ? 12 : data.recordsets[0][0].KUDOS)
                setVisit(data.recordsets[0][0].VisitOffice >= 15 ? 15 : data.recordsets[0][0].VisitOffice)
                setOpen(data.recordsets[0][0].OpenArea >= 10 ? 10 : data.recordsets[0][0].OpenArea)
                setMentor(data.recordsets[0][0].MentorConvo >= 12 ? 12 : data.recordsets[0][0].MentorConvo)
                setHomeroom(data.recordsets[0][0].Homeroom >= 16 ? 16 : data.recordsets[0][0].Homeroom)
                setTeach(data.recordsets[0][0].Teach >= 12 ? 12 : data.recordsets[0][0].Teach)
                setAttend(data.recordsets[0][0].Attend >= 12 ? 12 : data.recordsets[0][0].Attend)
                setRecruit(data.recordsets[0][0].Recruit >= 12 ? 12 : data.recordsets[0][0].Recruit)
                setInterview(data.recordsets[0][0].TakeOut >= 12 ? 12 : data.recordsets[0][0].TakeOut)
                setResume(data.recordsets[0][0].Resume >= 12 ? 12 : data.recordsets[0][0].Resume)
                setTotal(data.recordsets[0][0].ROLOUpward + data.recordsets[0][0].ROLODownward + data.recordsets[0][0].Budget + kudos + visit + open + mentor + homeroom + data.recordsets[0][0].Fireside + teach + attend + recruit + interview + resume)
            
                let results = data.recordsets[0].map(result => {
                    let date = ""
                    if (result.Tetramester === 1) {
                        date = "January 1st - April 30th"
                    } else if (result.Tetramester === 2) {
                        date = "May 1st - August 31tst"
                    } else if (result.Tetramester === 3) {
                        date = "September 1st - December 31st"
                    }

                    return (
                        <section key="points">
                            <article>
                                <h2>Goal:</h2>
                                <h2>{result.Goal}</h2>
                            </article>
                            <article>
                                <h2>Total for Current Tetramester <span title={date}><FontAwesomeIcon icon={faInfoCircle}/></span> (Unfiltered):</h2>
                                <h2>{result.Total}</h2>
                            </article>
                            <article>
                                <h2>Total for Current Tetramester <span title={date}><FontAwesomeIcon icon={faInfoCircle}/></span> (Filtered with Point Caps):</h2>
                                <h2>{total}</h2>
                            </article>
                            <article>
                                <h3>ROLO - Upward:</h3>
                                <h3>{result.ROLOUpward}</h3>
                            </article>
                            <article>
                                <h3>ROLO - Downward:</h3>
                                <h3>{result.ROLODownward}</h3>
                            </article>
                            <article>
                                <h3>Provide a Budget:</h3>
                                <h3>{result.Budget}</h3>
                            </article>
                            <article>
                                <h3>Cornerstone KUDOS:</h3>
                                <h3>{kudos}</h3>
                            </article>
                            <article>
                                <h3>Visit Another Office:</h3>
                                <h3>{visit}</h3>
                            </article>
                            <article>
                            <h3>Sit in Open Area:</h3>
                                <h3>{open}</h3>
                            </article>
                            <article>
                                <h3>Mentoring Conversation:</h3>
                                <h3>{mentor}</h3>
                            </article>
                            <article>
                                <h3>Homeroom Check-in:</h3>
                                <h3>{homeroom}</h3>
                            </article>
                            <article>
                                <h3>Fireside Chat:</h3>
                                <h3>{result.Fireside}</h3>
                            </article>
                            <article>
                                <h3>Teach a Class:</h3>
                                <h3>{teach}</h3>
                            </article>
                            <article>
                                <h3>Attend a Class:</h3>
                                <h3>{attend}</h3>
                            </article>
                            <article>
                                <h3>Attend a Recruiting Event:</h3>
                                <h3>{recruit}</h3>
                            </article>
                            <article>
                                <h3>Take a Candidate Out:</h3>
                                <h3>{interview}</h3>
                            </article>
                            <article>
                                <h3>Submit a Resume to HR:</h3>
                                <h3>{resume}</h3>
                            </article>
                        </section>
                    )
                })
                setResults(results)
            })
    })

    return (
        <div>
            {results}
        </div>
    )
}
