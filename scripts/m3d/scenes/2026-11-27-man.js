// 11/27 오늘의 사나이 제시 오언스(3D 삽화, 실제 인물 아님): 1930년대 경기장 트랙을 달리는 육상 선수. 진행 방향 +x(오른쪽), 선수 rot -π/2-1.0(오른쪽 앞, 얼굴은 카메라 쪽으로 비스듬히). 트랙 레인 표시·허들 대신 거리 표지가 x 큰 값→작은 값(왼쪽)으로 흐름. 관중 팔 흔들기·깃발 펄럭임. 세로 720×860. 얼굴 세부 없음
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 90], fov: 40, w: 720, h: 860 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(60, 0.2, 14, 0x8a8782, 0, -0.1, 0, scene); // 트랙(진한 흙)
  K.box(60, 0.2, 10, 0xc8c4bb, 0, -0.1, -12, scene);
  [-2.4, 0, 2.4].forEach(z => K.box(60, 0.02, 0.08, 0xfbfaf6, 0, 0.02, z, scene));
  const marks = []; for (let i = 0; i < 8; i++) { const m = K.box(0.12, 0.02, 4.6, 0xfbfaf6, 0, 0.03, 0, scene); marks.push({ m, x0: -14 + i * 4 }); }
  // 관중석
  const crowd = []; for (let r = 0; r < 5; r++) { K.box(60, 1.0, 1.6, 0xb0aca4, 0, 0.5 + r * 1.1, -9 - r * 1.8, scene);
    for (let i = 0; i < 26; i++) { const g = new THREE.Group(); g.position.set(-22 + i * 1.7 + (r % 2) * 0.85, 1.0 + r * 1.1, -9 - r * 1.8); scene.add(g);
      const c = [0x6e6c66, 0x55534e, 0x8a8782][(i + r) % 3]; const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 0.45, 4, 8), K.lam(c)); b.position.y = 0.45; g.add(b); const h = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), K.lam(0xdcd6ce)); h.position.y = 1.25; g.add(h);
      if ((i * 5 + r * 3) % 4 === 0) { const a = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.6, 3, 8), K.lam(c)); a.position.set(0.4, 1.6, 0); a.rotation.z = -0.3; g.add(a); crowd.push({ a, k: i * 0.7 + r }); } } }
  // 깃발
  const flags = []; [-8, -3, 2, 7].forEach((x, i) => { K.cyl(0.07, 0.07, 6, 0x2a2a28, x, 9, -18, scene, 6); const f = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.0, 8, 2), new THREE.MeshLambertMaterial({ color: i % 2 ? 0xfbfaf6 : 0x8a8782, side: THREE.DoubleSide })); f.position.set(x + 0.9, 11.4, -18); scene.add(f); flags.push({ f, b: f.geometry.attributes.position.array.slice(), k: i }); });
  const R = K.athlete(scene, { x: 0, z: 0.6, rot: -Math.PI / 2 - 1.0, kind: 'runner', scale: 1.0, top: 0xeeece6, bottom: 0x2a2a28 });
  cam.position.set(-0.2, 3.0, 9.2); cam.lookAt(-0.1, 2.7, -1);
  return (t, ph) => {
    const s = Math.sin(ph * 3);
    R.pose({ lean: 0.25, bob: 0.08 * Math.abs(Math.cos(ph * 3)), headPitch: -0.15, armL: { fwd: 1.0 * s, elbow: 1.5 }, armR: { fwd: -1.0 * s, elbow: 1.5 }, legL: { fwd: -0.9 * s, knee: 0.6 + 0.6 * Math.max(0, s) }, legR: { fwd: 0.9 * s, knee: 0.6 + 0.6 * Math.max(0, -s) } });
    const p = ph / (Math.PI * 2); marks.forEach(o => { let x = o.x0 - p * 4 * 2; while (x < -16) x += 32; o.m.position.x = x; });
    crowd.forEach(o => { o.a.position.y = 1.6 + 0.18 * Math.sin(ph * 2 + o.k); });
    flags.forEach(o => { const a = o.f.geometry.attributes.position; for (let i = 0; i < a.count; i++) { const x = o.b[i * 3]; a.array[i * 3 + 2] = 0.25 * (x + 0.9) * Math.sin(ph * 3 + x * 2 + o.k); } a.needsUpdate = true; });
  };
}
