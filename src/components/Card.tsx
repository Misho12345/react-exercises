import type { HTMLAttributes, ReactNode } from 'react';
import './Card.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: string;
  className?: string;
}

export function Card({ children, padding = '32px', className = '', style, ...rest }: CardProps) {
  return (
    <div 
      className={`custom-card ${className}`.trim()} 
      style={{ padding, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
