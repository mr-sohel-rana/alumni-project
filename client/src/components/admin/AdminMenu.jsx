import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

const AdminMenu = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const logouthandle = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setAuth({ ...auth, user: null, token: "" });
      localStorage.removeItem('auth');
      navigate("/");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Panel</h2>

      <div className="d-flex flex-column align-items-center">
        <div className="mb-3 w-100">
          <Link to="/dashboard/admin/profile" className="btn btn-info w-100">View Profile</Link>
        </div>

        <div className="mb-3 w-100">
          <Link to={`/dashboard/admin/update-profile/${auth?.user?._id}`} className="btn btn-warning w-100">Update Profile</Link>
        </div>

        <div className="mb-3 w-100">
          <Link to="/dashboard/admin/create-gallery" className="btn btn-primary w-100">Create Gallery</Link>
        </div>

        <div className="mb-3 w-100">
          <Link to="/dashboard/admin/create-carousel" className="btn btn-secondary w-100">Create Carousel Image</Link>
        </div>
        <div className="mb-3 w-100">
          <Link to="/dashboard/admin/sendemail" className="btn btn-secondary w-100">send email</Link>
        </div>

        <div className="mb-3 w-100">
          <button onClick={logouthandle} className="btn btn-danger w-100">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
