import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Register = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-3xl font-bold mb-6">Реєстрація</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Ім'я" required />
          <Input placeholder="Прізвище" required />
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Пароль" required />
          <Input type="password" placeholder="Підтвердження паролю" required />
          <Button type="submit" className="w-full">Створити акаунт</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
