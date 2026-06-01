"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

interface HUD { spd: number; alt: number; hdg: number; thr: number; stall: boolean; }

function buildAircraft(scene: THREE.Scene) {
  const group = new THREE.Group();
  const mat = new THREE.MeshLambertMaterial({ color: 0xf0f0f0 });
  const matRed = new THREE.MeshLambertMaterial({ color: 0xcc2222 });
  const matDark = new THREE.MeshLambertMaterial({ color: 0x333333 });

  // Fuselage
  const fuse = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 9), mat);
  group.add(fuse);
  // Nose cone
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.6, 2, 8), mat);
  nose.rotation.x = Math.PI / 2; nose.position.z = -5.5;
  group.add(nose);
  // Wings
  const wing = new THREE.Mesh(new THREE.BoxGeometry(14, 0.25, 3.5), mat);
  wing.position.z = 1; group.add(wing);
  // Wing tips (red)
  const tipL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 2.5), matRed);
  tipL.position.set(-7.4, 0.1, 1); group.add(tipL);
  const tipR = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 2.5), matRed);
  tipR.position.set(7.4, 0.1, 1); group.add(tipR);
  // Horizontal stabilizer
  const hstab = new THREE.Mesh(new THREE.BoxGeometry(6, 0.2, 1.8), mat);
  hstab.position.z = 4.2; group.add(hstab);
  // Vertical stabilizer
  const vstab = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 2.2), mat);
  vstab.position.set(0, 1.2, 4.2); group.add(vstab);
  // Engine nacelle
  const eng = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 2.5, 10), matDark);
  eng.rotation.x = Math.PI / 2; eng.position.z = -4.5;
  group.add(eng);
  // Propeller disc (semi-transparent)
  const propMat = new THREE.MeshBasicMaterial({ color: 0x222222, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
  const prop = new THREE.Mesh(new THREE.CircleGeometry(1.4, 16), propMat);
  prop.rotation.x = Math.PI / 2; prop.position.z = -5.8;
  prop.name = "prop"; group.add(prop);
  // Landing gear
  const gearMat = new THREE.MeshLambertMaterial({ color: 0x888888 });
  const gearL = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.5, 6), gearMat);
  gearL.position.set(-2, -1.3, 0.5); gearL.name = "gear"; group.add(gearL);
  const gearR = gearL.clone(); gearR.position.set(2, -1.3, 0.5); gearR.name = "gear"; group.add(gearR);
  const gearN = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.2, 6), gearMat);
  gearN.position.set(0, -1.2, -3.5); gearN.name = "gear"; group.add(gearN);
  // Wheels
  const wMat = new THREE.MeshLambertMaterial({ color: 0x111111 });
  [[-2, -2.2, 0.5], [2, -2.2, 0.5], [0, -1.9, -3.5]].forEach(([x, y, z]) => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.25, 10), wMat);
    w.rotation.z = Math.PI / 2; w.position.set(x, y, z); w.name = "gear"; group.add(w);
  });

  scene.add(group);
  return group;
}

function buildTerrain(scene: THREE.Scene) {
  // Ground
  const groundGeo = new THREE.PlaneGeometry(200000, 200000, 1, 1);
  const groundMat = new THREE.MeshLambertMaterial({ color: 0x4a7c3f });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Runway (grey rectangle)
  const rwGeo = new THREE.PlaneGeometry(30, 1200, 1, 1);
  const rwMat = new THREE.MeshLambertMaterial({ color: 0x4a4a4a });
  const rw = new THREE.Mesh(rwGeo, rwMat);
  rw.rotation.x = -Math.PI / 2;
  rw.position.y = 0.05;
  scene.add(rw);
  // Center line dashes
  for (let i = -10; i <= 10; i++) {
    const dash = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 40), new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    dash.rotation.x = -Math.PI / 2; dash.position.set(0, 0.1, i * 60);
    scene.add(dash);
  }
  // Threshold markings
  [-600, 600].forEach((z) => {
    for (let x = -12; x <= 12; x += 4) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(2, 20), new THREE.MeshLambertMaterial({ color: 0xffffff }));
      m.rotation.x = -Math.PI / 2; m.position.set(x, 0.1, z);
      scene.add(m);
    }
  });

  // Hills in the distance
  [[2000, 0, 5000], [-3000, 0, 8000], [5000, 0, 12000], [-1000, 0, 15000]].forEach(([x, , z], i) => {
    const h = 400 + i * 180;
    const hill = new THREE.Mesh(
      new THREE.ConeGeometry(600 + i * 200, h, 8),
      new THREE.MeshLambertMaterial({ color: 0x3d6b36 })
    );
    hill.position.set(x, h / 2, z);
    scene.add(hill);
  });

  // Trees (simple cylinders + cones)
  const treeTrunk = new THREE.MeshLambertMaterial({ color: 0x5c3a1e });
  const treeTop = new THREE.MeshLambertMaterial({ color: 0x2d5a1b });
  for (let i = 0; i < 80; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const z = 200 + Math.random() * 4000;
    if (Math.abs(x) < 40) continue;
    const h = 8 + Math.random() * 12;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, h, 6), treeTrunk);
    trunk.position.set(x, h / 2, z);
    scene.add(trunk);
    const top = new THREE.Mesh(new THREE.ConeGeometry(4, h * 1.2, 6), treeTop);
    top.position.set(x, h + h * 0.4, z);
    scene.add(top);
  }

  // Hangar
  const hangar = new THREE.Mesh(
    new THREE.BoxGeometry(30, 15, 40),
    new THREE.MeshLambertMaterial({ color: 0x8a7a6a })
  );
  hangar.position.set(60, 7.5, -50);
  scene.add(hangar);

  // Windsock pole
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 8, 6), new THREE.MeshLambertMaterial({ color: 0xffffff }));
  pole.position.set(-20, 4, -100); scene.add(pole);
  const sock = new THREE.Mesh(new THREE.ConeGeometry(1.2, 4, 8), new THREE.MeshLambertMaterial({ color: 0xff4400 }));
  sock.rotation.z = Math.PI / 2; sock.position.set(-18, 8, -100); scene.add(sock);
}

