// 11/24 「화수분」 장면③(after 4): 눈 쌓인 시골 길, 아기를 업은 어멈이 보따리를 들고 바람을 맞으며 오른쪽(+x)으로 걸어간다(rot -2.0, 얼굴 진행 방향). 길가 장승·앙상한 나무·흩날리는 눈(바람 방향 -x → 맞바람). 진행 방향 +x. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#e6e4de', line: '#dcdad4', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2407, near: false });
  K.box(30, 0.03, 2.0, 0xd2cfc7, 0, 0.02, -1.6, scene);
  // 장승 둘
  [[-3.6, 0x6e6c66], [-2.9, 0x8a8782]].forEach(([x, c]) => { K.cyl(0.28, 0.32, 2.8, c, x, 1.4, -3.4, scene, 10); K.cyl(0.36, 0.36, 0.25, 0x3a3936, x, 2.9, -3.4, scene, 10); K.box(0.3, 0.06, 0.05, 0x262626, x, 2.3, -3.1, scene); });
  // 앙상한 나무 셋
  const br = []; [[2.8, -4.6], [5.0, -5.4], [-6, -5]].forEach(([x, z]) => { K.cyl(0.12, 0.2, 3.4, 0x45443f, x, 1.7, z, scene, 8); for (let i = 0; i < 4; i++) { const b = K.cyl(0.03, 0.05, 1.3, 0x45443f, x + (i % 2 ? 0.45 : -0.45), 2.6 + i * 0.35, z, scene, 6); b.rotation.z = i % 2 ? -0.7 : 0.7; br.push(b); } });
  // 눈 덮인 짚단
  K.cyl(0.6, 0.7, 1.0, 0x9a978f, 4.2, 0.5, -2.8, scene, 12); K.cyl(0.62, 0.3, 0.4, 0xeeece6, 4.2, 1.2, -2.8, scene, 12);
  // 어멈
  const W = K.person(scene, { x: 0, z: -1.5, rot: -2.0, coat: 0x6e6c66, pants: 0x45443f, hair: 'bun', scale: 1.0, scarf: 0xeeece6 });
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.7, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0x45443f, side: THREE.DoubleSide })), 40); sk.position.y = 1.1; W.root.add(sk);
  const bb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), K.lam(0xbcb9b1)), 30); bb.position.set(0, 2.7, 0.55); W.root.add(bb);
  const bh = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), K.lam(0xdcd6ce)), 30); bh.position.set(0, 3.2, 0.6); W.root.add(bh);
  const bundle = K.box(0.55, 0.45, 0.45, 0xbcb9b1, 0, 0, 0, scene); W.hold('L', bundle, { at: [0, -0.35, 0] });
  const snow = []; for (let i = 0; i < 90; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 4), K.flat(0xffffff)); scene.add(s); snow.push({ s, y: (i * 0.377) % 5.5, z: -4 + (i * 0.41) % 7, k: (i * 0.137) % 1 }); }
  cam.position.set(0.3, 2.3, 6.0); cam.lookAt(0.2, 1.6, -2.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), s = Math.sin(ph * 4);
    W.pose({ lean: -0.18, headPitch: -0.25, bob: 0.03 * Math.abs(s), armL: { fwd: 0.2 + 0.1 * s, elbow: 0.3 }, armR: { fwd: 1.2, elbow: 1.8, out: -0.2 } });
    br.forEach((b, i) => { b.rotation.x = 0.08 * Math.sin(ph * 3 + i); });
    snow.forEach(o => { const v = (o.k + u * 2) % 1; o.s.position.set(7 - v * 14, o.y + 0.5 - v * 0.6 + 0.2 * Math.sin(ph * 3 + o.k * 9), o.z); });
  };
}
