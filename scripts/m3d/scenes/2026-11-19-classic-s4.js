// 11/19 「사랑손님과 어머니」 장면④(결말): 뒷동산 언덕. 어머니와 옥희가 손을 잡고 등을 보이며 서서, 멀리 들판을 가로지르는 기차를 바라본다. 기차는 화면 오른쪽(+x)으로 달린다 — 기관차 앞(굴뚝 쪽)이 +x, 연기는 뒤(-x)로 흐른다. 억새가 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xeae8e2, 40, 160] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dcd9d1', line: '#d2cfc7', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 88 });
  // 언덕(앞) + 멀리 철길
  const hill = K.inked(new THREE.Mesh(new THREE.SphereGeometry(9, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0xc0bdb5)), 60); hill.scale.y = 0.18; hill.position.set(0, -0.2, 2); scene.add(hill);
  K.box(80, 0.06, 0.6, 0x55534e, 0, 0.05, -16, scene);
  // 기차: 기관차(굴뚝·앞쪽 +x) + 객차 3량
  const train = new THREE.Group(); train.position.set(0, 0, -16); scene.add(train);
  K.box(3.0, 1.6, 1.4, 0x2e2d2a, 0, 1.2, 0, train); K.cyl(0.65, 0.65, 2.4, 0x2a2a28, 0.6, 1.4, 0, train, 14).rotation.z = Math.PI / 2; K.cyl(0.22, 0.3, 0.8, 0x1c1c1a, 1.5, 2.4, 0, train, 10); K.box(1.2, 1.0, 1.5, 0x3a3936, -1.0, 2.2, 0, train);
  for (let i = 0; i < 3; i++) { K.box(3.2, 1.8, 1.4, 0x6e6c66, -3.6 - i * 3.5, 1.3, 0, train); for (let w = 0; w < 3; w++) K.box(0.5, 0.45, 1.45, 0xf2f0ea, -4.6 - i * 3.5 + w * 1.0, 1.6, 0, train); }
  const puffs = []; for (let i = 0; i < 6; i++) { const p = new THREE.Mesh(new THREE.SphereGeometry(0.6, 12, 8), new THREE.MeshLambertMaterial({ color: 0xf4f3ee })); scene.add(p); puffs.push({ p, k: i / 6 }); }
  // 억새
  const reeds = []; for (let i = 0; i < 16; i++) { const g = new THREE.Group(); g.position.set(-7 + (i % 8) * 0.5 + (i > 7 ? 9.5 : 0), 0.9, -1.2 - (i % 3) * 0.5); scene.add(g); K.cyl(0.02, 0.02, 1.6, 0x6e6c66, 0, 0.8, 0, g, 4); const h = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 6), K.lam(0xd9d6ce)), 80); h.scale.set(0.6, 3.0, 0.6); h.position.y = 1.7; g.add(h); reeds.push(g); }
  // 어머니 + 옥희(뒷모습, 손잡기)
  const M = K.person(scene, { x: -3.0, z: -0.4, rot: 0.25, coat: 0x9a978f, pants: 0x55534e, hair: 'bun', scale: 0.95 });
  M.root.position.y = 1.4;
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.95, 2.0, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x45443f, side: THREE.DoubleSide })), 40); sk.position.y = 1.0; M.root.add(sk);
  const O = K.person(scene, { x: -1.8, z: -0.4, rot: 0.15, coat: 0x6e6c66, pants: 0x45443f, hair: 'bun', scale: 0.52 });
  O.root.position.y = 1.4;
  cam.position.set(-0.6, 3.6, 6.2); cam.lookAt(0.6, 2.2, -10.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    train.position.x = -6 + 12 * u;
    puffs.forEach(o => { const v = (o.k + u * 2) % 1; o.p.position.set(train.position.x + 1.5 - v * 6, 2.9 + v * 2.2, -16); o.p.scale.setScalar(0.6 + v * 1.4); });
    M.pose({ bob: 1.4, headPitch: 0.05, headYaw: -0.15 * Math.sin(ph), armR: { fwd: 0.1, out: 0.25, elbow: 0.2 }, armL: { fwd: 0.05, elbow: 0.2 } });
    O.pose({ bob: 1.4, headPitch: 0.2, headYaw: 0.4, armL: { fwd: 0.4, out: 0.3, elbow: 0.1 }, armR: { fwd: 0.1, elbow: 0.2 } });
    reeds.forEach((g, i) => { g.rotation.z = 0.15 * Math.sin(ph + i * 0.5); });
  };
}
