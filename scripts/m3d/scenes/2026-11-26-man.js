// 11/26 오늘의 사나이 김일(3D 삽화, 실제 인물 아님): 1960년대 프로레슬링 링 위, 검은 트렁크 차림 레슬러(왼쪽, rot π/2-0.3 → 오른쪽 상대를 향함)가 상대의 어깨를 두 손으로 잡고 고개를 뒤로 젖혔다 앞으로 숙이는(박치기 직전) 몸짓. 상대(오른쪽, 흰 트렁크)는 몸을 뒤로 젖힘. 로프 출렁·조명·관중 팔 흔들기. 세로 720×860. 부상·피 없음
export const secs = 3;
export const opts = { bg: 0x8a8782, fog: [0x8a8782, 24, 60], fov: 38, w: 720, h: 860 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(16, 0.6, 12, 0xeeece6, 0, -0.3, 0, scene); K.box(16.2, 1.6, 0.3, 0x3a3936, 0, -1.2, 6.0, scene);
  [[-7.6, -5.6], [7.6, -5.6], [-7.6, 5.6], [7.6, 5.6]].forEach(([x, z]) => { K.cyl(0.22, 0.22, 4.4, 0x2a2a28, x, 2.2, z, scene, 12); K.box(0.6, 1.6, 0.6, 0x55524c, x, 3.2, z, scene); });
  const ropes = []; const rope = (a, b, y) => { const len = Math.hypot(b[0] - a[0], b[1] - a[1]); const r = K.cyl(0.07, 0.07, len, 0x2a2a28, (a[0] + b[0]) / 2, y, (a[1] + b[1]) / 2, scene, 8); r.rotation.z = Math.PI / 2; r.rotation.y = -Math.atan2(b[1] - a[1], b[0] - a[0]); ropes.push({ r, y }); };
  [1.3, 2.3, 3.3].forEach(y => { rope([-7.6, -5.6], [7.6, -5.6], y); rope([-7.6, -5.6], [-7.6, 5.6], y); rope([7.6, -5.6], [7.6, 5.6], y); });
  const crowd = []; for (let r = 0; r < 4; r++) { K.box(40, 1.0, 1.6, 0xa4a19a, 0, 0.2 + r * 1.1, -9 - r * 1.8, scene);
    for (let i = 0; i < 22; i++) { const g = new THREE.Group(); g.position.set(-19 + i * 1.8 + (r % 2) * 0.9, 1.0 + r * 1.1, -9 - r * 1.8); scene.add(g);
      const c = [0x4a4844, 0x5c5a55, 0x3e3c39][(i + r) % 3]; const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.45, 0.5, 4, 8), K.lam(c)); b.position.y = 0.5; g.add(b); const h = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), K.lam(c)); h.position.y = 1.35; g.add(h);
      if ((i * 5 + r * 3) % 4 === 0) { const a = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.7, 3, 8), K.lam(c)); a.position.set(0.45, 1.75, 0); a.rotation.z = -0.3; g.add(a); crowd.push({ a, k: i * 0.7 + r }); } } }
  K.box(18, 0.3, 0.3, 0x2a2a28, 0, 12, -2, scene); const lamps = []; [-6, -2, 2, 6].forEach(x => { K.cyl(0.5, 0.9, 0.8, 0x3a3936, x, 11.5, -2, scene, 14); const l = new THREE.Mesh(new THREE.CircleGeometry(0.85, 18), K.flat(0xfaf9f4)); l.rotation.x = Math.PI / 2; l.position.set(x, 11.09, -2); scene.add(l); lamps.push(l); });
  const A = K.athlete(scene, { x: -1.3, z: 0.6, rot: -Math.PI / 2 - 0.55, kind: 'fighter', scale: 1.15, bottom: 0x1e1e1e });
  const Bq = K.athlete(scene, { x: 1.4, z: 0.2, rot: Math.PI / 2 + 0.55, kind: 'fighter', scale: 1.1, bottom: 0xe2dfd7 });
  cam.position.set(0.6, 3.4, 13.0); cam.lookAt(0.1, 3.4, -0.5);
  return (t, ph) => {
    const k = 0.5 + 0.5 * Math.sin(ph); // 0: 뒤로 젖힘, 1: 앞으로 숙임
    A.pose({ lean: -0.15 - 0.3 * k, headPitch: 0.3 - 0.7 * k, armL: { fwd: 1.4, out: 0.15, elbow: 0.4 }, armR: { fwd: 1.4, out: -0.1, elbow: 0.4 }, legL: { fwd: 0.35, knee: 0.3 }, legR: { fwd: -0.35, knee: 0.15 } });
    Bq.pose({ lean: 0.1 + 0.15 * k, headPitch: 0.15 + 0.1 * k, armL: { fwd: 1.0, out: 0.3, elbow: 0.8 }, armR: { fwd: 0.8, out: 0.2, elbow: 1.0 }, legL: { fwd: -0.3, knee: 0.2 }, legR: { fwd: 0.25, knee: 0.3 } });
    ropes.forEach((o, i) => { o.r.position.y = o.y + 0.04 * Math.sin(ph * 4 + i); });
    crowd.forEach(o => { o.a.position.y = 1.75 + 0.18 * Math.sin(ph * 2 + o.k); });
    lamps.forEach((l, i) => { l.material.color.setScalar(0.94 + 0.05 * Math.sin(ph * 6 + i)); });
  };
}
