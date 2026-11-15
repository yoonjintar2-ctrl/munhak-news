// 11/16 오늘의 시 「봄은 고양이로다」: 봄볕 드는 툇마루에 고양이가 웅크려 꼬리를 살랑이고 고개를 갸웃, 수염이 떨린다. 마당 꽃나무 아래 나비 두 마리가 맴돌고 꽃잎이 날린다
export const secs = 3;
export const opts = { bg: 0xf0eee8, fog: [0xebe9e3, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dedbd2', line: '#d0cdc4', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 77 });
  // 한옥 툇마루(앞) + 기둥 + 처마 + 미닫이(창살 성기게)
  K.box(9, 0.3, 2.6, 0x8d8a82, -1.5, 1.0, -0.4, scene); [-5.6, 2.6].forEach(x => K.box(0.4, 1.0, 0.4, 0x5c5a55, x, 0.5, 0.7, scene));
  K.box(9.4, 0.12, 0.1, 0x5c5a55, -1.5, 1.16, 0.92, scene);
  [-5.6, -1.5, 2.6].forEach(x => K.box(0.35, 4.4, 0.35, 0x5c5a55, x, 3.3, -1.6, scene));
  K.box(10.5, 0.35, 3.4, 0x4d4b47, -1.5, 5.6, -0.6, scene);
  K.box(8.2, 3.6, 0.15, 0xeceae2, -1.5, 3.0, -1.75, scene);
  [-4.4, -2.9, -0.1, 1.4].forEach(x => K.box(0.08, 3.6, 0.2, 0x6a6862, x, 3.0, -1.7, scene)); [2.0, 3.6].forEach(y => K.box(8.2, 0.08, 0.2, 0x6a6862, -1.5, y, -1.7, scene));
  // 고무신 한 켤레, 장독 둘
  K.box(0.35, 0.18, 0.8, 0x2f2f2c, -3.0, 0.1, 1.6, scene); K.box(0.35, 0.18, 0.8, 0x2f2f2c, -2.5, 0.1, 1.7, scene);
  [[6.5, -2.5, 0.9], [7.6, -2.0, 0.7]].forEach(([x, z, s]) => { const j = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.8 * s, 14, 10), K.lam(0x4a4844)), 50); j.scale.y = 1.15; j.position.set(x, 0.85 * s, z); scene.add(j); K.cyl(0.55 * s, 0.6 * s, 0.15, 0x3a3936, x, 1.75 * s, z, scene, 14); });
  // 꽃나무(오른쪽)
  K.cyl(0.18, 0.28, 3.0, 0x4a4945, 5.4, 1.5, -2.6, scene, 8);
  [[5.0, 3.6, 0.3], [6.0, 3.9, 0.5], [5.5, 4.4, 0.4], [4.6, 4.1, 0.8]].forEach(([x, y, z]) => { const c = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.85, 12, 9), K.lam(0xe8e4dc)), 70); c.position.set(x, y, z - 3.2); c.scale.setScalar(0.7); scene.add(c); });
  const pet = []; for (let i = 0; i < 8; i++) { const p = new THREE.Mesh(new THREE.CircleGeometry(0.09, 5), new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide })); scene.add(p); pet.push({ p, k: i / 8, x: 4.4 + (i % 4) * 0.5 }); }
  // 고양이(툇마루 위, 몸은 화면 오른쪽을 향해 웅크림, 얼굴은 비스듬히 앞)
  const cat = new THREE.Group(); cat.position.set(-0.6, 1.15, 0.2); scene.add(cat);
  const furC = 0x55534e;
  const body = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.75, 18, 12), K.lam(furC)), 60); body.scale.set(1.35, 0.75, 0.85); body.position.y = 0.5; cat.add(body);
  const head = new THREE.Group(); head.position.set(0.95, 0.95, 0.15); cat.add(head);
  const hm = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), K.lam(furC)), 60); hm.scale.set(1, 0.9, 0.95); head.add(hm);
  [-1, 1].forEach(sd => { const e = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.32, 4), K.lam(furC)), 30); e.position.set(0.02, 0.38, sd * 0.2); e.rotation.x = sd * 0.25; head.add(e);
    const ey = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 8), K.flat(0xf3efd6)); ey.position.set(0.3, 0.07, sd * 0.17); head.add(ey);
    const pu = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), K.flat(0x111111)); pu.position.set(0.37, 0.07, sd * 0.17); head.add(pu); });
  const mz = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), K.lam(0xe6e2d8)); mz.scale.set(0.8, 0.7, 1.1); mz.position.set(0.33, -0.1, 0); head.add(mz);
  const wh = new THREE.Group(); wh.position.set(0.42, -0.08, 0); head.add(wh);
  [-1, 1].forEach(sd => [-0.08, 0.04].forEach(dy => K.line([[0, 0, sd * 0.06], [0.1, dy, sd * 0.5]], wh)));
  [-0.45, 0.45].forEach(x => { const paw = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), K.lam(0xe6e2d8)), 40); paw.scale.set(1.4, 0.7, 1); paw.position.set(0.75 + x * 0.3, 0.1, x * 0.6); cat.add(paw); });
  const tail = []; let par = cat; for (let i = 0; i < 6; i++) { const g = new THREE.Group(); g.position.set(i === 0 ? -0.95 : -0.28, i === 0 ? 0.35 : 0, 0); par.add(g); K.cyl(0.08, 0.09, 0.3, furC, -0.14, 0, 0, g, 8).rotation.z = Math.PI / 2; tail.push(g); par = g; }
  // 나비 두 마리
  const bf = [0, 1].map(i => { const g = new THREE.Group(); scene.add(g); const w = [-1, 1].map(sd => { const p = new THREE.Group(); g.add(p); const m = new THREE.Mesh(new THREE.CircleGeometry(0.13, 12), new THREE.MeshLambertMaterial({ color: i ? 0x3a3a38 : 0x77756f, side: THREE.DoubleSide })); m.position.x = sd * 0.12; p.add(m); return p; }); return { g, w }; });
  cam.position.set(0.9, 2.5, 5.4); cam.lookAt(0.1, 1.7, -0.4);
  return (t, ph) => {
    tail.forEach((g, i) => { g.rotation.y = 0.35 * Math.sin(ph * 2 - i * 0.6); g.rotation.z = i === 0 ? -0.35 : -0.12; });
    head.rotation.x = 0.22 * Math.sin(ph); head.rotation.y = -0.25 + 0.2 * Math.sin(ph + 1);
    wh.rotation.x = 0.06 * Math.sin(ph * 6); body.scale.y = 0.75 + 0.02 * Math.sin(ph * 2);
    bf.forEach((b, i) => { const a = ph + i * Math.PI; b.g.position.set(2.4 + 1.0 * Math.cos(a), 2.4 + 0.4 * Math.sin(a * 2), 1.6 + 0.6 * Math.sin(a)); b.g.rotation.y = -a; const f = 0.9 * Math.sin(ph * 10 + i); b.w[0].rotation.y = f; b.w[1].rotation.y = -f; });
    pet.forEach(o => { const u = (o.k + ph / (Math.PI * 2)) % 1; o.p.position.set(o.x - 1.4 - u * 2.2, 3.6 - u * 3.5, -1.2 + u * 2.5); o.p.rotation.set(u * 8, u * 5, 0); });
  };
}
