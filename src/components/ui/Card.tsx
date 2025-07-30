import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  hover = false,
}) => {
  const baseClasses =
    'rounded-3xl transition-transform duration-500 ease-in-out p-6 border backdrop-filter will-change-transform';

  // Detailed glassmorphism + shadows + gradients
  const variants = {
    default: 'bg-gradient-to-br from-white via-gray-50 to-gray-100 border-gray-200 shadow-sm',
    glass: 'bg-gradient-to-br from-white/40 via-white/20 to-white/10 border-white/30 shadow-lg backdrop-blur-[30px] ring-1 ring-white/20',
    elevated: 'bg-gradient-to-br from-white via-gray-100 to-gray-200 border-gray-300 shadow-2xl hover:shadow-4xl',
  };

  const hoverClasses = hover
    ? 'hover:shadow-4xl hover:-translate-y-3 hover:scale-[1.05] cursor-pointer'
    : '';

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className} floating relative`}
      style={{
        backgroundImage:
          variant === 'glass'
            ? 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)'
            : undefined,
        boxShadow:
          variant === 'glass'
            ? '0 8px 32px 0 rgba(31, 38, 135, 0.08)'
            : undefined,
      }}
    >
      {children}
    </div>
  );
};
