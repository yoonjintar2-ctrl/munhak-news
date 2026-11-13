// 11/13 오늘의 시 — 한용운 「알 수 없어요」: 바람 없는 하늘에서 오동잎이 떨어지고, 옛 탑 곁 툇마루의 등불이 흔들린다
export const secs = 3;
export const opts = { bg: 0xb4b4b0, fog: [0xb0b0ac, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#a9a9a3', line: '#a4a49e', tiles: 2, repeat: 4 });
  // 먼 산 능선
  const hill = (x, z, r, h, c) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(c)); m.scale.y = h / r; m.position.set(x, 0, z); scene.add(m); };
  hill(-18, -48, 20, 7, 0x8e8e8a); hill(8, -55, 26, 9, 0x969692); hill(30, -46, 18, 6, 0x8a8a86);
  // 옛 석탑 (기단 + 탑신 + 지붕돌 3층)
  const tower = new THREE.Group(); tower.position.set(-3.2, 0, -6); scene.add(tower);
  K.box(3.4, 0.8, 3.4, 0x9a9a95, 0, 0.4, 0, tower); K.box(2.8, 0.9, 2.8, 0xa3a39e, 0, 1.25, 0, tower);
  let y = 1.7; [[1.9, 1.3], [1.6, 0.7], [1.35, 0.6]].forEach(([w, h], i) => {
    K.box(w * 0.62, h, w * 0.62, 0xa8a8a3, 0, y + h / 2, 0, tower); y += h;
    K.box(w, 0.28, w, 0x8d8d88, 0, y + 0.14, 0, tower); y += 0.28; });
  K.cyl(0.08, 0.12, 1.1, 0x777773, 0, y + 0.55, 0, tower, 8);
  // 오동나무 한 그루 (기둥 + 가지)
  const tr = K.cyl(0.32, 0.45, 7, 0x5e5e5a, 4.6, 3.5, -4, scene, 10);
  [[-0.7, 6.4, 0.9], [0.8, 5.6, -0.8], [0.2, 6.9, 0.3]].forEach(([dx, yy, rz]) => { const b = K.cyl(0.1, 0.16, 3, 0x5e5e5a, 4.6 + dx, yy, -4, scene, 6); b.rotation.z = rz; });
  // 툇마루와 기둥, 처마
  K.box(6, 0.5, 2.2, 0x6f6f6b, 6.5, 0.6, 2.2, scene);
  [3.8, 9.2].forEach(x => K.cyl(0.18, 0.18, 4.4, 0x5a5a56, x, 2.6, 1.4, scene, 10));
  const eave = K.box(7.0, 0.22, 2.6, 0x2f2f2d, 6.5, 4.9, 2.0, scene); eave.rotation.x = 0.12;
  // 등불(등잔): 불꽃이 흔들린다
  K.cyl(0.18, 0.26, 0.5, 0x3a3a38, 4.6, 1.1, 2.9, scene, 10);
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.42, 10), new THREE.MeshBasicMaterial({ color: 0xffffff })); flame.position.set(4.6, 1.56, 2.9); scene.add(flame);
  const halo = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })); halo.position.copy(flame.position); scene.add(halo);
  // 마당에 선 사람: 떨어지는 잎을 따라 고개를 들었다 내린다
  const P = K.person(scene, { x: 1.4, z: 3.4, rot: 0.35, coat: 0xc9c6bd, pants: 0x55554f, hair: 'short', hairC: 0x2a2a2a, scale: 0.95 });
  // 오동잎(넓은 잎) 둘: 화면 위 밖에서 아래 밖으로, 한 바퀴에 한 번씩 → 끊김 없음
  const leafShape = new THREE.Shape(); leafShape.moveTo(0, -0.7); leafShape.bezierCurveTo(0.9, -0.3, 0.8, 0.6, 0, 0.75); leafShape.bezierCurveTo(-0.8, 0.6, -0.9, -0.3, 0, -0.7);
  const mkLeaf = c => { const m = K.inked(new THREE.Mesh(new THREE.ShapeGeometry(leafShape), new THREE.MeshLambertMaterial({ color: c, side: THREE.DoubleSide })), 1); scene.add(m); return m; };
  const L1 = mkLeaf(0x3e3e3a), L2 = mkLeaf(0x575753);
  // 구름 두 덩이: 천천히 갈라졌다 모인다(검은 구름의 터진 틈)
  const cloud = (x, s) => { const g = new THREE.Group(); [[0, 0, 1.6], [1.6, 0.3, 1.2], [-1.5, 0.2, 1.1], [0.6, 0.9, 1.0]].forEach(([dx, dy, r]) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), K.lam(0x5c5c58)); m.position.set(dx, dy, 0); g.add(m); }); g.scale.setScalar(s); g.position.set(x, 19, -40); scene.add(g); return g; };
  const C1 = cloud(-7, 2.2), C2 = cloud(7, 2.4);
  cam.position.set(0.5, 3.2, 13); cam.lookAt(0.6, 4.6, -4);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    const fall = (L, off, x0) => { const v = (u + off) % 1; L.position.set(x0 + Math.sin(v * Math.PI * 4) * 1.1, 13 - v * 15, 2.5 - v * 1.5); L.rotation.set(0.6 + Math.sin(v * 12) * 0.5, v * 4, Math.sin(v * Math.PI * 4) * 0.9); };
    fall(L1, 0, 1.2); fall(L2, 0.5, -0.4);
    const gap = 0.5 + 0.5 * Math.sin(ph);
    C1.position.x = -6.5 - gap * 2.5; C2.position.x = 6.5 + gap * 2.5;
    const f = 1 + 0.18 * Math.sin(ph * 6) + 0.08 * Math.sin(ph * 11 + 1);
    flame.scale.set(1, f, 1); flame.rotation.z = Math.sin(ph * 4) * 0.12; halo.scale.setScalar(0.9 + 0.15 * Math.sin(ph * 6));
    const v = (u + 0.0) % 1; const up = K.win(ph, 0.05, 0.55, 0.15);
    P.pose({ headPitch: 0.55 * up - 0.15 * (1 - up), headYaw: 0.25 * Math.sin(ph), torsoYaw: 0.05 * Math.sin(ph),
      armL: { fwd: 0.85, out: -0.2, elbow: -1.2 }, armR: { fwd: 0.85, out: -0.2, elbow: -1.2 }, bob: Math.sin(ph * 2) * 0.01 });
  };
}
