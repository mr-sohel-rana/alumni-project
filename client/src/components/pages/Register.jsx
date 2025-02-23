import React, { useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    batch: "",
    session: "",
    profession: "",
    institution: "",
    county: "",
    facebook: "",
    linkedin: "",
    paper: "",
    district: "",
    bio: "",
    image: "", // Image file is handled separately
  });

  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      setFormValue((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormValue((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Function to validate form fields
  const validateForm = () => {
    for (const key in formValue) {
      if (!formValue[key]) {
        toast.error("Please fill in all required fields.");
        return false;
      }
    }
    return true;
  };

  // Function to handle form submission
  const submitHandle = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(formValue).forEach(([key, value]) => formData.append(key, value));

    try {
      await axios.post("http://localhost:5000/api/v1/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  // Function to generate batch options
  const generateBatches = () => Array.from({ length: 12 }, (_, i) => i + 1);

  // Function to generate session options (2010-2030)
  const generateSessions = () => Array.from({ length: 21 }, (_, i) => 2010 + i);

  return (
    <Layout>
      <form
        onSubmit={submitHandle}
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 className="text-center text-primary mb-4">Register</h3>

        {/* Text Fields */}
        {["name", "email", "password", "phone", "address", "profession", "institution", "county", "facebook", "linkedin", "paper", "district", "bio"].map(
          (field) => (
            <div key={field} className="mb-3">
              <input
                name={field}
                type={field === "password" ? "password" : "text"}
                className="form-control"
                placeholder={`Enter your ${field}`}
                value={formValue[field]}
                onChange={handleChange}
              />
            </div>
          )
        )}

        {/* Batch Dropdown */}
        <div className="mb-3">
          <select name="batch" className="form-control" value={formValue.batch} onChange={handleChange}>
            <option value="">Select Batch</option>
            {generateBatches().map((batch) => (
              <option key={batch} value={batch}>{batch} Batch</option>
            ))}
          </select>
        </div>

        {/* Session Dropdown */}
        <div className="mb-3">
          <select name="session" className="form-control" value={formValue.session} onChange={handleChange}>
            <option value="">Select Session</option>
            {generateSessions().map((session) => (
              <option key={session} value={session}>{session}-{session + 1}</option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-3 text-center">
          <input name="image" type="file" className="form-control" accept="image/*" onChange={handleChange} />
          {imagePreview && (
            <div style={{ marginTop: "10px" }}>
              <img src={imagePreview} alt="Preview" style={{ width: "200px", height: "200px", borderRadius: "8px", objectFit: "cover" }} />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>

      {/* Toast Notifications */}
      <ToastContainer />
    </Layout>
  );
};

export default Register;
