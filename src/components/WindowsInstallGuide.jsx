import React, { useState } from 'react';
import { Clock, AlertCircle, CheckCircle, Star, ThumbsUp, Eye, ChevronDown } from 'lucide-react';
import '../pages/repair/BatteryReplacement.css'; // Assuming this CSS file exists and is correctly located
// import img1 from '../assets/bootable_usb.png'; // Placeholder image
// import img2 from '../assets/bios_settings.png';  // Placeholder image
// import img3 from '../assets/install_screen.png'; // Placeholder image
import step1 from '../assets/select_language.png'; // Placeholder image
import step2 from '../assets/start_installation.png'; // Placeholder image
import step3 from '../assets/accept_license.png';     // Placeholder image
import step4 from '../assets/custom_install.jpg';     // Placeholder image
import step5 from '../assets/select_partition.webp';   // Placeholder image
import step6 from '../assets/installing_windows.png'; // Placeholder image
import step7 from '../assets/restart_screen.png';     // Placeholder
import step8 from '../assets/setup_region.png';        // Placeholder
import step9 from '../assets/setup_region.png';      // Placeholder
import head from '../assets/setup_region.png'; // Placeholder image
import tool1 from '../assets/restart_screen.png';        // Placeholder image
import tool2 from '../assets/restart_screen.png';      // Placeholder image
import authorAvatar from '../assets/clay.png';  // Placeholder
import teamLogo from '../assets/team.png';    // Placeholder

