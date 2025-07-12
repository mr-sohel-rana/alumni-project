 import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Navbar = () => {
  const [auth, setAuth] = useAuth();

  const logouthandle = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          padding-bottom: 5px;
          color: #000 !important;
          transition: color 0.3s;
           font-size: 20px;
        }

        .nav-link:hover {
          color: #0d6efd !important;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 10px;
          right: 10px;
          height: 2px;
          background-color: #0d6efd;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }

        .nav-link.active {
          color: #0d6efd !important;
          font-weight: 600;
        }

        .dropdown-toggle {
          background-color: #0d6efd !important;
          color: #fff !important;
          border-radius: 20px;
          padding: 6px 16px;
          font-size: 20px;
          margin-top: 20px;
          border: none !important;
          box-shadow: none !important;
        }

        .dropdown-toggle::after {
          display: inline-block;
          margin-left: 0.255em;
          vertical-align: 0.255em;
          content: "";
          border-top: 0.3em solid;
          border-right: 0.3em solid transparent;
          border-bottom: 0;
          border-left: 0.3em solid transparent;
        }

        .dropdown-menu {
          margin-left: -100px;
        }

        .dropdown-item:hover {
          background-color: #0d6efd;
          color: #fff !important;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <strong>DONATE BLOOD</strong>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    window.location.pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                >
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    window.location.pathname === "/donar-list" ? "active" : ""
                  }`}
                  to="/donar-list"
                >
                  DONER LIST
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    window.location.pathname === "/create-post" ? "active" : ""
                  }`}
                  to="/create-post"
                >
                   NEED DONAR 
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    window.location.pathname === "/posts" ? "active" : ""
                  }`}
                  to="/posts"
                >
                 POSTS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    window.location.pathname === "/galary" ? "active" : ""
                  }`}
                  to="/galary"
                >
                  OUR DONAR GARALAY
                </Link>
              </li>

              {/* User dropdown */}
               <li className="nav-item dropdown" style={{ marginTop: '10px' }}>

                <Link  
                  className="dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ textDecoration: 'none' }}
                >
                  {auth?.user ? auth.user.name : "ACCOUNT"}
                </Link>

                <ul className="dropdown-menu">
                  {auth?.user ? (
                    <>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={logouthandle}>
                          Logout
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/register">
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
