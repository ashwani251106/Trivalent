import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import ProjectModal from './ProjectModal';
import trivalentProjectImg from '../assets/project_trivalent.png';
import './Projects.css';

const projectsData = [
  {
    id: 1,
    title: "Trivalent Job Board",
    description: "AI-powered recruitment platform connecting seekers and employers with resume parsing and smart matching.",
    detailedDescription: "Trivalent is a comprehensive full-stack recruitment platform. It features AI-powered job recommendations, intelligent resume parsing using OpenAI, and a seamless application process for both seekers and companies. Awarded an Honorary Mention at the AI Impact Summit for its innovative use of machine learning in recruitment.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "OpenAI", "Tailwind"],
    imageUrl: trivalentProjectImg,
    accentColor: "#00e5ff",
    role: "Full-stack Platform",
    timeline: "Flagship Project",
    liveUrl: "#",
    githubUrl: "https://github.com/ayanbaruah14/Contest",
  }
];

const ProjectCard = ({ project, index, onClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [6, -6]);
  const rotateY = useTransform(mouseX, [-100, 100], [-6, 6]);
  const glowX = useTransform(mouseX, [-100, 100], [0, 200]);
  const glowY = useTransform(mouseY, [-100, 100], [0, 200]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <ScrollReveal delay={index * 0.2} direction="up">
      <motion.div
        className="project-card-new clickable"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(project)}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Spotlight Glow */}
        <motion.div
          className="card-spotlight"
          style={{
            background: `radial-gradient(300px circle at ${glowX}px ${glowY}px, ${project.accentColor}20, transparent 70%)`,
          }}
        />
        
        {/* Accent top border */}
        <div className="card-accent-border" style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }} />

        <div className="project-card-inner">
          <div className="project-card-image-wrap">
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              className="project-card-img"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5 }}
            />
            <div className="project-card-img-overlay" style={{ background: `linear-gradient(to top, #030305 0%, transparent 60%)` }} />
            
            {/* Animated tag number */}
            <div className="project-card-number" style={{ color: project.accentColor }}>
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>

          <div className="project-card-info">
            <div className="project-tags-row">
              {project.tags.slice(0, 3).map((t, i) => (
                <span key={i} className="project-tag" style={{ borderColor: `${project.accentColor}40`, color: project.accentColor }}>
                  {t}
                </span>
              ))}
            </div>
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-desc">{project.description}</p>
            <button className="project-card-cta clickable" style={{ color: project.accentColor, borderColor: `${project.accentColor}50` }}>
              Explore Project →
            </button>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="projects-section-new section-container" id="projects">
      <div className="max-width-wrapper">
        <ScrollReveal direction="down">
          <div className="section-header">
            <h2 className="section-title">Our <span className="text-gradient">Projects</span></h2>
            <p className="section-subtitle">Engineered with precision. Designed to inspire.</p>
          </div>
        </ScrollReveal>

        <div className="projects-grid-new">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
