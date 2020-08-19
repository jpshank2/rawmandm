import React, { useState, useEffect } from 'react'

export default function Other() {
    let [option, setOption] = useState(11)
    let [name, setName] = useState("")
    let [results, setResult] = useState([])
    let [notes, setNotes] = useState("")

    useEffect(() => {
        fetch(`http://bmss-devops.bmss.com/employees/${name}`)
          .then(res => {
            return res.json()
          })
          .then(data => {
            let results = data.recordsets[0].map((result) => {
              return (
                <li key={result.StaffIndex} className="suggestion" onClick={() => {
                  document.getElementById("name").value = result.StaffName
                  setName(document.getElementById("name").value)
                  document.getElementById("sglist").style.display = "none"
                }}>{result.StaffName}</li>
              )
            })
            setResult(results)
          })
      })

    let click = async () => {
        if (option < 10) {
            fetch(`http://bmss-devops.bmss.com/mandm/other`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                option: option,
                senderEmail: Office.context.mailbox.userProfile.emailAddress,
                senderName: Office.context.mailbox.userProfile.displayName,
                name: name,
                notes: notes
            })
        })
        }
    }

    return (
        <form>
            <label htmlFor="budget" className="m-label">
                <input type="radio" name="other" className="m-radio" id="budget" value="1" onChange={e => {
                    setOption(parseInt(e.target.value))
                }} required />
                Provided a Budget on a Project
                <p className="info">Make sure to include the project name in the notes section</p>
            </label>
            <label className="m-label" htmlFor="office">
                <input type="radio" className="m-radio" name="other" id="office" value="2" onChange={e => {
                    setOption(parseInt(e.target.value))
                }} />
                Visited Another Office
                <p className="info">Must include interaction with host office staff.</p>
            </label>
            <label htmlFor="open" className="m-label">
                <input type="radio" className="m-radio" name="other" id="open" value="3" onChange={e => {
                    setOption(parseInt(e.target.value))
                }} />
                Sat in an Open Workspace
                <p className="info">Must include interaction with staff.</p>
            </label>
            <label htmlFor="mentor" className="m-label">
                <input type="radio" className="m-radio" name="other" id="mentor" value="4" onChange={e => {
                    setOption(parseInt(e.target.value))
                }} />
                Had a Mentoring Conversation
                <p className="info">Make sure to enter who you had the conversation with! Will add points for BOTH people.</p>
            </label>
            <label htmlFor="fireside" className="m-label">
                <input type="radio" className="m-radio" name="other" id="fireside" value="5" onChange={e => {
                    setOption(parseInt(e.target.value))
                }} />
                Fireside Chat Lunch
            </label>
            <label htmlFor="teach" className="m-label">
                <input type="radio" className="m-radio" name="other" id="teach" value="6" onChange={e => {
                    setOption(parseInt(e.target.value))
                }} />
                Taught a Training Class
            </label>
            <label htmlFor="attend" className="m-label">
                <input type="radio" className="m-radio" name="other" id="attend" value="7" onChange={e => {
                    setOption(parseInt(e.target.value))
                }} />
                Attended a Training Class
            </label>
            <label htmlFor="recruit" className="m-label">
                <input type="radio" className="m-radio" name="other" id="recruit" value="8" onChange={e => {
                    setOption(parseInt(e.target.value))
                }} />
                Attended a Recruiting Event
                <p className="info">Make sure to enter the event name in the notes section.</p>
            </label>
            <label htmlFor="interview" className="m-label">
                <input type="radio" className="m-radio" name="other" id="interview" value="9" onChange={e => {
                    setOption(parseInt(e.target.value))
                }} />
                Took a Candidate to Lunch/Dinner/Coffee
                <p className="info">Make sure to include the candidate's name in the notes section.</p>
            </label>
            <label htmlFor="resume" className="m-label">
                <input type="radio" className="m-radio" name="other" id="resume" value="0" onChange={e => {
                    setOption(parseInt(e.target.value))
                }} />
                Submitted a Candidate's Resume to HR
                <p className="info">Make sure to include the candidate's name in the notes section.</p>
            </label>
            <label className="m-label" htmlFor="name">Employee:</label>
            <input className="m-input" type="text" id="name" onChange={(e) => {
                setName(e.target.value)
            }} />
            <ul id="sglist" className={results.length > 0 ? "suggestions" : "hidden"}>{results}</ul>
            <label className="m-label" htmlFor="notes">Notes:</label>
            <textarea className="m-input" id="notes" 
                onChange={e => {setNotes(e.target.value)}}></textarea>
            <input type="submit" value="Submit" className={option < 10 ? "submit-btn" : "no-submit-btn"} onClick={click} />
        </form>
    )
}
