import '../main.css';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home';

function App() {

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
