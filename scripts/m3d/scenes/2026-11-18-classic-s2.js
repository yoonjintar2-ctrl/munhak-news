// 11/18 「목걸이」 장면②: 무도회에서 돌아온 밤의 현관 방. 마틸드가 두 손으로 빈 목을 더듬으며 굳어 서 있고, 외투를 걸치던 남편이 돌아보며 문 쪽을 가리킨다. 열린 문이 바람에 흔들리고 촛불이 일렁인다
export const secs = 3;
export const opts = { bg: 0xe2e0da, fog: [0xdcdad4, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfcbc1', line: '#c6c2b8', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 81 });
  // 거울 달린 서랍장 + 촛대, 옷걸이, 문
  K.box(1.8, 1.4, 0.7, 0x45443f, -3.2, 0.7, -5.4, scene); K.box(1.2, 1.6, 0.08, 0x2a2a28, -3.2, 2.4, -5.7, scene); K.box(1.0, 1.4, 0.05, 0xd8d6d0, -3.2, 2.4, -5.65, scene);
  K.cyl(0.08, 0.1, 0.4, 0x2a2a28, -2.6, 1.6, -5.3, scene, 8); const fl = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 8), K.flat(0xffffff)), 1); fl.position.set(-2.6, 1.92, -5.3); scene.add(fl);
  K.cyl(0.05, 0.05, 3.0, 0x2a2a28, 2.0, 1.5, -5.8, scene, 6); K.box(0.6, 1.0, 0.1, 0x6a6964, 2.0, 2.4, -5.7, scene);
  K.box(0.2, 4.0, 0.3, 0x3a3936, 4.6, 2.0, -4.2, scene); const door = new THREE.Group(); door.position.set(4.5, 0, -4.2); scene.add(door); K.box(1.6, 3.8, 0.12, 0x6e6c67, -0.8, 1.9, 0, door);
  const M = K.person(scene, { x: -0.6, z: -2.8, rot: Math.PI - 0.25, coat: 0x3a3936, pants: 0x2a2a28, hair: 'long', scale: 0.92, scarf: 0xeeeeea });
  const skirt = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.95, 1.9, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0x3a3936, side: THREE.DoubleSide })), 40); skirt.position.y = 0.95; M.root.add(skirt);
  const H = K.person(scene, { x: 1.9, z: -3.2, rot: Math.PI / 2 + 0.4, coat: 0x8a8782, pants: 0x3a3936, hair: 'short', scale: 0.98 });
  cam.position.set(0.4, 3.2, 5.0); cam.lookAt(0.3, 2.0, -3.2);
  return (t, ph) => {
    const feel = K.win(ph, 0.05, 0.7, 0.12), pt = K.win(ph, 0.4, 0.95, 0.1);
    M.pose({ headPitch: -0.25 * feel, headYaw: 0.15 * Math.sin(ph * 3) * feel, armL: { fwd: 1.0 + 0.3 * feel, out: -0.25, elbow: 1.9 }, armR: { fwd: 1.0 + 0.3 * feel, out: -0.25, elbow: 1.9 } });
    H.pose({ headYaw: -0.9 * pt, headPitch: 0.05, torsoYaw: -0.3 * pt, armR: { fwd: 0.2, elbow: 0.4 }, armL: { fwd: 1.5 * pt, out: 0.4 * pt, elbow: 0.15, point: pt > 0.5 } });
    door.rotation.y = -0.3 - 0.15 * Math.sin(ph); fl.scale.y = 1 + 0.3 * Math.sin(ph * 8);
  };
}
