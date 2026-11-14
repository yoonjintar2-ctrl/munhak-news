// 11/14 오늘의 시 — 정지용 「향수」: 해 질 녘 실개천이 휘도는 들판, 얼룩소가 고개 들어 울고, 누이 머리칼이 날리고, 아내는 이삭을 줍고, 까마귀가 지나간다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3c8', line: '#c6c3b8', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 14 });
  // 실개천: 휘도는 띠
  const pts = []; for (let i = 0; i <= 40; i++) { const z = 6 - i * 1.6; pts.push(new THREE.Vector3(5 + Math.sin(i * 0.25) * 4, 0.02, z)); }
  const curve = new THREE.CatmullRomCurve3(pts);
  const ribbon = []; for (let i = 0; i < 60; i++) { const p = curve.getPoint(i / 60); const m = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.02, 1.4), K.flat(0x6f6e69)); m.position.copy(p); scene.add(m); }
  const glints = []; for (let i = 0; i < 9; i++) { const g = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.03, 0.08), K.flat(0xf2f2ee)); scene.add(g); glints.push({ g, o: i / 9 }); }
  // 초가집 + 불빛
  const h = new THREE.Group(); h.position.set(-7, 0, -16); scene.add(h);
  K.box(6, 2.6, 3.2, 0xd2d0c8, 0, 1.3, 0, h);
  const roof = new THREE.Mesh(new THREE.SphereGeometry(4.2, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x8f8d86)); roof.scale.set(0.9, 0.45, 0.55); roof.position.y = 2.5; h.add(roof);
  const winM = new THREE.MeshBasicMaterial({ color: 0xf6f6f0 }); const wnd = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.7), winM); wnd.position.set(1.2, 1.5, 1.62); h.add(wnd);
  // 먼 산 띠, 해
  K.box(140, 4, 3, 0x9e9d97, 0, 2, -45, scene);
  const sun = new THREE.Mesh(new THREE.CircleGeometry(2.4, 32), K.flat(0xf7f6f1)); sun.position.set(14, 6, -44); scene.add(sun);
  // 얼룩백이 황소
  const cow = new THREE.Group(); cow.position.set(1.5, 0, -2); cow.rotation.y = 0.5; scene.add(cow);
  K.box(3.2, 1.5, 1.4, 0xe8e6e0, 0, 1.8, 0, cow);
  [[-0.6, 2.2, 0.71], [0.8, 1.6, 0.71], [0.2, 2.0, -0.71], [-1.0, 1.5, -0.71]].forEach(([x, y, z]) => K.box(0.8, 0.6, 0.04, 0x2a2a28, x, y, z, cow));
  [[-1.2, 0.5], [1.2, 0.5], [-1.2, -0.5], [1.2, -0.5]].forEach(([x, z]) => K.cyl(0.16, 0.14, 1.1, 0xd8d6d0, x, 0.55, z, cow, 8));
  const neck = new THREE.Group(); neck.position.set(1.6, 2.1, 0); cow.add(neck);
  K.box(1.0, 0.75, 0.75, 0xe2e0da, 0.55, 0, 0, neck); K.box(0.4, 0.45, 0.6, 0x9a9892, 1.1, -0.15, 0, neck);
  [-1, 1].forEach(s => { const hn = K.cyl(0.05, 0.08, 0.5, 0x555550, 0.3, 0.45, s * 0.3, neck, 6); hn.rotation.x = s * 0.6; });
  const tail = K.cyl(0.04, 0.04, 1.1, 0x55554f, -1.65, 1.6, 0, cow, 6);
  // 누이(긴 머리)와 이삭 줍는 아내
  const S = K.person(scene, { x: -2.2, z: 1.2, rot: Math.PI - 0.6, coat: 0xe6e3da, pants: 0x55554f, hair: 'long', scale: 0.62 });
  const W = K.person(scene, { x: -5.2, z: -3.5, rot: Math.PI / 2 + 0.6, coat: 0xbdbab2, pants: 0x6a6a66, hair: 'bun', scale: 0.85 });
  const b1 = K.bird(scene, { cx: -2, cy: 11, cz: -14, rx: 12, rz: 3, s: 1.1 }), b2 = K.bird(scene, { cx: 0, cy: 12.5, cz: -16, rx: 10, rz: 3 });
  cam.position.set(-0.5, 3.4, 9.0); cam.lookAt(-0.8, 1.8, -5);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    glints.forEach(o => { const p = curve.getPoint(((u * 0.5 + o.o) % 1) * 0.7); o.g.position.set(p.x, 0.06, p.z); });
    const low = K.win(ph, 0.15, 0.6, 0.12);
    neck.rotation.z = 0.55 * low - 0.15 * (1 - low); tail.rotation.x = Math.sin(ph * 2) * 0.3;
    S.pose({ headYaw: 0.5 + 0.2 * Math.sin(ph), headTilt: 0.15 * Math.sin(ph * 2), armR: { fwd: 1.2 * K.win(ph, 0.25, 0.65, 0.1), point: true }, armL: { fwd: 0.1 } });
    const bend = 0.5 + 0.5 * Math.sin(ph);
    W.pose({ lean: -0.2 - 0.55 * bend, headPitch: -0.2 - 0.2 * bend, armR: { fwd: 0.4 + 0.9 * bend, elbow: 0.2 }, armL: { fwd: 0.3, elbow: 1.4 } });
    winM.color.setScalar(0.88 + 0.08 * Math.sin(ph * 3));
    b1.update(ph); b2.update(ph, 2.5);
  };
}
