import Image from "next/image";
import styles from "./login.module.css";
import logo from "@/public/logo.png";

interface IMainContentProps {
  title: string;
  subtitle: string;
}

export default function MainContent({ title, subtitle }: IMainContentProps) {
  return (
    <>
      {/* text content container */}
      <div className={styles.textContentContainer}>
        <Image
          src={logo}
          alt="Coptic Deacons School Logo"
          className={styles.logoImage}
        />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </>
  );
}
