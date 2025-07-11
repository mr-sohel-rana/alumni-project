 import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';

const Home = () => {
  const [carosel, setCarosel] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingCarousel, setLoadingCarousel] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all carousel images
  const alldata = () => {
    axios
      .get('http://localhost:5000/api/v1/allimage')
      .then((response) => {
        setCarosel(response.data.result || []);
      })
      .catch((error) => {
        console.error("Error fetching carousel data", error);
        setError("Failed to load carousel images");
      })
      .finally(() => setLoadingCarousel(false));
  };

  // Fetch users
  const fetchUsers = () => {
    axios
      .get('http://localhost:5000/api/v1/read')
      .then((response) => {
        setUsers(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
        setError("Failed to load users");
      })
      .finally(() => setLoadingUsers(false));
  };

  useEffect(() => {
    alldata();
    fetchUsers();
  }, []);

  // Render user card by role
    const renderUserCard = (user) => (
  <div
    key={user._id}
    className="card shadow m-3"
    style={{ width: '25rem', borderRadius: '0.5rem' }}
  >
    <img
      src={user.image ? `http://localhost:5000/uploads/${user.image}` : 'https://via.placeholder.com/150'}
      className="card-img-top"
      alt={user.name}
      style={{ height: '300px', objectFit: 'cover', borderRadius: '0.5rem 0.5rem 0 0' }}
    />
    <div
      className="card-body d-flex flex-column align-items-center"
      style={{ textAlign: 'center' }}
    >
      <p className="card-text mb-1">
        <strong>Role:</strong> {user.role === 1 ? 'Admin' : user.role === 2 ? 'Sir' : 'Other'}
      </p>
      <p className="card-text mb-3">
        <strong>Profession:</strong> {user.profession || 'N/A'}
      </p>
      <h5
        className="card-title"
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          width: '100%',
          padding: '0.5rem',
          borderRadius: '0 0 0.5rem 0.5rem',
        }}
      >
        {user.name}
      </h5>
    </div>
  </div>
);



  return (
    <Layout>
      {/* Carousel Section */}
      <div
        id="carouselExampleInterval"
        className="container carousel slide my-4"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {loadingCarousel ? (
            <div className="text-center py-5">Loading carousel...</div>
          ) : carosel.length > 0 ? (
            carosel.map((img, index) => (
              <div
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                key={img._id}
                data-bs-interval={2000}
              >
                <div className="position-relative">
                  <img
                    src={`http://localhost:5000/uploads/${img.image}`}
                    className="d-block w-100"
                    alt="Carousel"
                    style={{ objectFit: 'cover', maxHeight: '400px' }}
                  />
                  <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                    <h3 className="text-primary">
                      ALUMNI STUDENT OF PABNA UNIVERSITY OF SCIENCE AND TECHNOLOGY
                    </h3>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <div className="position-relative">
                <img
                  src="https://via.placeholder.com/800x400"
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

      

      {/* about our alumni */}
<section className="about-alumni py-5 bg-light">
  <div className="container">
    <h2 className="text-center  mb-4 text-primary fw-bold">About Our Alumni</h2>
    <div className="row justify-content-center">
      <div className="col-md-10">
       <div
  className="card shadow border-0 rounded-4 p-4"
  style={{ backgroundColor: "#008080" }} // a light sky blue
>

          <p className="fs-5 text-white" style={{ lineHeight: '1.8' }}>
            The alumni network of <strong>Pabna University of Science and Technology (PUST)</strong> is a growing community of bright minds who have shaped their future through the <strong>Information and Communication Engineering (ICE)</strong> department. Over the past decade, nearly ten batches of students have successfully completed their studies here, building a strong foundation in modern computing and information systems.
          </p>
          <p className="fs-5 text-white" style={{ lineHeight: '1.8' }}>
            Our department has proudly organized one grand alumni event, bringing together former and current students, faculty, and professionals to celebrate achievements, foster collaboration, and inspire the next generation. We believe in strengthening bonds and creating opportunities through our alumni — a bridge between past and future.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* User Cards by Role */}
      <div className="container my-5">
        {loadingUsers ? (
          <div className="text-center">Loading users...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          <>
            {/* Admins */}
            <h3 className="text-center text-primary mb-4">Our Admins</h3>
            <div className="d-flex flex-wrap justify-content-center">
              {users.filter((u) => u.role === 1).length > 0 ? (
                users.filter((u) => u.role === 1).map((admin) => renderUserCard(admin))
              ) : (
                <p className="text-center">No Admins found.</p>
              )}
            </div>

            {/* Sirs */}
            <h3 className="text-center text-success mt-5 mb-4">Our Sirs</h3>
            <div className="d-flex flex-wrap justify-content-center">
              {users.filter((u) => u.role === 2).length > 0 ? (
                users.filter((u) => u.role === 2).map((sir) => renderUserCard(sir))
              ) : (
                <p className="text-center">No Sirs found.</p>
              )}
            </div>
            {/* advisor */}
            <h3 className="text-center text-success mt-5 mb-4">advisor</h3>
            <div className="d-flex flex-wrap justify-content-center">
              {users.filter((u) => u.role === 3).length > 0 ? (
                users.filter((u) => u.role === 3).map((sir) => renderUserCard(sir))
              ) : (
                <p className="text-center">No Sirs found.</p>
              )}
            </div>
            {/* presedent */}
            <h3 className="text-center text-success mt-5 mb-4">presedent</h3>
            <div className="d-flex flex-wrap justify-content-center">
              {users.filter((u) => u.role === 5).length > 0 ? (
                users.filter((u) => u.role === 5).map((sir) => renderUserCard(sir))
              ) : (
                <p className="text-center">No Sirs found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
