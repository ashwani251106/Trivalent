import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import './Loader.css';

const Loader = ({ onLoadingComplete }) => {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2500); // 2.5 seconds loading
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="loader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="loader-content">
        <motion.div
          className="loader-logo-container"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
            filter: [
              "drop-shadow(0 0 10px rgba(0, 210, 255, 0.5))",
              "drop-shadow(0 0 30px rgba(255, 51, 102, 0.8))",
              "drop-shadow(0 0 10px rgba(0, 210, 255, 0.5))"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={logo} alt="Trivalent Logo" className="loader-logo" />
        </motion.div>
        
        <div className="loader-progress-bar">
          <motion.div 
            className="loader-progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "circOut" }}
          />
        </div>
        
        <motion.span 
          className="loader-text text-gradient-animated"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          INITIALIZING CORE...
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Loader;
