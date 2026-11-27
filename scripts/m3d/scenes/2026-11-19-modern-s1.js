// 11/19 「완득이」 장면①: 밤의 작은 동네 교회. 맨 뒤 긴 의자에 교복 소년이 혼자 서서 두 손을 모으고 고개를 숙였다 들었다 한다(뒷모습에 가까운 비스듬한 각도). 앞 강대상 쪽 촛불 세 개가 일렁이고, 창밖 별이 깜박인다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xd8d6d0, fog: [0xd4d2cc, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#c8c3b8', line: '#beb9ae', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 91 });
  // 긴 의자 4줄
  for (let r = 0; r < 4; r++) { const z = -1.0 - r * 1.6; K.box(5.0, 0.12, 0.7, 0x55534e, -0.8, 1.0, z, scene); K.box(5.0, 1.0, 0.12, 0x45443f, -0.8, 1.5, z + 0.35, scene); [-3.0, 1.4].forEach(x => K.box(0.12, 1.0, 0.7, 0x3a3936, x, 0.5, z, scene)); }
  // 강대상 + 십자 모양 나무 + 촛불
  K.box(1.8, 1.6, 0.9, 0x45443f, -0.8, 0.8, -5.9, scene); K.box(0.25, 2.6, 0.12, 0x3a3936, -0.8, 4.4, -6.5, scene); K.box(1.4, 0.25, 0.12, 0x3a3936, -0.8, 5.0, -6.5, scene);
  const fl = []; [-1.4, -0.8, -0.2].forEach(x => { K.cyl(0.08, 0.08, 0.5, 0xf6f4ef, x, 1.85, -5.9, scene, 8); const f = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 8), K.flat(0xffffff)), 1); f.position.set(x, 2.22, -5.9); scene.add(f); fl.push(f); });
  // 창(밤하늘 + 별)
  const stars = []; [[3.6, 4.4], [4.2, 3.8], [3.9, 5.0]].forEach(([x, y]) => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), K.flat(0xffffff)); s.position.set(x, y, -6.85); scene.add(s); stars.push(s); });
  K.box(1.8, 2.2, 0.06, K.lam(0x55534e), 3.9, 4.4, -6.9, scene);
  const B = K.person(scene, { x: 0.3, z: 0.4, rot: 0.25, coat: 0x2e2d2a, pants: 0x45443f, hair: 'short', scale: 0.95, scarf: 0xf2f0ea });
  cam.position.set(3.4, 3.6, 6.6); cam.lookAt(-0.4, 2.2, -4.0);
  return (t, ph) => {
    const bow = 0.5 + 0.5 * Math.sin(ph);
    B.pose({ headPitch: -0.25 - 0.3 * bow, lean: 0.1 + 0.08 * bow, armL: { fwd: 1.0, out: -0.35, elbow: 1.5 }, armR: { fwd: 1.0, out: -0.35, elbow: 1.5 } });
    fl.forEach((f, i) => { f.scale.set(1 + 0.15 * Math.sin(ph * 7 + i), 1 + 0.3 * Math.sin(ph * 9 + i * 2), 1); });
    stars.forEach((s, i) => { s.scale.setScalar(0.6 + 0.6 * (0.5 + 0.5 * Math.sin(ph * 3 + i * 2))); });
  };
}
