/* Мини-игра «встречка», вид сверху. Все настройки: CONFIG.game в script.js */
(function () {
  const G = CONFIG.game, openBtn = $("gameOpen");
  if (!G || !G.enabled || !openBtn) return;

  const modal = $("gameModal"), cv = $("gameCv"), ctx = cv.getContext("2d"), panel = $("gpanel");
  const W = 360, H = 600, RL = 40, RR = 320, LANES = 4, CW = 40, CH = 74, PY = H - 110;
  const COLORS = ["#c0392b", "#e0b040", "#2e9d6b", "#8e5bd1", "#d9d9d9", "#e67e22"];
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = W * dpr; cv.height = H * dpr; ctx.scale(dpr, dpr);
  $("gameTitle").textContent = G.title;
  $("gameLead").textContent = G.lead;

  let st = null, raf = 0, last = 0;
  const keys = {};

  function rr(x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function drawCar(x, y, color, up) {
    ctx.save(); ctx.translate(x, y); if (!up) ctx.rotate(Math.PI);
    ctx.fillStyle = "rgba(0,0,0,.35)"; rr(-CW / 2 + 3, -CH / 2 + 5, CW, CH, 9); ctx.fill();
    ctx.fillStyle = color; rr(-CW / 2, -CH / 2, CW, CH, 9); ctx.fill();
    ctx.fillStyle = "#0b1020"; rr(-CW / 2 + 5, -CH / 2 + 16, CW - 10, 14, 4); ctx.fill();
    rr(-CW / 2 + 6, CH / 2 - 24, CW - 12, 10, 3); ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,.18)"; ctx.fillRect(-CW / 2 + 6, -CH / 2 + 31, CW - 12, CH - 56);
    ctx.fillStyle = "#fff4d6"; ctx.fillRect(-CW / 2 + 3, -CH / 2 + 2, 9, 4); ctx.fillRect(CW / 2 - 12, -CH / 2 + 2, 9, 4);
    ctx.fillStyle = "#ff3b30"; ctx.fillRect(-CW / 2 + 3, CH / 2 - 5, 9, 3); ctx.fillRect(CW / 2 - 12, CH / 2 - 5, 9, 3);
    ctx.restore();
  }

  function draw(s) {
    ctx.fillStyle = "#0a1226"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#171c27"; ctx.fillRect(RL, 0, RR - RL, H);
    ctx.fillStyle = "#c9d3ee"; ctx.fillRect(RL - 3, 0, 3, H); ctx.fillRect(RR, 0, 3, H);
    const lw = (RR - RL) / LANES;
    for (let i = 1; i < LANES; i++) for (let y = s.off - 240; y < H; y += 80) ctx.fillRect(RL + i * lw - 2, y, 4, 40);
    for (let y = s.off - 240; y < H; y += 240) {            // свет фонарей на обочине
      [[RL - 8, 1], [RR + 8, -1]].forEach(([lx, dir]) => {
        const g = ctx.createRadialGradient(lx, y, 4, lx, y, 120);
        g.addColorStop(0, "rgba(255,208,130,.38)"); g.addColorStop(1, "rgba(255,208,130,0)");
        ctx.fillStyle = g; ctx.fillRect(lx - 120, y - 120, 240, 240);
        ctx.fillStyle = "#fff4d6"; ctx.fillRect(lx + dir * 14 - 3, y - 3, 6, 6);
      });
    }
    const g = ctx.createLinearGradient(0, PY - CH / 2, 0, PY - 260);
    g.addColorStop(0, "rgba(255,244,214,.35)"); g.addColorStop(1, "rgba(255,244,214,0)");
    ctx.fillStyle = g; ctx.beginPath();
    ctx.moveTo(s.px - 14, PY - CH / 2); ctx.lineTo(s.px + 14, PY - CH / 2);
    ctx.lineTo(s.px + 70, PY - 260); ctx.lineTo(s.px - 70, PY - 260); ctx.fill();
    s.cars.forEach((c) => drawCar(c.x, c.y, c.c, false));
    drawCar(s.px, PY, "#2c5cd6", true);
    ctx.fillStyle = "rgba(0,0,0,.45)"; ctx.fillRect(10, 10, W - 20, 10);
    ctx.fillStyle = "#ffc15e"; ctx.fillRect(10, 10, (W - 20) * Math.min(1, s.dist / G.winDistance), 10);
    ctx.fillStyle = "#fff"; ctx.font = "600 14px Manrope, sans-serif"; ctx.textAlign = "left";
    ctx.fillText(Math.round(s.dist) + " / " + G.winDistance + " м", 12, 42);
    ctx.textAlign = "right"; ctx.fillText(Math.round(s.sp) + " км/ч", W - 12, 42);
  }

  const fresh = () => ({ px: W / 2, tx: W / 2, cars: [], dist: 0, t: 0, sp: 0, top: 0, spawn: 0.6, off: 0, done: false });

  function ui(title, text, img, btns) {
    panel.textContent = ""; panel.hidden = false;
    const h = document.createElement("h3"); h.textContent = title; panel.append(h);
    if (img) { const im = document.createElement("img"); im.src = img; im.alt = ""; im.onerror = () => im.remove(); panel.append(im); }
    const p = document.createElement("p"); p.textContent = text; panel.append(p);
    const row = document.createElement("div"); row.className = "brow";
    btns.forEach(([label, fn]) => {
      const b = document.createElement("button"); b.type = "button"; b.textContent = label; b.onclick = fn; row.append(b);
    });
    panel.append(row);
  }

  function begin() {
    st = fresh(); panel.hidden = true; last = performance.now();
    cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
  }

  function end(win) {
    const s = st; s.done = true; cancelAnimationFrame(raf);
    const stat = "Дистанция " + Math.round(s.dist) + " м, максимум " + Math.round(s.top) + " км/ч.";
    if (win) {
      ui(G.winTitle, G.winText + " " + stat, G.winImage, [["Ещё раз", begin], ["Закрыть", close]]);
      if (typeof salute === "function") salute();
    } else {
      ui("Бабах!", stat + " Попробуем ещё?", null, [["Ещё раз", begin], ["Закрыть", close]]);
    }
  }

  function loop(now) {
    const s = st; if (!s) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now; s.t += dt;
    s.sp = Math.min(G.maxSpeed, G.startSpeed + (s.t * (G.maxSpeed - G.startSpeed)) / 45);
    s.top = Math.max(s.top, s.sp);
    const pps = s.sp * 1.5;
    s.dist += (s.sp / 3.6) * dt; s.off = (s.off + pps * dt) % 240;
    const R = +!!(keys.ArrowRight || keys.d || keys["в"]), L = +!!(keys.ArrowLeft || keys.a || keys["ф"]);
    if (R - L) s.tx += (R - L) * 420 * dt;
    s.tx = Math.max(RL + CW / 2 + 4, Math.min(RR - CW / 2 - 4, s.tx));
    s.px += (s.tx - s.px) * Math.min(1, dt * 14);
    s.spawn -= dt;
    if (s.spawn <= 0) {
      const n = s.t > 12 && Math.random() < 0.25 ? 2 : 1, used = [];
      while (used.length < n) { const l = (Math.random() * LANES) | 0; if (!used.includes(l)) used.push(l); }
      used.forEach((l) => s.cars.push({
        x: RL + (l + 0.5) * ((RR - RL) / LANES) + (Math.random() - 0.5) * 24, y: -CH, k: 1 + Math.random() * 0.3,
        c: COLORS[(Math.random() * COLORS.length) | 0]
      }));
      s.spawn = (Math.max(240, 340 - s.t * 2.5) * (0.7 + Math.random() * 0.6)) / pps;
    }
    s.cars.forEach((c) => (c.y += pps * c.k * dt));
    s.cars = s.cars.filter((c) => c.y < H + CH);
    draw(s);
    if (s.cars.some((c) => Math.abs(c.x - s.px) < CW - 3 && Math.abs(c.y - PY) < CH - 8)) return end(false);
    if (s.dist >= G.winDistance) return end(true);
    raf = requestAnimationFrame(loop);
  }

  function open() {
    modal.hidden = false; document.body.classList.add("modal-open");
    st = fresh(); draw(st);
    ui(G.title, "Объезжай встречные машины и проедь " + G.winDistance + " м. Управление: стрелки или A / D, на телефоне веди пальцем по экрану.", null, [["Поехали", begin]]);
  }
  function close() {
    cancelAnimationFrame(raf); st = null; modal.hidden = true; document.body.classList.remove("modal-open");
  }

  const aim = (e) => {
    if (!st || st.done) return;
    const r = cv.getBoundingClientRect(); st.tx = ((e.clientX - r.left) / r.width) * W;
  };
  cv.addEventListener("pointerdown", aim); cv.addEventListener("pointermove", aim);
  addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") return close();
    keys[e.key.length === 1 ? e.key.toLowerCase() : e.key] = true;
    if (e.key.startsWith("Arrow")) e.preventDefault();
  });
  addEventListener("keyup", (e) => { keys[e.key.length === 1 ? e.key.toLowerCase() : e.key] = false; });
  openBtn.addEventListener("click", open);
  $("gameClose").addEventListener("click", close);
})();
