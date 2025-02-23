import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import AdminMenu from './AdminMenu';
import { Button, Form, Modal } from 'react-bootstrap';

const Carosel = () => {
  const [images, setImages] = useState([]);  // Changed to an array to hold multiple images
  const [newImage, setNewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);  // To hold the selected image for update

  // Fetch the current images when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/v1/allimage')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.result)) {
          setImages(data.result);  // Set images to an array of images
        }
      });
  }, []);

  const handleFileChange = (event) => {
    setNewImage(event.target.files[0]);
  };

  const handleUpdate = () => {
    if (selectedImage && newImage) {
      const formData = new FormData();
      formData.append('image', newImage);

      // Use the selected image's id for updating
      fetch(`http://localhost:5000/api/v1/carocel/${selectedImage._id}`, {
        method: 'PUT',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            setImages((prevImages) =>
              prevImages.map((img) =>
                img._id === selectedImage._id ? data.result : img
              )
            );
            setNewImage(null); // Reset the new image state
            setShowModal(false); // Close the modal
          }
        });
    }
  };

  const handleDelete = (imageId) => {
    if (imageId) {
      fetch(`http://localhost:5000/api/v1/carocel/${imageId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            setImages((prevImages) => prevImages.filter((img) => img._id !== imageId));
          }
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    if (newImage) {
      const formData = new FormData();
      formData.append('image', newImage);

      // Upload the new image
      fetch('http://localhost:5000/api/v1/carocel', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            setImages((prevImages) => [...prevImages, data.result]); // Add the newly uploaded image
            setNewImage(null); // Clear the selected file
          }
        });
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Layout>
      <div className="md-col-4">
        <AdminMenu />
      </div>
      <div className="md-col-8">
        {/* Form to upload a new image */}
        <form onSubmit={handleSubmit}>
          <h1>Create Carousel</h1>
          <input
            type="file"
            name="carosel"
            onChange={handleFileChange}
            accept="image/*" // Restricting to image files
          />
          <button type="submit">Upload</button>
        </form>

        <h3>Carousel Image Management</h3>
        {images.length > 0 ? (
          <div>
            {images.map((img) => (
              <div key={img._id}>
                <img
                  src={`http://localhost:5000/uploads/${img.image}`}
                  alt="Carousel"
                  className="img-fluid"
                  style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                />
                <div className="mt-3">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedImage(img); // Set the selected image for updating
                      setShowModal(true); // Show the modal to update the image
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(img._id)}  // Delete this specific image
                    className="ml-2"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No images in the carousel.</p>
        )}

        {/* Update Image Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Carousel Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select Image to Upload</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*" // Restricting to image files
                />
              </Form.Group>
              <Button variant="primary" onClick={handleUpdate}>
                Update Image
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
};

export default Carosel;