function buildClouds(scene: THREE.Scene): THREE.Group[] {
  const clouds: THREE.Group[] = [];
  const cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
  for (let i = 0; i < 24; i++) {
    const g = new THREE.Group();
    const n = 4 + Math.floor(Math.random() * 4);
    for (let j = 0; j < n; j++) {
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(40 + Math.random() * 60, 7, 7), cloudMat);
      sphere.position.set((Math.random() - 0.5) * 120, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 80);
      g.add(sphere);
    }
    g.position.set((Math.random() - 0.5) * 8000, 600 + Math.random() * 800, (Math.random() - 0.5) * 8000);
    scene.add(g);
    clouds.push(g);
  }
  return clouds;
}

export default function FlightSim() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hud, setHud] = useState<HUD>({ spd: 0, alt: 0, hdg: 360, thr: 20, stall: false });
  const [started, setStarted] = useState(false);
  const animRef = useRef<number | null>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const touchRef = useRef({ active: false, startX: 0, startY: 0, dx: 0, dy: 0 });
  const throttleTouchRef = useRef({ active: false, startY: 0, thr: 20 });

  const start = useCallback(() => { setStarted(true); }, []);

  useEffect(() => {
    if (!started || !mountRef.current) return;
    const el = mountRef.current;
    const W = el.clientWidth, H = el.clientHeight;

    // ── Scene ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.FogExp2(0x87ceeb, 0.00008);

    const camera = new THREE.PerspectiveCamera(65, W / H, 1, 80000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = false;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    // ── Lighting ─────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const sun = new THREE.DirectionalLight(0xfffde0, 1.2);
    sun.position.set(3000, 4000, -2000);
    scene.add(sun);

    // ── World ────────────────────────────────────────────────────
    buildTerrain(scene);
    const clouds = buildClouds(scene);
    const aircraft = buildAircraft(scene);

    // ── State ────────────────────────────────────────────────────
    const state = {
      x: 0, y: 2.5, z: 0,       // position
      speed: 0,                   // m/s forward
      pitch: 0, roll: 0, yaw: 0, // radians
      vy: 0,                      // vertical velocity
      throttle: 0.2,
      onGround: true,
    };
    const STALL_SPD = 22; // m/s (~43kt)
    const CRUISE_SPD = 55; // m/s (~107kt)
    let t = 0;

    // ── Resize ───────────────────────────────────────────────────
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // ── Keyboard ─────────────────────────────────────────────────
    const onKeyDown = (e: KeyboardEvent) => keysRef.current.add(e.key.toLowerCase());
    const onKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // ── Touch (pitch/roll joystick on the left/center) ───────────
    const onTouchStart = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (t.clientX > el.clientWidth * 0.75) {
        throttleTouchRef.current = { active: true, startY: t.clientY, thr: state.throttle * 100 };
      } else {
        touchRef.current = { active: true, startX: t.clientX, startY: t.clientY, dx: 0, dy: 0 };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      for (const touch of Array.from(e.changedTouches)) {
        if (touch.clientX > el.clientWidth * 0.75) {
          const dy = throttleTouchRef.current.startY - touch.clientY;
          const thr = Math.max(0, Math.min(100, throttleTouchRef.current.thr + dy * 0.3));
          state.throttle = thr / 100;
          throttleTouchRef.current.startY = touch.clientY;
          throttleTouchRef.current.thr = thr;
        } else {
          touchRef.current.dx = (touch.clientX - touchRef.current.startX) / 100;
          touchRef.current.dy = (touch.clientY - touchRef.current.startY) / 100;
        }
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      for (const touch of Array.from(e.changedTouches)) {
        if (touch.clientX > el.clientWidth * 0.75) {
          throttleTouchRef.current.active = false;
        } else {
          touchRef.current = { active: false, startX: 0, startY: 0, dx: 0, dy: 0 };
        }
      }
    };
    renderer.domElement.addEventListener("touchstart", onTouchStart, { passive: false });
    renderer.domElement.addEventListener("touchmove", onTouchMove, { passive: false });
    renderer.domElement.addEventListener("touchend", onTouchEnd);

    // ── Animation loop ───────────────────────────────────────────
    const clock = new THREE.Clock();
    const tmpEuler = new THREE.Euler();
    const tmpQuat = new THREE.Quaternion();

    const loop = () => {
      animRef.current = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;

      const keys = keysRef.current;
      const touch = touchRef.current;

      // ── Controls ──────────────────────────────────────────────
      const pitchInput =
        (keys.has("arrowup") || keys.has("w") ? -1 : 0) +
        (keys.has("arrowdown") || keys.has("s") ? 1 : 0) +
        (touch.active ? -touch.dy * 1.5 : 0);

      const rollInput =
        (keys.has("arrowleft") || keys.has("a") ? -1 : 0) +
        (keys.has("arrowright") || keys.has("d") ? 1 : 0) +
        (touch.active ? touch.dx * 1.5 : 0);

      if (keys.has("q") || keys.has("+") || keys.has("=")) state.throttle = Math.min(1, state.throttle + dt * 0.5);
      if (keys.has("e") || keys.has("-")) state.throttle = Math.max(0, state.throttle - dt * 0.5);

      // ── Physics ───────────────────────────────────────────────
      const thrustForce = state.throttle * CRUISE_SPD;
      const drag = state.speed * state.speed * 0.012 + 0.3;
      state.speed = Math.max(0, state.speed + (thrustForce - state.speed * 0.9 - drag * 0.1) * dt);
      state.speed = Math.min(CRUISE_SPD * 1.1, state.speed);

      // Pitch / roll response
      const pitchRate = 0.9 * dt;
      const rollRate = 1.1 * dt;
      state.pitch = Math.max(-0.45, Math.min(0.45, state.pitch + pitchInput * pitchRate));
      state.roll = Math.max(-0.7, Math.min(0.7, state.roll + rollInput * rollRate));
      // Drift back to level
      if (Math.abs(pitchInput) < 0.05) state.pitch *= (1 - 2.5 * dt);
      if (Math.abs(rollInput) < 0.05) state.roll *= (1 - 1.8 * dt);

      // Yaw from roll (coordinated turn)
      if (!state.onGround) state.yaw -= state.roll * state.speed * 0.0008 * dt;

      // Lift & altitude
      const liftFactor = Math.max(0, (state.speed - STALL_SPD) / (CRUISE_SPD - STALL_SPD));
      const isStall = state.speed < STALL_SPD && !state.onGround;
      let liftAccel = 0;
      if (!state.onGround) {
        liftAccel = liftFactor * state.pitch * 18;
        state.vy += (liftAccel - 9.8) * dt;
        state.vy = Math.max(-40, Math.min(40, state.vy));
      }

      // Move forward in the direction of yaw
      const fwd = new THREE.Vector3(-Math.sin(state.yaw), 0, -Math.cos(state.yaw));
      state.x += fwd.x * state.speed * dt;
      state.z += fwd.z * state.speed * dt;
      state.y += state.vy * dt;

      // Ground collision
      if (state.y <= 2.5) {
        state.y = 2.5;
        state.vy = 0;
        state.onGround = state.speed < STALL_SPD;
        if (state.onGround) { state.pitch *= 0.85; state.roll *= 0.85; }
      } else {
        state.onGround = false;
      }

      // ── Update aircraft mesh ───────────────────────────────────
      aircraft.position.set(state.x, state.y, state.z);
      tmpEuler.set(state.pitch, state.yaw, state.roll, "YXZ");
      aircraft.setRotationFromEuler(tmpEuler);

      // Propeller blur
      const propMesh = aircraft.getObjectByName("prop");
      if (propMesh) propMesh.rotation.z += state.throttle * 8 * dt;

      // Gear visibility
      aircraft.children.forEach((c) => {
        if (c.name === "gear") (c as THREE.Mesh).visible = state.onGround || state.y < 20;
      });

      // ── Camera (chase cam) ────────────────────────────────────
      const camOffset = new THREE.Vector3(0, 5, 22);
      camOffset.applyEuler(new THREE.Euler(0, state.yaw, 0));
      camera.position.set(
        state.x + camOffset.x,
        state.y + camOffset.y + 2,
        state.z + camOffset.z
      );
      camera.lookAt(state.x + fwd.x * 10, state.y + state.pitch * 6, state.z + fwd.z * 10);

      // ── Clouds drift ──────────────────────────────────────────
      clouds.forEach((c, i) => { c.position.x += Math.sin(t * 0.05 + i) * 0.3; });

      // ── HUD update ────────────────────────────────────────────
      const spdKt = Math.round(state.speed * 1.944);
      const altFt = Math.round(Math.max(0, state.y - 2.5) * 3.281);
      const hdg = ((Math.round(-state.yaw * (180 / Math.PI)) % 360) + 360) % 360;
      setHud({ spd: spdKt, alt: altFt, hdg: hdg || 360, thr: Math.round(state.throttle * 100), stall: isStall });

      renderer.render(scene, camera);
    };
    loop();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [started]);

  if (!started) {
    return (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 24,
        background: "linear-gradient(180deg, #0a1628 0%, #1a3a5c 40%, #2d6a9f 100%)",
        padding: 32, textAlign: "center",
      }}>
        <div style={{ fontSize: 64 }}>✈️</div>
        <h2 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: "#fff" }}>Simulador de vuelo 3D</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 360, lineHeight: 1.6, margin: 0 }}>
          Simulador en tiempo real construido con WebGL. Despegá desde la pista, volá sobre el terreno y explorá los conceptos de la escuela de vuelo.
        </p>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px 24px", maxWidth: 360 }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 10px", fontWeight: 700, letterSpacing: "0.1em" }}>CONTROLES</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.75)", textAlign: "left" }}>
            <span>📱 Izq. arrastrar</span><span>→ Pitch / Roll</span>
            <span>📱 Der. arrastrar</span><span>→ Acelerador</span>
            <span>⌨️ ↑↓←→ / WASD</span><span>→ Pitch / Roll</span>
            <span>⌨️ Q / E</span><span>→ + / − Motor</span>
          </div>
        </div>
        <button
          type="button"
          onClick={start}
          style={{
            padding: "16px 40px", borderRadius: 14, fontSize: 18, fontWeight: 800,
            background: "#C8922A", color: "#000", border: "none", cursor: "pointer",
            letterSpacing: "0.03em",
          }}
        >
          Iniciar simulador →
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%", touchAction: "none" }} />

      {/* HUD */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: "none", fontFamily: "'Space Mono', monospace",
      }}>
        {/* Top bar */}
        <div style={{
          position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 24, background: "rgba(0,0,0,0.45)", borderRadius: 10,
          padding: "8px 20px", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.12)",
        }}>
          {[
            { label: "SPD", value: `${hud.spd}`, unit: "kt" },
            { label: "ALT", value: `${hud.alt}`, unit: "ft" },
            { label: "HDG", value: `${String(hud.hdg).padStart(3, "0")}`, unit: "°" },
            { label: "THR", value: `${hud.thr}`, unit: "%" },
          ].map(({ label, value, unit }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#E8B84B", lineHeight: 1.1 }}>
                {value}<span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginLeft: 2 }}>{unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stall warning */}
        {hud.stall && (
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            background: "rgba(200,30,30,0.85)", color: "#fff", fontWeight: 900, fontSize: 22,
            padding: "12px 28px", borderRadius: 10, letterSpacing: "0.15em", animation: "none",
          }}>
            ⚠️ STALL — BAJAR EL MORRO
          </div>
        )}

        {/* Touch zone indicators */}
        <div style={{
          position: "absolute", bottom: 20, left: 20,
          color: "rgba(255,255,255,0.35)", fontSize: 11, letterSpacing: "0.08em",
        }}>ARRASTRAR → pitch/roll</div>
        <div style={{
          position: "absolute", bottom: 20, right: 20,
          color: "rgba(255,255,255,0.35)", fontSize: 11, letterSpacing: "0.08em", textAlign: "right",
        }}>ARRASTRAR → motor</div>
      </div>
    </div>
  );
}
