import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import ProfileModal from './ProfileModal';
import ayushmanPhoto from '../assets/ayushman.jpg';
import ashwaniPhoto from '../assets/ashwani.jpg';
import ayanPhoto from '../assets/ayan.jpg';
import './KnowUs.css';

const ProfileCard = ({ profile, delay, onClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    if (isMobile) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <ScrollReveal delay={delay} direction="up" className="profile-wrapper">
      <div
        className="profile-card glass-panel clickable"
        onMouseMove={handleMouseMove}
        onClick={() => onClick(profile)}
      >
        {!isMobile && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 card-glow"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  400px circle at ${mouseX}px ${mouseY}px,
                  rgba(0, 210, 255, 0.15),
                  transparent 80%
                )
              `,
            }}
          />
        )}
        <div className="card-content">
          <div className="profile-image-container">
            <div className="profile-image-bg"></div>
            <img src={profile.imageUrl} alt={profile.name} className="profile-image" style={{ objectPosition: profile.imagePosition || 'center top' }} />
          </div>
          <h3 className="profile-name">{profile.name}</h3>
          <p className="profile-role text-gradient">{profile.role}</p>
          <p className="profile-bio">{profile.bio}</p>

          <div className="profile-cta mt-auto">
            <span className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>View Profile</span>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const KnowUs = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const team = [
    {
      id: 1,
      name: "Ayushman Singh Chauhan",
      role: "Backend and Security Expert",
      bio: "Master of scalable backend systems and robust API integrations. Shaping the data flows that power Trivalent.",
      detailedBio: "I architect the core infrastructure and immersive interfaces that allow modern applications to scale seamlessly. With a deep background in distributed systems and cloud orchestration, I bridge the gap between high-performance dicks and my ass plus frontend experiences and bulletproof back services. By optimizing complex database architectures and streamlining DevOps pipelines, I ensure every product is built for maximum speed, security, and global elasticity.",
      techStack: ["Node.js", "Python", "SQL", "PostgreSQL", "MongoDB", "Kubernetes", "GraphQL", "nextjs", "Docker", "AWS", "MERN Stack", "Three.js"],
      expertise: ["System Architecture", "Database Modeling", "Performance Optimization", "API Design"],
      imageUrl: ayushmanPhoto,
      links: { linkedin: "https://www.linkedin.com/in/ayushman-singh-chauhan-6a52b8320/", github: "https://github.com/iXION82" }
    },
    {
      id: 2,
      name: "Ayan Baruah",
      role: "Lead Backend Architect",
      bio: "Translates abstract concepts into breathtaking, intuitive user experiences that captivate and engage.",
      detailedBio: "I architect the high-performance engines and distributed systems that power modern applications. My focus is on building scalable server-side logic, optimizing complex database architectures, and ensuring rock-solid security. From API orchestration to cloud infrastructure, I design invisible yet essential systems that remain fast and stable under heavy load.",
      techStack: ["Node.js", "Python", "SQL", "PostgreSQL", "MongoDB", "Kubernetes", "nextjs", "Docker", "AWS", "MERN Stack"],
      expertise: ["API Design & Communication", "Authentication & Authorization", "Database Management", "Scalable Backend Systems"],
      imageUrl: ayanPhoto,
      links: { linkedin: "https://www.linkedin.com/in/ayan-baruah-69a455317", github: "https://github.com/ayanbaruah14" }
    },
    {
      id: 3,
      name: "Ashwani Singh",
      role: "Lead Frontend Developer",
      bio: "Turns static designs into dynamic, high-performance web applications using React, NextJS, and pure magic.",
      detailedBio: "I lives at the intersection of design and code. Specializing in advanced frontend architectures and complex animations, he brings static mockups to life. His expertise in the MERN stack and Next.js allows him to build seamless, SEO-friendly, and blazing fast single-page applications.",
      techStack: ["React", "Next js", "TypeScript", "MERN Stack", "Framer Motion", "GSAP", "Tailwind CSS", "Redux Toolkit", "WebGL", "Three.js"],
      expertise: ["Frontend Architecture", "Blender", "WebGL / 3D Graphics", "Performance Tuning"],
      imageUrl: ashwaniPhoto,
      imagePosition: 'center 20%',
      links: { linkedin: "https://www.linkedin.com/in/ashwani-singh-391302320", github: "https://github.com/ashwani251106" }
    }
  ];

  return (
    <section className="know-us-section section-container" id="about">
      <div className="max-width-wrapper">
        <ScrollReveal direction="down">
          <div className="section-header">
            <h2 className="section-title">Know <span className="text-gradient">Us</span></h2>
            <p className="section-subtitle">Meet the visionary minds driving the Trivalent collective forward.</p>
          </div>
        </ScrollReveal>

        <div className="profiles-grid">
          {team.map((member, index) => (
            <ProfileCard
              key={member.id}
              profile={member}
              delay={index * 0.2}
              onClick={setSelectedProfile}
            />
          ))}
        </div>
      </div>

      <ProfileModal
        profile={selectedProfile}
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </section>
  );
};

export default KnowUs;
