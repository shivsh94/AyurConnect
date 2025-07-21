import React from 'react';

const Input = ({ 
  label,
  error,
  helperText,
  className = '',
  size = 'medium',
  variant = 'default',
  ...props 
}) => {
  const baseClasses = 'w-full border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  const variantClasses = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500'
  };

  const getVariantClass = () => {
    if (error) return variantClasses.error;
    return variantClasses[variant];
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${getVariantClass()} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={classes}
        {...props}
      />
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input; 