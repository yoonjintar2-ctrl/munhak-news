// 11/15 오늘의 소설 『안나 카레니나』: 기차역 승강장, 정차한 기관차(오른쪽을 향함, 움직이지 않음)가 김을 뿜고, 객차에서 내린 여인과 마중 나온 청년이 서로를 향해 선다. 승강장 등이 흔들린다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3c8', line: '#c6c3b8', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 71 });
  // 승강장 바닥 + 지붕 기둥
  K.box(26, 0.5, 4, 0xbdbab2, 0, 0.25, 0.8, scene);
  [-9, -3, 3, 9].forEach(x => K.cyl(0.14, 0.14, 4.6, 0x4a4a46, x, 2.8, 2.4, scene, 8));
  const roof = K.box(26, 0.25, 3.6, 0x5a5955, 0, 5.2, 1.8, scene); roof.rotation.x = -0.08;
  // 선로
  [-1.9, -2.9].forEach(z => K.box(30, 0.08, 0.12, 0x3a3a38, 0, 0.06, z, scene));
  // 기관차(오른쪽 앞이 머리) + 객차
  const L = new THREE.Group(); L.position.set(1.5, 0, -2.4); scene.add(L);
  const boiler = K.cyl(0.9, 0.9, 5, 0x3e3e3b, 1.5, 1.9, 0, L, 18); boiler.rotation.z = Math.PI / 2;
  K.box(2.2, 2.8, 2.0, 0x4a4a47, -1.8, 2.1, 0, L); K.box(2.4, 0.25, 2.2, 0x2f2f2d, -1.8, 3.6, 0, L);
  K.box(1.0, 0.7, 0.05, 0xd8d6cf, -1.8, 2.7, 1.02, L);
  const stack = K.cyl(0.35, 0.25, 1.1, 0x2f2f2d, 3.4, 3.2, 0, L, 12);
  [-1.6, 0.4, 2.4].forEach(x => { const w = K.cyl(0.62, 0.62, 0.2, 0x2a2a28, x, 0.62, 1.0, L, 16); w.rotation.x = Math.PI / 2; });
  K.cyl(0.25, 0.25, 0.1, 0xf0efea, 4.05, 1.9, 0, L, 12).rotation.z = Math.PI / 2;
  const car = new THREE.Group(); car.position.set(-6.5, 0, -2.4); scene.add(car);
  K.box(6.5, 2.6, 2.2, 0x6c6b66, 0, 1.9, 0, car); for (let i = 0; i < 4; i++) K.box(0.9, 0.7, 0.05, 0xdcdad3, -2.3 + i * 1.5, 2.3, 1.12, car);
  // 김(구름 덩어리가 피어오르며 흩어짐)
  const puffs = []; for (let i = 0; i < 6; i++) { const p = new THREE.Mesh(new THREE.SphereGeometry(0.6, 12, 8), new THREE.MeshLambertMaterial({ color: 0xf4f3ef, transparent: true, opacity: 0.9 })); scene.add(p); puffs.push({ p, k: i / 6 }); }
  // 흔들리는 등
  const lg = new THREE.Group(); lg.position.set(-3, 5.0, 2.0); scene.add(lg); K.line([[0, 0, 0], [0, -0.8, 0]], lg); K.cyl(0.25, 0.3, 0.55, 0xeceae3, 0, -1.1, 0, lg, 10);
  // 트렁크
  K.box(0.9, 0.55, 0.5, 0x3e3e3b, -3.6, 0.78, 1.0, scene);
  // 여인(왼쪽, 오른쪽을 향함: rot -π/2+) · 청년(오른쪽, 왼쪽을 향함: rot +π/2-)
  const A = K.person(scene, { x: -2.3, z: 1.2, rot: -Math.PI / 2 + 0.45, coat: 0x3a3a38, pants: 0x2c2c2a, hair: 'bun', scale: 0.95, scarf: 0xf2f0ea });
  const V = K.person(scene, { x: 0.9, z: 1.3, rot: Math.PI / 2 - 0.45, coat: 0x9c9a94, pants: 0x4a4a47, hair: 'cap', scale: 1.0 });
  [A, V].forEach(p => { p.root.position.y = 0.5; });
  cam.position.set(-0.6, 3.4, 10.5); cam.lookAt(-0.6, 2.4, -1);
  return (t, ph) => {
    puffs.forEach(o => { const u = (o.k + ph / (Math.PI * 2)) % 1; o.p.position.set(4.9 - u * 3.5, 3.8 + u * 3.2, -2.4 + u * 0.6); o.p.scale.setScalar(0.6 + u * 1.8); o.p.material.opacity = 0.9 * (1 - u); });
    lg.rotation.z = 0.14 * Math.sin(ph * 2); lg.rotation.x = 0.06 * Math.sin(ph * 2 + 1);
    const meet = K.win(ph, 0.25, 0.8, 0.12);
    A.pose({ bob: 0.5, headYaw: 0.1 - 0.15 * meet, headPitch: -0.15 + 0.1 * meet, armL: { fwd: 0.8, elbow: 1.4 }, armR: { fwd: 0.15, out: 0.1 } });
    V.pose({ bob: 0.5, headYaw: 0.05, headPitch: -0.12 * meet, lean: 0.1 * meet, armR: { fwd: 1.6 * meet + 0.1, elbow: 1.9 * meet }, armL: { fwd: 0.1 } });
  };
}
