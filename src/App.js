import './App.css';
import FirstPage from './components/FirstPage';
import React, {useState} from "react"

function App() {

  const [user, setUser] = useState(null);

  return (
    <div>
      {user === null ? (
        <FirstPage sendId={(id) => setUser(id)}/>) : (<div>hej </div>)
      }
    
    </div>
  );
}

export default App;
