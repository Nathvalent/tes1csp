import { useState, useEffect } from "react";
import { semuaMenu } from "./data/menu";
import FilterBar from "./components/FilterBar";
import MenuList from "./components/MenuList";
import Keranjang from "./components/Keranjang";
import TimerSesi from "./components/TimerSesi";
import FormTambahMenu from "./components/FormTambahMenu";
import styles from "./App.module.css";

export default function App() {
  const [daftarMenu, setDaftarMenu] = useState(semuaMenu);
  const [keyword, setKeyword] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("");
  const [keranjang, setKeranjang] = useState(() => {
    try {
      const saved = localStorage.getItem("keranjang");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [tampilTimer, setTampilTimer] = useState(true);

  // Simpan keranjang ke localStorage
  useEffect(() => {
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
  }, [keranjang]);

  // Update judul tab
  useEffect(() => {
    const total = keranjang.reduce((s, i) => s + i.qty, 0);
    document.title = total > 0 ? `(${total}) KantinKita` : "KantinKita";
  }, [keranjang]);

  // Daftar kategori dari data (dengan jumlah)
  const daftarKategori = [...new Set(daftarMenu.map((m) => m.kategori))].map((nama) => ({
    nama,
    jumlah: daftarMenu.filter((m) => m.kategori === nama).length,
  }));

  // Filter menu
  const menuTerfilter = daftarMenu.filter((m) => {
    const cocokKeyword = m.nama.toLowerCase().includes(keyword.toLowerCase());
    const cocokKategori = kategoriAktif === "" || m.kategori === kategoriAktif;
    return cocokKeyword && cocokKategori;
  });

  function handleTambahKeKeranjang(menu) {
    setKeranjang((prev) => {
      const ada = prev.find((i) => i.id === menu.id);
      if (ada) {
        return prev.map((i) => i.id === menu.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: menu.id, nama: menu.nama, harga: menu.harga, qty: 1 }];
    });
  }

  function handleUbahQty(id, delta) {
    setKeranjang((prev) => {
      const updated = prev.map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i);
      return updated.filter((i) => i.qty > 0);
    });
  }

  function handleHapus(id) {
    setKeranjang((prev) => prev.filter((i) => i.id !== id));
  }

  function handleTambahMenu(menuBaru) {
    setDaftarMenu((prev) => [...prev, menuBaru]);
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.logo}>KantinKita</h1>
        <div className={styles.headerRight}>
          {tampilTimer && <TimerSesi />}
          <button
            className={styles.btnTimer}
            onClick={() => setTampilTimer((v) => !v)}
          >
            {tampilTimer ? "Sembunyikan Timer" : "Tampilkan Timer"}
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.kiri}>
          <FilterBar
            keyword={keyword}
            onKeywordChange={setKeyword}
            kategoriAktif={kategoriAktif}
            onKategoriChange={setKategoriAktif}
            daftarKategori={daftarKategori}
          />
          <MenuList
            menuTerfilter={menuTerfilter}
            keyword={keyword}
            kategoriAktif={kategoriAktif}
            onTambah={handleTambahKeKeranjang}
          />
        </section>

        <aside className={styles.kanan}>
          <Keranjang
            items={keranjang}
            onUbahQty={handleUbahQty}
            onHapus={handleHapus}
          />
          <FormTambahMenu onTambahMenu={handleTambahMenu} />
        </aside>
      </main>
    </div>
  );
}