export default function WindowsInstallationGuide() {
  const [currentStep, setCurrentStep] = useState(1);

  // Separate state for images in each step
  const [currentImageStep1, setCurrentImageStep1] = useState(step1);
  const [currentImageStep2, setCurrentImageStep2] = useState(step2);
  const [currentImageStep3, setCurrentImageStep3] = useState(step3); // Added missing state initialization
  const [currentImageStep4, setCurrentImageStep4] = useState(step4);
  const [currentImageStep5, setCurrentImageStep5] = useState(step5);
  const [currentImageStep6, setCurrentImageStep6] = useState(step6);
  const [currentImageStep7, setCurrentImageStep7] = useState(step7);
  const [currentImageStep8, setCurrentImageStep8] = useState(step8);
  const [currentImageStep9, setCurrentImageStep9] = useState(step9);

  return (
    <div className="battery-guide-container">
      {/* Navigation bar */}
      <div className="navigation">
        <div className="breadcrumbs">
          <span>Home</span>
          <span>›</span>
          <span>Operating Systems</span>
          <span>›</span>
          <span>Microsoft</span>
          <span>›</span>
          <span className="breadcrumb-current">Install Windows 10/11</span>
        </div>
        <div className="nav-tabs">
          <button className="nav-tab">Overview</button>
          <button className="nav-tab active">Guides</button>
          <button className="nav-tab">Troubleshooting</button>
        </div>
      </div>

      {/* Guide header */}
      <div className="guide-header">
        <div className="guide-thumbnail">
          <img src={head} alt="Windows Installation Process" />
        </div>
        <div className="guide-info">
          <h1 className="guide-title">How to Install Windows 10/11</h1>
          <div className="contributor-info">
            <img src={authorAvatar} alt="Windows Expert Avatar" className="avatar" />
            <div className="contributor-details">
              <span className="contributor-name">Windows Expert</span>
              <div className="update-date">Last updated on October 26, 2023</div>
            </div>
          </div>
          <div className="guide-metadata">
            <div className="time-estimate">
              <Clock size={16} className="stat-icon" />
              <span>30 - 60 minutes</span>
            </div>
            <div className="difficulty">
              <span>Moderate</span>
            </div>
          </div>
          <div className="stats">
            <div className="stat">
              <Eye size={16} className="stat-icon" />
              <span>250K</span>
            </div>
            <div className="stat">
              <ThumbsUp size={16} className="stat-icon" />
              <span>1.5K</span>
            </div>
            <div className="stat">
              <CheckCircle size={16} className="stat-icon completed-icon" />
              <span>500</span>
            </div>
            <div className="stat">
              <Star size={16} className="stat-icon" />
              <span>100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="introduction-section">
          <div className="guide-steps">
            <div className="introduction-header">
              <h2 className="intro-title">Introduction <a href="#step1" className="step-link">Go to step 1 <ChevronDown size={16} className="inline" /></a></h2>
            </div>

            <p className="intro-text">This guide will walk you through the process of installing Microsoft Windows 10 or 11 on your computer.  Before you begin, ensure you have a stable internet connection (if downloading installation files) and back up any important data.</p>
            <p className="intro-text">You will need a USB drive (at least 8GB) or a DVD to create the installation media.  A valid Windows license key is also required for activation.</p>
          </div>

          <div className="parts-needed">
            <h2 className="parts-title">What you need</h2>
            <div className="parts-container">
              <div className="part-item">
                <div className="part-content">
                  <img src={tool1} alt="USB Drive" className="part-image" />
                  <div className="part-info">
                    <div className="part-name">USB Drive (8GB or larger)</div>
                    <div className="part-price">Varies</div>
                    <div className="part-rating">
                      <Star size={16} className="filled" />
                      <Star size={16} className="filled" />
                      <Star size={16} className="filled" />
                      <Star size={16} className="filled" />
                      <Star size={16} className="filled" />
                      <span className="rating-score">4.9</span>
                    </div>
                  </div>
                  <button className="add-cart-button">
                    Find on Amazon
                  </button>
                </div>
              </div>

              <div className="part-item">
                <div className="part-content">
                  <img src={tool2} alt="Computer Case" className="part-image" />
                  <div className="part-info">
                    <div className="part-name">Computer with compatible hardware</div>
                    <div className="part-price">Varies</div>
                    <div className="part-rating">
                      <Star size={16} className="filled" />
                      <Star size={16} className="filled" />
                      <Star size={16} className="filled" />
                      <Star size={16} className="filled" />
                      <Star size={16} className="half" />
                      <span className="rating-score">4.5</span>
                    </div>
                  </div>
                  <button className="add-cart-button">
                    Learn More
                  </button>
                </div>
              </div>

              <div className="show-more">
                <button className="show-more-button">Show more...</button>
              </div>
            </div>
          </div>
        </div>

        <div className="steps-container">
          <div className="step" id="step1">
            <h3 className="step-header">Step 1 <span className="step-subtitle">Create Installation Media</span></h3>
            <div className="step-content">
              <div className="main-image">
                <img src={currentImageStep1} alt="Step 1 main image" />
              </div>
              <div className="step-details">
                <div className="detail-images">
                  <img
                    src={step1}
                    alt="Detail view 1"
                    onMouseEnter={() => setCurrentImageStep1(step1)}
                    className={currentImageStep1 === step1 ? "active-detail" : ""}
                  />
                </div>

                <ul className="instructions">
                  <li className="instruction-item">
                    <AlertCircle size={16} className="icon-alert" />
                    <span>Download the Media Creation Tool from the official Microsoft website.</span>
                  </li>
                  <li className="instruction-item">
                    <CheckCircle size={16} className="icon-check" />
                    <span>Run the tool and follow the prompts to create a bootable USB drive or DVD.</span>
                  </li>
                  <li className="instruction-item">
                    <CheckCircle size={16} className="icon-check" />
                    <span>Ensure you have a stable internet connection.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="add-comment">
              <span>Add a comment</span>
            </div>
          </div>

          {/* Step 2 - Boot from Installation Media */}
          <div className="step" id="step2">
            <h3 className="step-header">Step 2 <span className="step-subtitle">Boot from Installation Media</span></h3>
            <div className="step-content">
              <div className="main-image">
                <img src={currentImageStep2} alt="Step 2 main image" />
              </div>
              <div className="step-details">
                <div className="detail-images">
                  <img
                    src={step2}
                    alt="Detail view 1"
                    onMouseEnter={() => setCurrentImageStep2(step2)}
                    className={currentImageStep2 === step2 ? "active-detail" : ""}
                  />
                </div>

                <ul className="instructions">
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>Insert the USB drive or DVD into your computer.</span>
                  </li>
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>Restart your computer and enter the BIOS/UEFI settings (usually by pressing DEL, F2, F10, or F12 key during startup).</span>
                  </li>
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>Change the boot order to prioritize the USB drive or DVD.</span>
                  </li>
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>Save the changes and exit BIOS/UEFI.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="add-comment">
              <span>Add a comment</span>
            </div>
          </div>

          <div className="step" id="step3">
            <h3 className="step-header">Step 3 <span className="step-subtitle">Start the Installation</span></h3>
            <div className="step-content">
              <div className="main-image">
                <img
                  src={currentImageStep3}
                  alt="Step 3 main image"
                />
              </div>
              <div className="step-details">
                <div className="detail-images">
                  {/* Modified to add hover functionality */}
                  <img
                    src={step3}
                    alt="Detail view 1"
                    onMouseEnter={() => setCurrentImageStep3(step3)}
                    className={currentImageStep3 === step3 ? "active-detail" : ""}
                  />

                </div>

                <ul className="instructions">
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>The Windows setup should start. Select your language, time and currency format, and keyboard input method.</span>
                  </li>
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>Click "Next".</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="add-comment">
              <span>Add a comment</span>
            </div>
          </div>

          <div className="step" id="step4">
            <h3 className="step-header">Step 4 <span className="step-subtitle">Begin Installation</span></h3>
            <div className="step-content">
              <div className="main-image">
                <img
                  src={currentImageStep4}
                  alt="Step 4 main image"
                />
              </div>
              <div className="step-details">
                <div className="detail-images">
                  {/* Modified to add hover functionality */}
                  <img
                    src={step4}
                    alt="Detail view 1"
                    onMouseEnter={() => setCurrentImageStep4(step4)}
                    className={currentImageStep4 === step4 ? "active-detail" : ""}
                  />

                </div>

                <ul className="instructions">
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>Click "Install now".</span>
                  </li>
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>Accept the license terms and click "Next".</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="add-comment">
              <span>Add a comment</span>
            </div>
          </div>

          <div className="step" id="step5">
            <h3 className="step-header">Step 5 <span className="step-subtitle">Choose Installation Type</span></h3>
            <div className="step-content">
              <div className="main-image">
                <img
                  src={currentImageStep5}
                  alt="Step 5 main image"
                />
              </div>
              <div className="step-details">
                <div className="detail-images">
                  {/* Modified to add hover functionality */}
                  <img
                    src={step5}
                    alt="Detail view 1"
                    onMouseEnter={() => setCurrentImageStep5(step5)}
                    className={currentImageStep5 === step5 ? "active-detail" : ""}
                  />

                </div>

                <ul className="instructions">
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>Select "Custom: Install Windows only (advanced)".</span>
                  </li>
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>Select the partition where you want to install Windows.  If you are upgrading, choose the existing Windows partition.  If you are doing a clean install, you may need to create or delete partitions.</span>
                  </li>
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>Click "Next".</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="add-comment">
              <span>Add a comment</span>
            </div>
          </div>

          <div className="step" id="step6">
            <h3 className="step-header">Step 6 <span className="step-subtitle">Installing Windows</span></h3>
            <div className="step-content">
              <div className="main-image">
                <img
                  src={currentImageStep6}
                  alt="Step 6 main image"
                />
              </div><div className="step-details">
              <div className="detail-images">
                {/* Modified to add hover functionality */}
                <img
                  src={step6}
                  alt="Detail view 1"
                  onMouseEnter={() => setCurrentImageStep6(step6)}
                  className={currentImageStep6 === step6 ? "active-detail" : ""}
                />
              </div>

              <ul className="instructions">
                <li className="instruction-item">
                  <span className="bullet bullet-red"></span>
                  <span>Windows will now begin the installation process.  This may take some time.</span>
                </li>
                <li className="instruction-item">
                  <span className="bullet bullet-red"></span>
                  <span>Your computer will restart automatically several times.</span>
                </li>
              </ul>
            </div>
            </div>
            <div className="add-comment">
              <span>Add a comment</span>
            </div>
          </div>

          <div className="step" id="step7">
            <h3 className="step-header">Step 7 <span className="step-subtitle">Restart</span></h3>
            <div className="step-content">
              <div className="main-image">
                <img
                  src={currentImageStep7}
                  alt="Step 7 main image"
                />
              </div>
              <div className="step-details">
                <div className="detail-images">
                  {/* Modified to add hover functionality */}

                  <img
                    src={step7}
                    alt="Detail view 1"
                    onMouseEnter={() => setCurrentImageStep7(step7)}
                    className={currentImageStep7 === step7 ? "active-detail" : ""}
                  />
                </div>

                <ul className="instructions">
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>The computer will restart.</span>
                  </li>

                </ul>
              </div>
            </div>
            <div className="add-comment">
              <span>Add a comment</span>
            </div>
          </div>

          <div className="step" id="step8">
            <h3 className="step-header">Step 8 <span className="step-subtitle">Setup Region and Language</span></h3>
            <div className="step-content">
              <div className="main-image">
                <img
                  src={currentImageStep8}
                  alt="Step 8 main image"
                />
              </div>
              <div className="step-details">
                <div className="detail-images">
                  {/* Modified to add hover functionality */}
                  <img
                    src={step8}
                    alt="Detail view 1"
                    onMouseEnter={() => setCurrentImageStep8(step8)}
                    className={currentImageStep8 === step8 ? "active-detail" : ""}
                  />
                </div>

                <ul className="instructions">
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>Select your region and language settings.</span>
                  </li>

                </ul>
              </div>
            </div>
            <div className="add-comment">
              <span>Add a comment</span>
            </div>
          </div>

          <div className="step" id="step9">
            <h3 className="step-header">Step 9 <span className="step-subtitle">Create Account</span></h3>
            <div className="step-content">
              <div className="main-image">
                <img
                  src={currentImageStep9}
                  alt="Step 9 main image"
                />
              </div>
              <div className="step-details">
                <div className="detail-images">
                  {/* Modified to add hover functionality */}
                  <img
                    src={step9}
                    alt="Detail view 1"
                    onMouseEnter={() => setCurrentImageStep9(step9)}
                    className={currentImageStep9 === step9 ? "active-detail" : ""}
                  />
                </div>

                <ul className="instructions">
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>Create a user account. You can choose to create a Microsoft account or an offline account.</span>
                  </li>
                  <li className="instruction-item">
                    <span className="bullet bullet-red"></span>
                    <span>Follow the on-screen instructions to set up your account, privacy settings, and other preferences.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="add-comment">
              <span>Add a comment</span>
            </div>
          </div>
          {/* Additional steps would go here */}
        </div>
      </div>

      {/* Conclusion Section */}
      <div className="conclusion-section">
        <h2 className="conclusion-title">Conclusion</h2>
        <p>Once you have completed the setup process, Windows will be installed and ready to use.</p>
        <p>Remember to install any necessary drivers for your hardware, and activate Windows with your product key.</p>
        <p>Enjoy your new Windows installation!</p>
        <button className="give-author-points">✔ Give the author +30 points!</button>
        <p>100 other people completed this guide</p>
      </div>

      {/* Author and Team Information */}
      <div className="author-team-info">
        <div className="author">
          <h3>Author</h3>
          <img src={authorAvatar} alt="Windows Expert Avatar" className="author-avatar" />
          <p>Windows Expert</p>
          <p>Member since: 01/15/2020</p>
          <p>150,000 Reputation</p>
          <p>200 Guides authored</p>
          <div className="badges">
            <span>Badges: 25</span>
            <div className="badge-icons">
              {/* Replace with actual badge URLs */}
              <img src="/api/placeholder/24/24" alt="Badge 1" />
              <img src="/api/placeholder/24/24" alt="Badge 2" />
              <img src="/api/placeholder/24/24" alt="Badge 3" />
              <span className="more-badges">+22 more badges</span>
            </div>
          </div>
        </div>
        <div className="team">
          <h3>Team</h3>
          <div className="team-logo-container">
            <img src={teamLogo} alt="Windows Team logo" className="team-logo" />
          </div>
          <p>Windows Team</p>
          <p>Staff</p>
          <p>15 Members</p>
          <p><span className="team-name-label">WINDOWS TEAM</span> 50,000 Guides authored</p>
        </div>
      </div>

      {/* Guide Comments Section */}
      <div className="guide-comments">
        <div className="comments-header">
          <h3>50 Guide Comments</h3>
          <button className="add-comment-button">💬 Add a comment</button>
        </div>
        <div className="add-comment-section">
          <h4>Add Comment</h4>
          <div className="comment-input-tools">
            {/* Basic text formatting tools - you might need a more robust solution */}
            <button><b>B</b></button>
            <button><i>I</i></button>
            <button><u>U</u></button>
            {/* Add more tools as needed */}
          </div>
          <textarea placeholder="Your comment here"></textarea>
          <button className="post-comment-button">Post comment</button>
        </div>
      </div>

      {/* View Statistics Section */}
      <div className="view-statistics">
        <p><a>👀 View Statistics:</a> Past 24 Hours: <span>500</span> | Past 7 Days: <span>2,500</span> | Past 30 Days: <span>10,000</span> | All Time: <span>250,000</span></p>
      </div>
    </div>
  );
}

