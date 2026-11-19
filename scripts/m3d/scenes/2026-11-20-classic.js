// 11/20 1분 고전 「밤에는 쥐들도 잠을 잔다」 대표: 폭격 맞은 집터, 창문 구멍만 남은 벽에 저녁 해가 비친다. 벽돌 더미 위에 소년 위르겐이 막대기를 쥐고 웅크려 앉아 꾸벅 졸다 고개를 든다. 먼지가 떠다니고 까마귀 한 마리가 들보 위에서 고개를 까딱인다. 카메라 고정
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
  ruin({ seed: 11, px: 0.4, pz: -2.4 });
  const sun = new THREE.Mesh(new THREE.CircleGeometry(0.75, 28), K.flat(0xffffff)); sun.position.set(0.5, 3.7, -7.5); scene.add(sun);
  const B = K.person(scene, { x: 0.3, z: -1.6, rot: Math.PI - 0.35, coat: 0x55534e, pants: 0x3a3936, hair: 'short', scale: 0.62 });
  const stick = K.cyl(0.035, 0.04, 1.5, 0x3a3936, 0, 0, 0, scene, 6); B.hold('R', stick, { at: [0, -0.1, 0], rot: [0.3, 0, 0] });
  for (let i = 0; i < 14; i++) { const x = -1.2 + (i % 7) * 0.45, z = -0.9 - Math.floor(i / 7) * 0.3; const b = K.box(0.5, 0.22, 0.26, [0x9a968c, 0x7c7870][i % 2], x, 0.25 + (i % 3) * 0.12, z, scene); b.rotation.y = i * 0.7; }
  const crow = new THREE.Group(); crow.position.set(2.9, 4.25, -5); scene.add(crow); const cb = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), K.lam(0x222220)); cb.scale.set(1.4, 1, 0.9); crow.add(cb);
  const ch = new THREE.Group(); ch.position.set(-0.25, 0.22, 0); crow.add(ch); ch.add(new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), K.lam(0x222220))); const bk = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.16, 5), K.lam(0x333331)); bk.rotation.z = Math.PI / 2; bk.position.x = -0.16; ch.add(bk);
  const dust = K.motes(scene, { n: 30, box: [10, 6, 6], z0: -3, size: 0.06 });
  cam.position.set(0.6, 2.4, 5.6); cam.lookAt(0.4, 1.9, -2.5);
  return (t, ph) => {
    const nod = K.win(ph, 0.1, 0.55, 0.15);
    B.pose({ bob: -0.75, lean: -0.25, headPitch: 0.5 * nod - 0.15, headTilt: 0.1 * nod, armR: { fwd: 0.7, out: -0.2, elbow: 1.0 }, armL: { fwd: 0.6, out: 0.1, elbow: 1.3 } });
    ch.rotation.z = 0.4 * Math.max(0, Math.sin(ph * 3)); crow.rotation.y = 0.2 * Math.sin(ph);
    if (dust && dust.children) dust.children.forEach((m, i) => { m.position.y = 0.5 + ((i * 0.37 + ph / (Math.PI * 2)) % 1) * 4; });
  };
}
