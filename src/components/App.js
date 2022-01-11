import '../main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home';
import SignUp from './SignUp';
import AuthProvider from '../context/AuthContext';
import SignIn from './SignIn';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import Settings from './Settings';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      }
    })
  }, [])

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={loggedIn ? <Home /> : <SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );

}

export default App;
