import { useEffect, useRef, useState } from "react";
import myImage from "./assets/my.jpg";

// ═══════════════════════════════════════════════════
//  🌟 SHE IN THE STARS — React Component
//  Made with love 💜
//
//  APNI GF KI IMAGE DAALNI HAI?
//  Bas niche wali LINE BADLO:
//
//  const IMAGE_URL = "YOUR_IMAGE_URL_HERE";
//
//  Example:
//  const IMAGE_URL = "/girlfriend.png";   ← public folder mein rakhi ho
//  const IMAGE_URL = "https://i.imgur.com/xxxxx.jpg";  ← online URL
//
//  Agar image nahi daalni toh chhod do as-is,
//  silhouette automatically show hogi 💜
// ═══════════════════════════════════════════════════
const IMAGE_URL = myImage; // <-- YAHAN APNI IMAGE DAALO

// ═══════════════════════════════════════════════════
//  CUSTOMIZE KAR APNE ACCORDING:
// ═══════════════════════════════════════════════════
const HER_NAME = "Nishtha ji";       // ← Uska naam
const SUBTITLE = "taron mein bhi tera chehra dikhta hai";  // ← subtitle

export default function SheInTheStars() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const imgRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    // Image load karo
    if (IMAGE_URL !== "YOUR_IMAGE_URL_HERE") {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        imgRef.current = img;
        setImgLoaded(true);
      };
      img.onerror = () => {
        imgRef.current = null;
      };
      img.src = IMAGE_URL;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── STARS GENERATE ──
    const makeStars = () =>
      Array.from({ length: 320 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.006 + 0.001,
      }));

    let stars = makeStars();
    let shoots = [];
    let shootTimer = 0;
    let t = 0;

    const addShoot = () => {
      shoots.push({
        x: Math.random() * canvas.width * 0.65,
        y: Math.random() * canvas.height * 0.38,
        len: Math.random() * 130 + 60,
        speed: Math.random() * 13 + 6,
        alpha: 1,
        angle: Math.PI / 5.5,
      });
    };

    // ── NEBULA ──
    const drawNebula = (W, H) => {
      [
        { x: W * 0.18, y: H * 0.28, r: 200, c: "80,20,140" },
        { x: W * 0.78, y: H * 0.18, r: 160, c: "20,55,155" },
        { x: W * 0.5,  y: H * 0.65, r: 220, c: "30,110,95" },
        { x: W * 0.88, y: H * 0.58, r: 130, c: "120,20,70" },
        { x: W * 0.35, y: H * 0.8,  r: 150, c: "60,10,100" },
      ].forEach(({ x, y, r, c }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${c},0.2)`);
        g.addColorStop(1, `rgba(${c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // ── MOON ──
    const drawMoon = (W, H) => {
      const mx = W * 0.84, my = H * 0.12, mr = Math.min(W, H) * 0.065;
      const mg = ctx.createRadialGradient(mx - mr * 0.2, my - mr * 0.2, 2, mx, my, mr);
      mg.addColorStop(0, "#fff9e0");
      mg.addColorStop(0.55, "#ffe98a");
      mg.addColorStop(1, "rgba(255,220,100,0)");
      ctx.fillStyle = mg;
      ctx.beginPath();
      ctx.arc(mx, my, mr, 0, Math.PI * 2);
      ctx.fill();
      const glow = ctx.createRadialGradient(mx, my, mr * 0.8, mx, my, mr * 2.5);
      glow.addColorStop(0, "rgba(255,240,150,0.12)");
      glow.addColorStop(1, "rgba(255,240,150,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(mx, my, mr * 2.5, 0, Math.PI * 2);
      ctx.fill();
    };

    // ── GIRL SILHOUETTE (jab image nahi ho) ──
    const drawSilhouette = (W, H) => {
      const cx = W * 0.5;
      const cy = H * 0.74;
      const sc = Math.min(W, H) / 680;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(sc, sc);

      // body glow
      const bg2 = ctx.createRadialGradient(0, -100, 10, 0, -80, 180);
      bg2.addColorStop(0, "rgba(160,90,255,0.2)");
      bg2.addColorStop(1, "rgba(160,90,255,0)");
      ctx.fillStyle = bg2;
      ctx.beginPath();
      ctx.arc(0, -80, 180, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#120820";
      // head
      ctx.beginPath();
      ctx.arc(0, -205, 30, 0, Math.PI * 2);
      ctx.fill();
      // flowing hair left
      ctx.beginPath();
      ctx.moveTo(-28, -225);
      ctx.bezierCurveTo(-75, -185, -100, -110, -80, -20);
      ctx.bezierCurveTo(-65, 10, -52, 20, -42, 30);
      ctx.bezierCurveTo(-78, -20, -88, -100, -55, -185);
      ctx.closePath();
      ctx.fill();
      // hair right
      ctx.beginPath();
      ctx.moveTo(28, -225);
      ctx.bezierCurveTo(50, -200, 55, -165, 44, -145);
      ctx.fill();
      // neck + body
      ctx.beginPath();
      ctx.moveTo(-15, -175);
      ctx.bezierCurveTo(-38, -95, -48, -20, -52, 85);
      ctx.lineTo(52, 85);
      ctx.bezierCurveTo(48, -20, 38, -95, 15, -175);
      ctx.closePath();
      ctx.fill();
      // dress
      ctx.beginPath();
      ctx.moveTo(-52, 85);
      ctx.bezierCurveTo(-100, 165, -120, 240, -100, 285);
      ctx.lineTo(100, 285);
      ctx.bezierCurveTo(120, 240, 100, 165, 52, 85);
      ctx.closePath();
      ctx.fill();
      // arm left (raised)
      ctx.beginPath();
      ctx.moveTo(-22, -145);
      ctx.bezierCurveTo(-65, -190, -100, -245, -115, -285);
      ctx.lineWidth = 16;
      ctx.strokeStyle = "#120820";
      ctx.lineCap = "round";
      ctx.stroke();
      // arm right (raised)
      ctx.beginPath();
      ctx.moveTo(22, -145);
      ctx.bezierCurveTo(65, -190, 100, -245, 115, -285);
      ctx.stroke();

      ctx.restore();
    };

    // ── GIRL IMAGE (jab image ho) ──
    const drawImage = (W, H) => {
      const img = imgRef.current;
      if (!img) return;
      const tH = H * 0.68;
      const ratio = img.naturalWidth / img.naturalHeight;
      const tW = tH * ratio;
      const x = W / 2 - tW / 2;
      const y = H - tH - H * 0.02;

      // Glow behind
      const gx = W / 2, gy = y + tH * 0.45;
      const glow = ctx.createRadialGradient(gx, gy, 20, gx, gy, tW * 0.9);
      glow.addColorStop(0, "rgba(180,80,255,0.28)");
      glow.addColorStop(0.5, "rgba(100,40,200,0.12)");
      glow.addColorStop(1, "rgba(100,40,200,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(gx, gy, tW * 0.9, 0, Math.PI * 2);
      ctx.fill();

      // ════════════════════════════════════
      //  IMAGE YAHAN CANVAS PE AAYEGI
      //  drawImage(img, x, y, width, height)
      // ════════════════════════════════════
      ctx.drawImage(img, x, y, tW, tH);
    };

    // ── HORIZON ──
    const drawHorizon = (W, H) => {
      const hy = H * 0.87;
      const g = ctx.createLinearGradient(0, hy - 80, 0, hy + 100);
      g.addColorStop(0, "rgba(80,25,140,0)");
      g.addColorStop(0.5, "rgba(80,25,140,0.25)");
      g.addColorStop(1, "rgba(15,8,35,0.7)");
      ctx.fillStyle = g;
      ctx.fillRect(0, hy - 80, W, 180);
    };

    // ── TEXT ──
    const drawText = (W, H, t) => {
      ctx.save();
      const pulse = 0.75 + 0.25 * Math.sin(t * 0.5);
      const titleSize = Math.max(24, Math.floor(W * 0.048));
      const subSize = Math.max(13, Math.floor(W * 0.02));

      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(220,160,255,0.95)";
      ctx.shadowBlur = 28;

      // Name / Title
      ctx.font = `bold ${titleSize}px 'Georgia', serif`;
      ctx.fillStyle = `rgba(255,238,220,${pulse})`;
      ctx.fillText(HER_NAME, W / 2, H * 0.1);

      // Subtitle
      ctx.shadowBlur = 12;
      ctx.font = `italic ${subSize}px 'Georgia', serif`;
      ctx.fillStyle = `rgba(210,185,255,${pulse * 0.75})`;
      ctx.fillText(SUBTITLE, W / 2, H * 0.1 + titleSize * 1.6);

      ctx.restore();
    };

    // ── MAIN LOOP ──
    const loop = () => {
      animRef.current = requestAnimationFrame(loop);
      t += 0.016;
      const W = canvas.width, H = canvas.height;

      // Sky
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#030110");
      bg.addColorStop(0.45, "#090420");
      bg.addColorStop(1, "#130728");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      drawNebula(W, H);

      // Stars twinkle
      stars.forEach((s) => {
        s.twinkle += s.speed;
        const a = 0.35 + 0.65 * Math.abs(Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });

      // Shooting stars
      shootTimer++;
      if (shootTimer > 110) { addShoot(); shootTimer = 0; }
      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i];
        const ex = s.x + Math.cos(s.angle) * s.len;
        const ey = s.y + Math.sin(s.angle) * s.len;
        const grad = ctx.createLinearGradient(s.x, s.y, ex, ey);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(1, `rgba(255,255,255,${s.alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.014;
        if (s.alpha <= 0) shoots.splice(i, 1);
      }

      drawMoon(W, H);
      drawHorizon(W, H);

      // Girl — image ya silhouette
      if (imgRef.current) {
        drawImage(W, H);
      } else {
        drawSilhouette(W, H);
      }

      drawText(W, H, t);
    };

    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [imgLoaded]);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#030110" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}