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
      style={{
        zIndex: zIndex ?? 10,
        // Explicitly set background inline so it can't be accidentally
        // overridden and expose the sticky video underneath on mobile
        backgroundColor: '#050505',
      }}
    >
      {children}
    </div>
  );
}
