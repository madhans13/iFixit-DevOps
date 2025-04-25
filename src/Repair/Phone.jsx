import React from 'react';
//import '../componentStyles/phone.css';
import { Link } from 'react-router-dom';
//import apple from '../assets/apple.png';
import sam from '../assets/samsung.svg';
import one from '../assets/oneplus.svg';
import realme from '../assets/realme.svg';
const brands = [
  { name: 'OnePlus', logo: one, link: '/repair/phone/oneplus' },
  { name: 'Realme', logo: realme, link: '/repair/phone/realme' },
  { name: 'Samsung', logo: sam, link: '/repair/phone/samsung' },
];

const Laptop = () => {
  return (
    <div className="laptop-repair-container">
      <div className="breadcrumb">Device &gt; Phone &gt; </div>

      <h1 className="laptop-title">Phone Repair</h1>
      <p className="laptop-description">
        Repair guides and disassembly information for Phones of all shapes, sizes, and colors.
      </p>
      <p className="author">Author: <a href="#">David Hodson</a> (and 18 other contributors)</p>

      <button className="create-guide-btn">+ Create a Guide</button>

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
