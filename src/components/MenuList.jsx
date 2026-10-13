import MenuCard from "./MenuCard";
import styles from "./MenuList.module.css";

export default function MenuList({ menuTerfilter, keyword, kategoriAktif, onTambah }) {
  if (menuTerfilter.length === 0) {
    return (
      <p className={styles.kosong}>
        Tidak ada menu
        {keyword ? ` untuk kata kunci "${keyword}"` : ""}
        {kategoriAktif ? ` dalam kategori "${kategoriAktif}"` : ""}
        .
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {menuTerfilter.map((m) => (
        <MenuCard key={m.id} menu={m} onTambah={onTambah} />
      ))}
    </div>
  );
}
