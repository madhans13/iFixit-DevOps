// Layout.jsx
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen"> {/* this is key! */}
      <Header />
      <main className="flex-grow">
        {!isHomePage && (
          <div className="container mx-auto px-4">
            <Breadcrumbs />
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
