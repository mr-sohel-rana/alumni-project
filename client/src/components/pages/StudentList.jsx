 import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../layout/Layout';
import { useNavigate } from 'react-router-dom';

 
const Alldata = () => {
  // ───────────────────────────── state ─────────────────────────────
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [session, setSession] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAbroad, setIsAbroad] = useState(false); // renamed for clarity
  const usersPerPage = 10;
  const navigate = useNavigate();

  // ───────────────────────────── helpers ───────────────────────────
  const generateSessions = () => {
    const sessions = [];
    for (let i = 2010; i <= 2025; i++) {
      sessions.push(`${i}-${i + 1}`);
    }
    return sessions;
  };

  // ───────────────────────────── fetch users ────────────────────────
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/v1/read');
      
        const withoutAdmins = data.data.filter((u) => u.role !== 1 && u.role >= 0 && u.role <= 9);
        setUsers(withoutAdmins);
        setFilteredUsers(withoutAdmins);
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ───────────────────────────── filters ───────────────────────────
  useEffect(() => {
    let filtered = users;

    // Session filter
    if (session) {
      filtered = filtered.filter((u) => u.session?.toLowerCase().includes(session.toLowerCase()));
    }

    // Name search
    if (searchQuery) {
      filtered = filtered.filter((u) => u.name?.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Abroad filter (country ≠ Bangladesh)
    if (isAbroad) {
      filtered = filtered.filter((u) => u.country && u.country.toLowerCase() !== 'bangladesh');
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [session, searchQuery, isAbroad, users]);

  // ───────────────────────────── pagination ────────────────────────
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ───────────────────────────── navigation ────────────────────────
  const handleProfileClick = (userId) => navigate(`/profile/${userId}`);

  // ───────────────────────────── render ────────────────────────────
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-light">
        

        {/* ─────────────── filters ─────────────── */}
        <div className="d-flex justify-content-between mb-4">
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="form-select form-select-lg w-25"
          >
            <option value="">Select Session</option>
            {generateSessions().map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button className="btn btn-primary btn-sm ms-2" onClick={() => setIsAbroad(!isAbroad)}>
            {isAbroad ? 'Show All Students' : 'Show Abroad Students'}
          </button>
        </div>

        {/* ─────────────── table ─────────────── */}
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-7xl overflow-x-auto">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th className="text-center">Image</th>
                <th>Name</th>
                <th>Session</th>
                <th>Profession</th>
                <th>Institution</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  <td className="text-center">
                    {user.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${user.image}`}
                        alt={user.name}
                        className="rounded-circle"
                        style={{ height: '40px', width: '40px' }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-circle bg-secondary"></div>
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.session}</td>
                  <td>{user.profession}</td>
                  <td>{user.institution || 'N/A'}</td>
                  <td>
                    <button onClick={() => handleProfileClick(user._id)} className="btn btn-info btn-sm">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Alldata;