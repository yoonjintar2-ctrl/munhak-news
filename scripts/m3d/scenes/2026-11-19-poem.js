// 11/19 오늘의 시 「채련곡」: 가을 연못, 연잎과 연꽃 사이에 매어 둔 작은 배에 쪽진 여인이 서서, 물 건너 둑 위 갓 쓴 선비 쪽으로 오른손으로 연밥을 던진다. 연밥이 물 위로 포물선을 그리고, 여인은 이어 소매로 얼굴을 가린다. 연잎이 흔들리고 물결이 번진다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xeae8e2, 40, 130] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dcd9d1', line: '#d2cfc7', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 77 });
  const water = new THREE.Mesh(new THREE.PlaneGeometry(40, 12), K.lam(0xa8a59e)); water.rotation.x = -Math.PI / 2; water.position.set(0, 0.03, -2.5); scene.add(water);
  // 건너편 둑 + 선비(갓)
  K.box(30, 0.6, 3.0, 0xcac7bf, 0, 0.3, -9.5, scene);
  const S = K.person(scene, { x: 3.4, z: -9.3, rot: 2.4, coat: 0xd9d6ce, pants: 0x55534e, hair: 'short', scale: 0.85 });
  S.root.position.y = 0.6;
  const gat = new THREE.Group(); gat.position.y = 0.62; S.headG.add(gat); K.cyl(0.75, 0.75, 0.04, 0x1c1c1a, 0, 0, 0, gat, 24); K.cyl(0.26, 0.3, 0.5, 0x1c1c1a, 0, 0.25, 0, gat, 16);
  // 버드나무 한 그루(둑 위)
  const wil = new THREE.Group(); wil.position.set(6.5, 0.6, -10); scene.add(wil); K.cyl(0.25, 0.35, 3.4, 0x4a4945, 0, 1.7, 0, wil, 8);
  const crown = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.6, 14, 10), K.lam(0xa3a099)), 70); crown.scale.y = 1.2; crown.position.y = 4.0; wil.add(crown); const strands = [crown];
  // 작은 배 + 여인
  const boat = new THREE.Group(); boat.position.set(-1.6, 0.1, -1.2); boat.rotation.y = 0.25; scene.add(boat);
  K.box(3.6, 0.45, 1.3, 0x55534e, 0, 0.22, 0, boat); K.box(3.8, 0.1, 1.45, 0x2f2e2b, 0, 0.5, 0, boat);
  const W = K.person(boat, { x: 0.2, z: 0, rot: -1.15, coat: 0x45443f, pants: 0xe6e3dc, hair: 'bun', scale: 0.82 });
  W.root.position.y = 0.5;
  const skirt = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.8, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0xeeebe4, side: THREE.DoubleSide })), 40); skirt.position.y = 0.95; W.root.add(skirt);
  // 연잎·연꽃
  const pads = []; for (let i = 0; i < 18; i++) { const x = -8 + (i * 2.9) % 17, z = 0.2 - ((i * 1.7) % 7); if (Math.abs(x + 1.6) < 2.4 && Math.abs(z + 1.2) < 1.2) continue;
    const g = new THREE.Group(); g.position.set(x, 0.06, z); scene.add(g);
    const pad = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.04, 18), K.lam(0x6a6863)), 60); pad.position.y = (i % 4 === 1) ? 0.5 : 0.02; pad.rotation.x = (i % 4 === 1) ? 0.35 : 0; g.add(pad);
    if (i % 4 === 1) K.cyl(0.03, 0.03, 0.5, 0x55534e, 0, 0.25, 0, g, 4);
    if (i % 3 === 0) { K.cyl(0.03, 0.03, 1.2, 0x55534e, 0.3, 0.6, 0, g, 4); const fl = new THREE.Group(); fl.position.set(0.3, 1.25, 0); g.add(fl); for (let k = 0; k < 8; k++) { const pe = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), K.lam(0xf8f6f1)), 60); pe.scale.set(0.5, 1.3, 0.25); pe.position.set(Math.cos(k * 0.785) * 0.16, 0.2, Math.sin(k * 0.785) * 0.16); pe.rotation.y = -k * 0.785; pe.rotation.z = -0.45; pe.position.y = 0.32; fl.add(pe); } const ctr = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), K.lam(0x77756f)); ctr.position.y = 0.15; fl.add(ctr); }
    pads.push(g); }
  // 연밥(던지는 것) + 물결 고리
  const pod = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.1, 0.16, 12), K.lam(0x5a5853)), 30); scene.add(pod);
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.38, 24), K.flat(0xf2f1ec)); ring.rotation.x = -Math.PI / 2; scene.add(ring);
  cam.position.set(0.8, 3.2, 5.6); cam.lookAt(0.6, 1.8, -5.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    const thr = K.win(ph, 0.02, 0.32, 0.08), shy = K.win(ph, 0.42, 0.95, 0.1);
    W.pose({ headYaw: 0.3 - 0.9 * shy, headPitch: 0.25 * shy, torsoYaw: -0.2 * thr, lean: 0.1 * shy,
      armR: { fwd: 0.4 + 1.6 * thr + 1.1 * shy, out: 0.1, elbow: 0.3 + 1.6 * shy }, armL: { fwd: 0.3 + 0.9 * shy, elbow: 0.6 + 1.2 * shy } });
    S.pose({ headYaw: -0.2 + 0.35 * K.win(ph, 0.3, 0.9, 0.12), headPitch: 0.1, armR: { fwd: 0.4 + 0.6 * K.win(ph, 0.35, 0.8, 0.1), elbow: 0.8 }, armL: { fwd: 0.1, elbow: 0.3 } });
    // 연밥 포물선: 배(왼쪽 앞) → 둑 앞 물(오른쪽 뒤)
    const fly = Math.min(1, Math.max(0, (u - 0.18) / 0.3)); const sx = -1.3, sz = -1.4, ex = 2.6, ez = -7.6;
    pod.visible = u > 0.18 && u < 0.5; pod.position.set(sx + (ex - sx) * fly, 2.4 + 2.6 * Math.sin(Math.PI * fly) - 2.3 * fly, sz + (ez - sz) * fly); pod.rotation.x = fly * 6;
    const rr = Math.max(0, (u - 0.48) / 0.5); ring.visible = rr > 0 && rr < 1; ring.position.set(ex, 0.06, ez); ring.scale.setScalar(0.5 + 3 * rr); ring.material.opacity = 1 - rr;
    pads.forEach((g, i) => { g.rotation.z = 0.05 * Math.sin(ph + i); g.position.y = 0.06 + 0.03 * Math.sin(ph * 2 + i * 0.7); });
    boat.position.y = 0.1 + 0.05 * Math.sin(ph * 2); boat.rotation.z = 0.03 * Math.sin(ph * 2 + 1);
    strands.forEach((g, i) => { g.rotation.z = 0.05 * Math.sin(ph + i * 0.4); });
  };
}
