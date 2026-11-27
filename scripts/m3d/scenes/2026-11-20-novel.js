// 11/20 오늘의 소설 구절 「돈키호테」: 촛불 켜진 서재. 책이 쌓인 탁자 앞의 마른 노신사(긴 얼굴, 진한 조끼)가 왼손에 책을 펼쳐 들고 오른손의 긴 창을 치켜든다. 벽에 투구와 둥근 방패, 촛불이 흔들리고 발치의 사냥개가 꼬리를 흔든다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xebe9e3, fog: [0xe7e5df, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d2c8', line: '#ccc8be', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 101 });
  // 탁자 + 책 더미 + 촛대
  K.box(3.0, 0.14, 1.4, 0x45443f, -2.2, 1.6, -3.8, scene); [[-3.6, -4.4], [-0.8, -4.4], [-3.6, -3.2], [-0.8, -3.2]].forEach(([x, z]) => K.box(0.12, 1.6, 0.12, 0x3a3936, x, 0.8, z, scene));
  [[-3.2, 5], [-2.4, 4], [-1.5, 6]].forEach(([x, n], j) => { for (let i = 0; i < n; i++) { const b = K.box(0.7, 0.16, 0.5, [0x55534e, 0x8a8782, 0x3a3936, 0xdedbd3][(i + j) % 4], x, 1.75 + i * 0.17, -3.8, scene); b.rotation.y = (i % 3 - 1) * 0.15; } });
  [[1.0, 0.25, 0.7], [1.6, 0.25, 0.5]].forEach(([x, h, d]) => K.box(0.6, h, d, 0x55534e, x, h / 2, -2.6, scene));
  K.cyl(0.07, 0.07, 0.5, 0xf6f4ef, -0.9, 1.95, -3.5, scene, 10); const flame = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), K.flat(0xffffff)); flame.scale.y = 2.2; flame.position.set(-0.9, 2.3, -3.5); scene.add(flame);
  // 벽: 투구 + 방패
  const helm = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x77756f)), 40); helm.position.set(1.6, 5.2, -6.6); scene.add(helm); K.box(1.2, 0.08, 0.3, 0x55534e, 1.6, 5.2, -6.6, scene);
  const sh = K.cyl(0.7, 0.7, 0.1, 0x8a8782, 3.0, 4.4, -6.7, scene, 22); sh.rotation.x = Math.PI / 2; const bo = K.cyl(0.18, 0.18, 0.12, 0x45443f, 3.0, 4.4, -6.62, scene, 12); bo.rotation.x = Math.PI / 2;
  // 노신사
  const P = K.person(scene, { x: 0.6, z: -2.0, rot: 2.75, coat: 0x3a3936, pants: 0x55534e, hair: 'short', hairC: 0x55534e, scale: 1.0, scarf: 0xf2f0ea });
  P.torso.scale.x = 0.82; P.headG.scale.set(0.9, 1.15, 0.9);
  const beard = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.35, 8), K.lam(0xc8c5bd)); beard.rotation.x = Math.PI; beard.position.set(0, -0.05, -0.32); P.headG.add(beard);
  const book = new THREE.Group(); K.box(0.36, 0.04, 0.5, 0xf6f4ef, -0.19, 0, 0, book).rotation.z = 0.15; K.box(0.36, 0.04, 0.5, 0xf6f4ef, 0.19, 0, 0, book).rotation.z = -0.15; P.hold('L', book, { at: [0, -0.1, -0.15], rot: [1.2, 0, 0] });
  const lance = new THREE.Group(); K.cyl(0.04, 0.05, 4.4, 0x45443f, 0, 1.6, 0, lance, 6); const tip = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.4, 6), K.lam(0xdedbd3)); tip.position.y = 3.95; lance.add(tip);
  P.hold('R', lance, { at: [0, -0.05, 0], rot: [Math.PI, 0, 0] });
  // 사냥개
  const dog = new THREE.Group(); dog.position.set(2.4, 0, -1.2); dog.rotation.y = 2.2; scene.add(dog); const db = K.inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.9, 4, 8), K.lam(0xa8a59e)), 40); db.rotation.z = Math.PI / 2; db.position.y = 0.75; dog.add(db);
  [[-0.4, 0.13], [-0.4, -0.13], [0.4, 0.13], [0.4, -0.13]].forEach(([x, z]) => K.cyl(0.05, 0.05, 0.7, 0x8a8782, x, 0.35, z, dog, 6));
  const dh = new THREE.Group(); dh.position.set(-0.75, 1.05, 0); dog.add(dh); dh.add(K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), K.lam(0xa8a59e)), 40)); K.box(0.3, 0.12, 0.13, 0x8a8782, -0.22, -0.05, 0, dh);
  const tail = new THREE.Group(); tail.position.set(0.7, 0.85, 0); dog.add(tail); K.cyl(0.03, 0.04, 0.55, 0xa8a59e, 0, 0.25, 0, tail, 5);
  cam.position.set(0.2, 3.2, 6.4); cam.lookAt(0.0, 2.6, -2.8);
  return (t, ph) => {
    const raise = K.win(ph, 0.15, 0.75, 0.15);
    P.pose({ headPitch: 0.15 - 0.35 * raise, headYaw: 0.25 * (1 - raise), lean: 0.05 * raise, armL: { fwd: 1.0, out: -0.2, elbow: 1.0 }, armR: { fwd: 1.2 + 1.0 * raise, out: 0.15, elbow: 0.6 - 0.4 * raise } });
    flame.scale.set(1 + 0.15 * Math.sin(ph * 7), 2.2 + 0.4 * Math.sin(ph * 5), 1);
    tail.rotation.x = 0.7 * Math.sin(ph * 6); dh.rotation.z = 0.2 * Math.sin(ph * 2);
  };
}
