import React, { useState, useEffect } from "react";

export default function Kudos() {

  let [name, setName]               = useState("")
  let [email, setEmail]             = useState("")
  let [results, setResult]          = useState([])
  let [project, setProject]         = useState("")
  let [cornerstone, setCornerstone] = useState("")
  let [description, setDescription] = useState("")
  
  useEffect(() => {
    fetch(`https://bmss-devops.bmss.com/employees/${name}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        let results = data.recordsets[0].map((result) => {
          return (
            <li key={result.ContIndex} className="suggestion" onClick={() => {
              document.getElementById("name").value = result.StaffName
              setName(document.getElementById("name").value)
              setEmail(result.StaffEMail)
              document.getElementById("sglist").style.display = "none"
            }}>{result.StaffName}</li>
          )
        })
        setResult(results)
      })
  })

  let click = async () => {
    fetch("https://bmss-devops.bmss.com/employees/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        project: project,
        cornerstone: cornerstone,
        description: description,
        userEmail: email,
        senderEmail: Office.context.mailbox.userProfile.emailAddress,
        senderName: Office.context.mailbox.userProfile.displayName
      })
    })
  };

  let nameChange = (query) => {
    setName(query)
  }

  let projectChange = (query) => {
    setProject(query)
  }

  let cornerstoneChange = (query) => {
    setCornerstone(query)
  }

  let describeChange = (query) => {
    setDescription(query)
  }

  return (
    <main className="ms-welcome__main">
      <form id="kudos">
        <label className="m-label" htmlFor="name">Employee:</label>
        <input className="m-input" id="name" type="text" 
        onChange={(e) => {nameChange(e.target.value)}}
        required />
        <ul id="sglist" className={results.length > 0 ? "suggestions" : "hidden"}>{results}</ul>
        <br></br>
        <label className="m-label" htmlFor="project">Project:</label>
        <input className="m-input" id="project" type="text"
        onBlur={(e) => {projectChange(e.target.value)}}
        required />
        <br></br>
        <label className="m-label" htmlFor="cornerstone">What Cornerstone was exhibited?</label>
        <select className="m-input" id="cornerstone" 
        onChange={(e) => {cornerstoneChange(e.target.value)}}
        required>
          <option value="" disabled selected>Select Below</option>
          <option value="Xpertegrity">Xpertegrity</option>
          <option value="Relationship">Relationship</option>
          <option value="Innovation">Innovation</option>
          <option value="Presentation">Presentation</option>
        </select>
        <label className="m-label" htmlFor="describe">How did this employee exhibit this Cornerstone?</label>
        <textarea className="m-input" id="describe" form="kudos" 
        onBlur={e => {describeChange(e.target.value)}}
        required></textarea>
        <input type="submit" value="Submit" className="submit-btn" onClick={click} />
      </form>
    </main>
  )
}
