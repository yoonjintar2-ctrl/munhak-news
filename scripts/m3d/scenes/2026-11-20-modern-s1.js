// 11/20 「미스터 방」 장면①: 길모퉁이. 왼쪽 키 큰 미군 장교(밝은 카키 군복, 군모)가 두 손을 벌리며 난처해하고, 오른쪽 신기료장수(진한 옷, 모자)가 연장 상자 곁에서 일어나 손짓하며 말을 건넨다. 뒤에서 아이가 기웃거리고 처마 끝 등이 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 40, 130] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#e2dfd7', line: '#d8d5cd', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 62 });
  K.box(16, 2.4, 0.4, 0xd4d1c9, 0, 1.2, -6, scene); K.box(16.4, 0.3, 0.9, 0x55534e, 0, 2.5, -6, scene);
  K.box(1.4, 0.7, 0.8, 0x6e6c66, 2.8, 0.35, -2.2, scene); K.box(1.5, 0.08, 0.9, 0x45443f, 2.8, 0.72, -2.2, scene);
  const A = K.person(scene, { x: -1.3, z: -1.6, rot: -2.0, coat: 0xb8b5ad, pants: 0x8a8782, hair: 'short', scale: 1.08 });
  { const c = K.cyl(0.44, 0.46, 0.2, 0x8a8782, 0, 0.62, 0.02, A.headG, 16); c.scale.z = 0.8; } // 군모
  const S = K.person(scene, { x: 1.3, z: -1.4, rot: 1.55, coat: 0x45443f, pants: 0x2e2d2a, hair: 'cap', scale: 0.88 });
  const C = K.person(scene, { x: -3.6, z: -3.8, rot: 2.6, coat: 0x77756f, pants: 0x3a3936, hair: 'short', scale: 0.5 });
  const lamp = new THREE.Group(); lamp.position.set(-4.5, 2.4, -5.6); scene.add(lamp); K.cyl(0.01, 0.01, 0.6, 0x333333, 0, -0.3, 0, lamp, 4); const lb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), K.lam(0xf2f0ea)), 40); lb.scale.y = 1.3; lb.position.y = -0.8; lamp.add(lb);
  cam.position.set(0.0, 2.9, 6.0); cam.lookAt(0.0, 2.0, -1.8);
  return (t, ph) => {
    const shrug = 0.5 + 0.5 * Math.sin(ph * 2), talk = Math.sin(ph * 4);
    A.pose({ headTilt: 0.15 * Math.sin(ph), headPitch: -0.05, armL: { fwd: 0.9, out: 0.4 + 0.3 * shrug, elbow: 0.9 }, armR: { fwd: 0.9, out: 0.4 + 0.3 * shrug, elbow: 0.9 } });
    S.pose({ lean: -0.1, headPitch: -0.15, armR: { fwd: 1.2 + 0.25 * talk, out: 0.1, elbow: 0.6, point: true }, armL: { fwd: 0.5 + 0.2 * Math.sin(ph * 2), elbow: 1.0 } });
    C.pose({ headYaw: 0.4 * Math.sin(ph), torsoYaw: 0.2, armL: { fwd: 0.2 }, armR: { fwd: 0.3, elbow: 0.4 } });
    lamp.rotation.z = 0.15 * Math.sin(ph * 2);
  };
}
