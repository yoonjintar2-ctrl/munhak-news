// 11/25 「달밤」 장면②(after 4): 장맛비 내리는 학교 담 앞길, 거적 덮은 좌판 위 참외들 곁에 삿갓 쓴 수건이 웅크려 앉아(몸을 낮춤) 하늘을 올려다본다. 빗줄기·처마 물방울·물웅덩이 파문. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xdad8d2, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cbc8c0', line: '#c4c1b9', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 2523, near: false });
  // 학교 담장 + 나무 대문 기둥 + 처마 달린 작은 문간
  K.box(16, 1.8, 0.4, 0xd8d5cd, 0, 0.9, -4.2, scene); K.box(16, 0.2, 0.6, 0x8a8782, 0, 1.9, -4.2, scene);
  K.box(0.5, 3.0, 0.5, 0x55534e, 3.2, 1.5, -4.0, scene); K.box(0.5, 3.0, 0.5, 0x55534e, 5.2, 1.5, -4.0, scene);
  const eave = K.box(3.0, 0.15, 1.3, 0x45443f, 4.2, 3.05, -3.7, scene);
  // 좌판(거적) + 참외
  K.box(2.4, 0.5, 1.3, 0x6e6c66, -0.8, 0.25, -1.6, scene); K.box(2.6, 0.05, 1.5, 0x9a978f, -0.8, 0.52, -1.6, scene);
  for (let i = 0; i < 9; i++) { const m = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), K.lam(i % 2 ? 0xe2dfd7 : 0xd0cdc5)), 40); m.scale.set(1.35, 0.85, 0.9); m.position.set(-1.6 + (i % 5) * 0.4, 0.72 + Math.floor(i / 5) * 0.18, -1.9 + Math.floor(i / 5) * 0.4 + (i % 2) * 0.15); m.rotation.y = i; scene.add(m); }
  K.cyl(0.35, 0.3, 0.4, 0x55534e, 1.0, 0.2, -1.2, scene, 12); // 광주리
  // 웅크린 수건 + 삿갓
  const g = new THREE.Group(); g.position.y = -0.85; scene.add(g);
  const S = K.person(scene, { x: 1.2, z: -0.5, rot: 2.7, coat: 0x55534e, pants: 0x3a3936, hair: 'short', scale: 1.0 }); g.add(S.root);
  S.headG.scale.setScalar(1.25);
  [-0.25, 0.25].forEach(x => { const kn = K.cyl(0.2, 0.2, 1.1, 0x3a3936, x, 1.2, -0.5, S.root, 10); kn.rotation.x = 0.9; });
  const hat = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.45, 18), K.lam(0x8a8782)), 30); hat.position.y = 0.85; S.headG.add(hat);
  // 비·웅덩이 파문·처마 물방울
  const rain = []; for (let i = 0; i < 70; i++) { const r = K.box(0.015, 0.45, 0.015, 0x9a978f, 0, 0, 0, scene); rain.push({ r, x: -6 + (i * 0.173) % 12, z: -3.8 + (i * 0.311) % 6, k: (i * 0.137) % 1 }); }
  const rings = []; [[-2.8, 0.6], [0.4, 1.2], [2.6, 0.3]].forEach(([x, z], i) => { const r = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.25, 24), K.flat(0x8a8782)); r.rotation.x = -Math.PI / 2; r.position.set(x, 0.02, z); scene.add(r); rings.push({ r, k: i / 3 }); const p = new THREE.Mesh(new THREE.CircleGeometry(0.7, 20), K.lam(0xb4b1a9)); p.rotation.x = -Math.PI / 2; p.position.set(x, 0.01, z); scene.add(p); });
  const drips = []; for (let i = 0; i < 5; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 4), K.flat(0x6e6c66)); scene.add(d); drips.push({ d, x: 3.0 + i * 0.6, k: i / 5 }); }
  cam.position.set(0.2, 2.3, 6.4); cam.lookAt(0.2, 1.2, -1.4);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    S.pose({ lean: -0.2, headPitch: 0.35 + 0.1 * Math.sin(ph), headYaw: 0.15 * Math.sin(ph * 2), armL: { fwd: 1.0, elbow: 1.4 }, armR: { fwd: 0.9 + 0.2 * Math.sin(ph), elbow: 1.6 } });
    rain.forEach(o => { const v = (o.k + u * 3) % 1; o.r.position.set(o.x - v * 0.4, 6 - v * 6, o.z); o.r.rotation.z = 0.06; });
    rings.forEach(o => { const v = (o.k + u * 2) % 1; o.r.scale.setScalar(0.5 + v * 2.2); o.r.material.opacity = 1; });
    drips.forEach(o => { const v = (o.k + u * 2) % 1; o.d.position.set(o.x, 2.95 - v * 2.9, -3.1); });
  };
}
