import React, {useState, useEffect} from "react";

const FirstPage = ({sendId}) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/users")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUsers(data)
        })
        .catch(error => {console.log(error);})
    }, []);

    const logIn = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        sendId(e.target.id)
    }

    return (
        <div>
            <ul>
                {users.map(user => (
                    <li id={user.id} key ={user.id}  onClick={logIn}>{user.firstname} {user.lastname}</li>
                )) 
                }
            </ul>
            
        </div>
    )
}

export default FirstPage;