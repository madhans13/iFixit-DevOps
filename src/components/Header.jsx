// components/Header.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/react.svg';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Current user in Header:', user);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayName = user?.username || user?.email?.split('@')[0] || 'User';

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src={logo} alt="iFixit" />
          </Link>
          <nav className="main-nav">
            <ul>
              <li><Link to="/fix-your-stuff">Fix Your Stuff</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/store">Store</Link></li>
              {user?.role === 'admin' && (
                <>
                  <li><Link to="/admin/guides">Manage Guides</Link></li>
                  <li><Link to="/admin/users">Manage Users</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
        
        <div className="header-right">
          <div className="search-bar-header">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search" />
          </div>
          
          <div className="header-icons">
            <Link to="/cart" className="cart-icon">
              <ShoppingCart size={20} />
            </Link>
            {user ? (
              <div className="user-menu">
                <Link to="/account" className="user-profile">
                  {user.role === 'admin' ? (
                    <Settings size={20} className="admin-icon" />
                  ) : (
                    <User size={20} />
                  )}
                  <span className="username">{displayName}</span>
                </Link>
                <button onClick={handleLogout} className="logout-button">
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="header-auth-links">
                <Link to="/join">Join</Link>
                <Link to="/login">Log In</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
