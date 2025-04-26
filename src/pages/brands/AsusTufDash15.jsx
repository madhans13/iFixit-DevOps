import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './asusTufDash15.css';
import laptopImage from '../../assets/asus_tuf.jpg';
import batteryImage from '../../assets/battery.jpg';
import lowerCaseImage from '../../assets/lowercase.jpg';
import ssdImage from '../../assets/ssd.jpg';
import screwdriverIcon from '../../assets/tools1.png';
import ifixtPicksIcon from '../../assets/team.png';
import spudgerIcon from '../../assets/tools2.png';
import spencerImage from '../../assets/clay.png';
import ifixtLogo from '../../assets/team.png';
import os from '../../assets/os_install.webp'
import drivers from '../../assets/drivers.png'
import software from '../../assets/software.webp'
// Mock API functions (replace with your actual API calls)
const createQuestion = async (questionData) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // In a real app, you'd send this data to your backend API
  console.log('Question submitted:', questionData);
  // Mock successful response
  return {
    id: crypto.randomUUID(),
    ...questionData,
    answers: 0,
    score: 0,
  };
};

const getQuestions = async () => {
  // Simulate fetching questions from a database
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock data (replace with actual data from your database)
  return [
    {
      id: '1',
      title: 'Display won\'t turn on, battery indicator flashes white.',
      content: 'My Asus TUF Dash F15 display is not turning on. The battery indicator light is flashing white. I\'ve tried restarting, but it doesn\'t work. Any ideas?',
      device: 'ASUS TUF Dash F15',
      answers: 4,
      score: 2,
    },
    {
      id: '2',
      title: 'Powers On, No POST, Keyboard flashes, Black Screen',
      content: 'When I turn on my laptop, the power comes on, but there is no POST. The keyboard flashes, and the screen remains black. What could be the issue?',
      device: 'ASUS TUF Dash F15',
      answers: 2,
      score: 1,
    },
    {
      id: '3',
      title: 'Screen slowly turns black from the bottom up, like pixels dying',
      content: 'The screen on my laptop is turning black from the bottom up, as if the pixels are dying. Has anyone seen this before? How can I fix it?',
      device: 'ASUS TUF Dash F15',
      answers: 3,
      score: 0,
    },
    {
      id: '4',
      title: 'Changing broken screen on a Laptop.',
      content: 'I need to replace the broken screen on my Laptop. Can anyone guide me through the process?',
      device: 'ASUS TUF Dash F15',
      answers: 1,
      score: 0,
    },
  ];
};



