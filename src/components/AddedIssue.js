import React, { useEffect, useState } from "react";

function AddedIssue(props) {
  const [issues, setIssues] = useState(null);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = () => {
    fetch(`http://localhost:5000/issue`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIssues(data);
      });
  };

  const onChange = (e) => {
    setHours(e.target.value);
    console.log(hours);
  };

  const onClick = () => {
    console.log("klick", hours);
  };

  return (
    <div>
      <div>
        {issues &&
          issues.map((issue) => {
            if (issue.done === false) {
              return (
                <div key={issue.id}>
                  Rubrik: {issue.header} <br />
                  Beskrivning: {issue.description} <br />
                  Din tidsestimering:{" "}
                  <input type="number" onChange={onChange} /> timmar
                  <button onClick={onClick}>Spara</button>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}

export default AddedIssue;
