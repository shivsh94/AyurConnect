import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'medium',
  shadow = 'medium',
  hover = false,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200';
  
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };
  
  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg',
    xl: 'shadow-xl'
  };
  
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';

  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${hoverClasses} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card; 