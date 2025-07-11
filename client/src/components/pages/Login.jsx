 import { useState } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import loginImage  from '../../../public/left.svg';
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

        const userData = response.data.data;
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
      <div className="container" style={{ paddingTop: '40px' }}>
        <div className="row justify-content-center align-items-center">

           {/* left: Image */}
          <div className="col-md-6 text-center">
            <img
              src={loginImage}
              alt="Login Visual"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '0.5rem' }}
            />
          </div>
          {/* Right: Form */}
          <div className="col-md-6">
            <form onSubmit={submitHandle}>
              <h3 className="mb-4 text-center">Login</h3>

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
          </div>

         
        </div>
      </div>

      <ToastContainer />
    </Layout>
  );
};

export default Login;
