
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, CalendarClock, WalletCards } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TopUpBalanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (amount: number) => void;
}

const TopUpBalanceDialog = ({ isOpen, onClose, onSuccess }: TopUpBalanceDialogProps) => {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('onetime');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine amount based on selected option
    let amount = 0;
    
    if (activeTab === 'onetime') {
      amount = parseFloat(customAmount);
      if (isNaN(amount) || amount <= 0) {
        toast({
          title: "Ошибка",
          description: "Пожалуйста, введите корректную сумму",
          variant: "destructive"
        });
        return;
      }
    } else if (activeTab === 'subscription') {
      amount = 500; // Subscription amount
    }
    
    // In a real app, this would handle the payment processing
    // For now, we'll just simulate a successful payment
    toast({
      title: "Успешно",
      description: `Баланс пополнен на ${amount} ₽`,
      variant: "default"
    });
    
    if (onSuccess) {
      onSuccess(amount);
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-ajackal-black border border-ajackal-purple/30 text-ajackal-white w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold ajackal-gradient-text">Пополнение баланса</DialogTitle>
          <DialogDescription className="text-ajackal-white/70">
            Выберите способ пополнения баланса вашего аккаунта
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="onetime" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 bg-ajackal-black/70 border border-ajackal-purple/20">
              <TabsTrigger value="onetime" className="data-[state=active]:bg-ajackal-purple/20 data-[state=active]:text-ajackal-white">
                <CreditCard className="mr-2 h-4 w-4" />
                Разовый платеж
              </TabsTrigger>
              <TabsTrigger value="subscription" className="data-[state=active]:bg-ajackal-purple/20 data-[state=active]:text-ajackal-white">
                <CalendarClock className="mr-2 h-4 w-4" />
                Подписка
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="onetime" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-ajackal-white/90">Сумма пополнения (₽)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    placeholder="Введите сумму"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="bg-ajackal-black/50 border-ajackal-purple/30 focus:ring-ajackal-purple text-ajackal-white"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="subscription" className="mt-4">
              <div className="p-4 border border-ajackal-purple/30 rounded-md bg-ajackal-purple/10">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-md bg-ajackal-purple/20 flex items-center justify-center shrink-0">
                    <WalletCards className="h-6 w-6 text-ajackal-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Месячная подписка</h3>
                    <p className="text-ajackal-white/70 text-sm mb-2">500₽ в месяц</p>
                    <ul className="space-y-1 text-sm text-ajackal-white/80">
                      <li className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-ajackal-purple"></span>
                        <span>20 запросов в месяц</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-ajackal-purple"></span>
                        <span>Для большего количества запросов нужно докупать отдельно</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-ajackal-purple"></span>
                        <span>Автоматическое продление каждый месяц</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-ajackal-purple/60 text-ajackal-white hover:bg-ajackal-purple/20"
            >
              Отмена
            </Button>
            <Button 
              type="submit"
              className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient transition-all duration-300"
            >
              Оплатить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpBalanceDialog;
