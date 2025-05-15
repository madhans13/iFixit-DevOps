import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import '../componentStyles/Breadcrumbs.css';

const routeLabels = {
  '': 'Home',
  'login': 'Login',
  'join': 'Sign Up',
  'guides': 'Repair Guides',
  'store': 'Store',
  'profile': 'Profile',
  'settings': 'Settings',
  'verify-email': 'Email Verification',
  'reset-password': 'Reset Password',
  'create-guide': 'Create Guide',
  'edit-guide': 'Edit Guide',
  'phone-parts': 'Phone Parts',
  'laptop-parts': 'Laptop Parts',
  'phone-software': 'Phone Software',
  'laptop-software': 'Laptop Software',
  'screens': 'Screens',
  'batteries': 'Batteries',
  'chargers': 'Chargers',
  'keyboards': 'Keyboards',
  'motherboards': 'Motherboards',
  'cooling-fans': 'Cooling Fans',
  'touchpads': 'Touchpads',
  'display-cables': 'Display Cables',
  'fans': 'Fans',
  'usb-ports': 'USB Ports',
  'operating-systems': 'Operating Systems'
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  const breadcrumbs = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;
    const label = routeLabels[value] || value;

    // Handle dynamic routes (e.g., guide/:id)
    const isDynamic = !routeLabels[value];
    const displayLabel = isDynamic ? 
      decodeURIComponent(value)
        .replace(/-/g, ' ')
        .replace(/(^\w|\s\w)/g, letter => letter.toUpperCase()) : 
      label;

    return (
      <React.Fragment key={to}>
        <ChevronRight size={16} className="breadcrumb-separator" />
        <span className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
          {isLast ? (
            displayLabel
          ) : (
            <Link to={to}>{displayLabel}</Link>
          )}
        </span>
      </React.Fragment>
    );
  });

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      <div className="breadcrumb-item">
        <Link to="/" className="home-link">
          <Home size={16} />
          <span>Home</span>
        </Link>
      </div>
      {breadcrumbs}
    </nav>
  );
};

export default Breadcrumbs; 