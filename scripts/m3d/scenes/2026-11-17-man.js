// 11/17 오늘의 사나이 홍수환(4전5기): 링 위에서 두 글러브를 번쩍 든 권투 선수, 옆에서 심판이 박수, 뒤로 관중석 그림자와 머리 위 조명. 카메라 고정(약간 아래에서 올려다봄)
export const secs = 3;
export const opts = { bg: 0x5a5854, fog: [0x5a5854, 22, 55], fov: 38, w: 720, h: 860 };
export default function (K) {
  const { THREE, scene, cam } = K;
  // 링 바닥(캔버스) + 앞 턱
  K.box(16, 0.6, 12, 0xeeece6, 0, -0.3, 0, scene); K.box(16.2, 1.6, 0.3, 0x3a3936, 0, -1.2, 6.0, scene);
  // 코너 기둥 + 로프 3줄(뒤쪽·옆쪽)
  [[-7.6, -5.6], [7.6, -5.6], [-7.6, 5.6], [7.6, 5.6]].forEach(([x, z]) => { K.cyl(0.22, 0.22, 4.4, 0x2a2a28, x, 2.2, z, scene, 12); K.box(0.6, 1.6, 0.6, 0x55524c, x, 3.2, z, scene); });
  const rope = (a, b, y) => { const len = Math.hypot(b[0] - a[0], b[1] - a[1]); const r = K.cyl(0.07, 0.07, len, 0x2a2a28, (a[0] + b[0]) / 2, y, (a[1] + b[1]) / 2, scene, 8); r.rotation.z = Math.PI / 2; r.rotation.y = -Math.atan2(b[1] - a[1], b[0] - a[0]); };
  [1.3, 2.3, 3.3].forEach(y => { rope([-7.6, -5.6], [7.6, -5.6], y); rope([-7.6, -5.6], [-7.6, 5.6], y); rope([7.6, -5.6], [7.6, 5.6], y); });
  // 관중석: 계단식 단 위 사람 그림자(머리+어깨), 일부는 손을 듦
  const crowd = []; for (let r = 0; r < 4; r++) { K.box(40, 1.0, 1.6, 0x8c8a85, 0, 0.2 + r * 1.1, -9 - r * 1.8, scene);
    for (let i = 0; i < 22; i++) { const g = new THREE.Group(); g.position.set(-19 + i * 1.8 + (r % 2) * 0.9, 1.0 + r * 1.1, -9 - r * 1.8); scene.add(g);
      const c = [0x4a4844, 0x5c5a55, 0x3e3c39][(i + r) % 3]; const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.45, 0.5, 4, 8), K.lam(c)); b.position.y = 0.5; g.add(b); const h = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), K.lam(c)); h.position.y = 1.35; g.add(h);
      if ((i * 7 + r * 3) % 6 === 0) { const a = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.7, 3, 8), K.lam(c)); a.position.set(0.45, 1.75, 0); a.rotation.z = -0.3; g.add(a); crowd.push({ a, k: i * 0.7 + r }); } } }
  // 머리 위 조명 틀
  K.box(18, 0.3, 0.3, 0x2a2a28, 0, 12, -2, scene); [-6, -2, 2, 6].forEach(x => { K.cyl(0.5, 0.9, 0.8, 0x3a3936, x, 11.5, -2, scene, 14); const l = new THREE.Mesh(new THREE.CircleGeometry(0.85, 18), K.flat(0xfaf9f4)); l.rotation.x = Math.PI / 2; l.position.set(x, 11.09, -2); scene.add(l); });
  // 권투 선수(정면에서 약간 오른쪽) + 심판
  const B = K.athlete(scene, { x: -0.8, z: 1.0, rot: Math.PI - 0.25, kind: 'boxer', scale: 1.2 });
  const R = K.person(scene, { x: 3.6, z: -2.2, rot: Math.PI - 0.6, coat: 0x8a8782, pants: 0x2a2a2a, scale: 1.0 });
  // 수건 하나가 로프에 걸려 흔들림
  const towel = new THREE.Group(); towel.position.set(-7.6, 3.3, -3.5); scene.add(towel); K.box(0.1, 1.4, 0.9, 0xf2f0ea, 0, -0.7, 0, towel);
  cam.position.set(0.6, 3.2, 13.0); cam.lookAt(0.2, 3.6, -1);
  return (t, ph) => {
    const s = Math.sin(ph), s2 = Math.sin(ph * 2);
    B.pose({ armL: { fwd: -2.75 + 0.12 * s2, out: 0.35, elbow: 0.35 }, armR: { fwd: -2.8 - 0.12 * s2, out: 0.3, elbow: 0.3 }, legL: { fwd: 0.06, side: 0.06 }, legR: { fwd: -0.1, side: -0.06, knee: 0.12 },
      headPitch: -0.22, bob: 0.06 * Math.abs(s2), lean: -0.05 });
    const c = 0.5 + 0.5 * Math.sin(ph * 4);
    R.pose({ armL: { fwd: -1.0, out: -0.2 - 0.25 * c, elbow: 1.2 }, armR: { fwd: -1.0, out: -0.2 - 0.25 * c, elbow: 1.2 }, headYaw: 0.5, headPitch: -0.1 });
    crowd.forEach(o => { o.a.position.y = 1.75 + 0.15 * Math.sin(ph * 2 + o.k); });
    towel.rotation.x = 0.08 * Math.sin(ph);
  };
}
