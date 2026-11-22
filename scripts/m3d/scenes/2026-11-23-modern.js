// 11/23 1분 현대문학 『82년생 김지영』 대표: 밝은 상담실, 단발머리 여인이 소파에 앉아 두 손을 무릎에 모으고 말하고, 맞은편 의자의 남자 의사가 수첩에 받아 적는다. 화분 잎·벽시계 추·블라인드 흔들림. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2331 });
  K.box(14, 0.1, 10, 0xd8d5cd, 0, -0.05, -2, scene);
  // 창 + 블라인드
  K.box(3.0, 2.2, 0.05, 0xfbfaf6, 0.2, 3.0, -6.9, scene); const bl = []; for (let i = 0; i < 8; i++) bl.push(K.box(3.0, 0.06, 0.2, 0xd8d5cd, 0.2, 2.1 + i * 0.27, -6.8, scene));
  // 벽시계 + 추
  K.cyl(0.4, 0.4, 0.08, 0xf2f0ea, -3.2, 3.6, -6.85, scene, 20).rotation.x = Math.PI / 2; const pend = new THREE.Group(); pend.position.set(-3.2, 3.1, -6.8); scene.add(pend); K.box(0.04, 0.8, 0.04, 0x3a3936, 0, -0.4, 0, pend); K.cyl(0.12, 0.12, 0.04, 0x3a3936, 0, -0.85, 0, pend, 12).rotation.x = Math.PI / 2;
  // 화분 + 책장 + 낮은 탁자 + 휴지
  K.cyl(0.35, 0.28, 0.6, 0x8a8782, 3.6, 0.3, -4.5, scene, 14); const plant = []; for (let i = 0; i < 6; i++) { const l = K.box(0.12, 1.0, 0.04, 0x55534e, 3.6, 1.0, -4.5, scene); l.rotation.z = -0.6 + i * 0.24; plant.push(l); }
  K.box(1.6, 2.8, 0.6, 0x9a978f, -4.6, 1.4, -6.2, scene);
  K.box(1.4, 0.5, 0.8, 0x77756f, 0, 0.25, -2.6, scene); K.box(0.4, 0.2, 0.3, 0xfbfaf6, 0.3, 0.6, -2.6, scene);
  // 소파 + 여인(앉음, 오른쪽을 봄)
  K.box(2.4, 0.6, 1.0, 0x6e6c66, -2.0, 0.5, -2.8, scene); K.box(2.4, 1.0, 0.3, 0x6e6c66, -2.0, 1.0, -3.3, scene);
  const W = K.person(scene, { x: -2.0, z: -2.8, rot: -1.25, coat: 0xa8a59e, pants: 0x45443f, hair: 'bob', scale: 0.95 });
  const wg = new THREE.Group(); wg.position.y = -0.7; scene.add(wg); wg.add(W.root);
  // 의사(의자, 왼쪽을 봄)
  K.box(0.9, 0.5, 0.9, 0x55534e, 2.0, 0.6, -2.6, scene);
  const Dr = K.person(scene, { x: 2.0, z: -2.6, rot: 1.35, coat: 0xf2f0ea, pants: 0x3a3936, hair: 'short', scale: 1.0 });
  const dg = new THREE.Group(); dg.position.y = -0.6; scene.add(dg); dg.add(Dr.root);
  const pad = K.box(0.35, 0.03, 0.45, 0xfbfaf6, 0, 0, 0, scene); Dr.hold('L', pad, { at: [0, -0.1, 0.05], rot: [0.3, 0, 0] });
  cam.position.set(0.0, 2.4, 4.6); cam.lookAt(0, 1.4, -3.2);
  return (t, ph) => {
    const talk = Math.sin(ph * 6);
    W.pose({ headPitch: 0.1 + 0.05 * talk, headYaw: -0.1, armL: { fwd: 0.9, elbow: 1.1, out: -0.2 }, armR: { fwd: 0.9 + 0.3 * K.win(ph, 0.3, 0.6, 0.1), elbow: 1.1, out: -0.2 } });
    Dr.pose({ headPitch: 0.25 + 0.1 * K.win(ph, 0.5, 0.9, 0.1), armL: { fwd: 1.0, elbow: 1.2 }, armR: { fwd: 1.1 + 0.08 * Math.sin(ph * 10), elbow: 1.5, out: -0.2 } });
    pend.rotation.z = 0.35 * Math.sin(ph * 2);
    bl.forEach((b, i) => { b.rotation.x = 0.15 * Math.sin(ph * 2 + i * 0.4); });
    plant.forEach((l, i) => { l.rotation.z = -0.6 + i * 0.24 + 0.04 * Math.sin(ph * 2 + i); });
  };
}
