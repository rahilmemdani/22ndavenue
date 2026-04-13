import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  id?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  id,
  type = "button",
  disabled = false,
  icon,
}: ButtonProps) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} id={id}>
        {children}
        {icon && <span className={styles.icon}>{icon}</span>}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      id={id}
      disabled={disabled}
    >
      {children}
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}
