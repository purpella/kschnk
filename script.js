/* ====== РЕДАКТИРУЙ ТОЛЬКО ЭТОТ БЛОК ====== */
const CONFIG = {
  name: "Кирилл",
  subtitle: "Кайфуй так как ты уже это делаешь на своей А6 (не путать с А4): ровно, быстро и с попутным ветром.",
  wishes: [
    { t: "Здоровье", d: "Чтобы без  радиатор брокен (похренокен🤣😂🤣😂🤣)." },
    { t: "Удача", d: "Зелёная волна на всех светофорах и свободная парковка в центре ТМБ." },
    { t: "Драйв", d: "Больше дорог, поездок и мест, куда стоит доехать." }
  ],
  stats: [
    { n: 100, s: "%", l: "Здоровье" },
    { n: 0, s: "", l: "Поломок" },
    { n: 999999, s: "", l: "Километров впереди" },
    { n: 6, s: " цил.", l: "Настроение" }
  ],
  memories: [
    { y: "Топ 1", t: "Крипи place." },
    { y: "Топ 2", t: "Тулиновка." },
    { y: "Топ 3", t: "Когдаа они говорят бовоят фто ты не сможешь собрать тот самый лук тем временеее я🤣🤣." }
  ],
  final: "Спасибо, что ты рядом. Я очень тебя уважаю и ценю, продолжай оставаться собой и радовать родных и близких, ежже.",
  signature: "С любовью, твой друг Масел",

  /* ---------- НОВОЕ: кастомизация ---------- */
  // Порядок разделов. Убери id из списка, чтобы скрыть раздел.
  sections: ["hero", "wishes", "gallery", "stats", "road", "video", "game", "finish"],
  // Фотоальбом (раздел появится, когда список не пуст). Файлы клади в папку photos/
  gallery: [
     { src: "photos/1.jpg", caption: "Sharaga mood" },
     { src: "photos/2.jpg", caption: "Badminton mood" },
     { src: "photos/3.jpg", caption: "Offnik mood" },
     { src: "photos/4.jpg", caption: "Drip mood" },
     { src: "photos/5.jpg", caption: "Sueta mood" },
     { src: "photos/6.jpg", caption: "Zesty mood" },
    
  ],
  // Видео: свой файл (videos/trip.mp4) или YouTube (id из ссылки). Пока список пуст, раздела нет.
  videos: [
     { src: "videos/trip.mp4", poster: "photos/cover.jpg",  title: "Гранд мувик" },
    // { youtube: "ID_РОЛИКА", title: "Ролик" },
  ],
  // Музыка: "music/track.mp3" (запустится после кнопки ГАЗ!). Пусто = без музыки.
  music: "music/track.mp3",
  musicVolume: 0.05,   // громкость музыки: от 0 (тишина) до 1 (максимум)
  // Цвета: accent (золотой) и blue (синий)
  theme: { accent: "#ffc15e", blue: "#3a6cf0" },
  // Мини-игра «встречка»
  game: {
    enabled: true,
    title: "Мини-игра: встречка",
    lead: "Объезжай встречный трафик и доезжай до финиша. Справишься, получишь сюрприз.",
    winDistance: 2000,     // сколько метров надо проехать
    startSpeed: 150,        // км/ч в начале
    maxSpeed: 330,         // км/ч в конце разгона
    winImage: "meme.jpg",  // твоё фото/мем для победы (положи рядом с index.html)
    winTitle: "Финиш! Ты победил",
    winText: "Держи заслуженного афро-бурята."
  },

  // Заставка под трек. Музыка стартует по кнопке ГАЗ!, все времена в секундах от начала трека.
  // Подгонка: открой index.html?introdebug=1, слушай трек и нажимай M на каждом реве, Enter на дропе.
  intro: {
    enabled: true,
    revs: [                                 // моменты ревов: появляется картинка вместо чёрного экрана
      { at: 0.4, dur: 1.4, img: "intro/1.png" },                //   можно свои кадры: img: "intro/a.jpg" или ["intro/1.jpg", "intro/2.jpg"]
      { at: 7.5, dur: 1.6, power: 1.3, img: "intro/2.png" }     //   power: сила эффекта (тряска, свет)
    ],
    dropAt: 14.0,                            // секунда дропа: вспышка и появление сайта
    hits: [],                               // доп. вспышки в такт, например [4.0, 4.5, 5.0]
    video: "",                              // например "intro/intro.mp4" (без звука, видно на ревах)
    videoAlways: false,                     // true: видео видно всё время заставки
    fps: 12,                                // скорость смены кадров, если img это список
    confetti: false,                        // true: салют на дропе
    skipText: "Пропустить"
  },

  // Припаркованные машины на фоне (PNG сбоку). Кладёшь файлы рядом с index.html.
  //  at     - где машина проезжает мимо центра экрана: 0 = старт, 1 = финиш (можно списком: [0.2, 0.6])
  //  scale  - размер относительно главной машины (0.85 = чуть меньше)
  //  bottom - высота над низом экрана в vh (больше = дальше от зрителя)
  //  mirror - true, если машину нужно развернуть в другую сторону
  parked: [
    { src: "parked1.png", at: 0.3, scale: 1, bottom: 8, mirror: false },
    { src: "parked2.png", at: 0.75, scale: 1, bottom: 8, mirror: false }
  ],

  car: {
    src: "car.png",        // файл с машиной рядом с index.html
    facesRight: true,      // true: на картинке капот смотрит вправо; false: влево
    spinWheels: true,      // вращать диски (false, если выглядит плохо)
    // Положение в долях картинки (0..1): x от левого края, y от верха, r радиус диска от ширины
    // у каждого колеса свои числа (на фото машина стоит чуть под углом)
    wheels: [{"x":0.211,"y":0.745,"r":0.067},{"x":0.804,"y":0.745,"r":0.066}],
    light: {"x":0.911,"y":0.538}
  }
};
/* Подгонка: открой index.html?debug=1, красные круги должны лечь на диски,
   красная точка на фару. Поправь числа выше и обнови страницу. */
