 import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const bloodTypes = [
  "O", "O+", "O-", "A", "A+", "A-",
  "B", "B+", "B-", "AB", "AB+", "AB-",
];

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    problemname: "",
    blood: "",
    amount: "",
    date: "",
    place: "",
    phone1: "",
    phone2: "",
  });

  /* ---------- fetch existing post ---------- */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/v1/posts/${id}`);
        const p = data.data;
        setForm({
          ...p,
          date: new Date(p.date).toISOString().slice(0, 10), // YYYY-MM-DD
        });
      } catch (err) {
        toast.error("Post not found");
        navigate("/post");
      }
    })();
  }, [id, navigate]);

  /* ---------- helpers ---------- */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const allFilled = () => {
    const mustHave = ["problemname", "blood", "amount", "date", "place", "phone1"];
    return mustHave.every((key) => String(form[key]).trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allFilled()) return toast.error("Please fill in every field.");

    const payload = {
      ...form,
      phone1: form.phone1.trim(),
      phone2: form.phone2.trim(),
      date: new Date(form.date).getTime(),
    };

    try {
      await axios.put(`http://localhost:5000/api/v1/posts/${id}`, payload);
      toast.success("Post updated!");
      setTimeout(() => navigate("/posts"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed.");
    }
  };

  /* ---------- ui ---------- */
  return (
    <Layout>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1543039625-14cbd3802e7d?q=80&w=874&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-50 p-4 p-md-5 rounded-3 shadow"
          style={{ maxWidth: 700, width: "100%" }}
        >
          <h3 className="text-center mb-4 text-primary">Edit Blood Request</h3>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Patient / Problem Name</label>
              <input
                name="problemname"
                value={form.problemname}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Surgery for Rahim"
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Blood Group</label>
              <select
                name="blood"
                value={form.blood}
                onChange={handleChange}
                className="form-select"
                style={{ textAlign: "center", textAlignLast: "center" }}
                required
              >
                <option value="">Select</option>
                {bloodTypes.map((b) => (
                  <option key={b} value={b} style={{ textAlign: "center" }}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Amount (bags)</label>
              <input
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 2"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Date Needed</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Place / Hospital</label>
              <input
                name="place"
                value={form.place}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Phone 1</label>
              <input
                name="phone1"
                value={form.phone1}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Phone 2</label>
              <input
                name="phone2"
                value={form.phone2}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <button className="btn btn-primary w-100 mt-4">Save Changes</button>
        </form>

        <ToastContainer position="bottom-right" />
      </div>
    </Layout>
  );
}
