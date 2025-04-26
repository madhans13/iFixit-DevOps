import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/onelogo.png';
import one9 from '../../assets/one9.png';
import one11 from '../../assets/one11.png';
import one12 from '../../assets/one12.jpg';
import onen from '../../assets/onen.png';

const categories = [
  { title: 'OnePlus 9 5G', image: one9, path: '/repair/phone/oneplus/oneplus9' },
  { title: 'OnePlus 11 5G', image: one11, path: '/repair/phone/oneplus/oneplus11' },
  { title: 'OnePlus 12 Dual SIM 5G', image: one12, path: '/repair/phone/oneplus/oneplus12' },
  { title: 'OnePlus 10 Pro 5G', image: onen, path: '/repair/phone/oneplus/oneplus10pro' },
];

const OnePlusPage = () => {
  const navigate = useNavigate();

    const handleCreateGuideClick = () => {
    navigate('/create-guide');
  };

  return (
    <div className="brand-page-container">


      <main className="content">
        <div className="brand-header">
          <img src={logo} alt="OnePlus" className="brand-logo" />
          <div>
            <h1>OnePlus Repair</h1>
            <p>Repair guides and disassembly information for phones manufactured by OnePlus.</p>
            <p>
              Author: <a href="#">Walter Galan</a> (and 9 other contributors)
            </p>
            <button className="create-guide-btn" onClick={handleCreateGuideClick}>+ Create a Guide</button>
          </div>
        </div>

        <h2>{categories.length} Categories</h2>
        <div className="category-grid">
          {categories.map((category, idx) => (
            <div
              className="category-card"
              key={idx}
              onClick={() => navigate(category.path)}
              style={{ cursor: 'pointer' }}
            >
              <img src={category.image} alt={category.title} className="category-image" />
              <p>{category.title}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OnePlusPage;
