// 11/16 오늘의 소설 「변신」: 새벽빛 드는 좁은 하숙방. 침대 이불이 크게 불룩 솟아 꿈틀거리고(벌레는 그리지 않음 — 카프카의 당부), 협탁의 자명종이 떨며 울린다. 창가 커튼이 흔들리고 벽에 작은 액자, 의자 위 견본 가방
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d2cec4', line: '#c6c2b8', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 15 });
  // 침대(가운데 왼쪽) + 이불 불룩
  K.box(4.2, 0.8, 6.0, 0x5d5b56, -2.0, 0.5, -2.6, scene); K.box(4.4, 2.2, 0.25, 0x45443f, -2.0, 1.4, -5.6, scene); K.box(4.4, 1.3, 0.25, 0x45443f, -2.0, 0.9, 0.4, scene);
  K.box(1.8, 0.4, 0.9, 0xf1efe9, -2.0, 1.1, -4.8, scene);
  const quilt = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.6, 22, 14, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0xd9d6ce)), 50); quilt.scale.set(1.2, 0.9, 1.6); quilt.position.set(-2.0, 0.9, -2.4); scene.add(quilt);
  K.box(4.2, 0.12, 5.4, 0xd9d6ce, -2.0, 0.95, -2.5, scene);
  // 협탁 + 자명종(종 둘, 다리)
  K.box(1.2, 1.4, 1.0, 0x4a4945, 1.4, 0.7, -4.4, scene);
  const clk = new THREE.Group(); clk.position.set(1.4, 1.75, -4.3); scene.add(clk);
  const face = K.cyl(0.38, 0.38, 0.22, 0x3a3936, 0, 0, 0, clk, 20); face.rotation.x = Math.PI / 2; const dial = new THREE.Mesh(new THREE.CircleGeometry(0.3, 20), K.flat(0xf4f2ea)); dial.position.z = 0.12; clk.add(dial);
  K.line([[0, 0, 0.13], [0, 0.22, 0.13]], clk); K.line([[0, 0, 0.13], [0.15, -0.05, 0.13]], clk);
  const bells = [-1, 1].map(sd => { const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x2f2f2c)), 30); b.position.set(sd * 0.25, 0.38, 0); b.rotation.z = -sd * 0.5; clk.add(b); return b; });
  // 창(오른쪽 벽면 쪽은 backdrop 창) 앞 커튼 두 폭
  const cur = [4.0, 8.0].map(x => { const g = new THREE.Group(); g.position.set(x, 7.0, -6.5); scene.add(g); const m = K.inked(new THREE.Mesh(new THREE.PlaneGeometry(1.4, 4.2, 1, 6), new THREE.MeshLambertMaterial({ color: 0xa8a59d, side: THREE.DoubleSide })), 1); m.position.y = -2.1; g.add(m); return g; });
  // 의자 + 견본 가방
  K.box(1.2, 0.12, 1.2, 0x4a4945, 4.6, 1.2, -2.2, scene); [[4.1, -2.7], [5.1, -2.7], [4.1, -1.7], [5.1, -1.7]].forEach(([x, z]) => K.box(0.1, 1.2, 0.1, 0x3a3936, x, 0.6, z, scene)); K.box(1.2, 1.3, 0.1, 0x4a4945, 4.6, 1.9, -2.75, scene);
  K.box(1.0, 0.7, 0.45, 0x2f2e2b, 4.6, 1.62, -2.1, scene); K.box(0.4, 0.1, 0.1, 0x1f1f1d, 4.6, 2.05, -2.1, scene);
  // 옷걸이에 걸린 외투, 바닥 신발
  K.cyl(0.05, 0.05, 4.2, 0x3a3936, -5.8, 2.1, -5.2, scene, 6); const coat = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, 2.0, 10), K.lam(0x45443f)), 40); coat.position.set(-5.8, 3.0, -5.0); scene.add(coat);
  K.box(0.35, 0.2, 0.8, 0x1f1f1d, 2.6, 0.1, -1.0, scene); K.box(0.35, 0.2, 0.8, 0x1f1f1d, 3.1, 0.1, -0.9, scene);
  const dust = K.motes(scene, { n: 20, box: [8, 5, 5], z0: -6, size: 0.06 });
  cam.position.set(1.0, 4.4, 7.6); cam.lookAt(0.0, 1.6, -3.0);
  return (t, ph) => {
    const ring = K.win(ph, 0.05, 0.55, 0.05);
    clk.rotation.z = ring * 0.08 * Math.sin(ph * 40); clk.position.x = 1.4 + ring * 0.03 * Math.sin(ph * 33);
    bells.forEach((b, i) => b.position.y = 0.38 + ring * 0.03 * Math.sin(ph * 40 + i * 3));
    const wr = K.win(ph, 0.35, 0.95, 0.12);
    quilt.scale.set(1.2 + 0.08 * wr * Math.sin(ph * 6), 0.9 + 0.15 * wr * Math.sin(ph * 4 + 1), 1.6); quilt.rotation.y = 0.12 * wr * Math.sin(ph * 3);
    cur.forEach((g, i) => { g.rotation.x = 0.08 * Math.sin(ph + i); g.rotation.z = 0.04 * Math.sin(ph * 2 + i); });
    dust.update(ph);
  };
}
