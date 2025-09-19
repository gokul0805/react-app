import { useState, useEffect } from 'react';

const useScrollRotation = (cardIndex = 0) => {
  const [rotation, setRotation] = useState(0);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      // Get the services section element
      const servicesSection = document.getElementById('services');
      if (!servicesSection) return;

      const servicesRect = servicesSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the services section is visible
      const sectionTop = servicesRect.top;
      const sectionHeight = servicesRect.height;
      
      // Calculate scroll progress within the services section (0 to 1)
      let scrollProgress = 0;
      if (sectionTop <= 0 && sectionTop + sectionHeight > 0) {
        // Services section is in view
        // When using a sticky scroller that is 400vh tall, progress maps linearly
        scrollProgress = Math.abs(sectionTop) / (sectionHeight + windowHeight);
        scrollProgress = Math.min(scrollProgress, 1);
      } else if (sectionTop > 0) {
        // Services section is below viewport
        scrollProgress = 0;
      } else {
        // Services section is above viewport
        scrollProgress = 1;
      }

      // Calculate rotation for the entire carousel (0 to 360 degrees)
      const carouselRotation = scrollProgress * 360; // full rotation across sticky scroll

      // Calculate individual card position in the 3D horizontal circle
      const radius = 300; // Distance from center
      const cardAngle = (cardIndex * 90) + carouselRotation; // 90 degrees between each card
      const radians = (cardAngle * Math.PI) / 180;

      // Calculate 3D position for horizontal rotation
      const x = Math.sin(radians) * radius; // Horizontal position
      const y = 0; // Keep cards at same vertical level
      const z = Math.cos(radians) * radius; // Depth position (Z-axis)

      // Visibility: make only the front-facing card fully visible
      const totalCards = 4;
      const normalizedRotation = ((carouselRotation % 360) + 360) % 360;
      const frontIndex = ((Math.round((-normalizedRotation) / 90) % totalCards) + totalCards) % totalCards;
      const isVisible = frontIndex === cardIndex;

      // Depth-based visuals (keep the 3D effect), dim non-active
      const depthScale = Math.max(0.2, (z + radius) / (2 * radius));
      const depthOpacity = isVisible ? 1 : 0.15; // dim instead of hide
      const rotateY = -cardAngle;

      setRotation(carouselRotation);
      setCardPosition({
        x,
        y,
        z,
        scale: depthScale,
        opacity: depthOpacity,
        isVisible,
        rotateY,
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Call once to set initial rotation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [cardIndex]);

  return { rotation, cardPosition };
};

export default useScrollRotation;
