import React from 'react';
import { Link } from 'react-router-dom'; // ✅ React Router Link
import '../componentStyles/GuideRepair.css';

import phoneImg from '../assets/image.png';
import laptopImg from '../assets/laptop.png';
import tabletImg from '../assets/image.png';

const categoriesTop = [
  { name: 'Mac', path: '/repair/mac' },
  { name: 'Phone', path: '/repair/phone' },
  { name: 'Tablet', path: '/repair/tablet' },
  { name: 'PC Laptop', path: '/repair/pclaptop' }
];

const switchIssues = [
  { title: "Nintendo Switch Blue Screen of Death", image: phoneImg },
  { title: "Nintendo Switch Won't Turn On", image: laptopImg },
  { title: "Nintendo Switch Black Screen", image: tabletImg },
  { title: "Nintendo Switch Not Charging", image: phoneImg },
  { title: "Nintendo Switch Battery Draining Fast", image: laptopImg },
  { title: "Nintendo Switch No Video Out", image: tabletImg },
  { title: "Nintendo Switch Joy-Con Drift", image: phoneImg },
  { title: "Switch Pro Controller Joystick Drift", image: laptopImg }
];

const GuideRepair = () => {
  return (
    <div className="repair-guides-container">
      <h1 className="main-title">Repair Guides</h1>

      <div className="banner-buttons">
        <button className="learn-more">Learn More</button>
        <button className="create-guide">Create a Guide</button>
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
