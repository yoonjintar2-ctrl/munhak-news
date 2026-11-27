// 11/21 「허생전」 장면②(after 4): 섬을 떠나는 바다 위 돛단배. 뱃머리에 선 허생(흰 옷·갓)이 오른팔을 휘둘러 엽전 꾸러미를 바다로 던지고, 꾸러미가 포물선을 그리며 떨어져 물보라가 인다. 뒤로 곡식 가마를 쌓은 섬과 밭, 파도가 출렁이고 갈매기가 돈다. 배는 제자리에서 흔들림(진행 없음). 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'shore', seed: 261, near: false });
  const wg = new THREE.PlaneGeometry(80, 40, 50, 25); const water = new THREE.Mesh(wg, K.lam(0xa4aaae)); water.rotation.x = -Math.PI / 2; water.position.set(0, 0, -10); scene.add(water);
  const rip = []; for (let i = 0; i < 16; i++) rip.push(K.box(1.8, 0.03, 0.06, 0xfbfaf6, -10 + (i * 4.3) % 22, 0.2, 2 - (i * 2.7) % 14, scene));
  // 섬 + 밭 + 가마
  const isl = K.inked(new THREE.Mesh(new THREE.SphereGeometry(6, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x9a968c)), 40); isl.scale.set(1.6, 0.4, 0.7); isl.position.set(-6, -0.3, -20); scene.add(isl);
  for (let i = 0; i < 5; i++) K.box(1.6, 0.05, 0.4, 0x6e6c66, -9 + i * 1.8, 1.9, -18.5, scene);
  [[-3, -18], [-2.2, -18.3], [-2.6, -17.6]].forEach(([x, z]) => K.cyl(0.5, 0.5, 0.9, 0xc8c3b8, x, 2.2, z, scene, 10));
  K.box(2, 1.4, 1.6, 0xe8e6e0, -10, 2.4, -19.5, scene);
  // 배(선체 + 돛대 + 돛)
  const boat = new THREE.Group(); boat.position.set(0.5, 0, -2.5); scene.add(boat);
  const hull = K.box(5.4, 0.8, 1.8, 0x55534e, 0, 0.2, 0, boat); K.box(5.0, 0.12, 1.5, 0x8a8782, 0, 0.66, 0, boat);
  K.cyl(0.07, 0.08, 4.4, 0x3a3936, -0.8, 2.8, 0, boat, 8); const sail = K.box(2.4, 2.8, 0.05, 0xf4f2ec, -0.8, 3.0, 0.1, boat); sail.rotation.y = 0.5;
  for (let i = 0; i < 3; i++) K.cyl(0.35, 0.35, 0.6, 0x8a8782, -2 + i * 0.6, 1.0, -0.3, boat, 10); // 곡식 섬
  const H = K.person(boat, { x: 1.6, z: 0, rot: -1.9, coat: 0xeeece6, pants: 0xd4d1c9, hair: 'short', scale: 0.8 }); H.root.position.y = 0.7;
  const gat = new THREE.Group(); gat.position.y = 0.62; H.headG.add(gat); K.cyl(0.75, 0.75, 0.03, 0x1c1c1a, 0, 0, 0, gat, 24); K.cyl(0.26, 0.3, 0.45, 0x1c1c1a, 0, 0.22, 0, gat, 16);
  // 사공
  const S = K.person(boat, { x: -2.3, z: 0.2, rot: 2.6, coat: 0x6e6c66, pants: 0x45443f, hair: 'short', scale: 0.75 }); S.root.position.y = 0.7;
  const oar = K.cyl(0.04, 0.04, 2.6, 0x3a3936, 0, 0, 0, scene, 6); S.hold('R', oar, { at: [0, -0.2, 0], rot: [0.9, 0, 0] });
  // 던지는 엽전 꾸러미 + 물보라
  const pouch = new THREE.Group(); K.cyl(0.18, 0.18, 0.5, 0x45443f, 0, 0, 0, pouch, 8).rotation.z = Math.PI / 2; scene.add(pouch);
  const splash = []; for (let i = 0; i < 10; i++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 5), K.flat(0xfbfaf6)); scene.add(m); splash.push({ m, a: i / 10 * Math.PI * 2 }); }
  const gulls = [K.bird(scene, { cx: 2, cy: 7, cz: -8, rx: 5, rz: 2, s: 0.8 }), K.bird(scene, { cx: -2, cy: 8, cz: -12, rx: 6, rz: 2, s: 0.7 })];
  cam.position.set(1.0, 3.6, 8.0); cam.lookAt(0.5, 1.8, -5);
  const pos = wg.attributes.position;
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    for (let j = 0; j < pos.count; j++) { const x = pos.getX(j), y = pos.getY(j); pos.setZ(j, 0.12 * Math.sin(ph * 2 + x * 0.5 + y * 0.4)); } pos.needsUpdate = true; wg.computeVertexNormals();
    boat.rotation.z = 0.04 * Math.sin(ph * 2); boat.position.y = 0.08 * Math.sin(ph * 2 + 1);
    const sw = K.win(ph, 0.05, 0.35, 0.08);
    H.pose({ torsoYaw: -0.4 * sw, armR: { fwd: 0.4 + 2.0 * sw, out: -0.2, elbow: 0.4 }, armL: { fwd: 0.3, elbow: 0.5 }, headPitch: -0.1 + 0.2 * K.win(ph, 0.4, 0.9, 0.1) });
    S.pose({ armR: { fwd: 0.8 + 0.3 * Math.sin(ph * 2), elbow: 0.8 }, armL: { fwd: 0.8 + 0.3 * Math.sin(ph * 2), elbow: 0.8 } });
    // 꾸러미 비행: u 0.3~0.65
    const f = Math.min(1, Math.max(0, (u - 0.3) / 0.35)); const vis = u > 0.3 && u < 0.66;
    pouch.visible = vis; pouch.position.set(2.6 + 3.2 * f, 3.0 + 2.2 * Math.sin(Math.PI * f) - 3.0 * f, -2.5 + 1.0 * f); pouch.rotation.z = f * 8;
    const s = Math.max(0, (u - 0.65) / 0.3); splash.forEach(o => { o.m.visible = u > 0.65 && u < 0.95; o.m.position.set(5.8 + Math.cos(o.a) * s * 0.9, 0.2 + Math.sin(Math.PI * Math.min(1, s)) * 1.2, -1.5 + Math.sin(o.a) * s * 0.5); });
    rip.forEach((l, i) => { l.scale.x = 0.6 + 0.4 * Math.sin(ph * 2 + i); });
    gulls[0].update(ph); gulls[1].update(ph, 2.5);
  };
}
