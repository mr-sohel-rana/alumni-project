import { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import { Modal, Button } from 'react-bootstrap';

const Galary = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    // Fetch the image data from your API
    fetch('http://localhost:5000/api/v1/galaryImage')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setImages(data.result);
        }
      });
  }, []);

  const handleShowModal = (image) => {
    setCurrentImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentImage(null);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000/uploads/${currentImage.image}`;
    link.download = currentImage.image;
    link.click();
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          {images.map((image) => (
            <div className="col-md-3 mb-4" key={image._id}>
              <img
                src={`http://localhost:5000/uploads/${image.image}`}
                alt={image.title}
                className="img-fluid rounded"
                onClick={() => handleShowModal(image)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentImage?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentImage && (
            <img
              src={`http://localhost:5000/uploads/${currentImage.image}`}
              alt={currentImage.title}
              className="img-fluid"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDownload}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Galary;
