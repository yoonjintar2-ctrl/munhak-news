// 11/24 「화수분」 장면②(after 2): 기와집 대문 앞, 머릿수건 쓴 노파가 어린 큰딸의 손을 잡고 오른쪽(+x)으로 걸어 나가고(rot -2.0), 아기를 업은 어멈이 대문가에서 손을 뻗는다(rot -1.4). 담 위 마른 가지·빨랫줄 흔들림. 진행 방향 +x. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dcd9d1', line: '#d2cfc7', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 2406, near: false });
  // 돌담 + 기와 대문
  for (let i = 0; i < 9; i++) for (let j = 0; j < 3; j++) K.box(0.95, 0.5, 0.5, (i + j) % 2 ? 0x9a978f : 0xaeaba3, -7 + i * 1.0 + (j % 2) * 0.4, 0.25 + j * 0.5, -3.4, scene);
  K.box(9.5, 0.25, 0.8, 0x3a3936, -2.8, 1.62, -3.4, scene);
  [-2.0, 0.4].forEach(x => K.box(0.3, 2.8, 0.3, 0x55534e, x, 1.4, -3.3, scene));
  K.box(3.2, 0.3, 1.2, 0x262626, -0.8, 2.9, -3.3, scene);
  const gate = K.box(1.1, 2.3, 0.08, 0x6e6c66, -1.4, 1.15, -3.05, scene); gate.rotation.y = 0.9;
  // 마른 나무·빨랫줄
  const tw = []; K.cyl(0.1, 0.18, 3.2, 0x45443f, -4.5, 1.6, -4.4, scene, 8); for (let i = 0; i < 4; i++) { const b = K.cyl(0.03, 0.05, 1.2, 0x45443f, -4.5 + (i % 2 ? 0.4 : -0.4), 2.6 + i * 0.3, -4.4, scene, 6); b.rotation.z = i % 2 ? -0.7 : 0.7; tw.push(b); }
  K.line([[-6, 2.4, -4.0], [-2.6, 2.2, -4.0]], scene); const cloth = []; [-5.2, -4.2, -3.3].forEach((x, i) => { const c = K.box(0.6, 0.7, 0.03, [0xeeece6, 0xbcb9b1, 0xd8d5cd][i], x, 1.95, -4.0, scene); cloth.push(c); });
  // 어멈(아기 업음) — 대문가
  const W = K.person(scene, { x: -1.0, z: -2.3, rot: -1.9, coat: 0x8a8782, pants: 0x55534e, hair: 'bun', scale: 0.92, scarf: 0xeeece6 });
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.7, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0x55534e, side: THREE.DoubleSide })), 40); sk.position.y = 1.1; W.root.add(sk);
  const bb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), K.lam(0xbcb9b1)), 30); bb.position.set(0, 2.7, 0.55); W.root.add(bb);
  const bh = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), K.lam(0xdcd6ce)), 30); bh.position.set(0, 3.2, 0.6); W.root.add(bh);
  // 노파 + 큰딸
  const O = K.person(scene, { x: 1.8, z: -1.5, rot: -2.1, coat: 0x45443f, pants: 0x2f2e2b, hair: 'bun', scale: 0.88, scarf: 0xd8d5cd });
  const kc = new THREE.Mesh(new THREE.SphereGeometry(0.36, 14, 10, 0, Math.PI * 2, 0, Math.PI / 1.7), K.lam(0xd8d5cd)); K.inked(kc, 30); kc.position.y = 0.08; O.headG.add(kc);
  const G = K.person(scene, { x: 0.9, z: -1.3, rot: -2.4, coat: 0x6e6c66, pants: 0x3a3936, hair: 'long', scale: 0.55 });
  cam.position.set(0.0, 2.2, 5.8); cam.lookAt(0.1, 1.5, -2.2);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), s = Math.sin(ph * 4);
    O.pose({ bob: 0.03 * Math.abs(s), headYaw: 0.2, armR: { fwd: 0.3 * s }, armL: { fwd: 0.5, out: 0.25, elbow: 0.3 } });
    G.pose({ bob: 0.02 * Math.abs(s), headYaw: 1.1 + 0.2 * Math.sin(ph), torsoYaw: 0.3, armR: { fwd: 0.6, out: 0.3 }, armL: { fwd: 0.4 * s } });
    W.pose({ lean: -0.1, armR: { fwd: 1.5 + 0.1 * Math.sin(ph * 2), out: 0.2, elbow: 0.2 }, armL: { fwd: 0.5, elbow: 1.2 }, headPitch: -0.1 });
    tw.forEach((b, i) => { b.rotation.x = 0.06 * Math.sin(ph * 2 + i); });
    cloth.forEach((c, i) => { c.rotation.x = 0.25 * Math.sin(ph * 2 + i * 0.7); });
  };
}
