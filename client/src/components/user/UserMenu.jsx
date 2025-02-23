import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const [auth, setAuth] = useAuth();
  const navigate=useNavigate();

  const logouthandle = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem('auth');
    navigate("/")

  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">User Menu</h1>

      <div className="d-flex flex-column">
        <div className="mb-3">
          <Link to="/dashboard/user/profile" className="btn btn-info w-100">View Profile</Link>
        </div>

        <div className="mb-3">
          <Link to={`/dashboard/user/update-profile/${auth.user._id}`} className="btn btn-warning w-100">Update Profile</Link>
        </div>

        <div className="mb-3">
          <button onClick={logouthandle} className="btn btn-danger w-100">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;