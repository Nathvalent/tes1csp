import { useState } from "react";
import styles from "./Keranjang.module.css";

const formatRupiah = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

export default function Keranjang({ items, onUbahQty, onHapus }) {
  const [konfirmasiId, setKonfirmasiId] = useState(null);

  const totalItem = items.reduce((s, i) => s + i.qty, 0);
  const totalHarga = items.reduce((s, i) => s + i.harga * i.qty, 0);

  function handleHapusKlik(id) {
    if (konfirmasiId === id) {
      onHapus(id);
      setKonfirmasiId(null);
    } else {
      setKonfirmasiId(id);
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.judul}>🛒 Keranjang ({totalItem} item)</h2>
      {items.length === 0 ? (
        <p className={styles.kosong}>Keranjang masih kosong.</p>
      ) : (
        <>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                <span className={styles.nama}>{item.nama}</span>
                <div className={styles.kontrol}>
                  <button className={styles.btnQty} onClick={() => onUbahQty(item.id, -1)}>−</button>
                  <span className={styles.qty}>{item.qty}</span>
                  <button className={styles.btnQty} onClick={() => onUbahQty(item.id, 1)}>+</button>
                  <span className={styles.subtotal}>{formatRupiah(item.harga * item.qty)}</span>
                  <button className={styles.btnHapus} onClick={() => handleHapusKlik(item.id)}>Hapus</button>
                </div>
                {konfirmasiId === item.id && (
                  <div className={styles.konfirmasiRow}>
                    <span className={styles.konfirmasiTeks}>Yakin hapus?</span>
                    <button className={styles.btnHapusKonfirm} onClick={() => { onHapus(item.id); setKonfirmasiId(null); }}>Ya</button>
                    <button className={styles.btnBatal} onClick={() => setKonfirmasiId(null)}>Batal</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            Total: <strong>{formatRupiah(totalHarga)}</strong>
          </div>
        </>
      )}
    </div>
  );
}
