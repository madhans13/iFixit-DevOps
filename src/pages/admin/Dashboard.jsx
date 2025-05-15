import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-welcome">
        <h2>Welcome, {user?.username}!</h2>
        <p>You have full administrative access to the platform.</p>
      </div>
      
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Guides</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">1</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">0</p>
        </div>
      </div>

      <div className="admin-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <Link to="/admin/guides/create" className="admin-button">
            Create New Guide
          </Link>
          <Link to="/admin/products/create" className="admin-button">
            Add New Product
          </Link>
          <Link to="/admin/users" className="admin-button">
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 