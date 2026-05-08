import React from 'react';
import styles from './StackedCard.module.css';

interface StackedCardProps {
  children: React.ReactNode;
  className?: string;
  zIndex?: number;
}

export function StackedCard({ children, className = "", zIndex }: StackedCardProps) {
  return (
    <div 
      className={`${styles.stackedCard} ${className}`} 
      style={zIndex !== undefined ? { zIndex } : undefined}
    >
      {children}
    </div>
  );
}
