import React, { useState } from 'react';
import '../componentStyles/CreateGuide.css';
import createguide from '../../src/assets/create-guide.jpg';

const CreateGuide = () => {
  const [activeTab, setActiveTab] = useState('Introduction');
  const [guideType, setGuideType] = useState('Technique');
  const [device, setDevice] = useState('');
  const [title, setTitle] = useState('');
  const [showMore, setShowMore] = useState(false);

  // For Details Tab
  const [details, setDetails] = useState('');

  // For Guide Steps Tab
  const [steps, setSteps] = useState('');

  const handleSave = () => {
    if (activeTab === 'Introduction') {
      // Validate required fields in the Introduction tab
      if (!guideType || !device || !title) {
        alert('Please fill out all fields in the Introduction tab before proceeding.');
        return; // Prevent moving to the next tab if validation fails
      }
      setActiveTab('Details');
    } else if (activeTab === 'Details') {
      // Validate Details tab fields
      if (!details) {
        alert('Please fill out the details before proceeding to the next section.');
        return;
      }
      setActiveTab('Guide Steps');
    } else if (activeTab === 'Guide Steps') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const formData = {
      guideType,
      device,
      title,
      details,
      steps,
    };
    console.log('Submitting form:', formData);
    // Later you will replace this console.log with API call to save in database
    alert('Guide Submitted Successfully!');
    // Optional: Clear form after submission
    setGuideType('Technique');
    setDevice('');
    setTitle('');
    setDetails('');
    setSteps('');
    setActiveTab('Introduction');
  };

  const handleTabChange = (tab) => {
    if (tab === 'Details' && (!guideType || !device || !title)) {
      alert('Please fill out all fields in the Introduction tab before proceeding.');
      return;
    }
    if (tab === 'Guide Steps' && !details) {
      alert('Please fill out the details before proceeding to the next section.');
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div className="page-container">
      <div className="guide-form-container">
        <h1>Replacement</h1>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'Introduction' ? 'active' : ''}`}
            onClick={() => handleTabChange('Introduction')}
          >
            Introduction
          </button>
          <button
            className={`tab ${activeTab === 'Details' ? 'active' : ''} ${(!guideType || !device || !title) ? 'disabled' : ''}`}
            onClick={() => handleTabChange('Details')}
            disabled={!guideType || !device || !title}
          >
            Details
          </button>
          <button
            className={`tab ${activeTab === 'Guide Steps' ? 'active' : ''} ${(!details) ? 'disabled' : ''}`}
            onClick={() => handleTabChange('Guide Steps')}
            disabled={!details}
          >
            Guide Steps
          </button>
        </div>

        {/* Form */}
        <div className="form-section">
          {activeTab === 'Introduction' && (
            <>
              <div className="form-group">
                <label className="form-label">
                  What type of guide is this? <span className="info-icon">ⓘ</span>
                </label>
                <select
                  className="form-input"
                  value={guideType}
                  onChange={(e) => setGuideType(e.target.value)}
                >
                  <option value="Technique">Technique</option>
                  <option value="Replacement">Replacement</option>
                  <option value="Repair">Repair</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Device <span className="info-icon">ⓘ</span>
                </label>
                <div className="device-input-container">
                  <input
                    className="form-input device-input"
                    type="text"
                    placeholder="Example: 2001-2005 Honda Civic"
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                  />
                  <button className="add-button">+</button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Title <span className="info-icon">ⓘ</span>
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="1001 Technique"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="show-more-container">
                <button
                  className="show-more-button"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? 'Show Less ▲' : 'Show More ▼'}
                </button>
              </div>
            </>
          )}

          {activeTab === 'Details' && (
            <>
              <div className="form-group">
                <label className="form-label">
                  Add More Details <span className="info-icon">ⓘ</span>
                </label>
                <textarea
                  className="form-input"
                  rows="6"
                  placeholder="Enter detailed information about the guide..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
            </>
          )}

          {activeTab === 'Guide Steps' && (
            <>
              <div className="form-group">
                <label className="form-label">
                  Guide Steps <span className="info-icon">ⓘ</span>
                </label>
                <textarea
                  className="form-input"
                  rows="8"
                  placeholder="Step-by-step instructions..."
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <div className="button-container">
          <button className="save-button" onClick={handleSave}>
            {activeTab === 'Guide Steps' ? 'Submit' : 'Save'}
          </button>
        </div>
      </div>

      {/* Right side content */}
      <div className="side-panel">
        <div className="language-selector">English</div>

        <div className="guide-card">
          <div className="guide-card-body">
            <div className="guide-image-container">
              <img
                src={createguide}
                alt="Person repairing a computer"
                className="create-guide-image"
              />
            </div>

            <div className="guide-text">
              <p className="guide-heading">Create a repair guide!</p>
              <p>Help the world by sharing your repair knowledge.</p>

              <p className="guide-subheading">Need some coaching? Visit our wiki:</p>
              <a href="#" className="guide-link">Creating a Repair Guide</a>

              <p className="guide-subheading">Participate in other ways:</p>
              <a href="#" className="guide-link">Ways to Participate</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGuide;
