// 11/28 소설 구절 「경희」: 1910년대 한옥 대청. 저고리+무릎 통치마(pleat)·땋은 머리의 경희가 책을 가슴에 안고 서서 하늘을 올려다본다. 마당에 장독대·빨랫줄·우물. 풍경 흔들림·빨래 날림·참새. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe9e7e1, fog: [0xe5e3dd, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d4cb', line: '#d0ccc3', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 2831 });
  // 대청마루 + 기둥 + 처마
  const h = new THREE.Group(); h.position.set(-2.6, 0, -2.2); scene.add(h);
  K.box(6, 0.5, 3, 0x8a8782, 0, 0.25, 0, h); for (let i = 0; i < 6; i++) K.box(6, 0.02, 0.04, 0x6e6c66, 0, 0.51, -1.4 + i * 0.55, h);
  [-2.8, 2.8].forEach(x => K.box(0.3, 4.2, 0.3, 0x4a4844, x, 2.6, 1.3, h)); K.box(7.4, 0.3, 4.2, 0x55534e, 0, 4.8, 0.2, h); K.box(6, 3.4, 0.2, 0xeeebe4, 0, 2.2, -1.5, h);
  [-1.5, 1.5].forEach(x => K.box(1.6, 2.4, 0.1, 0xf6f5f1, x, 2.0, -1.38, h));
  const bell = new THREE.Group(); bell.position.set(2.8, 4.6, 1.6); h.add(bell); K.cyl(0.01, 0.01, 0.5, 0x2a2a28, 0, -0.25, 0, bell, 4); K.cyl(0.12, 0.18, 0.3, 0x3a3936, 0, -0.6, 0, bell, 8); const fish = K.box(0.25, 0.15, 0.02, 0x55534e, 0, -0.95, 0, bell);
  // 장독대·우물·빨랫줄
  [[4.6, -3.6], [5.4, -3.3], [5.0, -2.6], [5.9, -2.6]].forEach(([x, z], i) => K.cyl(0.38, 0.48, 0.85 - (i % 2) * 0.15, 0x45443f, x, 0.42, z, scene, 12));
  K.cyl(0.8, 0.8, 0.8, 0x8a8782, 3.6, 0.4, 1.2, scene, 14); K.cyl(0.65, 0.65, 0.82, 0x3a3936, 3.6, 0.42, 1.2, scene, 14);
  K.cyl(0.05, 0.05, 2.8, 0x3a3936, 1.4, 1.4, -4.4, scene, 5); K.cyl(0.05, 0.05, 2.8, 0x3a3936, 6.8, 1.4, -4.4, scene, 5); K.line([[1.4, 2.7, -4.4], [6.8, 2.7, -4.4]], scene);
  const cloths = []; [[2.4, 0xf6f5f1], [3.9, 0x8a8782], [5.4, 0xeeece6]].forEach(([x, c], i) => { const g = new THREE.Group(); g.position.set(x, 2.7, -4.4); scene.add(g); const m = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.3), new THREE.MeshLambertMaterial({ color: c, side: THREE.DoubleSide })); m.position.y = -0.65; g.add(m); cloths.push({ g, k: i }); });
  const birds = []; [[0.6, 0.0], [-0.2, 1.6]].forEach(([x, k]) => { const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), K.lam(0x55534e)), 40); b.scale.set(1.3, 1, 1); scene.add(b); birds.push({ b, x, k }); });
  const G = K.person(scene, { x: 0.3, z: 0.9, rot: Math.PI - 0.35, coat: 0xf2f0ea, outfit: 'jeogori', skirt: 'pleat', skirtC: 0x3a3936, hair: 'braid', eyes: 'wide', brows: 'up', mouth: 'line', seed: 2832, scale: 0.95 });
  const book = K.box(0.55, 0.75, 0.12, 0x2a2a28, 0, 0, 0, null); G.hold('L', book, { at: [0.0, -0.15, 0.1], rot: [0.2, 0, 0] });
  cam.position.set(1.2, 3.2, 9.0); cam.lookAt(0.0, 2.0, -0.8);
  return (t, ph) => {
    const s = Math.sin(ph);
    G.pose({ headPitch: 0.3 + 0.06 * s, headYaw: 0.1, armL: { fwd: 0.7, elbow: 1.9, out: -0.1 }, armR: { fwd: 0.35 + 0.15 * s, elbow: 0.5 } });
    bell.rotation.z = 0.25 * Math.sin(ph * 2); bell.rotation.x = 0.1 * Math.sin(ph * 2 + 1);
    cloths.forEach(o => { o.g.rotation.x = -0.25 - 0.2 * Math.sin(ph * 2 + o.k); });
    birds.forEach(o => { o.b.position.set(o.x + 2.4, 0.15 + 0.12 * Math.abs(Math.sin(ph * 3 + o.k)), 2.6); });
  };
}
