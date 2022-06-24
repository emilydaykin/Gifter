import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleRegister = () => {
    console.log('register clicked');
  };

  const handleInputChange = (event) => {
    // console.log('event.target.value', event.target.value);
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  console.log('formData', formData);

  return (
    <div>
      <h2>Register with your email and password</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor='displayName'>Display Name</label>
        <input
          type='text'
          id='displayName'
          value={formData.displayName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='passwordConfirmation'>Password Confirmation</label>
        <input
          type='password'
          id='passwordConfirmation'
          value={formData.passwordConfirmation}
          onChange={handleInputChange}
          required
        />
        <button type='submit'>Register!</button>
      </form>
    </div>
  );
};

export default Register;
