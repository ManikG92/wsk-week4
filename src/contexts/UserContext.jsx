import {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useNavigate, useLocation} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials) => {
    try {
      const loginResult = await postLogin(credentials);
      localStorage.setItem('token', loginResult.token);
      setUser(loginResult.user);
      navigate('/');
    } catch (e) {
      console.error('handleLogin error:', e.message);
      throw e;
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (e) {
      console.error('handleLogout error:', e.message);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user);
        const origin = location.pathname || '/';
        navigate(origin);
      }
    } catch (e) {
      console.error('handleAutoLogin error:', e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, setUser, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
