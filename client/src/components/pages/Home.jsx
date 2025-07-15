 import { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';

// 🔑 Shared role map — keep in sync with StudentList & Association
export const ROLES = [
  { id: 0, label: 'Student' },
  { id: 1, label: 'Advisory Panel' },
  { id: 2, label: 'President' },
  { id: 3, label: 'Vice‑President' },
  { id: 4, label: 'General Secretary' },
  { id: 5, label: 'Joint General Secretary' },
  { id: 6, label: 'Organizing Secretary' },
  { id: 7, label: 'Office Secretary' },
  { id: 8, label: 'Publicity Secretary' },
  { id: 9, label: 'Executive Members' },
];

const Home = () => {
  // ───────────────────────────── state ─────────────────────────────
  const [carousel, setCarousel] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingCarousel, setLoadingCarousel] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);

  // ───────────────────────────── data fetch ────────────────────────
  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/v1/allimage');
        setCarousel(data.result || []);
      } catch (err) {
        console.error('Error fetching carousel data', err);
        setError('Failed to load carousel images');
      } finally {
        setLoadingCarousel(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/v1/read');
        setUsers(data.data || []);
      } catch (err) {
        console.error('Error fetching users', err);
        setError('Failed to load users');
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchCarousel();
    fetchUsers();
  }, []);

  // ───────────────────────────── helpers ───────────────────────────
  const roleLabel = (roleId) => ROLES.find((r) => r.id === roleId)?.label || 'Other';

  const renderUserCard = (user) => (
    <div key={user._id} className="card shadow m-3" style={{ width: '25rem', borderRadius: '0.5rem' }}>
      <img
        src={user.image ? `http://localhost:5000/uploads/${user.image}` : 'https://via.placeholder.com/300'}
        className="card-img-top"
        alt={user.name}
        style={{ height: '300px', objectFit: 'cover', borderRadius: '0.5rem 0.5rem 0 0' }}
      />
      <div className="card-body d-flex flex-column align-items-center text-center">
        <p className="card-text mb-1">
          <strong>Role:</strong> {roleLabel(user.role)}
        </p>
        <p className="card-text mb-3">
          <strong>Profession:</strong> {user.profession || 'N/A'}
        </p>
        <h5
          className="card-title w-100 py-2"
          style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '0 0 0.5rem 0.5rem' }}
        >
          {user.name}
        </h5>
      </div>
    </div>
  );

  const renderSection = ({ id, label }, colorClass) => {
    const members = users.filter((u) => u.role === id);

    return (
      <section key={id} className="my-5">
        <h3 className={`text-center ${colorClass} mb-4`}>{label}</h3>
        <div className="d-flex flex-wrap justify-content-center">
          {members.length > 0 ? members.map(renderUserCard) : <p className="text-center">No {label} found.</p>}
        </div>
      </section>
    );
  };

  // ───────────────────────────── render ────────────────────────────
  return (
    <Layout>
      {/* ─────────────── Carousel ─────────────── */}
      <div id="carouselExampleInterval" className="container carousel slide my-4" data-bs-ride="carousel">
        <div className="carousel-inner">
          {loadingCarousel ? (
            <div className="text-center py-5">Loading carousel...</div>
          ) : carousel.length ? (
            carousel.map((img, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={img._id} data-bs-interval={3000}>
                <img
                  src={`http://localhost:5000/uploads/${img.image}`}
                  className="d-block w-100"
                  alt="Carousel"
                  style={{ objectFit: 'cover', maxHeight: '400px' }}
                />
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <img src="https://via.placeholder.com/800x400" className="d-block w-100" alt="Placeholder" />
              <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                <h3 className="text-primary">No Images Available</h3>
              </div>
            </div>
          )}
        </div>
        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* ─────────────── About Alumni ─────────────── */}
      <section className="about-alumni py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4 text-primary fw-bold">About Our Alumni</h2>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card shadow border-0 rounded-4 p-4" style={{ backgroundColor: '#008080' }}>
                <p className="fs-5 text-white" style={{ lineHeight: '1.8' }}>
                  The alumni network of <strong>Pabna University of Science and Technology (PUST)</strong> is a growing
                  community of bright minds who have shaped their future through the <strong>Information and Communication Engineering (ICE)</strong> department.
                </p>
                <p className="fs-5 text-white" style={{ lineHeight: '1.8' }}>
                  Our department has proudly hosted grand alumni events, bringing together former and current students, faculty, and professionals to celebrate achievements, foster collaboration, and inspire the next generation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Members by Role ─────────────── */}
      <div className="container my-5">
        {loadingUsers ? (
          <div className="text-center">Loading users...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          ROLES.slice(1).map((role) => renderSection(role, role.id === 1 ? 'text-primary' : 'text-success'))
        )}
      </div>
    </Layout>
  );
};

export default Home;
