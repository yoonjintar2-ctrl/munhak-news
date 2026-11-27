// 11/27 오늘의 시 노천명 「사슴」: 숲속 샘가, 뿔이 우아한 목 긴 사슴이 물속 제 그림자를 내려다보다 고개를 들어 먼 산을 바라본다. 물결 동심원·나뭇잎 흔들림·새. 사람 없음. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 120] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d4d1c9', line: '#cdcac2', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2721, near: false });
  const pond = new THREE.Mesh(new THREE.CircleGeometry(3.2, 40), K.lam(0xa9a69f)); pond.rotation.x = -Math.PI / 2; pond.scale.set(1.4, 1, 1); pond.position.set(-1.2, 0.03, 0.8); scene.add(pond);
  const rings = [0, 1, 2].map(i => { const r = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.56, 32), K.flat(0xf2f0ea)); r.rotation.x = -Math.PI / 2; r.position.set(-1.0, 0.05, 0.6); scene.add(r); return r; });
  // 돌·풀·나무
  for (let i = 0; i < 8; i++) { const s = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(0.35 + (i % 3) * 0.1, 0), K.lam(0x8a8782)), 30); const a = i / 8 * Math.PI * 2; s.position.set(-1.2 + Math.cos(a) * 4.5, 0.2, 0.8 + Math.sin(a) * 3.2); scene.add(s); }
  const trees = []; [[-9, -2], [6.5, -5], [-11, -7], [9, -1]].forEach(([x, z], i) => { const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g); K.cyl(0.25, 0.35, 3.4, 0x45443f, 0, 1.7, 0, g, 8); const c = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.7, 14, 10), K.lam(0x8f8c85)), 40); c.position.y = 4.2; g.add(c); trees.push({ c, k: i }); });
  const reeds = []; for (let i = 0; i < 18; i++) { const g = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.9, 4), K.lam(0x6e6c66)); g.position.set(-5.5 + (i * 0.67) % 9, 0.45, 3.4 + (i % 3) * 0.3); scene.add(g); reeds.push({ g, k: i * 0.5 }); }
  // 사슴
  const dr = new THREE.Group(); dr.position.set(1.4, 0, 0.4); dr.rotation.y = 0.5; scene.add(dr);
  const DC = 0x7a776f;
  const body = K.inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 1.5, 6, 14), K.lam(DC)), 40); body.rotation.z = Math.PI / 2; body.position.y = 1.9; dr.add(body);
  [[-0.75, 0.25], [-0.75, -0.25], [0.75, 0.25], [0.75, -0.25]].forEach(([x, z]) => { const l = K.inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 1.4, 4, 8), K.lam(0x55534e)), 40); l.position.set(x, 0.85, z); dr.add(l); });
  const tail = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), K.lam(0xf2f0ea)); tail.position.set(1.25, 2.1, 0); dr.add(tail);
  const neck = new THREE.Group(); neck.position.set(-0.95, 2.2, 0); dr.add(neck);
  const nk = K.inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 1.6, 4, 10), K.lam(DC)), 40); nk.position.y = 0.85; neck.add(nk);
  const hd = new THREE.Group(); hd.position.y = 1.8; neck.add(hd);
  const head = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 10), K.lam(0x9a978f)), 40); head.scale.set(1.5, 0.9, 0.9); head.position.x = -0.25; hd.add(head);
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), K.lam(0x222222)); nose.position.set(-0.68, -0.05, 0); hd.add(nose);
  [-1, 1].forEach(sd => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), K.flat(0x111111)); e.position.set(-0.35, 0.1, sd * 0.24); hd.add(e);
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.35, 6), K.lam(DC)); ear.position.set(0.05, 0.25, sd * 0.25); ear.rotation.x = sd * 0.9; hd.add(ear);
    const ant = new THREE.Group(); ant.scale.setScalar(1.9); ant.position.set(0, 0.3, sd * 0.12); hd.add(ant); K.line([[0, 0, 0], [0.1, 0.5, sd * 0.15], [0.05, 0.9, sd * 0.3]], ant); K.line([[0.1, 0.5, sd * 0.15], [-0.25, 0.75, sd * 0.2]], ant); K.line([[0.05, 0.9, sd * 0.3], [0.3, 1.05, sd * 0.35]], ant); K.line([[0.08, 0.75, sd * 0.25], [-0.15, 1.1, sd * 0.3]], ant); });
  // 물 그림자(거꾸로 비친 머리)
  const ref = new THREE.Mesh(new THREE.CircleGeometry(0.5, 16), K.flat(0x8a8782)); ref.rotation.x = -Math.PI / 2; ref.scale.set(1.6, 0.8, 1); ref.position.set(-0.4, 0.04, 0.9); scene.add(ref);
  const birds = [K.bird(scene, { cx: -2, cy: 9, cz: -20, rx: 7, rz: 2, s: 0.7 })];
  cam.position.set(4.5, 3.6, 9.5); cam.lookAt(-0.3, 1.8, -0.5);
  return (t, ph) => {
    const k = 0.5 + 0.5 * Math.sin(ph); // 1: 내려다봄 0: 먼 산
    neck.rotation.z = 0.15 + 0.9 * k; hd.rotation.z = -0.4 * k + 0.25 * (1 - k); neck.rotation.y = 0.25 * (1 - k);
    ref.material.opacity = 1; ref.scale.set(1.2 + 0.4 * k, 0.6 + 0.2 * k, 1);
    rings.forEach((r, i) => { const p = ((ph / (Math.PI * 2)) + i / 3) % 1; r.scale.setScalar(0.5 + p * 4); r.material.color.setScalar(0.72 - 0.05 * p); });
    trees.forEach(o => { o.c.rotation.z = 0.05 * Math.sin(ph * 2 + o.k); });
    reeds.forEach(o => { o.g.rotation.z = 0.25 * Math.sin(ph * 2 + o.k); });
    tail.position.y = 2.1 + 0.05 * Math.sin(ph * 4);
    birds[0].update(ph);
  };
}
