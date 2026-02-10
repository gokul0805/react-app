import { useState, useEffect, useCallback } from 'react';

const useCarousel = (totalCards = 4, autoPlayInterval = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, totalCards, autoPlayInterval]);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
  }, [totalCards]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const pauseCarousel = useCallback(() => {
    setIsHovered(true);
  }, []);

  const resumeCarousel = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Dynamic radius based on screen width
  const [radius, setRadius] = useState(250);

  useEffect(() => {
    const handleResize = () => {
      // Use smaller radius for mobile devices
      if (window.innerWidth < 576) {
        setRadius(140);
      } else if (window.innerWidth < 992) {
        setRadius(200);
      } else {
        setRadius(250);
      }
    };

    // Initial calculation
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate card positions for 3D carousel effect
  const getCardPosition = useCallback((cardIndex) => {
    // radius is now state-based
    const angleStep = 360 / totalCards; // Degrees between each card
    const currentRotation = currentIndex * angleStep;

    // Calculate the angle for this specific card
    const cardAngle = (cardIndex * angleStep) - currentRotation;
    const radians = (cardAngle * Math.PI) / 180;

    // Calculate 3D position
    const x = Math.sin(radians) * radius;
    const y = 0; // Keep cards at same vertical level
    const z = Math.cos(radians) * radius;

    // Determine if this card is currently active (front-facing)
    const normalizedAngle = ((cardAngle % 360) + 360) % 360;
    const isActive = normalizedAngle < angleStep / 2 || normalizedAngle > (360 - angleStep / 2);

    // Calculate visual properties based on position
    const depthScale = Math.max(0.3, (z + radius) / (2 * radius));
    const opacity = isActive ? 1 : 0.4;
    const rotateY = -cardAngle;

    return {
      x,
      y,
      z,
      scale: depthScale,
      opacity,
      isActive,
      rotateY,
    };
  }, [currentIndex, totalCards, radius]);

  return {
    currentIndex,
    isPlaying,
    goToNext,
    goToPrevious,
    goToSlide,
    togglePlayPause,
    pauseCarousel,
    resumeCarousel,
    getCardPosition,
  };
};

export default useCarousel;
