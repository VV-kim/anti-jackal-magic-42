
import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
}

const BeforeAfterSlider = ({ beforeImage, afterImage, alt }: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseDown = () => {
    setIsDragging(true);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setSliderPosition(percentage);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setSliderPosition(percentage);
  };
  
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full cursor-ew-resize rounded-xl overflow-hidden shadow-xl"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* Before image (full width) */}
      <div className="absolute inset-0">
        <img 
          src={beforeImage} 
          alt={`${alt} - до обработки`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 glass-morph px-3 py-1 rounded-md z-10">
          <span className="text-sm font-medium">До</span>
        </div>
      </div>
      
      {/* After image (clipped by slider) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={afterImage} 
          alt={`${alt} - после обработки`} 
          className="w-full h-full object-cover"
          style={{ width: '100vw' }} // Make sure it's the same width as the container
        />
      </div>
      
      {/* После (After) label - static on the right */}
      <div className="absolute bottom-4 right-4 glass-morph px-3 py-1 rounded-md z-10">
        <span className="text-sm font-medium">После</span>
      </div>
      
      {/* Slider handle */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-ajackal-black"></div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
