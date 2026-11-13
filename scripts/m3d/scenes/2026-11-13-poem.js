// 11/13 오늘의 시 — 윤한로 「분교마을의 봄」: 산 너머 고운 바람이 불어오는 분교 마당, 사택 울타리의 꽃, 먼 산과 뻐꾸기, 튼 손을 호호 부는 아이
export const secs = 3;
export const opts = { bg: 0xbdbdb8, fog: [0xb8b8b3, 30, 95] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#b3b3ad', line: '#adada7', tiles: 2, repeat: 4 });
  // 먼 산 겹겹(산 너머 너머)
  const hill = (x, z, r, h, c) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(c)); m.scale.y = h / r; m.position.set(x, 0, z); scene.add(m); };
  hill(-24, -60, 26, 11, 0x9d9d99); hill(10, -66, 30, 13, 0xa5a5a1); hill(34, -56, 20, 8, 0x989894);
  hill(-8, -42, 18, 6, 0x8c8c88); hill(20, -40, 14, 5, 0x91918d);
  // 분교 건물: 낮은 단층 교사 + 박공지붕 + 창
  const sch = new THREE.Group(); sch.position.set(-7.5, 0, -9); sch.rotation.y = 0.32; scene.add(sch);
  K.box(11, 3.4, 4, 0xd6d6d0, 0, 1.7, 0, sch);
  const roof = (s) => { const m = K.box(11.6, 0.25, 2.7, 0x4a4a46, 0, 3.95, s * 1.05, sch); m.rotation.x = s * 0.48; };
  roof(1); roof(-1);
  for (let i = 0; i < 4; i++) K.box(1.6, 1.3, 0.1, 0x6c6c68, -3.9 + i * 2.6, 2.0, 2.02, sch);
  K.box(1.3, 2.4, 0.1, 0x55554f, 4.6, 1.2, 2.02, sch);
  // 국기 게양대
  K.cyl(0.07, 0.09, 7, 0x7a7a76, -1.2, 3.5, -3.5, scene, 8);
  const flag = K.box(1.3, 0.85, 0.04, 0xf0f0ea, -0.55, 6.4, -3.5, scene);
  // 사택 울타리(오른쪽) + 울타리를 덮은 꽃
  const fence = new THREE.Group(); fence.position.set(6.5, 0, -2.5); fence.rotation.y = -0.5; scene.add(fence);
  for (let i = 0; i < 11; i++) K.box(0.16, 1.5, 0.16, 0x6a6a64, -5 + i, 0.75, 0, fence);
  K.box(10.4, 0.12, 0.1, 0x6a6a64, 0, 1.2, 0, fence); K.box(10.4, 0.12, 0.1, 0x6a6a64, 0, 0.5, 0, fence);
  const blooms = [];
  for (let i = 0; i < 26; i++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.2 + (i % 3) * 0.05, 10, 8), K.lam(0xeeeee6)); m.position.set(-5 + (i * 0.41) % 10.2, 1.0 + ((i * 7) % 5) * 0.18, 0.12); fence.add(m); blooms.push(m); }
  K.box(4, 2.6, 3, 0xc8c8c2, 2.5, 1.3, -2.2, fence); // 사택 지붕 아래 몸채
  const sr = K.box(4.6, 0.22, 3.6, 0x4a4a46, 2.5, 2.75, -2.2, fence); sr.rotation.z = 0.05;
  // 아이: 먼 산 쪽을 보며 튼 손을 입가에 모아 호호 분다
  const P = K.person(scene, { x: 2.0, z: 3.4, rot: 0.15, coat: 0xd2cfc6, pants: 0x4e4e48, hair: 'short', hairC: 0x2a2a2a, scale: 0.72 });
  // 뻐꾸기: 먼 산 위를 한 바퀴
  const B = K.bird(scene, { cx: 4, cy: 14, cz: -34, rx: 12, rz: 3, s: 1.3 });
  // 체로 친 듯 고운 바람: 작은 티끌이 오른쪽에서 왼쪽으로 한 바퀴에 한 번 흘러간다
  const n = 60, pos = new Float32Array(n * 3), sd = [];
  for (let i = 0; i < n; i++) sd.push([Math.random(), 1 + Math.random() * 9, -14 + Math.random() * 18, Math.random() * 6.28]);
  const pts = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.16, transparent: true, opacity: 0.9 }));
  scene.add(pts);
  cam.position.set(1.5, 3.4, 14); cam.lookAt(0.5, 3.6, -8);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    for (let i = 0; i < n; i++) { const [o, y, z, s] = sd[i]; const v = (u + o) % 1; pos[i * 3] = 16 - v * 32; pos[i * 3 + 1] = y + Math.sin(ph * 2 + s) * 0.5; pos[i * 3 + 2] = z; }
    pts.geometry.attributes.position.needsUpdate = true;
    B.update(ph);
    flag.rotation.y = Math.sin(ph * 3) * 0.25;
    blooms.forEach((m, i) => { m.position.y += Math.sin(ph * 2 + i) * 0.002; m.scale.setScalar(1 + 0.08 * Math.sin(ph * 2 + i)); });
    const blow = K.win(ph, 0.1, 0.55, 0.12);
    P.pose({ headPitch: 0.18 - 0.2 * blow, headYaw: -0.15 + 0.1 * Math.sin(ph), torsoYaw: 0.04 * Math.sin(ph),
      armL: { fwd: 0.6 + 1.5 * blow, out: -0.15 - 0.15 * blow, elbow: -1.0 - 1.1 * blow }, armR: { fwd: 0.6 + 1.5 * blow, out: -0.15 - 0.15 * blow, elbow: -1.0 - 1.1 * blow },
      bob: Math.sin(ph * 2) * 0.01 });
  };
}
