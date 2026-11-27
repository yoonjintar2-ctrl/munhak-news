// 11/15 1분 고전 「마지막 잎새」 대표: 비바람 지난 아침, 방 안에서 본 창. 창 너머 벽돌담에 담쟁이 줄기와 잎 한 장. 창가의 수가 블라인드를 올리고, 침대에서 몸을 일으킨 존시가 잎을 가리킨다. 창틀 물방울이 떨어진다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfcbc0', line: '#c2beb3', tiles: 3, repeat: 4 });
  // 방 벽(창 구멍 둘레를 상자로)
  const wall = 0xd9d6ce;
  K.box(5, 7, 0.4, wall, -5.5, 3.5, -4, scene); K.box(5, 7, 0.4, wall, 5.5, 3.5, -4, scene);
  K.box(6, 1.6, 0.4, wall, 0, 0.8, -4, scene); K.box(6, 1.8, 0.4, wall, 0, 6.1, -4, scene);
  // 창틀 + 십자 창살
  K.box(6.2, 0.2, 0.6, 0x4a4a46, 0, 1.6, -3.9, scene); K.box(6.2, 0.2, 0.5, 0x4a4a46, 0, 5.2, -3.9, scene);
  K.box(0.2, 3.6, 0.5, 0x4a4a46, -3.0, 3.4, -3.9, scene); K.box(0.2, 3.6, 0.5, 0x4a4a46, 3.0, 3.4, -3.9, scene); K.box(0.12, 3.6, 0.3, 0x4a4a46, 0, 3.4, -3.9, scene);
  // 블라인드(위로 말려 올라감)
  const blind = K.box(5.8, 1, 0.08, 0xeeede8, 0, 0, -3.75, scene);
  // 창 너머 벽돌담(옅은 큰 벽돌 몇 줄)
  const brick = K.canvasTex(512, 512, (g, w, h) => { g.fillStyle = '#b3aea4'; g.fillRect(0, 0, w, h); g.strokeStyle = '#9d988e'; g.lineWidth = 3; for (let r = 0; r < 8; r++) { g.beginPath(); g.moveTo(0, r * 64); g.lineTo(w, r * 64); g.stroke(); for (let c = 0; c < 4; c++) { const x = c * 128 + (r % 2) * 64; g.beginPath(); g.moveTo(x, r * 64); g.lineTo(x, r * 64 + 64); g.stroke(); } } });
  const bw = new THREE.Mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshLambertMaterial({ map: brick })); bw.position.set(0, 4, -9); scene.add(bw);
  // 담쟁이 줄기(굵은 선 몇 갈래) + 마지막 잎 한 장
  const vine = (pts) => { for (let i = 0; i < pts.length - 1; i++) { const [a, b] = [pts[i], pts[i + 1]]; const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy); const s = K.cyl(0.05, 0.05, len, 0x3a3936, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, -8.9, scene, 5); s.rotation.z = -Math.atan2(dx, dy); } };
  vine([[-1.6, 0.5], [-1.2, 2], [-0.4, 3.2], [0.2, 4.0], [1.0, 4.6]]); vine([[-0.4, 3.2], [-1.4, 4.2], [-1.7, 5.4]]); vine([[0.2, 4.0], [0.6, 5.6]]);
  const leaf = K.inked(new THREE.Mesh(new THREE.CircleGeometry(0.5, 5), K.lam(0x3d4a3a)), 1); leaf.position.set(1.05, 4.35, -8.85); leaf.rotation.z = 0.6; scene.add(leaf);
  // 침대(오른쪽 앞) + 이불, 존시는 몸을 일으켜 앉은 자세(아래는 이불에 가림)
  K.box(2.8, 0.7, 4.4, 0x6d6c67, 3.2, 0.45, 0.6, scene); K.box(2.9, 1.2, 0.2, 0x4f4e4a, 3.2, 1.2, -1.6, scene);
  K.box(2.7, 0.5, 3.0, 0xe8e6e0, 3.2, 1.05, 1.3, scene); K.box(1.4, 0.35, 0.8, 0xf2f1ec, 3.2, 1.0, -1.0, scene);
  const J = K.person(scene, { x: 3.2, z: 0.0, rot: 0.35, coat: 0x6a6964, pants: 0x55544f, hair: 'long', scale: 0.88 });
  // 수(창가 왼쪽, 블라인드 줄을 당김) — 앞치마 대신 목도리
  const S = K.person(scene, { x: -1.6, z: -2.3, rot: -0.35, coat: 0x3e3e3b, pants: 0x2f2f2d, hair: 'bun', scale: 0.92, scarf: 0xf2f0ea });
  // 창가 화분 + 의자
  K.cyl(0.35, 0.25, 0.5, 0x6a6964, -2.3, 1.95, -3.8, scene, 12); K.box(1.2, 0.1, 1.2, 0x55544f, -4.2, 1.2, -1.0, scene); K.box(1.2, 1.4, 0.1, 0x55544f, -4.2, 1.9, -1.55, scene);
  // 물방울(창틀 위에서 떨어짐)
  const drops = []; for (let i = 0; i < 6; i++) { const d = K.cyl(0.04, 0.04, 0.16, 0x6a6a66, 0, 0, 0, scene, 5); drops.push({ d, k: i / 6, x: -2.6 + i * 1.0 }); }
  cam.position.set(0.6, 3.5, 7.6); cam.lookAt(0.4, 3.0, -4);
  return (t, ph) => {
    const up = K.win(ph, 0.1, 0.95, 0.15);
    blind.scale.y = 1.6 - 1.2 * up; blind.position.y = 5.1 - blind.scale.y / 2;
    drops.forEach(o => { const u = (o.k + ph / (Math.PI * 2) * 2) % 1; o.d.position.set(o.x, 5.05 - u * 3.3, -3.6); });
    leaf.rotation.z = 0.6; // 그린 잎은 흔들리지 않는다
    S.pose({ headPitch: 0.15, headYaw: 0.1, armR: { fwd: 2.0 - 0.6 * up, elbow: 0.6 }, armL: { fwd: 0.2, out: 0.1 } });
    const pt = K.win(ph, 0.45, 0.95, 0.1);
    J.pose({ bob: -0.75, lean: -0.05, headPitch: 0.25 * pt, headYaw: 0.2, armR: { fwd: 0.4 + 1.3 * pt, elbow: 0.3, point: true }, armL: { fwd: 0.5, elbow: 1.2 } });
  };
}
