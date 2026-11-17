// 11/18 오늘의 시 「나룻배와 행인」: 진눈깨비 내리는 강나루. 나룻배에 선 사공이 장대를 짚고 고개를 돌려 둑을 바라보고, 배를 막 내린 행인이 봇짐을 메고 돌아보지 않은 채 둑길을 오른다. 배가 출렁이고 갈대가 흔들리며 눈발이 내린다
export const secs = 3;
export const opts = { bg: 0xeeece7, fog: [0xe9e7e2, 35, 130] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#e2e0da', line: '#d8d6d0', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'shore', seed: 31 });
  const water = new THREE.Mesh(new THREE.PlaneGeometry(80, 9), K.lam(0x9a9892)); water.rotation.x = -Math.PI / 2; water.position.set(0, 0.03, -5.5); scene.add(water);
  const rip = []; for (let i = 0; i < 8; i++) { const r = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.05), K.flat(0xf0efea)); r.rotation.x = -Math.PI / 2; scene.add(r); rip.push({ r, k: i / 8, z: -8 + (i % 4) * 1.6 }); }
  // 나룻배(선체 + 사공)
  const boat = new THREE.Group(); boat.position.set(-1.6, 0.15, -5.0); scene.add(boat);
  K.box(4.2, 0.5, 1.5, 0x4a4945, 0, 0.25, 0, boat); K.box(4.4, 0.12, 1.7, 0x2f2e2b, 0, 0.55, 0, boat); K.box(0.9, 0.35, 1.2, 0x4a4945, 2.3, 0.4, 0, boat).rotation.z = 0.35;
  const M = K.person(boat, { x: -1.0, z: 0, rot: -0.6, coat: 0x3e3d3a, pants: 0x9a9892, hair: 'cap', scale: 0.8, scarf: 0xe8e6e0 });
  M.root.position.y = 0.55;
  const pole = K.cyl(0.05, 0.05, 5.2, 0x2a2a28, 0, 0, 0, scene, 6);
  // 나루터 말뚝, 둑길, 행인
  K.cyl(0.12, 0.12, 1.6, 0x3a3936, 1.2, 0.6, -4.2, scene, 8); K.cyl(0.12, 0.12, 1.4, 0x3a3936, 1.9, 0.5, -4.4, scene, 8);
  K.box(8, 0.4, 3.0, 0xd6d3cb, 6.0, 0.2, -2.6, scene);
  const P = K.person(scene, { x: 3.6, z: -2.6, rot: -1.25, coat: 0xb0ada5, pants: 0x3a3936, hair: 'short', scale: 0.72, backpack: true });
  P.root.position.y = 0.4;
  const pack = K.box(0.5, 0.5, 0.42, 0x5a5954, 0, 0, 0, scene);
  [[-3.5, 0.6], [-2.4, 1.2], [2.6, 0.9]].forEach(([x, z]) => { const r = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.45, 8, 6), K.lam(0x6a6964)), 40); r.scale.y = 0.5; r.position.set(x, 0.18, z); scene.add(r); });
  // 갈대
  const reeds = []; for (let i = 0; i < 14; i++) { const g = new THREE.Group(); g.position.set(-7 + (i % 7) * 0.5 + (i > 6 ? 11.5 : 0), 0, -1.2 - (i % 3) * 0.5); scene.add(g); K.cyl(0.025, 0.02, 1.6 + (i % 3) * 0.3, 0x55534e, 0, 0.8, 0, g, 4); const h = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 6), K.lam(0xb8b5ad)), 80); h.scale.y = 3; h.position.y = 1.75 + (i % 3) * 0.3; g.add(h); reeds.push(g); }
  const N = 60, pos = new Float32Array(N * 3), base = []; for (let i = 0; i < N; i++) base.push([(Math.random() - 0.5) * 20, Math.random() * 10, -9 + Math.random() * 11, Math.random() * 6.28]);
  const snow = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.14 })); scene.add(snow);
  cam.position.set(0.8, 2.6, 5.6); cam.lookAt(0.8, 1.6, -4.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    boat.position.y = 0.15 + 0.06 * Math.sin(ph * 2); boat.rotation.z = 0.03 * Math.sin(ph * 2 + 1); boat.rotation.x = 0.02 * Math.sin(ph * 2);
    const look = K.win(ph, 0.2, 0.8, 0.15);
    M.pose({ headYaw: -0.7 * look, headPitch: 0.05, torsoYaw: -0.15 * look, armR: { fwd: 1.3, out: 0.15, elbow: 0.6 }, armL: { fwd: 1.0, out: -0.1, elbow: 0.9 } });
    pole.position.set(-1.6 - 0.55 + 0.15 * Math.sin(ph), 2.0 + boat.position.y, -4.55); pole.rotation.z = -0.25 + 0.06 * Math.sin(ph); pole.rotation.x = 0.1;
    const w = Math.sin(ph * 2);
    P.root.position.x = 3.6 + 0.5 * u; P.pose({ bob: 0.04 * Math.abs(w), headPitch: -0.1, armL: { fwd: 0.35 * w, elbow: 0.3 }, armR: { fwd: -0.35 * w, elbow: 0.3 } });
    pack.visible = false; pack.rotation.y = -1.25;
    reeds.forEach((g, i) => { g.rotation.z = 0.12 * Math.sin(ph + i * 0.5); });
    rip.forEach(o => { const v = (o.k + u) % 1; o.r.position.set(-20 + v * 40, 0.05, o.z); });
    base.forEach((b, i) => { pos[i * 3] = b[0] + 0.3 * Math.sin(ph + b[3]); pos[i * 3 + 1] = ((b[1] - u * 10) % 10 + 10) % 10; pos[i * 3 + 2] = b[2]; }); snow.geometry.attributes.position.needsUpdate = true;
  };
}
