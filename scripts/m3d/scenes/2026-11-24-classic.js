// 11/24 1분 고전 「화수분」 대표: 눈 덮인 기와집 행랑채 앞, 지게를 진 아범(오른쪽으로 떠나며 rot -2.2, 고개는 뒤로 돌려 아내 쪽)과 아기를 업은 어멈(왼쪽 문가, rot 2.4)이 배웅한다. 굴뚝 연기·눈발. 진행 방향 +x. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#e2e0da', line: '#d8d6d0', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2404, near: false });
  // 행랑채: 흙벽·기와지붕·문·굴뚝
  K.box(6.5, 2.6, 2.0, 0xc8c5bd, -2.2, 1.3, -4.2, scene);
  const roof = K.box(7.4, 0.35, 2.8, 0x3a3936, -2.2, 2.8, -4.2, scene); K.box(7.0, 0.3, 1.6, 0x45443f, -2.2, 3.1, -4.2, scene);
  for (let i = 0; i < 9; i++) K.box(0.08, 0.1, 2.9, 0x262626, -5.6 + i * 0.85, 2.98, -4.2, scene);
  K.box(1.0, 1.9, 0.08, 0x6e6c66, -1.2, 0.95, -3.18, scene); K.box(0.9, 0.7, 0.06, 0xeeece6, -3.6, 1.6, -3.18, scene);
  K.box(0.5, 1.6, 0.5, 0x8a8782, 1.3, 3.0, -4.6, scene);
  // 장독대·나뭇단
  [[-5.0, 0.4], [-4.4, 0.32]].forEach(([x, r]) => K.cyl(r, r * 0.8, r * 2, 0x55534e, x, r, -2.6, scene, 14));
  for (let i = 0; i < 5; i++) K.cyl(0.08, 0.08, 1.4, 0x6e6c66, 3.2 + i * 0.18, 0.7, -3.6, scene, 6);
  // 어멈(아기 업음)
  const W = K.person(scene, { x: -1.6, z: -2.4, rot: -1.75, coat: 0x8a8782, pants: 0x55534e, hair: 'bun', scale: 0.92, scarf: 0xeeece6 });
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.7, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0x55534e, side: THREE.DoubleSide })), 40); sk.position.y = 1.1; W.root.add(sk);
  const baby = new THREE.Group(); baby.position.set(0, 2.7, 0.55); W.root.add(baby);
  const bb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), K.lam(0xbcb9b1)), 30); baby.add(bb);
  const bh = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), K.lam(0xdcd6ce)), 30); bh.position.set(0, 0.5, 0.05); baby.add(bh);
  // 아범(지게)
  const M = K.person(scene, { x: 1.8, z: -1.6, rot: -2.2, coat: 0x55534e, pants: 0x3a3936, hair: 'short', scale: 1.0, scarf: 0xd8d5cd });
  const jige = new THREE.Group(); jige.position.set(0, 2.2, 0.5); M.root.add(jige);
  [-0.35, 0.35].forEach(x => { const b = K.box(0.1, 3.0, 0.1, 0x6e6c66, x, 0.3, 0.1, jige); b.rotation.x = 0.08; });
  [0, 0.6, -0.6].forEach(y => K.box(0.8, 0.08, 0.08, 0x6e6c66, 0, y, 0.12, jige));
  K.box(0.9, 0.7, 0.6, 0xbcb9b1, 0, 0.9, 0.35, jige);
  // 연기·눈
  const smoke = []; for (let i = 0; i < 10; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 6), new THREE.MeshBasicMaterial({ color: 0x9a978f, transparent: true, opacity: 0.4, depthWrite: false })); scene.add(s); smoke.push({ s, k: i / 10 }); }
  const snow = []; for (let i = 0; i < 70; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 4), K.flat(0xffffff)); scene.add(s); snow.push({ s, x: -6 + (i * 0.733) % 12, z: -4 + (i * 0.41) % 7, k: (i * 0.137) % 1 }); }
  cam.position.set(0.2, 2.6, 6.4); cam.lookAt(-0.1, 1.8, -2.4);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), wave = K.win(ph, 0.2, 0.7, 0.1);
    M.pose({ headYaw: -1.0, torsoYaw: -0.3, armR: { fwd: 0.6, elbow: 0.8 }, armL: { fwd: 0.6, elbow: 0.8 }, bob: 0.02 * Math.sin(ph * 2) });
    W.pose({ headPitch: -0.05, armR: { fwd: 1.6 * wave, out: 0.3, elbow: 0.3 + 0.3 * Math.sin(ph * 8) * wave }, armL: { fwd: 0.4, elbow: 1.4 } });
    bh.rotation.z = 0.15 * Math.sin(ph * 2);
    smoke.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(1.3 + 0.6 * v + 0.15 * Math.sin(ph * 2 + o.k * 7), 3.9 + v * 3, -4.6); o.s.scale.setScalar(0.6 + v * 1.8); o.s.material.opacity = 0.45 * (1 - v); });
    snow.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(o.x + 0.3 * Math.sin(ph + o.k * 9), 6.5 - v * 6.5, o.z); });
  };
}
