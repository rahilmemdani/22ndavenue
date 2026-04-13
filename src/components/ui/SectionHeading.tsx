import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`${styles.wrapper} ${
        align === "center" ? styles.center : styles.left
      } ${light ? styles.light : ""}`}
    >
      {label && <span className={styles.label}>{label}</span>}
      <h2 className={styles.title}>{title}</h2>
      <hr className={`accent-line ${align === "center" ? "accent-line--center" : ""}`} />
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
