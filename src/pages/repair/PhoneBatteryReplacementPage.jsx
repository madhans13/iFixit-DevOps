import { useState } from 'react';
        import { Clock, AlertCircle, CheckCircle, Star, ThumbsUp, Eye, ChevronDown } from 'lucide-react';
        import './batteryreplacement.css';
        import img1 from '../../assets/screw.png';
        import img2 from '../../assets/single screw.png';
        import img3 from '../../assets/zoom.png';
        import step1 from '../../assets/step1.png';
        import step2 from '../../assets/step2.png';
        import step3 from '../../assets/step3.png';
        import step4 from '../../assets/step4.png';
        import step5 from '../../assets/step5.png';
        import step6 from '../../assets/step6.png';
        import step7 from '../../assets/step7.png';
        import step8 from '../../assets/step8.png';
        import step9 from '../../assets/step9.png';
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
          const [currentImageStep1, setCurrentImageStep1] = useState(step1);
          const [currentImageStep2, setCurrentImageStep2] = useState(step2);
          const [currentImageStep3, setCurrentImageStep3] = useState(step3);
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
                  <span>Phone</span>
                  <span>›</span>
                  <span>OnePlus</span>
                  <span>›</span>
                  <span className="breadcrumb-current">OnePlus 9 5G</span>
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
                  <h1 className="guide-title">OnePlus 9 Battery Replacement</h1>
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

                    <p className="intro-text">Use this guide to replace the battery in your OnePlus 9 5G.

For your safety, discharge the battery below 25% before disassembling your phone. This reduces the risk of fire if the battery is accidentally damaged during the repair. If your battery is swollen, take appropriate precautions.

It isn't mandatory to remove the daughterboard cover and the interconnect cable in order to replace the battery. However, doing so reduces the risk of damaging surrounding components. If you're experienced in repairs and decide not to do so, deal with the interconnect cable like with the charging port cable in step 25 of this guide.

You'll need replacement adhesive for the battery and the rear glass in order to complete this repair.

Note: Retaining water resistance after the repair depends on how clean the mating surfaces are and how accurately the adhesive is reapplied. Your device will lose its factory-given IP (Ingress Protection) rating, however, only the T-Mobile versions of the OnePlus 9 5G offer an IP rating.</p>
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
                    <h3 className="step-header">Step 1 <span className="step-subtitle">Losen the Rear Glass</span></h3>
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
                            <span>Prepare an iOpener and apply it to the rear glass for at least three minutes to loosen the adhesive underneath.</span>
                          </li>
                          <li className="instruction-item">
                            <CheckCircle size={16} className="icon-check" />
                            <span>
                            A hair dryer, heat gun, or hot plate may also be used, but be careful not to overheat the phone—the display and internal battery are both susceptible to heat damage.</span>
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
                            src={step2}
                            alt="Detail view 1"
                            onMouseEnter={() => setCurrentImageStep2(step2)}
                            className={currentImageStep2 === step2 ? "active-detail" : ""}
                          />
                        </div>

                        <ul className="instructions">
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Apply a suction handle to the rear glass, as close to the bottom edge as possible.

</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Pull up on the suction handle with strong, steady force to create a gap between the glass and the frame.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Insert an opening pick into the gap.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step3">
                    <h3 className="step-header">Step 3 <span className="step-subtitle">Slice the bottom edge adhesive</span></h3>
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
                            <span>Slide the opening pick to the bottom right corner to slice the adhesive.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Leave the opening pick in place to prevent the adhesive from resealing.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step4">
                    <h3 className="step-header">Step 4 <span className="step-subtitle">Slice the left edge adhesive</span></h3>
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
                            <span>Insert a third opening pick underneath the bottom left corner of the rear glass.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Slide the opening pick along the left edge of your phone to slice the adhesive.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Leave the opening pick in the top left corner to prevent the adhesive from resealing.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step5">
                    <h3 className="step-header">Step 5 <span className="step-subtitle">Slice the top edge adhesive</span></h3>
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
                            <span>Insert a fourth opening pick underneath the top left corner of the rear glass.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>
                            Slide the opening pick along the top edge to slice the adhesive.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step6">
                    <h3 className="step-header">Step 6 <span className="step-subtitle">Slice the right edge adhesive</span></h3>
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
                            <span>Insert a fifth and final opening pick underneath the top right corner of the rear glass.</span>
                          </li>
                          <li className="instruction-item">
                            <span className="bullet bullet-red"></span>
                            <span>Slide the opening pick along the right edge of the back cover to slice the remaining adhesive.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step7">
                    <h3 className="step-header">Step 7 <span className="step-subtitle">Remove the rear glass
                    </span></h3>
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
                            <span>Remove the rear glass.</span>
                          </li>
                          
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step8">
                    <h3 className="step-header">Step 8 <span className="step-subtitle">Peel off the tape</span></h3>
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
                            <span>Use a pair of tweezers to carefully peel the bottom right corner of the charging coil tape off of the daughterboard cover.</span>
                          </li>
                          
                        </ul>
                      </div>
                    </div>
                    <div className="add-comment">
                      <span>Add a comment</span>
                    </div>
                  </div>

                  <div className="step" id="step9">
                    <h3 className="step-header">Step 9 <span className="step-subtitle">Remove the interconnect cable</span></h3>
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
                            <span>Use a pair of tweezers or your fingers to remove the interconnect cable.</span>
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
                    <p>During reassembly, apply new adhesive where it's necessary after cleaning the relevant areas with isopropyl alcohol.</p>
                    <p>For optimal performance, calibrate your newly installed battery after completing this guide.</p>
                    <p>Take your e-waste to an R2 or e-Stewards certified recycler.</p>
                    <p>Repair didn’t go as planned? Try some basic troubleshooting, or ask our OnePlus 9 5G answers community for help.</p>
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