// 11/14 1분 현대문학 — 이시구로 『나를 보내지 마』: 바람 부는 빈 들판의 철조망 앞, 두 사람이 나란히 서서 펄럭이는 비닐 조각을 바라본다
export const secs = 3;
export const opts = { bg: 0xc8c8c4, fog: [0xc4c4c0, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#adaca5', line: '#aaa9a2', tiles: 2, repeat: 4 });
  // 철조망 울타리: 말뚝 + 철사 3줄
  const posts = []; for (let i = 0; i < 9; i++) { const x = -14 + i * 3.5; K.cyl(0.1, 0.12, 2.0, 0x4a4a46, x, 1.0, -4, scene, 6); posts.push(x); }
  [0.7, 1.2, 1.7].forEach(y => K.line([[-14, y, -4], [14, y, -4]], scene));
  // 철사에 걸린 비닐·종이 조각(바람에 펄럭)
  const bits = []; [[-9.5, 1.7], [-6, 1.2], [-2.2, 1.7], [1.5, 0.7], [4.6, 1.2], [8.8, 1.7], [11, 0.7]].forEach(([x, y], i) => {
    const g = new THREE.Group(); g.position.set(x, y, -3.95); scene.add(g);
    const m = K.inked(new THREE.Mesh(new THREE.PlaneGeometry(0.7 + (i % 3) * 0.2, 0.45), new THREE.MeshLambertMaterial({ color: i % 2 ? 0xf0efea : 0xd6d5cf, side: THREE.DoubleSide })), 1);
    m.geometry.translate(0.35, -0.15, 0); g.add(m); bits.push({ g, i }); });
  // 나무 몇 그루(멀리), 풀 무더기
  [[-18, -20], [-8, -26], [12, -22]].forEach(([x, z]) => { K.cyl(0.25, 0.35, 4, 0x55554f, x, 2, z, scene, 8); const t = new THREE.Mesh(new THREE.SphereGeometry(2.2, 12, 8), K.lam(0x7d7c76)); t.position.set(x, 5, z); scene.add(t); });
  const tufts = []; for (let i = 0; i < 12; i++) { const g = new THREE.Group(); g.position.set(-10 + i * 1.9 + (i % 3) * 0.4, 0, 1 + (i % 4) * 0.9); scene.add(g); for (let k = 0; k < 3; k++) { const b = K.cyl(0.02, 0.04, 0.7, 0x6f6e68, (k - 1) * 0.1, 0.35, 0, g, 4); b.rotation.z = (k - 1) * 0.3; } tufts.push(g); }
  // 작은 차
  const car = new THREE.Group(); car.position.set(9, 0, 2.5); car.rotation.y = -0.3; scene.add(car);
  K.box(3.6, 0.9, 1.7, 0x6a6a66, 0, 0.75, 0, car); K.box(2.0, 0.7, 1.5, 0x7a7a76, -0.2, 1.5, 0, car);
  [[-1.2, 0.85], [1.2, 0.85], [-1.2, -0.85], [1.2, -0.85]].forEach(([x, z]) => { const w = K.cyl(0.35, 0.35, 0.2, 0x222222, x, 0.35, z, car, 14); w.rotation.x = Math.PI / 2; });
  // 두 사람(뒷모습), 서로를 잠깐 본다
  const A = K.person(scene, { x: -1.0, z: 0.8, rot: 0, coat: 0xd5d2ca, pants: 0x55554f, hair: 'long', scale: 0.92 });
  const B = K.person(scene, { x: 0.9, z: 1.0, rot: 0, coat: 0x8c8a84, pants: 0x3a3a38, hair: 'short', scale: 0.98 });
  const b1 = K.bird(scene, { cx: 0, cy: 11, cz: -16, rx: 12, rz: 3 });
  cam.position.set(1.5, 3.4, 10); cam.lookAt(0, 1.6, -3);
  return (t, ph) => {
    bits.forEach(o => { o.g.rotation.y = 0.6 * Math.sin(ph * 3 + o.i); o.g.rotation.x = 0.3 * Math.sin(ph * 4 + o.i * 2); });
    tufts.forEach((g, i) => g.rotation.z = 0.15 * Math.sin(ph * 2 + i));
    const look = K.win(ph, 0.3, 0.7, 0.12);
    A.pose({ headYaw: -1.1 * look, torsoYaw: -0.35 * look, headTilt: 0.1 * look, armR: { fwd: 0.3 * look, out: -0.15 * look, elbow: 0.4 } });
    B.pose({ headYaw: 1.0 * look, torsoYaw: 0.3 * look, headPitch: -0.1, armL: { fwd: 0.3 * look, out: -0.2 * look, elbow: 0.4 } });
    b1.update(ph);
  };
}
