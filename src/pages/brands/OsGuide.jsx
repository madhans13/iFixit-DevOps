import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../componentStyles/oneplus9.css'; // You can reuse the CSS, or create a new one
import osInstallImage from '../../assets/os_install.webp'; // Replace with a relevant image
import ssdImage from '../../assets/ssd.jpg'; //You can remove this
import screwdriverIcon from '../../assets/tools1.png';
import ifixtPicksIcon from '../../assets/team.png';
import spudgerIcon from '../../assets/tools2.png';
import spencerImage from '../../assets/clay.png';
import ifixtLogo from '../../assets/team.png';
import windows from '../../assets/windows_install.avif'
import linux from '../../assets/linux.webp'
import mac from '../../assets/mac.png'
//import repair from '../../assets/onerp.jpg'; //Not used
//import screen from '../../assets/screen.png'; //Not used
//import heat from '../../assets/heat.jpg';  //Not used

const OSInstallGuide = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('guides');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCreateGuideClick = () => {
    navigate('/create-guide');
  };

  return (
    <div className="asus-container"> {/* consider renaming this class if needed */}
      {/* Left Sidebar Navigation */}
      {/* You might want to create a separate component for this if it's reused */}

      {/* Main Content Area */}
      <div className="main-content">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <span>Device</span> &gt;
          <span>PC</span> <span>Laptop</span> &gt;
          <span className="current">Install Operating System</span>
        </div>

        {/* Header with Device Info */}
        <div className="device-header">
          <div className="device-image">
            <img src={osInstallImage} alt="Operating System Installation" />
          </div>
          <div className="device-info">
            <h1>Operating System Installation Guide</h1>
            <p>
              This guide provides instructions on how to install an operating
              system on your device.  Follow these steps to get your system up and running.
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
          <h3>Installation Guides</h3>
        </div>

        <div className="guides-grid">
          <div className="guide-card">
            <Link to="/repair/os-windows"> {/* adjust the link as necessary */}
              <div className="guide-image">
                <img src={windows} alt="Install Windows" />
              </div>
            </Link>
            <div className="guide-title">Install Windows</div>
          </div>

          <div className="guide-card">
            <Link to="/repair/os-linux">  {/* adjust the link as necessary */}
              <div className="guide-image">
                <img src={linux} alt="Install Linux" />
              </div>
            </Link>
            <div className="guide-title">Install Linux</div>
          </div>

          <div className="guide-card">
             <Link to="/repair/os-macos">  {/* adjust the link as necessary */}
              <div className="guide-image">
                <img src={mac} alt="Install macOS" />
              </div>
            </Link>
            <div className="guide-title">Install macOS</div>
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
              <h4 className="question-title">
                Windows installation fails with error 0x80070017
              </h4>
              <div className="question-device">Operating System</div>
            </div>
          </div>

          <div className="forum-question">
            <div className="question-stats">
              <div className="answers">2 Answers</div>
              <div className="score">1 Score</div>
            </div>
            <div className="question-content">
              <h4 className="question-title">
                Cannot boot from USB drive.
              </h4>
              <div className="question-device">Operating System</div>
            </div>
          </div>

          <div className="forum-question">
            <div className="question-stats">
              <div className="answers">3 Answers</div>
              <div className="score">0 Score</div>
            </div>
            <div className="question-content">
              <h4 className="question-title">
                Dual boot Windows and Linux.
              </h4>
              <div className="question-device">Operating System</div>
            </div>
          </div>

          <div className="forum-question">
            <div className="question-stats">
              <div className="answers">1 Answer</div>
              <div className="score">0 Score</div>
            </div>
            <div className="question-content">
              <h4 className="question-title">
                macOS installation stuck on Apple logo.
              </h4>
              <div className="question-device">Operating System</div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="section-header">
          <h2>Tools</h2>
        </div>

        <div className="tools-description">
          <p>
            These are some common tools used to install an operating system. You
            might not need every tool for every procedure.
          </p>
        </div>

        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-icon">
              <img src={screwdriverIcon} alt="USB Drive" />
            </div>
            <div className="tool-info">
              <div className="tool-name">USB Drive (8GB or larger)</div>
              <button className="view-btn">View</button>
            </div>
          </div>

          <div className="tool-card">
            <div className="tool-icon">
              <img src={ifixtPicksIcon} alt="Installation Media" />
            </div>
            <div className="tool-info">
              <div className="tool-name">OS Installation Media (DVD or ISO)</div>
              <button className="view-btn">View</button>
            </div>
          </div>

          <div className="tool-card">
            <div className="tool-icon">
              <img src={spudgerIcon} alt="Internet Connection" />
            </div>
            <div className="tool-info">
              <div className="tool-name">Internet Connection (for drivers)</div>
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
            Installing an operating system is a fundamental process for any
            computer to function. This process involves preparing the installation
            media, configuring the BIOS/UEFI settings, and following the on-screen
            prompts to install the OS files.
          </p>
        </div>

        {/* Details - Identification Section */}
        <div className="section-header">
          <h2>Identification</h2>
        </div>

        <div className="identification-content">
          <p>
            The process varies slightly depending on the specific operating
            system (Windows, Linux, macOS) and the computer's hardware.
          </p>
        </div>

        {/* Details - Specifications Section */}
        <div className="section-header">
          <h2>Installation Steps (General)</h2>
        </div>

        <div className="specifications-content">
          <div className="spec-section">
            <h3>1. Prepare Installation Media</h3>
            <ul>
              <li>
                Download the OS installation files (ISO) from the official
                website.
              </li>
              <li>
                Create a bootable USB drive or burn the ISO to a DVD.
              </li>
            </ul>
          </div>

          <div className="spec-section">
            <h3>2. Configure BIOS/UEFI</h3>
            <ul>
              <li>
                Enter the BIOS/UEFI settings by pressing a specific key (e.g.,
                DEL, F2, F10) during startup.
              </li>
              <li>
                Set the boot priority to the USB drive or DVD.
              </li>
              <li>
                Disable Secure Boot (if necessary).
              </li>
            </ul>
          </div>

          <div className="spec-section">
            <h3>3. Install the OS</h3>
            <ul>
              <li>Boot from the installation media.</li>
              <li>
                Follow the on-screen instructions to select the installation
                drive, language, and other settings.
              </li>
              <li>Wait for the installation process to complete.</li>
            </ul>
          </div>
           <div className="spec-section">
            <h3>4. Install Drivers</h3>
            <ul>
              <li>
               After the OS is installed, install the necessary drivers.
              </li>
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

export default OSInstallGuide;
