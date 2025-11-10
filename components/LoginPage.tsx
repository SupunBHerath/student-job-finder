
import React, { useState } from 'react';
import { User } from '../types';
import Input from './common/Input';
import Button from './common/Button';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (email.toLowerCase() === 'admin@app.com' && password === 'admin123') {
      onLogin({ email: 'admin@app.com', role: 'admin' });
    } else if (email.toLowerCase() === 'student@app.com' && password === 'student123') {
      onLogin({ email: 'student@app.com', role: 'student' });
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-light flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full mx-auto">
            <div className="flex justify-center items-center space-x-2 mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1.1a4 4 0 01-.94 2.6L4.2 11.75A1 1 0 005 13h10a1 1 0 00.8-1.25l-2.86-4.04A4 4 0 0112 5.1V4a2 2 0 00-2-2zm0 14a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <h1 className="text-3xl font-bold text-dark tracking-tight">JobFinder Login</h1>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@app.com or student@app.com"
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                    />
                    {error && (
                        <div className="bg-red-100 border-l-4 border-danger text-danger p-4" role="alert">
                            <p>{error}</p>
                        </div>
                    )}
                    <div>
                        <Button type="submit" className="w-full">
                        Sign In
                        </Button>
                    </div>
                </form>
                 <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
                    <p className="font-semibold mb-2">Demo Credentials:</p>
                    <p><strong>Admin:</strong> admin@app.com / <span className="font-mono">admin123</span></p>
                    <p><strong>Student:</strong> student@app.com / <span className="font-mono">student123</span></p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;
