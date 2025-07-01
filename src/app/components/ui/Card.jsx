import React, { forwardRef } from 'react';
import './Card.css';

export const Card = forwardRef(({
  children,
  className = '',
  hover = false,
  glow = false,
  style,
  onClick
}, ref) => {
  return (
    <div 
      ref={ref}
      style={style}
      onClick={onClick}
      className={`card ${hover ? 'card-hover' : ''} ${glow ? 'card-glow' : ''} ${className}`}
    >
      {children}
    </div>
  );
});