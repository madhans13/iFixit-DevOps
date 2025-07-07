import React from 'react';
import '../componentStyles/HomePage.css';
import {
  Rss,
  Wrench,
  ShoppingCart,
  User,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MessageCircle,
  Music,
  Video,
  Search
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import image from '../assets/image.png';
import logo from '../assets/react.svg';
import laptop from '../assets/laptop.png';
import community from '../assets/community.png';
import heroImage from '../assets/repair.jpg';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* --- Top Header --- */}
      
      {/* --- Blue Banner --- */}
      <div className="shipping-banner">
        Welcome to world of repair!
      </div>

      {/* --- Hero Section --- */}
      <main className="hero-section">
        <div className="hero-content">
          <h1>Explore a World of Repair</h1>
          <SearchBar />
          <div className="separator">or</div>
          <button 
            className="find-device-button"
            onClick={() => navigate('/fix-your-stuff')}
          >
            <Wrench size={16} className="button-icon" />
            Find Your Device
          </button>
        </div>
      </main>

      {/* --- Info Section --- */}
      <section className="info-section">
        <h2>Never take broken for an answer</h2>
        <p>Get the instructions you need with quality repair parts and tools and the expertise of a robust community.</p>
      </section>

      {/* --- Featured Section --- */}
      <section className="featured-info-section">
        <div className="featured-cards-container">
          <div className="featured-card">
            <img src={image} alt="Step-by-Step Guides" />
            <h3>Step-by-Step Guides</h3>
            <p>Learn how to fix anything with simple, easy-to-follow instructions created by real fixers.</p>
            <button className="featured-button" onClick={() => navigate('/guide')}>
              Find a Guide
            </button>
          </div>
          <div className="featured-card">
            <img src={laptop} alt="Quality Parts and Tools" />
            <h3>Quality Parts and Tools</h3>
            <p>Precision tools and thousands of parts to get the job done, backed by our Lifetime Guarantee.</p>
            <button className="featured-button" onClick={() => navigate('/store')}>
              Shop our Store
            </button>
          </div>
          <div className="featured-card">
            <img src={community} alt="A Community of Fixers" />
            <h3>A Community of Fixers</h3>
            <p>No one knows how to fix everything, but everyone knows how to fix something.</p>
            <button className="featured-button" onClick={() => navigate('/community')}>
              Fix the World
            </button>
          </div>
        </div>
        <div className="stats-container">
          <div className="stat">
            <span className="stat-number">117,710</span>
            <span className="stat-label">Free manuals</span>
          </div>
          <div className="stat">
            <span className="stat-number">229,363</span>
            <span className="stat-label">Solutions</span>
          </div>
          <div className="stat">
            <span className="stat-number">64,975</span>
            <span className="stat-label">Devices</span>
          </div>
          <div className="stat">
            <span className="stat-number">100M+</span>
            <span className="stat-label">Repairs</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
