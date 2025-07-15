 import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';

// 🔑 Single‑source role map (keep in sync with StudentList)
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

/**
 * Association page — shows members grouped by their role.
 */
const Association = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ───────────────────────────── fetch users ─────────────────────────────
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/v1/read');
        setUsers(data.data || []);
      } catch (err) {
        console.error('Error fetching users', err);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ───────────────────────────── helpers ────────────────────────────────
  const roleLabel = (role) => ROLES.find((r) => r.id === role)?.label || 'Other';

  /** Render a single user card */
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

  /** Render all members for a given role id */
  const renderSection = (title, roleId, colorClass) => {
    const members = users.filter((u) => u.role === roleId);

    return (
      <section key={roleId} className="mb-5">
        <h3 className={`text-center ${colorClass} mb-4`}>{title}</h3>
        <div className="d-flex flex-wrap justify-content-center">
          {members.length > 0 ? (
            members.map(renderUserCard)
          ) : (
            <p className="text-center">No {title} found.</p>
          )}
        </div>
      </section>
    );
  };

  // ───────────────────────────── render ────────────────────────────────
  return (
    <Layout>
      {/* Hero banner */}
      <section
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg')",
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
        <h1 className="display-4 text-center">Our Association Members</h1>
      </section>

      {/* Sections */}
      <div className="container my-5">
        {loading ? (
          <div className="text-center">Loading users...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          ROLES.slice(1) // skip Student
            .map(({ id, label }) =>
              renderSection(label, id, id === 1 ? 'text-primary' : 'text-success')
            )
        )}
      </div>
    </Layout>
  );
};

export default Association;