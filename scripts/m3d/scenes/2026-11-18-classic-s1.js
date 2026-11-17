// 11/18 「목걸이」 장면①: 소박한 거실. 남편(오른쪽)이 의기양양하게 흰 봉투를 내밀고, 마틸드(왼쪽)는 두 손으로 얼굴을 감싸며 고개를 숙인다. 벽시계 추가 흔들리고 등잔불이 일렁인다
export const secs = 3;
export const opts = { bg: 0xebe9e3, fog: [0xe5e3dd, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d4d0c6', line: '#cac6bc', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 63 });
  // 작은 식탁, 해진 의자, 벽시계
  K.box(2.4, 0.14, 1.2, 0x5a5853, 0, 1.6, -4.6, scene); [[-1, -5.1], [1, -5.1], [-1, -4.1], [1, -4.1]].forEach(([x, z]) => K.box(0.12, 1.6, 0.12, 0x3a3936, x, 0.8, z, scene));
  K.cyl(0.35, 0.3, 0.08, 0xf2f0ea, -0.4, 1.71, -4.6, scene, 16); K.cyl(0.12, 0.12, 0.4, 0x3a3936, 0.5, 1.87, -4.6, scene, 10);
  K.box(1.0, 0.12, 1.0, 0x45443f, -3.4, 1.0, -4.2, scene); K.box(1.0, 1.2, 0.12, 0x45443f, -3.4, 1.6, -4.7, scene); [[-3.8, -3.8], [-3.0, -3.8], [-3.8, -4.6], [-3.0, -4.6]].forEach(([x, z]) => K.box(0.1, 1.0, 0.1, 0x2a2a28, x, 0.5, z, scene));
  K.box(0.9, 1.6, 0.3, 0x45443f, 3.4, 4.2, -6.4, scene); const pend = new THREE.Group(); pend.position.set(3.4, 3.8, -6.2); scene.add(pend); K.cyl(0.02, 0.02, 0.8, 0xeeeeea, 0, -0.4, 0, pend, 4); K.cyl(0.14, 0.14, 0.05, 0xeeeeea, 0, -0.85, 0, pend, 12).rotation.x = Math.PI / 2;
  const fl = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 8), K.flat(0xffffff)), 1); fl.position.set(0.5, 2.18, -4.6); scene.add(fl);
  const M = K.person(scene, { x: -1.3, z: -2.6, rot: -Math.PI / 2 - 0.35, coat: 0x45443f, pants: 0x2a2a28, hair: 'bun', scale: 0.92 });
  const H = K.person(scene, { x: 1.4, z: -2.8, rot: Math.PI / 2 + 0.35, coat: 0x8a8782, pants: 0x3a3936, hair: 'short', scale: 0.98 });
  const env = K.box(0.7, 0.45, 0.04, 0xffffff, 0, 0, 0, scene);
  cam.position.set(0.2, 3.3, 5.0); cam.lookAt(0, 2.1, -3.0);
  return (t, ph) => {
    const give = K.win(ph, 0.05, 0.6, 0.12), cry = K.win(ph, 0.35, 0.95, 0.12);
    H.pose({ headPitch: 0.1, lean: 0.05, armR: { fwd: 0.4 + 1.0 * give, out: 0.05, elbow: 0.3 }, armL: { fwd: 0.1, elbow: 0.4 } });
    env.position.set(0.55 - 0.2 * (1 - give), 1.9 + 0.55 * give, -2.55); env.rotation.y = 0.3;
    M.pose({ headPitch: 0.1 - 0.6 * cry, headYaw: 0.1, lean: 0.15 * cry, armL: { fwd: 0.3 + 0.9 * cry, elbow: 0.6 + 1.3 * cry }, armR: { fwd: 0.3 + 0.9 * cry, elbow: 0.6 + 1.3 * cry } });
    pend.rotation.z = 0.35 * Math.sin(ph * 2); fl.scale.y = 1 + 0.25 * Math.sin(ph * 9);
  };
}
