import React, { useEffect, useState } from 'react';
import FetchIssue from './FetchIssue';

const AddedIssue = ({ user, update, handleUpdate }) => {
    const [issues, setIssues] = useState(null);
    const [hours, setHours] = useState(0);
    const [vote, setVote] = useState();
    const [realTime, setRealTime] = useState(0);

    useEffect(() => {
        fetchIssues();
    }, [update, vote]);

    const fetchIssues = () => {
        fetch(`http://localhost:5000/issue`)
            .then((res) => res.json())
            .then((data) => {
                setIssues(data);
            });
    };

    const onChange = (e) => {
        setHours(e.target.value);
        console.log(e.target.value);
    };

    const onClick = (e) => {
        let hour = parseInt(hours);
        let issueId = e.target.parentNode.id;
        let hoursArray;
        let votedArray;

        for (let issue in issues) {
            if (issueId === issues[issue].id) {
                votedArray = issues[issue].voted;
                hoursArray = issues[issue].hours;
                console.log(votedArray);

                if (
                    !votedArray.includes(parseInt(user)) ||
                    votedArray.length === 0
                ) {
                    hoursArray.push(hour);

                    votedArray.push(parseInt(user));
                    console.log('voted');
                    setVote(user);
                    document.getElementById(
                        issues[issue].id + 'div'
                    ).innerHTML = 'Du har röstat!';
                } else {
                    console.log('hello');
                    document.getElementById(
                        issues[issue].id + 'div'
                    ).innerHTML = 'Du har röstat!';
                }
            }
        }

        fetch('http://localhost:5000/issue/' + issueId, {
            method: 'PATCH',
            body: JSON.stringify({
                hours: hoursArray,
                voted: votedArray,
            }),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {});
    };

    const issueDone = (e) => {
        fetch('http://localhost:5000/issue/' + e.target.id, {
            method: 'PATCH',
            body: JSON.stringify({
                done: true,
            }),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                handleUpdate(e.target.id);
            });

            console.log("slutförd");
    };

    const onDelete = (e) => {
        fetch('http://localhost:5000/issue/' + e.target.id, {
            method: 'DELETE',
            body: JSON.stringify({}),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                handleUpdate(e.target.id);
            });
    };

    const realH = (e) => {
        e.preventDefault();
        setRealTime(e.target.value);
    }

    const actualHour = (e) => {
        e.preventDefault();

        let realHour = parseInt(realTime);
        let issueId = e.target.id;       
        let realHoursArray;

        for (let issue in issues) {
            if (issueId === issues[issue].id) {
                realHoursArray = issues[issue].actualTime;
                realHoursArray.push(realHour);
            }
        }

        fetch('http://localhost:5000/issue/' + issueId, {
            method: 'PATCH',
            body: JSON.stringify({
                actualTime: realHoursArray
            }),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                
            });
    }

    return (
        <div className='left-container'>
            <h1 className='container-heading'>Pågående issues</h1>
            <div className='issues-container'>
                {issues &&
                    issues.map((issue) => {
                        if (issue.done === false) {
                            return (
                                <div
                                    key={issue.id}
                                    id={issue.id}
                                    className='issue-box'
                                >
                                    <h1>{issue.header} </h1>
                                    <br />
                                    <h3>{issue.description} </h3>
                                    <br />
                                    {issue.hours.length === 6 ? (
                                        <div>
                                            <FetchIssue issue={issue} />
                                            <p>
                                                Timmar det verkligen tog: {" "}
                                                <input type="number" onChange={realH}/>
                                                <button 
                                                id={issue.id}
                                                onClick={actualHour}
                                                >
                                                    Spara rätt tid
                                                </button>
                                            </p>
                                            <button
                                                id={issue.id}
                                                onClick={issueDone}
                                            >
                                                Slutförd
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            className='time-container'
                                            id={issue.id + 'div'}
                                        >
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
                                                <button
                                                    id={issue.id}
                                                    onClick={onDelete}
                                                >
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
