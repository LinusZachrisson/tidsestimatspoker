import React, { useState, useEffect } from "react";
import FetchIssue from "./FetchIssue";

const FinishedIssues = ({ update, handleUpdate }) => {
  let [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/issue")
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
      });
  }, [update]);

  const onDelete = (e) => {
    fetch("http://localhost:5000/issue/" + e.target.id, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        handleUpdate(e.target.id);
      });
  };

  console.log(issues);
  let time;
  for (let issue in issues) {
    const sum = issues[issue].hours.reduce((a, b) => a + b, 0);
    const sumb = issues[issue].actualTime.reduce((a, b) => a + b, 0);
  
    time = sum - sumb;
  }


  return (
    <div className="finished-issue-container">
      <h1 className="container-heading">Slutförda issues</h1>
      {issues.map((issue) => {
        if (issue.done === true) {
          return (
            <div className="issue-box">
              <h1>{issue.header}</h1>
              <br />
              <h3>{issue.description}</h3>
              <div>
                <FetchIssue issue={issue} />
                
                Time difference: {time} 
                <button id={issue.id} onClick={onDelete}>
                  Radera
                </button>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default FinishedIssues;
