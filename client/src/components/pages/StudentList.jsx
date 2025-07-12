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
  const usersPerPage = 10;

  /* filters */
  const [bloodGroup, setBloodGroup]   = useState("");
  const [search, setSearch]           = useState("");

  const navigate = useNavigate();

  /* ───────── fetch once ───────── */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/reads");
        setUsers(data.data);
        setFiltered(data.data);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ───────── apply filters ───────── */
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

  /* ───────── helpers ───────── */
  if (loading) return <div>Loading…</div>;
  if (error)   return <div>{error}</div>;

  const last   = currentPage * usersPerPage;
  const first  = last - usersPerPage;
  const page   = filteredUsers.slice(first, last);
  const pages  = Math.ceil(filteredUsers.length / usersPerPage);
  const goTo   = (n) => setCurrentPage(n);

  const viewProfile = (id) => navigate(`/profile/${id}`);

  /* ───────── ui ───────── */
  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-light">
        <h2 className="text-3xl text-center font-bold my-4 text-dark">
          DONOR LIST
        </h2>

        {/* filters */}
        <div className="d-flex justify-content-between m-4 flex-wrap gap-3">
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

        {/* table */}
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
        </div>
      </div>
    </Layout>
  );
}
