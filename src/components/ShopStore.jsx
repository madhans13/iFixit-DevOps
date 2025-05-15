import React from 'react';
import '../componentStyles/ShopStore.css';
import phoneImg from '../assets/one9.png';
import laptopImg from '../assets/asus_tuf.jpg';
import batteryImg from '../assets/battery.jpg';
import ssdImg from '../assets/ssd.jpg';
import hpImg from '../assets/hp.png';
import asusTufImg from '../assets/asus_tuf.jpg';
import { Wrench } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const products = [
  { 
    title: "Asus TUF Dash F15 Battery", 
    price: "$49.99", 
    rating: 5, 
    image: batteryImg,
    category: "laptop-parts"
  },
  { 
    title: "HP Pavilion Keyboard", 
    price: "$29.99", 
    rating: 4, 
    image: hpImg,
    category: "laptop-parts"
  },
  { 
    title: "OnePlus 9 Screen - Genuine", 
    price: "$119.99", 
    rating: 5, 
    image: phoneImg,
    category: "phone-parts"
  },
  { 
    title: "Samsung Galaxy Battery", 
    price: "$39.99", 
    rating: 4, 
    image: batteryImg,
    category: "phone-parts"
  },
  { 
    title: "Dell Inspiron Motherboard", 
    price: "$149.99", 
    rating: 5, 
    image: ssdImg,
    category: "laptop-parts"
  },
  { 
    title: "iPhone Charger - MFi Certified", 
    price: "$19.99", 
    rating: 5, 
    image: phoneImg,
    category: "phone-parts"
  },
  { 
    title: "Lenovo Legion Fan", 
    price: "$34.99", 
    rating: 4, 
    image: asusTufImg,
    category: "laptop-parts"
  },
  { 
    title: "Redmi Note Display Cable", 
    price: "$14.99", 
    rating: 4, 
    image: phoneImg,
    category: "phone-parts"
  },
];

const categories = [
  { name: "Phone Parts", path: "/store/phone-parts" },
  { name: "Laptop Parts", path: "/store/laptop-parts" },
  { name: "Phone Software", path: "/store/phone-software" },
  { name: "Laptop Software", path: "/store/laptop-software" },
  { name: "Screens", path: "/store/screens" },
  { name: "Batteries", path: "/store/batteries" },
  { name: "Chargers", path: "/store/chargers" },
  { name: "Keyboards", path: "/store/keyboards" },
  { name: "Motherboards", path: "/store/motherboards" },
  { name: "Cooling Fans", path: "/store/cooling-fans" }
];

const filterItems = [
  "Screens",
  "Batteries",
  "Chargers",
  "Motherboards",
  "Keyboards",
  "Touchpads",
  "Display Cables",
  "Fans",
  "USB Ports",
  "Operating Systems"
];

const ShopStore = () => {
  const { category, product } = useParams();
  
  // Filter products based on category
  const filteredProducts = category 
    ? products.filter(p => p.category === category || p.title.toLowerCase().includes(category.replace(/-/g, ' ')))
    : products;

  // If a specific product is selected
  if (product) {
    const selectedProduct = products.find(p => 
      p.title.toLowerCase().replace(/\s+/g, '-') === product
    );

    if (selectedProduct) {
      return (
        <div className="product-detail-container">
          <div className="product-detail">
            <img src={selectedProduct.image} alt={selectedProduct.title} className="product-detail-image" />
            <div className="product-detail-info">
              <h1>{selectedProduct.title}</h1>
              <p className="price">{selectedProduct.price}</p>
              <p className="rating">Rating: {'⭐'.repeat(selectedProduct.rating)}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="all-parts-container">
      <h1 className="title">
        {category 
          ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
          : 'All Parts for Phones & Laptops'
        }
      </h1>
      <p className="subtitle">High-quality, tested replacement parts for your repairs</p>
      <p className="description">
        We offer a wide selection of parts for smartphones and laptops, from screens to motherboards. All items are tested, reliable, and backed by our quality guarantee to help you repair with confidence.
      </p>

      <div className="category-grid">
        {categories.map((cat, idx) => (
          <Link 
            to={cat.path} 
            key={idx} 
            className={`category-card ${cat.path.includes(category) ? 'active' : ''}`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="filter-section">
        <div className="filter-sidebar">
          <h3>Item Type</h3>
          {filterItems.map((item, idx) => (
            <Link 
              to={`/store/${item.toLowerCase().replace(/\s+/g, '-')}`} 
              key={idx} 
              className={`filter-item ${category === item.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''}`}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product, idx) => (
            <Link 
              to={`/store/${product.category}/${product.title.toLowerCase().replace(/\s+/g, '-')}`} 
              key={idx} 
              className="product-card"
            >
              <img className="product-image" src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>⭐ {product.rating} | {product.price}</p>
            </Link>
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
