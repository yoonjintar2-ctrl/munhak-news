// 11/19 1분 고전 「사랑손님과 어머니」 대표: 기와집 마당. 오른쪽 사랑방 툇마루 앞에 선 아저씨가 그림책을 펼쳐 들고, 곁의 어린 옥희가 발돋움해 들여다본다. 왼쪽 안채 문간의 어머니가 달걀 바구니를 든 채 그쪽을 바라보다 고개를 돌린다. 감나무 잎이 흔들리고 잎 하나가 떨어진다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xeae8e2, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dedbd3', line: '#d4d1c9', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 35 });
  const hanok = (x, z, w, rot) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot; scene.add(g);
    K.box(w, 0.5, 2.6, 0xb8b5ad, 0, 0.25, 0, g); K.box(w, 0.12, 1.0, 0x6e6c66, 0, 0.9, 1.0, g);
    K.box(w - 0.4, 2.4, 0.2, 0xf0eee8, 0, 1.9, -0.4, g); for (let i = 0; i < 4; i++) K.box(0.12, 2.4, 0.25, 0x45443f, -w / 2 + 0.3 + i * (w - 0.6) / 3, 1.9, -0.3, g);
    const rf = K.box(w + 1.4, 0.3, 3.8, 0x3a3936, 0, 3.4, 0.1, g); rf.rotation.x = 0.0; const rr = K.box(w + 1.6, 0.6, 1.0, 0x2e2d2a, 0, 3.7, 0.1, g);
    [-1, 1].forEach(sd => { const e = K.box(w + 1.6, 0.18, 1.6, 0x3a3936, 0, 3.25, sd * 1.5 + 0.1, g); e.rotation.x = sd * -0.35; });
    return g; };
  hanok(4.0, -6.0, 5.0, -0.25); hanok(-5.2, -6.6, 4.4, 0.3);
  K.box(0.9, 0.4, 0.6, 0x55534e, 2.2, 0.2, -3.6, scene); // 섬돌
  // 감나무
  const tr = new THREE.Group(); tr.position.set(-0.4, 0, -8.5); scene.add(tr); K.cyl(0.25, 0.35, 3.6, 0x4a4945, 0, 1.8, 0, tr, 8);
  const lv = []; for (let i = 0; i < 6; i++) { const m = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.9, 10, 8), K.lam(0x8f8c85)), 70); m.position.set(Math.cos(i) * 1.1, 4.2 + (i % 2) * 0.6, Math.sin(i) * 0.6); tr.add(m); lv.push(m); }
  [[0.6, 4.0, 0.7], [-0.9, 4.6, 0.5], [0.2, 5.0, -0.2]].forEach(([x, y, z]) => { const p = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), K.lam(0x3a3936)); p.position.set(x, y, z + 0.6); tr.add(p); });
  const leaf = K.box(0.25, 0.03, 0.15, 0x6e6c66, 0, 0, 0, scene);
  // 사람: 아저씨(양복), 옥희(작게), 어머니(흰 저고리 + 치마)
  const A = K.person(scene, { x: 2.2, z: -2.6, rot: 2.0, coat: 0x3a3936, pants: 0x2a2a28, hair: 'short', scale: 0.98 });
  const book = new THREE.Group(); const bp = K.box(0.55, 0.04, 0.42, 0xf6f4ef, -0.28, 0, 0, book); bp.rotation.z = 0.15; const bq = K.box(0.55, 0.04, 0.42, 0xf6f4ef, 0.28, 0, 0, book); bq.rotation.z = -0.15; K.box(0.04, 0.06, 0.42, 0x2a2a28, 0, -0.02, 0, book);
  A.hold('R', book, { at: [0.1, -0.15, -0.25], rot: [Math.PI / 2, 0, 0] });
  const O = K.person(scene, { x: 1.0, z: -1.6, rot: -2.0, coat: 0x9a978f, pants: 0x55534e, hair: 'bun', scale: 0.55 });
  const M = K.person(scene, { x: -3.0, z: -2.4, rot: -1.9, coat: 0xe9e6df, pants: 0xe9e6df, hair: 'bun', scale: 0.92 });
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.95, 2.0, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x55534e, side: THREE.DoubleSide })), 40); sk.position.y = 1.0; M.root.add(sk);
  const bask = new THREE.Group(); K.cyl(0.42, 0.32, 0.38, 0x6e6c66, 0, 0, 0, bask, 14); [[-0.12, 0], [0.12, 0.05], [0, -0.12], [0.02, 0.12]].forEach(([x, z]) => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), K.lam(0xfbfaf6)); e.scale.y = 1.3; e.position.set(x, 0.22, z); bask.add(e); });
  M.hold('L', bask, { at: [0, -0.25, -0.1], rot: [0, 0, 0] });
  cam.position.set(-0.3, 3.0, 5.4); cam.lookAt(-0.2, 2.1, -3.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    const turn = K.win(ph, 0.45, 0.9, 0.12);
    A.pose({ headPitch: -0.4, headYaw: -0.25, lean: 0.12, armR: { fwd: 1.0 + 0.08 * Math.sin(ph * 2), out: -0.25, elbow: 0.9 }, armL: { fwd: 0.6, out: -0.3, elbow: 1.1 } });
    O.pose({ headPitch: 0.4, headYaw: 0.15 * Math.sin(ph * 2), bob: 0.05 + 0.05 * Math.abs(Math.sin(ph * 2)), armL: { fwd: 0.5, elbow: 0.4 }, armR: { fwd: 0.9 + 0.3 * Math.sin(ph * 2), elbow: 0.3 } });
    M.pose({ headYaw: -0.1 + 0.9 * turn, headPitch: -0.15 * turn, torsoYaw: 0.15 * turn, armL: { fwd: 0.35, elbow: 1.2 }, armR: { fwd: 0.2 + 0.6 * turn, elbow: 0.4 + 1.2 * turn } });
    lv.forEach((m, i) => { m.position.x = Math.cos(i) * 1.1 + 0.08 * Math.sin(ph + i); });
    leaf.position.set(-0.4 + 1.2 * u + 0.3 * Math.sin(ph * 3), 4.5 - 4.4 * u, -7.6 + 2 * u); leaf.rotation.set(ph * 2, ph, ph * 3);
  };
}
