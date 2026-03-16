import React, { useRef, useEffect } from 'react';
import './FlowingBackground.css';

const FlowingBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
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
    let mouse = { x: null, y: null, radius: 100 };
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = undefined;
      mouse.y = undefined;
    });

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
        
        // Add a glow effect based on size for variation
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = this.color;
        
        ctx.fill();
        
        // Reset shadow for performance on other draws
        ctx.shadowBlur = 0;
      }

      update() {
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          
          // Max distance, past this the mouse has no effect
          const maxDistance = 150;
          
          // Force decreases as distance increases
          let force = (maxDistance - distance) / maxDistance;
          
          // If we're within the mouse radius, push the particle away smoothly
          let directionX = (forceDirectionX * force * this.density);
          let directionY = (forceDirectionY * force * this.density);
          
          if (distance < maxDistance) {
            this.x -= directionX;
            this.y -= directionY;
          } else {
            // Return to original position
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx / 15;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy / 15;
            }
          }
        } else {
            // If no mouse interaction, slowly return to base position
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx / 15;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy / 15;
            }
        }
      }
    }

    let particlesArray = [];
    const init = () => {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 8000;
      const colors = ['#00e5ff', '#ff2a6d', '#b300ff', '#ffffff'];
      
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        // Randomly assign one of the brand colors
        let color = colors[Math.floor(Math.random() * colors.length)];
        // Make most particles white, occasionally colored
        if(Math.random() > 0.2) color = 'rgba(255, 255, 255, 0.4)';
        else color = color;
        
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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
