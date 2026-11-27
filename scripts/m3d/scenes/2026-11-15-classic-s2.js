// 11/15 1분 고전 장면② 잎을 세는 존시: 침대에서 몸을 일으킨 존시가 창밖 담쟁이를 가리키며 세고, 화판을 든 수가 놀라 돌아본다. 창밖에서 잎 하나가 떨어지고 바람에 덩굴이 흔들린다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfcbc0', line: '#c2beb3', tiles: 3, repeat: 4 });
  
  // 창(왼쪽 벽 가운데) — 벽은 상자 넷, 창틀
  const wall = 0xdcd9d1;
  K.box(4, 7, 0.4, wall, -6, 3.5, -4.5, scene); K.box(8, 7, 0.4, wall, 3.5, 3.5, -4.5, scene); K.box(3.5, 1.8, 0.4, wall, -2.25, 0.9, -4.5, scene); K.box(3.5, 1.6, 0.4, wall, -2.25, 6.2, -4.5, scene);
  K.box(3.7, 0.18, 0.6, 0x4a4a46, -2.25, 1.8, -4.4, scene); K.box(3.7, 0.18, 0.5, 0x4a4a46, -2.25, 5.4, -4.4, scene); K.box(0.12, 3.6, 0.3, 0x4a4a46, -2.25, 3.6, -4.4, scene);
  // 창 너머 벽돌담 + 덩굴과 잎 몇 장(흔들림), 떨어지는 잎 하나
  const bw = new THREE.Mesh(new THREE.PlaneGeometry(9, 6.8), K.lam(0x948f85)); bw.position.set(-2, 3.4, -5.6); scene.add(bw);
  [5.0, 3.2].forEach(y => K.box(12, 0.05, 0.05, 0x9d988e, -2, y, -5.55, scene));
  const vine = new THREE.Group(); vine.position.set(-2.4, 1.6, -5.45); scene.add(vine);
  K.cyl(0.05, 0.05, 3.6, 0x3a3936, 0, 1.8, 0, vine, 5).rotation.z = -0.2;
  const lv = []; [[0.3, 1.6], [0.55, 2.6], [0.75, 3.3], [-0.2, 2.1], [0.1, 3.0]].forEach(([x, y]) => { const l = K.inked(new THREE.Mesh(new THREE.CircleGeometry(0.28, 5), K.lam(0x3d4a3a)), 1); l.position.set(x, y, 0.05); vine.add(l); lv.push(l); });
  const fall = K.inked(new THREE.Mesh(new THREE.CircleGeometry(0.26, 5), new THREE.MeshLambertMaterial({ color: 0x55544f, side: THREE.DoubleSide })), 1); scene.add(fall);
  // 침대(오른쪽), 이불, 베개 — 존시는 일어나 앉음(아래는 이불에 가림)
  K.box(3.0, 0.7, 4.6, 0x6d6c67, 2.6, 0.45, 0.2, scene); K.box(3.1, 1.4, 0.2, 0x4f4e4a, 2.6, 1.3, -2.1, scene);
  K.box(2.9, 0.5, 3.0, 0xe8e6e0, 2.6, 1.05, 1.0, scene); K.box(1.4, 0.35, 0.8, 0xf2f1ec, 2.6, 1.0, -1.5, scene);
  const J = K.person(scene, { x: 2.6, z: -0.5, rot: 0.75, coat: 0x6a6964, pants: 0x55544f, hair: 'long', scale: 0.9 });
  // 협탁 + 약병(글자 없음) + 컵
  K.box(1.0, 1.2, 1.0, 0x5a5955, 4.8, 0.6, -1.2, scene); K.cyl(0.15, 0.15, 0.5, 0x3a3a38, 4.6, 1.45, -1.2, scene, 10); K.cyl(0.14, 0.11, 0.3, 0xe2e0d9, 5.0, 1.35, -1.0, scene, 10);
  // 수(왼쪽 앞, 의자 옆에 서서 화판을 들고 있다가 존시를 돌아봄)
  const S = K.person(scene, { x: -3.4, z: 1.8, rot: -0.9, coat: 0x3e3e3b, pants: 0x2f2f2d, hair: 'bun', scale: 0.92, scarf: 0xf2f0ea });
  const board = K.box(1.3, 0.9, 0.06, 0x8a8882, 0, 0, 0, scene);
  K.box(1.0, 0.1, 1.0, 0x55544f, -5.0, 1.1, 1.2, scene); K.box(1.0, 1.2, 0.1, 0x55544f, -5.0, 1.7, 0.7, scene);
  cam.position.set(0.6, 3.3, 9.2); cam.lookAt(0.2, 2.5, -2.5);
  return (t, ph) => {
    vine.rotation.z = 0.04 * Math.sin(ph * 2); lv.forEach((l, i) => l.rotation.z = 0.25 * Math.sin(ph * 2 + i));
    const u = (ph / (Math.PI * 2)) % 1; fall.position.set(-1.8 - u * 1.2 + 0.25 * Math.sin(u * 14), 4.8 - u * 3.4, -5.3); fall.rotation.set(u * 6, u * 4, u * 7); fall.visible = u < 0.92;
    const cnt = Math.sin(ph * 3);
    J.pose({ bob: -0.75, headYaw: 0.15, headPitch: 0.12, armR: { fwd: 1.5 + 0.12 * cnt, out: -0.05, elbow: 0.15, point: true }, armL: { fwd: 0.5, elbow: 1.3 } });
    const turn = K.win(ph, 0.3, 0.85, 0.1);
    S.pose({ headYaw: -0.3 - 0.9 * turn, torsoYaw: -0.35 * turn, headPitch: -0.25 * (1 - turn), armL: { fwd: 1.0, elbow: 1.0 }, armR: { fwd: 1.0, elbow: 1.0 } });
    // 화판: 수 가슴 앞
    const r = -0.9 - 0.35 * turn; board.position.set(-3.4 - Math.sin(r) * 0.9, 2.3, 1.8 - Math.cos(r) * 0.9); board.rotation.set(-0.5, r, 0);
  };
}
