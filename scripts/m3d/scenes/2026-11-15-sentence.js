// 11/15 오늘의 문장 「무진기행」: 안개 낀 시골 정류장, 버스에서 내린 양복 차림 사내가 가방을 들고 안개 속 마을 쪽을 바라본다. 버스는 서 있음(진행 방향 없음), 안개 띠가 흐르고 이정표 판이 흔들린다
export const secs = 3;
export const opts = { bg: 0xeeede8, fog: [0xe9e8e3, 14, 70] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d6cd', line: '#cbc9c0', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 51 });
  // 흙길
  const road = new THREE.Mesh(new THREE.PlaneGeometry(40, 3.2), K.lam(0xc9c6bc)); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.02, -1.6); scene.add(road);
  // 버스(왼쪽, 오른쪽을 향해 정차): 몸통 + 창 + 바퀴 + 앞 보닛
  const bus = new THREE.Group(); bus.position.set(-6.2, 0, -2.2); scene.add(bus);
  K.box(6.4, 2.4, 2.4, 0x8e8c86, 0, 1.75, 0, bus); K.box(1.3, 1.2, 2.2, 0x7d7b75, 3.8, 1.15, 0, bus);
  for (let i = 0; i < 4; i++) K.box(1.1, 0.8, 0.05, 0xdedcd5, -2.4 + i * 1.5, 2.3, 1.22, bus);
  [[-2, 1.2], [2.4, 1.2]].forEach(([x, z]) => { const w = K.cyl(0.55, 0.55, 0.3, 0x2c2c2a, x, 0.55, z, bus, 16); w.rotation.x = Math.PI / 2; });
  K.cyl(0.18, 0.18, 0.1, 0xf0efea, 4.46, 1.3, 0.7, bus, 12).rotation.z = Math.PI / 2;
  // 정류장 표지(글자 없는 둥근 판) — 바람에 흔들림
  const sg = new THREE.Group(); sg.position.set(1.6, 0, -0.6); scene.add(sg);
  K.cyl(0.07, 0.07, 3.2, 0x4a4a46, 0, 1.6, 0, sg, 8);
  const plate = new THREE.Group(); plate.position.set(0, 3.1, 0); sg.add(plate); K.cyl(0.5, 0.5, 0.08, 0xe4e2db, 0, -0.5, 0, plate, 20).rotation.x = Math.PI / 2;
  // 나무 의자 + 짐 보따리
  K.box(2.0, 0.12, 0.6, 0x6e6c66, 4.4, 0.8, -0.8, scene); [[-0.8], [0.8]].forEach(([a]) => K.box(0.1, 0.8, 0.5, 0x55544f, 4.4 + a, 0.4, -0.8, scene));
  K.box(0.7, 0.45, 0.5, 0x8a8882, 4.0, 1.1, -0.8, scene);
  // 전봇대 두 개와 전선
  [[7.5, -4], [-1, -7]].forEach(([x, z]) => K.cyl(0.12, 0.14, 7, 0x55544f, x, 3.5, z, scene, 8)); K.line([[7.5, 6.6, -4], [3, 6.0, -5.5], [-1, 6.6, -7]], scene);
  // 사내(오른쪽 앞, 마을 쪽 = 화면 안쪽 오른편을 본다), 가방은 오른손
  const M = K.person(scene, { x: 2.8, z: 1.2, rot: -0.5, coat: 0x4a4a47, pants: 0x3a3a38, hair: 'short', scale: 1.0 });
  const bag = K.box(0.9, 0.6, 0.25, 0x2f2f2d, 0, 0, 0, scene);
  // 안개 띠(반투명 판)들이 옆으로 흐름
  const fogs = []; for (let i = 0; i < 7; i++) { const f = new THREE.Mesh(new THREE.PlaneGeometry(14, 1.6), new THREE.MeshBasicMaterial({ color: 0xf6f5f1, transparent: true, opacity: 0.55, depthWrite: false })); scene.add(f); fogs.push({ f, k: i / 7, y: 0.6 + (i % 3) * 1.1, z: -3 - (i % 4) * 2.5 }); }
  const B = K.bird(scene, { cx: 2, cy: 9, cz: -18, rx: 8, rz: 3, s: 0.8 });
  cam.position.set(0.8, 2.9, 9.5); cam.lookAt(0.6, 2.4, -2);
  return (t, ph) => {
    fogs.forEach(o => { const u = (o.k + ph / (Math.PI * 2)) % 1; o.f.position.set(-14 + u * 28, o.y, o.z); o.f.material.opacity = 0.55 * Math.sin(u * Math.PI); });
    plate.rotation.z = 0.12 * Math.sin(ph * 2); sg.rotation.y = 0.05 * Math.sin(ph * 2 + 1);
    const look = K.win(ph, 0.3, 0.8, 0.12);
    M.pose({ headYaw: 0.5 - 0.9 * look, headPitch: -0.05 + 0.1 * look, torsoYaw: -0.15 * look, armR: { fwd: 0.05, out: 0.12 }, armL: { fwd: 0.4 * look, elbow: 1.2 * look, out: 0.1 } });
    // 가방: 오른손 아래(사람 rot 기준 오른쪽 아래)
    const a = -0.5; bag.position.set(2.8 + Math.cos(a) * 0.82, 1.15, 1.2 - Math.sin(a) * 0.82); bag.rotation.y = a;
    if (B && B.update) B.update(ph);
  };
}
