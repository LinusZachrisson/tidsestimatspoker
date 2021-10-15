import './App.css';
import FirstPage from './components/FirstPage';
import AddedIssue from './components/AddedIssue';
import NewIssue from './components/NewIssue';
import React, { useState } from 'react';
import PrintGuessedIssues from './components/PrintGuessedIssues';

function App() {
    const [user, setUser] = useState(null);

    return (
        <div>
            {user === null ? (
                <FirstPage sendId={(id) => setUser(id)} />
            ) : (
                <div>
                    <AddedIssue />
                    <NewIssue />
                    <PrintGuessedIssues />
                </div>
            )}
        </div>
    );
}

export default App;