/* ========================================= */

const $ = (id) => document.getElementById(id);
const root = document.documentElement, C = CONFIG.car;
const car = $("car"), box = $("carbox"), img = $("carImg"), beam = $("beam");
const DEBUG = location.search.includes("debug");
if (DEBUG) document.body.classList.add("dbg");

/* тексты */
document.title = "С днём рождения, " + CONFIG.name + "!";
$("name").textContent = CONFIG.name;
$("subtitle").textContent = CONFIG.subtitle;
$("final").textContent = CONFIG.final;
$("sign").textContent = CONFIG.signature;
const mk = (tag, cls, i) => { const e = document.createElement(tag); e.className = cls; e.style.setProperty("--i", i); return e; };
const lb = $("lightbox");
function openLb(src, cap) { $("lbImg").src = src; $("lbCap").textContent = cap || ""; lb.hidden = false; document.body.classList.add("modal-open"); }
function closeLb() { lb.hidden = true; document.body.classList.remove("modal-open"); }
lb.addEventListener("click", closeLb);
addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeLb(); });
function photo(src, cap) {
  const im = document.createElement("img");
  im.src = src; im.alt = cap || ""; im.loading = "lazy";
  im.onerror = () => im.remove();
  im.onclick = () => openLb(src, cap);
  return im;
}
CONFIG.wishes.forEach((w, i) => {
  const c = mk("div", "card rv", i), h = document.createElement("h3"), p = document.createElement("p");
  h.textContent = w.t; p.textContent = w.d; c.append(h, p); $("cards").append(c);
});
CONFIG.stats.forEach((s, i) => {
  const c = mk("div", "card rv", i), b = document.createElement("div"), h = document.createElement("h3");
  b.className = "big"; b.dataset.n = s.n; b.dataset.s = s.s; b.textContent = "0" + s.s;
  h.textContent = s.l; c.append(b, h); $("stats").append(c);
});
CONFIG.memories.forEach((m, i) => {
  const li = mk("li", "rv", i), b = document.createElement("b");
  b.textContent = m.y; li.append(b, document.createTextNode(m.t));
  if (m.img) li.append(photo(m.img, m.t));   // фото к воспоминанию: img: "photos/2.jpg"
  $("timeline").append(li);
});

