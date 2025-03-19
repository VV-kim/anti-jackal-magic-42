
import React, { useState } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';

// Example data
const photoExamples = [
  {
    id: 1,
    title: "Портретная фотография",
    description: "Улучшение деталей лица, текстуры кожи и четкости",
    before: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=60",
    after: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=95"
  },
  {
    id: 2,
    title: "Пейзажная фотография",
    description: "Улучшение детализации текстур и цветовой гаммы",
    before: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=60",
    after: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=95"
  },
  {
    id: 3,
    title: "Макросъемка",
    description: "Повышение детализации мелких объектов и текстур",
    before: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=60",
    after: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=95"
  }
];

const PhotoExamples = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === photoExamples.length - 1 ? 0 : prev + 1));
  };
  
  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photoExamples.length - 1 : prev - 1));
  };
  
  return (
    <div className="relative">
      {/* Current Example Info */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-semibold mb-2">
          {photoExamples[currentPhotoIndex].title}
        </h3>
        <p className="text-ajackal-white/70">
          {photoExamples[currentPhotoIndex].description}
        </p>
      </div>
      
      {/* Interactive Before/After Slider */}
      <div className="w-full max-w-4xl mx-auto h-[400px] md:h-[500px] rounded-xl overflow-hidden relative glass-card">
        <BeforeAfterSlider 
          beforeImage={photoExamples[currentPhotoIndex].before}
          afterImage={photoExamples[currentPhotoIndex].after}
          alt={photoExamples[currentPhotoIndex].title}
        />
      </div>
      
      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button 
          onClick={prevPhoto}
          className="h-10 w-10 rounded-full glass-morph flex items-center justify-center hover:bg-ajackal-purple/30 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex gap-2">
          {photoExamples.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`h-2 transition-all ${
                index === currentPhotoIndex 
                  ? 'bg-ajackal-gradient w-8 rounded-full' 
                  : 'bg-ajackal-white/30 hover:bg-ajackal-white/50 w-2 rounded-full'
              }`}
              aria-label={`Пример ${index + 1}`}
            />
          ))}
        </div>
        <button 
          onClick={nextPhoto}
          className="h-10 w-10 rounded-full glass-morph flex items-center justify-center hover:bg-ajackal-purple/30 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PhotoExamples;
