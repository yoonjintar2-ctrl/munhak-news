// 11/20 「밤에는 쥐들도 잠을 잔다」 장면③: 소년이 고개를 숙인 채 막대기로 벽돌 더미를 가리키고, 곁에 선 노인이 벗은 모자를 가슴께에 든 채 그 자리를 내려다본다. 창 구멍 너머 해가 지고 먼지가 떠다닌다. 카메라 고정(비스듬히)
export const secs = 3;
export const opts = { bg: 0xe2ded4, fog: [0xdedad0, 40, 120] };
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

  K.ground(scene, { color: '#e0dcd2', line: '#ccc8be', tiles: 3, repeat: 4 });
  ruin({ seed: 44, px: 0.5, pz: -2.6 });
  const sun = new THREE.Mesh(new THREE.CircleGeometry(0.7, 28), K.flat(0xffffff)); sun.position.set(0.5, 3.3, -7.5); scene.add(sun);
  const B = K.person(scene, { x: -1.4, z: -0.6, rot: -0.6, coat: 0x55534e, pants: 0x3a3936, hair: 'short', scale: 0.62 });
  const stick = K.cyl(0.035, 0.04, 1.5, 0x3a3936, 0, 0, 0, scene, 6); B.hold('R', stick, { at: [0, -0.1, 0], rot: [0.2, 0, 0] });
  const O = K.person(scene, { x: 1.9, z: -0.4, rot: 2.1, coat: 0xa8a59e, pants: 0x45443f, hair: 'short', hairC: 0x55534e, scale: 0.95 });
  const hat = new THREE.Group(); K.cyl(0.42, 0.42, 0.2, 0x333333, 0, 0, 0, hat, 14); K.box(0.6, 0.04, 0.35, 0x333333, 0, -0.08, -0.4, hat);
  O.hold('L', hat, { at: [0, -0.15, -0.1], rot: [1.4, 0, 0] });
  K.motes(scene, { n: 24, box: [10, 6, 6], z0: -3, size: 0.06 });
  cam.position.set(-0.6, 2.8, 6.2); cam.lookAt(0.2, 1.6, -1.6);
  return (t, ph) => {
    const pt = K.win(ph, 0.1, 0.8, 0.15);
    B.pose({ headPitch: 0.45, lean: -0.15, armR: { fwd: 0.6 + 0.5 * pt, out: 0.1, elbow: 0.3 }, armL: { fwd: 0.15, elbow: 0.6 + 0.4 * Math.sin(ph * 2) * 0.5 } });
    O.pose({ headPitch: 0.35 + 0.08 * Math.sin(ph), headYaw: -0.2, lean: -0.1, armL: { fwd: 0.8, out: -0.2, elbow: 1.2 }, armR: { fwd: 0.15 + 0.1 * Math.sin(ph), elbow: 0.3 } });
  };
}
