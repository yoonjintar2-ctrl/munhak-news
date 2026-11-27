// 11/19 「사랑손님과 어머니」 장면②: 안방. 왼쪽 옥희가 두 손으로 꽃묶음을 쳐들어 내밀고, 오른쪽 어머니가 고개를 돌리며 한 손으로 볼을 가린다. 창호지 문이 바람에 살짝 들썩이고 꽃송이가 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xebe9e3, fog: [0xe5e3dd, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d2c4', line: '#cec8ba', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 71 });
  // 창호지 문(격자) + 반닫이 + 이불 더미 + 꽃병
  const door = new THREE.Group(); door.position.set(-3.6, 0, -6.6); scene.add(door); K.box(2.4, 3.6, 0.1, 0xf6f4ef, 0, 1.8, 0, door); for (let i = 0; i < 5; i++) K.box(2.4, 0.05, 0.14, 0x55534e, 0, 0.4 + i * 0.75, 0, door); for (let i = 0; i < 4; i++) K.box(0.05, 3.6, 0.14, 0x55534e, -1.05 + i * 0.7, 1.8, 0, door);
  K.box(2.6, 1.3, 1.0, 0x45443f, 3.2, 0.65, -6.0, scene); K.box(2.4, 0.08, 0.08, 0xb8b5ad, 3.2, 1.0, -5.48, scene);
  [0xd9d6ce, 0x8a8782, 0xb8b5ad].forEach((c, i) => K.box(2.2, 0.35, 0.9, c, 3.2, 1.48 + i * 0.35, -6.0, scene));
  K.cyl(0.18, 0.25, 0.6, 0x3a3936, 1.4, 0.3, -6.0, scene, 12);
  // 옥희 + 꽃묶음
  const O = K.person(scene, { x: -1.0, z: -2.4, rot: -1.75, coat: 0x6e6c66, pants: 0x45443f, hair: 'bun', scale: 0.55 });
  const bq = new THREE.Group(); const flowers = [];
  for (let i = 0; i < 7; i++) { const s = K.cyl(0.02, 0.02, 0.9, 0x45443f, (i % 3 - 1) * 0.06, 0.45, (i % 2) * 0.05, bq, 4); s.rotation.z = (i - 3) * 0.08;
    const f = new THREE.Group(); f.position.set((i - 3) * 0.09, 0.92 + (i % 3) * 0.08, (i % 2) * 0.06); bq.add(f); for (let k = 0; k < 5; k++) { const pe = new THREE.Mesh(new THREE.SphereGeometry(0.075, 6, 5), K.lam(i % 2 ? 0xf8f7f2 : 0xc8c5bd)); pe.position.set(Math.cos(k * 1.256) * 0.08, 0, Math.sin(k * 1.256) * 0.08); f.add(pe); } flowers.push(f); }
  O.hold('R', bq, { at: [0, -0.05, 0], rot: [Math.PI, 0, 0] });
  // 어머니
  const M = K.person(scene, { x: 1.0, z: -2.6, rot: 1.9, coat: 0x9a978f, pants: 0x55534e, hair: 'bun', scale: 0.9 });
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.95, 2.0, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x45443f, side: THREE.DoubleSide })), 40); sk.position.y = 1.0; M.root.add(sk);
  cam.position.set(0.0, 2.4, 3.2); cam.lookAt(0.0, 1.8, -3.4);
  return (t, ph) => {
    const up = K.win(ph, 0.05, 0.9, 0.12), shy = K.win(ph, 0.3, 0.92, 0.12);
    O.pose({ headPitch: 0.35, bob: 0.06 * up, armR: { fwd: 0.6 + 1.3 * up, elbow: 0.5 - 0.3 * up }, armL: { fwd: 0.6 + 1.2 * up, out: 0.2, elbow: 0.6 } });
    M.pose({ headYaw: -0.9 * shy, headPitch: -0.3 * shy, torsoYaw: -0.25 * shy, armL: { fwd: 0.3, elbow: 0.4 }, armR: { fwd: 0.4 + 0.9 * shy, out: -0.1, elbow: 0.6 + 1.3 * shy } });
    flowers.forEach((f, i) => { f.rotation.z = 0.25 * Math.sin(ph * 2 + i); });
    door.position.z = -6.6 + 0.05 * Math.sin(ph * 2); door.rotation.y = 0.03 * Math.sin(ph * 2);
  };
}
