import React, { useState, useEffect } from "react";

export default function Rolo() {
  
  let [name, setName]               = useState("")
  let [email, setEmail]             = useState("")
  let [results, setResult]          = useState([])
  let [project, setProject]         = useState("")
  let [cornerstone, setCornerstone] = useState("")
  let [retain, setRetain]           = useState("")
  let [lose, setLose]               = useState("")
  let [rating, setRating]           = useState("")
  let [direction, setDirection]     = useState("")
  
  useEffect(() => {
    fetch(`http://bmss-devops.bmss.com/employees/${name}`)
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
        if (direction) {
            fetch("http://bmss-devops.bmss.com/employees/upward", {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                name: name,
                project: project,
                cornerstone: cornerstone,
                retain: retain,
                lose: lose,
                rating: rating,
                senderEmail: Office.context.mailbox.userProfile.emailAddress,
                senderName: Office.context.mailbox.userProfile.displayName
                })
            })
        } else {
            fetch("http://bmss-devops.bmss.com/employees/downward", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    project: project,
                    cornerstone: cornerstone,
                    retain: retain,
                    lose: lose,
                    rating: rating,
                    userEmail: email,
                    senderEmail: Office.context.mailbox.userProfile.emailAddress,
                    senderName: Office.context.mailbox.userProfile.displayName
                })
            })
        }
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

  let retainChange = (query) => {
    setRetain(query)
  }

  let loseChange = (query) => {
    setLose(query)
  }

  let ratingChange = (query) => {
    setRating(query)
  }

  let directionChange = (query) => {
      setDirection(query)
  }

  return (
    <main className="ms-welcome__main">
      <form id="rolo">
        <label className="m-label" htmlFor="direction">Upward or Downward?</label>
        <select className="m-input" id="direction" 
        onChange={(e) => {directionChange(e.target.value)}}
        required>
          <option value="" disabled selected>Select Below</option>
          <option value={true}>Upward</option>
          <option value={false}>Downward</option>
        </select>
        <label className="m-label" htmlFor="name">Employee:</label>
        <input className="m-input" id="name" type="text" 
        onChange={(e) => {nameChange(e.target.value)}}
        required />
        <ul id="sglist" className="suggestions">{results}</ul>
        <br></br>
        <label className="m-label" htmlFor="project">Project:</label>
        <input className="m-input" id="project" type="text"
        onChange={(e) => {projectChange(e.target.value)}}
        required />
        <br></br>
        <label className="m-label">How did this employee do on this project?</label>
        <input type="radio" id="up" name="rating" value="Thumbs Up" 
        onChange={(e) => {ratingChange(e.target.value)}} required />
        <label htmlFor="up">Thumbs Up</label>
        <input type="radio" id="okay" name="rating" value="Okay" 
        onChange={(e) => {ratingChange(e.target.value)}} />
        <label htmlFor="okay">Okay</label>
        <input type="radio" id="down" name="rating" value="Thumbs Down" 
        onChange={(e) => {ratingChange(e.target.value)}} />
        <label htmlFor="down">Thumbs Down</label>
        <br></br>
        <p>Please rate the employee on their general performance. Note: &quot;Okay&quot; means that the person did a good job and met expectations on this project. A majority of people should be rated &quot;Okay.&quot; &quot;Thumbs Up&quot; means this person exceeded expectation and went above and beyond what is expected. This rating should be used for such situation...not because they did a good job. &quot;Thumbs Down&quot; means the employee did not meet expectations on this project.</p>
        <br></br>
        <label className="m-label" htmlFor="retain">Retain One:</label>
        <textarea className="m-input" id="describe" form="rolo" 
        onChange={e => {retainChange(e.target.value)}}
        required></textarea>
        <br></br>
        <label className="m-label" htmlFor="lose">Lose One:</label>
        <textarea className="m-input" id="describe" form="rolo" 
        onChange={e => {loseChange(e.target.value)}}
        required></textarea>
        <br></br>
        <label className="m-label" htmlFor="cornerstone">Did this employee exhibit any of the BMSS Cornstones during this project?</label>
        <select className="m-input" id="cornerstone" 
        onChange={(e) => {cornerstoneChange(e.target.value)}}
        required>
          <option value="" disabled selected>Select Below</option>
          <option value="None">None</option>
          <option value="Xpertegrity">Xpertegrity</option>
          <option value="Relationship">Relationship</option>
          <option value="Innovation">Innovation</option>
          <option value="Presentation">Presentation</option>
        </select>
        <input type="submit" value="Submit" className= "submit-btn" onClick={click} />
      </form>
    </main>
  )
}
