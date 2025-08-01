 // src/pages/Post.jsx
import React, { useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const bloodTypes = [
  "O", "O+", "O-", "A", "A+", "A-",
  "B", "B+", "B-", "AB", "AB+", "AB-",
];

export default function Post() {
  const [form, setForm] = useState({
    problemname: "",
    blood: "",
    amount: "",
    date: "",      // yyyy‑mm‑dd
    place: "",
    phone1: "",
    phone2: "",
  });

  const navigate = useNavigate();

  /* ---------- helpers ---------- */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const allFilled = () => Object.values(form).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allFilled()) return toast.error("Please fill in every field.");

    // backend expects a number for date; store timestamp
    const payload = { ...form, date: new Date(form.date).getTime() };

    try {
      await axios.post("http://localhost:5000/api/v1/posts", payload);
      toast.success("Post created!");
      setTimeout(() => navigate("/post"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create post.");
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
          <h3 className="text-center mb-4 text-primary">Blood Request Post</h3>

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
                required
              />
            </div>
          </div>

          <button className="btn btn-primary w-100 mt-4">Submit Post</button>
        </form>

        <ToastContainer position="bottom-right" />
      </div>
    </Layout>
  );
}
