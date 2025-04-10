// components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  User
} from 'lucide-react';
import logo from '../assets/react.svg';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <Link to="/"><img src={logo} alt="Logo" /></Link>
          </div>
          <nav className="main-nav">
            <ul>
              <li><Link to="/fix-your-stuff">Fix Your Stuff</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/store">Store</Link></li>
            </ul>
          </nav>
          <div className="currency-selector">
            <span>USD</span><span className="dropdown-arrow">▼</span>
          </div>
        </div>
        <div className="header-right">
          <div className="search-bar-header">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search" />
          </div>
          <div className="header-icons">
            <Link to="/cart"><ShoppingCart size={18} /></Link>
            <Link to="/account"><User size={18} /></Link>
          </div>
          <div className="language-selector">
            <span>EN</span><span className="dropdown-arrow">▼</span>
          </div>
          <div className="auth-links">
            <Link to="/join">Join</Link>
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
