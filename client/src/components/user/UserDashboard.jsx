import React from 'react';
import Layout from '../layout/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from './UserMenu';

const UserDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          {/* Left side: User Menu */}
          <div className="col-md-4">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <UserMenu />
              </div>
            </div>
          </div>

          {/* Right side: User's Profile */}
          <div className="col-md-6">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h3 className="card-title mb-4 text-primary">
                  {auth?.user?.name}'s Profile
                </h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Email:</strong> <span>{auth?.user?.email}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Phone:</strong> <span>{auth?.user?.phone}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Institution:</strong> <span>{auth?.user?.institution}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Batch:</strong> <span>{auth?.user?.batch}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
