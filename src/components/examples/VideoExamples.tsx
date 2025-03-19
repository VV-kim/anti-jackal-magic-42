
import React from 'react';
import { Play } from 'lucide-react';

// Example data
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

interface VideoExamplesProps {
  isVisible: boolean;
}

const VideoExamples = ({ isVisible }: VideoExamplesProps) => {
  return (
    <div>
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
    </div>
  );
};

export default VideoExamples;
