<<<<<<< HEAD
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
=======
 import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";

const bloodTypes = [
  "O", "O+", "O-", "A", "A+", "A-",
  "B", "B+", "B-", "AB", "AB+", "AB-",
];

const roleOptions = [
  { value: 1, label: "admin" },
  { value: 2, label: "sir" },
  { value: 3, label: "advisor" },
  { value: 5, label: "president" },
  { value: 0, label: "student" },
];

const statusOptions = [
  { value: 1, label: "Active" },
  { value: 0, label: "Inactive" },
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
  // ───────────────────────────── generate sessions ───────────────────────
  const generateSessions = () => {
    const sessions = [];
    for (let i = 2010; i <= 2025; i++) {
      sessions.push(`${i}-${i + 1}`);
=======
  /* ───────── helpers ───────── */
  const updateUserField = async (userId, field, value) => {
    try {
      await axios.put(
        `http://localhost:5000/api/v1/update-${field}/${userId}`,
        { [field]: value },
      );

      setUsers(prev =>
        prev.map(u =>
          u._id === userId ? { ...u, [field]: value } : u,
        ),
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user.");
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
    }
  };

<<<<<<< HEAD
  // ───────────────────────────── fetch users ─────────────────────────────
=======
  /* ───────── fetch once ───────── */
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
  useEffect(() => {
    (async () => {
      try {
<<<<<<< HEAD
        const { data } = await axios.get('http://localhost:5000/api/v1/read');
        setUsers(data.data);
        setFilteredUsers(data.data);
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
  // ───────────────────────────── filters ────────────────────────────────
=======
  /* ───────── apply filters ───────── */
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
  useEffect(() => {
    let list = [...users];

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

<<<<<<< HEAD
  // ───────────────────────── pagination helpers ─────────────────────────
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
=======
  /* ───────── helpers ───────── */
  if (loading) return <div>Loading…</div>;
  if (error)   return <div>{error}</div>;
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a

  const last   = currentPage * usersPerPage;
  const first  = last - usersPerPage;
  const page   = filteredUsers.slice(first, last);
  const pages  = Math.ceil(filteredUsers.length / usersPerPage);
  const goTo   = (n) => setCurrentPage(n);

<<<<<<< HEAD
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
=======
  const viewProfile = (id) => navigate(`/profile/${id}`);
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a

  /* ───────── ui ───────── */
  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-light">
<<<<<<< HEAD
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center text-dark">
          List of Users
        </h2>

        {/* ─────────────── filters ─────────────── */}
        <div className="d-flex justify-content-between mb-4">
=======
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
            <option value="">Select blood group</option>
            {bloodTypes.map((b) => (
              <option key={b} value={b} style={{ textAlign: "center" }}>
                {b}
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
        </div>

<<<<<<< HEAD
        {/* ─────────────── table ─────────────── */}
=======
        {/* table */}
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-7xl overflow-x-auto">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th className="text-center">Image</th>
                <th>Name</th>
<<<<<<< HEAD
                <th>Session</th>
                <th>Profession</th>
                <th>Institution</th>
                <th>Role</th>
                <th>Actions</th>
=======
                <th>Blood Group</th>
                <th>Phone</th>
                <th>District</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
              </tr>
            </thead>

            <tbody>
<<<<<<< HEAD
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  <td className="text-center">
                    {user.image ? (
=======
              {page.map((u) => (
                <tr key={u._id}>
                  <td className="text-center">
                    {u.image ? (
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
                      <img
                        src={`http://localhost:5000/uploads/${u.image}`}
                        alt={u.name}
                        className="rounded-circle"
                        style={{ height: 40, width: 40 }}
                      />
                    ) : (
<<<<<<< HEAD
                      <div className="w-16 h-16 rounded-circle bg-secondary"></div>
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.session}</td>
                  <td>{user.profession}</td>
                  <td>{user.institution || 'N/A'}</td>
=======
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

                  {/* role */}
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
                  <td>
                    <select
                      value={u.role ?? 0}
                      className="form-select form-select-sm"
                      onChange={(e) =>
                        updateUserField(u._id, "role", Number(e.target.value))
                      }
                    >
<<<<<<< HEAD
                      {ROLES.map(({ id, label }) => (
                        <option key={id} value={id}>
                          {label}
=======
                      {roleOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
                        </option>
                      ))}
                    </select>
                  </td>
<<<<<<< HEAD
                  <td>
                    <button
                      onClick={() => handleProfileClick(user._id)}
=======

                  

                  <td className="text-center">
                    <button
                      onClick={() => viewProfile(u._id)}
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
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
>>>>>>> 63a10297bf41dd4eed3a057daf5dc6b4190b1b2a
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
        </div>
      </div>
    </Layout>
  );
}
