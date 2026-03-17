import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProfileModal.css';

const ProfileModal = ({ profile, isOpen, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!profile) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="modal-content glass-panel"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close clickable" onClick={onClose}>&times;</button>
            
            <div className="modal-header">
              <div className="modal-image-container">
                 <div className="modal-image-bg"></div>
                 <img src={profile.imageUrl} alt={profile.name} className="modal-image" />
              </div>
              <div className="modal-title-area">
                <h2 className="modal-name">{profile.name}</h2>
                <div className="modal-role text-gradient">{profile.role}</div>
                <div className="modal-socials">
                  <a href={profile.links?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="social-icon clickable">Linkedin</a>
                  <a href={profile.links?.github || "#"} target="_blank" rel="noopener noreferrer" className="social-icon clickable">Github</a>
                </div>
              </div>
            </div>
            
            <div className="modal-body">
              <div className="modal-section">
                <h3>About</h3>
                <p className="modal-detailed-bio">{profile.detailedBio || profile.bio}</p>
              </div>

              <div className="modal-section">
                <h3>Tech Stack</h3>
                <div className="tech-stack-grid">
                  {profile.techStack?.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="modal-section">
                <h3>Key Expertise</h3>
                <ul className="expertise-list">
                  {profile.expertise?.map((exp, i) => (
                    <li key={i}>{exp}</li>
                  ))}
                </ul>
              </div>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
