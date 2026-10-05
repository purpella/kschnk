/* ====== РЕДАКТИРУЙ ТОЛЬКО ЭТОТ БЛОК ====== */
const CONFIG = {
  name: "Кирилл",
  subtitle: "Кайфуй так как ты уже это делаешь на своей А6(не путать с А4): ровно, быстро и с попутным ветром.",
  wishes: [
    { t: "Здоровье", d: "Чтобы мотор тянул без чек-энджина и без капремонта." },
    { t: "Удача", d: "Зелёная волна на всех светофорах и свободная парковка у цели." },
    { t: "Драйв", d: "Больше дорог, поездок и мест, куда стоит доехать." }
  ],
  stats: [
    { n: 100, s: "%", l: "Здоровье" },
    { n: 0, s: "", l: "Поломок" },
    { n: 999999, s: "", l: "Километров впереди" },
    { n: 6, s: " цил.", l: "Настроение" }
  ],
  memories: [
    { y: "Начало", t: "Тот день, когда мы поняли, что дружим надолго." },
    { y: "Дорога", t: "Поездки, шутки и разговоры, которые длились дольше маршрута." },
    { y: "Сейчас", t: "Ты всё так же тот человек, на которого можно положиться." }
  ],
  final: "Спасибо, что ты рядом. Впереди ещё очень много километров, и я хочу проехать их вместе с тобой.",
  signature: "С любовью, твой друг Масел",

  car: {
    src: "car.png",        // файл с машиной рядом с index.html
    facesRight: true,      // true: на картинке капот смотрит вправо; false: влево
    spinWheels: true,      // вращать диски (false, если выглядит плохо)
    // Положение в долях картинки (0..1): x от левого края, y от верха, r радиус диска от ширины
    // у каждого колеса свои числа (на фото машина стоит чуть под углом)
    wheels: [{"x":0.213,"y":0.728,"r":0.064},{"x":0.79,"y":0.72,"r":0.066}],
    light: {"x":0.928,"y":0.521}
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
  b.textContent = m.y; li.append(b, document.createTextNode(m.t)); $("timeline").append(li);
});

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
const io = "IntersectionObserver" in window
  ? new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
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
  $("poles").style.backgroundPositionX = -y * 1.6 + "px";
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
$("start").addEventListener("click", () => {
  $("curtain").classList.add("open");
  document.body.classList.remove("lock");
  document.body.classList.add("started");
  rev();
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
