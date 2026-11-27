// 11/28 「토끼전」 장면②(after 3): 토끼를 등에 태운 자라가 물살을 가르며 깊은 바다로 헤엄쳐 간다. 진행 방향 +x(오른쪽) — 물결 표시가 x 큰 값→작은 값으로 흐름, 자라 머리 +x(rot -π/2 기준 turtle 머리 -z → rot = -π/2 로 +x), 토끼도 +x 를 본다. 물보라·물결·갈매기. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e6e2, fog: [0xe2e2de, 30, 100] };

function rabbit(K, par, { x = 0, y = 0, z = 0, rot = 0, s = 1, c = 0x8a8782 } = {}) {
  const { THREE } = K; const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = rot; g.scale.setScalar(s); par.add(g);
  const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 12), K.lam(c)), 40); b.scale.set(0.85, 0.95, 1.25); b.position.set(0, 0.55, 0); g.add(b);
  const tail = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), K.lam(0xf6f5f1)); tail.position.set(0, 0.6, 0.68); g.add(tail);
  const head = new THREE.Group(); head.position.set(0, 1.15, -0.45); g.add(head);
  const hm = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.36, 14, 10), K.lam(c)), 40); hm.scale.set(0.9, 0.95, 1.05); head.add(hm);
  [-0.14, 0.14].forEach(ex => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), K.lam(0x111111)); e.position.set(ex, 0.07, -0.3); head.add(e); });
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 4), K.lam(0x2a2a28)); nose.position.set(0, -0.04, -0.37); head.add(nose);
  const ears = [-0.12, 0.12].map(ex => { const e = new THREE.Group(); e.position.set(ex, 0.25, 0.02); head.add(e); const m = K.inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.62, 4, 8), K.lam(c)), 40); m.position.y = 0.38; m.scale.z = 0.55; e.add(m); const inn = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.5, 3, 6), K.lam(0xe6e3dc)); inn.position.set(0, 0.38, -0.04); e.add(inn); return e; });
  [[-0.25, -0.35], [0.25, -0.35]].forEach(([fx, fz]) => { const f = K.cyl(0.07, 0.08, 0.45, c, fx, 0.22, fz, g, 6); });
  [[-0.3, 0.3], [0.3, 0.3]].forEach(([fx, fz]) => { const f = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), K.lam(c)); f.scale.set(0.7, 0.5, 1.4); f.position.set(fx, 0.12, fz); g.add(f); });
  return { g, head, ears };
}
function turtle(K, par, { x = 0, y = 0, z = 0, rot = 0, s = 1 } = {}) {
  const { THREE } = K; const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = rot; g.scale.setScalar(s); par.add(g);
  const sh = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.9, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x55534e)), 40); sh.scale.set(1, 0.55, 1.15); sh.position.y = 0.3; g.add(sh);
  const rim = K.cyl(0.95, 0.95, 0.12, 0x6e6c66, 0, 0.3, 0, g, 20); rim.scale.z = 1.15;
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; const p = new THREE.Mesh(new THREE.CircleGeometry(0.2, 6), K.lam(0x3a3936)); p.position.set(Math.cos(a) * 0.45, 0.72, Math.sin(a) * 0.55); p.rotation.x = -Math.PI / 2 + Math.sin(a) * 0.5; p.rotation.y = Math.cos(a) * 0.5; g.add(p); }
  const neck = new THREE.Group(); neck.position.set(0, 0.42, -1.0); g.add(neck);
  K.cyl(0.16, 0.2, 0.55, 0x8a8782, 0, 0.0, -0.15, neck, 8).rotation.x = Math.PI / 2 - 0.5;
  const head = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 10), K.lam(0x8a8782)), 40); head.scale.set(0.9, 0.8, 1.2); head.position.set(0, 0.2, -0.45); neck.add(head);
  [-0.12, 0.12].forEach(ex => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 4), K.lam(0x111111)); e.position.set(ex, 0.3, -0.62); neck.add(e); });
  const fl = [[-0.85, -0.55], [0.85, -0.55], [-0.75, 0.65], [0.75, 0.65]].map(([fx, fz], i) => { const p = new THREE.Group(); p.position.set(fx, 0.28, fz); g.add(p); const m = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 6), K.lam(0x8a8782)); m.scale.set(1.3, 0.3, 0.7); m.position.x = Math.sign(fx) * 0.2; p.add(m); return p; });
  return { g, neck, fl };
}
export default function (K) {
  const { THREE, scene, cam } = K;
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(120, 80), K.lam(0xb8b5ae)); sea.rotation.x = -Math.PI / 2; scene.add(sea);
  K.backdrop(scene, { kind: 'shore', seed: 2861 });
  // 먼 섬과 바위(멈춤)
  [[-9, -16, 3], [10, -20, 4]].forEach(([x, z, r]) => { const m = K.inked(new THREE.Mesh(new THREE.SphereGeometry(r, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x8a8782)), 50); m.scale.y = 0.45; m.position.set(x, 0, z); scene.add(m); });
  const marks = []; for (let i = 0; i < 18; i++) { const m = K.box(1.4, 0.05, 0.12, 0xfbfaf6, 0, 0.06, -6 + (i % 6) * 2.0, scene); marks.push({ m, x0: -14 + i * 1.7 + (i % 3) }); }
  const T = turtle(K, scene, { x: 0, y: -0.05, z: 0.5, rot: -Math.PI / 2, s: 1.4 });
  const Rb = rabbit(K, T.g, { x: 0, y: 0.72, z: 0.1, rot: 0, s: 0.62 });
  const spray = []; for (let i = 0; i < 8; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfbfaf6, transparent: true })); scene.add(b); spray.push({ b, k: i / 8 }); }
  const gull = new THREE.Group(); scene.add(gull); const gw = [-1, 1].map(s => { const w = K.box(0.8, 0.04, 0.18, 0x2a2a28, 0.4 * s, 0, 0, gull); return w; });
  // 바위(앞쪽, 흐름 표시)
  const rocks = []; [0, 1].forEach(i => { const r = K.box(1.2, 0.7, 0.9, 0x6e6c66, 0, 0.2, -3.5 - i * 3, scene); rocks.push({ r, x0: i * 14 }); });
  cam.position.set(-0.4, 2.4, 5.0); cam.lookAt(0.3, 1.0, 0.2);
  return (t, ph) => {
    const p = ph / (Math.PI * 2), s = Math.sin(ph * 2);
    marks.forEach(o => { let x = o.x0 - p * 32; while (x < -16) x += 32; o.m.position.x = x; });
    rocks.forEach(o => { let x = 8 + o.x0 - p * 28; while (x < -14) x += 28; o.r.position.x = x; });
    T.g.position.y = -0.05 + 0.08 * s; T.g.rotation.z = 0.04 * s;
    T.fl.forEach((f, i) => { f.rotation.y = (i % 2 ? -1 : 1) * 0.6 * Math.sin(ph * 4 + (i > 1 ? Math.PI : 0)); });
    Rb.ears.forEach((e, i) => { e.rotation.x = 0.5 + 0.12 * Math.sin(ph * 4 + i); });
    spray.forEach(o => { const q = (p * 2 + o.k) % 1; o.b.position.set(1.6 - q * 2.5, 0.2 + Math.sin(q * Math.PI) * 0.6, 0.5 + (o.k - 0.5) * 2.2); o.b.material.opacity = 0.9 * (1 - q); });
    gull.position.set(-5 + 10 * p, 5 + 0.3 * Math.sin(ph * 2), -5); gw.forEach((w, i) => { w.rotation.z = (i ? -1 : 1) * 0.4 * Math.sin(ph * 6); });
  };
}
