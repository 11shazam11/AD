import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  iconLeft,
  iconRight,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-250 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:scale-[1.05] active:scale-[0.98]';

  const variants: Record<string, string> = {
    primary:
      'bg-gradient-to-r from-blue-600 via-purple-700 to-pink-600 text-white shadow-lg hover:from-blue-700 hover:via-purple-800 hover:to-pink-700 focus:ring-pink-500',
    secondary:
      'bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-white shadow-lg hover:from-teal-500 hover:via-cyan-600 hover:to-blue-700 focus:ring-cyan-400',
    ghost:
      'bg-transparent text-gray-800 hover:text-purple-700 hover:bg-purple-100 focus:ring-purple-300',
    outline:
      'border-2 border-gray-300 text-gray-800 hover:border-purple-400 hover:bg-purple-100 focus:ring-purple-300',
  };

  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2.5',
    lg: 'px-8 py-4 text-lg gap-3',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} group`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 mr-2 animate-spin text-white" />
      ) : (
        iconLeft && <span className="mr-2 flex items-center">{iconLeft}</span>
      )}
      <span className="transition-colors duration-200 group-hover:text-shadow-lg">
        {children}
      </span>
      {iconRight && !loading && (
        <span className="ml-2 flex items-center">{iconRight}</span>
      )}
    </button>
  );
};
