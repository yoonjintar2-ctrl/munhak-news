// 11/16 1분 현대문학 장면③ 엄마의 목소리: 눈 덮인 소나무가 서 있는 집 마당, 쪽진 머리 여인(엄마)의 뒷모습이 소나무를 올려다보다 천천히 고개를 돌린다. 눈발이 흩날리고 솔가지 눈이 털썩 떨어진다
export const secs = 3;
export const opts = { bg: 0xeeede9, fog: [0xeae9e5, 36, 120] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#e8e7e2', line: '#dddcd6', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 92 });
  // 집(뒤, 대문과 담) — 지붕에 눈
  K.box(9, 3.6, 3, 0xcfccc4, 1.0, 1.8, -7.0, scene); K.box(9.6, 0.5, 3.6, 0xf2f1ed, 1.0, 3.85, -7.0, scene);
  K.box(1.4, 2.4, 0.1, 0x4a4945, -0.6, 1.2, -5.45, scene); K.box(1.6, 1.0, 0.1, 0x6a6862, 3.2, 2.2, -5.45, scene);
  K.box(16, 1.6, 0.4, 0xd2cfc6, 1, 0.8, -3.0, scene); K.box(16.2, 0.25, 0.6, 0xf2f1ed, 1, 1.7, -3.0, scene);
  // 소나무 둘(가지 층 + 눈 덮개)
  const pines = [[-3.4, -1.6, 1.2], [4.8, -2.2, 0.9]].map(([x, z, s]) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s); scene.add(g); K.cyl(0.22, 0.32, 3.6, 0x3a3936, 0, 1.8, 0, g, 8);
    const tiers = []; [[2.4, 1.9], [3.4, 1.5], [4.3, 1.1], [5.1, 0.7]].forEach(([y, r]) => { const t = K.inked(new THREE.Mesh(new THREE.ConeGeometry(r, 1.1, 9), K.lam(0x4a4945)), 40); t.position.y = y; g.add(t); const sn = new THREE.Mesh(new THREE.ConeGeometry(r * 0.85, 0.5, 9), K.lam(0xf6f5f1)); sn.position.y = y + 0.32; g.add(sn); tiers.push(t); }); return { g, tiers }; });
  // 떨어지는 눈 덩이
  const clump = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 6), K.lam(0xf6f5f1)), 40); scene.add(clump);
  // 장독 셋(눈 모자), 빗자루
  [[6.2, 0.4], [7.0, 0.7], [6.6, -0.3]].forEach(([x, z], i) => { const j = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.55 - i * 0.08, 12, 9), K.lam(0x4a4844)), 40); j.scale.y = 1.15; j.position.set(x, 0.6, z); scene.add(j); const c = new THREE.Mesh(new THREE.SphereGeometry(0.4 - i * 0.06, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0xf6f5f1)); c.position.set(x, 1.15 - i * 0.08, z); scene.add(c); });
  const broom = K.cyl(0.04, 0.04, 2.2, 0x5a5955, -6.0, 1.1, -2.6, scene, 5); broom.rotation.z = 0.25;
  // 엄마(뒷모습) — 쪽진 머리, 밝은 옷
  const M = K.person(scene, { x: -0.4, z: 1.2, rot: 0.45, coat: 0x8f8c85, pants: 0x4a4946, hair: 'bun', scale: 0.92, scarf: 0x3a3936 });
  const sn = []; for (let i = 0; i < 55; i++) { const f = new THREE.Mesh(new THREE.SphereGeometry(0.05, 5, 4), K.flat(0xffffff)); scene.add(f); sn.push({ f, k: (i * 0.371) % 1, x: -9 + (i * 47 % 180) / 10, z: -4 + (i * 29 % 80) / 10 }); }
  // 눈 위 발자국(뒤로 이어짐)
  for (let i = 0; i < 5; i++) { const fp = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.4), K.flat(0xbdbcb6)); fp.rotation.x = -Math.PI / 2; fp.position.set(0.0 + (i % 2) * 0.35 + i * 0.25, 0.02, 2.4 + i * 0.8); scene.add(fp); }
  cam.position.set(1.4, 3.4, 9.6); cam.lookAt(-0.4, 2.4, -1.6);
  return (t, ph) => {
    const u = (ph / (Math.PI * 2)) % 1;
    sn.forEach(o => { const v = (o.k + u) % 1; o.f.position.set(o.x + 0.4 * Math.sin(v * 6 + o.k * 7), 7 - v * 7, o.z); });
    pines.forEach((p, i) => p.tiers.forEach((t, j) => t.rotation.z = 0.03 * Math.sin(ph * 2 + i + j)));
    const c = Math.min(1, Math.max(0, (u - 0.45) / 0.3)); clump.visible = u > 0.45 && u < 0.78; clump.position.set(-2.4, 4.6 - 4.4 * c * c, -1.4);
    const turn = K.win(ph, 0.55, 0.95, 0.12);
    M.pose({ headPitch: 0.35 * (1 - turn) + 0.05, headYaw: -0.9 * turn, torsoYaw: -0.25 * turn, armL: { fwd: 0.4, elbow: 1.4 }, armR: { fwd: 0.4, elbow: 1.4 } });
  };
}
