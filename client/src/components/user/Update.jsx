import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import UserMenu from './UserMenu';
import { useAuth } from '../../context/auth';

const Update = () => {
  const { id } = useParams(); // Get user ID from URL params
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth(); // Get auth and setAuth from useAuth context

  // State to store form data
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '', // Password field
    batch: '',
    session: '',
    phone: '',
    profession: '',
    institution: '',
    county: '',
    facebook: '',
    linkedin: '',
    paper: '',
    district: '',
    bio: '',
    image: '', // Image field
  });

  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = id || auth.user?.id; // If `id` from URL is undefined, use `auth.user.id`

      if (!userId) {
        toast.error('User ID is missing!');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/v1/single-user/${userId}`);
        const userData = response.data.data;
        setFormValue({
          name: userData.name,
          email: userData.email,
          batch: userData.batch,
          session: userData.session,
          phone: userData.phone,
          profession: userData.profession,
          institution: userData.institution,
          county: userData.county,
          facebook: userData.facebook,
          linkedin: userData.linkedin,
          paper: userData.paper,
          district: userData.district,
          bio: userData.bio,
          image: userData.image,
        });

        // If there is an image, set preview
        if (userData.image) {
          setImagePreview(`http://localhost:5000/uploads/${userData.image}`);
        }
      } catch (error) {
        toast.error('Failed to load user data.');
      }
    };

    fetchUserData();
  }, [id, auth.user?.id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Handle image preview for the uploaded file
    if (name === 'image') {
      const file = e.target.files[0];
      if (file) {
        // Validate if it's an image file
        if (!file.type.startsWith("image/")) {
          toast.error("Invalid image type. Please upload an image file.");
          return;
        }

        setFormValue((prevState) => ({
          ...prevState,
          image: file,
        }));

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result); // Set the preview
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Validate form before submission
  const validateForm = () => {
    if (!formValue.name || !formValue.phone || !formValue.session || !formValue.batch) {
      toast.error('Please fill all required fields.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Ensure form is valid before submitting

    const userId = id || auth.user?.id; // Ensure correct user ID

    if (!userId) {
      toast.error('User ID is missing!');
      return;
    }

    const formData = new FormData();
    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/v1/update/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Profile updated successfully!');

      // Check if the image is updated
      if (response.data.data) {
        const updatedUserData = response.data.data;
        setAuth({
          ...auth,
          user: updatedUserData,  // Update the user in auth context
        });

        // If the backend returns a new image path, update the image preview
        if (updatedUserData.image) {
          setImagePreview(`http://localhost:5000/uploads/${updatedUserData.image}`);
        }
      }

      // Reset form and image preview
      setFormValue({
        name: '',
        email: '',
        password: '', // Reset password field
        batch: '',
        session: '',
        phone: '',
        profession: '',
        institution: '',
        county: '',
        facebook: '',
        linkedin: '',
        paper: '',
        district: '',
        bio: '',
        image: '',
      });
      setImagePreview(null);

      setTimeout(() => {
        navigate('/dashboard/user/profile'); // Redirect to profile page
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Update failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  // Generate sessions
  const generateSessions = () => {
    const sessions = [];
    for (let year = 2010; year <= 2030; year++) {
      sessions.push(`${year}-${year + 1}`);
    }
    return sessions;
  };

  // Generate batches
  const generateBatches = () => {
    const batches = [];
    for (let i = 1; i <= 12; i++) {
      batches.push(i);
    }
    return batches;
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          {/* User Menu Section */}
          <div className="col-md-4">
            <UserMenu />
          </div>

          {/* Update Form Section */}
          <div className="col-md-8">
            <div className="card p-4 shadow-lg">
              <h3 className="text-center text-primary mb-4">Update Profile</h3>

              {/* Profile Picture */}
              <div className="text-center mb-3">
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Profile" 
                    className="img-fluid rounded-circle border border-3 border-primary shadow-sm" 
                    width="160"
                  />
                )}
              </div>

              <form onSubmit={handleUpdate}>
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" name="name" className="form-control" value={formValue.name} onChange={handleChange} required />
                </div>

                {/* Email (Read-Only) */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={formValue.email} readOnly />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password (Optional)</label>
                  <input type="password" name="password" className="form-control" value={formValue.password} onChange={handleChange} />
                </div>

                {/* Batch & Session */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Batch</label>
                    <select name="batch" className="form-control" value={formValue.batch} onChange={handleChange}>
                      <option value="">Select Batch</option>
                      {generateBatches().map((batch) => (
                        <option key={batch} value={batch}>{batch} Batch</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Session</label>
                    <select name="session" className="form-control" value={formValue.session} onChange={handleChange}>
                      <option value="">Select Session</option>
                      {generateSessions().map((session) => (
                        <option key={session} value={session}>{session}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Phone & Profession */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone</label>
                    <input type="tel" name="phone" className="form-control" value={formValue.phone} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Paper</label>
                    <input type="text" name="paper" className="form-control" value={formValue.paper} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Profession</label>
                    <input type="text" name="profession" className="form-control" value={formValue.profession} onChange={handleChange} />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="mb-3">
                  <label className="form-label">Profile Picture</label>
                  <input 
                    type="file" 
                    name="image" 
                    className="form-control" 
                    accept="image/*" 
                    onChange={handleChange} 
                  />
                </div>

                {/* Bio */}
                <div className="mb-3">
                  <label className="form-label">Bio</label>
                  <textarea name="bio" className="form-control" rows="3" value={formValue.bio} onChange={handleChange}></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastContainer />
    </Layout>
  );
};

export default Update;
