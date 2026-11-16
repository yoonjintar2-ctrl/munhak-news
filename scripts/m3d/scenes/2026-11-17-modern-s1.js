// 11/17 1분 현대문학 「아홉 살 인생」 장면①: 산동네 골목, 이삿짐 보따리 옆. 처음 만난 두 아이(여민·기종)가 마주 서서 씩씩대며 노려보다(팔짱·삿대질), 이윽고 한 아이가 손을 내민다. 담장 위 고양이 꼬리가 흔들리고 보따리 줄이 흔들린다
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xe8e6e0, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3ca', line: '#cdcac1', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 33 });
  // 골목 담장 양쪽 + 판잣집 벽
  K.box(0.5, 2.2, 9, 0xb4b1a9, -4.4, 1.1, -4, scene); K.box(0.5, 2.2, 9, 0xa8a59d, 4.4, 1.1, -4, scene);
  K.box(9, 3.2, 0.4, 0xc6c3bb, 0, 1.6, -8.6, scene); K.box(1.2, 2.2, 0.08, 0x3a3936, -1.8, 1.1, -8.38, scene);
  // 이삿짐 보따리·궤짝·요강
  const bundle = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.7, 12, 9), K.lam(0x7a7872)), 40); bundle.scale.y = 0.75; bundle.position.set(-2.8, 0.5, -3.0); scene.add(bundle);
  const knot = new THREE.Group(); knot.position.set(-2.8, 1.0, -3.0); scene.add(knot); K.box(0.15, 0.4, 0.05, 0x3a3936, 0, 0.15, 0, knot);
  K.box(1.2, 0.8, 0.8, 0x4a4945, -3.0, 0.4, -4.4, scene); K.cyl(0.3, 0.25, 0.45, 0x8e8b84, 3.2, 0.22, -2.6, scene, 12);
  // 담장 위 고양이(몸통 + 꼬리)
  const cat = new THREE.Group(); cat.position.set(4.4, 2.4, -5.5); scene.add(cat);
  const cb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 8), K.lam(0x2a2a28)), 40); cb.scale.set(0.9, 0.8, 1.4); cat.add(cb); const ch = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), K.lam(0x2a2a28)), 40); ch.position.set(0, 0.25, -0.45); cat.add(ch);
  const tailG = new THREE.Group(); tailG.position.set(0, 0, 0.45); cat.add(tailG); K.cyl(0.05, 0.05, 0.8, 0x2a2a28, 0, 0.35, 0, tailG, 6);
  // 두 아이 — 마주 봄(옆모습)
  const Y = K.person(scene, { x: -1.0, z: -3.6, rot: -Math.PI / 2 - 0.4, coat: 0x45443f, pants: 0x8a8782, hair: 'short', scale: 0.72 });
  const G = K.person(scene, { x: 1.0, z: -3.6, rot: Math.PI / 2 + 0.4, coat: 0xa8a59d, pants: 0x2f2e2b, hair: 'cap', scale: 0.7 });
  cam.position.set(0.0, 3.0, 4.6); cam.lookAt(0.0, 1.6, -4.0);
  return (t, ph) => {
    const glare = K.win(ph, 0.0, 0.5, 0.1), hand = K.win(ph, 0.55, 0.98, 0.1);
    Y.pose({ headPitch: -0.05, lean: 0.12 * glare, armL: { fwd: 1.0 * glare, out: -0.5 * glare, elbow: 1.8 * glare }, armR: { fwd: 1.0 * glare + 1.2 * hand, out: -0.5 * glare, elbow: 1.8 * glare + 0.3 * hand } });
    G.pose({ headYaw: 0.1 * Math.sin(ph * 3), headTilt: 0.15 * hand, armR: { fwd: 1.3 * glare, elbow: 0.2, point: glare > 0.5 }, armL: { fwd: 0.3 + 0.9 * hand, elbow: 0.5 } });
    tailG.rotation.x = 0.6 + 0.5 * Math.sin(ph * 2); tailG.rotation.z = 0.3 * Math.sin(ph * 3); ch.rotation.y = 0.4 * Math.sin(ph);
    knot.rotation.z = 0.25 * Math.sin(ph * 2);
  };
}
