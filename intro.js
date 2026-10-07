/* Заставка под трек: ревы мотора -> дроп -> сайт. Настройки: CONFIG.intro в script.js.
   Время берётся из самого трека (audio.currentTime), поэтому кадры попадают в музыку. */
(function () {
  const I = CONFIG.intro;
  if (!I || !I.enabled) return;
  const DBG = location.search.includes("introdebug");
  const bgm = $("bgm"), C = CONFIG.car;
  const revs = (I.revs || []).map((r) => ({ at: r.at, dur: r.dur || 1.5, power: r.power || 1, imgs: [].concat(r.img || []) }));
  const hits = (I.hits || []).map((t) => ({ t, f: false }));
  let dropAt = I.dropAt || 8, hasVid = !!I.video, done = false, raf = 0, t0 = 0, openSite = null;
  const marks = [];
  revs.forEach((r) => r.imgs.forEach((s) => (new Image().src = s)));   // заранее грузим кадры

  const el = document.createElement("div");
  el.className = "intro"; el.hidden = true;
  el.innerHTML =
    '<video class="iv" muted playsinline preload="auto"></video><img class="ifr" alt="">' +
    '<div class="isc"><div class="icarbox"><img class="icar" alt=""><div class="iglow"></div></div>' +
    '</div><div class="irpm" style="opacity:0;text-shadow:0 2px 14px #000"><span class="rn">0</span> RPM<i><b class="rb"></b></i></div>' +
    '<div class="iprog"><b></b></div><div class="iflash"></div><button class="iskip" type="button"></button>' +
    (DBG ? '<div class="idbg"></div>' : "");
  document.body.append(el);
  const q = (s) => el.querySelector(s);
  const vid = q(".iv"), fr = q(".ifr"), sc = q(".isc"), cbox = q(".icarbox"), car = q(".icar"), glow = q(".iglow"),
    rpm = q(".irpm"), rn = q(".rn"), rb = q(".rb"), prog = q(".iprog b"), fl = q(".iflash"), dbg = q(".idbg"), skip = q(".iskip");
  skip.textContent = I.skipText || "Пропустить";
  car.src = C.src;
  if (!C.facesRight) cbox.style.transform = "scaleX(-1)";
  glow.style.left = C.light.x * 100 + "%"; glow.style.top = C.light.y * 100 + "%";
  if (hasVid) { vid.src = I.video; vid.onerror = () => { hasVid = false; vid.remove(); }; } else vid.remove();

  function flash(a, dur) {
    fl.style.transition = "none"; fl.style.opacity = a; void fl.offsetWidth;
    fl.style.transition = "opacity " + (dur || 0.4) + "s ease-out"; fl.style.opacity = 0;
  }
  // время заставки: из трека, а если музыка не играет, по обычному таймеру
  const now = () => (CONFIG.music && !bgm.paused ? bgm.currentTime : (performance.now() - t0) / 1000);

  function frame() {
    if (done) return;
    const t = now();
    let act = null, e = 0;
    for (const r of revs) {
      if (t >= r.at && t <= r.at + r.dur) {
        act = r; e = Math.min(1, Math.sin(Math.PI * Math.pow((t - r.at) / r.dur, 0.6)) * r.power);
      }
    }
    const vis = act ? Math.min(1, e * 5) : 0;
    const tf = "translate(" + (Math.random() - 0.5) * 16 * e + "px," + (Math.random() - 0.5) * 16 * e + "px) scale(" + (1 + e * 0.07) + ")";
    const showImg = !hasVid && !!(act && act.imgs.length), showCar = !hasVid && !showImg;

    if (hasVid) { vid.style.opacity = I.videoAlways ? 1 : vis; vid.style.transform = tf; }
    fr.style.opacity = showImg ? vis : 0;
    if (showImg) {
      const k = Math.floor((t - act.at) * (I.fps || 12)) % act.imgs.length, key = act.at + ":" + k;
      if (fr.dataset.k !== key) { fr.dataset.k = key; fr.src = act.imgs[k]; }
      fr.style.transform = tf;
    }
    sc.style.opacity = showCar ? vis : 0;
    if (showCar) { sc.style.transform = tf; glow.style.opacity = e; }
    const showRpm = I.rpm !== false && !!act;          // счётчик оборотов виден на любых кадрах (rpm: false в CONFIG.intro выключит)
    rpm.style.opacity = showRpm ? vis : 0;
    if (showRpm) {
      rb.style.width = e * 100 + "%";
      rn.textContent = (Math.round((800 + e * 6200) / 50) * 50).toLocaleString("ru-RU");
    }
    hits.forEach((h) => { if (!h.f && t >= h.t) { h.f = true; flash(0.35, 0.35); } });
    prog.style.width = Math.min(100, (t / dropAt) * 100) + "%";
    if (dbg) dbg.textContent = t.toFixed(2) + " c\nM = рев, Enter = дроп\n" + marks.join("\n");
    if (!DBG && t >= dropAt) return drop();
    raf = requestAnimationFrame(frame);
  }

  function drop() {
    if (done) return; done = true; cancelAnimationFrame(raf);
    if (hasVid) vid.pause();
    flash(1, 1);
    el.classList.add("dropped");
    document.body.classList.add("drop");
    setTimeout(() => document.body.classList.remove("drop"), 1500);
    if (openSite) openSite(false);
    if (I.confetti && typeof salute === "function") salute();
    setTimeout(() => el.remove(), 1200);
  }

  if (DBG) {
    addEventListener("keydown", (e) => {
      if (done || el.hidden) return;
      const k = e.key.toLowerCase(), t = now().toFixed(2);
      if (k === "m" || k === "ь") marks.push("рев: at " + t);
      if (e.key === "Enter") marks.push("дроп: dropAt " + t);
      console.log(marks.join(" | "));
    });
  }

  window.runIntro = function (open) {
    openSite = open; el.hidden = false; t0 = performance.now();
    if (hasVid) { vid.currentTime = 0; vid.play().catch(() => {}); }
    skip.onclick = () => { if (CONFIG.music && !bgm.paused && !DBG) bgm.currentTime = dropAt; drop(); };
    raf = requestAnimationFrame(frame);
  };
})();
