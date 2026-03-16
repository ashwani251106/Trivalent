import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KnowUs from './components/KnowUs';
import Projects from './components/Projects';
import FlowingBackground from './components/FlowingBackground';
import Loader from './components/Loader';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

const Footer = () => (
  <footer id="contact" style={{ padding: '60px 5%', textAlign: 'center', borderTop: '1px solid var(--glass-border)', marginTop: '60px' }}>
    <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '24px' }}>Ready to Build?</h2>
    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=trivalent102103@gmail.com" target="_blank" rel="noopener noreferrer" className="btn-primary clickable" style={{ display: 'inline-block', marginBottom: '40px' }}>Contact Us</a>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
      &copy; {new Date().getFullYear()} Trivalent Collective. All rights reserved.
    </p>
  </footer>
);

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <FlowingBackground />
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading && (
          <Loader key="loader" onLoadingComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <main>
            <Hero />
            <KnowUs />
            <Projects />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
