import React from 'react';
import './asus.css';
import { useNavigate } from 'react-router-dom';
import asusLogo from '../../assets/asus.png';
import asus1015e from '../../assets/asus_tuf.jpg';
import asusA from '../../assets/asus_tuf.jpg';
import asusB from '../../assets/asus_tuf.jpg';
import asusD from '../../assets/asus_tuf.jpg';

const categories = [
  { title: 'Asus Tuf Series', image: asus1015e, path: '/repair/pclaptop/asus/tuf-dash-f15' },
  { title: 'Asus Tuf A Series', image: asusA, path: '/repair/pclaptop/asus/tuf-dash-f15' },
  { title: 'Asus Tuf gaming B Series', image: asusB, path: '/repair/pclaptop/asus/tuf-dash-f15' },
  { title: 'Asus Tuf D Series', image: asusD, path: '/repair/pclaptop/asus/tuf-dash-f15' },
];

const AsusPage = () => {
  const navigate = useNavigate();

  const handleCreateGuideClick = () => {
    navigate('/create-guide');
  };

  return (
    <div className="brand-page-container">
      

      <main className="content">
        <div className="brand-header">
          <img src={asusLogo} alt="Asus" className="brand-logo" />
          <div>
            <h1>Asus Laptop Repair</h1>
            <p>Repair guides and disassembly information for laptops manufactured by ASUS.</p>
            <p>
              Author: <a href="#">Walter Galan</a> (and 9 other contributors)
            </p>
            <button className="create-guide-btn" onClick={handleCreateGuideClick}>
              + Create a Guide
            </button>
          </div>
        </div>

        <h2>36 Categories</h2>
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

export default AsusPage;
