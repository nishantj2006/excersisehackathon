import './App.css';
import LoginButton from './login';
import LogoutButton from './logout';
import Profile from './profile';

function App() {
  const[isAuth, setIsAuth] = useState(setIsAuth);

  return (
    <div className="App">
      <LoginButton/>
      <LogoutButton/>
      <Profile/>
    </div>
  );
}

export default App;
