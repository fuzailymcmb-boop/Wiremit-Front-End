import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

const SignUpForm = () => {
  const { signup } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required');
      return;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Invalid email');
      return;
    }
    signup(form.name, form.email, form.password)
      .catch(err => setError(err.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      {error && <p style={{color:'red'}}>{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
