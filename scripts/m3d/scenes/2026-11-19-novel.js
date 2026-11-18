// 11/19 오늘의 소설 구절 「필경사 바틀비」: 월가 법률 사무소. 오른쪽 창가 높은 책상 앞의 바틀비(진한 옷)는 창밖 벽돌담 쪽을 본 채 움직이지 않고 고개만 천천히 젓는다. 왼쪽의 변호사(밝은 옷)가 서류 뭉치를 쥔 손을 내밀었다가 머쓱하게 거둔다. 벽시계 추가 흔들리고 책상 위 종이가 펄럭인다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xebe9e3, fog: [0xe7e5df, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d2c8', line: '#ccc8be', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 53 });
  // 창(바로 밖은 벽돌담) — 벽 z=-7
  K.box(2.6, 3.2, 0.2, 0x45443f, 2.6, 3.6, -6.8, scene);
  K.box(2.3, 2.9, 0.1, K.lam(0x8a8680), 2.6, 3.6, -6.7, scene);
  for (let r = 0; r < 6; r++) K.line([[1.45, 2.3 + r * 0.48, -6.62], [3.75, 2.3 + r * 0.48, -6.62]], scene);
  K.box(0.08, 2.9, 0.15, 0x45443f, 2.6, 3.6, -6.6, scene);
  // 초록 칸막이(접이 병풍) — 바틀비 자리를 가림
  const scr = new THREE.Group(); scr.position.set(0.6, 0, -4.2); scene.add(scr); [0, 1, 2].forEach(i => { const b = K.box(1.0, 2.6, 0.08, 0x77756f, i * 0.95, 1.3, (i % 2) * 0.25, scr); b.rotation.y = (i % 2 ? -0.5 : 0.5); });
  // 높은 서기 책상 + 종이 + 잉크병
  K.box(1.8, 0.12, 1.0, 0x55534e, 2.8, 2.6, -4.6, scene); K.box(0.12, 2.6, 0.12, 0x3a3936, 2.0, 1.3, -4.2, scene); K.box(0.12, 2.6, 0.12, 0x3a3936, 3.6, 1.3, -4.2, scene); K.box(0.12, 2.6, 0.12, 0x3a3936, 2.0, 1.3, -5.0, scene); K.box(0.12, 2.6, 0.12, 0x3a3936, 3.6, 1.3, -5.0, scene);
  const paper = K.box(0.7, 0.02, 0.5, 0xfbfaf6, 2.6, 2.68, -4.4, scene); K.cyl(0.1, 0.1, 0.18, 0x1c1c1a, 3.3, 2.75, -4.7, scene, 10);
  // 변호사 책상(왼쪽) 서류 더미
  K.box(2.4, 0.14, 1.3, 0x5a5853, -3.4, 1.7, -4.8, scene); [[-4.4, -5.3], [-2.4, -5.3], [-4.4, -4.3], [-2.4, -4.3]].forEach(([x, z]) => K.box(0.12, 1.7, 0.12, 0x3a3936, x, 0.85, z, scene));
  [0, 1, 2, 3].forEach(i => K.box(0.8, 0.12, 0.6, i % 2 ? 0xf2f0ea : 0xdedbd3, -3.6, 1.84 + i * 0.12, -4.9, scene));
  // 벽시계
  K.box(0.9, 1.6, 0.3, 0x45443f, -1.2, 4.6, -6.6, scene); const pend = new THREE.Group(); pend.position.set(-1.2, 4.2, -6.4); scene.add(pend); K.cyl(0.02, 0.02, 0.8, 0xeeeeea, 0, -0.4, 0, pend, 4); K.cyl(0.14, 0.14, 0.05, 0xeeeeea, 0, -0.85, 0, pend, 12).rotation.x = Math.PI / 2;
  // 인물: 바틀비(창 쪽을 보는 뒷모습에 가까운 옆얼굴), 변호사
  const B = K.person(scene, { x: 2.9, z: -3.6, rot: 0.45, coat: 0x2e2d2a, pants: 0x45443f, hair: 'short', scale: 0.95 });
  const L = K.person(scene, { x: -1.4, z: -2.2, rot: -1.25, coat: 0xa8a59e, pants: 0x3a3936, hair: 'short', scale: 1.0, scarf: 0xf2f0ea });
  const docs = K.box(0.55, 0.7, 0.05, 0xfbfaf6, 0, 0, 0, scene); L.hold('R', docs, { at: [0, -0.2, -0.15], rot: [0.2, 0, 0] });
  cam.position.set(-0.2, 3.4, 5.2); cam.lookAt(0.8, 2.4, -3.6);
  return (t, ph) => {
    const give = K.win(ph, 0.05, 0.55, 0.12), back = K.win(ph, 0.6, 0.98, 0.1);
    L.pose({ headYaw: 0.1, headPitch: 0.05 + 0.15 * back, headTilt: 0.15 * back, lean: 0.08 * give, armR: { fwd: 0.3 + 0.95 * give, out: 0.05, elbow: 0.25 + 0.6 * back }, armL: { fwd: 0.2 + 0.9 * back, elbow: 1.6 * back } });
    B.pose({ headYaw: 0.25 * Math.sin(ph * 2) * K.win(ph, 0.25, 0.75, 0.1) + 0.15, headPitch: 0.05, armL: { fwd: 0.15, elbow: 0.3 }, armR: { fwd: 0.15, elbow: 0.3 } });
    pend.rotation.z = 0.3 * Math.sin(ph * 2);
    paper.rotation.x = 0.06 * Math.sin(ph * 3); paper.position.y = 2.68 + 0.02 * Math.abs(Math.sin(ph * 3));
  };
}
