// 11/20 「밤에는 쥐들도 잠을 잔다」 장면①: 벽돌 더미 위 소년이 막대기를 움켜쥐고 몸을 움츠리고, 오른쪽에서 바구니를 든 노인(모자, 밝은 외투)이 허리를 굽혀 내려다본다. 노인 바구니의 풀이 흔들리고 먼지가 떠다닌다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e2d8, fog: [0xe2ded4, 40, 120] };
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

  K.ground(scene, { color: '#e2ded4', line: '#cfcbc1', tiles: 3, repeat: 4 });
  ruin({ seed: 21, px: -1.2, pz: -2.4 });
  const B = K.person(scene, { x: -1.0, z: -1.4, rot: -2.2, coat: 0x55534e, pants: 0x3a3936, hair: 'short', scale: 0.62 });
  const stick = K.cyl(0.035, 0.04, 1.5, 0x3a3936, 0, 0, 0, scene, 6); B.hold('R', stick, { at: [0, -0.1, 0], rot: [0.5, 0, 0] });
  const O = K.person(scene, { x: 1.6, z: -1.3, rot: 1.75, coat: 0xa8a59e, pants: 0x45443f, hair: 'cap', scale: 0.95 });
  const bask = new THREE.Group(); K.cyl(0.38, 0.3, 0.35, 0x6e6c66, 0, 0, 0, bask, 14); const grass = []; for (let i = 0; i < 9; i++) { const g = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.5, 4), K.lam(0x77756f)); g.position.set(-0.25 + (i % 3) * 0.25, 0.35, -0.2 + Math.floor(i / 3) * 0.2); bask.add(g); grass.push(g); }
  O.hold('L', bask, { at: [0, -0.25, 0], rot: [0, 0, 0] });
  for (let i = 0; i < 10; i++) { const b = K.box(0.5, 0.22, 0.26, [0x9a968c, 0x7c7870][i % 2], -2.0 + (i % 5) * 0.4, 0.25 + (i % 3) * 0.1, -0.7 - Math.floor(i / 5) * 0.3, scene); b.rotation.y = i; }
  K.motes(scene, { n: 24, box: [10, 6, 6], z0: -3, size: 0.06 });
  cam.position.set(0.4, 2.6, 5.4); cam.lookAt(0.2, 1.9, -1.8);
  return (t, ph) => {
    const bend = 0.5 + 0.5 * Math.sin(ph), fear = K.win(ph, 0.2, 0.7, 0.15);
    O.pose({ lean: -(0.3 + 0.2 * bend), headPitch: 0.25, armL: { fwd: 0.3, elbow: 0.4 }, armR: { fwd: 0.5 + 0.4 * bend, out: -0.1, elbow: 0.5 } });
    B.pose({ bob: -0.7, lean: -(0.15 - 0.1 * fear), headPitch: -0.25 - 0.1 * fear, armR: { fwd: 0.9 + 0.3 * fear, elbow: 1.1 }, armL: { fwd: 0.7 + 0.2 * fear, elbow: 1.5 } });
    grass.forEach((g, i) => { g.rotation.z = 0.25 * Math.sin(ph * 2 + i); });
  };
}
