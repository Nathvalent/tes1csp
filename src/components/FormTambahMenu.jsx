import { useState } from "react";
import styles from "./FormTambahMenu.module.css";

const AWAL = { nama: "", kategori: "", harga: "", stok: "" };

export default function FormTambahMenu({ onTambahMenu }) {
  const [form, setForm] = useState(AWAL);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validasi() {
    const errs = {};
    if (form.nama.trim().length < 3) errs.nama = "Nama minimal 3 karakter.";
    if (!form.kategori) errs.kategori = "Kategori wajib dipilih.";
    if (!form.harga || Number(form.harga) <= 0) errs.harga = "Harga harus lebih dari 0.";
    if (form.stok === "" || Number(form.stok) < 0) errs.stok = "Stok tidak boleh negatif.";
    return errs;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const errs = validasi();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onTambahMenu({
      id: Date.now(),
      nama: form.nama.trim(),
      kategori: form.kategori,
      harga: Number(form.harga),
      stok: Number(form.stok),
    });
    setForm(AWAL);
    setErrors({});
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.judul}>Tambah Menu Baru</h2>

      <div className={styles.field}>
        <label htmlFor="f-nama">Nama</label>
        <input id="f-nama" name="nama" value={form.nama} onChange={handleChange} placeholder="Nama menu" />
        {errors.nama && <span role="alert" className={styles.error}>{errors.nama}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="f-kategori">Kategori</label>
        <select id="f-kategori" name="kategori" value={form.kategori} onChange={handleChange}>
          <option value="">-- Pilih kategori --</option>
          <option value="makanan">Makanan</option>
          <option value="minuman">Minuman</option>
          <option value="camilan">Camilan</option>
        </select>
        {errors.kategori && <span role="alert" className={styles.error}>{errors.kategori}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="f-harga">Harga (Rp)</label>
        <input id="f-harga" name="harga" type="number" min="1" value={form.harga} onChange={handleChange} placeholder="Contoh: 15000" />
        {errors.harga && <span role="alert" className={styles.error}>{errors.harga}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="f-stok">Stok</label>
        <input id="f-stok" name="stok" type="number" min="0" value={form.stok} onChange={handleChange} placeholder="Contoh: 10" />
        {errors.stok && <span role="alert" className={styles.error}>{errors.stok}</span>}
      </div>

      <button type="submit" className={styles.btnSubmit}>Tambahkan Menu</button>
    </form>
  );
}
