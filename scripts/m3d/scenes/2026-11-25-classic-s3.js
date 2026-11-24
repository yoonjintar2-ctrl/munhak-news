// 11/25 「달밤」 장면③(after 5): 밤 대문 앞, 수건이 포도 몇 송이를 두 손으로 내밀며 고개를 숙이고, 주인이 손을 뻗어 받으려 한다(둘이 마주 봄: 수건 rot 2.0, 주인 rot -2.0, 얼굴 카메라 쪽 비스듬). 처마 등불 흔들림, 달, 담 너머 가지 흔들림. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xd6d4ce, fog: [0xd2d0ca, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cbc8c0', line: '#c4c1b9', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2524, near: false });
  // 담·대문
  K.box(5, 2.0, 0.4, 0xd8d5cd, -3.4, 1.0, -3.4, scene); K.box(5, 2.0, 0.4, 0xd8d5cd, 4.4, 1.0, -3.4, scene);
  K.box(0.25, 2.8, 0.3, 0x45443f, -0.7, 1.4, -3.3, scene); K.box(0.25, 2.8, 0.3, 0x45443f, 1.6, 1.4, -3.3, scene);
  const dr = K.box(1.0, 2.3, 0.08, 0x6e6c66, -0.15, 1.15, -3.0, scene); dr.rotation.y = 0.7;
  const rf = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.01, 2.1, 0.9, 4, 1), K.lam(0x45443f)), 30); rf.rotation.y = Math.PI / 4; rf.scale.set(1.0, 1, 0.55); rf.position.set(0.45, 3.2, -3.3); scene.add(rf);
  const br = new THREE.Group(); br.position.set(-4.2, 2.0, -3.8); scene.add(br); K.cyl(0.08, 0.12, 2.6, 0x45443f, 0, 1.3, 0, br, 6); const bc = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.1, 12, 8), K.lam(0x8a8782)), 60); bc.position.y = 2.6; br.add(bc);
  const moon = new THREE.Mesh(new THREE.CircleGeometry(1.2, 32), K.flat(0xfbfaf6)); moon.position.set(5.5, 9, -22); scene.add(moon);
  const lantern = new THREE.Group(); lantern.position.set(1.4, 3.0, -2.7); scene.add(lantern); K.line([[0, 0, 0], [0, -0.4, 0]], lantern); K.cyl(0.24, 0.24, 0.48, 0xf2f0ea, 0, -0.65, 0, lantern, 12);
  // 수건(포도) · 주인
  const S = K.person(scene, { x: -1.1, z: -0.8, rot: 2.1, coat: 0x55534e, pants: 0x3a3936, hair: 'short', scale: 0.95 }); S.headG.scale.setScalar(1.3);
  const O = K.person(scene, { x: 1.3, z: -1.4, rot: -2.1, coat: 0xbcb9b1, pants: 0x55534e, hair: 'short', scale: 1.0 });
  const grapes = new THREE.Group(); for (let i = 0; i < 14; i++) { const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), K.lam(0x2f2e2b)), 60); const row = Math.floor(i / 4); b.position.set(((i % 4) - 1.5) * 0.15 * (1 - row * 0.2), -row * 0.14, (i % 2) * 0.06); grapes.add(b); }
  K.box(0.03, 0.15, 0.03, 0x45443f, 0, 0.1, 0, grapes);
  S.hold('R', grapes, { at: [0, -0.15, -0.05], rot: [Math.PI, 0, 0] });
  cam.position.set(0.2, 2.5, 6.6); cam.lookAt(0.1, 1.6, -1.3);
  return (t, ph) => {
    const off = K.win(ph, 0.1, 0.9, 0.15), take = K.win(ph, 0.35, 0.8, 0.12);
    S.pose({ lean: 0.25 * off, headPitch: -0.4 * off, armR: { fwd: 0.6 + 0.8 * off, elbow: 0.8 - 0.4 * off }, armL: { fwd: 0.6 + 0.7 * off, elbow: 0.8 - 0.3 * off } });
    O.pose({ headPitch: -0.2, headYaw: 0.1, armL: { fwd: 0.3 + 0.9 * take, elbow: 0.6 }, armR: { fwd: 0.3, elbow: 1.0 } });
    lantern.rotation.z = 0.12 * Math.sin(ph * 2); bc.rotation.z = 0.06 * Math.sin(ph * 2); bc.position.x = 0.08 * Math.sin(ph * 2);
  };
}
