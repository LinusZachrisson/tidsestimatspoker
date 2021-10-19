import './css/style.css';
import FirstPage from './components/FirstPage';
import AddedIssue from './components/AddedIssue';
import NewIssue from './components/NewIssue';
import React, { useState } from 'react';

function App() {
    const [user, setUser] = useState(null);
    const [update, setUpdate] = useState("undefined");

    const handleUpdate = async (evt) => {
        setUpdate(evt.id);
    }

    return (
        <div>
            {user === null ? (
                <FirstPage sendId={(id) => setUser(id)} />
            ) : (
                <div className='content-container'>
                    <AddedIssue user={user} update={update}/>
                    <NewIssue handleUpdate={handleUpdate}/>
                </div>
            )}
        </div>
    );
}

export default App;
