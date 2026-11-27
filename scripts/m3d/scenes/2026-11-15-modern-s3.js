// 11/15 1분 현대문학 장면③ 새 담임: 방과 후 빈 교실, 새 담임 선생님이 병태 곁에 서서 몸을 숙여 말을 건네고 병태는 고개를 떨궜다가 살짝 든다. 커튼과 창밖 나무가 흔들리고 먼지가 떠다닌다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cdc8bb', line: '#bfbaae', tiles: 3, repeat: 4 });
  K.box(20, 6, 0.4, 0xdedbd3, 0, 3, -6, scene);
  // 창 둘 + 창밖 나무 + 커튼
  const trees = []; [-4.5, 1.0].forEach((x, i) => { K.box(3.6, 2.8, 0.1, 0xf1f0eb, x, 3.6, -5.75, scene); K.box(0.12, 2.8, 0.2, 0x4a4a46, x, 3.6, -5.7, scene); K.box(3.7, 0.14, 0.3, 0x4a4a46, x, 2.2, -5.65, scene);
    const g = new THREE.Group(); g.position.set(x + 0.6, 2.4, -6.6); scene.add(g); const c = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.2, 10, 8), K.lam(0x8a8983)), 60); c.position.y = 1.6; g.add(c); trees.push(g); });
  const cur = new THREE.Group(); cur.position.set(-2.4, 5.0, -5.5); scene.add(cur); K.box(0.8, 2.9, 0.06, 0xb7b4ac, 0, -1.45, 0, cur);
  // 빈 책상 몇 개(의자 등받이 포함) + 게시판(그림 없는 빈 판)
  [[-5, -2.8], [-2.4, -2.8], [3.6, -2.8], [-5, 0.2]].forEach(([x, z]) => { K.box(1.4, 0.12, 0.9, 0x6d6c67, x, 1.25, z, scene); [[-0.6], [0.6]].forEach(([a]) => K.box(0.08, 1.2, 0.8, 0x55544f, x + a, 0.6, z, scene)); K.box(1.0, 0.9, 0.08, 0x55544f, x, 1.2, z + 0.75, scene); });
  K.box(3.2, 1.8, 0.08, 0xa9a69e, 6.0, 3.8, -5.75, scene);
  const motes = K.motes(scene, { n: 12, box: [10, 4, 4], z0: -4, size: 0.06 });
  // 새 담임(왼쪽, 키 큼, 병태 쪽을 보며 몸을 숙임) · 병태(오른쪽, 담임 쪽을 봄)
  const T = K.person(scene, { x: -0.4, z: 1.2, rot: -Math.PI / 2 + 0.45, coat: 0x55544f, pants: 0x2f2f2d, hair: 'short', scale: 1.02 });
  const B = K.person(scene, { x: 1.6, z: 1.4, rot: Math.PI / 2 - 0.45, coat: 0xbdbab2, pants: 0x4a4a47, hair: 'short', scale: 0.74 });
  // 병태 옆 책상 위 가방
  K.box(1.4, 0.12, 0.9, 0x6d6c67, 2.9, 1.25, 0.6, scene); K.box(0.7, 0.5, 0.3, 0x3a3a38, 2.9, 1.56, 0.6, scene);
  cam.position.set(0.6, 3.0, 8.6); cam.lookAt(0.6, 2.2, -1);
  return (t, ph) => {
    trees.forEach((g, i) => g.rotation.z = 0.05 * Math.sin(ph * 2 + i)); cur.rotation.x = 0.07 * Math.sin(ph * 2);
    if (motes && motes.update) motes.update(ph);
    const talk = Math.sin(ph * 3);
    T.pose({ lean: 0.18, headPitch: -0.35, headYaw: 0.05, armR: { fwd: 0.45 + 0.12 * talk, out: 0.3, elbow: 0.9 }, armL: { fwd: 0.3, out: 0.05, elbow: 1.2 } });
    const lift = K.win(ph, 0.5, 0.85, 0.1);
    B.pose({ headPitch: -0.55 + 0.45 * lift, headYaw: 0.05, armL: { fwd: 0.15 }, armR: { fwd: 0.15 } });
  };
}
