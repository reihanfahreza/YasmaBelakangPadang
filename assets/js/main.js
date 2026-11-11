/**
 * YASMA — Yayasan Asma Husnul Khatimah, Belakang Padang
 * Interaksi situs: menu, dialog foto/video/berita, filter galeri, salin rekening.
 */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Header: garis bawah saat halaman discroll ---------- */
  const header = $('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  const toggle = $('.menu-toggle');
  const nav = $('#site-nav');
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 981px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- Dialog bersama (foto, video, berita) ---------- */
  const dialog = $('#media-dialog');
  const dialogBody = dialog ? $('.modal-body', dialog) : null;

  const openDialog = (html) => {
    if (!dialog) return;
    dialogBody.innerHTML = html;
    dialog.showModal();
  };

  if (dialog) {
    $('.modal-close', dialog).addEventListener('click', () => dialog.close());
    // Klik di luar kotak (area backdrop) menutup dialog
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => {
      $$('video', dialog).forEach((v) => v.pause());
      dialogBody.innerHTML = '';
    });
  }

  /* Foto & video: tombol dengan data-media */
  $$('[data-media]').forEach((el) => {
    el.addEventListener('click', () => {
      const { media, src, title = '', desc = '' } = el.dataset;
      const inner = media === 'video'
        ? `<video src="${esc(src)}" controls autoplay playsinline></video>`
        : `<img src="${esc(src)}" alt="${esc(title)}">`;
      openDialog(`
        <div class="modal-media">${inner}</div>
        <h3>${esc(title)}</h3>
        ${desc ? `<p class="modal-desc">${esc(desc)}</p>` : ''}
      `);
    });
  });

  /* Pratinjau video saat kursor diarahkan (hanya desktop, tanpa reduced motion) */
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canHover && !reduceMotion) {
    $$('.tile video').forEach((video) => {
      const tile = video.closest('.tile');
      tile.addEventListener('mouseenter', () => { video.play().catch(() => {}); });
      tile.addEventListener('mouseleave', () => { video.pause(); });
    });
  }

  /* ---------- Berita ---------- */
  const NEWS = {
    1: {
      title: 'Wisuda Santri BMGQ: santri TPQ Husnul Khatimah pulang membawa predikat juara',
      category: 'Prestasi',
      date: '11 November 2026',
      author: 'Humas YASMA',
      image: 'assets/images/foto-wisuda-santri.jpg',
      body: [
        '<strong>BELAKANG PADANG</strong> — Wisuda Santri Badan Musyawarah Guru Al-Qur\'an (BMGQ) Kecamatan Belakang Padang berlangsung khidmat. Puluhan santri TPQ Asma Husnul Khatimah menuntaskan ujian munaqasyah Al-Qur\'an dengan predikat memuaskan.',
        'Beberapa santri yayasan meraih predikat juara dan sertifikat penghargaan, di antaranya <strong>M. Fahri Alfattah</strong>, <strong>Aisur Rizqi</strong>, dan <strong>Masyitah Fitri</strong>.',
        'Pimpinan yayasan berterima kasih kepada para ustadz dan ustadzah yang sabar membimbing santri dari kelas dasar hingga lancar membaca Al-Qur\'an secara tartil. Semoga wisuda ini membuat anak-anak Belakang Padang makin cinta kepada Al-Qur\'an dan mengamalkannya.'
      ]
    },
    2: {
      title: 'Beras dan santunan untuk anak yatim, dhuafa, dan penarik becak di Kampung Baru',
      category: 'Sosial',
      date: '8 November 2026',
      author: 'Divisi Sosial YASMA',
      image: null, // belum ada foto kegiatan sosial — tambahkan di sini bila sudah ada
      body: [
        '<strong>BELAKANG PADANG</strong> — Yayasan Asma Husnul Khatimah kembali menyalurkan beras dan santunan tunai untuk kaum dhuafa dan anak-anak yatim binaan di Kampung Baru dan sekitarnya.',
        'Bantuan juga diberikan kepada para penarik becak tradisional, yang setiap hari menjadi tumpuan warga untuk bepergian di pulau. Seluruh bantuan berasal dari infaq dan sedekah para donatur yang dititipkan kepada yayasan.',
        'Yayasan mengucapkan terima kasih kepada seluruh muhsinin atas kepeduliannya kepada warga pulau.'
      ]
    },
    3: {
      title: 'Halaqah tajwid untuk para pengajar TPQ',
      category: 'Pendidikan',
      date: '2 November 2026',
      author: 'Bidang Kurikulum',
      image: 'assets/images/foto-belajar-mengaji.jpg',
      body: [
        '<strong>BELAKANG PADANG</strong> — Yayasan Asma Husnul Khatimah menggelar halaqah tajwid, makharijul huruf, dan metode mengajar Al-Qur\'an bagi para pengajar TPQ.',
        'Halaqah ini menjaga agar bacaan yang diajarkan kepada santri tetap tartil dan seragam di semua kelas, sekaligus membiasakan adab belajar Al-Qur\'an sejak dini.',
        'Dengan kurikulum yang terarah, santri diharapkan tumbuh dengan akidah yang kokoh dan akhlak yang baik.'
      ]
    }
  };

  $$('[data-news-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const a = NEWS[btn.dataset.newsId];
      if (!a) return;
      openDialog(`
        <article class="article">
          <p class="news-meta"><span class="cat">${a.category}</span><span>${a.date}</span><span>· ${a.author}</span></p>
          <h3>${a.title}</h3>
          ${a.image ? `<div class="modal-media modal-media-photo"><img src="${a.image}" alt=""></div>` : ''}
          ${a.body.map((p) => `<p>${p}</p>`).join('')}
        </article>
      `);
    });
  });

  /* ---------- Filter galeri ---------- */
  const chips = $$('.chip[data-filter]');
  const items = $$('.gallery [data-category]');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      items.forEach((it) => { it.hidden = !(f === 'all' || it.dataset.category === f); });
    });
  });

  /* ---------- Salin nomor rekening ---------- */
  const toast = (message) => {
    let el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 2800);
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Cadangan untuk browser lama / file:// tanpa izin clipboard
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    }
  };

  $$('[data-copy]').forEach((btn) => {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy;
      const ok = await copyText(value);
      if (!ok) { toast('Gagal menyalin. Silakan salin manual.'); return; }
      btn.textContent = 'Tersalin';
      btn.classList.add('is-done');
      toast(`Nomor rekening ${value} disalin`);
      setTimeout(() => { btn.textContent = label; btn.classList.remove('is-done'); }, 2000);
    });
  });
})();
