import React, { useEffect, useState } from 'react';
import FetchIssue from './FetchIssue';

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
        console.log('klick', hours);
    };

    return (
        <div className='left-container'>
            <div className='issues-container'>
                {issues &&
                    issues.map((issue) => {
                        if (issue.done === false) {
                            return (
                                <div key={issue.id} className='issue-box'>
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
                                            <div>
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
