import React, { useState } from "react";
var rand = require("random-key");

const NewIssue = ({ handleUpdate }) => {
  let [header, setHeader] = useState("");
  let [text, setText] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        let randomKey = rand.generate();
        let newIssue = {
            id: randomKey,
            header: header,
            description: text,
            done: false,
            voted: [],
            hours: [],
        };


    fetch("http://localhost:5000/issue", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newIssue),
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => console.log(err));

    setHeader("");
    setText("");
    handleUpdate(newIssue);
  };

  const onChangeH = (e) => {
    setHeader(e.target.value);
  };

  const onChangeT = (e) => {
    setText(e.target.value);
  };

  return (
    <section className="right-container">
      <h1 className="newissue-heading">Nytt issue</h1>
      <div className="newissue-container">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Rubrik"
            name="header"
            onChange={onChangeH}
            value={header}
          />
          <br />
          <input
            type="text"
            placeholder="Beskrivning"
            name="text"
            onChange={onChangeT}
            value={text}
          />
          <br />
          <button type="submit">Lägg till</button>
        </form>
      </div>
    </section>
  );
};

export default NewIssue;
