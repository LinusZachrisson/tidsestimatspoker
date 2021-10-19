import React, { useState, useEffect } from "react";
import FetchIssue from "./FetchIssue";

function PrintGuessedIssues() {
  let [issues, setIssues] = useState([]);

  // Hämtar issues
  useEffect(() => {
    fetch("http://localhost:5000/issue")
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
      });
  }, []);

  //Returnar issues där alla gissat timmar och skickar ner des informationen till FetchIssue
  return (
    <div>
      {issues.map((data) =>
        data.hours.length === 6 ? <FetchIssue issue={data} /> : null
      )}
    </div>
  );
}

export default PrintGuessedIssues;
