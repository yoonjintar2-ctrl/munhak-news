// 11/23 「귀여운 여인」 장면②(after 2): 목재 더미가 쌓인 마당, 조끼 차림의 푸스토발로프가 통나무를 가리키며 말하고 곁의 올렌카가 고개를 끄덕인다. 굴뚝 연기·나는 새·흔들리는 나뭇잎. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d4d1c9', line: '#cac7bf', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 2323, near: false });
  // 통나무 더미 둘 + 판자 더미
  [[-3.6, -3.5], [3.8, -4.2]].forEach(([x, z]) => { for (let r = 0; r < 3; r++) for (let i = 0; i < 4 - r; i++) K.cyl(0.32, 0.32, 3.2, 0x8a8782, x - 1 + i * 0.66 + r * 0.33, 0.32 + r * 0.56, z, scene, 12).rotation.x = Math.PI / 2; });
  for (let i = 0; i < 6; i++) K.box(3, 0.12, 0.8, [0xa8a59e, 0x9a978f][i % 2], 0.4, 0.06 + i * 0.13, -6.2, scene);
  // 사무소 오두막 + 굴뚝
  K.box(3.2, 2.6, 2.4, 0xbcb9b1, -0.4, 1.3, -8.5, scene); K.box(3.6, 0.3, 2.8, 0x45443f, -0.4, 2.75, -8.5, scene); K.box(0.4, 1.0, 0.4, 0x55534e, 0.6, 3.3, -8.6, scene);
  const smoke = []; for (let i = 0; i < 10; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false })); scene.add(s); smoke.push({ s, k: i / 10 }); }
  const P = K.person(scene, { x: -1.0, z: -1.8, rot: -0.6, coat: 0x3a3936, pants: 0x55534e, hair: 'short', scale: 1.05 });
  K.box(0.7, 0.9, 0.05, 0x8a8782, 0, 1.0, 0.3, P.root); // 조끼 앞판 느낌
  const O = K.person(scene, { x: 0.9, z: -1.4, rot: 0.6, coat: 0x9a978f, pants: 0x77756f, hair: 'bun', scale: 0.9, scarf: 0xeeece6 });
  const B = K.bird(scene, { cx: 0, cy: 6.5, cz: -9, rx: 6, rz: 2, s: 0.8 });
  cam.position.set(0.2, 2.5, 5.6); cam.lookAt(-0.2, 1.6, -3.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), pt = K.win(ph, 0.1, 0.6, 0.1);
    P.pose({ headYaw: 0.6 - 0.9 * pt, armR: { fwd: 0.3 + 1.2 * pt, out: 0.6 * pt, point: true }, armL: { fwd: 0.3, elbow: 0.8 } });
    O.pose({ headYaw: -0.5, headPitch: 0.15 + 0.15 * Math.sin(ph * 4), armL: { fwd: 0.6, elbow: 1.4 }, armR: { fwd: 0.6, elbow: 1.4 } });
    smoke.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(0.6 + v * 1.2 + 0.1 * Math.sin(ph * 2 + o.k * 6), 3.9 + v * 2.5, -8.6); o.s.scale.setScalar(0.6 + v * 1.8); o.s.material.opacity = 0.5 * (1 - v); });
    B.update(ph);
  };
}
