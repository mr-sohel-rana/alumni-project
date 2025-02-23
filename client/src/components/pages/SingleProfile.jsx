import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../layout/Layout';

const SingleProfile = () => {
  const { id } = useParams(); // Get the user id from the URL
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="card shadow-sm">
              <img 
                src={`http://localhost:5000/uploads/${user.image}`} 
                alt={user.name} 
                className="card-img-top rounded-circle" 
                style={{ height: '200px', width: '200px', margin: '20px auto' }}
              />
              <div className="card-body text-center">
                <h3 className="card-title">{user.name}</h3>
                <p className="card-text">{user.profession} - {user.batch}</p>
                
                {/* Social Media Links */}
                <div className="d-flex justify-content-center mt-3">
                  {user.facebook && (
                    <a href={user.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm me-2">
                      <i className="fab fa-facebook-f"></i> Facebook
                    </a>
                  )}
                  {user.linkedin && (
                    <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-info btn-sm me-2">
                      <i className="fab fa-linkedin-in"></i> LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-6">
            <div className="card shadow-sm p-4">
              <h2 className="mb-4">{user.name}'s Profile</h2>
              
              <div className="mb-3">
                <strong>Session:</strong> {user.session}
              </div>
              <div className="mb-3">
                <strong>Batch:</strong> {user.batch}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="mb-3">
                <strong>Phone:</strong> {user.phone}
              </div>
              <div className="mb-3">
                <strong>Profession:</strong> {user.profession}
              </div>
              <div className="mb-3">
                <strong>Institution:</strong> {user.institution || 'N/A'}
              </div>
              <div className="mb-3">
                <strong>County:</strong> {user.county || 'N/A'}
              </div>
              <div className="mb-3">
                <strong>District:</strong> {user.district}
              </div>
              <div className="mb-3">
                <strong>Bio:</strong> {user.bio || 'No bio available'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProfile;
