// 11/27 「백치 아다다」 장면①(after 1): 시집 초가 마당. 앞치마·머릿수건 차림의 아다다가 절구질하고, 툇마루의 시어머니(저고리+층층 치마 대신 긴 치마, 쪽머리)와 두루마기·상투의 남편이 웃으며 바라본다. 절굿공이 오르내림·닭 쪼기·연기. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 120] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d4cb', line: '#d0ccc3', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2751, near: false });
  // 초가 + 툇마루
  const h = new THREE.Group(); h.position.set(-1, 0, -5); scene.add(h);
  K.box(9, 2.8, 3.2, 0xeeebe4, 0, 1.4, 0, h); [-2.6, 0, 2.6].forEach(x => K.box(1.2, 1.8, 0.1, 0x55534e, x, 1.5, 1.62, h));
  K.box(9.4, 0.4, 1.3, 0x6e6c66, 0, 0.6, 2.2, h);
  const roof = K.inked(new THREE.Mesh(new THREE.SphereGeometry(5.6, 22, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x8a8782)), 40); roof.scale.set(1.0, 0.33, 0.5); roof.position.y = 2.7; h.add(roof);
  // 장독대·짚단·굴뚝 연기
  [[4.6, -2.6], [5.4, -2.4], [5.0, -1.8]].forEach(([x, z], i) => K.cyl(0.35, 0.45, 0.8 - i * 0.1, 0x45443f, x, 0.4, z, scene, 12));
  K.cyl(0.6, 0.8, 1.2, 0xc8c4bb, -5.6, 0.6, -1.8, scene, 10);
  const smoke = []; for (let i = 0; i < 5; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfafaf8, transparent: true })); scene.add(s); smoke.push({ s, k: i / 5 }); }
  K.cyl(0.25, 0.3, 1.6, 0x55534e, 3.2, 3.6, -5.6, scene, 8);
  // 절구
  K.cyl(0.5, 0.4, 0.9, 0x55534e, 0.95, 0.45, 2.9, scene, 14);
  const A = K.person(scene, { x: 0.8, z: 1.9, rot: Math.PI + 0.2, coat: 0x8a8782, outfit: 'apron', skirt: 'long', skirtC: 0x55534e, hair: 'kerchief', eyes: 'smile', brows: 'flat', mouth: 'smile', seed: 2752, scale: 0.92 });
  const pestle = K.cyl(0.1, 0.1, 1.8, 0x3a3936, 0, 0, 0, null, 8); A.hold('R', pestle, { at: [0, -0.1, 0], rot: [Math.PI / 2, 0, 0] });
  const M = K.person(scene, { x: -2.4, z: -2.4, rot: 0.2 + Math.PI, coat: 0xf2f0ea, outfit: 'jeogori', skirt: 'chima', skirtC: 0x45443f, hair: 'bun', eyes: 'closed', brows: 'flat', mouth: 'smile', seed: 2753, scale: 0.88 });
  const H = K.person(scene, { x: -4.2, z: -2.0, rot: Math.PI + 0.4, coat: 0xdedad2, outfit: 'durumagi', hair: 'topknot', eyes: 'dot', brows: 'up', mouth: 'smile', seed: 2754 });
  const hens = []; [[3, 2.6], [3.8, 1.6], [-1.6, 2.8]].forEach(([x, z], i) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = i * 1.3; scene.add(g);
    const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 10), K.lam(i === 1 ? 0x6e6c66 : 0xf2f0ea)), 50); b.scale.set(1.3, 1, 0.9); b.position.y = 0.4; g.add(b);
    const hh = new THREE.Group(); hh.position.set(-0.36, 0.7, 0); g.add(hh); hh.add(new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), K.lam(0xf2f0ea))); const cb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.13, 0.14), K.lam(0x2a2a28)); cb.position.y = 0.15; hh.add(cb); const bk = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 6), K.lam(0x55534e)); bk.rotation.z = Math.PI / 2; bk.position.x = -0.17; hh.add(bk); hens.push({ hh, k: i * 1.7 }); });
  cam.position.set(2.5, 3.4, 9.2); cam.lookAt(-0.6, 1.6, -1.5);
  return (t, ph) => {
    const up = 0.5 + 0.5 * Math.sin(ph * 2);
    A.pose({ lean: 0.15, headPitch: 0.1, armR: { fwd: 1.0 + 0.9 * up, elbow: 1.2 - 0.6 * up }, armL: { fwd: 1.0 + 0.9 * up, elbow: 1.2 - 0.6 * up, out: -0.25 } });
    M.pose({ headYaw: -0.3, armL: { fwd: 0.6, elbow: 1.5 }, armR: { fwd: 0.6, elbow: 1.5 } });
    H.pose({ headYaw: -0.5 + 0.1 * Math.sin(ph), armL: { fwd: 0.3, elbow: 0.8 }, armR: { fwd: 0.5, elbow: 1.4 } });
    hens.forEach(o => { o.hh.position.y = 0.55 + 0.15 * Math.abs(Math.sin(ph * 2 + o.k)); o.hh.rotation.z = 0.6 * Math.max(0, Math.sin(ph * 2 + o.k)); });
    smoke.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.s.position.set(3.2 + 0.4 * Math.sin(p * 5), 4.6 + p * 3, -5.6); o.s.scale.setScalar(0.6 + p * 1.4); o.s.material.opacity = 0.8 * (1 - p); });
  };
}