/* ===== кастомизация: тема, фото, видео, порядок разделов, музыка ===== */
if (CONFIG.theme) { root.style.setProperty("--gold", CONFIG.theme.accent); root.style.setProperty("--blue", CONFIG.theme.blue); }
const GAL = CONFIG.gallery || [], VID = CONFIG.videos || [];
GAL.forEach((g, i) => {
  const f = mk("figure", "ph rv", i), cap = document.createElement("figcaption");
  cap.textContent = g.caption || ""; f.append(photo(g.src, g.caption), cap); $("gallery").append(f);
});
VID.forEach((v, i) => {
  const w = mk("div", "vid rv", i); let m;
  if (v.youtube) {
    m = document.createElement("iframe");
    m.src = "https://www.youtube-nocookie.com/embed/" + v.youtube;
    m.allow = "encrypted-media; picture-in-picture"; m.allowFullscreen = true; m.loading = "lazy"; m.title = v.title || "Видео";
  } else {
    m = document.createElement("video");
    m.src = v.src; m.controls = true; m.playsInline = true; m.preload = "metadata"; if (v.poster) m.poster = v.poster;
  }
  w.append(m);
  if (v.title) { const t = document.createElement("p"); t.textContent = v.title; w.append(t); }
  $("videos").append(w);
});
const main = document.querySelector("main"), byId = {};
main.querySelectorAll("section").forEach((sec) => (byId[sec.dataset.id] = sec));
const order = CONFIG.sections || Object.keys(byId);
const empty = { gallery: !GAL.length, video: !VID.length, game: !(CONFIG.game && CONFIG.game.enabled) };
order.forEach((id) => { if (byId[id] && !empty[id]) main.append(byId[id]); });
Object.keys(byId).forEach((id) => { if (!order.includes(id) || empty[id]) byId[id].remove(); });
if (CONFIG.music) {
  const bgm = $("bgm"), sb = $("sound");
  bgm.src = CONFIG.music; bgm.preload = "auto"; bgm.volume = Math.min(1, Math.max(0, CONFIG.musicVolume ?? 0.2)); sb.hidden = false;
  sb.onclick = () => { if (bgm.paused) { bgm.play(); sb.textContent = "🔊"; } else { bgm.pause(); sb.textContent = "🔇"; } };
}

/* появление блоков и счётчики */
function count(el) {
  const n = +el.dataset.n, s = el.dataset.s, t0 = performance.now();
  (function f(t) {
    const k = Math.min(1, (t - t0) / 1500), e = 1 - Math.pow(1 - k, 3);
    el.textContent = Math.round(n * e).toLocaleString("ru-RU") + s;
    if (k < 1) requestAnimationFrame(f);
  })(t0);
}
/* Следим за секциями, а не за самими .rv: у скрытых через clip-path элементов
   браузер считает площадь пересечения нулевой, и они бы никогда не показались */
function reveal(sec) {
  sec.querySelectorAll(".rv:not(.in)").forEach((el) => {
    el.classList.add("in");
    const big = el.querySelector(".big"); if (big) count(big);
  });
}
let ready = false;
const pending = [];
function siteReady() { ready = true; pending.splice(0).forEach(reveal); }
const io = "IntersectionObserver" in window
  ? new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { ready ? reveal(e.target) : pending.push(e.target); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -15% 0px" })
  : null;

/* навигация-точки */
const secs = [...document.querySelectorAll("section")];
const dots = secs.map((s) => {
  const b = document.createElement("button");
  b.type = "button"; b.setAttribute("aria-label", s.dataset.title);
  b.onclick = () => s.scrollIntoView({ behavior: "smooth" });
  $("dots").append(b); return b;
});
const navIo = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) dots.forEach((d, i) => d.classList.toggle("on", secs[i] === e.target));
}), { rootMargin: "-45% 0px -45% 0px" });
secs.forEach((s) => { navIo.observe(s); io ? io.observe(s) : reveal(s); });

