import type { ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'info';
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({ 
  variant = 'secondary', 
  fullWidth = false, 
  className = '',
  children, 
  ...props 
}: ButtonProps) {
  const baseClass = 'custom-button';
  const variantClass = `btn-${variant}`;
  const widthClass = fullWidth ? 'btn-full-width' : '';
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${widthClass} ${className}`.trim()} 
      {...props}
    >
      {children}
    </button>
  );
}
