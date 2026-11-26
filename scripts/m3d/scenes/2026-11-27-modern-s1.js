// 11/27 『마당을 나온 암탉』 장면①(after 0): 양계장 안 철망 우리 줄. 한 암탉이 철망 틈으로 고개를 내밀어 창밖 마당의 아카시아 나무를 바라본다. 다른 닭들 고개 까딱·아카시아 잎 흔들림·햇살 먼지. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe4e2dc, fog: [0xe0ded8, 30, 90], fov: 46 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2801 });
  K.box(40, 0.2, 20, 0xd0ccc3, 0, -0.1, 0, scene);
  // 암탉·오리 만들기(장면 안 전용)
  const fowl = (x, z, rot, { s = 1, c = 0x8a8782, kind = 'hen', head = null } = {}) => {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot; g.scale.setScalar(s); scene.add(g);
    const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 12), K.lam(c)), 50); b.scale.set(1.35, kind === 'duck' ? 0.8 : 1, 0.95); b.position.y = kind === 'duck' ? 0.55 : 0.75; g.add(b);
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.55, 6), K.lam(c)); tail.position.set(0.7, kind === 'duck' ? 0.75 : 1.05, 0); tail.rotation.z = kind === 'duck' ? -1.2 : -0.6; g.add(tail);
    const wings = [-1, 1].map(sd => { const p = new THREE.Group(); p.position.set(0, b.position.y + 0.15, sd * 0.42); g.add(p); const w = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 8), K.lam(c)), 50); w.scale.set(1.2, 0.5, 0.18); w.position.set(0.1, -0.1, 0); p.add(w); return p; });
    const nk = new THREE.Group(); nk.position.set(-0.55, b.position.y + 0.2, 0); g.add(nk);
    const n = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.35, 4, 8), K.lam(head ?? c)); n.position.y = 0.2; nk.add(n);
    const hd = new THREE.Group(); hd.position.y = 0.5; nk.add(hd);
    hd.add(K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), K.lam(head ?? c)), 50));
    const bk = new THREE.Mesh(kind === 'duck' ? new THREE.BoxGeometry(0.28, 0.06, 0.16) : new THREE.ConeGeometry(0.06, 0.18, 6), K.lam(0x3a3936)); if (kind !== 'duck') bk.rotation.z = Math.PI / 2; bk.position.x = -0.26; hd.add(bk);
    if (kind === 'hen') { const cb = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.16, 0.18), K.lam(0x2a2a28)); cb.position.y = 0.2; hd.add(cb); }
    [-1, 1].forEach(sd => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), K.flat(0x111111)); e.position.set(-0.12, 0.05, sd * 0.17); hd.add(e); });
    [-0.15, 0.15].forEach(zz => K.line([[0, 0.3, zz], [0, 0, zz], [-0.15, 0, zz]], g));
    return { g, nk, hd, wings };
  };

  // 철망 우리 두 단
  const cage = (x0, y0) => { K.box(9, 0.08, 1.6, 0x55534e, x0, y0, -1.5, scene); K.box(9, 0.08, 1.6, 0x55534e, x0, y0 + 1.6, -1.5, scene);
    for (let i = 0; i <= 12; i++) K.line([[x0 - 4.5 + i * 0.75, y0, -0.7], [x0 - 4.5 + i * 0.75, y0 + 1.6, -0.7]], scene);
    K.line([[x0 - 4.5, y0 + 0.8, -0.7], [x0 + 4.5, y0 + 0.8, -0.7]], scene); K.box(9, 0.15, 0.4, 0x8a8782, x0, y0 + 0.1, -0.4, scene); };
  cage(-2.5, 0.8); cage(-2.5, 2.6);
  const hens = []; [[-5.5, 0.8], [-3.7, 0.8], [-1.9, 0.8], [0.0, 0.8], [-5.5, 2.6], [-3.7, 2.6], [-1.9, 2.6], [0.0, 2.6]].forEach(([x, y], i) => { const h = fowl(x, -1.5, Math.PI / 2, { s: 0.55, c: i % 3 ? 0xeeece6 : 0xb0aca4 }); h.g.position.y = y + 0.05; hens.push({ h, k: i * 1.1 }); });
  const L = fowl(1.9, -1.2, Math.PI / 2 + 0.6, { s: 0.6, c: 0x8a8782 }); L.g.position.y = 0.85;
  // 창밖 아카시아
  const tr = new THREE.Group(); tr.position.set(6, 3.2, -6.6); scene.add(tr); K.box(0.2, 3, 0.05, 0x45443f, 0, 0, 0, tr);
  const leaves = []; for (let i = 0; i < 14; i++) { const l = new THREE.Mesh(new THREE.CircleGeometry(0.22, 8), K.flat(0x6e6c66)); l.scale.y = 0.6; const a = i * 0.9; l.position.set(Math.cos(a) * (0.6 + i * 0.08), 1.6 + Math.sin(a) * 0.8, 0.05); tr.add(l); leaves.push({ l, k: i }); }
  const dust = K.motes(scene, { n: 25, box: [6, 4, 3], z0: -4, size: 0.08 });
  cam.position.set(3.6, 2.8, 6.5); cam.lookAt(0.6, 1.8, -2.5);
  return (t, ph) => {
    hens.forEach(o => { o.h.nk.rotation.z = 0.4 * Math.max(0, Math.sin(ph * 2 + o.k)); });
    L.nk.rotation.z = -0.5 + 0.1 * Math.sin(ph); L.nk.rotation.x = 0.2 * Math.sin(ph);
    leaves.forEach(o => { o.l.rotation.z = 0.4 * Math.sin(ph * 2 + o.k); }); tr.rotation.z = 0.04 * Math.sin(ph * 2);
    dust.update(ph);
  };
}
