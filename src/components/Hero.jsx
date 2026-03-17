import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      // Calculate normalized mouse position from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section className="hero-section section-container" id="home">
      {/* Dynamic Background Elements */}
      <motion.div 
        className="hero-blob blob-1"
        style={{ 
          y: y1,
          x: isMobile ? 0 : mousePos.x * -50,
        }}
        animate={isMobile ? {} : {
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="hero-blob blob-2"
        style={{ 
          y: y2,
          x: isMobile ? 0 : mousePos.y * -50,
        }}
        animate={isMobile ? {} : {
          scale: [1, 1.5, 1],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="hero-content max-width-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ opacity }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span className="pulse-dot"></span>
            Building the Future
          </motion.div>
          
          <h1 className="hero-title">
            We are <span className="text-gradient hover-trigger">Trivalent</span>
          </h1>
        </motion.div>

        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ opacity }}
        >
          A collective of creative engineers forging high-performance,<br/> ultra-premium web experiences.
        </motion.p>

        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ opacity }}
        >
          <a href="#projects" className="btn-primary clickable">View Our Work</a>
          <a href="#about" className="btn-secondary clickable">Know Us</a>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
      >
        <span className="mouse"></span>
        <span className="text">Scroll Down</span>
      </motion.div>
    </section>
  );
};

export default Hero;
