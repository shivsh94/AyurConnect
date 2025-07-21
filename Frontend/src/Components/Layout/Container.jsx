import React from 'react';

const Container = ({ 
  children, 
  className = '', 
  maxWidth = 'xl',
  padding = 'medium',
  center = false
}) => {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full'
  };
  
  const paddingClasses = {
    none: '',
    small: 'px-4',
    medium: 'px-6',
    large: 'px-8',
    xl: 'px-12'
  };

  const centerClass = center ? 'mx-auto' : '';
  
  const classes = `${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${centerClass} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Container; 