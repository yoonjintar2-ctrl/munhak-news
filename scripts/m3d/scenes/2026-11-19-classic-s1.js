// 11/19 「사랑손님과 어머니」 장면①: 사립문 앞. 오른쪽 달걀 장수(지게를 진 노인)가 달걀 바구니를 내밀고, 왼쪽 어머니가 두 손으로 달걀을 받는다. 그 곁에서 옥희가 발돋움하며 들여다본다. 싸리 울타리 너머 닭이 고개를 까딱이고, 장수의 수건 끝이 바람에 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xeae8e2, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dedbd3', line: '#d4d1c9', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 41 });
  // 싸리 울타리 + 사립문 기둥
  for (let i = 0; i < 26; i++) { const x = -7 + i * 0.32; if (x > -0.6 && x < 1.2) continue; K.cyl(0.05, 0.06, 2.0 + (i % 3) * 0.2, 0x6e6c66, x, 1.0, -5.0, scene, 5); }
  K.box(14, 0.1, 0.1, 0x55534e, 0, 1.4, -4.95, scene); K.cyl(0.14, 0.16, 2.8, 0x45443f, -0.7, 1.4, -5.0, scene, 8); K.cyl(0.14, 0.16, 2.8, 0x45443f, 1.3, 1.4, -5.0, scene, 8);
  // 장독대(왼쪽 안)
  [[-4.6, -6.2, 0.7], [-3.6, -6.4, 0.55], [-5.4, -6.6, 0.5]].forEach(([x, z, r]) => { const j = K.inked(new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), K.lam(0x3a3936)), 50); j.scale.y = 1.2; j.position.set(x, r * 1.1, z); scene.add(j); K.cyl(r * 0.6, r * 0.6, 0.12, 0x2a2a28, x, r * 2.3, z, scene, 12); });
  // 닭
  const hen = new THREE.Group(); hen.position.set(3.6, 0, -6.0); scene.add(hen); const hb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 10), K.lam(0xf2f0ea)), 50); hb.scale.set(1.3, 1, 0.9); hb.position.y = 0.5; hen.add(hb);
  const hh = new THREE.Group(); hh.position.set(-0.45, 0.85, 0); hen.add(hh); const hd = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), K.lam(0xf2f0ea)); hh.add(hd); const cb = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.16), K.lam(0x2a2a28)); cb.position.y = 0.18; hh.add(cb); const bk = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 6), K.lam(0x55534e)); bk.rotation.z = Math.PI / 2; bk.position.x = -0.2; hh.add(bk);
  // 달걀 장수 + 지게
  const P = K.person(scene, { x: 2.3, z: -2.4, rot: 1.75, coat: 0x8a8782, pants: 0x55534e, hair: 'short', scale: 0.92, scarf: 0xf2f0ea });
  const jige = new THREE.Group(); jige.position.set(0, 0.2, 0.75); P.torso.add(jige); [-0.45, 0.45].forEach(x => K.cyl(0.06, 0.06, 3.0, 0x45443f, x, 0.6, 0, jige, 6)); [0.0, 0.9, 1.6].forEach(y => K.box(1.0, 0.06, 0.06, 0x45443f, 0, y, 0, jige)); K.box(1.1, 0.6, 0.8, 0x6e6c66, 0, 0.5, 0.35, jige);
  const band = new THREE.Group(); band.position.set(0, 0.62, 0.3); P.headG.add(band); K.cyl(0.43, 0.43, 0.1, 0xf2f0ea, 0, 0, -0.3, band, 16); const tail = K.box(0.08, 0.4, 0.12, 0xf2f0ea, 0, -0.2, 0.2, band);
  const bask = new THREE.Group(); K.cyl(0.4, 0.3, 0.3, 0x6e6c66, 0, 0, 0, bask, 14); [[-0.12, 0], [0.12, 0.05], [0, -0.12], [0.05, 0.12], [-0.1, 0.1]].forEach(([x, z]) => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), K.lam(0xfbfaf6)); e.scale.y = 1.3; e.position.set(x, 0.18, z); bask.add(e); });
  P.hold('R', bask, { at: [0, -0.2, -0.2], rot: [0, 0, 0] });
  // 어머니 + 옥희
  const M = K.person(scene, { x: -1.0, z: -2.2, rot: -1.6, coat: 0x9a978f, pants: 0x55534e, hair: 'bun', scale: 0.9 });
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.95, 2.0, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x45443f, side: THREE.DoubleSide })), 40); sk.position.y = 1.0; M.root.add(sk);
  const egg = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), K.lam(0xfbfaf6)); egg.scale.y = 1.3; M.hold('R', egg, { at: [0.05, -0.15, -0.05] });
  const O = K.person(scene, { x: -1.7, z: -1.0, rot: -2.0, coat: 0x6e6c66, pants: 0x45443f, hair: 'bun', scale: 0.5 });
  cam.position.set(0.4, 2.8, 5.0); cam.lookAt(0.5, 1.9, -3.4);
  return (t, ph) => {
    const take = K.win(ph, 0.15, 0.85, 0.15);
    P.pose({ headPitch: -0.2, lean: 0.12, armR: { fwd: 0.9 + 0.35 * take, out: -0.1, elbow: 0.4 }, armL: { fwd: 0.4, elbow: 1.2 } });
    M.pose({ headPitch: -0.3, lean: 0.1, armR: { fwd: 0.8 + 0.4 * take, out: -0.15, elbow: 0.5 - 0.3 * take }, armL: { fwd: 0.8 + 0.4 * take, out: 0.1, elbow: 0.5 } });
    const tip = Math.abs(Math.sin(ph * 2));
    O.pose({ bob: 0.12 * tip, headPitch: 0.3, armL: { fwd: 0.6, elbow: 0.4 }, armR: { fwd: 0.3 + 0.4 * tip, elbow: 0.3 } });
    hh.rotation.z = 0.35 * Math.max(0, Math.sin(ph * 4)); hh.position.x = -0.45 - 0.08 * Math.max(0, Math.sin(ph * 4));
    tail.rotation.x = 0.4 * Math.sin(ph * 2);
  };
}
