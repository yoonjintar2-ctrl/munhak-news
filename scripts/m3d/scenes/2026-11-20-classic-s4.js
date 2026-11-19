// 11/20 「밤에는 쥐들도 잠을 잔다」 결말 장면: 노을 진 폐허 길. 오른쪽으로 걸어가던 노인(바구니)이 돌아서서 손을 흔들고, 벽돌 더미 위에 선 소년이 막대기를 내린 채 그쪽을 바라본다. 무너진 벽 위 첫 별이 반짝인다. 걷는 동작 없음(제자리에서 돌아봄). 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdcd8ce, fog: [0xd8d4ca, 40, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  // --- 폐허(공통): 창 구멍만 남은 벽 + 벽돌 더미 + 먼 무너진 건물들
  const ruin = (o = {}) => {
    const wz = o.wz ?? -5, wc = 0xbdb9af, dk = 0x8a8680;
    K.box(3.3, 6.2, 0.5, wc, -1.85, 3.1, wz, scene); K.box(2.8, 4.6, 0.5, wc, 2.6, 2.3, wz, scene);
    K.box(1.4, 2.7, 0.5, wc, 0.5, 1.35, wz, scene); K.box(1.4, 1.2, 0.5, wc, 0.5, 5.6, wz, scene);
    [[-3.2, 6.4, 0.6], [-2.4, 6.5, 0.5], [-1.4, 6.35, 0.4], [3.4, 4.8, 0.7], [2.4, 4.75, 0.4]].forEach(([x, y, s]) => { const b = K.box(s, s * 0.7, 0.5, wc, x, y, wz, scene); b.rotation.z = (x % 1) * 0.6; });
    for (let r = 0; r < 9; r++) K.line([[-3.5, 0.6 + r * 0.65, wz + 0.26], [-0.9, 0.6 + r * 0.65, wz + 0.26]], scene);
    K.box(1.6, 0.12, 0.6, dk, 0.5, 2.72, wz + 0.05, scene); // 창턱
    const R = (() => { let s = (o.seed || 7) * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; })();
    const bricks = [];
    for (let i = 0; i < 150; i++) { const a = R() * Math.PI * 2, rr = Math.sqrt(R()) * 3.4; const x = (o.px ?? 0) + Math.cos(a) * rr * 1.3, z = (o.pz ?? -2.2) + Math.sin(a) * rr * 0.55;
      const h = Math.max(0.05, 1.3 * (1 - rr / 3.4)) + R() * 0.2; const c = [0x9a968c, 0x7c7870, 0xb0aca2, 0x6a6862][i % 4];
      const b = K.box(0.5, 0.22, 0.26, c, x, h, z, scene); b.rotation.set(R() * 0.6, R() * 3, R() * 0.6); bricks.push(b); }
    for (let i = 0; i < 4; i++) { const p = K.box(0.18, 1.6 + R(), 0.18, 0x55534e, -4.5 + i * 3.3, 0.6, -3.8 + R(), scene); p.rotation.z = 0.5 - R(); } // 부러진 들보
    [[-14, -24, 6, 6, 5], [-5, -30, 7, 6, 8], [8, -26, 6, 6, 4], [17, -32, 8, 6, 7]].forEach(([x, z, w, d, h], i) => { K.box(w, h, d, [0xcfccc4, 0xc4c1b9][i % 2], x, h / 2, z, scene); for (let k = 0; k < 3; k++) K.box(w / 4, 1 + k * 0.4, d, [0xcfccc4, 0xc4c1b9][i % 2], x - w / 3 + k * w / 3, h + 0.5, z, scene); });
    return bricks;
  };

  K.ground(scene, { color: '#dcd8ce', line: '#c8c4ba', tiles: 3, repeat: 4 });
  ruin({ seed: 55, px: -2.4, pz: -2.2 });
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.16), K.flat(0xffffff)); star.position.set(-1.6, 7.6, -6); scene.add(star);
  const B = K.person(scene, { x: -2.0, z: -1.4, rot: -2.4, coat: 0x55534e, pants: 0x3a3936, hair: 'short', scale: 0.62 });
  const stick = K.cyl(0.035, 0.04, 1.5, 0x3a3936, 0, 0, 0, scene, 6); B.hold('L', stick, { at: [0, -0.1, 0], rot: [0, 0, 0] });
  const O = K.person(scene, { x: 2.6, z: 0.2, rot: 2.3, coat: 0xa8a59e, pants: 0x45443f, hair: 'cap', scale: 0.92 });
  const bask = new THREE.Group(); K.cyl(0.38, 0.3, 0.35, 0x6e6c66, 0, 0, 0, bask, 14); O.hold('L', bask, { at: [0, -0.25, 0] });
  cam.position.set(0.2, 2.6, 6.4); cam.lookAt(0.2, 1.9, -1.2);
  return (t, ph) => {
    const wave = Math.sin(ph * 3);
    O.pose({ headYaw: 0.2, torsoYaw: 0.25, armR: { fwd: 2.3, out: 0.3 + 0.25 * wave, elbow: 0.4 }, armL: { fwd: 0.2, elbow: 0.3 } });
    B.pose({ bob: -0.25, headPitch: -0.05 + 0.05 * Math.sin(ph), headTilt: 0.12 * Math.sin(ph), armL: { fwd: 0.2, elbow: 0.2 }, armR: { fwd: 0.35 + 0.35 * K.win(ph, 0.4, 0.9, 0.15), elbow: 0.5 } });
    star.scale.setScalar(0.8 + 0.4 * Math.abs(Math.sin(ph * 2))); star.rotation.y = ph;
  };
}
