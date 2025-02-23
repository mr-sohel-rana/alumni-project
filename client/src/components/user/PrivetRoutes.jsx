import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';

const PriveteRoutes = () => {
  const [ok, setOk] = useState(null); // Track authentication status
  const [auth] = useAuth(); // Access auth state

  useEffect(() => {
    const checkAuth = async () => {
      if (!auth?.token) {
        setOk(false);
        return;
      }

      try {
        const { data } = await axios.get('http://localhost:5000/api/v1/user-auth', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setOk(data.ok);
      } catch (error) {
        setOk(false);
      }
    };

    checkAuth();
  }, [auth?.token]);

  if (ok === null) return <div>Loading...</div>; // Show loading state while verifying auth

  return ok ? <Outlet /> : <Navigate to="/login" />;
};

export default PriveteRoutes;
