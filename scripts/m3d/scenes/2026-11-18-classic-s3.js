// 11/18 「목걸이」 장면③: 가난한 십 년. 허름한 뒷마당 우물가에서 앞치마 두른 마틸드가 허리를 굽혀 빨래통의 빨래를 비틀어 짜고, 빨랫줄의 빨래가 바람에 흔들린다. 지붕 위 굴뚝 연기와 비둘기
export const secs = 3;
export const opts = { bg: 0xeeece7, fog: [0xe8e6e1, 40, 150] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d5cc', line: '#cecbc2', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 27 });
  // 뒷벽(허름한 건물), 굴뚝
  K.box(12, 6, 0.6, 0xb4b1a9, 0, 3, -8, scene); for (let i = 0; i < 3; i++) K.box(1.0, 1.3, 0.05, 0x55534e, -3.5 + i * 3.5, 4.2, -7.68, scene);
  K.box(0.7, 2.0, 0.7, 0x6a6964, 3.6, 7, -8, scene);
  const smoke = []; for (let i = 0; i < 5; i++) { const s = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), K.lam(0xd0cec8)), 80); scene.add(s); smoke.push(s); }
  // 우물, 빨래통, 양동이
  K.cyl(0.9, 0.9, 1.0, 0x8a8782, -3.4, 0.5, -4.8, scene, 18); K.cyl(0.05, 0.05, 2.2, 0x2a2a28, -4.2, 1.6, -4.8, scene, 6); K.cyl(0.05, 0.05, 2.2, 0x2a2a28, -2.6, 1.6, -4.8, scene, 6); K.box(1.9, 0.12, 0.12, 0x2a2a28, -3.4, 2.7, -4.8, scene);
  K.cyl(0.8, 0.65, 0.6, 0x5a5954, 0.4, 0.3, -2.6, scene, 18); K.cyl(0.3, 0.25, 0.5, 0x3a3936, 1.8, 0.25, -2.2, scene, 12);
  // 빨랫줄
  K.cyl(0.05, 0.05, 3.0, 0x2f2e2b, 1.6, 1.5, -5.4, scene, 6); K.cyl(0.05, 0.05, 3.0, 0x2f2e2b, 5.4, 1.5, -5.0, scene, 6); K.line([[1.6, 2.95, -5.4], [5.4, 2.95, -5.0]], scene);
  const wash = []; for (let i = 0; i < 4; i++) { const g = new THREE.Group(); g.position.set(2.1 + i * 0.85, 2.95, -5.35 + i * 0.09); scene.add(g); K.box(0.6, 0.85, 0.04, i % 2 ? 0x55534e : 0xeceae4, 0, -0.45, 0, g); wash.push(g); }
  const M = K.person(scene, { x: 0.4, z: -3.8, rot: Math.PI - 0.3, coat: 0x55534e, pants: 0x2a2a28, hair: 'bun', scale: 0.9 });
  const cloth = K.box(0.9, 0.18, 0.18, 0xeceae4, 0, 0, 0, scene);
  const bird = K.bird(scene, { cx: 0, cy: 8.5, cz: -10, rx: 6, rz: 2, s: 0.7 });
  cam.position.set(0.9, 2.8, 3.6); cam.lookAt(0.2, 1.7, -3.6);
  return (t, ph) => {
    const tw = Math.sin(ph * 2);
    M.pose({ lean: 0.35, headPitch: -0.35, headYaw: 0.1 * Math.sin(ph), armL: { fwd: 0.7, out: -0.35, elbow: 0.5 + 0.2 * tw }, armR: { fwd: 0.7, out: -0.35, elbow: 0.5 - 0.2 * tw } });
    cloth.position.set(0.4, 1.85, -3.0); cloth.rotation.x = 0.6 * tw;
    wash.forEach((g, i) => { g.rotation.x = 0.25 * Math.sin(ph + i); });
    smoke.forEach((s, i) => { const v = (ph / (Math.PI * 2) + i / 5) % 1; s.position.set(3.6 + v * 1.5, 8.2 + v * 4, -8); s.scale.setScalar(0.5 + v); });
    bird.update(ph);
  };
}
