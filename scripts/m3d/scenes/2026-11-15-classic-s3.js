// 11/15 1분 고전 장면③ 베어먼의 화실: 빈 캔버스 이젤 옆에서 늙은 화가 베어먼이 두 팔을 휘두르며 버럭 소리치고, 수는 두 손을 모은 채 부탁한다. 천장 등이 흔들린다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfcbc0', line: '#c2beb3', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 83 });
  // 이젤 + 빈 캔버스(밝게)
  const ez = new THREE.Group(); ez.position.set(-3.6, 0, -2.2); ez.rotation.y = 0.35; scene.add(ez);
  [-0.6, 0.6].forEach(x => { const l = K.cyl(0.06, 0.06, 4.4, 0x4a4945, x, 2.1, 0, ez, 6); l.rotation.z = x > 0 ? -0.1 : 0.1; }); const bl = K.cyl(0.06, 0.06, 4.0, 0x4a4945, 0, 1.9, -0.7, ez, 6); bl.rotation.x = -0.25;
  K.box(2.4, 1.8, 0.1, 0xf4f3ee, 0, 2.9, 0.12, ez); K.box(2.0, 0.1, 0.3, 0x4a4945, 0, 1.95, 0.15, ez);
  // 작업대: 팔레트, 붓통, 병(글자 없음)
  K.box(2.6, 0.12, 1.2, 0x5a5955, 4.0, 1.5, -1.6, scene); [[-1.1, -0.45], [1.1, -0.45], [-1.1, 0.45], [1.1, 0.45]].forEach(([a, b]) => K.cyl(0.06, 0.06, 1.5, 0x4a4945, 4.0 + a, 0.75, -1.6 + b, scene, 6));
  K.cyl(0.4, 0.4, 0.05, 0xbdbab2, 3.4, 1.6, -1.5, scene, 16); K.cyl(0.18, 0.18, 0.5, 0x3e3e3b, 4.3, 1.8, -1.8, scene, 10); K.cyl(0.13, 0.15, 0.6, 0x2f2f2d, 4.9, 1.85, -1.4, scene, 10);
  for (let i = 0; i < 3; i++) K.cyl(0.02, 0.02, 0.6, 0x3a3a38, 4.25 + i * 0.07, 2.2, -1.8, scene, 4);
  // 벽에 기대 둔 캔버스들
  [[5.8, -3.6, 0.1], [6.3, -3.4, 0.2]].forEach(([x, z, r]) => { const c = K.box(1.6, 2.0, 0.08, 0x8a8882, x, 1.0, z, scene); c.rotation.x = -0.12; c.rotation.y = r; });
  // 흔들리는 천장 등
  const lg = new THREE.Group(); lg.position.set(0.2, 6.8, -1.2); scene.add(lg); K.line([[0, 0, 0], [0, -1.2, 0]], lg); const sh = K.cyl(0.25, 0.7, 0.45, 0x3e3e3b, 0, -1.4, 0, lg, 14);
  // 베어먼(왼쪽, 이젤 옆, 수 쪽을 봄) — 덥수룩한 수염 덩어리, 흰머리
  const Bm = K.person(scene, { x: -1.4, z: 0.4, rot: -Math.PI / 2 + 0.55, coat: 0x55544f, pants: 0x3a3a38, hair: 'short', hairC: 0x262626, scale: 1.0 });
  const beard = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 8), K.lam(0x2f2f2d)), 60); beard.scale.set(1, 1.3, 0.7); beard.position.set(0, 0.05, -0.28); Bm.headG.add(beard);
  // 수(오른쪽, 베어먼 쪽을 봄, 두 손을 모아 부탁)
  const S = K.person(scene, { x: 1.6, z: 0.6, rot: Math.PI / 2 - 0.55, coat: 0x8f8d87, pants: 0x4a4a47, hair: 'bun', scale: 0.9, scarf: 0xf2f0ea });
  cam.position.set(0.2, 3.3, 9.0); cam.lookAt(0.1, 2.5, -1.5);
  return (t, ph) => {
    lg.rotation.z = 0.15 * Math.sin(ph * 2); lg.rotation.x = 0.06 * Math.sin(ph * 2 + 1);
    const yell = Math.max(0, Math.sin(ph * 2)), wave = Math.sin(ph * 4);
    Bm.pose({ headYaw: 0.1, headPitch: 0.1 * yell, lean: 0.08 * yell, armL: { fwd: 1.2 + 0.5 * yell, out: 0.5, elbow: 0.5 + 0.3 * wave }, armR: { fwd: 1.0 + 0.6 * yell, out: 0.4, elbow: 0.6 - 0.3 * wave } });
    const nod = K.win(ph, 0.55, 0.9, 0.08);
    S.pose({ headYaw: -0.05, headPitch: -0.1 - 0.2 * nod, lean: 0.04, armL: { fwd: 1.1, out: -0.25, elbow: 1.3 }, armR: { fwd: 1.1, out: -0.25, elbow: 1.3 } });
  };
}
