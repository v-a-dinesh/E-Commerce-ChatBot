import React, { useState, useEffect } from 'react';
import Login from './Login';
import Chatbot from './Chatbot';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <div>
      {!authenticated ? (
        <Login setAuthenticated={setAuthenticated} />
      ) : (
        <>
          <h2>Welcome back!</h2>
          <Chatbot />
        </>
      )}
    </div>
  );
};

export default App;
