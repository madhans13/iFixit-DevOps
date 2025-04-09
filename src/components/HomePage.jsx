import React from 'react';
import '../componentStyles/HomePage.css'; // Import the CSS file
import { Rss, Wrench } from 'lucide-react'; // Import the Wrench icon as well
import image from '../assets/image.png'
import laptop from '../assets/laptop.png'
import community from '../assets/community.png'
function HomePage() {
  return (
    <div className="homepage">
      {/* --- Top Header --- */}
      <header className="main-header">
        <div className="header-content">
          <div className="header-left">
            {/* Replace with actual logo */}
            <a href="#" className="logo-link">
              <Wrench size={30} color="#0071CE" /> {/* Using the Wrench icon */}
              {/* You can add text next to the icon if needed */}
              {/* <span className="logo-text">iFixit</span> */}
            </a>
            <nav className="main-nav">
              <ul>
                <li><a href="#">Fix Your Stuff</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Store</a></li>
              </ul>
            </nav>
            <div className="currency-selector">
              <span>USD</span> {/* Simple text, could be a dropdown */}
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>
          <div className="header-right">
            <div className="search-bar-header">
              <span className="search-icon">Q</span> {/* Placeholder icon */}
              <input type="text" placeholder="Search" />
            </div>
            <div className="header-icons">
              {/* Placeholder icons */}
              <a href="#" aria-label="Cart">🛒</a>
              <a href="#" aria-label="Account">👤</a>
            </div>
            <div className="language-selector">
              <span>EN</span> {/* Simple text, could be a dropdown */}
              <span className="dropdown-arrow">▼</span>
            </div>
            <div className="auth-links">
              <a href="#">Join</a>
              <a href="#">Log In</a>
            </div>
          </div>
        </div>
      </header>

      {/* --- Blue Banner --- */}
      <div className="shipping-banner">
        Free Shipping on $75+ in the Contiguous USA
      </div>

      {/* --- Hero Section --- */}
      <main className="hero-section">
        <div className="hero-content">
          <h1>Explore a World of Repair</h1>
          <div className="search-bar-hero">
             <span className="search-icon">Q</span> {/* Placeholder icon */}
             <input type="text" placeholder='Try "Moto G5 Plus screen"' />
          </div>
          <div className="separator">or</div>
          <button className="find-device-button">
            {/* Placeholder icon - replace with actual icon if needed */}
            <span className="button-icon">🛠️</span>
            Find Your Device
          </button>
        </div>
      </main>

      {/* --- Info Section --- */}
      <section className="info-section">
        <h2>Never take broken for an answer</h2>
        <p>Get the instructions you need with quality repair parts and tools and the expertise of a robust community.</p>
      </section>

      {/* --- New Section from the Image --- */}
      <section className="featured-info-section">
        <div className="featured-cards-container">
          <div className="featured-card">
            <img src={image} alt="Step-by-Step Guides" /> {/* Replace with actual image path */}
            <h3>Step-by-Step Guides</h3>
            <p>Learn how to fix anything with simple, easy-to-follow instructions created by real fixers.</p>
            <button className="featured-button">Find a Guide</button>
          </div>
          <div className="featured-card">
            <img src={laptop} alt="Quality Parts and Tools" /> {/* Replace with actual image path */}
            <h3>Quality Parts and Tools</h3>
            <p>Precision tools and thousands of parts to get the job done right, backed by our Lifetime Guarantee.</p>
            <button className="featured-button">Shop our Store</button>
          </div>
          <div className="featured-card">
            <img src={community} alt="A Community of Fixers" /> {/* Replace with actual image path */}
            <h3>A Community of Fixers</h3>
            <p>No one knows how to fix everything, but everyone knows how to fix something.</p>
            <button className="featured-button">Fix the World</button>
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

      {/* --- Footer --- */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>iFixit</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Discuss iFixit</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Newsletter</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Press</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Participate</a></li>
              <li><a href="#">Pro Wholesale</a></li>
              <li><a href="#">Retail Locator</a></li>
              <li><a href="#">For Manufacturers</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Accessibility</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Cookie Consent</a></li>
            </ul>
          </div>
          <div className="footer-section stay-in-loop">
            <h3>Stay in the loop</h3>
            <p>Learn something new every month!</p>
            <div className="subscribe-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </div>
            <label>
              <input type="checkbox" /> Let me read it first!
            </label>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="help-translate">
            <a href="#">Help translate <span aria-label="globe icon">🌐</span></a>
          </div>
          <div className="social-links">
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">f</a>
            <a href="#" aria-label="TikTok" target="_blank" rel="noopener noreferrer">♪</a>
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">X</a>
            <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">t</a>
            <a href="#" aria-label="YouTube" target="_blank" rel="noopener noreferrer">▶</a>
            <a href="#" aria-label="Vimeo" target="_blank" rel="noopener noreferrer">v</a>
            <a href="#" aria-label="Discord" target="_blank" rel="noopener noreferrer">💬</a>
            <a href="#" aria-label="RSS" target="_blank" rel="noopener noreferrer"><Rss size={16} /></a> {/* Using the Rss icon */}
            <a href="#" aria-label="iFixit Community" target="_blank" rel="noopener noreferrer">i</a>
            <a href="#" aria-label="E-mail" target="_blank" rel="noopener noreferrer">@</a>
          </div>
          <div className="ifixit-logo-bottom">
            <a href="#" aria-label="iFixit"><img src="path/to/your/ifixit-logo-bottom.svg" alt="iFixit Logo" /></a>
            <p>Repair is noble</p>
          </div>
          <div className="copyright">
            © 2025 iFixit — Licensed under Creative Commons
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;