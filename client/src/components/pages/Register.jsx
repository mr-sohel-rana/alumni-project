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
    profession: "",
    facebook: "",
    linkedin: "",
    district: "",
    image: "",
    blood: "",    // add bloodGroup here
  });

  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

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

  const validateForm = () => {
    for (const key in formValue) {
      if (!formValue[key]) {
        toast.error("Please fill in all required fields.");
        return false;
      }
    }
    return true;
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(formValue).forEach(([key, value]) =>
      formData.append(key, value)
    );
    s

    try {
      await axios.post("http://localhost:5000/api/v1/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  const bloodTypes = [
    "O",
    "O+",
    "O-",
    "A",
    "A+",
    "A-",
    "B",
    "B+",
    "B-",
    "AB",
    "AB+",
    "AB-",
  ];

  return (
    <Layout>
      {/* Container with background image */}
      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1543039625-14cbd3802e7d?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <form
          onSubmit={submitHandle}
          style={{
            width: "100%",
            maxWidth: "1000px",
            padding: "40px",
            backgroundColor: "rgba(255, 255, 255, 0.15)", // transparent white
            borderRadius: "12px",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)", // for Safari support
            border: "1px solid rgba(255, 255, 255, 0.18)",
            color: "white",
            fontSize: "25px",
          }}
        >
          <h3
            className="text-center mb-4"
            style={{ color: "#0000ff", fontSize: "30px" }}
          >
            Register
          </h3>

          {/* Personal Info */}
          <h5 className="mb-3" style={{ color: "#0000ff", fontSize: "28px" }}>
            Personal Information
          </h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={formValue.name}
                onChange={handleChange}
                style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={formValue.email}
                onChange={handleChange}
                style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={formValue.password}
                onChange={handleChange}
                style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Blood Group</label>
              <select
                name="blood"
                value={formValue.blood}
                onChange={handleChange}
                className="form-select form-select-lg w-100"
                style={{ textAlign: "center", textAlignLast: "center" }}
              >
                <option value="">Select blood group</option>
                {bloodTypes.map((type, i) => (
                  <option key={i} value={type} style={{ textAlign: "center" }}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Phone</label>
              <input
                name="phone"
                type="text"
                className="form-control"
                placeholder="Enter your phone number"
                value={formValue.phone}
                onChange={handleChange}
                style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>District</label>
              <input
                name="district"
                type="text"
                className="form-control"
                placeholder="Enter your district"
                value={formValue.district}
                onChange={handleChange}
                style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label>Profession</label>
            <input
              name="profession"
              type="text"
              className="form-control"
              placeholder="Your profession"
              value={formValue.profession}
              onChange={handleChange}
              style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
            />
          </div>

          {/* Social Media */}
          <h5 className="mt-4 mb-3" style={{ color: "#0000ff", fontSize: "30px" }}>
            Social Links & Contributions
          </h5>
          <div className="mb-3">
            <label>Facebook</label>
            <input
              name="facebook"
              type="text"
              className="form-control"
              placeholder="Facebook profile URL"
              value={formValue.facebook}
              onChange={handleChange}
              style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
            />
          </div>
          <div className="mb-3">
            <label>LinkedIn</label>
            <input
              name="linkedin"
              type="text"
              className="form-control"
              placeholder="LinkedIn profile URL"
              value={formValue.linkedin}
              onChange={handleChange}
              style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
            />
          </div>

          {/* Image Upload */}
          <h5 className="mt-4 mb-3" style={{ color: "#ddd" }}>
            Profile Photo
          </h5>
          <div className="mb-3">
            <input
              name="image"
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
              style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
            />
          </div>
          {imagePreview && (
            <div className="text-center mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "2px solid #ddd",
                }}
              />
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 py-2">
            Register
          </button>
        </form>

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default Register;
