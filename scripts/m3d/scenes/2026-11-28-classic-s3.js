// 11/28 「토끼전」 장면③(after 5): 용궁 대전. 왕관 쓴 용왕(두루마기, 수염)이 높은 자리에서 손가락질하고, 밧줄에 묶인 토끼가 바닥에서 태연한 얼굴로 앞발을 들어 '간은 산에 두고 왔다'고 둘러댄다. 창을 든 병졸(조끼). 물풀 흔들림·물고기·거품. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdfe0dc, fog: [0xdcddd8, 30, 90] };

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
  K.ground(scene, { color: '#cfcdc5', line: '#c6c4bc', tiles: 4, repeat: 3 });
  K.box(40, 14, 0.4, 0xd2d2cc, 0, 7, -7, scene);
  [-5.5, -2.2, 2.2, 5.5].forEach(x => { K.cyl(0.35, 0.35, 7, 0x6e6c66, x, 3.5, -5.6, scene, 12); K.box(1.0, 0.4, 1.0, 0x3a3936, x, 7.0, -5.6, scene); });
  K.box(4.0, 1.2, 2.4, 0x55534e, 0, 0.6, -4.6, scene); K.box(3.0, 0.4, 1.6, 0x8a8782, 0, 1.4, -4.6, scene); K.box(2.6, 3.2, 0.3, 0x3a3936, 0, 3.0, -5.7, scene);
  const sun = new THREE.Mesh(new THREE.CircleGeometry(0.8, 24), K.lam(0xeeece6)); sun.position.set(0, 3.6, -5.5); scene.add(sun);
  const weeds = []; [[-6.8, -3.4], [6.6, -3.0], [-7.4, 0.6], [7.2, 1.0]].forEach(([x, z], i) => { for (let j = 0; j < 3; j++) { const g = new THREE.Group(); g.position.set(x + (j - 1) * 0.35, 0, z); scene.add(g); const m = K.box(0.12, 2.4 + j * 0.4, 0.05, 0x55534e, 0, 1.2 + j * 0.2, 0, g); weeds.push({ g, k: i + j }); } });
  const fish = []; [0, 1.7].forEach(k => { const g = new THREE.Group(); scene.add(g); const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), K.lam(0x8a8782)), 40); b.scale.set(1.6, 0.8, 0.5); g.add(b); const tl = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.4, 3), K.lam(0x6e6c66)); tl.rotation.z = Math.PI / 2; tl.position.x = -0.6; g.add(tl); fish.push({ g, k }); });
  const Kg = K.person(scene, { x: 0, z: -4.6, rot: Math.PI, coat: 0x6e6c66, outfit: 'durumagi', hair: 'topknot', beard: 'beard', eyes: 'wide', brows: 'stern', mouth: 'open', seed: 2871 }); { const L = new THREE.Group(); L.position.y = 1.6; scene.add(L); L.add(Kg.root); }
  const crown = new THREE.Group(); crown.position.set(0, 0.5, 0); Kg.headG.add(crown); K.cyl(0.42, 0.36, 0.35, 0x2a2a28, 0, 0, 0, crown, 10); [-0.25, 0, 0.25].forEach(x => K.box(0.08, 0.3, 0.08, 0x2a2a28, x, 0.3, 0, crown));
  const G1 = K.person(scene, { x: -3.2, z: -1.2, rot: Math.PI - 0.3, coat: 0x55534e, outfit: 'vest', sleeve: 0x8a8782, hair: 'cap', eyes: 'dot', brows: 'stern', mouth: 'line', seed: 2872, scale: 0.92 });
  const spear = new THREE.Group(); K.cyl(0.04, 0.04, 4, 0x2a2a28, 0, 0, 0, spear, 5); const tip = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.4, 4), K.lam(0x2a2a28)); tip.position.y = 2.1; spear.add(tip); G1.hold('R', spear, { at: [0, -0.1, 0], rot: [Math.PI / 2, 0, 0] });
  const Rb = rabbit(K, scene, { x: 0.8, y: 0, z: 0.8, rot: Math.PI - 0.4, s: 1.15 });
  const rope = []; [0.45, 0.75].forEach(y => { const r = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.04, 6, 20), K.lam(0x2a2a28)); r.rotation.x = Math.PI / 2; r.scale.set(0.85, 1.25, 1); r.position.y = y; Rb.g.add(r); rope.push(r); });
  const bub = []; for (let i = 0; i < 6; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfbfaf6, transparent: true })); scene.add(b); bub.push({ b, k: i / 6, x: -5 + i * 2 }); }
  cam.position.set(0.8, 3.0, 6.2); cam.lookAt(0, 2.6, -2.0);
  return (t, ph) => {
    const s = Math.sin(ph);
    Kg.pose({ headYaw: 0.15, headPitch: 0.15, armR: { fwd: 1.6, elbow: 0.2, point: true, out: 0.3 }, armL: { fwd: 0.5, elbow: 1.2 } });
    G1.pose({ headYaw: -0.4, armR: { fwd: 0.6, elbow: 1.5 }, armL: { fwd: 0.2, elbow: 0.4 } });
    Rb.head.rotation.y = 0.35 * s; Rb.head.rotation.x = -0.25; Rb.ears.forEach((e, i) => { e.rotation.z = (i ? -1 : 1) * (0.2 + 0.15 * Math.sin(ph * 2)); });
    weeds.forEach(o => { o.g.rotation.z = 0.12 * Math.sin(ph * 2 + o.k); });
    fish.forEach(o => { const p = (ph / (Math.PI * 2) + o.k / 3.4) % 1; o.g.position.set(-8 + 16 * p, 5.2 + o.k * 0.6 + 0.2 * Math.sin(ph * 3), -3); });
    bub.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.b.position.set(o.x, 0.3 + p * 7, -2.5); o.b.material.opacity = 0.9 * (1 - p); });
  };
}
