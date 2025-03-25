
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  Image as ImageIcon, 
  Film, 
  AlertCircle,
  CheckCircle,
  X,
  Download,
  RefreshCw,
  Wallet,
  ArrowRight
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import TopUpBalanceDialog from './TopUpBalanceDialog';
import { useNavigate } from 'react-router-dom';

// Mock user state - In a real app, this would come from your authentication context
interface User {
  isLoggedIn: boolean;
  balance: number;
}

const TryNowSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video'>('image');
  const [scale, setScale] = useState<string>('3');
  const [isTopUpDialogOpen, setIsTopUpDialogOpen] = useState(false);
  
  // Mock user data - In a real app, this would be fetched from your auth context
  const [user, setUser] = useState<User | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Detect if it's an image or video
    const isImage = file.type.startsWith('image/');
    setFileType(isImage ? 'image' : 'video');
    
    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setFilePreview(previewUrl);
    setSelectedFile(file);
    setIsProcessed(false);
    setProcessedImage(null);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    // Detect if it's an image or video
    const isImage = file.type.startsWith('image/');
    setFileType(isImage ? 'image' : 'video');
    
    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setFilePreview(previewUrl);
    setSelectedFile(file);
    setIsProcessed(false);
    setProcessedImage(null);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleProcess = () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // For demo purposes, we'll just use the same image as the processed one
      // In a real app, this would be replaced with actual API call and processing
      setProcessedImage(filePreview);
      setIsProcessing(false);
      setIsProcessed(true);
    }, 2000);
  };
  
  const handleReset = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setIsProcessed(false);
    setProcessedImage(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const getPriceForFullDownload = () => {
    return fileType === 'image' ? 5 : 60;
  };
  
  const handleDownload = (isDemo: boolean) => {
    if (!isDemo) {
      const price = getPriceForFullDownload();
      
      // Check if user is logged in
      if (!user?.isLoggedIn) {
        toast({
          title: "Требуется авторизация",
          description: "Для скачивания полной версии необходимо авторизоваться",
          variant: "destructive"
        });
        return;
      }
      
      // Check if user has enough balance
      if (user.balance < price) {
        toast({
          title: "Недостаточно средств",
          description: `Для скачивания полной версии необходимо ${price} ₽. Ваш баланс: ${user.balance} ₽`,
          variant: "destructive"
        });
        
        setIsTopUpDialogOpen(true);
        return;
      }
      
      // Process payment
      setUser({
        ...user,
        balance: user.balance - price
      });
      
      toast({
        title: "Оплата прошла успешно",
        description: `С вашего баланса списано ${price} ₽`,
        variant: "default"
      });
    }
    
    // For demo purposes, this just creates a download link
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = `anti-jackal-${isDemo ? 'demo' : 'full'}-${Date.now()}.${fileType === 'image' ? 'jpg' : 'mp4'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  // Mock function to handle successful balance top-up
  const handleTopUpSuccess = (amount: number) => {
    if (user) {
      setUser({
        ...user,
        balance: user.balance + amount
      });
    }
  };
  
  return (
    <section id="try" className="py-20 relative bg-gradient-to-b from-ajackal-off-black to-ajackal-black">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block glass-morph px-4 py-1 rounded-full mb-4">
            <span className="text-sm font-medium text-ajackal-white/90">Испытайте сами</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Попробуйте <span className="ajackal-gradient-text">Anti-Jackal</span> прямо сейчас
          </h2>
          <p className="text-ajackal-white/80 max-w-2xl mx-auto">
            Загрузите ваше изображение или видео и оцените качество обработки с помощью нашей технологии
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto glass-card p-6 md:p-8 rounded-xl">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <label className="block text-sm text-ajackal-white/80 mb-2">Тип контента</label>
              <Select defaultValue="image" onValueChange={(value) => setFileType(value as 'image' | 'video')}>
                <SelectTrigger className="bg-ajackal-black/50 border-ajackal-purple/30 focus:ring-ajackal-purple">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>Фото</span>
                  </SelectItem>
                  <SelectItem value="video" className="flex items-center gap-2">
                    <Film className="h-4 w-4" />
                    <span>Видео</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-ajackal-white/80 mb-2">Коэффициент увеличения</label>
              <Select defaultValue="3" onValueChange={setScale}>
                <SelectTrigger className="bg-ajackal-black/50 border-ajackal-purple/30 focus:ring-ajackal-purple">
                  <SelectValue placeholder="Выберите коэффициент" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2x</SelectItem>
                  <SelectItem value="3">3x</SelectItem>
                  <SelectItem value="4">4x</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Area */}
            <div className="relative">
              <div 
                className="group h-60 border-2 border-dashed border-ajackal-purple/30 rounded-lg flex flex-col items-center justify-center p-4 transition-all hover:border-ajackal-purple/60 cursor-pointer bg-ajackal-black/30 relative overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {!filePreview ? (
                  <>
                    <div className="h-14 w-14 rounded-full bg-ajackal-purple/20 flex items-center justify-center mb-4 group-hover:bg-ajackal-purple/30 transition-all">
                      <Upload className="h-7 w-7 text-ajackal-purple/90" />
                    </div>
                    <p className="text-ajackal-white/80 text-center mb-2">
                      Перетащите файл сюда или кликните для выбора
                    </p>
                    <p className="text-ajackal-white/50 text-sm text-center">
                      Поддерживаемые форматы: JPG, PNG, MP4, MOV
                    </p>
                  </>
                ) : (
                  <>
                    {fileType === 'image' ? (
                      <img 
                        src={filePreview} 
                        alt="Preview" 
                        className="absolute inset-0 w-full h-full object-contain z-10"
                      />
                    ) : (
                      <video 
                        src={filePreview} 
                        className="absolute inset-0 w-full h-full object-contain z-10" 
                        controls
                      />
                    )}
                    <div className="absolute top-2 right-2 z-20">
                      <button 
                        className="h-8 w-8 rounded-full glass-morph flex items-center justify-center hover:bg-ajackal-white/20 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReset();
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept={fileType === 'image' ? 'image/*' : 'video/*'} 
                  onChange={handleFileSelect}
                />
              </div>
              
              <div className="mt-4 text-center">
                <div className="inline-block glass-morph px-3 py-1 rounded-md mb-2">
                  <span className="text-sm font-medium">Исходный файл</span>
                </div>
              </div>
            </div>
            
            {/* Result Area */}
            <div className="relative">
              <div className="h-60 border-2 border-dashed border-ajackal-purple/20 rounded-lg flex flex-col items-center justify-center p-4 bg-ajackal-black/30 relative overflow-hidden">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 rounded-full border-2 border-ajackal-purple border-t-transparent animate-spin"></div>
                    <p className="text-ajackal-white/80">Обработка...</p>
                  </div>
                ) : isProcessed && processedImage ? (
                  <>
                    {fileType === 'image' ? (
                      <img 
                        src={processedImage} 
                        alt="Processed" 
                        className="absolute inset-0 w-full h-full object-contain z-10"
                      />
                    ) : (
                      <video 
                        src={processedImage} 
                        className="absolute inset-0 w-full h-full object-contain z-10" 
                        controls
                      />
                    )}
                    <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                      <Button 
                        className="bg-ajackal-black/80 hover:bg-ajackal-black border border-ajackal-purple/50 flex items-center gap-2"
                        onClick={() => handleDownload(true)}
                      >
                        <Download className="h-4 w-4" />
                        <span>Скачать демо</span>
                      </Button>
                      <Button 
                        className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient flex items-center gap-2"
                        onClick={() => handleDownload(false)}
                      >
                        <Download className="h-4 w-4" />
                        <span>Скачать полностью</span>
                        <span className="text-xs opacity-80 ml-1">
                          ({fileType === 'image' ? '5' : '60'} ₽)
                        </span>
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    {selectedFile ? (
                      <>
                        <CheckCircle className="h-10 w-10 text-ajackal-purple/80 mb-4" />
                        <p className="text-ajackal-white/80 text-center">
                          Файл загружен и готов к обработке
                        </p>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-10 w-10 text-ajackal-white/40 mb-4" />
                        <p className="text-ajackal-white/50 text-center">
                          Сначала загрузите файл для обработки
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-center">
                <div className="inline-block glass-morph px-3 py-1 rounded-md mb-2">
                  <span className="text-sm font-medium">Обработанный файл</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center mt-8">
            {selectedFile && !isProcessed ? (
              <Button 
                className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient flex items-center gap-2 px-8 py-6 text-lg"
                onClick={handleProcess}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Обработка...</span>
                  </>
                ) : (
                  <>
                    <span>Обработать</span>
                  </>
                )}
              </Button>
            ) : !selectedFile ? (
              <Button 
                className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient flex items-center gap-2 px-8 py-6 text-lg opacity-50 cursor-not-allowed"
                disabled
              >
                <span>Обработать</span>
              </Button>
            ) : (
              <Button 
                className="bg-ajackal-off-black hover:bg-ajackal-black border border-ajackal-purple/50 flex items-center gap-2 px-8 py-6 text-lg"
                onClick={handleReset}
              >
                <span>Загрузить новый файл</span>
              </Button>
            )}
          </div>
          
          {/* Pricing Info */}
          <div className="mt-8 text-center">
            <div className="glass-morph px-4 py-2 rounded-lg inline-block">
              <p className="text-sm text-ajackal-white/70 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-ajackal-purple" />
                <span>
                  Цены: <strong>{5} ₽</strong> за фото, <strong>{60} ₽</strong> за видео. {' '}
                  {!user?.isLoggedIn && (
                    <Button 
                      variant="link" 
                      className="h-auto p-0 text-ajackal-purple"
                      onClick={() => navigate('/')}
                    >
                      Авторизуйтесь <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Up Balance Dialog */}
      <TopUpBalanceDialog
        isOpen={isTopUpDialogOpen}
        onClose={() => setIsTopUpDialogOpen(false)}
        onSuccess={handleTopUpSuccess}
      />
    </section>
  );
};

export default TryNowSection;
