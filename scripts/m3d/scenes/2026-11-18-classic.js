// 11/18 1분 고전 「목걸이」 대표: 장관의 무도회. 목걸이를 건 마틸드(진한 드레스, 흰 목걸이)가 샹들리에 아래에서 천천히 돌고, 양옆의 연미복 신사 둘이 그녀를 바라보며 손을 내밀어 춤을 청한다. 샹들리에가 흔들리고 뒤에서 한 쌍이 춤춘다
export const secs = 3;
export const opts = { bg: 0xeceae5, fog: [0xe6e4df, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dedbd3', line: '#d4d1c9', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 72 });
  // 기둥 두 개, 커튼, 화분
  [-5.2, 5.2].forEach(x => { K.cyl(0.4, 0.45, 7, 0xd2cfc7, x, 3.5, -6.5, scene, 16); K.box(1.2, 0.4, 1.2, 0xb8b5ad, x, 0.2, -6.5, scene); });
  K.box(2.6, 5.5, 0.1, 0x6a6964, 0, 3.6, -7.6, scene);
  [-3.6, 3.6].forEach(x => { K.cyl(0.35, 0.28, 0.7, 0x45443f, x, 0.35, -5.6, scene, 12); const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.6, 10, 8), K.lam(0x5e5d58)), 60); b.position.set(x, 1.2, -5.6); scene.add(b); });
  // 샹들리에
  const ch = new THREE.Group(); ch.position.set(0, 6.6, -3.8); scene.add(ch); K.cyl(0.02, 0.02, 1.2, 0x1f1f1d, 0, -0.6, 0, ch, 4); K.cyl(1.0, 0.6, 0.15, 0x3a3936, 0, -1.3, 0, ch, 16);
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const c = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), K.flat(0xffffff)); c.position.set(Math.cos(a) * 0.95, -1.15, Math.sin(a) * 0.95); ch.add(c); }
  // 마틸드(가운데, 카메라를 향해 돎)
  const M = K.person(scene, { x: 0, z: -3.0, rot: Math.PI, coat: 0x3a3936, pants: 0x2a2a28, hair: 'long', scale: 0.95, scarf: 0xf6f5f1 });
  const skirt = K.inked(new THREE.Mesh(new THREE.ConeGeometry(1.0, 2.0, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x3a3936, side: THREE.DoubleSide })), 40); skirt.position.y = 1.0; M.root.add(skirt);
  // 신사 둘(양옆에서 마틸드를 향함)
  const G1 = K.person(scene, { x: -2.4, z: -2.4, rot: -Math.PI / 2 + 0.15, coat: 0x2a2a28, pants: 0x1f1f1d, hair: 'short', scale: 1.0 });
  const G2 = K.person(scene, { x: 2.5, z: -2.6, rot: Math.PI / 2 - 0.15, coat: 0x55534e, pants: 0x2a2a28, hair: 'short', scale: 1.0 });
  // 뒤에서 춤추는 한 쌍
  const pair = new THREE.Group(); pair.position.set(2.0, 0, -6.0); scene.add(pair);
  const D1 = K.person(pair, { x: -0.45, z: 0, rot: -Math.PI / 2, coat: 0x2a2a28, hair: 'short', scale: 0.8, detail: false });
  const D2 = K.person(pair, { x: 0.45, z: 0, rot: Math.PI / 2, coat: 0x8a8782, hair: 'bun', scale: 0.78, detail: false });
  cam.position.set(0.3, 3.4, 5.4); cam.lookAt(0, 2.3, -3.0);
  return (t, ph) => {
    ch.rotation.z = 0.04 * Math.sin(ph); ch.rotation.y = 0.2 * Math.sin(ph);
    M.root.rotation.y = Math.PI + 0.35 * Math.sin(ph); skirt.rotation.y = 0.5 * Math.sin(ph); skirt.scale.set(1 + 0.08 * Math.abs(Math.sin(ph)), 1, 1 + 0.08 * Math.abs(Math.sin(ph)));
    M.pose({ headYaw: -0.3 * Math.sin(ph), headPitch: 0.1, headTilt: 0.1 * Math.sin(ph), armL: { fwd: 0.4, out: 0.5, elbow: 0.6 }, armR: { fwd: 0.4, out: 0.5, elbow: 0.6 } });
    const a1 = K.win(ph, 0.05, 0.55, 0.12), a2 = K.win(ph, 0.5, 0.98, 0.12);
    G1.pose({ headPitch: 0.05, headYaw: -0.2, armR: { fwd: 0.4 + 0.9 * a1, out: 0.1, elbow: 0.5 }, armL: { fwd: 0.1, elbow: 0.8 } });
    G2.pose({ headPitch: 0.05, headYaw: 0.2, armL: { fwd: 0.4 + 0.9 * a2, out: 0.1, elbow: 0.5 }, armR: { fwd: 0.1, elbow: 0.8 } });
    pair.rotation.y = ph; [D1, D2].forEach(d => d.pose({ armL: { fwd: 1.0, elbow: 0.6 }, armR: { fwd: 1.0, elbow: 0.6 } }));
  };
}
