function FetchIssue(number){

    /*Send in the number of the issue you want to get, maybe*/
    
    // let contents={
    //     "issueId": 1,
    //     "header": "Rubrik",
    //     "description": "Förklarande text angående issuet",
    //     "done": false,
    //     "votes": [2, 4, 3, 7, 9, 5,10,15,3]
    // }

    // Hämtar issues som är färdigissade från TimeEstimated  
    let contents = number.issue;
    
    const sum = contents.hours.reduce((a, b) => a + b, 0);
    const avg = (sum / contents.hours.length) || 0;
    const avgRounded = Math.round(avg * 100) / 100;
    const sorted = contents.hours.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    return(
        <div>
            <h1>Issue: {contents.header}</h1>
            <h2>Description: {contents.description}</h2>
            All votes: <ul>{sorted.map(vote => <li> {vote} </li>)}</ul> <br/>
            Average: {avgRounded}<br/>
            Median: {sorted[middle]}
        </div>
    )
    }
    
    export default FetchIssue