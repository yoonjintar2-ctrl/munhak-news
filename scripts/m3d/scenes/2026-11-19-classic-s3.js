// 11/19 「사랑손님과 어머니」 장면③: 밤, 등잔불 켠 안방. 어머니가 풍금 앞에 서서 두 손으로 건반을 누르며 몸을 앞뒤로 살짝 흔들고, 곁의 옥희가 어머니 치맛자락을 붙잡고 올려다본다. 등잔불이 일렁이고 풍금 위 악보 종이가 들썩인다. 카메라 고정(비스듬히 옆에서)
export const secs = 3;
export const opts = { bg: 0x8f8d88, fog: [0x8a8883, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#a8a39a', line: '#9e998f', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 72, night: true });
  // 풍금(나무 상자 + 흰 건반 + 검은 건반)
  const org = new THREE.Group(); org.position.set(0.6, 0, -4.4); scene.add(org);
  K.box(3.0, 2.0, 1.2, 0x3a3936, 0, 1.0, 0, org); K.box(3.0, 1.4, 0.4, 0x2e2d2a, 0, 2.7, -0.4, org); K.box(2.6, 0.08, 0.5, 0xf6f4ef, 0, 2.05, 0.55, org);
  for (let i = 0; i < 12; i++) K.box(0.08, 0.08, 0.3, 0x111111, -1.2 + i * 0.22, 2.12, 0.45, org);
  const sheet = K.box(0.8, 0.6, 0.03, 0xf6f4ef, 0, 3.0, -0.15, org); sheet.rotation.x = -0.25;
  // 등잔(오른쪽 반닫이 위)
  K.box(1.8, 1.4, 1.0, 0x45443f, 4.0, 0.7, -5.0, scene); K.cyl(0.08, 0.12, 0.8, 0x2a2a28, 4.0, 1.8, -5.0, scene, 8); K.cyl(0.22, 0.18, 0.15, 0x55534e, 4.0, 2.25, -5.0, scene, 12);
  const fl = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.35, 8), K.flat(0xffffff)), 1); fl.position.set(4.0, 2.5, -5.0); scene.add(fl);
  const glow = new THREE.Mesh(new THREE.CircleGeometry(0.6, 24), new THREE.MeshBasicMaterial({ color: 0xf3f1ea, transparent: true, opacity: 0.15 })); glow.position.set(4.0, 2.5, -5.6); scene.add(glow);
  const pl = new THREE.PointLight(0xffffff, 1.2, 14); pl.position.set(4.0, 2.7, -4.6); scene.add(pl);
  // 어머니(풍금 앞, 등이 조금 보이게) + 옥희
  const M = K.person(scene, { x: 0.4, z: -2.9, rot: 0.2, coat: 0xb8b5ad, pants: 0x55534e, hair: 'bun', scale: 0.9 });
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.95, 2.0, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x45443f, side: THREE.DoubleSide })), 40); sk.position.y = 1.0; M.root.add(sk);
  const O = K.person(scene, { x: 2.0, z: -2.2, rot: 0.9, coat: 0x8a8782, pants: 0x45443f, hair: 'bun', scale: 0.5 });
  cam.position.set(3.0, 3.0, 4.2); cam.lookAt(0.8, 2.0, -3.6);
  return (t, ph) => {
    const s = Math.sin(ph * 2), s4 = Math.sin(ph * 4);
    M.pose({ lean: 0.18 + 0.05 * s, headPitch: -0.15 + 0.08 * s, headYaw: 0.1, armL: { fwd: 1.25 + 0.06 * s4, out: -0.05, elbow: 0.7 }, armR: { fwd: 1.25 - 0.06 * s4, out: -0.05, elbow: 0.7 } });
    O.pose({ headPitch: 0.4, headYaw: 0.2, armL: { fwd: 0.7, out: -0.2, elbow: 0.3 }, armR: { fwd: 0.3, elbow: 0.4 } });
    fl.scale.set(1 + 0.15 * Math.sin(ph * 7), 1 + 0.3 * Math.sin(ph * 9), 1); pl.intensity = 1.1 + 0.2 * Math.sin(ph * 9); glow.material.opacity = 0.12 + 0.06 * Math.sin(ph * 7);
    sheet.rotation.x = -0.25 + 0.05 * Math.sin(ph * 3);
  };
}
