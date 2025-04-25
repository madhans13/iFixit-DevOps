import React, { useState } from 'react';
import '../../componentStyles/oneplus9.css';
import one9 from '../../assets/one9.png';
import ssdImage from '../../assets/ssd.jpg';
import screwdriverIcon from '../../assets/tools1.png';
import ifixtPicksIcon from '../../assets/team.png';
import spudgerIcon from '../../assets/tools2.png';
import spencerImage from '../../assets/clay.png';
import ifixtLogo from '../../assets/team.png';
import repair from'../../assets/onerp.jpg';
import screen from '../../assets/screen.png';
import heat from '../../assets/heat.jpg';
import { Link } from 'react-router-dom';

const OnePlus9Page = () => {
  const [activeTab, setActiveTab] = useState('guides');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="asus-container">
      {/* Left Sidebar Navigation */}


      {/* Main Content Area */}
      <div className="main-content">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <span>Device</span> &gt;<span>Phone</span> <span>Oneplus</span>&gt; <span className="current">Oneplus 9 5G</span>
        </div>

        {/* Header with Device Info */}
        <div className="device-header">
          <div className="device-image">
            <img src={one9} alt="ASUS TUF Dash F15" />
          </div>
          <div className="device-info">
            <h1>OnePlus 9 5G Repair</h1>
            <p>The OnePlus 9 series, including the OnePlus 9 and 9 Pro, was officially announced on March 23, 2021. According to OnePlus India, the launch was part of a larger event where the company also unveiled other devices, including the OnePlus Watch.</p>
            <p className="author">Author: <a href="#" className="author-link">Spencer Day (and one other contributor)</a></p>
            <div className="action-buttons">
              <button className="create-guide-btn">
                <i className="guide-icon"></i> Create a Guide
              </button>
              <button className="create-guide-btn">
                <i className="guide-icon"></i> + I Have This
              </button>
            </div>
          </div>
        </div>

        {/* Guides Section */}
        <div className="section-header">
          <h2>Guides</h2>
        </div>

        <div className="subsection-header">
          <h3>Replacement Guides</h3>
        </div>

        <div className="guides-grid">
          <div className="guide-card">
            {/* Link to the new Phone Battery Replacement Page */}
            <Link to="/repair/phone/oneplus/oneplus9/battery-replacement" >
              <div className="guide-image">
                <img src={repair} alt="Battery Replacement" />
              </div>
            </Link>
            <div className="guide-title">Battery</div>

          </div>

          <div className="guide-card">
            <div className="guide-image">
              <img src={screen} alt="Lower Case Replacement" />
            </div>
            <div className="guide-title">Screen</div>
          </div>

          <div className="guide-card">
            <div className="guide-image">
              <img src={ssdImage} alt="SSD Replacement" />
            </div>
            <div className="guide-title">Board</div>
          </div>
          <div className="guide-card">
            <div className="guide-image">
              <img src={ssdImage} alt="SSD Replacement" />
            </div>
            <div className="guide-title">Rear Glass</div>
          </div>
        </div>

        {/* ... rest of your OnePlus9Page component ... */}
      </div>
    </div>
  );
};

export default OnePlus9Page;