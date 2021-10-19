import React, { useEffect, useState } from 'react';
import FetchIssue from './FetchIssue';

const AddedIssue= ({ user, update }) => {
    const [issues, setIssues] = useState(null);
    const [hours, setHours] = useState(0);

    useEffect(() => {
        fetchIssues();
    },[update]);

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

    const onClick = (e) => {
        console.log('klick', hours);
        let hour = parseInt(hours);
        let issueId = e.target.parentNode.id;
        let hoursArray;
        
        for (let issue in issues) {
            if (issueId === issues[issue].id) {
                hoursArray = issues[issue].hours;
                hoursArray.push(hour);
            }
        }

        fetch('http://localhost:5000/issue/'+ issueId, {
            method: 'PATCH',
            body: JSON.stringify({
            hours: hoursArray
        }),
            headers: {
            'Content-type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {

        });
        
    };

    return (
        <div className='left-container'>
            <div className='issues-container'>
                {issues &&
                    issues.map((issue) => {
                        if (issue.done === false) {
                            return (
                                <div key={issue.id} id={issue.id} className='issue-box'>
                                    <h1>{issue.header} </h1>
                                    <br />
                                    <h3>{issue.description} </h3>
                                    <br />
                                    {issue.hours.length === 6 ? (
                                        <FetchIssue issue={issue} />
                                    ) : (
                                        <div className='time-container'>
                                            <p>
                                                Din tidsestimering:{' '}
                                                <input
                                                    type='number'
                                                    onChange={onChange}
                                                />{' '}
                                                timmar
                                            </p>
                                            <div key={issue.id} id={issue.id}>
                                                <button onClick={onClick}>
                                                    Spara
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
}

export default AddedIssue;
