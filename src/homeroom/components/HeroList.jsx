import React, { useState, useEffect, useRef } from "react";

export default function HeroList() {
  let [results, setResult]  = useState([])
  let [checked, setChecked] = useState([])
  let [memberChecked, setMemberChecked] = useState(3)

  let userName = Office.context.mailbox.userProfile.emailAddress.substring(0, (Office.context.mailbox.userProfile.emailAddress.length - 9))

  var d = new Date(); 
  var n = (d.getDate() - (d.getDay() - 1)); 
  var monday = new Date(d.getFullYear(), d.getMonth(), n)

  useEffect(() => {
    fetch(`http://bmss-devops.bmss.com/homeroom/${userName}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        let results = []
        if (data.recordsets[0].length > 0) {
          results = data.recordsets[0].map(result => {
            let lastDate = new Date(result.LastDate)
            return (
              <label key={result.StaffCode}>How is this employee doing?
              <br></br>
                <select className="m-input" onChange={e => {
                  setChecked([...checked, `${result.StaffName} - ${e.target.value}`])
                }}>
                  <option value="0">{result.StaffName}</option>
                  <option value="1">Worst week ever - nothing went right this week</option>
                  <option value="2">Not a good week - I am overwhelmed</option>
                  <option value="3">Just an okay week - some good and some bad</option>
                  <option value="4">Pretty good week - most things went right this week</option>
                  <option value="5">Best week ever - I feel like a Rockstar</option>
                </select>
                <p className={lastDate > monday ? 'visible' : 'hidden'}>You have checked with them this week!</p>
              </label>
            )
          })
        }
        setResult(results)
      })
  })

  let click = async () => {
    fetch("http://bmss-devops.bmss.com/homeroom/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: Office.context.mailbox.userProfile.displayName,
        checked: checked,
        senderEmail: Office.context.mailbox.userProfile.emailAddress,
        memberChecked: memberChecked
      })
    })
  }

  return (
    <main className="ms-welcome__main">
      <h2 className="ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">Mark which one of your Homeroom members you've checked in with or if your Homeroom Leader has checked in with you!</h2>
      <form id="kudos">
        {results}
        <div style={{textAlign: "center"}}>
          <h3>Has your Homeroom Leader checked in with you?</h3>
          <label>
            <input type="radio" name="check" value="1" required onChange={e => {
              setMemberChecked(parseInt(e.target.value))
            }} /> Yes
          </label>
          <label>
            <input type="radio" name="check" value="0" onChange={e => {
              setMemberChecked(parseInt(e.target.value))
            }} /> No
          </label>
        </div>
        <input type="submit" value="Submit" id="submit" className="submit-btn" onClick={click} />
      </form>
    </main>
  );
}
