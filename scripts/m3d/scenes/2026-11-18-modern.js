// 11/18 1분 현대문학 「두근두근 내 인생」 대표: 작은 아파트 방. 모자 쓴 작은 소년(아름)이 오른쪽 책상(+x)을 향해 서서 공책에 글을 쓰고, 왼쪽 뒤의 젊은 엄마 아빠가 어깨를 맞대고 소년 쪽으로 몸을 기울여 들여다본다. 창가 화분 잎이 흔들리고 커튼이 날린다
export const secs = 3;
export const opts = { bg: 0xeeece7, fog: [0xe8e6e1, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dad7cf', line: '#d0cdc5', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 19 });
  // 책상 + 공책 + 스탠드 + 책 더미
  K.box(2.2, 0.14, 1.4, 0x5a5853, 2.6, 1.7, -3.2, scene); [[1.6, -3.8], [3.6, -3.8], [1.6, -2.6], [3.6, -2.6]].forEach(([x, z]) => K.box(0.12, 1.7, 0.12, 0x3a3936, x, 0.85, z, scene));
  K.box(0.7, 0.03, 0.5, 0xf4f2ee, 2.2, 1.8, -3.1, scene);
  K.cyl(0.04, 0.04, 1.0, 0x2a2a28, 3.3, 2.25, -3.6, scene, 6); const sh = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.35, 12, 1, true), new THREE.MeshLambertMaterial({ color: 0x2a2a28, side: THREE.DoubleSide })), 40); sh.position.set(3.3, 2.8, -3.6); sh.rotation.z = 0.5; scene.add(sh);
  [0, 1, 2].forEach(i => K.box(0.6, 0.12, 0.45, i % 2 ? 0x45443f : 0x9a9892, 3.2, 1.83 + i * 0.12, -2.8, scene));
  // 창 + 커튼 + 화분
  K.box(2.6, 2.0, 0.1, 0x6e6c67, 2.4, 4.2, -6.4, scene); K.box(2.3, 1.7, 0.05, 0xc4c2bc, 2.4, 4.2, -6.32, scene);
  const curtain = new THREE.Group(); curtain.position.set(1.0, 5.2, -6.2); scene.add(curtain); K.box(0.7, 2.0, 0.04, 0xeceae4, 0, -1.0, 0, curtain);
  K.box(2.8, 0.1, 0.5, 0x45443f, 2.4, 3.15, -6.1, scene); K.cyl(0.2, 0.15, 0.35, 0x3a3936, 3.2, 3.38, -6.0, scene, 10);
  const leaves = []; for (let i = 0; i < 4; i++) { const g = new THREE.Group(); g.position.set(3.2, 3.55, -6.0); scene.add(g); const l = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), K.lam(0x55534e)), 60); l.scale.set(0.6, 1.8, 0.3); l.position.y = 0.3; g.add(l); g.rotation.z = -0.6 + i * 0.4; leaves.push(g); }
  // 아름(작게, 책상 쪽 +x를 향함), 엄마·아빠(왼쪽 뒤, 아름 쪽을 향함)
  const A = K.person(scene, { x: 1.0, z: -3.0, rot: -Math.PI / 2 + 0.3, coat: 0x8a8782, pants: 0x3a3936, hair: 'cap', scale: 0.62, scarf: 0xe8e6e0 });
  const Mo = K.person(scene, { x: -0.5, z: -4.3, rot: -Math.PI / 2 - 0.4, coat: 0xb4b1a9, pants: 0x45443f, hair: 'long', scale: 0.92 });
  const Fa = K.person(scene, { x: -2.1, z: -2.0, rot: -Math.PI / 2 - 0.15, coat: 0x45443f, pants: 0x2a2a28, hair: 'short', scale: 1.0 });
  cam.position.set(0.6, 3.2, 5.2); cam.lookAt(0.8, 2.0, -3.2);
  return (t, ph) => {
    const w = Math.sin(ph * 6), look = K.win(ph, 0.4, 0.9, 0.12);
    A.pose({ headPitch: -0.45 + 0.35 * look, headYaw: 0.6 * look, lean: 0.15, armR: { fwd: 1.0, out: 0.05 + 0.05 * w, elbow: 1.2 }, armL: { fwd: 0.8, elbow: 1.0 } });
    Mo.pose({ lean: 0.2, headPitch: -0.25, headYaw: -0.1 + 0.15 * look, armL: { fwd: 0.6, out: 0.2, elbow: 1.2 }, armR: { fwd: 0.3, elbow: 0.6 } });
    Fa.pose({ lean: 0.15, headPitch: -0.3, headYaw: 0.25 - 0.3 * look, armR: { fwd: 0.6 + 0.3 * look, out: -0.2, elbow: 0.8 }, armL: { fwd: 0.2, elbow: 0.4 } });
    curtain.rotation.x = -0.2 - 0.15 * Math.sin(ph); leaves.forEach((g, i) => { g.rotation.x = 0.15 * Math.sin(ph + i); });
  };
}
