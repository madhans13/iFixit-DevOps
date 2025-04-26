import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../componentStyles/oneplus9.css';
import one9 from '../../assets/one9.png';
import ssdImage from '../../assets/ssd.jpg';
import screwdriverIcon from '../../assets/tools1.png';
import ifixtPicksIcon from '../../assets/team.png';
import spudgerIcon from '../../assets/tools2.png';
import spencerImage from '../../assets/clay.png';
import ifixtLogo from '../../assets/team.png';
import repair from '../../assets/onerp.jpg';
import screen from '../../assets/screen.png';
import heat from '../../assets/heat.jpg';

const OnePlus9Page = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('guides');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCreateGuideClick = () => {
    navigate('/create-guide');
  };

  return (
    <div className="asus-container">
      {/* Left Sidebar Navigation */}

      {/* Main Content Area */}
      <div className="main-content">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <span>Device</span> &gt;
          <span>Phone</span> <span>Oneplus</span>&gt;{' '}
          <span className="current">Oneplus 9 5G</span>
        </div>

        {/* Header with Device Info */}
        <div className="device-header">
          <div className="device-image">
            <img src={one9} alt="ASUS TUF Dash F15" />
          </div>
          <div className="device-info">
            <h1>OnePlus 9 5G Repair</h1>
            <p>
              The OnePlus 9 series, including the OnePlus 9 and 9 Pro, was
              officially announced on March 23, 2021. According to OnePlus India,
              the launch was part of a larger event where the company also
              unveiled other devices, including the OnePlus Watch.
            </p>
            <p className="author">
              Author:{' '}
              <a href="#" className="author-link">
                Spencer Day (and one other contributor)
              </a>
            </p>
            <div className="action-buttons">
              <button className="create-guide-btn" onClick={handleCreateGuideClick}>
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
            <Link to="/repair/phone/oneplus/oneplus9/battery-replacement">
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

        {/* Forum Questions Section */}
        <div className="section-header forum-header">
          <h2>Popular Forum Questions</h2>
          <button className="ask-question-btn">Ask a Question</button>
        </div>

        <div className="forum-questions">
          <div className="forum-question">
            <div className="question-stats">
              <div className="answers">4 Answers</div>
              <div className="score">2 Score</div>
            </div>
            <div className="question-content">
              <h4 className="question-title">Green Screen problem.</h4>
              <div className="question-device">OnePlus 9 5G</div>
            </div>
          </div>

          <div className="forum-question">
            <div className="question-stats">
              <div className="answers">2 Answers</div>
              <div className="score">1 Score</div>
            </div>
            <div className="question-content">
              <h4 className="question-title">
                {' '}
                overheating, screen problems.
              </h4>
              <div className="question-device">OnePlus 9 5G</div>
            </div>
          </div>

          <div className="forum-question">
            <div className="question-stats">
              <div className="answers">3 Answers</div>
              <div className="score">0 Score</div>
            </div>
            <div className="question-content">
              <h4 className="question-title">
                potential motherboard issues leading to device bricking.
              </h4>
              <div className="question-device">OnePlus 9 5G</div>
            </div>
          </div>

          <div className="forum-question">
            <div className="question-stats">
              <div className="answers">1 Answer</div>
              <div className="score">0 Score</div>
            </div>
            <div className="question-content">
              <h4 className="question-title">
                screen flickering, particularly after a software update.
              </h4>
              <div className="question-device">OnePlus 9 5G</div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="section-header">
          <h2>Tools</h2>
        </div>

        <div className="tools-description">
          <p>
            These are some common tools used to work on this device. You might not
            need every tool for every procedure.
          </p>
        </div>

        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-icon">
              <img src={screwdriverIcon} alt="Screwdriver" />
            </div>
            <div className="tool-info">
              <div className="tool-name">Screwdriver</div>
              <button className="view-btn">View</button>
            </div>
          </div>

          <div className="tool-card">
            <div className="tool-icon">
              <img src={ifixtPicksIcon} alt="iFixit Opening Picks" />
            </div>
            <div className="tool-info">
              <div className="tool-name">iFixit Opening Picks (Set of 6)</div>
              <button className="view-btn">View</button>
            </div>
          </div>

          <div className="tool-card">
            <div className="tool-icon">
              <img src={spudgerIcon} alt="Spudger" />
            </div>
            <div className="tool-info">
              <div className="tool-name">Spudger</div>
              <button className="view-btn">View</button>
            </div>
          </div>
          <div className="tool-card">
            <div className="tool-icon">
              <img src={heat} alt="HeatGun" />
            </div>
            <div className="tool-info">
              <div className="tool-name">Heatgun</div>
              <button className="view-btn">View</button>
            </div>
          </div>
        </div>

        {/* Details - Background Section */}
        <div className="section-header">
          <h2>Background</h2>
        </div>

        <div className="background-content">
          <p>
            The OnePlus 9 series, including the OnePlus 9 and 9 Pro, was
            officially announced on March 23, 2021. According to OnePlus India,
            the launch was part of a larger event where the company also unveiled
            other devices, including the OnePlus Watch.
          </p>
        </div>

        {/* Details - Identification Section */}
        <div className="section-header">
          <h2>Identification</h2>
        </div>

        <div className="identification-content">
          <p>
            The OnePlus 9 features a 6.55-inch AMOLED display with a 2400x1080
            resolution, 120Hz refresh rate, and 402 ppi.It is powered by the
            Qualcomm Snapdragon 888 processor.
          </p>
        </div>

        {/* Details - Specifications Section */}
        <div className="section-header">
          <h2>Specifications</h2>
        </div>

        <div className="specifications-content">
          <div className="spec-section">
            <h3>Display</h3>
            <ul>
              <li>
                Size: 16.637 centimeters (6.55 inches) (measured diagonally from
                corner to corner)
              </li>
              <li>Resolution: 2400 x 1080 pixels 402 ppi</li>
              <li>Aspect Ratio: 20:9</li>
              <li>Type: 120 Hz Fluid AMOLED</li>
              <li>Cover Glass: Corning® Gorilla® Glass</li>
            </ul>
          </div>

          <div className="spec-section">
            <h3>Performance</h3>
            <ul>
              <li>Operating System: OxygenOS based on Android™ 11</li>
              <li>CPU: Qualcomm® Snapdragon™ 888</li>
              <li>5G Chipset: X60</li>
              <li>RAM: 8GB/12GB LPDDR5</li>
              <li>Battery: 4,500 mAh (2S1P 2,250 mAh, non-removable)</li>
              <li>Storage: 128GB/256GB UFS 3.1 2-LANE</li>
            </ul>
          </div>

          <div className="spec-section">
            <h3>Dimensions</h3>
            <ul>
              <li>Height: 16.00cm</li>
              <li>Width: 7.39cm</li>
              <li>Thickness: 0.81cm</li>
              <li>Weight: 183g</li>
            </ul>
          </div>

          <div className="spec-section">
            <h3>Ports</h3>
            <ul>
              <li>USB 3.1 GEN1</li>
              <li>Type-C</li>
              <li>Support standard Type-C earphones</li>
              <li>RJ45 LAN port</li>
              <li>Dual nano-SIM slot</li>
            </ul>
          </div>
        </div>

        {/* Author Section */}
        <div className="author-section">
          <div className="author-info">
            <h3>Author</h3>
            <div className="author-details">
              <img src={spencerImage} alt="Spencer Day" className="author-image" />
              <div className="author-bio">
                <h4>Spencer Day</h4>
                <p>Member since: 09/14/22</p>
                <p>104,387 Reputation</p>
                <p>740 Guides authored</p>
              </div>
              <div className="author-badges">
                <p>with 1 other contributor</p>
                <p>Badges: 38</p>
                <p>+35 more badges</p>
              </div>
            </div>
          </div>

          <div className="team-info">
            <h3>Team</h3>
            <div className="team-details">
              <img src={ifixtLogo} alt="iFixit" className="team-logo" />
              <div className="team-stats">
                <h4>MDM</h4>
                <p>Staff</p>
                <p>121 Members</p>
                <p>19,806 Guides authored</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePlus9Page;
