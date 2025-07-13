 import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';

// Association page that lists members by their roles
const Association = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the backend
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

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Convert numeric role to a readable label.
   * 1 → Admin
   * 2 → Sir
   * 3 → Advisor
   * 5 → President
   */
  const roleLabel = (role) => {
    switch (role) {
      case 1:
        return 'Admin';
      case 2:
        return 'Sir';
      case 3:
        return 'Advisor';
      case 5:
        return 'President';
      default:
        return 'Other';
    }
  };

  /**
   * Render an individual user card.
   */
  const renderUserCard = (user) => (
    <div
      key={user._id}
      className="card shadow m-3"
      style={{ width: '25rem', borderRadius: '0.5rem' }}
    >
      <img
        src={
          user.image
            ? `http://localhost:5000/uploads/${user.image}`
            : 'https://via.placeholder.com/300x300?text=No+Image'
        }
        className="card-img-top"
        alt={user.name}
        style={{ height: '300px', objectFit: 'cover', borderRadius: '0.5rem 0.5rem 0 0' }}
      />
      <div className="card-body d-flex flex-column align-items-center" style={{ textAlign: 'center' }}>
        <p className="card-text mb-1">
          <strong>Role:</strong> {roleLabel(user.role)}
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

  /**
   * Render a section for a specific role.
   */
  const renderSection = (title, role, colorClass) => (
    <section key={role} className="mb-5">
      <h3 className={`text-center ${colorClass} mb-4`}>{title}</h3>
      <div className="d-flex flex-wrap justify-content-center">
        {users.filter((u) => u.role === role).length > 0 ? (
          users
            .filter((u) => u.role === role)
            .map((user) => renderUserCard(user))
        ) : (
          <p className="text-center">No {title} found.</p>
        )}
      </div>
    </section>
  );

  return (
    <Layout>
       <section
  style={{
    backgroundImage: "url('https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textShadow: '1px 1px 6px rgba(0,0,0,0.8)',
  }}
>
  <h1 className="display-4  text-center">Our Association Members</h1>
</section>

      <div className="container my-5">
        {loadingUsers ? (
          <div className="text-center">Loading users...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          <>
            {renderSection('Our Admins', 1, 'text-primary')}
            {renderSection('Our Sirs', 2, 'text-success')}
            {renderSection('Advisors', 3, 'text-success')}
            {renderSection('President', 5, 'text-success')}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Association;
