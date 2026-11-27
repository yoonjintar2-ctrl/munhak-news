// 11/14 1분 고전 장면② 충줏집: 주막 앞에서 허 생원이 젊은 동이를 나무라고(손가락질), 동이는 고개를 숙인다. 처마 등이 흔들린다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3c8', line: '#c6c3b8', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 32 });
  // 주막 건물: 벽 + 미닫이 문살 + 처마
  K.box(14, 4.2, 0.6, 0x5f5e5a, 0, 2.1, -4.5, scene);
  const lat = K.canvasTex(256, 256, (g, w, h) => { g.fillStyle = '#d8d6d0'; g.fillRect(0, 0, w, h); g.strokeStyle = '#3a3a38'; g.lineWidth = 6; for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(i * w / 4, 0); g.lineTo(i * w / 4, h); g.stroke(); g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke(); } });
  [-3.2, -1.2, 1.4].forEach(x => { const d = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 2.6), new THREE.MeshLambertMaterial({ map: lat })); d.position.set(x, 1.6, -4.15); scene.add(d); });
  const roof = K.box(15.5, 0.35, 3.2, 0x3e3e3b, 0, 4.5, -3.4, scene); roof.rotation.x = 0.28;
  // 처마 끝 등(흔들림)
  const lg = new THREE.Group(); lg.position.set(-5.2, 4.1, -2.0); scene.add(lg); K.line([[0, 0, 0], [0, -0.7, 0]], lg); const lamp = K.cyl(0.32, 0.32, 0.6, 0xe9e7e0, 0, -1.0, 0, lg, 12);
  // 평상
  K.box(3.2, 0.25, 1.6, 0x6f6e69, 4.6, 0.9, -1.6, scene); [[-1.4, -0.6], [1.4, -0.6], [-1.4, 0.6], [1.4, 0.6]].forEach(([a, b]) => K.cyl(0.08, 0.08, 0.9, 0x55544f, 4.6 + a, 0.45, -1.6 + b, scene, 6));
  K.cyl(0.25, 0.2, 0.45, 0xbdbbb5, 4.2, 1.25, -1.6, scene, 12); // 술사발
  // 허 생원(왼쪽, 오른쪽을 보며 손가락질) · 동이(오른쪽, 고개 숙임 → 잠깐 고개 듦)
  const H = K.person(scene, { x: -1.6, z: 0.6, rot: -Math.PI / 2 + 0.35, coat: 0xd0cdc5, pants: 0xb8b5ad, hair: 'short', hairC: 0x777773, scale: 0.92 });
  const Dg = K.person(scene, { x: 1.4, z: 0.4, rot: Math.PI / 2 - 0.35, coat: 0xe2dfd7, pants: 0x9a978f, hair: 'short', scale: 0.96 });
  cam.position.set(0.2, 3.0, 9.0); cam.lookAt(0, 2.5, -1);
  return (t, ph) => {
    lg.rotation.z = 0.18 * Math.sin(ph * 2); lg.rotation.x = 0.08 * Math.sin(ph * 2 + 1);
    const jab = Math.max(0, Math.sin(ph * 4));
    H.pose({ headYaw: 0.15, headPitch: 0.05 + 0.08 * jab, lean: 0.06 * jab, armR: { fwd: 1.25 + 0.2 * jab, out: 0.1, elbow: 0.15, point: true }, armL: { fwd: 0.2, out: 0.15, elbow: 0.9 } });
    const up = K.win(ph, 0.55, 0.85, 0.08);
    Dg.pose({ headPitch: -0.45 + 0.4 * up, headYaw: -0.1, armL: { fwd: 0.15 }, armR: { fwd: 0.35 * up, elbow: 0.8 * up } });
  };
}
