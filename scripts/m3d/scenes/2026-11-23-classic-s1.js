// 11/23 「귀여운 여인」 장면①(after 1): 비 오는 야외 유원지 무대 앞, 빈 나무 의자들 사이에서 쿠킨이 하늘을 향해 두 팔을 든다. 곁의 올렌카가 우산을 받쳐 든다. 빗줄기·흔들리는 휘장·웅덩이 파문. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe0ded8, fog: [0xdcdad4, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d0cdc5', line: '#c8c5bd', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2322, near: false });
  // 무대 + 휘장 + 지붕
  K.box(8, 1.0, 3, 0x8a8782, 0, 0.5, -7, scene); K.box(8.4, 0.3, 3.4, 0x45443f, 0, 4.6, -7, scene);
  [-3.8, 3.8].forEach(x => K.cyl(0.12, 0.12, 3.8, 0x3a3936, x, 2.8, -5.6, scene, 8));
  const drape = []; [-2.6, 2.6].forEach(x => drape.push(K.box(2.2, 3.4, 0.08, 0x55534e, x, 2.8, -5.7, scene)));
  // 빈 의자 줄
  for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) { const x = -4 + i * 1.6, z = -3.6 + r * 1.5; K.box(0.8, 0.08, 0.7, 0x77756f, x, 0.8, z, scene); K.box(0.8, 0.8, 0.08, 0x77756f, x, 1.2, z + 0.35, scene); K.box(0.06, 0.8, 0.06, 0x55534e, x, 0.4, z, scene); }
  const Ku = K.person(scene, { x: -0.8, z: -0.2, rot: 0.3, coat: 0x2f2e2b, pants: 0x45443f, hair: 'short', scale: 1.0 });
  const Ol = K.person(scene, { x: 0.9, z: 0.0, rot: 0.9, coat: 0x8a8782, pants: 0x6e6c66, hair: 'bun', scale: 0.9, scarf: 0xeeece6 });
  const um = new THREE.Group(); const cap = new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.35, 12, 1, true), new THREE.MeshLambertMaterial({ color: 0x3a3936, side: THREE.DoubleSide })); K.inked(cap, 30); cap.position.y = 1.0; um.add(cap); K.cyl(0.02, 0.02, 1.0, 0x1e1e1e, 0, 0.5, 0, um, 6);
  Ol.hold('L', um, { at: [0, -0.1, 0], rot: [Math.PI, 0, 0] });
  const rain = []; for (let i = 0; i < 80; i++) { const r = K.box(0.015, 0.45, 0.015, 0xa8a59e, 0, 0, 0, scene); rain.push({ r, x: -6 + (i * 0.731) % 12, z: -5 + (i * 0.37) % 6, k: (i * 0.137) % 1 }); }
  const rip = []; for (let i = 0; i < 3; i++) { const m = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.26, 24), new THREE.MeshBasicMaterial({ color: 0x8a8782, transparent: true, side: THREE.DoubleSide })); m.rotation.x = -Math.PI / 2; m.position.set(-2 + i * 2.2, 0.03, 1.0); scene.add(m); rip.push({ m, k: i / 3 }); }
  cam.position.set(0.3, 2.4, 6.2); cam.lookAt(0, 1.8, -2.5);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), up = K.win(ph, 0.15, 0.65, 0.12);
    Ku.pose({ headPitch: -0.4 * up, armL: { fwd: 0.4 + 2.0 * up, out: 0.4 }, armR: { fwd: 0.4 + 2.0 * up, out: 0.4 } });
    Ol.pose({ headYaw: 0.5, headPitch: -0.1, armL: { fwd: 1.6, elbow: 0.8, out: -0.3 }, armR: { fwd: 0.8, elbow: 1.2 } });
    rain.forEach(o => { const v = (o.k + u * 3) % 1; o.r.position.set(o.x, 6 - v * 6.2, o.z); });
    drape.forEach((d, i) => { d.rotation.y = 0.1 * Math.sin(ph * 2 + i * 2); });
    rip.forEach(o => { const v = (o.k + u * 2) % 1; o.m.scale.setScalar(0.5 + v * 3); o.m.material.opacity = 0.6 * (1 - v); });
  };
}
