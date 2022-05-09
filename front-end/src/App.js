import { Routes, Route, useNavigate } from 'react-router-dom';
import { fetchUser } from './utils/fetchUser';
import { Login } from './components';
import { useEffect } from 'react';
import Home from './container/Home';


const App = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const User = fetchUser();

    // if no user login, then always show this login <Components />
    if (!User) navigate('/login');

  }, [navigate]);


  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};


export default App;