const AsusTufDashF15 = () => {
  const [activeTab, setActiveTab] = useState('guides');
  const [questions, setQuestions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: '', content: '', device: 'ASUS TUF Dash F15' });
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getQuestions();
      setQuestions(fetchedQuestions);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [newQuestion.content]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCreateGuideClick = () => {
  };

  const handleAskQuestion = async () => {
    setIsLoading(true);
    try {
      const createdQuestion = await createQuestion(newQuestion);
      setQuestions([...questions, createdQuestion]);
      setNewQuestion({ title: '', content: '', device: 'ASUS TUF Dash F15' });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to create question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="asus-container">
      {/* Left Sidebar Navigation */}


      {/* Main Content Area */}
      <div className="main-content">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <span>Device</span> &gt; <span>PC</span> <span>Laptop</span> <span>Asus Laptop</span> &gt; <span>Asus TUF Laptop</span> &gt;{' '}
          <span className="current">ASUS TUF Dash F15</span>
        </div>

        {/* Header with Device Info */}
        <div className="device-header">
          <div className="device-image">
            <img src={laptopImage} alt="ASUS TUF Dash F15" />
          </div>
          <div className="device-info">
            <h1>ASUS TUF Dash F15 Repair</h1>
            <p>
              Released in 2021, the TUF F15 features an Intel Core i& processor, NVIDIA GeForce RTX graphics, and a 15.6 inch
              anti-glare display.
            </p>
            <p className="author">
              Author: <a href="#" className="author-link">
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

        {/* Replacement Guides */}
        <div className="subsection-header">
          <h3>Replacement Guides</h3>
        </div>

        <div className="guides-grid">
          <div className="guide-card">
            <Link to="/repair/pclaptop/asus/tuf-dash-f15/battery-replacement">
              <div className="guide-image">
                <img src={batteryImage} alt="Battery Replacement" />
              </div>
            </Link>
            <div className="guide-title">Battery</div>
          </div>

          <div className="guide-card">
            <Link to="/repair/pclaptop/asus/tuf-dash-f15/lower-case-replacement">
              <div className="guide-image">
                <img src={lowerCaseImage} alt="Lower Case Replacement" />
              </div>
            </Link>
            <div className="guide-title">Lower Case</div>
          </div>

          <div className="guide-card">
            <Link to="/repair/pclaptop/asus/tuf-dash-f15/ssd-replacement">
              <div className="guide-image">
                <img src={ssdImage} alt="SSD Replacement" />
              </div>
            </Link>
            <div className="guide-title">SSD</div>
          </div>
        </div>

        {/* Software Related Issues */}
        <div className="subsection-header">
          <h3>Software Related Issues</h3>
        </div>

        <div className="guides-grid">
          <div className="guide-card">
            <Link to="/repair/pclaptop/asus/tuf-dash-f15/os-installation">
              <div className="guide-image">
                <img src={os} alt="OS Install" />
              </div>
            </Link>
            <div className="guide-title">Install Operating System</div>
          </div>

          <div className="guide-card">
            <Link to="/repair/pclaptop/asus/tuf-dash-f15/driver-installation">
              <div className="guide-image">
                <img src={drivers} alt="Driver Install" />
              </div>
            </Link>
            <div className="guide-title">Install Drivers</div>
          </div>

          <div className="guide-card">
            <Link to="/repair/pclaptop/asus/tuf-dash-f15/software-troubleshooting">
              <div className="guide-image">
                <img src={software} alt="Troubleshoot Software" />
              </div>
            </Link>
            <div className="guide-title">Software</div>
          </div>
        </div>

        {/* Forum Questions Section */}
        <div className="section-header forum-header">
          <h2>Popular Forum Questions</h2>
          <button className="ask-question-btn" onClick={() => setIsDialogOpen(true)}>Ask a Question</button>

          {isDialogOpen && (
            <div className="dialog-overlay">
              <div className="dialog-content">
                <div className="dialog-header">
                  <h2 className="dialog-title">Ask a Question</h2>
                  <p className="dialog-description">
                    Ask a question about the ASUS TUF Dash F15.
                  </p>
                </div>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="title" className="text-right dialog-label">
                      Title
                    </label>
                    <input
                      id="title"
                      value={newQuestion.title}
                      onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                      className="col-span-3 dialog-input"
                      placeholder="Enter your question title"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <label htmlFor="content" className="text-right mt-2 dialog-label">
                      Content
                    </label>
                    <textarea
                      id="content"
                      value={newQuestion.content}
                      onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                      className="col-span-3 dialog-textarea"
                      placeholder="Enter the details of your question"
                      ref={textareaRef}
                    />
                  </div>
                </div>
                <div className="dialog-footer">
                  <button
                    type="button"
                    onClick={handleAskQuestion}
                    disabled={isLoading || !newQuestion.title.trim() || !newQuestion.content.trim()}
                    className={`dialog-button ${isLoading ? 'cursor-not-allowed dialog-button-disabled' : ''}`}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Question'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    className="dialog-button dialog-cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="forum-questions">
          {questions.map((question) => (
            <div className="forum-question" key={question.id}>
              <div className="question-stats">
                <div className="answers">{question.answers} Answers</div>
                <div className="score">{question.score} Score</div>
              </div>
              <div className="question-content">
                <h4 className="question-title">{question.title}</h4>
                <div className="question-device">{question.device}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tools Section */}
        <div className="section-header">
          <h2>Tools</h2>
        </div>

        <div className="tools-description">
          <p>These are some common tools used to work on this device. You might not need every tool for every procedure.</p>
        </div>

        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-icon">
              <img src={screwdriverIcon} alt="Screwdriver" />
            </div>
            <div className="tool-info">
              <div className="tool-name">Phillips #1 Screwdriver</div>
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
        </div>

        {/* Details - Background Section */}
        <div className="section-header">
          <h2>Background</h2>
        </div>

        <div className="background-content">
          <p>
            Released in 2021, this laptop is geared entirely towards gaming. It has NVIDIA graphics and a long lasting battery.
            It has a sturdy, rugged build and a nice back-lit keyboard.
          </p>
        </div>

        {/* Details - Identification Section */}
        <div className="section-header">
          <h2>Identification</h2>
        </div>

        <div className="identification-content">
          <p>The ASUS TUF Dash F15 features a metallic top and sturdy chassis. It comes in Eclipse Gray or Moonlight White.</p>
        </div>

        {/* Details - Specifications Section */}
        <div className="section-header">
          <h2>Specifications</h2>
        </div>

        <div className="specifications-content">
          <div className="spec-section">
            <h3>Display</h3>
            <ul>
              <li>15.6-inch FHD anti-glare; 1920 x 1080 pixels</li>
            </ul>
          </div>

          <div className="spec-section">
            <h3>Processor</h3>
            <ul>
              <li>Intel Core i7</li>
            </ul>
          </div>

          <div className="spec-section">
            <h3>Graphics</h3>
            <ul>
              <li>NVIDIA GeForce RTX</li>
            </ul>
          </div>

          <div className="spec-section">
            <h3>Storage</h3>
            <ul>
              <li>512 GB or 1 TB M.2 SSD</li>
            </ul>
          </div>

          <div className="spec-section">
            <h3>Dimensions</h3>
            <ul>
              <li>Width: 14.17 inches (36 cm)</li>
              <li>Depth: 9.92 inches (25.2 cm)</li>
              <li>Height: 0.78 inches (1.99 cm)</li>
              <li>Weight: 4.41 pounds (2 kg)</li>
            </ul>
          </div>

          <div className="spec-section">
            <h3>Ports</h3>
            <ul>
              <li>HDMI 2.0b</li>
              <li>3 USB 3.2 Gen 1 Type-A</li>
              <li>1 Thunderbolt 4 (power delivery and DisplayPort support)</li>
              <li>RJ45 LAN port</li>
              <li>Combo audio jack</li>
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
                <h4>iFixit</h4>
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

export default AsusTufDashF15;
