import React, { useState } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/login', { email, password });

      if (response.data && response.data.status === 'success') {
        toast.success('Login successful!');

        const userData = response.data.data; // Corrected key for user data
        const token = response.data.token;

        setAuth({ user: userData, token });
        localStorage.setItem('auth', JSON.stringify({ user: userData, token }));

        setEmail('');
        setPassword('');

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <form 
        onSubmit={submitHandle}
        style={{ maxWidth: '300px', margin: '0 auto', paddingTop: '10px' }}
      >
        <div className="mb-3">
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      <ToastContainer />
    </Layout>
  );
};

export default Login;
