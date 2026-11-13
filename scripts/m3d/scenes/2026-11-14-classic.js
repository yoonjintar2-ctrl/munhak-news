// 11/14 1분 고전 — 이효석 「메밀꽃 필 무렵」: 달밤 메밀밭 사이 산길, 나귀를 끄는 허 생원과 두 동행이 걷는다
export const secs = 3;
export const opts = { bg: 0x8c8c88, fog: [0x8c8c88, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#7d7c77', line: '#7a7974', tiles: 2, repeat: 3 });
  // 산허리(비탈) + 메밀꽃(흩뿌린 흰 점, 성기게)
  const slope = new THREE.Mesh(new THREE.PlaneGeometry(80, 26), K.lam(0x6f6e69)); slope.rotation.x = -Math.PI / 2 + 0.35; slope.position.set(0, 3.5, -16); scene.add(slope);
  const fm = K.flat(0xf4f4ef); let s = 7; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 170; i++) { const f = new THREE.Mesh(new THREE.SphereGeometry(0.1 + r() * 0.08, 6, 5), fm); const z = -6 - r() * 20; f.position.set((r() - 0.5) * 60, 0.15 + Math.max(0, (-6 - z)) * 0.36 + 0.1, z); scene.add(f); }
  for (let i = 0; i < 60; i++) { const f = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), fm); f.position.set((r() - 0.5) * 40, 0.12, 3 + r() * 3); scene.add(f); }
  // 달
  const moon = new THREE.Mesh(new THREE.CircleGeometry(2.2, 32), K.flat(0xfbfbf6)); moon.position.set(-12, 18, -50); scene.add(moon);
  // 나귀
  const D = new THREE.Group(); D.position.set(-3.2, 0, 1.5); D.rotation.y = 0; scene.add(D);
  K.box(2.2, 1.0, 0.9, 0x5e5d58, 0, 1.6, 0, D);
  const legs = [[-0.8, 0.3], [0.8, 0.3], [-0.8, -0.3], [0.8, -0.3]].map(([x, z]) => { const g = new THREE.Group(); g.position.set(x, 1.2, z); D.add(g); K.cyl(0.1, 0.08, 1.2, 0x55544f, 0, -0.6, 0, g, 6); return g; });
  const dn = new THREE.Group(); dn.position.set(1.1, 1.9, 0); D.add(dn);
  const nk = K.box(0.9, 0.45, 0.4, 0x5e5d58, 0.35, 0.3, 0, dn); nk.rotation.z = 0.7;
  K.box(0.75, 0.38, 0.38, 0x6a6964, 0.85, 0.65, 0, dn);
  const ears = [-1, 1].map(sd => { const e = K.box(0.1, 0.5, 0.12, 0x4a4945, 0.6, 1.0, sd * 0.12, dn); return e; });
  K.box(1.0, 0.5, 1.0, 0x3c3c3a, -0.2, 2.25, 0, D); // 짐
  // 허 생원(나귀 앞에서 고삐), 조 선달, 동이
  const H = K.person(scene, { x: -0.9, z: 1.5, rot: -Math.PI / 2, coat: 0xd0cdc5, pants: 0xb8b5ad, hair: 'short', hairC: 0x777773, scale: 0.92 });
  const Jo = K.person(scene, { x: -6.6, z: 2.6, rot: -Math.PI / 2 + 0.2, coat: 0xc2bfb7, pants: 0xa9a69e, hair: 'short', scale: 0.9 });
  const Dg = K.person(scene, { x: -6.0, z: 0.2, rot: -Math.PI / 2 - 0.3, coat: 0xe2dfd7, pants: 0x9a978f, hair: 'short', scale: 0.95 });
  K.line([[-1.6, 2.6, 1.5], [-2.0, 2.3, 1.5]], scene);
  cam.position.set(-2.5, 3.2, 12); cam.lookAt(-2.8, 2.2, -3);
  return (t, ph) => {
    const w = ph * 2;
    legs.forEach((g, i) => { g.rotation.z = Math.sin(w + (i % 2 ? Math.PI : 0) + (i > 1 ? Math.PI / 2 : 0)) * 0.3; });
    dn.rotation.z = Math.sin(w) * 0.08; ears.forEach((e, i) => e.rotation.x = Math.sin(ph * 3 + i) * 0.25);
    D.position.y = Math.abs(Math.sin(w)) * 0.05;
    const talk = K.win(ph, 0.2, 0.75, 0.1);
    H.pose({ headYaw: -0.9 * talk, headPitch: 0.15, armL: { fwd: 0.6, elbow: 0.8 }, armR: { fwd: Math.sin(w) * 0.3 + 0.5 * talk, out: 0.2 * talk }, bob: Math.abs(Math.sin(w)) * 0.05 });
    Jo.pose({ headYaw: 0.4 * talk, armL: { fwd: Math.sin(w + 1) * 0.35 }, armR: { fwd: -Math.sin(w + 1) * 0.35 }, bob: Math.abs(Math.sin(w + 1)) * 0.05 });
    Dg.pose({ headPitch: 0.35 * K.win(ph, 0.45, 0.9, 0.12), headYaw: -0.3, armL: { fwd: -Math.sin(w + 2) * 0.35 }, armR: { fwd: Math.sin(w + 2) * 0.35 }, bob: Math.abs(Math.sin(w + 2)) * 0.05 });
  };
}
