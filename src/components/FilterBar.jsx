import { useRef } from "react";
import styles from "./FilterBar.module.css";

export default function FilterBar({ keyword, onKeywordChange, kategoriAktif, onKategoriChange, daftarKategori }) {
  const inputRef = useRef(null);

  function handleBersihkan() {
    onKeywordChange("");
    inputRef.current.focus();
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchRow}>
        <label htmlFor="input-cari">Cari menu:</label>
        <input
          id="input-cari"
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(ev) => onKeywordChange(ev.target.value)}
          placeholder="Ketik nama menu..."
          className={styles.input}
        />
        {keyword && (
          <button onClick={handleBersihkan} className={styles.btnClear}>
            Bersihkan
          </button>
        )}
      </div>
      <div className={styles.filterRow}>
        <button
          className={`${styles.btnKategori} ${kategoriAktif === "" ? styles.aktif : ""}`}
          onClick={() => onKategoriChange("")}
        >
          Semua ({daftarKategori.reduce((s, k) => s + k.jumlah, 0)})
        </button>
        {daftarKategori.map((k) => (
          <button
            key={k.nama}
            className={`${styles.btnKategori} ${kategoriAktif === k.nama ? styles.aktif : ""}`}
            onClick={() => onKategoriChange(k.nama)}
          >
            {k.nama.charAt(0).toUpperCase() + k.nama.slice(1)} ({k.jumlah})
          </button>
        ))}
      </div>
    </div>
  );
}
