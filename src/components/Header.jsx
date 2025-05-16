// components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  Settings,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import SearchResults from './SearchResults';
import logo from '../assets/react.svg';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery) {
        setResults(null);
        return;
      }

      setIsLoading(true);
      try {
        const [guidesResponse, productsResponse] = await Promise.all([
          api.getGuides({ search: debouncedQuery }),
          api.getProducts({ search: debouncedQuery })
        ]);

        setResults({
          guides: guidesResponse,
          products: productsResponse
        });
      } catch (error) {
        console.error('Search failed:', error);
        setResults(null);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

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
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => {
                  setSearchQuery('');
                  setResults(null);
                  setShowResults(false);
                }}
              >
                <X size={16} />
              </button>
            )}
            {showResults && (searchQuery || results) && (
              <div className="header-search-results">
                <SearchResults results={results} isLoading={isLoading} />
                <button 
                  className="close-results"
                  onClick={() => setShowResults(false)}
                >
                  Close
                </button>
              </div>
            )}
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
