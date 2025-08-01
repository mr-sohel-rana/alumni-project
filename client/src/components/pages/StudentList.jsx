<<<<<<< HEAD
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
=======
 // src/components/pages/Alldata.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";

const bloodTypes = [
  "O", "O+", "O-", "A", "A+", "A-",
  "B", "B+", "B-", "AB", "AB+", "AB-",
];

export default function Alldata() {
  /* ───────── state ───────── */
  const [users, setUsers]             = useState([]);
  const [filteredUsers, setFiltered]  = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  /* pagination */
  const [currentPage, setCurrentPage] = useState(1);
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
  const usersPerPage = 10;

  /* filters */
  const [bloodGroup, setBloodGroup]   = useState("");
  const [search, setSearch]           = useState("");

  const navigate = useNavigate();

<<<<<<< HEAD
  // ───────────────────────────── helpers ───────────────────────────
  const generateSessions = () => {
    const sessions = [];
    for (let i = 2010; i <= 2025; i++) {
      sessions.push(`${i}-${i + 1}`);
    }
    return sessions;
  };

  // ───────────────────────────── fetch users ────────────────────────
=======
  /* ───────── fetch once ───────── */
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
  useEffect(() => {
    (async () => {
      try {
<<<<<<< HEAD
        const { data } = await axios.get('http://localhost:5000/api/v1/read');
      
        const withoutAdmins = data.data.filter((u) => u.role !== 1 && u.role >= 0 && u.role <= 9);
        setUsers(withoutAdmins);
        setFilteredUsers(withoutAdmins);
=======
        const { data } = await axios.get("http://localhost:5000/api/v1/reads");
        setUsers(data.data);
        setFiltered(data.data);
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

<<<<<<< HEAD
  // ───────────────────────────── filters ───────────────────────────
=======
  /* ───────── apply filters ───────── */
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
  useEffect(() => {
    let list = [...users];

<<<<<<< HEAD
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
=======
    if (bloodGroup) {
      list = list.filter(
        (u) => u.blood && u.blood.toLowerCase() === bloodGroup.toLowerCase()
      );
    }

    if (search) {
      list = list.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(list);
    setCurrentPage(1);
  }, [bloodGroup, search, users]);

  /* ───────── helpers ───────── */
  if (loading) return <div>Loading…</div>;
  if (error)   return <div>{error}</div>;

  const last   = currentPage * usersPerPage;
  const first  = last - usersPerPage;
  const page   = filteredUsers.slice(first, last);
  const pages  = Math.ceil(filteredUsers.length / usersPerPage);
  const goTo   = (n) => setCurrentPage(n);

  const viewProfile = (id) => navigate(`/profile/${id}`);
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a

  /* ───────── ui ───────── */
  return (
    <Layout>
<<<<<<< HEAD
      <div className="flex flex-col p-4 mt-10 min-h-screen bg-light">

        {/* ─────────────── filters ─────────────── */}
        <div className="d-flex justify-content-between mb-4">
=======
      <div className="flex flex-col min-h-screen bg-light">
        <h2 className="text-3xl text-center font-bold my-4 text-dark">
          DONOR LIST
        </h2>

        {/* filters */}
        <div className="d-flex justify-content-between m-4 flex-wrap gap-3">
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="form-select form-select-lg w-25"
            style={{ textAlign: "center", textAlignLast: "center" }}
          >
<<<<<<< HEAD
            <option value="">Select Session</option>
            {generateSessions().map((s, i) => (
              <option key={i} value={s}>
                {s}
=======
            <option value="">Select blood group</option>
            {bloodTypes.map((b) => (
              <option key={b} value={b} style={{ textAlign: "center" }}>
                {b}
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
              </option>
            ))}
          </select>

          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
<<<<<<< HEAD

          <button className="btn btn-primary btn-sm ms-2" onClick={() => setIsAbroad(!isAbroad)}>
            {isAbroad ? 'Show All Students' : 'Show Abroad Students'}
          </button>
        </div>

        {/* ─────────────── table ─────────────── */}
=======
        </div>

        {/* table */}
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-7xl overflow-x-auto">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th className="text-center">Image</th>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Phone</th>
                <th>District</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {page.map((u) => (
                <tr key={u._id}>
                  <td className="text-center">
                    {u.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${u.image}`}
                        alt={u.name}
                        className="rounded-circle"
                        style={{ height: 40, width: 40 }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-secondary"
                        style={{ height: 40, width: 40 }}
                      />
                    )}
                  </td>

                  <td>{u.name}</td>
                  <td>{u.blood || "N/A"}</td>
                  <td>{u.phone || "N/A"}</td>
                  <td>{u.district || "N/A"}</td>

                  <td className="text-center">
                    <button
                      onClick={() => viewProfile(u._id)}
                      className="btn btn-info btn-sm"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

<<<<<<< HEAD
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
=======
          {/* pagination */}
          {pages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => goTo(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>

                  {[...Array(pages)].map((_, i) => (
                    <li
                      key={i}
                      className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                    >
                      <button className="page-link" onClick={() => goTo(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${currentPage === pages ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => goTo(currentPage + 1)}
                      disabled={currentPage === pages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
        </div>
      </div>
    </Layout>
  );
<<<<<<< HEAD
};

export default Alldata;
=======
}
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
