import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../componentStyles/Laptop.css';
import acer from '../assets/acer.png';
import asus from '../assets/asus.png';
import aorus from '../assets/msi.png';
import advent from '../assets/hp.png';

const brands = [
  { name: 'Asus', logo: asus, link: '/repair/pclaptop/asus' },
  { name: 'Acer', logo: acer, link: '/repair/pclaptop/acer' },
  { name: 'HP', logo: advent, link: '/repair/pclaptop/hp' },
];

const Laptop = () => {
  const navigate = useNavigate();

  const handleCreateGuideClick = () => {
    navigate('/create-guide');
  };

  return (
    <div className="laptop-repair-container">
      <div className="breadcrumb">Device &gt; PC &gt; Laptop</div>

      <h1 className="laptop-title">PC Laptop Repair</h1>
      <p className="laptop-description">
        Repair guides and disassembly information for PC laptops of all shapes, sizes, and colors.
      </p>
      <p className="author">
        Author: <a href="#">David Hodson</a> (and 18 other contributors)
      </p>

      <button className="create-guide-btn" onClick={handleCreateGuideClick}>
        + Create a Guide
      </button>

      <h2 className="category-count">55 Categories</h2>

      <div className="brand-grid">
        {brands.map((brand, idx) => (
          <Link to={brand.link} key={idx} className="brand-card">
            <img src={brand.logo} alt={brand.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Laptop;
