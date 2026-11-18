// 11/19 1분 현대문학 「완득이」 대표: 달동네 두 옥상. 앞쪽 옥탑방 앞의 교복 소년(완득이)이 귀찮다는 듯 뒤돌아보고, 골목 건너 조금 높은 옥상의 담임(똥주)이 두 손을 입가에 모아 소리친다. 빨랫줄의 빨래가 펄럭이고 화분 고추 모가 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xeae8e2, 40, 150] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'town', seed: 23 });
  // 앞 옥상(바닥 + 난간) + 옥탑방
  K.box(12, 0.4, 7, 0xd6d3cb, -2.5, -0.2, 0.5, scene); K.box(12, 0.8, 0.2, 0xb8b5ad, -2.5, 0.4, -3.0, scene);
  const room = new THREE.Group(); room.position.set(-5.2, 0, -0.6); scene.add(room); K.box(3.6, 2.8, 2.6, 0xe4e1d9, 0, 1.4, 0, room); K.box(4.0, 0.2, 3.0, 0x55534e, 0, 2.9, 0, room); K.box(0.9, 1.9, 0.08, 0x45443f, 1.0, 0.95, 1.32, room); K.box(0.9, 0.7, 0.08, 0x6e6c66, -0.8, 1.6, 1.32, room);
  K.cyl(0.6, 0.6, 1.0, 0x8a8782, -2.6, 0.5, -2.2, scene, 14); // 물통
  // 건너편 옥상(조금 높게)
  K.box(10, 3.2, 6, 0xc8c5bd, 4.0, -0.2, -8.0, scene); K.box(10, 0.7, 0.2, 0xa8a59e, 4.0, 1.75, -5.1, scene);
  const T = K.person(scene, { x: 3.6, z: -5.7, rot: Math.PI + 0.6, coat: 0x6e6c66, pants: 0x3a3936, hair: "short", scale: 1.0 });
  T.root.position.y = 1.4;
  // 완득이(교복 + 가방)
  const W = K.person(scene, { x: -2.6, z: 1.0, rot: 2.3, coat: 0x2e2d2a, pants: 0x45443f, hair: 'short', scale: 1.0, scarf: 0xf2f0ea });
  // 빨랫줄 + 빨래
  K.cyl(0.05, 0.05, 2.6, 0x45443f, -7.4, 1.3, 1.6, scene, 6); K.cyl(0.05, 0.05, 2.6, 0x45443f, -4.0, 1.3, 3.0, scene, 6); K.line([[-7.4, 2.5, 1.6], [-4.0, 2.5, 3.0]], scene);
  const cl = []; [[-6.8, 0xf2f0ea, 0.8, 1.0], [-5.9, 0x8a8782, 0.9, 1.3], [-4.9, 0xf2f0ea, 0.7, 0.8]].forEach(([x, c, w, h]) => { const g = new THREE.Group(); g.position.set(x, 2.5, 1.6 + (x + 7.4) * 0.41); g.rotation.y = -0.39; scene.add(g); K.box(w, h, 0.03, c, 0, -h / 2, 0, g); cl.push(g); });
  // 화분(고추 모)
  const pots = []; [[1.2, -2.4], [2.0, -2.5], [2.8, -2.3]].forEach(([x, z]) => { K.cyl(0.35, 0.28, 0.5, 0x55534e, x, 0.25, z, scene, 12); const g = new THREE.Group(); g.position.set(x, 0.5, z); scene.add(g); for (let i = 0; i < 4; i++) { const l = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.16, 6, 5), K.lam(0x8a8782)), 70); l.scale.set(0.6, 1.4, 0.6); l.position.set(Math.cos(i * 1.6) * 0.12, 0.35 + i * 0.08, Math.sin(i * 1.6) * 0.12); g.add(l); } pots.push(g); });
  cam.position.set(-3.0, 3.4, 7.4); cam.lookAt(0.6, 2.3, -3.0);
  return (t, ph) => {
    const shout = 0.5 + 0.5 * Math.sin(ph * 4), look = K.win(ph, 0.2, 0.85, 0.12);
    T.pose({ headPitch: -0.1, lean: -0.05 - 0.05 * shout, armL: { fwd: 1.3, out: 0.1, elbow: 2.3 + 0.1 * shout }, armR: { fwd: 1.3, out: 0.1, elbow: 2.3 + 0.1 * shout } });
    W.pose({ headYaw: -1.2 * look, torsoYaw: -0.3 * look, headPitch: -0.05, armL: { fwd: 0.1, elbow: 0.3 }, armR: { fwd: 0.2 + 0.25 * look, out: 0.2 * look, elbow: 0.6 } });
    cl.forEach((g, i) => { g.rotation.x = 0.35 * Math.sin(ph * 2 + i * 0.8) - 0.2; });
    pots.forEach((g, i) => { g.rotation.z = 0.12 * Math.sin(ph + i); });
  };
}
