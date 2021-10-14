import React, {useState, useEffect} from "react";

const FirstPage = () => {

    const [users, setUsers] = useState([]);
    const userLogIn = null;

    useEffect(() => {
        fetch("http://localhost:5000/users")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            //issues from the issues component here ex: let somevar = data.filter(user => user.id == issue.id) and than pass it into setUsers()
            setUsers(data)
        })
        .catch(error => {console.log(error);})
    }, []);

    const logIn = (e) => {
        e.preventDefault();
        userLogIn = users.filter(u => u.id)
    }

    return (
        <div>
            <ul>
                {users.map(user => (
                    <li onClick={logIn}>{user.firstname} {user.lastname}</li>
                )) 
                }
            </ul>
        </div>
    )
}

export default FirstPage;