import React from 'react';
import './Button.css';
import { Camera, Search } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  glow = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`button button-${variant} button-${size} ${glow ? 'button-glow' : ''} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="spinner" />
      )}
      {Icon && iconPosition === 'left' && !loading && <Icon size={20} />}
      {children}
      {Icon && iconPosition === 'right' && !loading && <Icon size={20} />}
    </button>
  );
};

