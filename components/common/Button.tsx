
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-primary hover:from-blue-600 hover:to-primary-dark focus:ring-primary',
    secondary: 'bg-secondary hover:bg-gray-700 focus:ring-secondary',
    success: 'bg-gradient-to-r from-green-500 to-success hover:from-green-600 hover:to-green-700 focus:ring-success',
    danger: 'bg-danger hover:bg-red-700 focus:ring-danger',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;