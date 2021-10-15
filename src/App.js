import './css/style.css';
import FirstPage from './components/FirstPage';
import AddedIssue from './components/AddedIssue';
import NewIssue from './components/NewIssue';
import React, { useState } from 'react';

function App() {
    const [user, setUser] = useState(null);

    return (
        <div>
            {user === null ? (
                <FirstPage sendId={(id) => setUser(id)} />
            ) : (
                <div className='content-container'>
                    <AddedIssue />
                    <NewIssue />
                </div>
            )}
        </div>
    );
}

export default App;
