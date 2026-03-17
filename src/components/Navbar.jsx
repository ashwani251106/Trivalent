import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants = {
    closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

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
        
        {/* Desktop Links */}
        <div className="navbar-links desktop-only">
          <a href="#about" className="nav-link clickable">About Us</a>
          <a href="#projects" className="nav-link clickable">Our Projects</a>
          <a href="#contact" className="btn-primary clickable" style={{ padding: '8px 24px' }}>Contact Us</a>
        </div>

        {/* Mobile Toggle */}
        <div className={`nav-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="mobile-menu-overlay glass-panel"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="mobile-menu-links">
                <a href="#home" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Home</a>
                <a href="#about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>About Us</a>
                <a href="#projects" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Our Projects</a>
                <a href="#contact" className="mobile-link btn-primary" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
