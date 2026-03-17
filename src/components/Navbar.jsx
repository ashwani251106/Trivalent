import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
            <>
              {/* Backdrop */}
              <motion.div 
                className="mobile-menu-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />
              
              <motion.div 
                className="mobile-menu-overlay"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="mobile-menu-links">
                  {[
                    { href: "#home", text: "Home" },
                    { href: "#about", text: "About Us" },
                    { href: "#projects", text: "Our Projects" },
                    { href: "#contact", text: "Contact Us" }
                  ].map((link, i) => (
                    <motion.a
                      key={link.text}
                      href={link.href}
                      className="mobile-link"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + (i * 0.1) }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="link-text">{link.text}</span>
                      <ArrowRight size={18} className="link-icon" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
