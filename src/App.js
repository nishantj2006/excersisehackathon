import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register';
import CreateGoal from './Pages/CreateGoal';
import ReportProgress from './Pages/ReportProgress';

function App() {
  return (
    <div className="App">
      {/*Routes*/}
      <Router>
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/dashboard"> Dashboard </Link>
          <Link to="/creategoal"> Create Goal </Link>
          <Link to="/reportprogress"> Report Progress </Link>
          <Link to="/login"> Login </Link>
          <Link to="/register"> Register </Link>
        </nav>
        <Routes>
          <Route path="/" element={Home} />
          <Route path="/login" element={Login} />
          <Route path="/dashboard" element={Dashboard} />
          <Route path='/register' element={Register} />
          <Route path='/creategoal' element={CreateGoal} />
          <Route path='/reportprogress' element={ReportProgress} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
