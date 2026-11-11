# Website Yayasan Asma Husnul Khatimah (YASMA)
### Kampung Baru, Belakang Padang, Kota Batam

Situs statis (HTML + CSS + JS biasa, tanpa build) untuk YASMA dan tiga kegiatannya:

1. TPQ Husnul Khatimah
2. Majelis Sholawatan Al Madani
3. Kegiatan sosial (berbagi sembako dan takjil)

---

## Arah desain

- **Warna dari logo**: toska `#6BCBC0` dan emas `#B68E2C`, di atas latar krem seperti kertas mushaf, dengan hijau laut gelap (`#0C3532`) untuk teks dan seksi gelap. Semua warna ada sebagai variabel di bagian atas `assets/css/style.css`.
- **Huruf**: *Newsreader* (serif) untuk judul, *Plus Jakarta Sans* untuk teks, *Amiri* untuk tulisan Arab dan angka Arab (١ ٢ ٣ ٤).
- **Motif**: foto dibingkai lengkung mihrab, dan bintang delapan (seperti bintang di logo) sebagai ornamen kecil dan pola latar.

## Halaman

| File | Isi |
| --- | --- |
| `index.html` | Beranda: hero, hadits, tentang, 3 kegiatan, sorotan wisuda, video, kabar, infaq, lokasi |
| `profil.html` | Sejarah, visi & misi, susunan pengurus, dewan guru |
| `unit.html` | Detail 3 kegiatan + ajakan mendaftar |
| `berita.html` | Daftar kabar (isi lengkap muncul di popup, datanya di `assets/js/main.js`) |
| `galeri.html` | Foto & video dengan filter |
| `donasi.html` | Rekening, penyaluran infaq, langkah konfirmasi |
| `kontak.html` | Alamat, WhatsApp, email, jam layanan, peta |

Header dan footer sama di semua halaman. Kalau mengubah menu atau kontak, ubah di ketujuh file.

## Wajib diganti sebelum online

Data berikut masih contoh dari versi lama situs:

- Nomor WhatsApp `+62 812-7000-0000` (`6281270000000` di tautan `wa.me`)
- Nomor rekening BRK Syariah `101-20-00123` dan BSI `714-889-0123` (di `index.html` dan `donasi.html`, termasuk atribut `data-copy`)
- Nama lengkap Ibu Asiah (binti ...) di `index.html` dan `profil.html`
- Isi berita di `assets/js/main.js` (objek `NEWS`)

## Gambar

Gambar yang dipakai situs ada di `assets/images/`:

- `foto-wisuda-santri.jpg`, `foto-wisuda-halaman.jpg`: hasil potong dari foto WhatsApp (bar status HP dan bar hitam sudah dibuang)
- `logo-yasma-160.png`, `logo-yasma-512.png`: logo bulat dengan latar transparan

- `foto-tpq-*`, `foto-madani-*`, `foto-sosial-*`, `poster-*`: foto diam yang diambil dari video kegiatan, dikelompokkan per kegiatan

File asli (`wisuda-*.jpeg`, `logo-yasma.jpeg`) tidak dipakai lagi tapi tetap disimpan. Foto "bimbingan talaqqi" sudah dihapus atas permintaan yayasan.

## Video

Video di `assets/videos/` dinamai per kegiatan (`video-tpq-*`, `video-madani-*`, `video-sosial-*`). Video baru dimuat saat diputar atau disorot kursor, jadi halaman tetap ringan.

Video mentah dari WhatsApp disimpan di folder `_bahan/` dan tidak ikut ke GitHub. Video panjang (3:39 dan 1:50) sengaja tidak dipakai karena ukurannya besar (38 MB dan 20 MB).

## Setelah mengubah CSS atau JS

Jalankan:

```bash
npm run versi
```

Perintah ini memberi tanda versi (`style.css?v=…`, `main.js?v=…`) di ketujuh halaman, sehingga browser pengunjung langsung memuat file baru dan tidak memakai salinan lama dari cache. Tanpa ini, tampilan bisa rusak karena HTML sudah baru tapi CSS masih lama.

## Menjalankan

```bash
node server.js
```

Lalu buka `http://localhost:3000`. Bisa juga klik ganda `index.html`, tapi tombol "Salin" rekening lebih andal lewat server lokal.
