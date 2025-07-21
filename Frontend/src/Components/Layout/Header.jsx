import React from 'react';

const Header = ({ 
  title,
  subtitle,
  children,
  className = '',
  variant = 'default',
  size = 'medium'
}) => {
  const baseClasses = 'mb-8';
  
  const variantClasses = {
    default: '',
    gradient: 'bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg',
    simple: 'border-b border-gray-200 pb-4'
  };
  
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-4xl',
    xl: 'text-5xl'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className={classes}>
      <div className="flex items-center justify-between">
        <div>
          {title && (
            <h1 className={`font-bold ${sizeClasses[size]} ${variant === 'gradient' ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h1>
          )}
          {subtitle && (
            <p className={`mt-2 ${variant === 'gradient' ? 'text-blue-100' : 'text-gray-600'}`}>
              {subtitle}
            </p>
          )}
        </div>
        {children && (
          <div className="flex items-center space-x-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header; 