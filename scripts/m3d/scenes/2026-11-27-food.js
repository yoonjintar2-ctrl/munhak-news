// 11/27 문학 한술 「헨젤과 그레텔」 과자집: 어두운 숲속 빈터에 생강과자 벽, 층층 케이크 지붕(하얀 아이싱), 맑은 설탕 창, 벽에 둥근 사탕이 박힌 작은 집. 굴뚝 연기·지붕 위 하얀 새·나뭇잎 흔들림. 사람 없음. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 25, 90], fov: 44 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d0ccc3', line: '#c8c4bb', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2831, near: false });
  const trees = []; [[-6.5, -2], [-8, -6], [6.8, -3], [8.5, -7], [-4.5, -9], [4.5, -10]].forEach(([x, z], i) => { const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g); K.cyl(0.3, 0.4, 4, 0x45443f, 0, 2, 0, g, 8); const c = K.inked(new THREE.Mesh(new THREE.ConeGeometry(2.0, 4.2, 10), K.lam(0x6e6c66)), 40); c.position.y = 5.2; g.add(c); trees.push({ c, k: i }); });
  const H = new THREE.Group(); H.position.set(0, 0, -1.5); H.rotation.y = 0.35; scene.add(H);
  K.box(4.2, 2.8, 3.2, 0x8a7f72 & 0x8a8782, 0, 1.4, 0, H); // 생강과자 벽
  for (let i = 0; i < 4; i++) K.box(4.25, 0.06, 3.25, 0x6e6c66, 0, 0.5 + i * 0.65, 0, H); // 과자 결
  // 케이크 지붕: 두 경사면 + 하얀 아이싱 테두리
  [-1, 1].forEach(sd => { const r = K.box(4.8, 0.45, 2.3, 0xdedad2, 0, 3.4, sd * 0.85, H); r.rotation.x = sd * 0.62; const ic = K.box(4.9, 0.18, 0.25, 0xfbfaf6, 0, 3.05, sd * 1.75, H); });
  K.box(4.9, 0.25, 0.3, 0xfbfaf6, 0, 4.15, 0, H);
  for (let i = 0; i < 8; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), K.lam(0xfbfaf6)); d.position.set(-2.2 + i * 0.63, 2.85, 1.85); H.add(d); }
  // 설탕 창 + 문 + 사탕
  const win = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.9), new THREE.MeshLambertMaterial({ color: 0xf6f5f1, transparent: true, opacity: 0.85 })); win.position.set(-1.1, 1.6, 1.62); H.add(win); K.box(1.15, 0.1, 0.08, 0xfbfaf6, -1.1, 1.1, 1.63, H); K.box(0.08, 0.9, 0.08, 0xfbfaf6, -1.1, 1.6, 1.63, H);
  K.box(0.9, 1.7, 0.08, 0x45443f, 0.9, 0.85, 1.62, H); const knob = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), K.lam(0xfbfaf6)); knob.position.set(1.2, 0.9, 1.7); H.add(knob);
  const candies = []; [[-1.7, 0.6], [-0.4, 0.5], [-0.3, 2.3], [1.6, 2.2], [1.7, 0.4], [-1.9, 2.4]].forEach(([x, y], i) => { const c = new THREE.Mesh(new THREE.CircleGeometry(0.16, 14), K.flat(i % 2 ? 0xfbfaf6 : 0x55534e)); c.position.set(x, y, 1.63); H.add(c); candies.push(c); });
  K.box(0.6, 1.2, 0.6, 0x6e6c66, 1.3, 4.2, -0.6, H);
  const smoke = []; for (let i = 0; i < 6; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfafaf8, transparent: true })); scene.add(s); smoke.push({ s, k: i / 6 }); }
  // 길 위 빵 부스러기 같은 돌멩이·버섯
  for (let i = 0; i < 7; i++) { const p = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 4), K.lam(0xfbfaf6)); p.position.set(0.9 + Math.sin(i) * 0.3, 0.08, 1.2 + i * 0.6); scene.add(p); }
  [[-2.8, 1.8], [2.9, 1.4]].forEach(([x, z]) => { K.cyl(0.08, 0.1, 0.4, 0xeeece6, x, 0.2, z, scene, 8); const cap = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x55534e)), 40); cap.position.set(x, 0.38, z); scene.add(cap); });
  const bird = new THREE.Group(); scene.add(bird); const bb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), K.lam(0xfbfaf6)), 50); bb.scale.set(1.5, 0.8, 0.8); bird.add(bb);
  const bw = [-1, 1].map(sd => { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.25), new THREE.MeshLambertMaterial({ color: 0xfbfaf6, side: THREE.DoubleSide })); w.geometry.translate(0.3, 0, 0); const p = new THREE.Group(); p.add(w); p.rotation.y = sd > 0 ? Math.PI / 2 : -Math.PI / 2; bird.add(p); return p; });
  cam.position.set(1.6, 3.0, 9.5); cam.lookAt(0, 2.3, -1.5);
  const v = new THREE.Vector3(1.3, 4.9, -0.6);
  return (t, ph) => {
    const w = H.localToWorld(v.clone());
    smoke.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.s.position.set(w.x + 0.4 * Math.sin(p * 6), w.y + p * 2.8, w.z); o.s.scale.setScalar(0.5 + p * 1.4); o.s.material.opacity = 0.8 * (1 - p); });
    bird.position.set(1.8 * Math.cos(ph), 5.6 + 0.3 * Math.sin(ph * 2), -1.5 + 1.2 * Math.sin(ph)); bird.rotation.y = -ph; const f = 0.8 * Math.sin(ph * 10); bw[0].rotation.x = f; bw[1].rotation.x = -f;
    trees.forEach(o => { o.c.rotation.z = 0.04 * Math.sin(ph * 2 + o.k); });
    candies.forEach((c, i) => { c.rotation.z = ph + i; });
  };
}
