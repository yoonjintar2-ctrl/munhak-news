// 11/13 오늘의 소설 구절 — 피츠제럴드 『위대한 개츠비』: 밤 부두 끝에서 건너편 작은 불빛을 향해 손을 뻗는 사람
export const secs = 3;
export const opts = { bg: 0x9c9c98, fog: [0xa2a29e, 25, 95] };
export default function (K) {
  const { THREE, scene, cam } = K;
  // 물: 넓은 판 + 잔물결 띠(천천히 위아래로)
  const water = new THREE.Mesh(new THREE.PlaneGeometry(240, 240), K.lam(0x6c6c69)); water.rotation.x = -Math.PI / 2; scene.add(water);
  const waves = []; for (let i = 0; i < 26; i++) { const w = new THREE.Mesh(new THREE.BoxGeometry(2 + (i % 4) * 1.2, 0.02, 0.06), K.flat(0xd8d8d2)); w.position.set(((i * 37) % 36) - 18, 0.03, -2 - ((i * 13) % 40)); scene.add(w); waves.push({ w, x: w.position.x, s: i * 0.7 }); }
  // 달빛 기둥(물에 비친 길)
  const glint = []; for (let i = 0; i < 14; i++) { const g = new THREE.Mesh(new THREE.BoxGeometry(0.9 + Math.random() * 0.8, 0.02, 0.12), K.flat(0xf2f2ee)); g.position.set(-7 + (Math.random() - 0.5) * 1.6, 0.04, -6 - i * 2.4); scene.add(g); glint.push(g); }
  const moon = new THREE.Mesh(new THREE.CircleGeometry(1.6, 32), K.flat(0xf6f5f0)); moon.position.set(-2, 15, -60); scene.add(moon);
  // 건너편 숲 띠와 먼 부두, 작은 불빛
  K.box(120, 3.2, 3, 0x575754, 0, 1.6, -48, scene);
  [-30, -18, -9, 2, 14, 26].forEach((x, i) => { const t = new THREE.Mesh(new THREE.SphereGeometry(3 + (i % 3), 12, 8), K.lam(0x4f4f4c)); t.position.set(x, 3.5, -49); scene.add(t); });
  K.box(1.2, 0.3, 8, 0x4a4a48, 14, 0.5, -42, scene); K.cyl(0.12, 0.12, 2.4, 0x3a3a38, 14, 1.4, -38.2, scene, 8);
  const light = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), K.flat(0xffffff)); light.position.set(14, 2.8, -38.2); scene.add(light);
  const glow = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 })); glow.position.copy(light.position); scene.add(glow);
  // 이쪽 부두: 판자 + 말뚝
  const dock = new THREE.Group(); scene.add(dock);
  for (let i = 0; i < 9; i++) K.box(3.2, 0.18, 0.95, i % 2 ? 0x7d7d79 : 0x86867f, -1.5, 0.75, 6 - i * 1.0, dock);
  [[-3.2, 6], [0.2, 6], [-3.2, -2], [0.2, -2]].forEach(([x, z]) => K.cyl(0.22, 0.22, 2.2, 0x4a4a47, x, 0.6, z, dock, 10));
  // 노 젓는 작은 배(물결 따라 까딱)
  const boat = new THREE.Group(); boat.position.set(3.4, 0.2, -0.5); boat.rotation.y = 0.6; scene.add(boat);
  const hull = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 4, 16, 1, false, Math.PI / 2, Math.PI), new THREE.MeshLambertMaterial({ color: 0x3e3e3b, side: THREE.DoubleSide })), 30);
  hull.rotation.z = Math.PI / 2; hull.rotation.y = Math.PI / 2; hull.scale.set(1, 1, 0.75); boat.add(hull);
  const oar = K.cyl(0.04, 0.04, 3.2, 0x2a2a28, 0.6, 0.3, 0, boat, 6); oar.rotation.z = 1.1;
  // 사람: 부두 끝에서 불빛을 향해 천천히 팔을 뻗었다 거둔다
  const P = K.person(scene, { x: -1.4, z: -1.7, rot: -0.4, coat: 0xd3d0c8, pants: 0xbdbab2, hair: 'short', hairC: 0x2a2a2a });
  P.root.position.y = 0.84;
  cam.position.set(-10.5, 3.2, 4.5); cam.lookAt(3.5, 2.2, -14);
  return (t, ph) => {
    waves.forEach(o => { o.w.position.x = o.x + Math.sin(ph + o.s) * 0.4; o.w.scale.x = 0.8 + 0.25 * Math.sin(ph * 2 + o.s); });
    glint.forEach((g, i) => { g.scale.x = 0.6 + 0.5 * Math.abs(Math.sin(ph * 2 + i)); });
    const pulse = 0.5 + 0.5 * Math.sin(ph * 2); glow.scale.setScalar(0.85 + 0.45 * pulse); glow.material.opacity = 0.18 + 0.22 * pulse;
    boat.rotation.z = Math.sin(ph) * 0.07; boat.position.y = 0.2 + Math.sin(ph + 1) * 0.06;
    const reach = K.win(ph, 0.12, 0.72, 0.16);
    P.pose({ headPitch: 0.04 + 0.06 * reach, headYaw: 0.05, torsoYaw: -0.05 * reach, lean: -0.08 * reach,
      armR: { fwd: 1.45 * reach, out: -0.1 * reach, elbow: 0.05 }, armL: { fwd: 1.25 * reach, out: -0.25 * reach, elbow: 0.05 },
      bob: P.root.position.y + Math.sin(ph * 2) * 0.01 });
    P.root.position.y = 0.84;
  };
}
