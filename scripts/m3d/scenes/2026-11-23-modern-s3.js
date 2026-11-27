// 11/23 『82년생 김지영』 장면③(after 5): 가을 공원 벤치, 유모차 곁에 앉은 여인이 커피 잔을 든 채 고개를 돌리고, 멀리 정장 차림 두 사람이 이쪽을 보며 수군댄다. 낙엽이 떨어지고 유모차 바람개비가 돈다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3cb', line: '#ccc9c1', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'city', seed: 2334, near: false });
  const trees = []; [-4.5, 0.5, 5.0].forEach(x => { K.cyl(0.18, 0.26, 3, 0x45443f, x, 1.5, -5.5, scene, 8); const c = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 10), K.lam(0x9a978f)), 30); c.position.set(x, 3.8, -5.5); scene.add(c); trees.push(c); });
  // 벤치
  K.box(2.6, 0.1, 0.7, 0x6e6c66, -1.2, 0.9, -1.4, scene); K.box(2.6, 0.6, 0.08, 0x6e6c66, -1.2, 1.3, -1.75, scene); [-2.3, -0.1].forEach(x => K.box(0.1, 0.9, 0.6, 0x3a3936, x, 0.45, -1.4, scene));
  const W = K.person(scene, { x: -1.6, z: -1.3, rot: Math.PI, coat: 0xa8a59e, pants: 0x45443f, hair: 'bob', scale: 0.95 });
  const wg = new THREE.Group(); wg.position.y = -0.7; scene.add(wg); wg.add(W.root);
  const cup = K.cyl(0.09, 0.07, 0.22, 0xf2f0ea, 0, 0, 0, scene, 12); W.hold('R', cup, { at: [0, -0.12, 0.05] });
  // 유모차 + 바람개비
  const st = new THREE.Group(); st.position.set(0.6, 0, -1.0); scene.add(st); K.box(0.9, 0.6, 1.2, 0x55534e, 0, 0.9, 0, st); const hood = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x45443f)), 30); hood.position.set(0, 1.2, -0.4); hood.rotation.x = -0.6; st.add(hood);
  [[-0.4, -0.5], [0.4, -0.5], [-0.4, 0.5], [0.4, 0.5]].forEach(([x, z]) => K.cyl(0.18, 0.18, 0.06, 0x1e1e1e, x, 0.2, z, st, 12).rotation.z = Math.PI / 2);
  K.cyl(0.02, 0.02, 0.6, 0x3a3936, 0.4, 1.5, 0.5, st, 6); const pin = new THREE.Group(); pin.position.set(0.4, 1.8, 0.55); st.add(pin); for (let i = 0; i < 4; i++) { const b = K.box(0.25, 0.08, 0.01, 0xfbfaf6, 0.12, 0, 0); const g = new THREE.Group(); g.rotation.z = i * Math.PI / 2; g.add(b); pin.add(g); }
  // 멀리 정장 두 사람(여인 쪽을 봄)
  const A = K.person(scene, { x: 3.2, z: -4.0, rot: 0.6 + Math.PI, coat: 0x2f2e2b, pants: 0x2f2e2b, hair: 'short', scale: 0.95 });
  const B = K.person(scene, { x: 4.2, z: -4.2, rot: 1.0 + Math.PI, coat: 0x45443f, pants: 0x2f2e2b, hair: 'bob', scale: 0.92 });
  const leaves = []; for (let i = 0; i < 14; i++) { const l = K.box(0.14, 0.02, 0.1, 0x77756f, 0, 0, 0, scene); leaves.push({ l, k: i / 14, x: -5 + (i * 0.83) % 10 }); }
  cam.position.set(0.4, 2.3, 5.2); cam.lookAt(0.2, 1.4, -2.5);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), turn = K.win(ph, 0.35, 0.8, 0.1);
    W.pose({ headYaw: -0.9 * turn, headPitch: 0.1, armR: { fwd: 1.2 - 0.3 * turn, elbow: 1.6 }, armL: { fwd: 0.7, elbow: 1.2, out: -0.1 } });
    A.pose({ headYaw: -0.4, torsoYaw: -0.2, armR: { fwd: 1.2, elbow: 2.0 }, armL: { fwd: 0.4 } });
    B.pose({ headYaw: 0.5 * Math.sin(ph * 2), armL: { fwd: 0.8, elbow: 1.4 }, armR: { fwd: 0.3 } });
    pin.rotation.z = ph * 6;
    leaves.forEach(o => { const v = (o.k + u) % 1; o.l.position.set(o.x + 0.4 * Math.sin(ph * 2 + o.k * 9), 4.5 - v * 4.4, -2.5 - o.k * 2); o.l.rotation.set(ph * 2 + o.k * 5, o.k * 3, ph); });
  };
}
