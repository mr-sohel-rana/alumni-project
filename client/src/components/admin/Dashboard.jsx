import React from 'react';
import Layout from '../layout/Layout';
import AdminMenu from './AdminMenu'; // Ensure correct import
import {useAuth} from "../../context/auth.jsx"

const Dashboard = () => {
    const [auth]=useAuth();
  return (
    <Layout> 
      <div className="row">
        <div className="col-md-4">
          <AdminMenu /> {/* Corrected component usage */}
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
 
   
    </Layout>
  );
};

export default Dashboard;
