import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
    let [results, setResults] = useState([])
    let [kudos, setKudos] = useState(0)
    let [homeroom, setHomeroom] = useState(0)
    let [total, setTotal] = useState(0)
    let userName = Office.context.mailbox.userProfile.emailAddress.substring(0, (Office.context.mailbox.userProfile.emailAddress.length - 9))

    useEffect(() => {
        fetch(`http://bmss-devops.bmss.com/mandm/${userName}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setKudos(data.recordsets[0][0].KUDOS >= 12 ? 12 : data.recordsets[0][0].KUDOS)
                setHomeroom(data.recordsets[0][0].Homeroom >= 16 ? 16 : data.recordsets[0][0].Homeroom)
                setTotal(data.recordsets[0][0].ROLOUpward + data.recordsets[0][0].ROLODownward + kudos + homeroom)
            
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
                                <h2>Goal: 24</h2>
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
                                <h3>Cornerstone KUDOS:</h3>
                                <h3>{kudos}</h3>
                            </article>
                            <article>
                                <h3>Homeroom Check-in:</h3>
                                <h3>{homeroom}</h3>
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
