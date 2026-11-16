// 11/17 오늘의 문장 「레디메이드 인생」: 이른 아침 인쇄소 문 앞. 아버지 P가 아들의 손을 놓고 돌아서려다 고개를 돌려 아들을 보고, 아들은 문 앞에서 손을 든다. 처마 간판(글자 없음)이 흔들리고 굴뚝 연기·새가 움직인다. (진행 방향 없음, 인물은 서로 마주 봄)
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xe8e6e0, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3ca', line: '#cbc8bf', tiles: 4, repeat: 5 });
  K.backdrop(scene, { kind: 'town', seed: 71 });
  // 인쇄소 건물(정면) + 문 + 창 + 처마
  K.box(9, 5.2, 3, 0xcfccc4, -1.5, 2.6, -7.5, scene);
  K.box(1.6, 3.0, 0.1, 0x3a3936, -1.0, 1.5, -5.95, scene);
  K.box(2.2, 1.4, 0.1, 0x5a5853, 2.0, 2.6, -5.95, scene); K.box(0.06, 1.4, 0.12, 0xeeeeea, 2.0, 2.6, -5.9, scene);
  K.box(2.2, 1.4, 0.1, 0x5a5853, -4.3, 2.6, -5.95, scene);
  K.box(9.6, 0.25, 1.4, 0x4a4945, -1.5, 5.3, -5.6, scene);
  // 굴뚝
  K.box(0.7, 2.0, 0.7, 0x6a6964, 1.8, 6.2, -8, scene);
  const puffs = []; for (let i = 0; i < 5; i++) { const p = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.45, 10, 8), K.lam(0xf2f0eb)), 80); scene.add(p); puffs.push(p); }
  // 매달린 간판(도형만)
  const sg = new THREE.Group(); sg.position.set(-3.0, 4.9, -5.3); scene.add(sg);
  K.line([[0, 0, 0], [0, -0.5, 0]], sg); const plate = K.box(1.4, 0.8, 0.08, 0x45443f, 0, -0.9, 0, sg);
  const gear = K.cyl(0.25, 0.25, 0.1, 0xe8e6e0, 0, -0.9, 0.06, sg, 8); gear.rotation.x = Math.PI / 2;
  // 문 옆 종이 묶음(인쇄 종이 더미)과 손수레
  K.box(1.2, 0.5, 0.8, 0xf0eee8, 1.0, 0.25, -5.2, scene); K.box(1.1, 0.4, 0.7, 0xe2e0d9, 1.0, 0.7, -5.2, scene);
  K.box(1.6, 0.5, 1.0, 0x5a5853, 4.6, 0.8, -4.6, scene); [[3.9, -4.1], [5.3, -4.1]].forEach(([x, z]) => { const w = K.cyl(0.4, 0.4, 0.1, 0x2f2e2b, x, 0.4, z, scene, 14); w.rotation.x = Math.PI / 2; });
  // 아버지(왼쪽, 중절모 대신 cap, 진한 두루마기 느낌) — 오른쪽(아들)을 향해 서 있다가 돌아섬
  const F = K.person(scene, { x: -2.4, z: -2.6, rot: -1.57, coat: 0x3d3c39, pants: 0x55534e, hair: 'cap', scale: 1.0 });
  // 아들(문 앞, 작게) — 아버지를 바라봄
  const S = K.person(scene, { x: -0.4, z: -4.2, rot: 2.1, coat: 0x8e8b84, pants: 0x3e3d3a, hair: 'short', scale: 0.68 });
  const bird = K.bird(scene, { cx: 0, cy: 9, cz: -14, rx: 9, rz: 3, s: 0.9 });
  cam.position.set(0.6, 3.4, 6.4); cam.lookAt(-1.0, 2.2, -3.6);
  return (t, ph) => {
    const turn = K.win(ph, 0.35, 0.95, 0.12), wave = K.win(ph, 0.45, 0.9, 0.08);
    F.root.rotation.y = -1.57 - 1.1 * turn;
    F.pose({ headYaw: 1.0 * turn, headPitch: -0.12, torsoYaw: -0.3 * turn, armL: { fwd: 0.5 * (1 - turn), elbow: 0.4 }, armR: { fwd: 0.15, elbow: 0.3 } });
    S.pose({ headYaw: 0.0, headPitch: 0.15, armR: { fwd: 2.2 * wave + 0.6 * (1 - turn), elbow: 0.6 + 0.4 * Math.sin(ph * 8) * wave }, armL: { fwd: 0.1, elbow: 0.3 } });
    sg.rotation.z = 0.12 * Math.sin(ph); sg.rotation.x = 0.05 * Math.sin(ph * 2);
    puffs.forEach((p, i) => { const u = ((ph / (Math.PI * 2)) + i / 5) % 1; p.position.set(1.8 + u * 1.6, 7.3 + u * 3.2, -8); p.scale.setScalar(0.6 + u * 1.2); });
    bird.update(ph);
  };
}