/* машина из PNG */
let wheelEls = [];
img.src = C.src;
img.onerror = () => ($("nocar").hidden = false);
if (!C.facesRight) box.style.transform = "scaleX(-1)";
function layout() {
  const W = img.clientWidth, H = img.clientHeight; if (!W) return;
  wheelEls.forEach((e) => e.remove()); wheelEls = [];
  if (C.spinWheels) C.wheels.forEach((w) => {
    const d = document.createElement("div"), s = w.r * W * 2, l = w.x * W - w.r * W, t = w.y * H - w.r * W;
    d.className = "wheel";
    Object.assign(d.style, { width: s + "px", height: s + "px", left: l + "px", top: t + "px",
      backgroundImage: `url(${C.src})`, backgroundSize: `${W}px ${H}px`, backgroundPosition: `${-l}px ${-t}px` });
    box.append(d); wheelEls.push(d);
  });
  const lx = C.facesRight ? C.light.x : 1 - C.light.x;
  Object.assign(beam.style, { left: lx * W + "px", top: C.light.y * H + "px", width: W * 0.8 + "px", height: H * 0.5 + "px" });
}
img.addEventListener("load", () => { layout(); update(); });

/* припаркованные машины на фоне */
const PK = [];
(CONFIG.parked || []).forEach((p) => [].concat(p.at).forEach((at) => {
  const im = document.createElement("img");
  im.className = "pcar"; im.src = p.src; im.alt = ""; im.onerror = () => im.remove();
  $("parked").append(im);
  PK.push({ el: im, at, scale: p.scale || 0.85, bottom: p.bottom == null ? 8 : p.bottom, mirror: !!p.mirror });
}));

/* скролл: поездка */
let lastY = 0, lastT = performance.now(), speed = 0, ticking = false, fired = false;
function update() {
  const y = scrollY, max = Math.max(1, root.scrollHeight - innerHeight), p = Math.min(1, y / max);
  const W = car.offsetWidth, x = innerWidth * 0.02 + p * (innerWidth * 0.94 - W);
  const now = performance.now(), dy = y - lastY;
  speed = speed * 0.7 + (Math.abs(dy) / Math.max(16, now - lastT)) * 1000 * 0.3;
  const bob = Math.sin(y * 0.045) * 1.6, tilt = Math.max(-1.2, Math.min(1.2, dy * 0.05));
  car.style.transform = `translate3d(${x}px,${bob}px,0) rotate(${tilt}deg)`;
  if (wheelEls.length) {
    const ang = (x / (C.wheels[0].r * W)) * 57.3 * (C.facesRight ? 1 : -1);
    wheelEls.forEach((w) => (w.style.transform = `rotate(${ang}deg)`));
  }
  root.style.setProperty("--p", p.toFixed(3));
  root.style.setProperty("--rx", -y * 1.4 + "px");
  $("cityNear").style.backgroundPositionX = -y * 0.3 + "px";
  $("cityFar").style.backgroundPositionX = -y * 0.12 + "px";
  root.style.setProperty("--lx", -y * 1.6 + "px");
  const boost = (cxm) => {   // подсветка машины рядом с фонарём
    const lamp = (360 - y * 1.6) % 720, d0 = (((cxm - lamp) % 720) + 720) % 720, d = Math.min(d0, 720 - d0);
    return 1 + 0.3 * Math.exp(-((d / 170) ** 2));
  };
  car.style.filter = `brightness(${boost(x + W * 0.5).toFixed(3)})`;
  PK.forEach((k) => {         // стоят на месте, уезжают назад вместе с дорогой
    const w = W * k.scale, cxp = innerWidth * 0.5 + (k.at * max - y) * 1.4, left = cxp - w / 2;
    if (left > innerWidth + 60 || left + w < -60) { k.el.style.visibility = "hidden"; return; }
    k.el.style.visibility = "visible"; k.el.style.width = w + "px"; k.el.style.bottom = k.bottom + "vh";
    k.el.style.transform = `translate3d(${left}px,0,0)${k.mirror ? " scaleX(-1)" : ""}`;
    k.el.style.filter = `brightness(${(0.72 * boost(cxp)).toFixed(3)}) drop-shadow(0 5px 6px rgba(0,0,0,.6))`;
  });
  $("stars").style.backgroundPositionX = -y * 0.05 + "px";
  if (p < 0.8) fired = false;
  if (p > 0.985 && !fired && document.body.classList.contains("started")) { fired = true; salute(); }
  lastY = y; lastT = now; ticking = false;
}
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
addEventListener("resize", () => { layout(); update(); });
setInterval(() => { speed *= 0.82; $("kmh").textContent = Math.min(240, Math.round(speed / 25)); }, 100);
update();

