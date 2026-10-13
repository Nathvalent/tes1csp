import Badge from "./Badge";
import styles from "./MenuCard.module.css";

const formatRupiah = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

export default function MenuCard({ menu, onTambah }) {
  const habis = menu.stok === 0;
  return (
    <div className={`${styles.card} ${habis ? styles.habis : ""}`}>
      <div className={styles.header}>
        <span className={styles.nama}>{menu.nama}</span>
        <Badge className={styles[menu.kategori]}>{menu.kategori}</Badge>
      </div>
      <div className={styles.harga}>{formatRupiah(menu.harga)}</div>
      <div className={styles.footer}>
        {habis ? (
          <Badge className={styles.badgeHabis}>Habis</Badge>
        ) : (
          <span className={styles.stok}>Stok: {menu.stok}</span>
        )}
        <button
          className={styles.btnTambah}
          onClick={() => onTambah(menu)}
          disabled={habis}
        >
          + Tambah
        </button>
      </div>
    </div>
  );
}
