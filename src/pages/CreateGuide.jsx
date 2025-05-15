import React, { useState } from 'react';
import '../componentStyles/CreateGuide.css';
import '../componentStyles/SubmissionSuccess.css';
import createguide from '../../src/assets/create-guide.jpg';
import { Upload, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SubmissionSuccess from '../components/SubmissionSuccess';
import { useToast } from '../context/ToastContext';
import { FormField } from '../components/FormValidation';

const CreateGuide = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('Introduction');
  const [guideType, setGuideType] = useState('Technique');
  const [device, setDevice] = useState('');
  const [title, setTitle] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [difficulty, setDifficulty] = useState('Moderate');
  const [timeRequired, setTimeRequired] = useState('');
  const [tools, setTools] = useState([]);
  const [parts, setParts] = useState([]);
  const [details, setDetails] = useState('');
  const [steps, setSteps] = useState([
    { title: '', description: '', images: [], warnings: [], notes: [] }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedGuide, setSavedGuide] = useState(null);
  const [errors, setErrors] = useState({});

  const handleAddStep = () => {
    setSteps([...steps, { title: '', description: '', images: [], warnings: [], notes: [] }]);
  };

  const handleRemoveStep = (stepIndex) => {
    const newSteps = steps.filter((_, index) => index !== stepIndex);
    setSteps(newSteps);
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const handleAddWarning = (stepIndex) => {
    const newSteps = [...steps];
    newSteps[stepIndex].warnings.push('');
    setSteps(newSteps);
  };

  const handleAddNote = (stepIndex) => {
    const newSteps = [...steps];
    newSteps[stepIndex].notes.push('');
    setSteps(newSteps);
  };

  const handleWarningChange = (stepIndex, warningIndex, value) => {
    const newSteps = [...steps];
    newSteps[stepIndex].warnings[warningIndex] = value;
    setSteps(newSteps);
  };

  const handleNoteChange = (stepIndex, noteIndex, value) => {
    const newSteps = [...steps];
    newSteps[stepIndex].notes[noteIndex] = value;
    setSteps(newSteps);
  };

  const handleAddTool = () => {
    setTools([...tools, { name: '', link: '' }]);
  };

  const handleAddPart = () => {
    setParts([...parts, { name: '', link: '' }]);
  };

  const handleToolChange = (index, field, value) => {
    const newTools = [...tools];
    newTools[index][field] = value;
    setTools(newTools);
  };

  const handlePartChange = (index, field, value) => {
    const newParts = [...parts];
    newParts[index][field] = value;
    setParts(newParts);
  };

  const handleImageUpload = (stepIndex, files) => {
    const newSteps = [...steps];
    const images = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    newSteps[stepIndex].images = [...newSteps[stepIndex].images, ...images];
    setSteps(newSteps);
  };

  const removeImage = (stepIndex, imageIndex) => {
    const newSteps = [...steps];
    URL.revokeObjectURL(newSteps[stepIndex].images[imageIndex].preview);
    newSteps[stepIndex].images.splice(imageIndex, 1);
    setSteps(newSteps);
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeTab === 'Introduction') {
      if (!guideType) newErrors.guideType = 'Please select a guide type';
      if (!device) newErrors.device = 'Please enter a device';
      if (!title) newErrors.title = 'Please enter a title';
      if (!difficulty) newErrors.difficulty = 'Please select a difficulty level';
      if (!timeRequired) newErrors.timeRequired = 'Please enter the time required';
    }

    if (activeTab === 'Tools & Parts') {
      if (tools.length === 0) newErrors.tools = 'Please add at least one tool';
      if (parts.length === 0) newErrors.parts = 'Please add at least one part';
    }

    if (activeTab === 'Details') {
      if (!details) newErrors.details = 'Please provide guide details';
    }

    if (activeTab === 'Guide Steps') {
      const stepErrors = steps.map((step, index) => {
        const stepError = {};
        if (!step.title) stepError.title = 'Step title is required';
        if (!step.description) stepError.description = 'Step description is required';
        if (step.images.length === 0) stepError.images = 'At least one image is required';
        return stepError;
      });

      if (stepErrors.some(error => Object.keys(error).length > 0)) {
        newErrors.steps = stepErrors;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (activeTab === 'Guide Steps') {
      handleSubmit();
    } else {
      const nextTab = {
        'Introduction': 'Tools & Parts',
        'Tools & Parts': 'Details',
        'Details': 'Guide Steps'
      }[activeTab];
      setActiveTab(nextTab);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showToast('Please log in to submit a guide', 'error');
        navigate('/login');
        return;
      }

      const formData = new FormData();
      
      // Map guideType to category
      const categoryMap = {
        'Technique': 'maintenance',
        'Replacement': 'repair',
        'Repair': 'repair'
      };
      
      formData.append('category', categoryMap[guideType]);
      formData.append('title', title);
      formData.append('difficulty', difficulty === 'Easy' ? 1 : 
                                  difficulty === 'Moderate' ? 2 : 
                                  difficulty === 'Difficult' ? 3 : 4);
      formData.append('timeRequired', JSON.stringify({
        value: parseInt(timeRequired),
        unit: 'minutes'
      }));
      formData.append('introduction', details);
      formData.append('status', 'published');

      // Add device information
      const deviceParts = device.trim().split(' ');
      const deviceBrand = deviceParts[0] || '';
      const deviceName = deviceParts.slice(1).join(' ').trim();

      if (!deviceBrand || !deviceName) {
        alert('Please enter a valid device in the format "Brand Model" (e.g., "Apple iPhone 13")');
        return;
      }

      formData.append('deviceBrand', deviceBrand);
      formData.append('deviceName', deviceName);

      // Format steps data
      const formattedSteps = steps.map((step, index) => ({
        order: index + 1,
        title: step.title,
        description: step.description,
        warnings: step.warnings.filter(w => w.trim() !== ''),
        tips: step.notes.filter(n => n.trim() !== ''),
        images: step.images.map((img, idx) => ({
          url: `step_${index}_image_${idx}`,
          caption: `Step ${index + 1} image ${idx + 1}`
        }))
      }));

      formData.append('steps', JSON.stringify(formattedSteps));
      
      // For now, we'll send tools and parts as prerequisites
      formData.append('prerequisites', JSON.stringify([
        ...tools.map(tool => tool.name).filter(name => name.trim() !== ''),
        ...parts.map(part => part.name).filter(name => name.trim() !== '')
      ]));

      // Append all images
      let imageCount = 0;
      steps.forEach((step, stepIndex) => {
        step.images.forEach((image, imageIndex) => {
          formData.append('images', image.file);
          imageCount++;
        });
      });

      if (imageCount === 0) {
        alert('Please add at least one image to your guide');
        return;
      }

      console.log('Submitting guide with token:', token);
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, ':', value);
      }

      const response = await fetch('http://localhost:5000/api/guides', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 401) {
          showToast('Your session has expired. Please log in again.', 'error');
          navigate('/login');
          return;
        }
        throw new Error(`Failed to submit guide: ${response.status} - ${errorText}`);
      }

      const savedGuideData = await response.json();
      console.log('Guide saved successfully:', savedGuideData);
      
      setSavedGuide(savedGuideData);
      setShowSuccess(true);
      showToast('Guide created successfully!', 'success');

    } catch (error) {
      console.error('Error submitting guide:', error);
      showToast('Failed to submit guide. Please try again.', 'error');
    }
  };

  const handleTabChange = (tab) => {
    if (tab === 'Tools & Parts' && (!guideType || !device || !title || !difficulty || !timeRequired)) {
      alert('Please fill out all fields in the Introduction tab before proceeding.');
      return;
    }
    if (tab === 'Details' && (tools.length === 0 || parts.length === 0)) {
      alert('Please add at least one tool and one part before proceeding.');
      return;
    }
    if (tab === 'Guide Steps' && !details) {
      alert('Please fill out the details before proceeding.');
      return;
    }
    setActiveTab(tab);
  };

  if (showSuccess && savedGuide) {
    return <SubmissionSuccess guideId={savedGuide._id} title={savedGuide.title} />;
  }

  return (
    <div className="page-container">
      <div className="guide-form-container">
        <h1>Create a Repair Guide</h1>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'Introduction' ? 'active' : ''}`}
            onClick={() => handleTabChange('Introduction')}
          >
            Introduction
          </button>
          <button
            className={`tab ${activeTab === 'Tools & Parts' ? 'active' : ''}`}
            onClick={() => handleTabChange('Tools & Parts')}
          >
            Tools & Parts
          </button>
          <button
            className={`tab ${activeTab === 'Details' ? 'active' : ''}`}
            onClick={() => handleTabChange('Details')}
          >
            Details
          </button>
          <button
            className={`tab ${activeTab === 'Guide Steps' ? 'active' : ''}`}
            onClick={() => handleTabChange('Guide Steps')}
          >
            Guide Steps
          </button>
        </div>

        <div className="form-section">
          {activeTab === 'Introduction' && (
            <>
              <FormField
                label="Guide Type"
                error={errors.guideType}
              >
                <select
                  className="form-input"
                  value={guideType}
                  onChange={(e) => setGuideType(e.target.value)}
                >
                  <option value="Technique">Technique</option>
                  <option value="Replacement">Replacement</option>
                  <option value="Repair">Repair</option>
                </select>
              </FormField>

              <FormField
                label="Device"
                error={errors.device}
              >
                <input
                  className="form-input"
                  type="text"
                  placeholder="Example: 2001-2005 Honda Civic"
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                />
              </FormField>

              <FormField
                label="Title"
                error={errors.title}
              >
                <input
                  className="form-input"
                  type="text"
                  placeholder="Example: Battery Replacement"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormField>

              <FormField
                label="Difficulty Level"
                error={errors.difficulty}
              >
                <select
                  className="form-input"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Difficult">Difficult</option>
                  <option value="Expert">Expert</option>
                </select>
              </FormField>

              <FormField
                label="Time Required"
                error={errors.timeRequired}
              >
                <input
                  className="form-input"
                  type="text"
                  placeholder="Example: 30-45 minutes"
                  value={timeRequired}
                  onChange={(e) => setTimeRequired(e.target.value)}
                />
              </FormField>
            </>
          )}

          {activeTab === 'Tools & Parts' && (
            <>
              <FormField
                label="Tools Required"
                error={errors.tools}
              >
                {tools.map((tool, index) => (
                  <div key={index} className="tool-input-group">
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Tool name"
                      value={tool.name}
                      onChange={(e) => handleToolChange(index, 'name', e.target.value)}
                    />
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Link to buy (optional)"
                      value={tool.link}
                      onChange={(e) => handleToolChange(index, 'link', e.target.value)}
                    />
                  </div>
                ))}
                <button className="add-button" onClick={handleAddTool}>Add Tool</button>
              </FormField>

              <FormField
                label="Parts Required"
                error={errors.parts}
              >
                {parts.map((part, index) => (
                  <div key={index} className="part-input-group">
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Part name"
                      value={part.name}
                      onChange={(e) => handlePartChange(index, 'name', e.target.value)}
                    />
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Link to buy (optional)"
                      value={part.link}
                      onChange={(e) => handlePartChange(index, 'link', e.target.value)}
                    />
                  </div>
                ))}
                <button className="add-button" onClick={handleAddPart}>Add Part</button>
              </FormField>
            </>
          )}

          {activeTab === 'Details' && (
            <FormField
              label="Introduction & Overview"
              error={errors.details}
            >
              <textarea
                className="form-input"
                rows="6"
                placeholder="Provide a detailed overview of the repair process, including any important warnings or prerequisites..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </FormField>
          )}

          {activeTab === 'Guide Steps' && (
            <>
              {steps.map((step, stepIndex) => (
                <div key={stepIndex} className="step-container">
                  <div className="step-header">
                    <h3>Step {stepIndex + 1}</h3>
                    {steps.length > 1 && (
                      <button
                        className="remove-step-button"
                        onClick={() => handleRemoveStep(stepIndex)}
                        title="Remove this step"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  
                  <FormField
                    label="Step Title"
                    error={errors.steps?.[stepIndex]?.title}
                  >
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Brief title for this step"
                      value={step.title}
                      onChange={(e) => handleStepChange(stepIndex, 'title', e.target.value)}
                    />
                  </FormField>

                  <FormField
                    label="Step Description"
                    error={errors.steps?.[stepIndex]?.description}
                  >
                    <textarea
                      className="form-input"
                      rows="4"
                      placeholder="Detailed instructions for this step..."
                      value={step.description}
                      onChange={(e) => handleStepChange(stepIndex, 'description', e.target.value)}
                    />
                  </FormField>

                  <FormField
                    label="Images"
                    error={errors.steps?.[stepIndex]?.images}
                  >
                    <div className="image-upload-container">
                      <label className="image-upload-button">
                        <Upload size={24} />
                        <span>Upload Images</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(stepIndex, e.target.files)}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <div className="image-preview-container">
                        {step.images.map((image, imageIndex) => (
                          <div key={imageIndex} className="image-preview">
                            <img src={image.preview} alt={`Step ${stepIndex + 1} preview ${imageIndex + 1}`} />
                            <button
                              className="remove-image"
                              onClick={() => removeImage(stepIndex, imageIndex)}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FormField>

                  <div className="form-group">
                    <label className="form-label">Warnings</label>
                    {step.warnings.map((warning, warningIndex) => (
                      <input
                        key={warningIndex}
                        className="form-input"
                        type="text"
                        placeholder="Add a warning or caution for this step"
                        value={warning}
                        onChange={(e) => handleWarningChange(stepIndex, warningIndex, e.target.value)}
                      />
                    ))}
                    <button className="add-button" onClick={() => handleAddWarning(stepIndex)}>
                      Add Warning
                    </button>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Notes</label>
                    {step.notes.map((note, noteIndex) => (
                      <input
                        key={noteIndex}
                        className="form-input"
                        type="text"
                        placeholder="Add a helpful note for this step"
                        value={note}
                        onChange={(e) => handleNoteChange(stepIndex, noteIndex, e.target.value)}
                      />
                    ))}
                    <button className="add-button" onClick={() => handleAddNote(stepIndex)}>
                      Add Note
                    </button>
                  </div>
                </div>
              ))}
              <button className="add-step-button" onClick={handleAddStep}>
                Add Step
              </button>
            </>
          )}
        </div>

        <div className="button-container">
          <button className="save-button" onClick={handleSave}>
            {activeTab === 'Guide Steps' ? 'Submit Guide' : 'Next'}
          </button>
        </div>
      </div>

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

              <p className="guide-subheading">Tips for a great guide:</p>
              <ul className="guide-tips">
                <li>Take clear, well-lit photos</li>
                <li>Write detailed, step-by-step instructions</li>
                <li>Include warnings for tricky steps</li>
                <li>List all required tools and parts</li>
                <li>Add helpful notes and tips</li>
              </ul>

              <p className="guide-subheading">Need help?</p>
              <a href="#" className="guide-link">Guide Creation Tips</a>
              <a href="#" className="guide-link">Photography Guidelines</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGuide;
