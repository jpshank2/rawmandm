import React, { useState, useEffect } from 'react'

export default function Request() {
    const [name, setName] = useState("")
    const [project, setProject] = useState("")
    const [results, setResults] = useState([])

    useEffect(() => {
        if (name.length > 0) {
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
              setResults(results)
          })
        }
    }, [name])

    const nameChange = (query) => {
        setName(query)
    }

    const projectChange = (query) => {
        setProject(query)
    }

    const click = async () => {
        if (name.length > 1 && project.length > 0) {
            fetch("http://bmss-devops.bmss.com/mandm/request", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    project: project,
                    senderEmail: Office.context.mailbox.userProfile.emailAddress,
                    senderName: Office.context.mailbox.userProfile.displayName
                })
            })
        }
    }

    return (
        <main className="ms-welcome__main">
            <form id="request">
                <label className="m-label" htmlFor="name">Employee:</label>
                <input className="m-input" id="name" type="text" 
                onChange={(e) => {nameChange(e.target.value)}}
                required />
                <ul id="sglist" className={results.length > 0 ? "suggestions" : "hidden"}>{results}</ul>
                <br></br>
                <label className="m-label" htmlFor="project">Project:</label>
                <input className="m-input" id="project" type="text"
                onChange={(e) => {projectChange(e.target.value)}}
                required />
                <br></br>
                <input type="submit" value="Submit" className="submit-btn" onClick={click} />
            </form>
        </main>
    )
}
