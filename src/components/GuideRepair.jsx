import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../componentStyles/GuideRepair.css';

import phoneImg from '../assets/one9.png';
import laptopImg from '../assets/asus_tuf.jpg';
import switchImg from '../assets/tools1.png';
import controllerImg from '../assets/tools2.png';
import batteryImg from '../assets/battery.jpg';
import screenImg from '../assets/screen.png';

const categoriesTop = [
  { name: 'Phone', path: '/repair/phone' },
  { name: 'PC Laptop', path: '/repair/pclaptop' }
];

const switchIssues = [
  { 
    title: "Nintendo Switch Blue Screen of Death", 
    image: screenImg 
  },
  { 
    title: "Nintendo Switch Won't Turn On", 
    image: switchImg 
  },
  { 
    title: "Nintendo Switch Black Screen", 
    image: screenImg 
  },
  { 
    title: "Nintendo Switch Not Charging", 
    image: batteryImg 
  },
  { 
    title: "Nintendo Switch Battery Draining Fast", 
    image: batteryImg 
  },
  { 
    title: "Nintendo Switch No Video Out", 
    image: controllerImg 
  },
  { 
    title: "Nintendo Switch Joy-Con Drift", 
    image: controllerImg 
  },
  { 
    title: "Switch Pro Controller Joystick Drift", 
    image: controllerImg 
  }
];

const GuideRepair = () => {
  const navigate = useNavigate();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/guides');
        setGuides(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching guides:', err);
        setError('Failed to load guides');
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  return (
    <div className="repair-guides-container">
      <h1 className="main-title">Repair Guides</h1>

      <div className="banner-buttons">
        <button className="learn-more">Learn More</button>
        <button className="create-guide" onClick={() => navigate('/create-guide')}>
          Create a Guide
        </button>
      </div>

      {/* User Created Guides Section */}
      <div className="user-guides-section">
        <h2 className="section-title">Recently Created Guides</h2>
        {loading ? (
          <div className="loading">Loading guides...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : guides.length > 0 ? (
          <div className="guides-grid">
            {guides.map((guide) => (
              <div key={guide._id} className="guide-card" onClick={() => navigate(`/guides/${guide._id}`)}>
                {guide.steps[0]?.images[0] ? (
                  <div className="guide-image">
                    <img 
                      src={`http://localhost:5000/uploads/${guide.steps[0].images[0].url}`} 
                      alt={guide.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = batteryImg; // Fallback to a default image
                      }}
                    />
                  </div>
                ) : (
                  <div className="guide-image">
                    <img src={batteryImg} alt={guide.title} />
                  </div>
                )}
                <div className="guide-info">
                  <h3>{guide.title}</h3>
                  <p className="guide-author">By {guide.author?.username}</p>
                  <div className="guide-metadata">
                    <span>{guide.timeRequired?.value} {guide.timeRequired?.unit}</span>
                    <span>•</span>
                    <span>Difficulty: {guide.difficulty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-guides">
            <p>No guides found. Be the first to create a guide!</p>
            <button onClick={() => navigate('/create-guide')}>Create Guide</button>
          </div>
        )}
      </div>

      <div className="banner">
        <img src="src/assets/banner.avif" alt="Repair Banner" className="banner-image" />
        <div className="banner-text">
          <h2>First time repairing?</h2>
          <p>Learn to fix just about anything.</p>
          <strong className="you">You got this.</strong>
        </div>
      </div>

      <hr className="divider" />

      <h3 className="sub-heading">What do you need to fix?</h3>
      <div className="category-grid-top">
        {categoriesTop.map((cat, idx) => (
          <Link to={cat.path} key={idx} className="category-card-top">
            {cat.name}
          </Link>
        ))}
      </div>

      <hr className="divider" />

      <h3 className="sub-heading">Thousands more step-by-step guides for everything</h3>
      <div className="switch-savers-section">
        <div className="switch-savers-header">
          <h2>Nintendo Switch Savers: Manuals to Keep Your Console Running</h2>
          <a href="#" className="view-all">View All &gt;</a>
        </div>
        <div className="switch-savers-grid">
          {switchIssues.map((item, idx) => (
            <div className="issue-card" key={idx}>
              <img src={item.image} alt={item.title} />
              <div className="issue-title">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideRepair;
