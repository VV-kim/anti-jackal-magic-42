import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock } from 'lucide-react';
import BrandTelegram from './icons/BrandTelegram';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Введите корректный email адрес' }),
  password: z.string().min(6, { message: 'Пароль должен содержать не менее 6 символов' }),
});

// Register form schema
const registerSchema = z.object({
  email: z.string().email({ message: 'Введите корректный email адрес' }),
  password: z.string().min(6, { message: 'Пароль должен содержать не менее 6 символов' }),
  confirmPassword: z.string().min(6, { message: 'Пароль должен содержать не менее 6 символов' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthDialog: React.FC<AuthDialogProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('login');

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Handle login form submission
  const onLoginSubmit = (values: LoginFormValues) => {
    console.log('Login values:', values);
    // Handle login logic here
  };

  // Handle register form submission
  const onRegisterSubmit = (values: RegisterFormValues) => {
    console.log('Register values:', values);
    // Handle registration logic here
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-ajackal-black border-ajackal-purple/30">
        <DialogHeader>
          <DialogTitle className="text-ajackal-white text-xl font-bold">
            {activeTab === 'login' ? 'Авторизация' : 'Регистрация'}
          </DialogTitle>
          <DialogDescription className="text-ajackal-white/70">
            {activeTab === 'login' 
              ? 'Войдите в свой аккаунт, чтобы получить доступ к расширенным функциям.' 
              : 'Создайте новый аккаунт, чтобы начать пользоваться сервисом.'}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Почта</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-ajackal-white/50" />
                          <Input
                            placeholder="your@email.com"
                            className="pl-10 bg-ajackal-black/90 border-ajackal-purple/30 text-ajackal-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-ajackal-white/50" />
                          <Input
                            type="password"
                            placeholder="Введите пароль"
                            className="pl-10 bg-ajackal-black/90 border-ajackal-purple/30 text-ajackal-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 space-y-4">
                  <Button type="submit" className="w-full bg-ajackal-gradient hover:bg-ajackal-dark-gradient">
                    Войти
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-ajackal-purple/20" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-ajackal-black text-ajackal-white/60">или войти через</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-ajackal-purple/30 hover:bg-ajackal-purple/10"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Войти с помощью почты
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-ajackal-purple/30 hover:bg-ajackal-purple/10"
                    >
                      <BrandTelegram className="mr-2 h-4 w-4" />
                      Войти с помощью Telegram
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Почта</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-ajackal-white/50" />
                          <Input
                            placeholder="your@email.com"
                            className="pl-10 bg-ajackal-black/90 border-ajackal-purple/30 text-ajackal-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-ajackal-white/50" />
                          <Input
                            type="password"
                            placeholder="Введите пароль"
                            className="pl-10 bg-ajackal-black/90 border-ajackal-purple/30 text-ajackal-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Повторите пароль</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-ajackal-white/50" />
                          <Input
                            type="password"
                            placeholder="Повторите пароль"
                            className="pl-10 bg-ajackal-black/90 border-ajackal-purple/30 text-ajackal-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 space-y-4">
                  <Button type="submit" className="w-full bg-ajackal-gradient hover:bg-ajackal-dark-gradient">
                    Зарегистрироваться
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-ajackal-purple/20" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-ajackal-black text-ajackal-white/60">или войти через</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-ajackal-purple/30 hover:bg-ajackal-purple/10"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Войти с помощью почты
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-ajackal-purple/30 hover:bg-ajackal-purple/10"
                    >
                      <BrandTelegram className="mr-2 h-4 w-4" />
                      Войти с помощью Telegram
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
