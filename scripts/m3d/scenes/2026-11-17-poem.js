// 11/17 오늘의 시 「지난날의 여인들의 발라드」: 눈 내리는 강가, 긴 망토의 여인이 고개를 들어 떨어지는 눈을 손바닥으로 받는다. 강 건너 옛 성탑, 버드나무 가지가 흔들리고 강물 잔물결이 흐른다
export const secs = 3;
export const opts = { bg: 0xf0eee9, fog: [0xebe9e4, 35, 130] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#e4e2dc', line: '#dad8d2', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'shore', seed: 23 });
  const water = new THREE.Mesh(new THREE.PlaneGeometry(80, 8), K.lam(0xa3a19b)); water.rotation.x = -Math.PI / 2; water.position.set(0, 0.03, -9); scene.add(water);
  const rip = []; for (let i = 0; i < 10; i++) { const r = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.05), K.flat(0xf0efea)); r.rotation.x = -Math.PI / 2; scene.add(r); rip.push({ r, k: i / 10, z: -12 + (i % 4) * 1.8 }); }
  // 강 건너 성탑과 성벽
  K.cyl(1.4, 1.6, 8, 0x8a8882, -9, 4, -18, scene, 12); const cone = K.inked(new THREE.Mesh(new THREE.ConeGeometry(1.8, 2.6, 12), K.lam(0x4a4945)), 30); cone.position.set(-9, 9.3, -18); scene.add(cone);
  K.box(14, 3.2, 1.2, 0x9a9892, -1, 1.6, -18, scene); for (let i = 0; i < 9; i++) K.box(0.8, 0.7, 1.2, 0x9a9892, -7.4 + i * 1.6, 3.55, -18, scene);
  // 버드나무
  K.cyl(0.3, 0.45, 5, 0x4a4945, 5.6, 2.5, -5, scene, 8); const wl = []; for (let i = 0; i < 8; i++) { const g = new THREE.Group(); g.position.set(4.6 + i * 0.3, 5.0, -5 + (i % 3) * 0.3); scene.add(g); K.cyl(0.03, 0.02, 3.0, 0x6a6964, 0, -1.5, 0, g, 4); wl.push(g); }
  // 강가 돌·쪽배
  K.box(3.0, 0.4, 1.0, 0x55534e, 2.8, 0.2, -6.6, scene);
  [[-4.5, -3.8], [-3.6, -4.4]].forEach(([x, z]) => { const r = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6), K.lam(0x6a6964)), 40); r.scale.y = 0.5; r.position.set(x, 0.2, z); scene.add(r); });
  // 여인(긴 머리, 긴 망토 느낌의 진한 옷) — 강을 바라보다 고개 들어 눈을 받음
  const W = K.person(scene, { x: -0.6, z: -2.8, rot: -1.9, coat: 0x3e3d3a, pants: 0x2a2a28, hair: 'long', scale: 1.0, scarf: 0xe8e6e0 });
  const cloak = K.inked(new THREE.Mesh(new THREE.ConeGeometry(1.1, 2.6, 14, 1, true), new THREE.MeshLambertMaterial({ color: 0x3e3d3a, side: THREE.DoubleSide })), 40); cloak.position.y = 1.3; W.root.add(cloak);
  // 눈송이(위에서 아래로, 한 바퀴에 정확히 한 높이만큼 → 이음매 없음)
  const N = 70, pos = new Float32Array(N * 3), base = []; for (let i = 0; i < N; i++) base.push([(Math.random() - 0.5) * 22, Math.random() * 12, -10 + Math.random() * 13, Math.random() * 6.28]);
  const snow = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.16 })); scene.add(snow);
  cam.position.set(1.8, 3.6, 6.4); cam.lookAt(-0.4, 2.4, -3.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    base.forEach((b, i) => { pos[i * 3] = b[0] + 0.3 * Math.sin(ph + b[3]); pos[i * 3 + 1] = ((b[1] - u * 12) % 12 + 12) % 12; pos[i * 3 + 2] = b[2]; }); snow.geometry.attributes.position.needsUpdate = true;
    rip.forEach(o => { const v = (o.k + u) % 1; o.r.position.set(-20 + v * 40, 0.05, o.z); });
    wl.forEach((g, i) => { g.rotation.z = 0.1 * Math.sin(ph + i * 0.7); g.rotation.x = 0.05 * Math.sin(ph * 2 + i); });
    const up = K.win(ph, 0.25, 0.85, 0.15);
    W.pose({ headYaw: 0.2 - 0.2 * up, headPitch: -0.1 + 0.55 * up, torsoYaw: 0.1, armR: { fwd: 1.0 + 0.4 * up, out: 0.15, elbow: 0.9 }, armL: { fwd: 0.2 + 0.2 * up, elbow: 0.4 } });
  };
}
