
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Play } from 'lucide-react';

const HeroSection = () => {
  const pixelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (pixelRef.current) {
        // Parallax effect for the pixels
        pixelRef.current.style.transform = `translateY(${scrollPosition * 0.1}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 -z-10 bg-ajackal-black">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div 
            ref={pixelRef}
            className="absolute top-1/4 -left-20 w-72 h-72 bg-ajackal-purple opacity-20 rounded-full blur-3xl"
          />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-ajackal-pink opacity-15 rounded-full blur-3xl" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-16 md:pt-24 flex flex-col items-center">
        {/* Animated badge */}
        <div className="glass-morph px-4 py-1 rounded-full mb-6 animate-fade-in">
          <span className="text-sm font-medium text-ajackal-white/90">Future Technology</span>
        </div>
        
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 max-w-3xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="ajackal-gradient-text">Anti-Jackal:</span> Your content at a new level!
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-center text-ajackal-white/80 max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Revolutionary neural network technology for automated improvement of photo and video quality
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient text-white px-8 py-6 rounded-xl text-lg">
            Try for free
          </Button>
          <Button variant="outline" className="border-ajackal-purple/40 hover:bg-ajackal-purple/10 text-white px-8 py-6 rounded-xl text-lg flex items-center gap-2">
            <Play size={18} className="fill-ajackal-white" />
            Watch video
          </Button>
        </div>
        
        {/* Image showcase with before/after effect */}
        <div className="relative w-full max-w-4xl h-[300px] md:h-[400px] mb-8 rounded-xl overflow-hidden glass-card animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {/* Before image (low quality) */}
          <div className="absolute inset-0 bg-gradient-to-r from-ajackal-purple/5 to-ajackal-pink/5">
            <img 
              src="https://images.unsplash.com/photo-1541701494587-cb58502fabe0?q=40&w=1050&auto=format&fit=crop" 
              alt="Image before enhancement" 
              className="w-full h-full object-cover mix-blend-luminosity opacity-80"
            />
          </div>
          
          {/* After image (high quality) with animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent backdrop-blur-xs">
            <div className="absolute inset-0 w-1/2 overflow-hidden transition-all duration-300 hover:w-[95%]">
              <div className="h-full w-[200%] flex items-stretch">
                <img 
                  src="https://images.unsplash.com/photo-1541701494587-cb58502fabe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=90" 
                  alt="Image after enhancement" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-0 right-0 bottom-0 border-r-2 border-white shadow-xl flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <span className="text-black text-xs font-bold">HD</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Labels */}
          <div className="absolute bottom-4 left-4 glass-morph px-3 py-1 rounded-md">
            <span className="text-sm font-medium">Before</span>
          </div>
          <div className="absolute bottom-4 right-4 glass-morph px-3 py-1 rounded-md">
            <span className="text-sm font-medium">After</span>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <a 
          href="#features" 
          className="flex flex-col items-center gap-2 absolute bottom-8 left-1/2 transform -translate-x-1/2 text-ajackal-white/60 hover:text-ajackal-white transition-colors animate-fade-in cursor-pointer"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="text-sm">Learn more</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
