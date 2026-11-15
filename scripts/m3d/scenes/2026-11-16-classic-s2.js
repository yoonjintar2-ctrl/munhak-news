// 11/16 1분 고전 장면② 소나기와 원두막: 비 쏟아지는 밭가 원두막, 소년이 수숫단을 안아 날라 덧세우고(왼쪽 수수밭→원두막 오른쪽, 오가는 걸음, 몸은 걷는 쪽을 향함), 원두막 안 소녀가 웅크려 소년을 바라본다. 빗줄기가 내리고 수수가 흔들린다
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xd8d6d0, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfccc2', line: '#c2bfb5', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 88 });
  // 원두막: 기둥 넷, 마루, 초가 지붕
  const hx = 1.6, hz = -2.4;
  [[-1.4, -1.2], [1.4, -1.2], [-1.4, 1.2], [1.4, 1.2]].forEach(([x, z]) => K.cyl(0.12, 0.14, 4.6, 0x4a4945, hx + x, 2.3, hz + z, scene, 8));
  K.box(3.2, 0.2, 2.8, 0x6a6862, hx, 1.6, hz, scene);
  const rf = K.inked(new THREE.Mesh(new THREE.ConeGeometry(2.7, 1.6, 4), K.lam(0x77756e)), 30); rf.rotation.y = Math.PI / 4; rf.position.set(hx, 5.3, hz); scene.add(rf);
  K.box(0.15, 1.2, 0.15, 0x4a4945, hx - 2.2, 0.6, hz + 1.6, scene); // 사다리 기둥
  // 덧세운 수숫단(원두막 앞쪽에 이미 둘)
  const sheaf = (x, z, r = 0) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.z = r; scene.add(g); K.cyl(0.35, 0.25, 2.4, 0xb6b2a8, 0, 1.2, 0, g, 10); const top = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.9, 8), K.lam(0x6f6c65)), 30); top.position.y = 2.7; g.add(top); return g; };
  sheaf(hx + 1.6, hz + 1.5, -0.25); sheaf(hx + 1.0, hz + 1.7, -0.2);
  // 수수밭(왼쪽 뒤) — 흔들림
  const sor = []; for (let i = 0; i < 18; i++) { const g = new THREE.Group(); g.position.set(-7.5 + (i % 6) * 0.8, 0, -3.8 - Math.floor(i / 6) * 0.9); scene.add(g); K.cyl(0.04, 0.05, 2.8, 0x5c5a55, 0, 1.4, 0, g, 5); const h = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), K.lam(0x4a4844)), 30); h.scale.y = 1.6; h.position.y = 2.9; g.add(h); sor.push({ g, k: i * 0.5 }); }
  // 소녀(원두막 마루 위, 웅크림)
  const G = K.person(scene, { x: hx - 0.3, z: hz + 0.2, rot: -Math.PI / 2 - 0.5, coat: 0xa19e96, pants: 0x3e3d3a, hair: 'long', scale: 0.72 });
  G.root.position.y = 1.7;
  // 소년(수숫단을 안고 오감)
  const B = K.person(scene, { x: 0, z: 0, rot: 0, coat: 0x3c3b38, pants: 0x55534e, hair: 'short', scale: 0.82 });
  const carried = new THREE.Group(); scene.add(carried); K.cyl(0.32, 0.22, 2.2, 0xb6b2a8, 0, 0, 0, carried, 10); const ct = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.8, 8), K.lam(0x6f6c65)), 30); ct.position.y = 1.45; carried.add(ct);
  // 빗줄기
  const rain = []; for (let i = 0; i < 60; i++) { const d = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.45, 0.018), K.flat(0xa3a19b)); scene.add(d); rain.push({ d, k: (i * 0.618) % 1, x: -9 + (i * 37 % 180) / 10, z: -6 + (i * 53 % 90) / 10 }); }
  cam.position.set(-1.0, 3.6, 8.4); cam.lookAt(0.0, 2.2, -2.0);
  return (t, ph) => {
    const u = (ph / (Math.PI * 2)) % 1;
    rain.forEach(o => { const v = (o.k + u * 3) % 1; o.d.position.set(o.x - v * 0.4, 8 - v * 8, o.z); });
    sor.forEach(o => { o.g.rotation.z = 0.12 * Math.sin(ph * 2 + o.k); });
    // 0→0.5: 왼쪽(-4)에서 원두막 쪽(+0.6)으로 수숫단을 안고 감, 0.5→1: 빈손으로 돌아감
    const go = u < 0.5; const f = go ? u / 0.5 : (u - 0.5) / 0.5; const e = f * f * (3 - 2 * f);
    const x = go ? -4 + 4.6 * e : 0.6 - 4.6 * e;
    B.root.position.set(x, 0.06 * Math.abs(Math.sin(ph * 8)), -0.2); B.root.rotation.y = go ? -Math.PI / 2 : Math.PI / 2;
    B.pose({ lean: go ? -0.12 : -0.05, headPitch: -0.1, headYaw: go ? 0.25 : -0.3, armL: { fwd: go ? 1.3 : 0.25 * Math.sin(ph * 8), elbow: go ? 1.4 : 0.3 }, armR: { fwd: go ? 1.3 : -0.25 * Math.sin(ph * 8), elbow: go ? 1.4 : 0.3 } });
    carried.visible = go; carried.position.set(x + 0.75, 2.4, -0.2); carried.rotation.z = -0.15;
    G.pose({ bob: 1.72, lean: -0.1, headYaw: -0.5 + 0.6 * (1 - e), headPitch: -0.1, armL: { fwd: 0.9, elbow: 1.8 }, armR: { fwd: 0.9, elbow: 1.8 } });
  };
}
