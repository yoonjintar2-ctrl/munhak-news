// 11/18 「두근두근 내 인생」 장면③: 병실. 침대 머리맡에 앉은 엄마가 공책을 펼쳐 들고 읽어 주고, 그 뒤에 선 아빠가 엄마 어깨에 손을 얹는다. 침대에는 이불을 덮은 작은 모습(얼굴 세부 없음). 창가 커튼이 흔들리고 링거 줄이 살짝 흔들린다
export const secs = 3;
export const opts = { bg: 0xefede8, fog: [0xe9e7e2, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dedbd3', line: '#d4d1c9', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 12 });
  // 침대 + 이불 덮은 작은 모습
  K.box(3.4, 0.8, 1.6, 0xd2cfc7, 1.4, 0.8, -4.4, scene); K.box(0.15, 1.6, 1.6, 0x45443f, 3.15, 1.0, -4.4, scene); [[-0.2, -5.1], [-0.2, -3.7]].forEach(([x, z]) => K.box(0.1, 0.4, 0.1, 0x3a3936, x, 0.2, z, scene));
  const quilt = K.box(2.2, 0.35, 1.4, 0xb4b1a9, 1.1, 1.36, -4.4, scene); K.box(0.7, 0.2, 1.0, 0xf2f0ea, 2.6, 1.3, -4.4, scene);
  const head = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 10), K.lam(0xdcd6ce)), 60); head.position.set(2.5, 1.55, -4.4); scene.add(head);
  // 링거대
  K.cyl(0.03, 0.03, 3.2, 0x2a2a28, 3.6, 1.6, -5.6, scene, 6); K.box(0.3, 0.45, 0.12, 0xe8e6e0, 3.6, 3.0, -5.6, scene); const tube = K.cyl(0.01, 0.01, 1.4, 0x55534e, 3.4, 2.1, -5.2, scene, 4);
  // 창 + 커튼
  K.box(2.4, 1.8, 0.1, 0x6e6c67, -1.6, 3.8, -6.4, scene); K.box(2.2, 1.6, 0.05, 0xc4c2bc, -1.6, 3.8, -6.32, scene);
  const curtain = new THREE.Group(); curtain.position.set(-2.9, 4.8, -6.2); scene.add(curtain); K.box(0.8, 2.0, 0.04, 0xeceae4, 0, -1.0, 0, curtain);
  // 엄마(침대 왼쪽 앞, 의자에 앉아 침대 쪽 +x를 향함), 아빠(뒤에 서서 엄마 쪽)
  K.box(0.8, 0.1, 0.8, 0x45443f, -1.0, 0.95, -3.8, scene);
  const Mo = K.person(scene, { x: -0.9, z: -3.8, rot: -Math.PI / 2 + 0.2, coat: 0x8a8782, pants: 0x3a3936, hair: 'long', scale: 0.9 });
  const book = K.box(0.55, 0.04, 0.4, 0xf6f5f1, 0, 0, 0, scene);
  const Fa = K.person(scene, { x: -2.4, z: -3.2, rot: -Math.PI / 2 + 0.1, coat: 0x3a3936, pants: 0x2a2a28, hair: 'short', scale: 1.0 });
  cam.position.set(0.6, 3.0, 4.8); cam.lookAt(0.6, 1.8, -4.0);
  return (t, ph) => {
    const look = K.win(ph, 0.4, 0.9, 0.12);
    Mo.pose({ bob: -0.85, lean: 0.15, headPitch: -0.35 + 0.25 * look, headYaw: -0.3 * look, armL: { fwd: 1.0, out: -0.25, elbow: 1.0 }, armR: { fwd: 1.0, out: -0.25, elbow: 1.0 } });
    book.position.set(-0.2, 1.85 + 0.03 * Math.sin(ph), -3.75); book.rotation.z = -0.4;
    Fa.pose({ headPitch: -0.35, headYaw: 0.1, lean: 0.15, armL: { fwd: 0.9, out: -0.1, elbow: 0.5 }, armR: { fwd: 0.2, elbow: 0.4 } });
    curtain.rotation.x = -0.15 - 0.15 * Math.sin(ph); tube.rotation.z = 0.05 * Math.sin(ph * 2); quilt.scale.y = 1 + 0.04 * Math.sin(ph * 2);
  };
}
