// 11/27 1분 현대문학 『마당을 나온 암탉』 대표: 갈대 우거진 저수지 가, 깃털 성긴 갈색 암탉(잎싹)이 날개를 펴 작은 아기 오리(초록머리, 진한 머리)를 감싸고, 아기 오리가 고개를 든다. 갈대 흔들림·물결·잠자리. 사람 없음. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 120] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d2ca', line: '#cfcbc3', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2791, near: false });
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

  const pond = new THREE.Mesh(new THREE.PlaneGeometry(40, 12, 40, 12), K.lam(0x9a978f)); pond.rotation.x = -Math.PI / 2; pond.position.set(0, 0.04, -7); scene.add(pond); const pp = pond.geometry.attributes.position, base = pp.array.slice();
  const reeds = []; for (let i = 0; i < 46; i++) { const g = new THREE.Group(); g.position.set(-9 + (i * 0.41) % 18, 0, -1.6 - (i * 0.37) % 2.4); scene.add(g); const st = K.cyl(0.03, 0.04, 2.2 + (i % 4) * 0.3, 0x55534e, 0, 1.1, 0, g, 5); if (i % 3 === 0) { const hd = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.4, 3, 6), K.lam(0x6e6c66)); hd.position.y = 2.4 + (i % 4) * 0.3; g.add(hd); } reeds.push({ g, k: i * 0.3 }); }
  const st = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(0.6, 0), K.lam(0x8a8782)), 30); st.position.set(3.4, 0.3, 1.2); scene.add(st);
  const log = K.cyl(0.3, 0.3, 3, 0x55534e, -3.6, 0.3, 1.0, scene, 10); log.rotation.z = Math.PI / 2; log.rotation.y = 0.4;
  const H = fowl(0.2, 0.6, 0.35, { s: 1.6, c: 0x8a8782, kind: 'hen' });
  const Dk = fowl(-0.2, 1.5, 0.9, { s: 0.7, c: 0xc8c4bb, kind: 'duck', head: 0x45443f });
  const fly = new THREE.Group(); scene.add(fly); const fb = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.5, 3, 6), K.lam(0x2a2a28)); fb.rotation.z = Math.PI / 2; fly.add(fb); const fw = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.8), new THREE.MeshLambertMaterial({ color: 0xfbfaf6, side: THREE.DoubleSide })); fw.rotation.x = Math.PI / 2; fly.add(fw);
  cam.position.set(1.8, 2.6, 7.2); cam.lookAt(-0.2, 1.2, 0);
  return (t, ph) => {
    for (let i = 0; i < pp.count; i++) { const x = base[i * 3]; pp.array[i * 3 + 2] = 0.08 * Math.sin(x * 0.8 + ph * 2); } pp.needsUpdate = true; pond.geometry.computeVertexNormals();
    const k = 0.5 + 0.5 * Math.sin(ph);
    H.wings.forEach((w, i) => { w.scale.setScalar(1.6); w.rotation.x = (i ? 1 : -1) * (1.1 + 0.3 * k); }); H.nk.rotation.z = -0.4 - 0.2 * k; H.hd.rotation.z = 0.3;
    Dk.nk.rotation.z = -0.5 + 0.4 * k; Dk.g.position.y = 0.02 * Math.sin(ph * 4);
    reeds.forEach(o => { o.g.rotation.z = 0.12 * Math.sin(ph * 2 + o.k); });
    fly.position.set(2 + 1.5 * Math.cos(ph), 2.6 + 0.3 * Math.sin(ph * 2), -0.5 + 0.8 * Math.sin(ph)); fly.rotation.y = -ph; fw.rotation.y = 0.5 * Math.sin(ph * 20);
  };
}
