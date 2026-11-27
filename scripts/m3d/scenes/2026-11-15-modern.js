// 11/15 1분 현대문학 「우리들의 일그러진 영웅」 대표: 시골 학교 교실. 교탁 옆에 선 급장이 손짓하고, 줄지어 앉은 아이들이 일제히 그쪽을 본다. 맨 뒤 전학생만 팔짱을 끼고 고개를 돌린다. 창밖 미루나무가 흔들린다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cdc8bb', line: '#bfbaae', tiles: 3, repeat: 4 });
  // 앞벽(칠판 쪽, 화면 왼쪽 안) · 옆벽(창, 화면 안쪽)
  K.box(0.4, 6, 14, 0xdedbd3, -7.5, 3, -1, scene);
  K.box(0.1, 2.4, 6.5, 0x3c4440, -7.25, 3.4, -1.2, scene); K.box(0.2, 0.15, 6.6, 0x6a6964, -7.2, 2.15, -1.2, scene);
  K.box(18, 6, 0.4, 0xdedbd3, 1.5, 3, -8, scene);
  const panes = []; [-3, 1.5, 6].forEach(x => { K.box(3.4, 2.6, 0.1, 0xf1f0eb, x, 3.6, -7.75, scene); K.box(0.12, 2.6, 0.2, 0x4a4a46, x, 3.6, -7.7, scene); K.box(3.5, 0.12, 0.25, 0x4a4a46, x, 2.3, -7.7, scene); });
  // 창밖 미루나무(창 너머로 보이는 가지 끝)
  const trees = []; [-2.2, 2.6, 6.8].forEach((x, i) => { const g = new THREE.Group(); g.position.set(x, 1.8, -8.6); scene.add(g); const c = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.8, 3.6, 8), K.lam(0x77766f)), 40); c.position.y = 2.2; g.add(c); trees.push(g); });
  // 교탁 + 화분(교탁 위)
  K.box(1.4, 1.6, 1.0, 0x5a5955, -5.8, 0.8, 1.6, scene); K.cyl(0.25, 0.2, 0.4, 0x8a8882, -5.8, 1.8, 1.6, scene, 10);
  // 책상과 앉은 아이들(4줄×3) — 모두 화면 왼쪽(교탁) 방향을 본다: rot +π/2
  const kids = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
    const x = -3.2 + c * 2.6, z = -4.6 + r * 2.6;
    K.box(1.3, 0.12, 1.0, 0x6d6c67, x - 0.75, 1.25, z, scene); K.box(0.08, 1.2, 0.8, 0x55544f, x - 0.75, 0.6, z, scene);
    const last = r === 2 && c === 3;
    const P = K.person(scene, { x, z, rot: Math.PI / 2, coat: last ? 0x3a3a38 : [0xbdbab2, 0x8f8d87, 0xa9a69e, 0xcbc8c0][(r + c) % 4], pants: 0x4a4a47, hair: (r + c) % 3 ? 'short' : 'long', scale: 0.72, backpack: last });
    kids.push({ P, last, i: r * 4 + c });
  }
  // 급장(교탁 옆에 서서 반을 향함: rot -π/2 → +x)
  const M = K.person(scene, { x: -5.2, z: -1.0, rot: -Math.PI / 2 + 0.25, coat: 0x2f2f2d, pants: 0x262626, hair: 'short', scale: 0.85 });
  cam.position.set(4.5, 4.6, 9.5); cam.lookAt(-1.5, 1.8, -1.5);
  return (t, ph) => {
    trees.forEach((g, i) => g.rotation.z = 0.06 * Math.sin(ph * 2 + i));
    const cmd = K.win(ph, 0.2, 0.75, 0.1);
    M.pose({ headPitch: 0.05, headYaw: -0.2 + 0.4 * Math.sin(ph * 2), armR: { fwd: 0.4 + 1.1 * cmd, out: 0.15, elbow: 0.2, point: true }, armL: { fwd: 0.1, out: 0.1 } });
    kids.forEach(({ P, last, i }) => {
      if (last) P.pose({ bob: -0.55, headYaw: -0.6 * cmd, headPitch: -0.1, armL: { fwd: 1.1, out: -0.35, elbow: 1.9 }, armR: { fwd: 1.0, out: -0.35, elbow: 1.9 } });
      else P.pose({ bob: -0.55, headYaw: 0.15 * Math.sin(i), headPitch: -0.25 + 0.25 * cmd, lean: 0.12 * cmd, armL: { fwd: 1.1, elbow: 0.8 }, armR: { fwd: 1.1, elbow: 0.8 } });
    });
  };
}
