import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../layout/Layout';
import { useNavigate } from 'react-router-dom';

const Alldata = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [session, setSession] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAboard, setIsAboard] = useState(false); // State to check for abroad students
  const usersPerPage = 10;
  const navigate = useNavigate();

  const generateSessions = () => {
    const sessions = [];
    for (let i = 2010; i <= 2025; i++) {
      sessions.push(`${i}-${i + 1}`);
    }
    return sessions;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/read');
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Filter by session
    if (session) {
      filtered = filtered.filter(user => user.session.toLowerCase().includes(session.toLowerCase()));
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Show only abroad students if isAboard is true
    if (isAboard) {
      filtered = filtered.filter(user => user.country && user.country.toLowerCase() !== 'bangladesh');
    }

    // Set filtered users
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [session, searchQuery, isAboard, users]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleProfileClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-light">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center text-dark">List of Users</h2>

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
            onClick={() => setIsAboard(!isAboard)} // Toggle the isAboard state
          >
            {isAboard ? 'Show All Students' : 'Show Abroad Students'}
          </button>
        </div>

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

          {/* Pagination Controls */}
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
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
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

export default Alldata;
