// 11/18 「두근두근 내 인생」 장면①: 방송 촬영. 거실 소파에 나란히 앉은 세 식구(가운데 모자 쓴 작은 아름)를 앞쪽 삼각대 카메라와 조명이 비추고, 카메라 옆 PD가 손짓으로 신호를 준다. 조명 갓이 흔들리고 아름이가 손을 흔든다
export const secs = 3;
export const opts = { bg: 0xeeece7, fog: [0xe8e6e1, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dad7cf', line: '#d0cdc5', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 37 });
  // 소파
  K.box(4.6, 0.9, 1.4, 0x6a6964, 0, 0.45, -5.0, scene); K.box(4.6, 1.4, 0.4, 0x5a5954, 0, 1.3, -5.6, scene); [-2.3, 2.3].forEach(x => K.box(0.4, 1.2, 1.4, 0x5a5954, x, 0.8, -5.0, scene));
  // 세 식구(앉은 자세: bob으로 낮춤, 카메라 쪽 +z를 향함)
  const Mo = K.person(scene, { x: -1.3, z: -4.9, rot: Math.PI, coat: 0xb4b1a9, pants: 0x45443f, hair: 'long', scale: 0.9 });
  const A = K.person(scene, { x: 0, z: -4.8, rot: Math.PI, coat: 0x45443f, pants: 0x2a2a28, hair: 'cap', scale: 0.62, scarf: 0xe8e6e0 });
  const Fa = K.person(scene, { x: 1.3, z: -4.9, rot: Math.PI, coat: 0x3a3936, pants: 0x8a8782, hair: 'short', scale: 0.98 });
  // 삼각대 카메라 + 조명 + PD
  const camG = new THREE.Group(); camG.position.set(-2.4, 0, -1.2); scene.add(camG);
  [[0.4, 0], [-0.4, 0.2], [0, -0.4]].forEach(([x, z]) => { const l = K.cyl(0.03, 0.03, 2.0, 0x1f1f1d, x * 0.5, 1.0, z * 0.5, camG, 4); l.rotation.z = -x * 0.4; l.rotation.x = z * 0.4; });
  K.box(0.5, 0.45, 0.9, 0x2a2a28, 0, 2.2, 0, camG); K.cyl(0.15, 0.18, 0.4, 0x1f1f1d, 0, 2.2, -0.6, camG, 12).rotation.x = Math.PI / 2; camG.rotation.y = -0.35;
  K.cyl(0.04, 0.04, 3.2, 0x1f1f1d, 3.6, 1.6, -3.4, scene, 6); const lite = new THREE.Group(); lite.position.set(3.6, 3.2, -3.4); scene.add(lite); const sh = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.6, 14, 1, true), new THREE.MeshLambertMaterial({ color: 0x2a2a28, side: THREE.DoubleSide })), 40); sh.rotation.z = 1.2; lite.add(sh);
  const P = K.person(scene, { x: 2.3, z: -1.6, rot: -0.5, coat: 0x8a8782, pants: 0x2a2a28, hair: 'cap', scale: 0.95 });
  cam.position.set(0.2, 3.2, 6.4); cam.lookAt(0, 1.6, -3.4);
  return (t, ph) => {
    const wave = K.win(ph, 0.2, 0.8, 0.1), cue = K.win(ph, 0.05, 0.4, 0.08);
    Mo.pose({ bob: -0.75, headYaw: -0.4 * wave, headPitch: -0.1, armR: { fwd: 0.6, out: -0.3, elbow: 1.0 }, armL: { fwd: 0.6, elbow: 0.9 } });
    A.pose({ bob: -0.55, headTilt: 0.15 * Math.sin(ph * 2), armR: { fwd: 0.4 + 2.0 * wave, out: 0.2, elbow: 0.4 + 0.3 * Math.sin(ph * 8) * wave }, armL: { fwd: 0.6, elbow: 0.9 } });
    Fa.pose({ bob: -0.8, headYaw: 0.4 * wave, headPitch: -0.1, armL: { fwd: 0.6, out: -0.3, elbow: 1.0 }, armR: { fwd: 0.6, elbow: 0.9 } });
    P.pose({ headYaw: 0.1, armR: { fwd: 1.4 * cue + 0.3, out: 0.3, elbow: 0.3, point: cue > 0.5 }, armL: { fwd: 0.2, elbow: 0.4 } });
    lite.rotation.y = 0.1 * Math.sin(ph);
  };
}
