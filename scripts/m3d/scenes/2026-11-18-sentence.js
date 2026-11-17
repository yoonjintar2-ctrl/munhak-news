// 11/18 오늘의 문장 「난장이가 쏘아올린 작은 공」: 철거를 앞둔 산동네 골목. 키 작은 아버지가 멀리 공장 굴뚝 쪽을 올려다보고, 곁의 맏아들이 아버지 어깨에 손을 얹는다. 빨랫줄 빨래가 흔들리고 굴뚝 연기가 오르며 작은 공 하나가 하늘로 떴다 내려온다
export const secs = 3;
export const opts = { bg: 0xeeece7, fog: [0xe8e6e1, 40, 150] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dcd9d1', line: '#d2cfc7', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 41 });
  // 판잣집 두 채(왼쪽·오른쪽 뒤)
  const sh = (x, z, w, c) => { K.box(w, 2.2, 2.2, c, x, 1.1, z, scene); const r = K.box(w + 0.5, 0.14, 2.7, 0x3a3936, x, 2.3, z, scene); r.rotation.x = 0.12; K.box(0.7, 1.4, 0.05, 0x2a2a28, x + w * 0.2, 0.7, z + 1.12, scene); K.box(0.6, 0.5, 0.05, 0xeeeeea, x - w * 0.25, 1.4, z + 1.12, scene); };
  sh(-5.2, -6.5, 3.2, 0xb4b1a9); sh(4.8, -7.5, 2.8, 0x9e9b94);
  // 멀리 공장과 굴뚝
  K.box(10, 3, 3, 0x8e8b85, 2, 1.5, -26, scene); [[-1, 0.6], [3, 0.5], [6, 0.55]].forEach(([x, r]) => K.cyl(r * 0.8, r, 10, 0x6e6c67, x, 5, -26, scene, 12));
  const smoke = []; for (let i = 0; i < 6; i++) { const s = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.8, 10, 8), K.lam(0xc9c7c1)), 80); scene.add(s); smoke.push(s); }
  // 빨랫줄
  K.cyl(0.05, 0.05, 2.8, 0x2f2e2b, -4.2, 1.4, -3.6, scene, 6); K.cyl(0.05, 0.05, 2.8, 0x2f2e2b, -1.4, 1.4, -4.4, scene, 6); K.line([[-4.2, 2.75, -3.6], [-1.4, 2.75, -4.4]], scene);
  const wash = []; for (let i = 0; i < 3; i++) { const g = new THREE.Group(); g.position.set(-3.7 + i * 0.85, 2.75, -3.75 - i * 0.24); scene.add(g); K.box(0.6, 0.8, 0.04, i % 2 ? 0x55534e : 0xeceae4, 0, -0.42, 0, g); wash.push(g); }
  // 항아리, 연탄 더미
  K.cyl(0.35, 0.28, 0.7, 0x4a4945, 3.2, 0.35, -4.5, scene, 12); K.cyl(0.3, 0.24, 0.6, 0x5a5954, 3.9, 0.3, -4.2, scene, 12);
  for (let i = 0; i < 3; i++) K.cyl(0.22, 0.22, 0.3, 0x2a2a28, 2.4 + i * 0.1, 0.15 + i * 0.3, -5.2, scene, 10);
  // 아버지(작게) · 아들 — 둘 다 뒤 굴뚝 쪽(-z)을 바라봄, 비스듬히
  const F = K.person(scene, { x: 0.3, z: -2.0, rot: 0.25, coat: 0x4a4945, pants: 0x2a2a28, hair: 'cap', scale: 0.62 });
  const S = K.person(scene, { x: 1.05, z: -2.15, rot: 0.55, coat: 0xa9a69e, pants: 0x3a3936, hair: 'short', scale: 0.95 });
  const ball = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), K.lam(0xf4f2ee)), 60); scene.add(ball);
  cam.position.set(3.4, 2.9, 5.6); cam.lookAt(0.2, 1.6, -3.4);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), up = K.win(ph, 0.1, 0.7, 0.15), hand = K.win(ph, 0.35, 0.95, 0.1);
    F.pose({ headPitch: 0.15 + 0.35 * up, headYaw: -0.15, armL: { fwd: 0.1, elbow: 0.3 }, armR: { fwd: 0.2 + 1.6 * up, out: 0.1, elbow: 0.4 } });
    S.pose({ headYaw: 0.75 * hand, headPitch: -0.35 * hand, torsoYaw: 0.2 * hand, armL: { fwd: 0.9 * hand, out: -0.15, elbow: 0.6 }, armR: { fwd: 0.1, elbow: 0.3 } });
    ball.position.set(-1.0, 2.4 + 1.8 * Math.sin(Math.PI * up), -2.8);
    wash.forEach((g, i) => { g.rotation.x = 0.25 * Math.sin(ph + i); });
    smoke.forEach((s, i) => { const v = (u + i / 6) % 1; const x = [-1, 3, 6][i % 3]; s.position.set(x + v * 2, 10 + v * 6, -26); s.scale.setScalar(0.6 + v * 1.4); });
  };
}
