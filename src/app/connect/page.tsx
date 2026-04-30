import { Contact } from "@/components/Spotlight/Contact";
import styles from "./page.module.css";

export const metadata = {
  title: "Connect | 22nd Avenue",
  description: "Get in touch with 22nd Avenue for artist management, careers, or business enquiries.",
};

export default function ConnectPage() {
  return (
    <main className={styles.main}>
      <div className={styles.spacer} />
      <Contact />
      <div className={styles.bottomSpacer} />
    </main>
  );
}
