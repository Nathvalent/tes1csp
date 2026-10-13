# JAWABAN TEORI — Bagian A

## A1

function Profil({ sudahLogin }) {
 if (sudahLogin) {
 const [nama, setNama] = useState("");
 }
 // ...
}

Penulisan tersebut melanggar aturan Hooks karena `useState` dipanggil di dalam blok `if`, sehingga jumlah Hook yang dipanggil bisa berbeda antar render. React mencocokkan setiap state dengan Hook-nya berdasarkan **urutan pemanggilan** pada setiap render — bukan berdasarkan nama variabel. Jika kondisi `sudahLogin` berubah, urutan Hook bergeser dan React akan menghubungkan state yang salah ke Hook yang salah, menyebabkan bug yang sulit dilacak.

**Perbaikan:**

```jsx
function Profil({ sudahLogin }) {
  const [nama, setNama] = useState(""); // selalu dipanggil, tidak bersyarat
  if (!sudahLogin) return null;
  // ...
}
```

---

## A2

const tambah = (baru) => {
 items.push(baru);
 setItems(items);
};

Penyebabnya adalah **mutasi langsung** pada array yang sama. `items.push(baru)` mengubah isi array tanpa membuat objek baru, sehingga referensi `items` tetap sama. Ketika `setItems(items)` dipanggil dengan referensi yang sama, React membandingkan referensi lama dan baru — karena sama, React menganggap state tidak berubah dan melewati re-render.

**Perbaikan:**

```js
const tambah = (baru) => {
  setItems((prev) => [...prev, baru]); // array baru → referensi baru → re-render
};
```

---

## A3

useEffect(() => { ... }); // (a)
useEffect(() => { ... }, []); // (b)
useEffect(() => { ... }, [kota]); // (c)

- **(a)** `useEffect(() => { ... })` — dijalankan **setelah setiap render**, tanpa terkecuali.
- **(b)** `useEffect(() => { ... }, [])` — dijalankan **hanya sekali** setelah render pertama (mount), setara dengan `componentDidMount`.
- **(c)** `useEffect(() => { ... }, [kota])` — dijalankan setelah render pertama **dan** setiap kali nilai `kota` berubah.

**Dua kesempatan cleanup function dijalankan:**
1. Sebelum efek dijalankan ulang karena dependensi berubah (cleanup dari efek sebelumnya).
2. Saat komponen di-*unmount* dari DOM.

---

## A4

State `keyword` sebaiknya disimpan di **komponen induk** (parent) dari `FilterBar` dan `DaftarMenu`, karena kedua komponen bersaudara tidak bisa berbagi state secara langsung — teknik ini disebut *lifting state up*. Dengan menyimpan `keyword` di induk, kedua anak menerima nilai yang sama melalui props.

Yang "naik" dari `FilterBar` ke induknya bukan data, melainkan **fungsi callback** (event handler) seperti `onKeywordChange`. `FilterBar` memanggil fungsi tersebut saat input berubah, dan induk yang memperbarui state-nya sendiri.

---

## A5

*Controlled component* adalah komponen form (input, select, textarea) yang nilainya sepenuhnya dikendalikan oleh state React — setiap perubahan pada input memanggil `setState`, dan nilai input selalu mencerminkan state tersebut, bukan DOM.

Satu fungsi `handleChange` dapat menangani banyak input karena dua hal:
1. **`e.target.name`** — setiap input diberi atribut `name` yang unik, sehingga handler tahu field mana yang berubah.
2. **Computed property key** (`[name]: value`) — memungkinkan pembaruan objek state secara dinamis berdasarkan nama field tanpa menulis kondisi `if/else` untuk setiap input.
