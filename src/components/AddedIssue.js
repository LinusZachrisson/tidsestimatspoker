import React, { useEffect, useState } from "react";
import FetchIssue from "./FetchIssue";

const AddedIssue = ({ user, update, handleUpdate }) => {
  const [issues, setIssues] = useState(null);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    fetchIssues();
  }, [update]);

  const fetchIssues = () => {
    fetch(`http://localhost:5000/issue`)
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
      });
  };

  const onChange = (e) => {
    setHours(e.target.value);
  };

  const onClick = (e) => {
    let hour = parseInt(hours);
    let issueId = e.target.parentNode.id;
    let hoursArray;

    for (let issue in issues) {
      if (issueId === issues[issue].id) {
        hoursArray = issues[issue].hours;
        hoursArray.push(hour);
      }
    }

    fetch("http://localhost:5000/issue/" + issueId, {
      method: "PATCH",
      body: JSON.stringify({
        hours: hoursArray,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {});
  };

  const issueDone = (e) => {
    fetch("http://localhost:5000/issue/" + e.target.id, {
      method: "PATCH",
      body: JSON.stringify({
        done: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        handleUpdate(e.target.id);
      });
  };

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

  return (
    <div className="left-container">
      <h1 className="container-heading">Pågående issues</h1>
      <div className="issues-container">
        {issues &&
          issues.map((issue) => {
            if (issue.done === false) {
              return (
                <div key={issue.id} id={issue.id} className="issue-box">
                  <h1>{issue.header} </h1>
                  <br />
                  <h3>{issue.description} </h3>
                  <br />
                  {issue.hours.length === 6 ? (
                    <div>
                      <FetchIssue issue={issue} />
                      <button id={issue.id} onClick={issueDone}>
                        Slutförd
                      </button>
                    </div>
                  ) : (
                    <div className="time-container">
                      <p>
                        Din tidsestimering:{" "}
                        <input type="number" onChange={onChange} /> timmar
                      </p>
                      <div key={issue.id} id={issue.id}>
                        <button onClick={onClick}>Spara</button>
                        <button id={issue.id} onClick={onDelete}>
                          Radera
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

export default AddedIssue;
