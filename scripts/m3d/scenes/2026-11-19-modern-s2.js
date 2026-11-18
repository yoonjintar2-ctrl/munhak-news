// 11/19 「완득이」 장면②: 허름한 동네 킥복싱 체육관. 글러브를 낀 소년이 매달린 샌드백을 오른발로 차고, 샌드백이 흔들린다. 뒤쪽에 트레이닝복 관장이 팔짱을 끼고 서서 고개를 끄덕인다. 링 로프와 줄넘기, 천장 형광등. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe2e0da, fog: [0xdedcd6, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#c9c5bc', line: '#bfbbb2', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 64 });
  // 뒤쪽 링 모서리 + 로프
  K.box(6, 0.6, 3, 0x8a8782, 3.6, 0.3, -6.0, scene); K.cyl(0.12, 0.12, 2.4, 0x2a2a28, 0.8, 1.6, -4.6, scene, 8); [1.2, 1.8, 2.4].forEach(y => { const r = K.cyl(0.04, 0.04, 6, 0x2a2a28, 3.8, y, -4.6, scene, 6); r.rotation.z = Math.PI / 2; });
  // 형광등
  [-2, 2].forEach(x => { K.box(2.6, 0.15, 0.3, 0x55534e, x, 6.2, -3.0, scene); K.box(2.4, 0.08, 0.2, 0xffffff, x, 6.1, -3.0, scene); });
  // 샌드백(천장에 매달림)
  const bag = new THREE.Group(); bag.position.set(-1.6, 6.4, -2.4); scene.add(bag); K.cyl(0.03, 0.03, 1.6, 0x1c1c1a, 0, -0.8, 0, bag, 4); K.cyl(0.6, 0.6, 2.6, 0x2e2d2a, 0, -2.9, 0, bag, 18); K.cyl(0.62, 0.62, 0.12, 0x6e6c66, 0, -2.0, 0, bag, 18);
  // 줄넘기 걸이
  K.box(0.1, 1.4, 0.1, 0x45443f, -4.6, 3.2, -6.7, scene); const rope = K.inked(new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.03, 6, 20, Math.PI), K.lam(0x2a2a28)), 1); rope.rotation.z = Math.PI; rope.position.set(-4.6, 2.6, -6.6); scene.add(rope);
  // 소년(킥) + 관장
  const A = K.athlete(scene, { x: 0.6, z: -2.2, rot: 1.45, kind: 'boxer', scale: 0.82, top: 0x2e2d2a });
  const C = K.person(scene, { x: 2.8, z: -4.4, rot: 2.6, coat: 0x55534e, pants: 0x3a3936, hair: 'short', scale: 0.92 });
  cam.position.set(0.4, 3.0, 6.4); cam.lookAt(0.0, 2.2, -3.0);
  return (t, ph) => {
    const k = K.win(ph, 0.08, 0.4, 0.08);
    A.pose({ legR: { fwd: 1.3 * k, side: -0.1, knee: 0.5 - 0.4 * k }, legL: { fwd: -0.1 * k, knee: 0.15 }, lean: -0.2 * k, armL: { fwd: 1.2, out: 0.1, elbow: 1.9 }, armR: { fwd: 0.9 - 0.6 * k, out: 0.15, elbow: 1.8 }, headPitch: 0.05, bob: 0.03 * Math.abs(Math.sin(ph * 2)) });
    const hit = Math.max(0, Math.sin((ph / (Math.PI * 2) - 0.3) * Math.PI * 2 * 1.0)) * Math.exp(-Math.max(0, ph / (Math.PI * 2) - 0.3) * 3);
    bag.rotation.z = 0.12 * hit + 0.02 * Math.sin(ph * 2); bag.rotation.x = 0.02 * Math.sin(ph);
    C.pose({ headPitch: -0.1 - 0.15 * Math.max(0, Math.sin(ph * 3)), armL: { fwd: 1.2, out: -0.45, elbow: 1.9 }, armR: { fwd: 1.1, out: -0.45, elbow: 1.9 } });
  };
}
