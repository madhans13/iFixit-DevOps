// components/Footer.jsx
import React from 'react';
import {
  Globe, Facebook, Instagram, Twitter, Youtube,
  Mail, MessageCircle, Music, Video, Rss
} from 'lucide-react';
import logo from '../assets/react.svg';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        {/* Same footer sections as in HomePage */}
        {/* ... (you can reuse your exact footer code here) */}
      </div>
      <div className="footer-bottom">
        <div className="help-translate">
          <a href="#">Help translate <Globe size={14} /></a>
        </div>
        <div className="social-links">
          <a href="#"><Facebook size={16} /></a>
          <a href="#"><Music size={16} /></a>
          <a href="#"><Instagram size={16} /></a>
          <a href="#"><Twitter size={16} /></a>
          <a href="#"><Youtube size={16} /></a>
          <a href="#"><Video size={16} /></a>
          <a href="#"><MessageCircle size={16} /></a>
          <a href="#"><Rss size={16} /></a>
          <a href="#">i</a>
          <a href="#"><Mail size={16} /></a>
        </div>
        <div className="ifixit-logo-bottom">
          <img src={logo} alt="iFixit Logo" />
          <p>Repair is noble</p>
        </div>
        <div className="copyright">
          © 2025 iFixit — Licensed under Creative Commons
        </div>
      </div>
    </footer>
  );
};

export default Footer;
