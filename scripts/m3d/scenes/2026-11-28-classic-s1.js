// 11/28 「토끼전」 장면①(after 1): 바닷가 용궁 길목 정자. 갓·두루마기의 화공이 붓을 들고 두루마리에 그린 토끼 그림을 펼쳐 자라에게 보여 주고, 자라가 목을 길게 빼 들여다본다. 두루마리 펄럭임·자라 목 끄덕임·물거품. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e5e0, fog: [0xe2e1dc, 30, 110] };

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
  K.ground(scene, { color: '#d4d0c6', line: '#ccc8be', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'shore', seed: 2851 });
  // 정자 기둥·지붕
  const pv = new THREE.Group(); pv.position.set(0, 0, -2.4); scene.add(pv);
  K.box(7, 0.4, 3.6, 0x8a8782, 0, 0.2, 0, pv); [[-3.2, -1.6], [3.2, -1.6], [-3.2, 1.6], [3.2, 1.6]].forEach(([x, z]) => K.cyl(0.15, 0.15, 4, 0x3a3936, x, 2.2, z, pv, 8));
  const roof = K.inked(new THREE.Mesh(new THREE.ConeGeometry(5.2, 1.6, 4), K.lam(0x55534e)), 40); roof.rotation.y = Math.PI / 4; roof.scale.set(1.0, 1, 0.6); roof.position.y = 5.0; pv.add(roof);
  // 산호·조개·항아리 소품
  [[-4.8, 0.8], [5.0, 1.2]].forEach(([x, z]) => { for (let j = 0; j < 4; j++) { const b = K.cyl(0.06, 0.08, 0.8 + j * 0.2, 0x55534e, x + (j - 1.5) * 0.25, 0.45, z, scene, 5); b.rotation.z = (j - 1.5) * 0.3; } });
  K.cyl(0.4, 0.5, 0.9, 0x45443f, 4.0, 0.45, -0.4, scene, 12); const shell = new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0xeeece6)); shell.scale.y = 0.5; shell.position.set(-3.6, 0, 2.0); scene.add(shell);
  const P = K.person(scene, { x: -1.3, z: 0.6, rot: -Math.PI / 2 - 0.6, coat: 0xeeebe4, outfit: 'durumagi', hair: 'gat', beard: 'goatee', eyes: 'narrow', brows: 'thick', mouth: 'smile', seed: 2852 });
  // 두루마리(그림): 캔버스에 토끼 실루엣
  const tex = K.canvasTex(256, 320, (c) => { c.fillStyle = '#f6f3ea'; c.fillRect(0, 0, 256, 320); c.fillStyle = '#3a3936'; c.beginPath(); c.ellipse(128, 210, 62, 52, 0, 0, Math.PI * 2); c.fill(); c.beginPath(); c.ellipse(120, 140, 34, 30, 0, 0, Math.PI * 2); c.fill(); c.beginPath(); c.ellipse(105, 75, 10, 42, -0.15, 0, Math.PI * 2); c.fill(); c.beginPath(); c.ellipse(135, 75, 10, 42, 0.15, 0, Math.PI * 2); c.fill(); c.fillStyle = '#f6f3ea'; c.beginPath(); c.arc(110, 135, 5, 0, 7); c.fill(); });
  const scroll = new THREE.Group(); const paper = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.3, 1, 6), new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide })); paper.position.y = -0.65; scroll.add(paper); K.cyl(0.04, 0.04, 1.2, 0x2a2a28, 0, 0, 0, scroll, 6).rotation.z = Math.PI / 2;
  P.hold('L', scroll, { at: [0.1, -0.05, -0.2], rot: [0, -0.9, 0] });
  const brush = K.cyl(0.025, 0.02, 0.6, 0x2a2a28, 0, 0, 0, null, 5); P.hold('R', brush, { at: [0, -0.1, 0], rot: [1.2, 0, 0] });
  const T = turtle(K, scene, { x: 1.4, y: 0, z: 0.9, rot: Math.PI / 2 + 0.35, s: 1.15 });
  const bub = []; for (let i = 0; i < 6; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.1 + (i % 3) * 0.04, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfbfaf6, transparent: true })); scene.add(b); bub.push({ b, k: i / 6, x: 2.4 + (i % 3) * 0.5 }); }
  cam.position.set(0.2, 2.8, 8.2); cam.lookAt(0, 1.5, -0.4);
  return (t, ph) => {
    const s = Math.sin(ph);
    P.pose({ headYaw: -0.25, headPitch: 0.15, armL: { fwd: 1.35, elbow: 0.6, out: 0.15 }, armR: { fwd: 0.9 + 0.2 * Math.sin(ph * 2), elbow: 1.2, out: -0.1 } });
    paper.rotation.y = 0.12 * Math.sin(ph * 2);
    T.neck.position.z = -1.0 - 0.15 * (1 + s); T.neck.rotation.x = 0.15 * Math.sin(ph * 2);
    bub.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.b.position.set(o.x + 0.2 * Math.sin(p * 9), 0.4 + p * 3.0, 1.2); o.b.material.opacity = 0.9 * (1 - p); });
  };
}
