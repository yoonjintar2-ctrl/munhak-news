// 11/28 1분 현대문학 『기억 전달자』 대표: 저녁 눈 내리는 언덕 꼭대기. 목폴라 스웨터 차림의 소년이 담요에 싼 아기를 두 팔로 안고 나무 썰매 옆에서 언덕 아래 마을을 내려다본다. 눈송이·먼 창 불빛 깜박임·소년 고개 숙임. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xdad8d2, 26, 90] };

function snow(K, n, box) { const { THREE } = K; const fl = []; for (let i = 0; i < n; i++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.05 + (i % 3) * 0.02, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffffff })); K.scene.add(m); fl.push({ m, x: box[0] + ((i * 37) % 100) / 100 * box[1], z: box[2] + ((i * 53) % 100) / 100 * box[3], k: (i * 0.137) % 1 }); }
  return ph => fl.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.m.position.set(o.x + 0.3 * Math.sin(p * 6 + o.k * 9), 8 - p * 8, o.z); }); }
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#efeee9', line: '#e6e5e0', tiles: 2, repeat: 3 });
  K.backdrop(scene, { kind: 'country', seed: 2881, near: false });
  const hill = K.inked(new THREE.Mesh(new THREE.SphereGeometry(9, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0xf6f5f1)), 50); hill.scale.set(1.4, 0.18, 0.9); hill.position.set(-2, 0, 0.5); scene.add(hill);
  // 먼 마을 창 불빛
  const wins = []; [[6, -14], [9, -16], [12, -13], [4, -18]].forEach(([x, z], i) => { const h = new THREE.Group(); h.position.set(x, 0, z); scene.add(h); K.box(2.2, 1.6, 1.8, 0x8a8782, 0, 0.8, 0, h); const r = K.inked(new THREE.Mesh(new THREE.ConeGeometry(1.8, 1.0, 4), K.lam(0x55534e)), 40); r.rotation.y = Math.PI / 4; r.position.y = 2.1; h.add(r);
    const w = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({ color: 0xffffff })); w.position.set(0.3, 0.9, 0.92); h.add(w); wins.push({ w, k: i }); });
  // 썰매
  const sled = new THREE.Group(); sled.position.set(1.2, 1.55, 0.9); sled.rotation.y = -0.5; scene.add(sled);
  K.box(1.6, 0.1, 0.7, 0x55534e, 0, 0.35, 0, sled); [-0.3, 0.3].forEach(z => { K.box(1.8, 0.06, 0.06, 0x2a2a28, 0, 0.05, z, sled); [-0.6, 0, 0.6].forEach(x => K.box(0.06, 0.3, 0.06, 0x2a2a28, x, 0.2, z, sled)); }); K.box(0.08, 0.25, 0.08, 0x2a2a28, 0.95, 0.12, 0, sled);
  // 앙상한 나무 두 그루
  [[-4.6, -1.2], [-6.0, 0.6]].forEach(([x, z]) => { K.cyl(0.12, 0.2, 3.4, 0x3a3936, x, 2.6, z, scene, 6); [[0.6, 3.4, 0.7], [-0.5, 3.8, -0.8]].forEach(([dx, y, r]) => { const b = K.cyl(0.04, 0.07, 1.4, 0x3a3936, x + dx * 0.5, y, z, scene, 5); b.rotation.z = r; }); });
  const B = K.person(scene, { x: -0.4, z: 0.7, rot: -Math.PI / 2 - 0.9, coat: 0x55534e, outfit: 'sweater', pants: 0x2a2a28, hair: 'short', eyes: 'narrow', brows: 'worried', mouth: 'small', seed: 2882, scale: 0.85 }); { const lift = (P, y) => { const L = new THREE.Group(); L.position.y = y; scene.add(L); L.add(P.root); }; lift(B, 1.55); }
  const baby = new THREE.Group(); const bl = K.inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.5, 4, 10), K.lam(0xeeece6)), 40); bl.rotation.z = Math.PI / 2; baby.add(bl); const bh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), K.lam(0xe2ddd4)); bh.position.set(0.45, 0.1, 0); baby.add(bh);
  B.hold('L', baby, { at: [0.25, -0.1, -0.2], rot: [0, 0.3, 0] });
  const sn = snow(K, 60, [-8, 16, -6, 9]);
  cam.position.set(1.2, 3.6, 7.0); cam.lookAt(0.0, 2.8, -0.6);
  return (t, ph) => {
    const s = Math.sin(ph);
    B.pose({ headPitch: 0.2 + 0.08 * s, headYaw: 0.15, armL: { fwd: 0.6, elbow: 1.6, out: -0.1 }, armR: { fwd: 0.55, elbow: 1.8, out: -0.3 } });
    wins.forEach(o => { o.w.material.color.setScalar(0.75 + 0.25 * Math.max(0, Math.sin(ph * 2 + o.k * 1.7))); });
    sn(ph);
  };
}
