// 11/25 오늘의 사나이 로런스 르뮤(3D 삽화, 실제 인물 아님): 거센 회색 바다 위 1인승 요트(핀급)에서 구명조끼 차림 선수가 배 앞쪽으로 몸을 내밀어, 앞(카메라 쪽) 물속 사람에게 오른팔을 뻗는다. 선수 rot π-0.9(얼굴 카메라 쪽 왼편, 옆모습으로 몸 내밂이 보이게). 뒤편에 뒤집힌 배와 또 한 사람, 바람에 휜 돛·물결·물보라·갈매기. 세로 720×860
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 100], fov: 42, w: 720, h: 860 };
export default function (K) {
  const { THREE, scene, cam } = K;
  // 바다
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(120, 80), K.lam(0xaeaba3)); sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0, -20); scene.add(sea);
  K.backdrop(scene, { kind: 'shore', seed: 2541 });
  const waves = []; for (let i = 0; i < 40; i++) { const w = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.5 + (i % 3) * 0.2, 0.35, 4), K.lam([0xbcb9b1, 0x9a978f, 0xc8c5bd][i % 3])), 50); w.scale.set(2.2, 1, 0.7); scene.add(w); waves.push({ w, x: -9 + (i * 2.3) % 18, z: 3 - (i * 1.7) % 20, k: i * 0.7 }); }
  // 요트
  const boat = new THREE.Group(); boat.position.set(0.3, 0.3, -2.2); boat.rotation.y = 0.3; scene.add(boat);
  K.box(1.7, 0.6, 3.4, 0xeeece6, 0, 0.0, 0.3, boat); const bow = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.4, 4), K.lam(0xeeece6)), 30); bow.rotation.set(-Math.PI / 2, Math.PI / 4, 0); bow.scale.set(1, 1, 0.42); bow.position.set(0, 0.0, -2.1); boat.add(bow);
  K.box(1.72, 0.08, 3.42, 0x55534e, 0, 0.32, 0.3, boat);
  K.cyl(0.06, 0.08, 6.2, 0x3a3936, 0, 3.1, -0.9, boat, 8);
  const sail = new THREE.Group(); sail.position.set(0, 0.6, -0.9); boat.add(sail);
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 5.4, 0, 0, 0, 3.0], 3)); sg.computeVertexNormals();
  const sm = new THREE.Mesh(sg, new THREE.MeshLambertMaterial({ color: 0xf6f5f1, side: THREE.DoubleSide })); sail.add(sm); K.line([[0, 0, 0], [0, 5.4, 0], [0, 0, 3.0], [0, 0, 0]], sail);
  K.box(0.06, 0.06, 3.0, 0x2f2e2b, 0, 0, 1.5, sail);
  // 선수(구명조끼)
  const A = K.athlete(boat, { x: 0, z: 1.1, rot: Math.PI - 0.9, kind: 'runner', scale: 0.8, top: 0x55534e, bottom: 0x2a2a2a });
  A.root.position.y = 0.35;
  const vest = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.58, 0.9, 16), K.lam(0x2f2e2b)), 30); vest.position.y = 0.95; A.torso.add(vest);
  // 물속 사람 둘(머리·팔만), 뒤집힌 배
  const swim = []; [[-1.1, 0.1, 0], [-3.2, -5.5, 1]].forEach(([x, z, i]) => { const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g);
    const hd = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 10), K.lam(0xdcd6ce)), 60); hd.position.y = 0.3; g.add(hd);
    const hr = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.45), K.lam(0x262626)); hr.position.y = 0.33; g.add(hr);
    const vv = K.cyl(0.42, 0.42, 0.25, 0x3a3936, 0, 0.05, 0, g, 14);
    const arm = new THREE.Group(); arm.position.set(0.25, 0.2, 0); g.add(arm); K.cyl(0.08, 0.08, 0.9, 0x55534e, 0, 0.45, 0, arm, 8); const hh = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), K.lam(0xdcd6ce)); hh.position.y = 0.92; arm.add(hh);
    swim.push({ g, arm, i }); });
  const cap = new THREE.Group(); cap.position.set(-4.2, 0, -7.5); cap.rotation.set(0, 0.6, 1.9); scene.add(cap);
  const ch = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), K.lam(0x8a8782)), 30); ch.scale.set(1.0, 0.45, 2.1); cap.add(ch); K.cyl(0.05, 0.05, 4.5, 0x3a3936, 0, -2.2, 0, cap, 6);
  // 물보라 · 갈매기
  const spray = []; for (let i = 0; i < 10; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 4), K.flat(0xfbfaf6)); scene.add(s); spray.push({ s, k: i / 10, a: i * 2.4 }); }
  const gull = K.bird(scene, { cx: 0, cy: 9, cz: -10, rx: 6, rz: 2, s: 0.7 });
  cam.position.set(1.0, 3.6, 9.4); cam.lookAt(0.2, 1.9, -1.2);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), reach = 0.7 + 0.3 * Math.sin(ph);
    boat.rotation.z = 0.12 * Math.sin(ph * 2); boat.rotation.x = 0.05 * Math.sin(ph * 2 + 1); boat.position.y = 0.3 + 0.12 * Math.sin(ph * 2);
    sail.rotation.y = 0.5 + 0.08 * Math.sin(ph * 3);
    A.pose({ lean: -0.55 * reach, headPitch: 0.35, armR: { fwd: 1.0 + 0.3 * reach, elbow: 0.15, out: 0.05 }, armL: { fwd: 0.5, elbow: 1.0, out: 0.35 }, legL: { fwd: -0.2, knee: 0.6 }, legR: { fwd: 0.5, knee: 1.0 }, bob: -0.3 });
    swim.forEach(o => { o.g.position.y = 0.08 * Math.sin(ph * 2 + o.i * 2) - 0.05; o.arm.rotation.z = -0.3 + 0.25 * Math.sin(ph * 3 + o.i * 2); o.arm.rotation.x = -0.3; });
    waves.forEach(o => { o.w.position.set(o.x + 0.6 * Math.sin(ph + o.k), 0.08 + 0.12 * Math.sin(ph * 2 + o.k), o.z); });
    spray.forEach(o => { const v = (o.k + u * 2) % 1; o.s.position.set(-0.6 + Math.cos(o.a) * v * 1.2, 0.2 + Math.sin(v * Math.PI) * 1.0, 0.2 + Math.sin(o.a) * v * 0.6); });
    gull.update(ph);
  };
}