/* старт */
let ac;
function rev() {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
    o.type = "sawtooth";
    o.frequency.setValueAtTime(55, t);
    o.frequency.exponentialRampToValueAtTime(160, t + 0.6);
    o.frequency.exponentialRampToValueAtTime(70, t + 1.3);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.2);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + 1.5);
  } catch (e) {}
}
function openSite(synth) {
  document.body.classList.remove("lock");
  document.body.classList.add("started");
  if (synth) rev();
  siteReady();
}
$("start").addEventListener("click", () => {
  $("curtain").classList.add("open");
  if (CONFIG.music) {
    const b = $("bgm");
    b.volume = Math.min(1, Math.max(0, CONFIG.musicVolume ?? 0.2)); b.currentTime = 0; b.play().catch(() => {});
  }
  if (CONFIG.intro && CONFIG.intro.enabled && window.runIntro) return window.runIntro(openSite);
  openSite(true);
});

/* салют */
const cv = $("confetti"), cx = cv.getContext("2d");
function fit() { cv.width = innerWidth; cv.height = innerHeight; }
fit(); addEventListener("resize", fit);
function salute() {
  const cols = ["#3a6cf0", "#ffc15e", "#ffffff", "#8fb0ff", "#ff5a4d"];
  const ps = Array.from({ length: 170 }, () => ({
    x: innerWidth / 2, y: innerHeight * 0.55, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 16 - 4,
    s: Math.random() * 7 + 3, c: cols[(Math.random() * cols.length) | 0], r: Math.random() * 6
  }));
  const t0 = performance.now();
  (function frame(t) {
    cx.clearRect(0, 0, cv.width, cv.height);
    ps.forEach((p) => {
      p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.r += 0.2;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
      cx.fillStyle = p.c; cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); cx.restore();
    });
    if (t - t0 < 3200) requestAnimationFrame(frame); else cx.clearRect(0, 0, cv.width, cv.height);
  })(t0);
}
$("salute").addEventListener("click", salute);

/* панель подгонки: index.html?debug=1 */
if (DEBUG) {
  const panel = document.createElement("div"), out = document.createElement("textarea");
  panel.className = "dbgp"; out.readOnly = true; out.rows = 5;
  const show = () => (out.value = "wheels: " + JSON.stringify(C.wheels) + ",\nlight: " + JSON.stringify(C.light));
  const row = (label, obj, key, max) => {
    const l = document.createElement("label"), r = document.createElement("input");
    r.type = "range"; r.min = 0; r.max = max; r.step = 0.001; r.value = obj[key];
    r.oninput = () => { obj[key] = +r.value; layout(); update(); show(); };
    l.append(label + " ", r); panel.append(l);
  };
  C.wheels.forEach((w, i) => { row("Колесо " + (i + 1) + " x", w, "x", 1); row("Колесо " + (i + 1) + " y", w, "y", 1); row("Колесо " + (i + 1) + " r", w, "r", 0.15); });
  row("Фара x", C.light, "x", 1); row("Фара y", C.light, "y", 1);
  panel.append(out); document.body.append(panel); show();
}
