import React from 'react';
import { 
  ImageIcon, 
  Upload, 
  Zap, 
  MonitorSmartphone, 
  Shield
} from 'lucide-react';

const features = [
  {
    icon: <ImageIcon className="h-8 w-8 text-ajackal-purple" />,
    title: 'Удаление шумов',
    description: 'Интеллектуальное удаление шумов и артефактов с фотографий и видео без потери качества и деталей.'
  },
  {
    icon: <Upload className="h-8 w-8 text-ajackal-purple" />,
    title: 'Повышение разрешения',
    description: 'Увеличение разрешения изображений и видео до 4K с сохранением всех деталей и улучшением четкости.'
  },
  {
    icon: <Zap className="h-8 w-8 text-ajackal-purple" />,
    title: 'Высокая скорость',
    description: 'Быстрая обработка благодаря оптимизированным алгоритмам и использованию облачных вычислений.'
  },
  {
    icon: <MonitorSmartphone className="h-8 w-8 text-ajackal-purple" />,
    title: 'Кросс-платформенность',
    description: 'Работает на любых устройствах: от смартфонов до профессиональных рабочих станций.'
  },
  {
    icon: <Shield className="h-8 w-8 text-ajackal-purple" />,
    title: 'Безопасность данных',
    description: 'Полная конфиденциальность всех загружаемых материалов и автоматическое удаление после обработки.'
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ajackal-black to-ajackal-off-black"></div>
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block glass-morph px-4 py-1 rounded-full mb-4">
            <span className="text-sm font-medium text-ajackal-white/90">Уникальные возможности</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Преимущества <span className="ajackal-gradient-text">Anti-Jackal</span>
          </h2>
          <p className="text-ajackal-white/80 max-w-2xl mx-auto">
            Наша технология основана на последних достижениях в области глубокого обучения и генеративных состязательных нейросетей (GANs)
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-glow group"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-ajackal-purple/20 to-ajackal-pink/20 flex items-center justify-center mb-4 group-hover:bg-ajackal-gradient transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-ajackal-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Technology highlight */}
        <div className="mt-20 glass-card p-8 md:p-12 rounded-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Технология <span className="ajackal-gradient-text">GANs</span>
              </h3>
              <p className="text-ajackal-white/80 mb-6">
                Anti-Jackal использует продвинутые генеративные состязательные нейросети (GANs) для анализа и улучшения визуального контента. Эта революционная технология позволяет:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-ajackal-gradient flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-ajackal-white/80">Восстанавливать детали, которые были утеряны при сжатии</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-ajackal-gradient flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-ajackal-white/80">Значительно повышать четкость изображений без искажений</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-ajackal-gradient flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-ajackal-white/80">Интеллектуально восстанавливать текстуры и мелкие детали</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 relative">
              <div className="rounded-lg overflow-hidden relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80" 
                  alt="Визуализация нейросети" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ajackal-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="glass-morph px-4 py-2 rounded-full inline-block text-sm font-medium">
                    Визуализация работы нейросети
                  </span>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-ajackal-purple/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-ajackal-pink/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
