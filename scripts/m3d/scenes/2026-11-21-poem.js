// 11/21 오늘의 시 「이니스프리 호수 섬」: 잔잔한 호수 가운데 나무 우거진 작은 섬, 물가에 오두막과 벌통. 앞쪽 호숫가 길(돌담·가로등)에 외투 차림 사람이 서서 섬을 바라보며 가슴에 손을 얹는다. 물결이 찰랑이고 새 떼가 섬 위를 돌며, 갈대가 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'country', seed: 221, near: false });
  // 호수(물결 평면)
  const wg = new THREE.PlaneGeometry(60, 30, 60, 30); const water = new THREE.Mesh(wg, K.lam(0xb4b8ba)); water.rotation.x = -Math.PI / 2; water.position.set(0, 0, -14); scene.add(water);
  const rip = []; for (let i = 0; i < 10; i++) { const l = K.box(2.2, 0.02, 0.06, 0xf4f2ec, -9 + (i * 3.7) % 18, 0.08, -4 - (i * 2.3) % 9, scene); rip.push(l); }
  // 섬: 둔덕 + 나무 + 오두막 + 벌통
  const isl = K.inked(new THREE.Mesh(new THREE.SphereGeometry(5, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x9a968c)), 40); isl.scale.set(1.3, 0.35, 0.8); isl.position.set(1, -0.2, -16); scene.add(isl);
  const tree = (x, z, h) => { K.cyl(0.15, 0.2, h, 0x45443f, x, h / 2, z, scene, 6); const c = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 10), K.lam(0x77756f)), 40); c.position.set(x, h + 0.6, z); c.scale.y = 1.2; scene.add(c); return c; };
  const crowns = [tree(-1.5, -17.5, 2.6), tree(0.2, -18.2, 3.2), tree(3.6, -17.4, 2.4), tree(5.0, -16.8, 1.8)];
  K.box(1.8, 1.2, 1.4, 0xe8e6e0, 1.6, 1.3, -15.4, scene); const rf = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 1.5, 0.9, 4, 1), K.lam(0x55534e)), 30); rf.rotation.y = Math.PI / 4; rf.position.set(1.6, 2.3, -15.4); scene.add(rf);
  K.box(0.3, 0.6, 0.06, 0x3a3936, 1.4, 1.0, -14.68, scene);
  K.cyl(0.25, 0.3, 0.6, 0x8a8782, 3.2, 1.1, -14.8, scene, 10); K.cyl(0.3, 0.3, 0.08, 0x55534e, 3.2, 1.45, -14.8, scene, 10);
  // 앞쪽 호숫가 길 + 돌담 + 가로등 + 갈대
  K.box(30, 0.3, 4, 0xdedbd3, 0, 0.15, 0, scene); for (let i = 0; i < 18; i++) K.box(1.2, 0.5, 0.6, [0xa8a59e, 0x8a8782][i % 2], -12 + i * 1.4, 0.5, -1.8, scene);
  K.cyl(0.08, 0.1, 4.2, 0x3a3936, 6.6, 2.4, 0.4, scene, 8); K.box(0.45, 0.4, 0.45, 0xf4f2ec, 6.6, 4.6, 0.4, scene);
  const reeds = []; for (let i = 0; i < 16; i++) { const r = K.cyl(0.02, 0.03, 1.4, 0x55534e, 0, 0, 0, scene, 4); const g = new THREE.Group(); g.position.set(-6 + i * 0.35, 0.3, -2.6 - (i % 3) * 0.3); g.add(r); r.position.y = 0.7; scene.add(g); reeds.push(g); }
  const P = K.person(scene, { x: -3.0, z: 0.6, rot: 0.3, coat: 0x45443f, pants: 0x2a2a28, hair: 'short', scale: 0.95 });
  const birds = [0, 1, 2].map(i => K.bird(scene, { cx: 1 + i, cy: 7 + i * 0.6, cz: -17, rx: 5 + i, rz: 2, s: 0.7 }));
  cam.position.set(0.4, 5.6, 8.6); cam.lookAt(0.8, 1.0, -11);
  const pos = wg.attributes.position;
  return (t, ph) => {
    for (let j = 0; j < pos.count; j++) { const x = pos.getX(j), y = pos.getY(j); pos.setZ(j, 0.06 * Math.sin(ph * 2 + x * 0.8 + y * 0.6)); } pos.needsUpdate = true; wg.computeVertexNormals();
    P.pose({ headYaw: -0.4, headPitch: -0.1, torsoYaw: -0.2, armR: { fwd: 0.6 + 0.5 * K.win(ph, 0.2, 0.7, 0.15), out: -0.4, elbow: 1.6 }, armL: { fwd: 0.05 } });
    birds.forEach((b, i) => b.update(ph, i * 2.1));
    rip.forEach((l, i) => { l.position.x += 0; l.scale.x = 0.7 + 0.3 * Math.sin(ph * 2 + i); });
    reeds.forEach((g, i) => { g.rotation.z = 0.12 * Math.sin(ph * 2 + i * 0.5); });
    crowns.forEach((c, i) => { c.rotation.z = 0.04 * Math.sin(ph + i); });
  };
}
