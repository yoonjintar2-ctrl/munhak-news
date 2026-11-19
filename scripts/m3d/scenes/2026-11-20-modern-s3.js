// 11/20 「미스터 방」 결말 장면: 이층 양옥 난간에서 러닝셔츠 차림의 미스터 방이 아래로 양칫물을 내뿜고(물방울 포물선), 마당에 들어서던 군모 쓴 장교가 깜짝 놀라 위를 올려다보며 두 팔을 든다. 마당의 개가 짖으며 꼬리를 흔든다. 폭력 장면 없음. 카메라 고정(아래에서 비스듬히)
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 40, 130] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#e2dfd7', line: '#d8d5cd', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 63 });
  // 이층집 정면(벽 z=-4), 이층 바닥 y=4, 난간
  K.box(10, 8.6, 0.4, 0xd8d5cd, 0, 4.3, -4.6, scene); K.box(10.6, 0.4, 1.4, 0x55534e, 0, 8.7, -4.3, scene);
  K.box(1.4, 2.4, 0.1, 0x45443f, -3.0, 1.2, -4.35, scene); [[-0.5, 1.8], [3.0, 1.8], [-0.5, 5.8], [3.0, 5.8]].forEach(([x, y]) => { K.box(1.5, 1.3, 0.1, 0x8a8782, x, y, -4.35, scene); K.box(0.06, 1.3, 0.12, 0x45443f, x, y, -4.33, scene); });
  K.box(4.6, 0.25, 1.8, 0x6e6c66, -2.6, 4.2, -3.6, scene); K.box(4.6, 0.12, 0.12, 0x3a3936, -2.6, 5.3, -2.75, scene);
  for (let i = 0; i < 12; i++) K.box(0.06, 1.0, 0.06, 0x3a3936, -4.8 + i * 0.4, 4.8, -2.75, scene);
  const M = K.person(scene, { x: -2.4, z: -3.4, rot: Math.PI - 0.2, coat: 0xf2f0ea, pants: 0x45443f, hair: 'short', scale: 0.82 });
  M.root.position.y = 4.32; const baseY = 4.32;
  const O = K.person(scene, { x: 0.9, z: -0.8, rot: 1.0, coat: 0xb8b5ad, pants: 0x8a8782, hair: 'short', scale: 1.0 });
  { const c = K.cyl(0.44, 0.46, 0.2, 0x8a8782, 0, 0.62, 0.02, O.headG, 16); c.scale.z = 0.8; }
  // 개
  const dog = new THREE.Group(); dog.position.set(3.4, 0, -0.6); dog.rotation.y = 0.6; scene.add(dog); const db = K.inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.7, 4, 8), K.lam(0x55534e)), 40); db.rotation.z = Math.PI / 2; db.position.y = 0.6; dog.add(db);
  [[-0.35, 0.18], [-0.35, -0.18], [0.35, 0.18], [0.35, -0.18]].forEach(([x, z]) => K.cyl(0.07, 0.07, 0.5, 0x45443f, x, 0.25, z, dog, 6));
  const dh = new THREE.Group(); dh.position.set(-0.7, 0.9, 0); dog.add(dh); dh.add(K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.25, 10, 8), K.lam(0x55534e)), 40)); const sn = K.box(0.25, 0.14, 0.18, 0x45443f, -0.25, -0.05, 0, dh);
  const tail = new THREE.Group(); tail.position.set(0.7, 0.75, 0); dog.add(tail); K.cyl(0.04, 0.05, 0.45, 0x55534e, 0, 0.2, 0, tail, 5);
  // 양칫물 방울
  const drops = []; for (let i = 0; i < 26; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), K.flat(0xffffff)); scene.add(d); drops.push({ d, k: i / 26 }); }
  cam.position.set(4.6, 2.8, 7.4); cam.lookAt(-0.8, 3.3, -2.0);
  return (t, ph) => {
    const spit = K.win(ph, 0.05, 0.6, 0.1), u = ph / (Math.PI * 2);
    M.pose({ bob: baseY, lean: -0.35 * spit, headPitch: 0.35 * spit, armL: { fwd: 0.9, out: 0.2, elbow: 0.6 }, armR: { fwd: 0.9, out: 0.2, elbow: 0.6 } });
    const look = K.win(ph, 0.3, 0.95, 0.12);
    O.pose({ headPitch: -0.6 * look, lean: 0.15 * look, armL: { fwd: 1.6 * look, out: 0.4, elbow: 0.8 }, armR: { fwd: 1.6 * look, out: 0.4, elbow: 0.8 } });
    drops.forEach(o => { const v = (o.k + u * 2) % 1; const x = -2.3 + v * 2.3, y = 5.7 + 0.6 * v - 5.0 * v * v; o.d.position.set(x + 0.1 * Math.sin(o.k * 30), Math.max(0.05, y), -2.6 + v * 3.0); o.d.visible = spit > 0.2 || v > 0.3; });
    dh.rotation.z = 0.25 * Math.max(0, Math.sin(ph * 6)); tail.rotation.x = 0.6 * Math.sin(ph * 8);
  };
}
