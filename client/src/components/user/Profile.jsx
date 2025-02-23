import React from 'react';
import Layout from '../layout/Layout';
import UserMenu from './UserMenu';
import { useAuth } from '../../context/auth';

const Profile = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          {/* User Menu Section */}
          <div className="col-md-4">
            <UserMenu />
          </div>

          {/* Profile Details Section */}
          <div className="col-md-8">
            {auth?.user ? (
              <div className="card shadow-lg p-4">
                <div className="text-center mb-4">
                  <h3 className="mb-3 text-primary">{auth.user.name}'s Profile</h3>
                  {/* Profile Image */}
                  {auth.user.image && (
                    <img
                      src={`http://localhost:5000/uploads/${auth.user.image}`}
                      alt="Profile"
                      className="img-fluid rounded-circle border border-3 border-primary shadow-sm"
                      width="150"
                    />
                  )}
                </div>

                <table className="table table-bordered">
                  <tbody>
                    {/* Email */}
                    <tr>
                      <th scope="row">Email</th>
                      <td>{auth.user.email}</td>
                    </tr>
                    {/* Phone */}
                    <tr>
                      <th scope="row">Phone</th>
                      <td>{auth.user.phone || 'N/A'}</td>
                    </tr>
                    {/* Batch */}
                    <tr>
                      <th scope="row">Batch</th>
                      <td>{auth.user.batch || 'N/A'} batch</td>
                    </tr>
                    {/* Session */}
                    <tr>
                      <th scope="row">Session</th>
                      <td>{auth.user.session || 'N/A'}</td>
                    </tr>
                    {/* Profession */}
                    <tr>
                      <th scope="row">Profession</th>
                      <td>{auth.user.profession || 'N/A'}</td>
                    </tr>
                    {/* Institution */}
                    <tr>
                      <th scope="row">Institution</th>
                      <td>{auth.user.institution || 'N/A'}</td>
                    </tr>
                    {/* District */}
                    <tr>
                      <th scope="row">District</th>
                      <td>{auth.user.district || 'N/A'}</td>
                    </tr>
                    {/* Country */}
                    <tr>
                      <th scope="row">Country</th>
                      <td>{auth.user.county || 'N/A'}</td>
                    </tr>
                    {/* Facebook */}
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>
                        {auth.user.facebook ? (
                          <a href={auth.user.facebook} target="_blank" rel="noopener noreferrer">
                            Facebook Profile
                          </a>
                        ) : 'N/A'}
                      </td>
                    </tr>
                    {/* LinkedIn */}
                    <tr>
                      <th scope="row">LinkedIn</th>
                      <td>
                        {auth.user.linkedin ? (
                          <a href={auth.user.linkedin} target="_blank" rel="noopener noreferrer">
                            LinkedIn Profile
                          </a>
                        ) : 'N/A'}
                      </td>
                    </tr>
                    {/* Bio */}
                    <tr>
                      <th scope="row">Bio</th>
                      <td>{auth.user.bio || 'No bio available'}</td>
                    </tr>
                    <tr>
                      <th scope="row">Bio</th>
                      <td>{auth.user.paper || 'No bio available'}</td>
                    </tr>
                    {/* Role */}
                    <tr>
                      <th scope="row">Role</th>
                      <td>{auth?.user?.role === 1 ? 'Admin' : 'User'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="alert alert-warning text-center">
                <p>Please log in to view your profile.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
