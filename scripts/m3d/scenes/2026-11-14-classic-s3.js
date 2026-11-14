// 11/14 1분 고전 장면③ 물레방앗간: 젊은 날의 기억 — 달밤, 물레방아가 돌고 물이 흘러내린다(사람은 그리지 않음)
export const secs = 3;
export const opts = { bg: 0x6f6f6b, fog: [0x6c6c68, 26, 80] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#6a6965', line: '#666561', tiles: 2, repeat: 3 });
  K.backdrop(scene, { kind: 'country', seed: 35, night: true });
  // 방앗간 집 + 초가 지붕
  K.box(5.5, 3.2, 4, 0x8c8b86, 2.6, 1.6, -3, scene);
  const rf = new THREE.Mesh(new THREE.ConeGeometry(4.4, 2.2, 4), K.lam(0x5a5955)); rf.position.set(2.6, 4.3, -3); rf.rotation.y = Math.PI / 4; rf.scale.set(1, 1, 0.85); scene.add(K.inked(rf));
  K.box(1.1, 1.9, 0.1, 0x3b3b39, 2.4, 0.95, -0.95, scene); // 문
  // 물레바퀴(돈다) — 축 + 테 + 날개
  const wh = new THREE.Group(); wh.position.set(-1.2, 2.4, -1.4); scene.add(wh);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.12, 8, 40), K.lam(0x4f4e4a)); wh.add(K.inked(rim));
  const rim2 = rim.clone(); rim2.position.z = 0.7; wh.add(rim2);
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; const p = K.box(0.1, 0.75, 0.8, 0x6a6964, Math.cos(a) * 1.85, Math.sin(a) * 1.85, 0.35, wh); p.rotation.z = a + Math.PI / 2; }
  K.cyl(0.18, 0.18, 1.4, 0x3a3a38, 0, 0, 0.35, wh, 10).rotation.x = Math.PI / 2;
  // 홈통(물길) + 떨어지는 물방울 줄
  const tr = K.box(0.7, 0.3, 5, 0x55544f, -1.2, 4.75, -4.0, scene);
  const drops = []; for (let i = 0; i < 14; i++) { const d = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.08), K.flat(0xefefea)); scene.add(d); drops.push({ d, k: i / 14 }); }
  // 도랑(흐르는 줄무늬)
  const ch = new THREE.Mesh(new THREE.PlaneGeometry(3, 30), K.lam(0x4a4a47)); ch.rotation.x = -Math.PI / 2; ch.position.set(-1.2, 0.02, 4); scene.add(ch);
  const rip = []; for (let i = 0; i < 10; i++) { const r = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.06), K.flat(0xd9d9d3)); r.rotation.x = -Math.PI / 2; scene.add(r); rip.push({ r, k: i / 10, x: -1.2 + ((i * 37) % 7 - 3) * 0.3 }); }
  const moon = new THREE.Mesh(new THREE.CircleGeometry(1.8, 32), K.flat(0xfbfbf6)); moon.position.set(-9, 13, -40); scene.add(moon);
  const m = K.motes(scene, { n: 30, box: [26, 10, 12], z0: -4, size: 0.08 });
  cam.position.set(-3.5, 3.2, 10.5); cam.lookAt(-0.4, 2.3, -2);
  return (t, ph) => {
    wh.rotation.z = -ph / 2 * 1; // 한 바퀴의 1/2 → 12날개라 이음매 없음(30도 배수 아님 → 보정)
    wh.rotation.z = -(ph / (Math.PI * 2)) * (Math.PI * 2 / 12) * 2;
    drops.forEach(o => { const u = (o.k + ph / (Math.PI * 2) * 2) % 1; o.d.position.set(-1.2 + (o.k - 0.5) * 0.3, 4.55 - u * 2.2, -1.5 + (o.k % 0.3)); });
    rip.forEach(o => { const u = (o.k + ph / (Math.PI * 2)) % 1; o.r.position.set(o.x, 0.04, 0.5 + u * 8); });
    if (m && m.update) m.update(ph);
  };
}
