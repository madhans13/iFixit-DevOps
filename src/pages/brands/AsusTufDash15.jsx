import React from 'react';
import { Link } from 'react-router-dom';
import './asusTufDash15.css';
import f15Image from '../../assets/asus_tuf.jpg';
import batteryImg from '../../assets/battery.jpg';
import lowercaseImg from '../../assets/lowercase.jpg';
import ssdImg from '../../assets/ssd.jpg';

const AsusTufDash15 = () => {
  return (
    <div className="asus-tuf-dash15-container">
      <div className="header">
        <img src={f15Image} alt="ASUS TUF Dash F15" className="f15-image" />
        <div>
          <h1>ASUS TUF Dash F15 Repair</h1>
          <p>
            Released in 2021, the TUF F15 features an Intel Core i&reg; processor, NVIDIA GeForce RTX graphics, and a 15.6 inch anti-glare display.
          </p>
          <p>
            Author: <a href="#">Spencer Day</a> (and one other contributor)
          </p>
          <button className="create-guide-btn">+ Create a Guide</button>
        </div>
      </div>

      <h2>Guides</h2>
      <div className="guides">
        {/* ✅ Corrected path */}
            <Link to="/repair/pclaptop/asus/tuf-dash-f15/battery-replacement" className="guide-card">
    <img src={batteryImg} alt="Battery" />
    <p>Battery</p>
    </Link>

        <div className="guide-card">
          <img src={lowercaseImg} alt="Lower Case" />
          <p>Lower Case</p>
        </div>
        <div className="guide-card">
          <img src={ssdImg} alt="SSD" />
          <p>SSD</p>
        </div>
      </div>

      <h2>Popular Forum Questions</h2>
      <div className="forum-question">
        <p><strong>Display won't turn on, battery indicator flashes white.</strong></p>
        <p>ASUS TUF Dash F15</p>
      </div>
    </div>
  );
};

export default AsusTufDash15;
