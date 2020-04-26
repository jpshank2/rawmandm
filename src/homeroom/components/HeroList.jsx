import React, { useState, useEffect } from "react";

export default function HeroList(props) {
  const { message } = props;

  let [results, setResult]  = useState([])
  let [checked, setChecked] = useState([])

  let name = Office.context.mailbox.userProfile.displayName
  let patt = /\s/g

  useEffect(() => {
    fetch(`http://bmss-devops.bmss.com/homeroom/${name.replace(patt, "_")}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        let results
        if (data.error) {
          results = <h3 style={{textAlign: "center"}}>{data.error}</h3>
          document.getElementById("submit").disabled = true
          document.getElementById("submit").style.cursor = "not-allowed"
        } else {
          results = data.recordsets[0].map((result) => {
            return (
              <label key={result.StaffCode} className="m-label" onClick={e => {
                if (checked.includes(e.target.value)) {
                  let i = checked.indexOf(e.target.value)
                  if (i == 0) {
                    let filteredArray = checked
                    filteredArray.shift()
                    setChecked([... filteredArray])
                  } else if (i - 1 == checked.length) {
                    let filteredArray = checked
                    filteredArray.pop()
                    setChecked([... filteredArray])
                  } else {
                    let filteredArray = checked
                    filteredArray.splice(i, 1)
                    setChecked([... filteredArray])
                  }
                } else {
                  setChecked([... checked, e.target.value])
                }
              }}>
                <input type="checkbox" id={result.StaffCode} name={result.StaffCode} value={result.StaffName} />
                {result.StaffName}
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
        name: name,
        checked: checked,
        senderEmail: Office.context.mailbox.userProfile.emailAddress
      })
    })
  }

  return (
    <main className="ms-welcome__main">
      <h2 className="ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">{message}</h2>
      <form id="kudos">
        {results}
        <input type="submit" value="Submit" id="submit" className="submit-btn" onClick={click} />
      </form>
    </main>
  );
}
