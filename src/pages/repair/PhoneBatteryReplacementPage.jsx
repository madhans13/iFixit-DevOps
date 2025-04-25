import { useState } from 'react';
        import { Clock, AlertCircle, CheckCircle, Star, ThumbsUp, Eye, ChevronDown } from 'lucide-react';
        import './batteryreplacement.css';
        import img1 from '../../assets/screw.png';
        import img2 from '../../assets/single screw.png';
        import img3 from '../../assets/zoom.png';
        import img4 from '../../assets/unscrew.png';
        import img5 from '../../assets/unscrew2.png';
        import head from '../../assets/headimg.png';
        import tool1 from '../../assets/tools1.png';
        import tool2 from '../../assets/tools2.png';
        import authorAvatar from '../../assets/clay.png'; // Replace with the actual path to Clay's avatar
        import teamLogo from '../../assets/team.png'; // Replace with the actual path to the Guide Team logo

        export default function BatteryReplacement() {
          const [currentStep, setCurrentStep] = useState(1);

          // Separate state for images in each step
          const [currentImageStep1, setCurrentImageStep1] = useState(img1);
          const [currentImageStep2, setCurrentImageStep2] = useState(img4);
          const [currentImageStep3, setCurrentImageStep3] = useState(img1);
          const [currentImageStep4, setCurrentImageStep4] = useState(img1);
          const [currentImageStep5, setCurrentImageStep5] = useState(img1);
          const [currentImageStep6, setCurrentImageStep6] = useState(img1);
          const [currentImageStep7, setCurrentImageStep7] = useState(img1);
          const [currentImageStep8, setCurrentImageStep8] = useState(img1);
          const [currentImageStep9, setCurrentImageStep9] = useState(img1);

          return (
            <div className="battery-guide-container">
              {/* Navigation bar */}
              <div className="navigation">
                <div className="breadcrumbs">
                  <span>Home</span>
                  <span>›</span>
                  <span>PC</span>
                  <span>›</span>
                  <span>Laptop</span>
                  <span>›</span>
                  <span>Asus Laptop</span>
                  <span>›</span>
                  <span>Asus TUF Laptop</span>
                  <span>›</span>
                  <span className="breadcrumb-current">ASUS TUF Dash F15</span>
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
                <div className="guide-thumbnail">
                  <img src={head} alt="Laptop with open bottom case" />
                </div>
                <div className="guide-info">
                  <h1 className="guide-title">ASUS TUF Dash F15 Battery Replacement</h1>
                  <div className="contributor-info">
                    <img src={authorAvatar} alt="Clay Eickemeyer avatar" className="avatar" />
                    <div className="contributor-details">
                      <span className="contributor-name">Clay Eickemeyer</span> and one other contributor
                      <div className="update-date">Last updated on November 28, 2022</div>
                    </div>
                  </div>
                  <div className="guide-metadata">
                    <div className="time-estimate">
                      <Clock size={16} className="stat-icon" />
                      <span>15 - 30 minutes</span>
                    </div>
                    <div className="difficulty">
                      <span>Moderate</span>
                    </div>
                  </div>
                  <div className="stats">
                    <div className="stat">
                      <Eye size={16} className="stat-icon" />
                      <span>6.5K</span>
                    </div>
                    <div className="stat">
                      <ThumbsUp size={16} className="stat-icon" />
                      <span>2</span>
                    </div>
                    <div className="stat">
                      <CheckCircle size={16} className="stat-icon completed-icon" />
                      <span>2</span>
                    </div>
                    <div className="stat">
                      <Star size={16} className="stat-icon" />
                      <span>0</span>
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

                    <p className="intro-text">Use this guide to replace the battery in your ASUS TUF Dash F15.</p>
                    <p className="intro-text"><span className="safety-warning">For your safety, discharge the battery below 25% before disassembling your device.</span> This reduces the risk of fire if the battery is accidentally damaged during the repair. If your battery is swollen, <a href="#" className="link">take appropriate precautions</a>.</p>
                  </div>

                  <div className="parts-needed">
                    <h2 className="parts-title">What you need</h2>
                    <div className="parts-container">
                      <div className="part-item">
                        <div className="part-content">
                          <img src={tool1} alt="Opening picks" className="part-image" />
                          <div className="part-info">
                            <div className="part-name">1 x Opening Picks</div>
                            <div className="part-price">$4.99</div>
                            <div className="part-rating">
                              <Star size={16} className="filled" />
                              <Star size={16} className="filled" />
                              <Star size={16} className="filled" />
                              <Star size={16} className="filled" />
                              <Star size={16} className="filled" />
                              <span className="rating-score">4.8</span>
                            </div>
                          </div>
                          <button className="add-cart-button">
                            Add to cart
                          </button>
                        </div>
                      </div>

                      <div className="part-item">
                        <div className="part-content">
                          <img src={tool2} alt="Spudger" className="part-image" />
                          <div className="part-info">
                            <div className="part-name">Spudger</div>
                            <div className="part-price">$3.99 Fixite Carbon Fiber</div>
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
                            Add to cart
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
                    <h3 className="step-header">Step 1 <span className="step-subtitle">Unfasten the lower case</span></h3>
                    <div className="step-content">
                      <div className="main-image">
                        <img src={currentImageStep1} alt="Step 1 main image" />
                      </div>
                      <div className="step-details">
                        <div className="detail-images">
                          <img
                            src={img1}
                            alt="Detail view 1"
                            onMouseEnter={() => setCurrentImageStep1(img1)}
                            className={currentImageStep1 === img1 ? "active-detail" : ""}
                          />
                          <img
                            src={img2}
                            alt="Detail view 2"
                            onMouseEnter={() => setCurrentImageStep1(img2)}
                            className={currentImageStep1 === img2 ? "active-detail" : ""}
                          />
                          <img
                            src={img3}
                            alt="Detail view 3"
                            onMouseEnter={() => setCurrentImageStep1(img3)}
                            className={currentImageStep1 === img3 ? "active-detail" : ""}
                          />
                        </div>

                        <ul className="instructions">
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Remove the 14 Phillips screws securing the lower case:</span>
                          </li>
                          <li className="instruction-item sub-instruction">
                            <span className="bullet bullet-red"></span>
                            <span>Seven 8.8 mm screws</span>
                          </li>
                          <li className="instruction-item sub-instruction">
                            <span className="bullet bullet-orange"></span>
                            <span>Seven 10.1 mm screws</span>
                          </li>
                          <li className="instruction-item sub-instruction">
                            <span className="bullet bullet-yellow"></span>
                            <span>Use a Phillips screwdriver to loosen the captive screw.</span>
                          </li>
                          <li className="instruction-item">
                            <AlertCircle size={16} className="icon-alert" />
                            <span>Loosening this captive screw will pop up and separate the bottom-right corner of the back cover from the chassis.</span>
                          </li>
                          <li className="instruction-item">
                            <CheckCircle size={16} className="icon-check" />
                            <span>During reassembly, tighten the captive screw before the rest of the screws.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  {/* Step 2 - Insert an opening stack */}
                  <div className="step" id="step2">
                    <h3 className="step-header">Step 2 <span className="step-subtitle">Insert an opening stack</span></h3>
                    <div className="step-content">
                      <div className="main-image">
                        <img src={currentImageStep2} alt="Step 2 main image" />
                      </div>
                      <div className="step-details">
                        <div className="detail-images">
                          <img
                            src={img4}
                            alt="Detail view 1"
                            onMouseEnter={() => setCurrentImageStep2(img4)}
                            className={currentImageStep2 === img4 ? "active-detail" : ""}
                          />
                          <img
                            src={img5}
                            alt="Detail view 2"
                            onMouseEnter={() => setCurrentImageStep2(img5)}
                            className={currentImageStep2 === img5 ? "active-detail" : ""}
                          />
                        </div>

                        <ul className="instructions">
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Slide the pick along the front edge to release the clips securing the lower case.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Repeat this process along the perimeter of the lower case to release the remaining clips.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step3">
                    <h3 className="step-header">Step 3 <span className="step-subtitle">Release the Clip</span></h3>
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
                            src={img1}
                            alt="Detail view 1"
                            onMouseEnter={() => setCurrentImageStep3(img1)}
                            className={currentImageStep3 === img1 ? "active-detail" : ""}
                          />
                          <img
                            src={img2}
                            alt="Detail view 2"
                            onMouseEnter={() => setCurrentImageStep3(img2)}
                            className={currentImageStep3 === img2 ? "active-detail" : ""}
                          />
                          <img
                            src={img3}
                            alt="Detail view 3"
                            onMouseEnter={() => setCurrentImageStep3(img3)}
                            className={currentImageStep3 === img3 ? "active-detail" : ""}
                          />
                        </div>

                        <ul className="instructions">
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Slide the pick along the front edge to release the clips securing the lower case.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Repeat this process along the perimeter of the lower case to release the remaining clips.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step4">
                    <h3 className="step-header">Step 4 <span className="step-subtitle">Remove the lower case</span></h3>
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
                            src={img1}
                            alt="Detail view 1"
                            onMouseEnter={() => setCurrentImageStep4(img1)}
                            className={currentImageStep4 === img1 ? "active-detail" : ""}
                          />
                          <img
                            src={img2}
                            alt="Detail view 2"
                            onMouseEnter={() => setCurrentImageStep4(img2)}
                            className={currentImageStep4 === img2 ? "active-detail" : ""}
                          />
                          <img
                            src={img3}
                            alt="Detail view 3"
                            onMouseEnter={() => setCurrentImageStep4(img3)}
                            className={currentImageStep4 === img3 ? "active-detail" : ""}
                          />
                        </div>

                        <ul className="instructions">
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Slide the pick along the front edge to release the clips securing the lower case.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Repeat this process along the perimeter of the lower case to release the remaining clips.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step5">
                    <h3 className="step-header">Step 5 <span className="step-subtitle">Reposition the tape</span></h3>
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
                            src={img1}
                            alt="Detail view 1"
                            onMouseEnter={() => setCurrentImageStep5(img1)}
                            className={currentImageStep5 === img1 ? "active-detail" : ""}
                          />
                          <img
                            src={img2}
                            alt="Detail view 2"
                            onMouseEnter={() => setCurrentImageStep5(img2)}
                            className={currentImageStep5 === img2 ? "active-detail" : ""}
                          />
                          <img
                            src={img3}
                            alt="Detail view 3"
                            onMouseEnter={() => setCurrentImageStep5(img3)}
                            className={currentImageStep5 === img3 ? "active-detail" : ""}
                          />
                        </div>

                        <ul className="instructions">
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Slide the pick along the front edge to release the clips securing the lower case.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Repeat this process along the perimeter of the lower case to release the remaining clips.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step6">
                    <h3 className="step-header">Step 6 <span className="step-subtitle">Disconnect the locking bar</span></h3>
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
                            src={img1}
                            alt="Detail view 1"
                            onMouseEnter={() => setCurrentImageStep6(img1)}
                            className={currentImageStep6 === img1 ? "active-detail" : ""}
                          />
                          <img
                            src={img2}
                            alt="Detail view 2"
                            onMouseEnter={() => setCurrentImageStep6(img2)}
                            className={currentImageStep6 === img2
         ? "active-detail" : ""}
                          />
                          <img
                            src={img3}
                            alt="Detail view 3"
                            onMouseEnter={() => setCurrentImageStep6(img3)}
                            className={currentImageStep6 === img3 ? "active-detail" : ""}
                          />
                        </div>

                        <ul className="instructions">
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Slide the pick along the front edge to release the clips securing the lower case.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Repeat this process along the perimeter of the lower case to release the remaining clips.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step7">
                    <h3 className="step-header">Step 7 <span className="step-subtitle">Disconnect the battery</span></h3>
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
                            src={img1}
                            alt="Detail view 1"
                            onMouseEnter={() => setCurrentImageStep7(img1)}
                            className={currentImageStep7 === img1 ? "active-detail" : ""}
                          />
                          <img
                            src={img2}
                            alt="Detail view 2"
                            onMouseEnter={() => setCurrentImageStep7(img2)}
                            className={currentImageStep7 === img2 ? "active-detail" : ""}
                          />
                          <img
                            src={img3}
                            alt="Detail view 3"
                            onMouseEnter={() => setCurrentImageStep7(img3)}
                            className={currentImageStep7 === img3 ? "active-detail" : ""}
                          />
                        </div>

                        <ul className="instructions">
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Slide the pick along the front edge to release the clips securing the lower case.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Repeat this process along the perimeter of the lower case to release the remaining clips.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step8">
                    <h3 className="step-header">Step 8 <span className="step-subtitle">Unfasten the battery</span></h3>
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
                            src={img1}
                            alt="Detail view 1"
                            onMouseEnter={() => setCurrentImageStep8(img1)}
                            className={currentImageStep8 === img1 ? "active-detail" : ""}
                          />
                          <img
                            src={img2}
                            alt="Detail view 2"
                            onMouseEnter={() => setCurrentImageStep8(img2)}
                            className={currentImageStep8 === img2 ? "active-detail" : ""}
                          />
                          <img
                            src={img3}
                            alt="Detail view 3"
                            onMouseEnter={() => setCurrentImageStep8(img3)}
                            className={currentImageStep8 === img3 ? "active-detail" : ""}
                          />
                        </div>

                        <ul className="instructions">
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Slide the pick along the front edge to release the clips securing the lower case.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Repeat this process along the perimeter of the lower case to release the remaining clips.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step9">
                    <h3 className="step-header">Step 9 <span className="step-subtitle">Remove the battery</span></h3>
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
                            src={img1}
                            alt="Detail view 1"
                            onMouseEnter={() => setCurrentImageStep9(img1)}
                            className={currentImageStep9 === img1 ? "active-detail" : ""}
                          />
                          <img
                            src={img2}
                            alt="Detail view 2"
                            onMouseEnter={() => setCurrentImageStep9(img2)}
                            className={currentImageStep9 === img2 ? "active-detail" : ""}
                          />
                          <img
                            src={img3}
                            alt="Detail view 3"
                            onMouseEnter={() => setCurrentImageStep9(img3)}
                            className={currentImageStep9 === img3 ? "active-detail" : ""}
                          />
                        </div>

                        <ul className="instructions">
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Slide the pick along the front edge to release the clips securing the lower case.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Repeat this process along the perimeter of the lower case to release the remaining clips.</span>
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
                    <p>To reassemble your device, follow these instructions in reverse order.</p>
                    <p>For optimal performance, calibrate your newly installed battery after completing this guide.</p>
                    <p>Take your e-waste to an R2 or e-Stewards certified recycler.</p>
                    <p>Repair didn't go as planned? Try some basic troubleshooting, or ask our ASUS TUF laptop answers community for help.</p>
                    <button className="give-author-points">✔ Give the author +30 points!</button>
                    <p>2 other people completed this guide</p>
                </div>

                {/* Author and Team Information */}
                <div className="author-team-info">
                    <div className="author">
                        <h3>Author</h3>
                        <img src={authorAvatar} alt="Clay Eickemeyer avatar" className="author-avatar" />
                        <p>Clay Eickemeyer</p>
                        <p>Member since: 09/19/22</p>
                        <p>82,852 Reputation</p>
                        <p>455 Guides authored</p>
                        <div className="badges">
                            <span>Badges: 37</span>
                            <div className="badge-icons">
                                <img src="/api/placeholder/24/24" alt="Badge 1" /> {/* Replace with actual badge URLs */}
                                <img src="/api/placeholder/24/24" alt="Badge 2" />
                                <img src="/api/placeholder/24/24" alt="Badge 3" />
                                <span className="more-badges">+34 more badges</span>
                            </div>
                        </div>
                    </div>
                    <div className = "team">
                        <h3>Team</h3>
                         <div className="team-logo-container">
                            <img src={teamLogo} alt="Guide Team logo" className = "team-logo"/>
                         </div>
                        <p>Guide Team</p>
                        <p>Staff</p>
                        <p>9 Members</p>
                        <p><span className="team-name-label">GUIDE TEAM</span> 11,642 Guides authored</p>
                    </div>
                </div>

                {/* Guide Comments Section */}
                <div className="guide-comments">
                    <div className="comments-header">
                        <h3>0 Guide Comments</h3>
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
                    <p><a>👀 View Statistics:</a> Past 24 Hours: <span>10</span> | Past 7 Days: <span>58</span> | Past 30 Days: <span>285</span> | All Time: <span>6,486</span></p>
                </div>
            </div>
          );
        }