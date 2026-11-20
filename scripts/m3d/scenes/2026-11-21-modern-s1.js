// 11/21 카버 장면①(after 2): 병실. 침대에 머리에 붕대를 감고 잠든 소년, 왼쪽 의자에 앉은 어머니가 몸을 숙여 아이 손을 쥐고, 오른쪽 창가에 선 아버지가 팔짱을 끼고 창밖을 본다. 링거 병이 흔들리고 창 블라인드 끈이 흔들리며, 모니터 점이 깜박인다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 291 });
  K.box(10, 0.2, 7, 0xe2dfd7, 0, 0, -3, scene); K.box(10, 5, 0.3, 0xeeece6, 0, 2.5, -6.5, scene);
  // 창 + 블라인드
  K.box(2.4, 2.2, 0.06, 0xfbfaf6, 3.0, 3.0, -6.3, scene); for (let i = 0; i < 7; i++) K.box(2.4, 0.04, 0.08, 0xa8a59e, 3.0, 2.0 + i * 0.3, -6.25, scene); const cord = K.cyl(0.015, 0.015, 1.2, 0x3a3936, 0, -0.6, 0, new THREE.Group()); const cg = new THREE.Group(); cg.position.set(4.1, 3.9, -6.2); scene.add(cg); cg.add(cord);
  // 침대 + 소년
  K.box(3.6, 0.7, 1.8, 0x8a8782, 0, 0.6, -3.4, scene); K.box(3.5, 0.25, 1.7, 0xf4f2ec, 0, 1.05, -3.4, scene); K.box(0.9, 0.3, 1.2, 0xfbfaf6, -1.3, 1.3, -3.4, scene); K.box(0.15, 1.4, 1.8, 0x55534e, -1.85, 1.0, -3.4, scene);
  const head = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), K.lam(0xdcd6ce)), 40); head.position.set(-1.25, 1.7, -3.4); scene.add(head);
  const hair = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x2a2a28)), 40); hair.position.set(-1.35, 1.68, -3.4); hair.rotation.z = 1.2; scene.add(hair); K.cyl(0.36, 0.36, 0.14, 0xfbfaf6, -1.25, 1.7, -3.4, scene, 16).rotation.z = 1.3; // 붕대
  const quilt = K.box(2.4, 0.35, 1.6, 0xc8c3b8, 0.4, 1.35, -3.4, scene);
  // 링거
  K.cyl(0.03, 0.03, 3.2, 0x3a3936, -2.4, 1.6, -4.4, scene, 6); const ivg = new THREE.Group(); ivg.position.set(-2.4, 3.2, -4.4); scene.add(ivg); K.box(0.25, 0.4, 0.12, 0xf4f2ec, 0, -0.25, 0, ivg);
  // 모니터
  K.box(0.8, 0.6, 0.4, 0x3a3936, 2.2, 2.6, -5.8, scene); const dot = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), K.flat(0xffffff)); dot.position.set(2.0, 2.6, -5.58); scene.add(dot);
  // 어머니(의자, 왼쪽 앞) / 아버지(창가)
  K.box(0.9, 0.1, 0.9, 0x55534e, -2.6, 0.9, -2.2, scene);
  const M = K.person(scene, { x: -2.6, z: -2.2, rot: -1.0, coat: 0x6e6c66, pants: 0x45443f, hair: 'long', scale: 0.85 }); M.root.position.y = -0.5;
  const F = K.person(scene, { x: 3.0, z: -4.8, rot: 0.3, coat: 0x45443f, pants: 0x2a2a28, hair: 'short', scale: 0.95 });
  cam.position.set(0.8, 3.0, 4.6); cam.lookAt(0.2, 1.6, -3.4);
  return (t, ph) => {
    M.pose({ lean: -0.25, headPitch: 0.3 + 0.08 * Math.sin(ph), armR: { fwd: 1.0, elbow: 0.4 }, armL: { fwd: 0.9, elbow: 0.6 } });
    F.pose({ headPitch: -0.05, headYaw: 0.15 * Math.sin(ph), armL: { fwd: 0.9, out: -0.5, elbow: 1.9 }, armR: { fwd: 0.9, out: -0.5, elbow: 1.9 } });
    ivg.rotation.z = 0.08 * Math.sin(ph * 2); cg.rotation.z = 0.15 * Math.sin(ph * 2 + 1);
    dot.position.x = 2.0 + 0.3 * ((ph / (Math.PI * 2) * 3) % 1); dot.position.y = 2.6 + 0.12 * Math.max(0, Math.sin(ph * 12));
    quilt.position.y = 1.35 + 0.02 * Math.sin(ph * 2);
  };
}
