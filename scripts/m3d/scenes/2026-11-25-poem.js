// 11/25 오늘의 시 김영랑 「오매 단풍 들것네」: 가을 남도 시골집, 장독대(돌 단 위 크고 작은 독들) 위로 감나무 잎이 날아들고, 장독 곁의 누이(긴 머리·치마)가 놀란 듯 고개를 들어 감나무를 올려다보며 손을 든다. 곁의 오빠는 누이를 바라본다. 감잎이 흩날리고 가지가 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3cb', line: '#cfccc4', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2512, near: false });
  // 초가 담장과 집채
  K.box(14, 1.6, 0.5, 0xbcb9b1, 0, 0.8, -6, scene); const capw = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 14, 10, 1, false, 0, Math.PI), K.lam(0x8a8782)), 30); capw.rotation.z = Math.PI / 2; capw.position.set(0, 1.6, -6); scene.add(capw);
  K.box(5, 2.6, 2.6, 0xe2dfd7, 4.2, 1.3, -4.6, scene); const roof = K.inked(new THREE.Mesh(new THREE.SphereGeometry(3.2, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x9a978f)), 40); roof.scale.set(1.0, 0.45, 0.65); roof.position.set(4.2, 2.6, -4.6); scene.add(roof);
  K.box(0.9, 1.6, 0.06, 0x55534e, 3.4, 0.8, -3.28, scene);
  // 장독대: 돌 단 + 독 여러 개
  K.box(4.4, 0.4, 2.2, 0xaeaba3, -2.2, 0.2, -2.6, scene);
  [[-3.6, -2.9, 0.62, 1.1], [-2.5, -3.1, 0.7, 1.25], [-1.3, -2.9, 0.55, 0.95], [-3.0, -2.0, 0.42, 0.7], [-1.9, -1.9, 0.48, 0.8], [-0.8, -2.1, 0.36, 0.6]].forEach(([x, z, r, h], i) => {
    const j = K.inked(new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), K.lam(i % 2 ? 0x55534e : 0x45443f)), 40); j.scale.set(1, h / r * 0.62, 1); j.position.set(x, 0.4 + h * 0.5, z); scene.add(j);
    K.cyl(r * 0.6, r * 0.62, 0.1, 0x3a3936, x, 0.4 + h * 0.98, z, scene, 14); K.cyl(r * 0.66, r * 0.5, 0.12, 0x6e6c66, x, 0.4 + h * 1.06, z, scene, 14);
  });
  // 감나무: 줄기 + 가지 + 잎 뭉치 + 감
  const tree = new THREE.Group(); tree.position.set(-5.2, 0, -4.2); scene.add(tree);
  K.cyl(0.25, 0.4, 4.2, 0x45443f, 0, 2.1, 0, tree, 10);
  const crown = new THREE.Group(); crown.position.y = 4.4; tree.add(crown);
  [[0, 0, 0, 1.9], [1.4, -0.3, 0.4, 1.4], [-1.2, -0.2, -0.3, 1.3], [0.3, 0.9, -0.4, 1.3]].forEach(([x, y, z, r]) => { const m = K.inked(new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), K.lam(0x8a8782)), 70); m.position.set(x, y, z); crown.add(m); });
  for (let i = 0; i < 9; i++) { const p = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), K.lam(0x3a3936)); p.position.set(Math.cos(i * 2.1) * 1.8, -0.6 + (i % 3) * 0.5, 1.2 + Math.sin(i) * 0.4); crown.add(p); }
  // 누이: 긴 머리, 치마
  const S = K.person(scene, { x: -0.6, z: -0.9, rot: 2.6, coat: 0xd8d5cd, pants: 0x55534e, hair: 'bun', scale: 0.88 });
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.7, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x55534e, side: THREE.DoubleSide })), 40); sk.position.y = 0.95; S.root.add(sk);
  // 오빠
  const B = K.person(scene, { x: 1.4, z: -0.4, rot: -2.4, coat: 0x55534e, pants: 0x3a3936, hair: 'short', scale: 1.0 });
  // 흩날리는 감잎
  const leaves = []; for (let i = 0; i < 22; i++) { const g = new THREE.PlaneGeometry(0.28, 0.18); const m = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ color: [0x45443f, 0x6e6c66, 0x55534e][i % 3], side: THREE.DoubleSide })); scene.add(m); leaves.push({ m, k: i / 22, z: -3.5 + (i * 0.41) % 3.5, y0: 4.4 + (i % 4) * 0.4 }); }
  cam.position.set(0.2, 2.8, 8.4); cam.lookAt(-0.6, 1.8, -2.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), up = K.win(ph, 0.15, 0.75, 0.12);
    S.pose({ headPitch: 0.35 + 0.25 * up, headYaw: -0.5, armR: { fwd: 0.4 + 1.9 * up, elbow: 0.3, out: 0.55 * up }, armL: { fwd: 0.3, elbow: 0.5 } });
    B.pose({ headYaw: -0.4 + 0.25 * Math.sin(ph), headPitch: 0.05 + 0.25 * up, armL: { fwd: 0.2, elbow: 0.3 }, armR: { fwd: 0.2, elbow: 0.3 } });
    crown.rotation.z = 0.04 * Math.sin(ph * 2); crown.position.x = 0.08 * Math.sin(ph * 2);
    leaves.forEach(o => { const v = (o.k + u) % 1; o.m.position.set(-4.6 + v * 6.5, o.y0 - v * 3.6 + 0.3 * Math.sin(ph * 3 + o.k * 9), o.z); o.m.rotation.set(ph * 2 + o.k * 7, ph * 3 + o.k * 4, o.k * 5); });
  };
}
