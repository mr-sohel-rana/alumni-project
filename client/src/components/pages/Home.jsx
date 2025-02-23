import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';

const Home = () => {
  const [carosel, setCarosel] = useState([]);

  // Function to fetch all images
  const alldata = () => {
    axios
      .get('http://localhost:5000/api/v1/allimage')
      .then((response) => {
        setCarosel(response.data.result); // Store fetched images in state
      })
      .catch((error) => {
        console.error("Error fetching carousel data", error);
      });
  };

  useEffect(() => {
    alldata(); // Fetch data when component mounts
  }, []);

  return (
    <Layout>
      <div id="carouselExampleInterval" className="container carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {carosel.length > 0 ? (
            carosel.map((img, index) => (
              <div
                className={`carousel-item ${index === 0 ? 'active' : ''}`} // Set first item as active
                key={img._id}
                data-bs-interval={2000}
              >
                <div className="position-relative">
                <img src={`http://localhost:5000/uploads/${img.image}`}  
                 className="d-block w-100"
                       alt="Carousel"style={{ objectFit: 'cover', maxHeight: '400px' }}  
/>
                  <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                    <h3 className="text-primary">ALUMNI STUDENT OF PABNA UNIVERSITY OF SCIENCE AND TECHNOLOGY</h3>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <div className="position-relative">
                <img
                  src="https://via.placeholder.com/800x400" // Placeholder image if no images are fetched
                  className="d-block w-100"
                  alt="Placeholder"
                />
                <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                  <h3 className="text-primary">No Images Available</h3>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </Layout>
  );
};

export default Home;
