// 11/17 1분 고전 「외투」 장면②: 새 외투(진한 옷 + 밝은 털 깃)를 입은 아카키가 관청 복도 가운데 서 있고, 동료 셋이 둘러서서 손뼉 치고 깃을 가리키며 만져 본다. 아카키는 쑥스러워 고개를 숙였다 든다. 외투걸이의 다른 외투가 흔들리고 창으로 눈발
export const secs = 3;
export const opts = { bg: 0xedebe5, fog: [0xe7e5df, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d2c8', line: '#cac6bc', tiles: 4, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 58 });
  // 외투걸이(왼쪽) + 걸린 외투 둘
  K.cyl(0.07, 0.09, 5.0, 0x2f2e2b, -5.0, 2.5, -4.6, scene, 8); const hung = [0, 1].map(i => { const g = new THREE.Group(); g.position.set(-5.0 + (i ? 0.45 : -0.45), 4.8, -4.6); scene.add(g); const m = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.55, 2.2, 10), K.lam(i ? 0x6a6964 : 0x4a4945)), 40); m.position.y = -1.1; g.add(m); return g; });
  // 서류장, 벽시계(바늘만)
  K.box(2.0, 4.0, 0.9, 0x55534e, 5.0, 2.0, -6.2, scene);
  const clk = K.cyl(0.5, 0.5, 0.1, 0xf2f0ea, 1.5, 6.2, -6.9, scene, 20); clk.rotation.x = Math.PI / 2; const hand = new THREE.Group(); hand.position.set(1.5, 6.2, -6.8); scene.add(hand); K.line([[0, 0, 0], [0, 0.4, 0]], hand);
  // 아카키(가운데, 새 외투 진한 + 털 깃)
  const A = K.person(scene, { x: 0, z: -3.0, rot: Math.PI + 0.2, coat: 0x2c2b29, pants: 0x55534e, hair: 'short', scale: 0.95, scarf: 0xe2dfd8 });
  // 동료 셋(둘러섬, 옷 밝기 다르게)
  const C = [[-2.4, -2.0, -2.3, 0x7a7872, 'short'], [2.4, -1.8, 2.2, 0x9a9892, 'cap'], [1.2, -5.2, 0.6 + Math.PI, 0x5e5c57, 'short']].map(([x, z, r, c, h]) => K.person(scene, { x, z, rot: r, coat: c, pants: 0x2a2a28, hair: h, scale: 0.92 }));
  const flakes = K.motes(scene, { n: 18, box: [6, 4, 1], z0: -7.2, size: 0.1 });
  cam.position.set(0.4, 4.6, 6.4); cam.lookAt(0, 2.6, -3.0);
  return (t, ph) => {
    const shy = K.win(ph, 0.1, 0.5, 0.1);
    A.pose({ headPitch: -0.35 * shy + 0.05, headYaw: 0.4 * Math.sin(ph), armL: { fwd: 0.6 + 0.3 * shy, elbow: 1.4 }, armR: { fwd: 0.4, elbow: 0.6 } });
    const clap = Math.max(0, Math.sin(ph * 8));
    C[0].pose({ headYaw: 0.1, armL: { fwd: 1.2, out: -0.25 - 0.15 * clap, elbow: 0.9 }, armR: { fwd: 1.2, out: -0.25 - 0.15 * clap, elbow: 0.9 } });
    const pt = K.win(ph, 0.3, 0.8, 0.08);
    C[1].pose({ headYaw: -0.1, headPitch: 0.1, lean: 0.1 * pt, armL: { fwd: 1.5 * pt + 0.2, elbow: 0.3, point: pt > 0.5 }, armR: { fwd: 0.2, elbow: 0.4 } });
    C[2].pose({ headYaw: 0.2 * Math.sin(ph * 2), armR: { fwd: 1.1 + 0.2 * Math.sin(ph * 3), elbow: 1.0 }, armL: { fwd: 0.3, elbow: 1.6 } });
    hung.forEach((g, i) => g.rotation.z = 0.06 * Math.sin(ph + i * 2));
    hand.rotation.z = -ph; flakes.update(ph);
  };
}
