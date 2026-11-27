// 11/23 「귀여운 여인」 장면③(after 5): 아침 골목, 책가방을 멘 소년 사샤가 앞서 +x(오른쪽)로 걸어가고(사샤 rot -π/2+조금 카메라 쪽) 머릿수건의 올렌카가 뒤따르며 손을 흔든다. 담장 너머 나뭇잎·새. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3cb', line: '#ccc9c1', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 2324, near: false });
  // 나무 울타리 + 나무 두 그루 + 우물
  for (let i = 0; i < 16; i++) K.box(0.25, 1.6, 0.1, 0x8a8782, -7 + i * 0.9, 0.8, -3.5, scene); K.box(14, 0.12, 0.1, 0x6e6c66, 0, 1.2, -3.45, scene);
  const leaves = []; [-3.5, 3.0].forEach((x, i) => { K.cyl(0.18, 0.25, 3, 0x45443f, x, 1.5, -4.8, scene, 8); const c = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.4, 12, 10), K.lam(0x77756f)), 30); c.position.set(x, 3.6, -4.8); scene.add(c); leaves.push(c); });
  K.cyl(0.7, 0.7, 0.8, 0x9a978f, 5.2, 0.4, -2.2, scene, 16);
  const S = K.person(scene, { x: 0.3, z: -1.2, rot: -2.0, coat: 0x45443f, pants: 0x2f2e2b, hair: 'cap', scale: 0.65 });
  const bag = K.box(0.7, 0.8, 0.3, 0xbcb9b1, 0, 1.0, 0.25, scene); S.root.add(bag); bag.position.set(0, 1.4, 0.3);
  const O = K.person(scene, { x: -2.0, z: -1.5, rot: -1.9, coat: 0x8a8782, pants: 0x6e6c66, hair: 'bun', scale: 0.9, scarf: 0xeeece6 });
  const B = K.bird(scene, { cx: 0, cy: 6, cz: -8, rx: 7, rz: 2, s: 0.8 });
  cam.position.set(0, 2.2, 6.0); cam.lookAt(-0.2, 1.4, -2.0);
  return (t, ph) => {
    const s = Math.sin(ph * 4), wave = K.win(ph, 0.2, 0.8, 0.1);
    S.pose({ bob: 0.04 * Math.abs(s), headYaw: 0.4 * K.win(ph, 0.4, 0.7, 0.1), armL: { fwd: 0.35 * s }, armR: { fwd: -0.35 * s }, legL: { fwd: 0.4 * s }, legR: { fwd: -0.4 * s } });
    O.pose({ headYaw: 0.1, armR: { fwd: 2.0 * wave, out: 0.4, elbow: 0.4 + 0.3 * Math.sin(ph * 8) * wave }, armL: { fwd: 0.6, elbow: 1.3 } });
    leaves.forEach((l, i) => { l.rotation.z = 0.05 * Math.sin(ph * 2 + i); l.position.x += 0.0; });
    B.update(ph);
  };
}
