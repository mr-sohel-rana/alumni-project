 import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../layout/Layout';
import { useNavigate } from 'react-router-dom';

// 🔑 Centralised role map ‑ update here only
export const ROLES = [
  { id: 0, label: 'Student' },
  { id: 1, label: 'Advisory Panel' },
  { id: 2, label: 'President' },
  { id: 3, label: 'Vice‑President' },
  { id: 4, label: 'General Secretary' },
  { id: 5, label: 'Joint General Secretary' },
  { id: 6, label: 'Organizing Secretary' },
  { id: 7, label: 'Office Secretary' },
  { id: 8, label: 'Publicity Secretary' },
  { id: 9, label: 'Executive Members' },
];

const StudentList = () => {
  // ──────────────────────────────── state ────────────────────────────────
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [session, setSession] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAboard, setIsAboard] = useState(false); // TODO: consider renaming to isAbroad
  const usersPerPage = 10;
  const navigate = useNavigate();

  // ───────────────────────────── generate sessions ───────────────────────
  const generateSessions = () => {
    const sessions = [];
    for (let i = 2010; i <= 2025; i++) {
      sessions.push(`${i}-${i + 1}`);
    }
    return sessions;
  };

  // ───────────────────────────── fetch users ─────────────────────────────
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/v1/read');
        setUsers(data.data);
        setFilteredUsers(data.data);
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ───────────────────────────── filters ────────────────────────────────
  useEffect(() => {
    let filtered = users;

    if (session) {
      filtered = filtered.filter(user =>
        user.session?.toLowerCase().includes(session.toLowerCase())
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (isAboard) {
      filtered = filtered.filter(
        user => user.country && user.country.toLowerCase() !== 'bangladesh'
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [session, searchQuery, isAboard, users]);

  // ───────────────────────── pagination helpers ─────────────────────────
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ─────────────────────────── navigation ───────────────────────────────
  const handleProfileClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  // ─────────────────────────── role updater ─────────────────────────────
  const updateUserRole = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/v1/update-role/${userId}`, {
        role: newRole,
      });

      // Update local state (users & filteredUsers) after successful response
      setUsers(prev =>
        prev.map(user => (user._id === userId ? { ...user, role: newRole } : user))
      );
    } catch (err) {
      alert(err);
    }
  };

  // ─────────────────────────────── render ───────────────────────────────
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-light">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center text-dark">
          List of Users
        </h2>

        {/* ─────────────── filters ─────────────── */}
        <div className="d-flex justify-content-between mb-4">
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="form-select form-select-lg w-25"
          >
            <option value="">Select Session</option>
            {generateSessions().map((sessionOption, index) => (
              <option key={index} value={sessionOption}>
                {sessionOption}
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

          <button
            className="btn btn-primary btn-sm ms-2"
            onClick={() => setIsAboard(!isAboard)}
          >
            {isAboard ? 'Show All Students' : 'Show Abroad Students'}
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
                <th>Role</th>
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
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user._id, Number(e.target.value))}
                    >
                      {ROLES.map(({ id, label }) => (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleProfileClick(user._id)}
                      className="btn btn-info btn-sm"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ─────────────── pagination ─────────────── */}
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button className="page-link" onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
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

export default StudentList;
