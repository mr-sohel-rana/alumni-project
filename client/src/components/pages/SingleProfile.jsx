 import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../layout/Layout';

const SingleProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/single-user/${id}`);
        setUser(response.data.data);
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div className="text-center text-black py-5">Loading...</div>;
  if (error) return <div className="text-center text-danger py-5">{error}</div>;

  return (
    <Layout>
      <div
        className="container-fluid text-black py-5 min-vh-100"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=903&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container">
          <div className="row">
            {/* Profile Card */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div
                className="card border-0 shadow-sm h-100 text-black"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              >
                <img
                  src={`http://localhost:5000/uploads/${user.image}`}
                  alt={user.name}
                  className="card-img-top rounded-circle mx-auto d-block mt-4"
                  style={{ height: '200px', width: '200px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h3 className="card-title" style={{ fontSize: '30px' }}>{user.name}</h3>
                  <p className="card-text" style={{ fontSize: '20px' }}>
                    {user.profession}
                  </p>

                  {/* Social Media Buttons */}
                  <div className="d-flex justify-content-center mt-3">
                    {user.facebook && (
                      <a
                        href={user.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-dark btn-sm me-2"
                      >
                        <i className="fab fa-facebook-f me-1"></i> Facebook
                      </a>
                    )}
                    {user.linkedin && (
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="fab fa-linkedin-in me-1"></i> LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Details Card */}
            <div className="col-lg-8 col-md-6">
              <div
                className="card border-0 shadow-sm p-4 text-black"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              >
                <h2 className="mb-4" style={{ fontSize: '35px' }}>{user.name}&apos;s Profile</h2>

                {[
                   
                  ['Name', user.name],
                  ['Email', user.email],
                  ['Phone', user.phone],
                  ['Profession', user.profession],
                  ['District', user.district],
                  ['Blood Group', user.blood || 'N/A'],
                ].map(([label, value], index) => (
                  <div key={index} className="mb-3" style={{ fontSize: '20px' }}>
                    <strong>{label}:</strong> {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProfile;
