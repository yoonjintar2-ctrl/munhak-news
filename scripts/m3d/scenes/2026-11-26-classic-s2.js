// 11/26 「탈출기」 장면②(after 2): 흙집 부엌 아궁이 곁, 아내(임신한 몸, 저고리+치마)가 쪼그려 앉아 등 뒤로 무언가(귤껍질)를 감추고, 문간의 박군이 멈칫 바라본다. 아궁이 불 일렁임·부뚜막 솥 김·바닥 귤껍질 조각. 카메라 비스듬히 고정
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xdad8d2, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(30, 0.2, 16, 0xbcb7ac, 0, -0.1, -2, scene);
  K.box(30, 8, 0.4, 0xeae7e0, 0, 4, -5.2, scene);
  // 부뚜막 + 솥 + 아궁이 불
  K.box(4.0, 1.3, 1.6, 0x9a978f, -1.5, 0.65, -4.2, scene); const pot = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x2f2e2b)), 30); pot.rotation.x = Math.PI; pot.position.set(-2.4, 1.6, -4.2); scene.add(pot);
  K.cyl(0.78, 0.78, 0.08, 0x45443f, -2.4, 1.62, -4.2, scene, 18);
  K.box(0.9, 0.6, 0.1, 0x2a2a28, -0.6, 0.45, -3.38, scene);
  const flames = []; for (let i = 0; i < 4; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.4, 6), K.lam(0xbcb9b1)); f.position.set(-0.9 + i * 0.2, 0.35, -3.3); scene.add(f); flames.push(f); }
  // 물동이·바가지·장작
  K.cyl(0.4, 0.3, 0.7, 0x6e6c66, 2.2, 0.35, -4.2, scene, 12); K.cyl(0.25, 0.1, 0.12, 0xd8d5cd, 2.2, 0.76, -4.2, scene, 10);
  for (let i = 0; i < 4; i++) { const l = K.cyl(0.1, 0.1, 1.2, 0x55534e, 1.0 + i * 0.05, 0.12 + (i % 2) * 0.2, -3.2 + i * 0.22, scene, 6); l.rotation.z = Math.PI / 2; }
  // 문간(문틀)
  K.box(0.3, 4, 0.3, 0x45443f, 3.3, 2, -1.8, scene); K.box(0.3, 4, 0.3, 0x45443f, 5.0, 2, -1.8, scene); K.box(2.0, 0.3, 0.3, 0x45443f, 4.15, 4.0, -1.8, scene);
  // 아내(쪼그려 앉음, 등 뒤 손)
  const W = K.person(scene, { x: 0.5, z: -2.6, rot: -Math.PI / 2 - 0.5, coat: 0xf2f0ea, outfit: 'jeogori', skirt: 'chima', skirtC: 0x55534e, hair: 'bun', eyes: 'wide', brows: 'worried', mouth: 'small', seed: 2628 });
  W.root.position.y = -0.75;
  const peel = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6, 0, Math.PI), K.lam(0x6e6c66)); W.hold('R', peel, { at: [0, -0.15, 0] });
  [[0.0, -1.8], [-0.4, -1.5]].forEach(([x, z]) => { const p = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6, 0, Math.PI), K.lam(0x6e6c66)); p.position.set(x, 0.05, z); scene.add(p); });
  // 박군(문간)
  const B = K.person(scene, { x: 4.1, z: -1.6, rot: Math.PI / 2 + 0.3, coat: 0xe6e3dc, pants: 0x55534e, outfit: 'jeogori', hair: 'short', eyes: 'wide', brows: 'up', mouth: 'open', seed: 2629 });
  const steam = []; for (let i = 0; i < 8; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, depthWrite: false })); scene.add(s); steam.push({ s, k: i / 8 }); }
  cam.position.set(2.2, 3.0, 5.6); cam.lookAt(1.4, 1.5, -2.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), s = Math.sin(ph);
    W.pose({ headYaw: -0.8 + 0.15 * s, headPitch: 0.1, lean: -0.25, armR: { fwd: -0.5, out: 0.1, elbow: 0.6 }, armL: { fwd: 0.6, elbow: 1.4 } });
    B.pose({ headPitch: 0.2, lean: 0.05 + 0.05 * s, armL: { fwd: 0.7 + 0.2 * s, elbow: 0.5 }, armR: { fwd: 0.2, elbow: 0.4 } });
    flames.forEach((f, i) => { f.scale.y = 1 + 0.4 * Math.sin(ph * 8 + i * 1.5); });
    steam.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(-2.4 + 0.15 * Math.sin(ph * 2 + o.k * 9), 1.8 + v * 1.6, -4.2); o.s.scale.setScalar(0.6 + v * 1.5); o.s.material.opacity = 0.32 * (1 - v); });
  };
}
