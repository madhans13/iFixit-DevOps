import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  BarChart, 
  Bookmark, 
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  ChevronLeft,
  Printer,
  Video,
  Image
} from 'lucide-react';
import '../componentStyles/InteractiveGuide.css';

const InteractiveGuide = ({ guide, onProgress, onBookmark }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Load saved progress
    const savedProgress = localStorage.getItem(`guide-progress-${guide.id}`);
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    }
    
    // Load bookmark status
    const bookmarkStatus = localStorage.getItem(`guide-bookmark-${guide.id}`);
    setIsBookmarked(bookmarkStatus === 'true');
  }, [guide.id]);

  const handleStepComplete = (stepIndex) => {
    const newCompletedSteps = [...completedSteps];
    if (!newCompletedSteps.includes(stepIndex)) {
      newCompletedSteps.push(stepIndex);
      setCompletedSteps(newCompletedSteps);
      localStorage.setItem(`guide-progress-${guide.id}`, JSON.stringify(newCompletedSteps));
      onProgress && onProgress(newCompletedSteps.length / guide.steps.length * 100);
    }
  };

  const toggleBookmark = () => {
    const newStatus = !isBookmarked;
    setIsBookmarked(newStatus);
    localStorage.setItem(`guide-bookmark-${guide.id}`, newStatus);
    onBookmark && onBookmark(newStatus);
  };

  const handlePrint = () => {
    window.print();
  };

  const navigateStep = (direction) => {
    const newStep = currentStep + direction;
    if (newStep >= 0 && newStep < guide.steps.length) {
      setCurrentStep(newStep);
    }
  };

  return (
    <div className="interactive-guide">
      <div className="guide-header">
        <h1>{guide.title}</h1>
        
        <div className="guide-meta">
          <div className="meta-item">
            <Clock size={20} />
            <span>{guide.duration} mins</span>
          </div>
          <div className="meta-item">
            <BarChart size={20} />
            <span>{guide.difficulty}</span>
          </div>
          <button 
            className={`bookmark-button ${isBookmarked ? 'active' : ''}`}
            onClick={toggleBookmark}
          >
            {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
          <button className="print-button" onClick={handlePrint}>
            <Printer size={20} />
          </button>
        </div>

        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${(completedSteps.length / guide.steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="guide-content">
        <div className="step-navigation">
          <button 
            onClick={() => navigateStep(-1)}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={20} />
          </button>
          <span>Step {currentStep + 1} of {guide.steps.length}</span>
          <button 
            onClick={() => navigateStep(1)}
            disabled={currentStep === guide.steps.length - 1}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="step-content">
          <h2>{guide.steps[currentStep].title}</h2>
          
          <div className="media-toggle">
            <button 
              className={!showVideo ? 'active' : ''}
              onClick={() => setShowVideo(false)}
            >
              <Image size={20} /> Photos
            </button>
            <button 
              className={showVideo ? 'active' : ''}
              onClick={() => setShowVideo(true)}
            >
              <Video size={20} /> Video
            </button>
          </div>

          <div className="media-content">
            {showVideo ? (
              <video 
                src={guide.steps[currentStep].video} 
                controls 
                className="step-video"
              />
            ) : (
              <img 
                src={guide.steps[currentStep].image} 
                alt={guide.steps[currentStep].title}
                className="step-image"
              />
            )}
          </div>

          <div className="step-instructions">
            <p>{guide.steps[currentStep].instructions}</p>
            
            <div className="step-tips">
              <h3>Tips</h3>
              <ul>
                {guide.steps[currentStep].tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="step-tools">
              <h3>Required Tools</h3>
              <ul>
                {guide.steps[currentStep].tools.map((tool, index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="step-completion">
            <button 
              className={`complete-button ${completedSteps.includes(currentStep) ? 'completed' : ''}`}
              onClick={() => handleStepComplete(currentStep)}
            >
              {completedSteps.includes(currentStep) ? 'Completed' : 'Mark as Complete'}
            </button>

            <div className="step-feedback">
              <p>Was this step helpful?</p>
              <div className="feedback-buttons">
                <button>
                  <ThumbsUp size={20} />
                </button>
                <button>
                  <ThumbsDown size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGuide; 