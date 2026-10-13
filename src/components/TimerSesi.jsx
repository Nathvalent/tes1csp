import { useState, useEffect } from "react";
import styles from "./TimerSesi.module.css";

export default function TimerSesi() {
  const [detik, setDetik] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setDetik((d) => d + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(detik / 60)).padStart(2, "0");
  const ss = String(detik % 60).padStart(2, "0");

  return <span className={styles.timer}>⏱ Sesi: {mm}:{ss}</span>;
}
