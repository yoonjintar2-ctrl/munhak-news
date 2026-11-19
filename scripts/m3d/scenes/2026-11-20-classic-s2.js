// 11/20 「밤에는 쥐들도 잠을 잔다」 장면②: 노인이 쭈그려 앉아(몸을 낮춤) 토끼풀 가득한 바구니를 열어 보이고, 소년이 손가락을 하나씩 꼽으며 셈을 한다. 풀이 흔들리고, 바구니 곁 작은 토끼 한 마리가 귀를 쫑긋거린다(노인의 상상 속 토끼 — 상징). 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e4da, fog: [0xe4e0d6, 40, 120] };
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

  K.ground(scene, { color: '#e2ded4', line: '#d0ccc2', tiles: 3, repeat: 4 });
  ruin({ seed: 33, px: -3.2, pz: -3.2 });
  const O = K.person(scene, { x: 1.1, z: -1.0, rot: 1.9, coat: 0xa8a59e, pants: 0x45443f, hair: 'cap', scale: 0.95 });
  const B = K.person(scene, { x: -0.9, z: -1.1, rot: -1.75, coat: 0x55534e, pants: 0x3a3936, hair: 'short', scale: 0.62 });
  const bask = new THREE.Group(); bask.position.set(0.15, 0.2, -0.9); scene.add(bask); K.cyl(0.5, 0.38, 0.45, 0x6e6c66, 0, 0, 0, bask, 16);
  const grass = []; for (let i = 0; i < 16; i++) { const g = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.6, 4), K.lam(0x6e6c66 + 0x101010 * (i % 3))); g.position.set(-0.35 + (i % 4) * 0.23, 0.45, -0.3 + Math.floor(i / 4) * 0.2); bask.add(g); grass.push(g); }
  const rab = new THREE.Group(); rab.position.set(1.0, 0, -0.2); scene.add(rab); const rb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), K.lam(0xf4f2ec)), 50); rb.scale.set(1.3, 1, 1); rab.scale.setScalar(0.7); rb.position.y = 0.3; rab.add(rb);
  const rh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), K.lam(0xf4f2ec)); rh.position.set(-0.35, 0.5, 0); rab.add(rh);
  const ears = [-0.07, 0.07].map(z => { const e = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.3, 3, 6), K.lam(0xf4f2ec)); e.position.set(-0.38, 0.78, z); rab.add(e); return e; });
  cam.position.set(0.1, 2.3, 4.6); cam.lookAt(0.1, 1.3, -1.0);
  return (t, ph) => {
    const c = Math.floor(((ph / (Math.PI * 2)) * 6)) % 3;
    O.pose({ bob: -0.9, lean: -0.45, headPitch: 0.2, headYaw: 0.15 * Math.sin(ph), armR: { fwd: 0.9, out: -0.1, elbow: 0.6 }, armL: { fwd: 0.6 + 0.2 * Math.sin(ph * 2), elbow: 0.8 } });
    B.pose({ headPitch: 0.25, headTilt: 0.1 * Math.sin(ph * 2), armR: { fwd: 1.3, elbow: 1.2, point: c === 1 }, armL: { fwd: 1.1 + 0.15 * Math.sin(ph * 3), elbow: 1.4, point: c !== 0 } });
    grass.forEach((g, i) => { g.rotation.z = 0.2 * Math.sin(ph * 2 + i * 0.7); });
    ears.forEach((e, i) => { e.rotation.x = (i ? 1 : -1) * 0.15 * Math.max(0, Math.sin(ph * 2)); });
    rh.position.y = 0.5 + 0.04 * Math.sin(ph * 4);
  };
}
