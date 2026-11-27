// 11/28 오늘의 시 디킨슨 「나는 아무도 아니에요!」: 초여름 늪가. 흰 긴 외투·긴 치마의 여인이 몸을 숙여 연잎 위 개구리를 보며 입가에 검지를 댄다(쉿). 개구리 볼 부풀림·갈대 흔들림·잠자리. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e7e1, fog: [0xe4e3dd, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3ca', line: '#ceCbc2', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2821, near: false });
  const pond = new THREE.Mesh(new THREE.CircleGeometry(4.2, 32), K.lam(0xb4b0a8)); pond.rotation.x = -Math.PI / 2; pond.scale.set(1.5, 1, 1); pond.position.set(1.8, 0.03, -0.5); scene.add(pond);
  const pads = []; [[0.6, 0.4, 1], [2.6, -0.8, 0.8], [3.8, 0.6, 0.7], [1.6, -2.0, 0.6]].forEach(([x, z, s], i) => { const p = new THREE.Mesh(new THREE.CircleGeometry(0.7 * s, 16, 0.4, Math.PI * 1.85), K.lam(0x6e6c66)); p.rotation.x = -Math.PI / 2; p.position.set(x, 0.05, z); scene.add(p); pads.push({ p, k: i }); });
  // 개구리
  const fr = new THREE.Group(); fr.position.set(0.6, 0.07, 0.4); fr.rotation.y = 0.6; scene.add(fr);
  const fb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.34, 14, 10), K.lam(0x55534e)), 40); fb.scale.set(1.2, 0.75, 1); fb.position.y = 0.25; fr.add(fb);
  [-0.15, 0.15].forEach(x => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), K.lam(0xf2f0ea)); e.position.set(x, 0.5, 0.18); fr.add(e); const pu = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 4), K.lam(0x111111)); pu.position.set(x, 0.52, 0.26); fr.add(pu); });
  const throat = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), K.lam(0xdedad2)); throat.position.set(0, 0.17, 0.3); fr.add(throat);
  // 갈대
  const reeds = []; for (let i = 0; i < 10; i++) { const x = 1.2 + (i % 5) * 0.9 + (i > 4 ? 0.45 : 0), z = i > 4 ? -3.9 : -3.3 - (i % 3) * 0.25; const g = new THREE.Group(); g.position.set(x + 1.5, 0, z); scene.add(g);
    K.cyl(0.02, 0.03, 2.2 + (i % 3) * 0.3, 0x6e6c66, 0, 1.1, 0, g, 5); const h = K.cyl(0.07, 0.07, 0.4, 0x3a3936, 0, 2.7, 0, g, 6); reeds.push({ g, k: i * 0.6 }); }
  // 잠자리
  const df = new THREE.Group(); scene.add(df); K.cyl(0.03, 0.03, 0.5, 0x2a2a28, 0, 0, 0, df, 5).rotation.z = Math.PI / 2;
  const wings = [-1, 1].map(s => { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.5), new THREE.MeshBasicMaterial({ color: 0xfbfaf6, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })); w.position.set(0.05, 0.02, 0.28 * s); w.rotation.x = Math.PI / 2; df.add(w); return w; });
  // 바위·들꽃
  K.box(1.2, 0.5, 0.9, 0x8a8782, -2.6, 0.25, 1.2, scene); [[-3.6, 0.2], [-1.6, 2.0], [4.8, 1.6]].forEach(([x, z]) => { K.cyl(0.02, 0.02, 0.6, 0x55534e, x, 0.3, z, scene, 4); const f = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), K.lam(0xf6f5f1)); f.position.set(x, 0.65, z); scene.add(f); });
  const W = K.person(scene, { x: -1.3, z: 1.0, rot: -Math.PI / 2 - 0.9, coat: 0xf2f0ea, outfit: 'longcoat', skirt: 'long', skirtC: 0xe6e3dc, hair: 'bun', eyes: 'narrow', brows: 'up', mouth: 'smile', seed: 2822, scale: 0.95 });
  cam.position.set(0.6, 3.2, 8.4); cam.lookAt(0.2, 1.4, -0.6);
  return (t, ph) => {
    const s = Math.sin(ph);
    W.pose({ lean: 0.22, headPitch: -0.45, headYaw: 0.35 + 0.05 * s, armL: { fwd: 1.2, elbow: 2.1, point: true }, armR: { fwd: 0.8, elbow: 0.6, out: 0.2 } });
    throat.scale.setScalar(1 + 0.5 * Math.max(0, Math.sin(ph * 3)));
    reeds.forEach(o => { o.g.rotation.z = 0.06 * Math.sin(ph * 2 + o.k); });
    pads.forEach(o => { o.p.position.y = 0.05 + 0.015 * Math.sin(ph * 2 + o.k); });
    df.position.set(2.4 + 1.6 * Math.cos(ph), 1.8 + 0.25 * Math.sin(ph * 2), -1.2 + 0.8 * Math.sin(ph)); df.rotation.y = -ph - Math.PI / 2;
    wings.forEach((w, i) => { w.rotation.y = 0.5 * Math.sin(ph * 12 + i); });
  };
}
