// 11/18 「두근두근 내 인생」 장면②: 밤, 아름이 방. 모자 쓴 작은 아름이가 책상 위 컴퓨터 화면(빛나는 빈 화면, 글자 없음) 앞에 바짝 다가앉아 자판을 두드리다 고개를 갸웃하며 화면을 들여다본다. 창밖 별이 깜박이고 화면 빛이 일렁인다
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xd8d6d0, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfcbc1', line: '#c6c2b8', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 66 });
  K.box(2.6, 0.14, 1.4, 0x5a5853, 0.4, 1.6, -4.2, scene); [[-0.7, -4.8], [1.5, -4.8], [-0.7, -3.6], [1.5, -3.6]].forEach(([x, z]) => K.box(0.12, 1.6, 0.12, 0x3a3936, x, 0.8, z, scene));
  K.box(1.4, 0.95, 0.12, 0x2a2a28, 0.4, 2.3, -4.6, scene); const scrM = new THREE.MeshBasicMaterial({ color: 0xf6f5f1 }); const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.8), scrM); scr.position.set(0.4, 2.3, -4.53); scene.add(scr);
  K.box(0.15, 0.3, 0.15, 0x2a2a28, 0.4, 1.8, -4.6, scene); K.box(1.0, 0.05, 0.35, 0x3a3936, 0.4, 1.7, -3.9, scene);
  // 창(밤하늘) + 별
  K.box(2.0, 1.6, 0.1, 0x6e6c67, -2.4, 3.8, -6.4, scene); K.box(1.8, 1.4, 0.05, 0x4a4945, -2.4, 3.8, -6.32, scene);
  const stars = []; for (let i = 0; i < 6; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), K.flat(0xffffff)); s.position.set(-3.1 + (i % 3) * 0.6, 3.4 + Math.floor(i / 3) * 0.6 + (i % 2) * 0.2, -6.28); scene.add(s); stars.push(s); }
  // 의자 + 아름(살짝 앉음, 화면 쪽 -z를 향해 비스듬히)
  K.box(0.9, 0.12, 0.9, 0x45443f, 0.6, 0.9, -2.8, scene); K.box(0.9, 1.0, 0.12, 0x45443f, 0.6, 1.4, -2.35, scene);
  const A = K.person(scene, { x: 0.6, z: -3.0, rot: 0.35, coat: 0x8a8782, pants: 0x3a3936, hair: 'cap', scale: 0.62, scarf: 0xe8e6e0 });
  // 침대 가장자리, 곰 인형
  K.box(2.6, 0.7, 1.8, 0xb8b5ad, 3.6, 0.35, -4.6, scene); const bear = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), K.lam(0x6a6964)), 60); bear.position.set(3.2, 0.95, -4.2); scene.add(bear); const bh = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), K.lam(0x6a6964)), 60); bh.position.set(3.2, 1.35, -4.2); scene.add(bh);
  cam.position.set(2.0, 2.8, 3.4); cam.lookAt(0.3, 1.8, -3.8);
  return (t, ph) => {
    const tilt = K.win(ph, 0.45, 0.95, 0.12), ty = Math.sin(ph * 10) * (1 - tilt);
    A.pose({ bob: -0.25, lean: 0.25 - 0.1 * tilt, headPitch: -0.05, headTilt: 0.3 * tilt, armL: { fwd: 1.2, out: -0.1, elbow: 0.9 + 0.15 * ty }, armR: { fwd: 1.2, out: -0.1, elbow: 0.9 - 0.15 * ty } });
    scrM.color.setScalar(0.9 + 0.06 * Math.sin(ph * 3));
    stars.forEach((s, i) => s.scale.setScalar(0.6 + 0.6 * Math.abs(Math.sin(ph + i))));
  };
}
