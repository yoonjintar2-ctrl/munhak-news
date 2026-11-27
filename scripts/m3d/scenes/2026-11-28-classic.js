// 11/28 1분 고전 「토끼전」 대표: 소나무 선 바닷가 바위. 자라가 앞발을 들어 바다(용궁 쪽)를 가리키고, 토끼가 귀를 쫑긋 세우며 솔깃해한다. 파도 밀려옴·솔가지 흔들림·갈매기. 카메라 고정. 사람 없음
export const secs = 3;
export const opts = { bg: 0xe8e7e2, fog: [0xe4e3de, 30, 120] };

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
  K.ground(scene, { color: '#d6d2c8', line: '#cec9bf', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'shore', seed: 2841 });
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(80, 14), K.lam(0xa8a49c)); sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0.04, -9); scene.add(sea);
  const waves = []; for (let i = 0; i < 4; i++) { const w = K.box(26, 0.08, 0.35, 0xfbfaf6, 0, 0.08, -3.4 - i * 2.2, scene); waves.push({ w, k: i }); }
  K.box(4.4, 0.9, 2.6, 0x8a8782, 0, 0.45, 0.6, scene); K.box(2.0, 0.6, 1.6, 0x6e6c66, -3.2, 0.3, 1.4, scene); K.box(1.6, 1.2, 1.4, 0x6e6c66, 4.2, 0.6, -0.6, scene);
  const pines = []; [[-5.2, -1.6, 1.2], [5.6, 0.8, 1.0]].forEach(([x, z, s], i) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s); scene.add(g); K.cyl(0.18, 0.28, 4.2, 0x3a3936, 0, 2.1, 0, g, 8).rotation.z = 0.15 * (i ? -1 : 1);
    [3.2, 4.0, 4.6].forEach((y, j) => { const c = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.1 - j * 0.2, 12, 8), K.lam(0x55534e)), 50); c.scale.set(1.6, 0.4, 1.1); c.position.set((i ? -1 : 1) * (0.4 + j * 0.2), y, 0); g.add(c); }); pines.push({ g, k: i }); });
  const T = turtle(K, scene, { x: 0.9, y: 0.9, z: 0.7, rot: Math.PI / 2 + 0.6, s: 1.0 });
  const Rb = rabbit(K, scene, { x: -1.2, y: 0.9, z: 0.6, rot: -Math.PI / 2 + 0.4, s: 1.0 });
  const gulls = []; [0, 2.1].forEach(k => { const g = new THREE.Group(); scene.add(g); [-1, 1].forEach(s => { const w = K.box(0.7, 0.04, 0.16, 0x2a2a28, 0.35 * s, 0, 0, g); w.rotation.z = 0.3 * s; }); gulls.push({ g, k }); });
  cam.position.set(0, 2.3, 4.8); cam.lookAt(0, 1.4, 0.3);
  return (t, ph) => {
    const s = Math.sin(ph);
    T.fl[0].rotation.z = 0.7 + 0.35 * Math.sin(ph * 2); T.fl[0].position.y = 0.45; T.neck.rotation.x = -0.25 + 0.1 * s;
    Rb.ears.forEach((e, i) => { e.rotation.x = -0.1 + 0.15 * Math.sin(ph * 2 + i); e.rotation.z = (i ? -1 : 1) * 0.12; }); Rb.head.rotation.y = 0.25 * s; Rb.head.rotation.x = -0.15;
    waves.forEach(o => { const p = ((ph / (Math.PI * 2)) + o.k / 4) % 1; o.w.position.z = -10 + p * 7.5; o.w.scale.x = 0.6 + p * 0.5; });
    pines.forEach(o => { o.g.rotation.z = 0.025 * Math.sin(ph * 2 + o.k); });
    gulls.forEach(o => { o.g.position.set(-6 + 12 * ((ph / (Math.PI * 2) + o.k / 4) % 1), 5.5 + 0.4 * Math.sin(ph * 2 + o.k), -6); o.g.children.forEach((w, i) => { w.rotation.z = (i ? -1 : 1) * 0.4 * Math.sin(ph * 6 + o.k); }); });
  };
}
