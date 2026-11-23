// 11/24 오늘의 문장 피천득 「인연」: 늦가을 목조 주택 대문 앞, 모자를 손에 든 중년 사내(왼쪽, +x 쪽을 보며 rot -2.0)가 고개 숙여 인사하고, 대문가 여인(오른쪽, rot 2.0)이 마주 고개를 숙인다. 담 너머 나뭇가지 흔들림·낙엽. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeae8e2, fog: [0xe6e4de, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d5cd', line: '#cfccc4', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 2401, near: false });
  // 나무 담장 + 지붕 얹은 대문
  for (let i = 0; i < 20; i++) K.box(0.32, 2.2, 0.12, i % 2 ? 0x9a978f : 0x8a8782, -6 + i * 0.34, 1.1, -3.2, scene);
  K.box(2.6, 0.2, 1.0, 0x45443f, 3.0, 3.0, -3.1, scene); K.box(2.9, 0.12, 1.2, 0x3a3936, 3.0, 3.15, -3.1, scene);
  [1.9, 4.1].forEach(x => K.box(0.25, 3.0, 0.25, 0x55534e, x, 1.5, -3.1, scene));
  const door = K.box(1.0, 2.6, 0.08, 0x6e6c66, 2.5, 1.3, -3.05, scene);
  // 담 너머 나무 두 그루 + 석등
  const crowns = []; [-3.6, 0.6].forEach((x, i) => { K.cyl(0.15, 0.22, 3.2, 0x45443f, x, 1.6, -4.6, scene, 8); const c = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.3, 12, 10), K.lam(i ? 0x8a8782 : 0x77756f)), 30); c.position.set(x, 3.8, -4.6); scene.add(c); crowns.push(c); });
  K.box(0.5, 0.9, 0.5, 0xbcb9b1, -4.6, 0.45, -1.8, scene); K.box(0.8, 0.15, 0.8, 0x9a978f, -4.6, 1.0, -1.8, scene); K.box(0.45, 0.4, 0.45, 0xd8d5cd, -4.6, 1.3, -1.8, scene);
  // 인물
  const M = K.person(scene, { x: -1.5, z: -1.2, rot: -2.0, coat: 0x45443f, pants: 0x2f2e2b, hair: 'short', scale: 1.0 });
  const hat = new THREE.Group(); K.cyl(0.36, 0.36, 0.04, 0x262626, 0, 0, 0, hat, 16); K.cyl(0.22, 0.24, 0.24, 0x262626, 0, 0.13, 0, hat, 16); M.hold('R', hat, { at: [0, -0.2, 0.12], rot: [Math.PI / 2, 0, 0] });
  const W = K.person(scene, { x: 2.0, z: -1.6, rot: 2.1, coat: 0x9a978f, pants: 0x6e6c66, hair: 'bun', scale: 0.9, scarf: 0xeeece6 });
  const leaves = []; for (let i = 0; i < 10; i++) { const l = K.box(0.14, 0.02, 0.09, i % 2 ? 0x55534e : 0x8a8782, 0, 0, 0, scene); leaves.push({ l, k: i / 10, x: -3.5 + (i * 0.83) % 7 }); }
  cam.position.set(0.2, 2.3, 5.6); cam.lookAt(0.2, 1.6, -2.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), bow = K.win(ph, 0.15, 0.55, 0.12), bow2 = K.win(ph, 0.25, 0.65, 0.12);
    M.pose({ lean: -0.45 * bow, headPitch: -0.3 * bow, armR: { fwd: 0.5, elbow: 1.0, out: 0.05 }, armL: { fwd: 0.1 } });
    W.pose({ lean: -0.35 * bow2, headPitch: -0.3 * bow2, armL: { fwd: 0.5, elbow: 1.4, out: -0.2 }, armR: { fwd: 0.5, elbow: 1.4, out: -0.2 } });
    crowns.forEach((c, i) => { c.rotation.z = 0.05 * Math.sin(ph * 2 + i); });
    door.rotation.y = 0.06 * Math.sin(ph);
    leaves.forEach(o => { const v = (o.k + u) % 1; o.l.position.set(o.x + 0.6 * Math.sin(ph * 2 + o.k * 9), 4.2 - v * 4.1, -2.2 + o.k * 1.5); o.l.rotation.set(ph * 3 + o.k * 7, ph * 2, ph + o.k); });
  };
}
