import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectModal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
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

  if (!project) return null;

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
            className="project-modal-content glass-panel"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close clickable" onClick={onClose}>&times;</button>
            
            <div className="project-modal-hero">
              <img src={project.imageUrl} alt={project.title} className="project-modal-image" />
              <div className="project-modal-gradient-overlay"></div>
              <h2 className="project-modal-title">{project.title}</h2>
            </div>
            
            <div className="project-modal-body">
              <div className="project-modal-main-info">
                <p className="project-modal-description">{project.detailedDescription || project.description}</p>
                
                {project.id === 1 && (
                  <div className="honorary-mention glass-panel" style={{ padding: '16px', borderLeft: '4px solid var(--accent-blue)', marginBottom: '30px', background: 'rgba(0, 229, 255, 0.05)' }}>
                    <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>🏆 Honorary Mention</span>
                    <p style={{ marginTop: '4px', fontStyle: 'italic', opacity: 0.8 }}>"Awarded Honorary Mention at the AI Impact Summit for innovation in recruitment technology."</p>
                  </div>
                )}
                
                <h3 className="project-modal-section-title">Core Technologies</h3>
                <div className="project-modal-tags">
                  {project.tags?.map((tag, i) => (
                    <span key={i} className="project-tag-large">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="project-modal-sidebar">
                <div className="project-stat-box glass-panel">
                  <h4>Role</h4>
                  <p>{project.role || "Full-stack Development"}</p>
                </div>
                <div className="project-stat-box glass-panel">
                  <h4>Timeline</h4>
                  <p>{project.timeline || "8 Weeks"}</p>
                </div>
                
                <div className="project-action-buttons">
                  <a href={project.liveUrl || "#"} className="btn-primary clickable" style={{ width: '100%', textAlign: 'center' }}>Live Demo</a>
                  <a href={project.githubUrl || "#"} className="btn-secondary clickable" style={{ width: '100%', textAlign: 'center', marginTop: '12px' }}>View Source</a>
                </div>
              </div>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
