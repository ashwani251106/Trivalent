import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="navbar-container max-width-wrapper">
        <div className="navbar-logo clickable">
          <img src={logo} alt="Trivalent Logo" />
          <span className="text-gradient font-display">Trivalent</span>
        </div>
        
        <div className="navbar-links">
          <a href="#about" className="nav-link clickable">About Us</a>
          <a href="#projects" className="nav-link clickable">Our Projects</a>
          <a href="#contact" className="btn-primary clickable" style={{ padding: '8px 24px' }}>Contact Us</a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
