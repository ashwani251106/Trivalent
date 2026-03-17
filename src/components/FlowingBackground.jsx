import React, { useRef, useEffect } from 'react';
import './FlowingBackground.css';

const FlowingBackground = ({ isMobile }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isMobile) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse tracking
    let mouse = { x: null, y: null };
    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    const handleMouseOut = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    // Particle class
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // More efficient distance check
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distanceSq = dx * dx + dy * dy;
          
          if (distanceSq < 22500) { // 150 * 150
            const distance = Math.sqrt(distanceSq);
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (150 - distance) / 150;
            
            this.x -= forceDirectionX * force * this.density;
            this.y -= forceDirectionY * force * this.density;
          } else {
            this.x -= (this.x - this.baseX) * 0.1;
            this.y -= (this.y - this.baseY) * 0.1;
          }
        } else {
          this.x -= (this.x - this.baseX) * 0.1;
          this.y -= (this.y - this.baseY) * 0.1;
        }
      }
    }

    let particlesArray = [];
    const init = () => {
      particlesArray = [];
      // Fixed particle count on desktop for stability
      const numberOfParticles = Math.min((window.innerWidth * window.innerHeight) / 10000, 200);
      const colors = ['#00e5ff', '#ff2a6d', '#b300ff', '#ffffff'];
      
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let color = colors[Math.floor(Math.random() * colors.length)];
        if(Math.random() > 0.2) color = 'rgba(255, 255, 255, 0.4)';
        
        particlesArray.push(new Particle(x, y, color));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) {
    return <div className="flowing-background mobile-dark" />;
  }

  return (
    <div className="flowing-background">
      <div className="flow-blob blob-red"></div>
      <div className="flow-blob blob-blue"></div>
      <div className="flow-blob blob-purple"></div>
      <canvas ref={canvasRef} className="interactive-particles" />
      <div className="noise-overlay"></div>
    </div>
  );
};

export default FlowingBackground;
