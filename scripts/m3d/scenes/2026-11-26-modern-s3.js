// 11/26 『몽실 언니』 장면③(after 4): 자선병원(흰 벽, 십자 없는 깃발) 앞 길게 늘어선 줄. 지팡이 짚은 몽실이 목발 짚은 아버지를 옆에서 부축하며 차례를 기다린다. 깃발 펄럭임·낙엽·줄 선 사람들 고개 돌림. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d2cfc7', line: '#cbc8c0', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 2649, near: false });
  // 병원 건물
  K.box(12, 4.4, 3, 0xeeece6, 1.5, 2.2, -7, scene); K.box(12.4, 0.3, 3.3, 0x55534e, 1.5, 4.5, -7, scene);
  for (let i = 0; i < 5; i++) K.box(1.0, 1.2, 0.06, 0x6e6c66, -3 + i * 2.2, 2.9, -5.47, scene);
  K.box(1.6, 2.4, 0.06, 0x45443f, 5.0, 1.2, -5.47, scene);
  const pole = K.cyl(0.06, 0.06, 3.0, 0x45443f, 6.6, 6.1, -6.0, scene, 6);
  const flag = new THREE.Group(); flag.position.set(6.6, 7.3, -6.0); scene.add(flag); K.box(1.3, 0.8, 0.03, 0xf2f0ea, 0.65, -0.4, 0, flag);
  // 줄 선 사람들
  const line = []; for (let i = 0; i < 6; i++) { const P = K.person(scene, { x: 4.4 - i * 1.5, z: -3.8, rot: -Math.PI / 2, coat: [0x6e6c66, 0x8a8782, 0x55534e, 0x9a978f, 0x45443f, 0x6e6c66][i], hair: ['kerchief', 'fedora', 'short', 'bun', 'cap', 'bald'][i], outfit: ['apron', 'longcoat', 'coat', 'jeogori', 'vest', 'durumagi'][i], skirt: i === 0 || i === 3 ? 'long' : null, scale: 0.85, seed: 2670 + i }); line.push({ P, k: i }); }
  // 아버지(목발) + 몽실
  const F = K.person(scene, { x: -2.0, z: -1.2, rot: -Math.PI / 2 + 0.45, coat: 0x55534e, pants: 0x3a3936, outfit: 'durumagi', hair: 'short', beard: 'mustache', eyes: 'closed', brows: 'worried', mouth: 'frown', seed: 2675 });
  const crutch = K.cyl(0.05, 0.05, 2.0, 0x45443f, 0, 0, 0); F.hold('L', crutch, { at: [0, -0.7, 0] });
  const M = K.person(scene, { x: -0.9, z: -0.7, rot: -Math.PI / 2 + 0.9, coat: 0xeeece6, outfit: 'jeogori', skirt: 'long', skirtC: 0x45443f, hair: 'bob', eyes: 'oval', brows: 'worried', mouth: 'line', scale: 0.85, seed: 2676 });
  const stick = K.cyl(0.04, 0.04, 1.7, 0x45443f, 0, 0, 0); M.hold('R', stick, { at: [0, -0.55, 0] });
  // 낙엽
  const leaves = []; for (let i = 0; i < 12; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.14), new THREE.MeshLambertMaterial({ color: 0x55534e, side: THREE.DoubleSide })); scene.add(m); leaves.push({ m, k: i / 12 }); }
  const tr = new THREE.Group(); tr.position.set(-5.5, 0, -4); scene.add(tr); K.cyl(0.2, 0.3, 3.4, 0x45443f, 0, 1.7, 0, tr, 8); const cr = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.4, 12, 10), K.lam(0x8a8782)), 70); cr.position.y = 3.8; tr.add(cr);
  cam.position.set(0.4, 2.6, 6.4); cam.lookAt(-0.4, 1.5, -2.2);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), s = Math.sin(ph);
    F.pose({ lean: -0.1, headPitch: -0.2, armL: { fwd: 0.2, elbow: 0.2, out: 0.15 }, armR: { fwd: 0.6, elbow: 0.6, out: -0.2 } });
    M.pose({ headYaw: -0.4 + 0.15 * s, headPitch: 0.15, armL: { fwd: 0.9, elbow: 0.6, out: -0.15 }, armR: { fwd: 0.3, elbow: 0.2 } });
    line.forEach(o => o.P.pose({ headYaw: 0.4 * Math.sin(ph + o.k), bob: 0.02 * Math.sin(ph * 2 + o.k) }));
    flag.rotation.y = 0.3 * Math.sin(ph * 3); flag.children[0].rotation.y = 0.15 * Math.sin(ph * 6);
    leaves.forEach(o => { const v = (o.k + u) % 1; o.m.position.set(-5.5 + v * 4 + 0.3 * Math.sin(ph * 2 + o.k * 9), 4.0 - v * 4, -3.5 + o.k * 2); o.m.rotation.set(ph * 2 + o.k * 5, ph + o.k, 0); });
  };
}
