// ===== Data =====
const NO = "6288494421322";

const K = [
  { id: "sd", n: "Kelas SD", usia: "6–12 tahun", hari: ["Senin", "Rabu", "Jumat"], jam: "15.00", harga: "Rp700.000", e: "🎨" },
  { id: "smp", n: "Kelas SMP", usia: "12–15 tahun", hari: ["Rabu", "Kamis", "Jumat"], jam: "14.00", harga: "Rp900.000", e: "📚" },
  { id: "sma", n: "Kelas SMA", usia: "15–18 tahun", hari: ["Senin", "Selasa", "Rabu"], jam: "17.00", harga: "Rp1.200.000", e: "🚀" }
];

const W = [
  ["🧭", "Program sesuai jenjang", "Kelas SD, SMP, dan SMA membantu siswa belajar sesuai tahap pendidikannya.", "var(--yellow)"],
  ["🎯", "Belajar lebih terarah", "Membantu siswa memahami materi sekolah dan memperkuat dasar akademik.", "var(--blue-s)"],
  ["📆", "Jadwal yang jelas", "Hari, jam, dan biaya terlihat sejak awal agar mudah direncanakan.", "var(--purple)"],
  ["📍", "Lokasi mudah ditemukan", "Di Megasmart, Manado, lengkap dengan tautan peta.", "var(--yellow)"],
  ["💬", "Daftar praktis", "Langsung chat admin lewat WhatsApp, tanpa formulir panjang.", "var(--blue-s)"]
];

// ===== Helpers =====
const $ = s => document.querySelector(s);

const wa = k => "https://wa.me/" + NO + "?text=" + encodeURIComponent(
  k
    ? "Halo TalentaEdu, saya ingin mendaftar " + k + ". Mohon info selanjutnya."
    : "Halo TalentaEdu, saya ingin bertanya tentang program kursus."
);

function bind() {
  document.querySelectorAll("a.wa").forEach(a => {
    a.href = wa(a.dataset.kelas);
    a.target = "_blank";
    a.rel = "noopener";
  });
}

// ===== Render: kartu program =====
$("#cards").innerHTML = K.map(k => `<article class="card c-${k.id}">
 <span class="tag">${k.e} ${k.n}</span>
 <div class="price">${k.harga} <small>/ 4 pertemuan</small></div>
 <ul class="facts">
  <li><span>🎂</span><div>Usia ${k.usia}</div></li>
  <li><span>📅</span><div>${k.hari.join(", ")}</div></li>
  <li><span>🕒</span><div>Pukul ${k.jam} WITA</div></li>
  <li><span>🔁</span><div>4 kali pertemuan</div></li>
  <li><span>📍</span><div>Megasmart, Manado</div></li>
 </ul>
 <a class="btn wa full" data-kelas="${k.n}" href="#">Daftar ${k.n}</a></article>`).join("");

// ===== Render: jadwal mingguan =====
$("#sched").innerHTML = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map(d =>
  `<div class="sday"><b>${d}</b>${K.filter(k => k.hari.includes(d))
    .sort((a, b) => a.jam.localeCompare(b.jam))
    .map(k => `<span class="slot ${k.id}">${k.jam} · ${k.id.toUpperCase()}</span>`).join("")}</div>`
).join("");

// ===== Render: keunggulan =====
$("#why").innerHTML = W.map(w =>
  `<div class="card"><div class="ico" style="background:${w[3]}">${w[0]}</div><h3 class="why-title">${w[1]}</h3><p>${w[2]}</p></div>`
).join("");

// ===== Mini quiz =====
$("#opts").innerHTML = [
  ["sd", "Sekolah Dasar (usia 6–12 tahun)"],
  ["smp", "Sekolah Menengah Pertama (usia 12–15 tahun)"],
  ["sma", "Sekolah Menengah Atas (usia 15–18 tahun)"]
].map(o => `<button class="opt" aria-pressed="false" data-k="${o[0]}">${o[1]}</button>`).join("");

$("#opts").addEventListener("click", e => {
  const b = e.target.closest(".opt");
  if (!b) return;
  document.querySelectorAll(".opt").forEach(x => x.setAttribute("aria-pressed", x === b));
  const k = K.find(x => x.id === b.dataset.k), r = $("#res");
  r.className = "show";
  r.innerHTML = `<b style="font:700 1.3rem 'Baloo 2',sans-serif">Cocok untuk: ${k.n} ${k.e}</b><span>${k.hari.join(", ")} pukul ${k.jam} WITA · ${k.harga} untuk 4 pertemuan.</span><a class="btn wa" data-kelas="${k.n}" href="#">Daftar ${k.n}</a>`;
  bind();
});

bind();

// ===== Menu mobile =====
const bg = $("#burger"), mn = $("#menu");

bg.onclick = () => {
  const o = mn.classList.toggle("open");
  bg.setAttribute("aria-expanded", o);
  bg.setAttribute("aria-label", o ? "Tutup menu" : "Buka menu");
};

mn.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    mn.classList.remove("open");
    bg.setAttribute("aria-expanded", false);
  }
});

// ===== Tombol kembali ke atas =====
const up = $("#up");
addEventListener("scroll", () => up.classList.toggle("show", scrollY > 500), { passive: true });
up.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
