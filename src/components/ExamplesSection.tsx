
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Film } from 'lucide-react';
import PhotoExamples from './examples/PhotoExamples';
import VideoExamples from './examples/VideoExamples';

const ExamplesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
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
            <PhotoExamples />
          </TabsContent>
          
          {/* Videos Content */}
          <TabsContent value="videos" className="focus-visible:outline-none focus-visible:ring-0">
            <VideoExamples isVisible={isVisible} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ExamplesSection;
