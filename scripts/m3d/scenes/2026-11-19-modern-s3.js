// 11/19 「완득이」 장면③: 작은 부엌 식탁. 오른쪽 어머니가 두 손으로 국그릇을 소년 앞에 내려놓고, 왼쪽 교복 소년은 수저를 든 채 쭈뼛 고개를 들어 어머니를 본다. 냄비와 국그릇에서 김이 오르고, 창가 화분이 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xebe9e3, fog: [0xe5e3dd, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d4d0c6', line: '#cac6bc', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 33 });
  // 싱크대·가스레인지·냄비
  K.box(4.4, 1.8, 1.2, 0xb8b5ad, 2.4, 0.9, -6.2, scene); K.box(4.4, 0.1, 1.3, 0x6e6c66, 2.4, 1.85, -6.2, scene); const pot = K.cyl(0.5, 0.45, 0.6, 0x45443f, 3.4, 2.2, -6.2, scene, 16);
  // 식탁 + 반찬
  K.box(2.8, 0.14, 1.4, 0x6e6c66, 0, 1.7, -3.4, scene); [[-1.2, -3.95], [1.2, -3.95], [-1.2, -2.85], [1.2, -2.85]].forEach(([x, z]) => K.box(0.12, 1.7, 0.12, 0x3a3936, x, 0.85, z, scene));
  [[-0.2, -3.7], [0.4, -3.8], [0.9, -3.6]].forEach(([x, z]) => K.cyl(0.18, 0.14, 0.1, 0xf2f0ea, x, 1.83, z, scene, 14));
  K.cyl(0.25, 0.2, 0.2, 0xf2f0ea, -0.7, 1.87, -3.1, scene, 16);
  // 사람
  const S = K.person(scene, { x: -1.9, z: -3.1, rot: -1.45, coat: 0x2e2d2a, pants: 0x45443f, hair: 'short', scale: 0.92, scarf: 0xf2f0ea });
  const spoon = K.box(0.06, 0.6, 0.04, 0xeeeeea, 0, 0, 0, scene); S.hold('R', spoon, { at: [0, -0.2, -0.05] });
  const M = K.person(scene, { x: 1.7, z: -2.8, rot: 1.5, coat: 0x8a8782, pants: 0x55534e, hair: 'long', scale: 0.88 });
  const apron = K.box(0.9, 1.1, 0.05, 0xf2f0ea, 0, 0.45, -0.62, M.torso);
  const bowl = new THREE.Group(); K.cyl(0.28, 0.2, 0.22, 0xf6f4ef, 0, 0, 0, bowl, 16); M.hold('R', bowl, { at: [0, -0.2, -0.1] });
  // 김 + 화분
  const steam = []; for (let i = 0; i < 8; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7, depthWrite: false })); scene.add(s); steam.push({ s, k: i / 8, x: i % 2 ? 3.4 : -0.7, z: i % 2 ? -6.2 : -3.1, y0: i % 2 ? 2.6 : 2.0 }); }
  const plant = new THREE.Group(); plant.position.set(-3.6, 1.9, -6.6); scene.add(plant); K.cyl(0.3, 0.24, 0.4, 0x55534e, 0, 0, 0, plant, 12); for (let i = 0; i < 4; i++) { const l = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.22, 6, 5), K.lam(0x8a8782)), 70); l.scale.set(0.5, 1.4, 0.5); l.position.set(Math.cos(i * 1.6) * 0.15, 0.45, Math.sin(i * 1.6) * 0.15); plant.add(l); }
  cam.position.set(0.0, 3.4, 4.4); cam.lookAt(0.0, 2.1, -3.4);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), put = K.win(ph, 0.05, 0.5, 0.12), up = K.win(ph, 0.35, 0.95, 0.12);
    M.pose({ lean: 0.2 * put, headPitch: -0.2, headYaw: 0.1, armR: { fwd: 0.6 + 0.6 * put, out: -0.1, elbow: 0.7 - 0.3 * put }, armL: { fwd: 0.5 + 0.5 * put, out: -0.2, elbow: 0.8 } });
    S.pose({ headPitch: -0.3 + 0.45 * up, headYaw: 0.15 * up, lean: 0.1, armR: { fwd: 0.9, elbow: 1.0 }, armL: { fwd: 0.6, elbow: 1.2 } });
    steam.forEach(o => { const v = (o.k * 2 + u) % 1; o.s.position.set(o.x + 0.15 * Math.sin(ph * 2 + o.k * 6), o.y0 + v * 1.4, o.z); o.s.scale.setScalar(0.6 + v * 1.4); o.s.material.opacity = 0.7 * (1 - v); });
    plant.rotation.z = 0.08 * Math.sin(ph); pot.rotation.y = 0.02 * Math.sin(ph * 3);
  };
}
