import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Use springs for ultra-smooth trailing effect
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  
  const dotSpringConfig = { damping: 40, stiffness: 400, mass: 0.1 };
  const dotX = useSpring(0, dotSpringConfig);
  const dotY = useSpring(0, dotSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (
        e.target && (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('clickable') ||
        e.target.closest('.clickable')
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  if (mousePos.x === 0 && mousePos.y === 0) return null;

  return (
    <>
      <motion.div
        className="cursor-dot-new"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="cursor-outline-new"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(0, 210, 255, 0.1)" : "transparent",
          borderColor: isHovering ? "var(--accent-blue)" : "var(--accent-red)",
          borderWidth: isHovering ? "1px" : "2px"
        }}
        transition={{ duration: 0.2 }}
      >
        {isHovering && <span className="cursor-text">View</span>}
      </motion.div>
    </>
  );
};

export default CustomCursor;
