import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../componentStyles/GuideDetail.css';
import { Clock, AlertCircle, CheckCircle, Star, ThumbsUp, Eye, ChevronDown } from 'lucide-react';
import defaultImage from '../assets/battery.jpg';

const GuideDetail = () => {
  const { guideId } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImages, setCurrentImages] = useState({});

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/guides/${guideId}`);
        console.log('Fetched guide data:', response.data); // Debug log
        setGuide(response.data);
        
        // Initialize current images for each step
        const initialImages = {};
        response.data.steps.forEach((step, index) => {
          if (step.images && step.images.length > 0) {
            // Store the full image URL
            const imageUrl = step.images[0].url;
            console.log(`Step ${index + 1} image URL:`, imageUrl); // Debug log
            initialImages[index] = imageUrl;
          }
        });
        setCurrentImages(initialImages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching guide:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGuide();
  }, [guideId]);

  const handleImageChange = (stepIndex, imageUrl) => {
    console.log('Changing image for step', stepIndex, 'to:', imageUrl); // Debug log
    setCurrentImages(prev => ({
      ...prev,
      [stepIndex]: imageUrl
    }));
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      console.log('No image URL provided, using default image'); // Debug log
      return defaultImage;
    }
    
    // If it's already a full URL, use it as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // Construct the full URL for uploaded images
    const fullUrl = `http://localhost:5000/uploads/${imageUrl}`;
    console.log('Constructed image URL:', fullUrl); // Debug log
    return fullUrl;
  };

  if (loading) {
    return <div className="guide-detail-loading">Loading...</div>;
  }

  if (error) {
    return <div className="guide-detail-error">Error: {error}</div>;
  }

  if (!guide) {
    return <div className="guide-detail-not-found">Guide not found</div>;
  }

  const difficultyText = {
    1: 'Easy',
    2: 'Moderate',
    3: 'Difficult',
    4: 'Expert'
  }[guide.difficulty] || 'Unknown';

  const difficultyColor = {
    1: 'easy',
    2: 'moderate',
    3: 'difficult',
    4: 'expert'
  }[guide.difficulty] || '';

  return (
    <div className="guide-detail-container">
      {/* Navigation bar */}
      <div className="navigation">
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/guides">Guides</Link>
          <span>›</span>
          <Link to={`/devices/${guide.device?.brand.toLowerCase()}`}>{guide.device?.brand}</Link>
          <span>›</span>
          <span className="breadcrumb-current">{guide.device?.name}</span>
        </div>
        <div className="nav-tabs">
          <button className="nav-tab">Parts</button>
          <button className="nav-tab active">Guides</button>
          <button className="nav-tab">Answers</button>
          <button className="edit-button">
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* Guide header */}
      <div className="guide-header">
        <div className="guide-info">
          <h1 className="guide-title">{guide.title}</h1>
          <div className="contributor-info">
            <div className="contributor-details">
              <span className="contributor-name">By {guide.author?.username}</span>
              <div className="update-date">
                Last updated on {new Date(guide.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
          <div className="guide-metadata">
            <div className="time-estimate">
              <Clock size={16} className="stat-icon" />
              <span>{guide.timeRequired?.value} {guide.timeRequired?.unit}</span>
            </div>
            <div className={`difficulty ${difficultyColor}`}>
              <span>{difficultyText}</span>
            </div>
          </div>
          <div className="stats">
            <div className="stat">
              <Eye size={16} className="stat-icon" />
              <span>{guide.views}</span>
            </div>
            <div className="stat">
              <ThumbsUp size={16} className="stat-icon" />
              <span>{guide.likes || 0}</span>
            </div>
            <div className="stat">
              <CheckCircle size={16} className="stat-icon completed-icon" />
              <span>{guide.completions || 0}</span>
            </div>
            <div className="stat">
              <Star size={16} className="stat-icon" />
              <span>{guide.favorites || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="introduction-section">
          <div className="guide-steps">
            <div className="introduction-header">
              <h2 className="intro-title">
                Introduction <a href="#step1" className="step-link">Go to step 1 <ChevronDown size={16} className="inline" /></a>
              </h2>
            </div>

            <div className="intro-text">
              {guide.introduction}
            </div>
          </div>

          <div className="parts-needed">
            <h2 className="parts-title">What you need</h2>
            <div className="parts-container">
              {guide.prerequisites?.map((item, index) => (
                <div key={index} className="part-item">
                  <div className="part-content">
                    <div className="part-info">
                      <div className="part-name">{item}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="steps-container">
          {guide.steps?.map((step, stepIndex) => (
            <div key={stepIndex} className="step" id={`step${stepIndex + 1}`}>
              <h3 className="step-header">
                Step {stepIndex + 1}: {step.title}
              </h3>
              <div className="step-content">
                <div className="step-media">
                  <div className="main-image">
                    {step.images?.length > 0 && (
                      <img
                        src={getImageUrl(currentImages[stepIndex])}
                        alt={`Step ${stepIndex + 1} main image`}
                        onError={(e) => {
                          console.error('Image load error:', e);
                          e.target.onerror = null;
                          e.target.src = defaultImage;
                        }}
                      />
                    )}
                  </div>
                  {step.images?.length > 1 && (
                    <div className="thumbnail-strip">
                      {step.images.map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={getImageUrl(image.url)}
                          alt={`Thumbnail ${imgIndex + 1}`}
                          className={currentImages[stepIndex] === image.url ? "active" : ""}
                          onClick={() => handleImageChange(stepIndex, image.url)}
                          onError={(e) => {
                            console.error('Thumbnail load error:', e);
                            e.target.onerror = null;
                            e.target.src = defaultImage;
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="step-instructions">
                  <p className="step-description">{step.description}</p>
                  {step.warnings?.length > 0 && (
                    <div className="warnings">
                      {step.warnings.map((warning, idx) => (
                        <div key={idx} className="warning">
                          <AlertCircle size={16} className="warning-icon" />
                          <span>{warning}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {step.tips?.length > 0 && (
                    <div className="tips">
                      {step.tips.map((tip, idx) => (
                        <div key={idx} className="tip">
                          <CheckCircle size={16} className="tip-icon" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="step-comments">
                <button className="add-comment-btn">Add a comment</button>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion Section */}
        <div className="conclusion-section">
          <h2 className="conclusion-title">Conclusion</h2>
          <p>To reassemble your device, follow these instructions in reverse order.</p>
          <p>During reassembly, apply new adhesive where it's necessary after cleaning the relevant areas with isopropyl alcohol.</p>
          <p>For optimal performance, calibrate your newly installed battery after completing this guide.</p>
          <p>Take your e-waste to an R2 or e-Stewards certified recycler.</p>
          <button className="give-author-points">✔ Give the author points!</button>
        </div>

        {/* Guide Comments Section */}
        <div className="guide-comments">
          <div className="comments-header">
            <h3>0 Guide Comments</h3>
            <button className="add-comment-button">💬 Add a comment</button>
          </div>
        </div>

        {/* View Statistics Section */}
        <div className="view-statistics">
          <p>
            <a>👀 View Statistics:</a> Past 24 Hours: <span>0</span> | 
            Past 7 Days: <span>0</span> | 
            Past 30 Days: <span>0</span> | 
            All Time: <span>{guide.views}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideDetail; 