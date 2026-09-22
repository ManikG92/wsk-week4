import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [toggleForm, setToggleForm] = useState(true);

  return (
    <div>
      {toggleForm ? (
        <>
          <LoginForm />
          <button onClick={() => setToggleForm(false)}>
            Don't have an account? Register here
          </button>
        </>
      ) : (
        <>
          <RegisterForm setToggleForm={setToggleForm} />
          <button onClick={() => setToggleForm(true)}>
            Already registered? Log in here
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
