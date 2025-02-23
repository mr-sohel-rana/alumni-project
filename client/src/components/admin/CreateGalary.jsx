import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminMenu from './AdminMenu';

const CreateGallery = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [gallery, setGallery] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/galaryImage');
        setGallery(response.data.result);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      toast.error('Please provide an image and a title');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    try {
      let response;
      if (editId) {
        response = await axios.put(`http://localhost:5000/api/v1/galary-update/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Image updated successfully');
        setGallery(gallery.map(item => (item._id === editId ? response.data.result : item)));
      } else {
        response = await axios.post('http://localhost:5000/api/v1/galary', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Image uploaded successfully');
        setGallery([...gallery, response.data.result]);
      }

      setImage(null);
      setFile(null);
      setTitle('');
      setEditId(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/gelary-deleteItem/${id}`);
      toast.success('Image deleted successfully');
      setGallery(gallery.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Image deletion failed');
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setImage(`http://localhost:5000/uploads/${item.image}`);
    setEditId(item._id);
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">{editId ? 'Edit' : 'Upload'} Gallery Image</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-center">
                {image && <img src={image} alt="Preview" className="img-thumbnail" style={{ maxWidth: '250px' }} />}
              </div>
              <div className="mb-3">
                <input type="file" className="form-control" onChange={handleImageChange} />
              </div>
              <div className="mb-3">
                <input
                  type='text'
                  className="form-control"
                  placeholder='Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">{editId ? 'Update' : 'Upload'}</button>
            </form>
          </div>

          <div className="mt-5">
            <h2 className="text-center">Gallery</h2>
            <div className="row">
              {gallery.map((item) => (
                <div key={item._id} className="col-lg-4 col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <img
                      src={`http://localhost:5000/uploads/${item.image}`}
                      alt="Gallery"
                      className="card-img-top img-fluid rounded"
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{item.title}</h5>
                      <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-warning" onClick={() => handleEdit(item)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </Layout>
  );
};

export default CreateGallery;
