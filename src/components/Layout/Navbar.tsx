import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const shouldBeSolid = isScrolled || !isHome;

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full h-nav-height z-50 transition-all duration-300 ${shouldBeSolid ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)]' : 'bg-transparent'}`}>
      <div className="container flex justify-between items-center h-full">
        <Link to="/" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
            <img src="/logo.jpeg" alt="ACBC Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold mb-0 ${shouldBeSolid ? 'text-primary' : 'text-white'}`}>ACBC Ikom</h1>
            <span className={`text-xs font-body uppercase tracking-[1px] ${shouldBeSolid ? 'text-secondary' : 'text-secondary-light'}`}>Wisdom Through God's Word</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path} 
                className={`font-medium text-base relative transition-colors duration-300 pb-1 group
                  ${shouldBeSolid ? 'text-primary' : 'text-white'}
                `}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-300
                  ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}
                `}></span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link to="/admissions" className="btn btn-secondary">Apply Now</Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden bg-transparent border-none cursor-pointer ${shouldBeSolid ? 'text-primary' : 'text-white'}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`fixed top-nav-height left-0 w-full bg-white p-8 shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out z-[999] md:hidden ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-[150%]'}`}>
        <ul className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path}
                className={`text-xl font-medium block transition-colors duration-300 ${location.pathname === link.path ? 'text-secondary' : 'text-primary hover:text-secondary'}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="pt-4 border-t border-gray-100">
            <Link to="/admissions" className="btn btn-secondary block w-full text-center">Apply Now</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
