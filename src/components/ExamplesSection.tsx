
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Film, Play } from 'lucide-react';

// BeforeAfterSlider component
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
      
      {/* After image (clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={afterImage} 
          alt={`${alt} - после обработки`} 
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ 
            minWidth: '100%',
            maxWidth: 'none',
            objectPosition: "0% 0%"
          }}
        />
        <div className="absolute bottom-4 right-4 glass-morph px-3 py-1 rounded-md z-10">
          <span className="text-sm font-medium">После</span>
        </div>
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

const videoExamples = [
  {
    id: 1,
    title: "Видеоблогинг",
    description: "Улучшение качества видео для медиа-контента",
    thumbnail: "https://images.unsplash.com/photo-1576097449702-2aa6bd1d0214?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 2,
    title: "Рекламные ролики",
    description: "Усиление качества рекламного видеоконтента",
    thumbnail: "https://images.unsplash.com/photo-1561174356-638609006ea4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 3,
    title: "Кинематограф",
    description: "Повышение разрешения видеоматериалов до 4K",
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  }
];

const ExamplesSection = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === photoExamples.length - 1 ? 0 : prev + 1));
  };
  
  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photoExamples.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      id="examples" 
      ref={sectionRef}
      className="py-20 bg-ajackal-off-black"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block glass-morph px-4 py-1 rounded-full mb-4">
            <span className="text-sm font-medium text-ajackal-white/90">Наглядная демонстрация</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}>
            Примеры <span className="ajackal-gradient-text">до и после</span>
          </h2>
          <p className={`text-ajackal-white/80 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}>
            Оцените потрясающую разницу в качестве фотографий и видео после обработки при помощи нашей технологии
          </p>
        </div>
        
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10">
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Фотографии</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              <span>Видео</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Photos Content */}
          <TabsContent value="photos" className="focus-visible:outline-none focus-visible:ring-0">
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
          </TabsContent>
          
          {/* Videos Content */}
          <TabsContent value="videos" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {videoExamples.map((video) => (
                <div 
                  key={video.id} 
                  className={`glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow group ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${300 + video.id * 100}ms` }}
                >
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ajackal-black to-transparent opacity-60"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-ajackal-gradient flex items-center justify-center opacity-90 group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                    <p className="text-ajackal-white/70 text-sm">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <div className="glass-morph px-5 py-3 rounded-lg inline-block">
                <p className="text-sm text-ajackal-white/80">
                  Результаты представлены в виде плееров. В реальном приложении здесь будут видео с возможностью сравнения качества до и после обработки.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ExamplesSection;
