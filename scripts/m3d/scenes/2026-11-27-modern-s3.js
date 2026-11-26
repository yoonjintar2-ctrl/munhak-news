// 11/27 『마당을 나온 암탉』 장면③(after 5): 저수지 둑에 홀로 선 암탉이 고개를 들어 하늘을 보고, 하늘에는 청둥오리 떼가 V자로 날아간다(끝의 한 마리가 고개를 돌림). 갈대 흔들림·물결. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeae8e2, fog: [0xe6e4de, 30, 120], fov: 52 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d2ca', line: '#cfcbc3', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2821, near: false });
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

  const pond = new THREE.Mesh(new THREE.PlaneGeometry(50, 14, 50, 14), K.lam(0x9a978f)); pond.rotation.x = -Math.PI / 2; pond.position.set(0, 0.04, -9); scene.add(pond); const pp = pond.geometry.attributes.position, base = pp.array.slice();
  const reeds = []; for (let i = 0; i < 30; i++) { const g = new THREE.Group(); g.position.set(-10 + (i * 0.71) % 20, 0, -2.2 - (i * 0.37) % 1.6); scene.add(g); K.cyl(0.03, 0.04, 2.0 + (i % 3) * 0.4, 0x55534e, 0, 1.0, 0, g, 5); reeds.push({ g, k: i * 0.4 }); }
  [[3, 1.5], [-3.5, 2]].forEach(([x, z]) => { const s = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(0.5, 0), K.lam(0x8a8782)), 30); s.position.set(x, 0.25, z); scene.add(s); });
  const post = K.cyl(0.12, 0.12, 1.8, 0x45443f, 4.6, 0.9, 0.2, scene, 8);
  const H = fowl(0.4, 1.2, -0.5, { s: 1.1, c: 0x8a8782 });
  const flock = new THREE.Group(); scene.add(flock);
  const fl = []; for (let i = 0; i < 7; i++) { const g = new THREE.Group(); const row = Math.ceil(i / 2), sd = i % 2 ? 1 : -1; g.position.set(-row * 1.1, 0, i ? sd * row * 0.9 : 0); flock.add(g);
    const b = K.inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.6, 4, 8), K.lam(0x3a3936)), 40); b.rotation.z = Math.PI / 2; g.add(b);
    const h = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), K.lam(0x1e1e1e)); h.position.x = 0.5; g.add(h);
    const ws = [-1, 1].map(s2 => { const p = new THREE.Group(); g.add(p); const w = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.9), new THREE.MeshLambertMaterial({ color: 0x3a3936, side: THREE.DoubleSide })); w.rotation.x = Math.PI / 2; w.position.z = s2 * 0.45; p.add(w); return { p, s2 }; });
    fl.push({ g, ws, k: i * 0.6, h }); }
  flock.rotation.z = 0.1;
  cam.position.set(3.6, 2.0, 8.0); cam.lookAt(-0.5, 4.0, -4);
  return (t, ph) => {
    for (let i = 0; i < pp.count; i++) { const x = base[i * 3]; pp.array[i * 3 + 2] = 0.08 * Math.sin(x * 0.7 + ph * 2); } pp.needsUpdate = true; pond.geometry.computeVertexNormals();
    flock.position.set(-1 + 2.0 * Math.sin(ph), 8.5 + 0.3 * Math.sin(ph * 2), -10);
    fl.forEach((o, i) => { const f = 0.7 * Math.sin(ph * 6 + o.k); o.ws.forEach(w => { w.p.rotation.x = w.s2 * f; }); if (i === 6) o.g.rotation.y = 0.6 * Math.sin(ph); });
    H.nk.rotation.z = -0.9 - 0.15 * Math.sin(ph); H.hd.rotation.z = -0.5;
    reeds.forEach(o => { o.g.rotation.z = 0.14 * Math.sin(ph * 2 + o.k); });
  };
}
