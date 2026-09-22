import useForm from '../hooks/formHooks';
import {useUser} from '../hooks/apiHooks';

const RegisterForm = ({setToggleForm}) => {
  const {postUser} = useUser();

  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    try {
      const registerResult = await postUser(inputs);
      console.log('Register successful:', registerResult);
      alert('Registration successful! Please log in.');
      if (setToggleForm) setToggleForm(true);
    } catch (error) {
      console.error('Registration error:', error.message);
      alert('Registration failed: ' + error.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reguser">Username</label>
          <input
            name="username"
            type="text"
            id="reguser"
            value={inputs.username}
            onChange={handleInputChange}
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label htmlFor="regemail">Email</label>
          <input
            name="email"
            type="email"
            id="regemail"
            value={inputs.email}
            onChange={handleInputChange}
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label htmlFor="regpassword">Password</label>
          <input
            name="password"
            type="password"
            id="regpassword"
            value={inputs.password}
            onChange={handleInputChange}
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
