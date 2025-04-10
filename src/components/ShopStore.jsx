import React from 'react';
import '../componentStyles/ShopStore.css';
import phoneImg from '../assets/image.png';
import laptopImg from '../assets/laptop.png';
import tabletImg from '../assets/image.png';
import { Wrench } from 'lucide-react'; // Make sure Lucide is installed: npm install lucide-react

const products = [
  { title: "Nintendo Switch Console Battery", price: "$39.99", rating: 5, image: phoneImg },
  { title: "Nintendo 3DS XL Battery", price: "$23.99", rating: 5, image: laptopImg },
  { title: "Steam Deck Charger", price: "$24.99", rating: 5, image: tabletImg },
  { title: "Google Pixel 6a Screen - Genuine", price: "$93.99", rating: 5, image: phoneImg },
  { title: "Nintendo Switch Console Battery", price: "$39.99", rating: 5, image: phoneImg },
  { title: "Nintendo 3DS XL Battery", price: "$23.99", rating: 5, image: laptopImg },
  { title: "Steam Deck Charger", price: "$24.99", rating: 5, image: tabletImg },
  { title: "Google Pixel 6a Screen - Genuine", price: "$93.99", rating: 5, image: phoneImg },
  { title: "Nintendo Switch Console Battery", price: "$39.99", rating: 5, image: phoneImg },
  { title: "Nintendo 3DS XL Battery", price: "$23.99", rating: 5, image: laptopImg },
  { title: "Steam Deck Charger", price: "$24.99", rating: 5, image: tabletImg },
  { title: "Google Pixel 6a Screen - Genuine", price: "$93.99", rating: 5, image: phoneImg },
  { title: "Nintendo Switch Console Battery", price: "$39.99", rating: 5, image: phoneImg },
  { title: "Nintendo 3DS XL Battery", price: "$23.99", rating: 5, image: laptopImg },
  { title: "Steam Deck Charger", price: "$24.99", rating: 5, image: tabletImg },
  { title: "Google Pixel 6a Screen - Genuine", price: "$93.99", rating: 5, image: phoneImg },
];

const ShopStore = () => {
  return (
    <div className="all-parts-container">


      {/* Content */}
      <nav className="breadcrumb">
        <span>Store</span> &gt; <strong>All Parts</strong>
      </nav>

      <h1 className="title">All Parts</h1>
      <p className="subtitle">Quality ensured replacement parts for DIY repair</p>
      <p className="description">
        iFixit provides parts, tools, and free repair guides so that you can repair with confidence! All of our replacement parts are tested to meet rigorous quality standards and are backed by our industry-leading guarantee.
      </p>

      <div className="category-grid">
  {["Mobile", "Laptop", "Tablet", "Mobile Software", "Laptop Software", "Tablet Software", "Screens", "Batteries", "Chargers", "Motherboards"].map((category, idx) => (
    <div key={idx} className="category-card">{category} Parts</div>
  ))}
</div>

<div className="filter-section">
  <div className="filter-sidebar">
    <h3>Item Type</h3>
    {["Screens", "Batteries", "Chargers", "Motherboards", "Keyboards", "Touchpads", "Display Cables", "Fans", "USB Ports", "Operating Systems"].map((item, idx) => (
      <p key={idx} className="filter-item">{item}</p>
    ))}
  </div>


        <div className="product-grid">
          {products.map((product, idx) => (
            <div key={idx} className="product-card">
              <img className="product-image" src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>⭐ {product.rating} | {product.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="buying-guide">
        <h2>iFixit Buying Guide</h2>
        <details>
          <summary>How can I be sure that iFixit parts are reliable?</summary>
          <p>
            Your repair experience is not going to be easy or enjoyable if you receive a part that doesn’t work. We ensure that our products are fully tested and verified before shipment...
          </p>
        </details>
        <details>
          <summary>What tools are required for my repair?</summary>
          <p>Each product page lists the recommended tools. We also offer toolkits.</p>
        </details>
      </div>

      <div className="quality-guarantee">
        <div className="guarantee-text">
          <h3>Quality Guaranteed</h3>
          <p>We’ve spent more than a decade vetting sources and suppliers, and all of our parts and tools are backed by our quality guarantee.</p>
          <button>Learn More</button>
        </div>
      </div>

     
    </div>
  );
};

export default ShopStore;
