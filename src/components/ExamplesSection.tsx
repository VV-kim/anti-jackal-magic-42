
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ImageIcon, 
  Film,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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
  const [sliderValue, setSliderValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === photoExamples.length - 1 ? 0 : prev + 1));
  };
  
  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photoExamples.length - 1 : prev - 1));
  };
  
  // Улучшенное управление слайдером
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e.clientX);
    }
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      updateSliderPosition(e.touches[0].clientX);
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  const updateSliderPosition = (clientX: number) => {
    if (!sliderRef.current) return;
    
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const offsetX = clientX - sliderRect.left;
    const percentage = Math.min(Math.max((offsetX / sliderRect.width) * 100, 1), 99);
    
    setSliderValue(percentage);
  };
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleDragEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);
  
  return (
    <section id="examples" className="py-20 bg-ajackal-off-black">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block glass-morph px-4 py-1 rounded-full mb-4">
            <span className="text-sm font-medium text-ajackal-white/90">Наглядная демонстрация</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Примеры <span className="ajackal-gradient-text">до и после</span>
          </h2>
          <p className="text-ajackal-white/80 max-w-2xl mx-auto">
            Оцените потрясающую разницу в качестве фотографий и видео после обработки при помощи нашей технологии
          </p>
        </div>
        
        {/* Tabs for Photos and Videos */}
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
              
              {/* Improved Before-After Slider */}
              <div 
                ref={sliderRef}
                className="w-full max-w-4xl mx-auto h-[400px] md:h-[500px] rounded-xl overflow-hidden relative glass-card touch-none select-none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                {/* Before Image (Full) */}
                <div className="absolute inset-0">
                  <img 
                    src={photoExamples[currentPhotoIndex].before} 
                    alt="До" 
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>
                
                {/* After Image (Partial) with improved slider */}
                <div 
                  className="absolute inset-0 overflow-hidden transition-[width] duration-100" 
                  style={{ width: `${sliderValue}%` }}
                >
                  <img 
                    src={photoExamples[currentPhotoIndex].after} 
                    alt="После" 
                    className="w-full h-full object-cover"
                    style={{ minWidth: `${100 / (sliderValue / 100)}%` }}
                    draggable="false"
                  />
                  
                  {/* Vertical divider line */}
                  <div className="absolute top-0 right-0 w-0.5 h-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                </div>
                
                {/* Slider Control - Improved grabber */}
                <div 
                  className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10 cursor-grab active:cursor-grabbing"
                  style={{ left: `${sliderValue}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-ajackal-gradient rounded-full shadow-[0_0_15px_rgba(155,48,255,0.7)] flex items-center justify-center">
                    <div className="flex items-center justify-center gap-0.5 rotate-90">
                      <div className="w-1 h-5 bg-white rounded-full"></div>
                      <div className="w-1 h-5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Before/After Labels with improved visibility */}
                <div className="absolute bottom-4 left-4 glass-morph px-4 py-1.5 rounded-md z-10 shadow-lg">
                  <span className="text-sm font-medium">До</span>
                </div>
                <div className="absolute bottom-4 right-4 glass-morph px-4 py-1.5 rounded-md z-10 shadow-lg">
                  <span className="text-sm font-medium">После</span>
                </div>
                
                {/* Interactive instructions overlay - shown initially */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="glass-morph px-6 py-3 rounded-full bg-ajackal-black/40 backdrop-blur-md text-white/90 animate-pulse-glow">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <span>Двигайте ползунок</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 14a5 5 0 0 1 5-5c2.5-2.5 5-2 7 0a5 5 0 0 1 5 5v2a6 6 0 0 1-6 6h-2a5 5 0 0 1-5-5z"/>
                        <path d="M5 18a7 7 0 0 1 7-7c2.5-2.5 6-2.5 8.5 0a7 7 0 0 1 0 10z"/>
                        <circle cx="10" cy="9" r="1"/>
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <button 
                  onClick={prevPhoto}
                  className="h-10 w-10 rounded-full glass-morph flex items-center justify-center hover:bg-ajackal-purple/30 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex gap-2">
                  {photoExamples.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        index === currentPhotoIndex 
                          ? 'bg-ajackal-gradient w-8' 
                          : 'bg-ajackal-white/30 hover:bg-ajackal-white/50'
                      }`}
                      aria-label={`Пример ${index + 1}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={nextPhoto}
                  className="h-10 w-10 rounded-full glass-morph flex items-center justify-center hover:bg-ajackal-purple/30 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
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
                  className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow group"
                >
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ajackal-black to-transparent opacity-60"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-ajackal-gradient flex items-center justify-center opacity-90 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
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
