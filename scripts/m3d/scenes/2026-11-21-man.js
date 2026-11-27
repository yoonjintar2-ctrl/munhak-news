// 11/21 오늘의 사나이 해군 UDT/SEAL: 새벽 모래사장, 잠수복 차림 대원 둘이 검은 고무보트를 머리 위로 함께 들고 바다(화면 안쪽 -z)로 달려간다 — 진행 방향 -z, 대원 rot 0(뒷모습, 얼굴 없음). 파도는 +z(카메라 쪽)로 밀려와 부서지고, 갈매기가 돈다. 먼 곶과 등대. 카메라 고정(세로)
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 100], fov: 42, w: 720, h: 860 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(40, 0.2, 30, 0xdedbd3, 0, -0.1, 5, scene); // 모래
  const wg = new THREE.PlaneGeometry(80, 40, 40, 20); const sea = new THREE.Mesh(wg, K.lam(0xa4aaae)); sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0.05, -26); scene.add(sea);
    const cape = K.inked(new THREE.Mesh(new THREE.SphereGeometry(8, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0xa8a59e)), 30); cape.scale.set(1.6, 0.6, 0.6); cape.position.set(-16, -1, -40); scene.add(cape);
  K.cyl(0.5, 0.7, 3.5, 0xf2f0ea, -12, 4.6, -38, scene, 12); K.box(1.2, 0.8, 1.2, 0x55534e, -12, 6.7, -38, scene);
  // 부서지는 파도 줄(흰 거품)
  const waves = []; for (let i = 0; i < 4; i++) { const w = K.box(24, 0.15, 0.5, 0xfbfaf6, 0, 0.15, 0, scene); waves.push({ w, k: i / 4 }); }
  // 해변 소품: 노 두 자루, 부표, 발자국
  const oar = K.cyl(0.06, 0.06, 3, 0x3a3936, 3.5, 0.15, 3.5, scene, 6); oar.rotation.z = Math.PI / 2; oar.rotation.y = 0.6;
  K.cyl(0.4, 0.4, 0.8, 0x55534e, -4.5, 0.4, 2.5, scene, 12);
  for (let i = 0; i < 8; i++) K.box(0.25, 0.03, 0.4, 0xc8c3b8, -0.6 + (i % 2) * 1.2, 0.02, 5 - i * 0.9, scene);
  // 대원 둘 + 고무보트
  const A = K.athlete(scene, { x: -1.0, z: 0.2, rot: 0, kind: 'soldier', top: 0x2a2a28, bottom: 0x2a2a28, scale: 0.95 });
  const B = K.athlete(scene, { x: 1.0, z: -1.6, rot: 0, kind: 'soldier', top: 0x2a2a28, bottom: 0x2a2a28, scale: 0.95 });
  const boat = new THREE.Group(); scene.add(boat);
  [-0.9, 0.9].forEach(x => { const t = K.cyl(0.45, 0.45, 5.4, 0x1e1e1e, x, 0, 0, boat, 14); t.rotation.x = Math.PI / 2; });
  K.box(1.8, 0.1, 5.0, 0x3a3936, 0, -0.25, 0, boat); const nose = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 8), K.lam(0x1e1e1e)), 30); nose.scale.set(2.4, 1, 1); nose.position.set(0, 0, -2.7); boat.add(nose);
  const gulls = [K.bird(scene, { cx: 2, cy: 9, cz: -12, rx: 6, rz: 3, s: 0.8 }), K.bird(scene, { cx: -3, cy: 10.5, cz: -16, rx: 5, rz: 2, s: 0.7 })];
  cam.position.set(7.5, 4.2, 10.5); cam.lookAt(-0.5, 3.0, -3.5);
  const pos = wg.attributes.position;
  return (t, ph) => {
    const u = ph / (Math.PI * 2), s = Math.sin(ph * 4), c = Math.cos(ph * 4);
    [A, B].forEach((P, i) => { const q = i ? -1 : 1; P.pose({ lean: 0.15, bob: 0.1 * Math.abs(c), armL: { fwd: 3.0, out: 0.15, elbow: 0.2 }, armR: { fwd: 3.0, out: 0.15, elbow: 0.2 }, legL: { fwd: -0.6 * s * q, knee: 0.3 + 0.7 * Math.max(0, s * q) }, legR: { fwd: 0.6 * s * q, knee: 0.3 + 0.7 * Math.max(0, -s * q) } }); });
    boat.position.set(0, 5.1 + 0.1 * Math.abs(c), -0.7); boat.rotation.z = 0.03 * s;
    waves.forEach(o => { const v = (o.k + u) % 1; o.w.position.z = -14 + v * 9; o.w.scale.x = 0.7 + 0.3 * Math.sin(Math.PI * v); });
    for (let j = 0; j < pos.count; j++) { const x = pos.getX(j), y = pos.getY(j); pos.setZ(j, 0.15 * Math.sin(ph * 2 + y * 0.6 + x * 0.2)); } pos.needsUpdate = true;
    gulls[0].update(ph); gulls[1].update(ph, 2.4);
  };
}
