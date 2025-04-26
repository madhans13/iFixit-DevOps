import React from 'react';
import '../componentStyles/ShopStore.css';
import phoneImg from '../assets/one9.png';
import laptopImg from '../assets/laptop.png';
import tabletImg from '../assets/image.png';
import { Wrench } from 'lucide-react';

const products = [
  { title: "Asus TUF Dash F15 Battery", price: "$49.99", rating: 5, image: laptopImg },
  { title: "HP Pavilion Keyboard", price: "$29.99", rating: 4, image: laptopImg },
  { title: "OnePlus 9 Screen - Genuine", price: "$119.99", rating: 5, image: phoneImg },
  { title: "Samsung Galaxy Battery", price: "$39.99", rating: 4, image: phoneImg },
  { title: "Dell Inspiron Motherboard", price: "$149.99", rating: 5, image: laptopImg },
  { title: "iPhone Charger - MFi Certified", price: "$19.99", rating: 5, image: phoneImg },
  { title: "Lenovo Legion Fan", price: "$34.99", rating: 4, image: laptopImg },
  { title: "Redmi Note Display Cable", price: "$14.99", rating: 4, image: phoneImg },
];

const ShopStore = () => {
  return (
    <div className="all-parts-container">
      <nav className="breadcrumb">
        <span>Store</span> &gt; <strong>Phone & Laptop Parts</strong>
      </nav>

      <h1 className="title">All Parts for Phones & Laptops</h1>
      <p className="subtitle">High-quality, tested replacement parts for your repairs</p>
      <p className="description">
        We offer a wide selection of parts for smartphones and laptops, from screens to motherboards. All items are tested, reliable, and backed by our quality guarantee to help you repair with confidence.
      </p>

      <div className="category-grid">
        {["Phone Parts", "Laptop Parts", "Phone Software", "Laptop Software", "Screens", "Batteries", "Chargers", "Keyboards", "Motherboards", "Cooling Fans"].map((category, idx) => (
          <div key={idx} className="category-card">{category}</div>
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
        <h2>Repair Buying Guide</h2>
        <details>
          <summary>How do I know the parts will work with my device?</summary>
          <p>Each product listing includes supported models. Double-check your model number before ordering.</p>
        </details>
        <details>
          <summary>Are tools included with these parts?</summary>
          <p>Tools are sold separately unless mentioned. Be sure to add the right toolkit to your cart.</p>
        </details>
      </div>

      <div className="quality-guarantee">
        <div className="guarantee-text">
          <h3>Tested & Trusted Quality</h3>
          <p>All parts are tested for compatibility and durability. We only source from verified suppliers and offer a warranty on each product.</p>
          <button>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default ShopStore;
