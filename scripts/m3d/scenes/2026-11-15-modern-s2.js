// 11/15 1분 현대문학 장면② 버티기: 교실에서 급장이 자리를 손가락으로 가리키고, 전학생은 마주 서서 고개를 저으며 버틴다. 앉은 아이들이 숨죽여 돌아본다. 커튼이 흔들린다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cdc8bb', line: '#bfbaae', tiles: 3, repeat: 4 });
  K.box(20, 6, 0.4, 0xdedbd3, 0, 3, -7, scene);
  K.box(6.5, 2.4, 0.1, 0x3c4440, -1.5, 3.4, -6.75, scene); K.box(6.6, 0.15, 0.2, 0x6a6964, -1.5, 2.15, -6.7, scene);
  // 창 + 커튼(흔들림)
  K.box(3.2, 2.6, 0.1, 0xf1f0eb, 6.0, 3.6, -6.75, scene); K.box(0.12, 2.6, 0.2, 0x4a4a46, 6.0, 3.6, -6.7, scene);
  const cur = new THREE.Group(); cur.position.set(4.3, 5.0, -6.5); scene.add(cur); const cv = K.box(0.9, 2.8, 0.06, 0xb7b4ac, 0, -1.4, 0, cur);
  // 교탁, 책상 줄, 앉은 아이들(화면 안쪽=칠판 쪽을 보다가 뒤를 돌아봄)
  K.box(1.6, 1.5, 0.9, 0x5a5955, -5.5, 0.75, -4.8, scene);
  const kids = [];
  [[-4.5, -2.6], [-1.8, -2.6], [3.6, -2.6], [-4.5, 0.4], [3.6, 0.4]].forEach(([x, z], i) => {
    K.box(1.4, 0.12, 0.9, 0x6d6c67, x, 1.25, z - 0.85, scene); K.box(1.2, 1.2, 0.08, 0x55544f, x, 0.6, z - 1.25, scene);
    kids.push(K.person(scene, { x, z, rot: 0, coat: [0xbdbab2, 0x8f8d87, 0xa9a69e, 0xcbc8c0, 0x77756f][i], pants: 0x4a4a47, hair: i % 2 ? 'long' : 'short', scale: 0.72 }));
  });
  // 빈 자리(가운데 책상)
  K.box(1.4, 0.12, 0.9, 0x6d6c67, 0.9, 1.25, -3.45, scene);
  // 급장(왼쪽, 오른쪽을 향해 섬) · 전학생(오른쪽, 왼쪽을 향해 섬, 책가방)
  const M = K.person(scene, { x: -1.1, z: 2.0, rot: -Math.PI / 2 + 0.4, coat: 0x2f2f2d, pants: 0x262626, hair: 'short', scale: 0.86 });
  const B = K.person(scene, { x: 1.5, z: 2.2, rot: Math.PI / 2 - 0.4, coat: 0xa6a49d, pants: 0x4a4a47, hair: 'short', scale: 0.78, backpack: true });
  cam.position.set(0.3, 3.4, 10.5); cam.lookAt(0.2, 2.0, -1.5);
  return (t, ph) => {
    cur.rotation.x = 0.08 * Math.sin(ph * 2); cur.rotation.z = 0.04 * Math.sin(ph * 2 + 1);
    const jab = Math.max(0, Math.sin(ph * 2));
    // 급장: 빈 자리(오른쪽 안쪽)를 가리킴
    M.pose({ headYaw: 0.15, headPitch: 0.05, torsoYaw: 0.1, armR: { fwd: 1.2 + 0.15 * jab, out: -0.2, elbow: 0.1, point: true }, armL: { fwd: 0.1, out: 0.12 } });
    // 전학생: 고개를 저음(좌우), 팔은 가방끈
    B.pose({ headYaw: 0.35 * Math.sin(ph * 6) * K.win(ph, 0.15, 0.7, 0.08), headPitch: 0.08, armL: { fwd: 0.6, out: -0.2, elbow: 1.8 }, armR: { fwd: 0.6, out: -0.2, elbow: 1.8 } });
    const look = K.win(ph, 0.25, 0.9, 0.1);
    kids.forEach((P, i) => P.pose({ bob: -0.55, headYaw: (i % 2 ? -1 : 1) * 1.1 * look * (P.root.position.x < 0 ? -1 : 1), headPitch: -0.05, torsoYaw: (P.root.position.x < 0 ? -1 : 1) * 0.35 * look * (i % 2 ? -1 : 1), armL: { fwd: 1.1, elbow: 0.8 }, armR: { fwd: 1.1, elbow: 0.8 } }));
  };
}
