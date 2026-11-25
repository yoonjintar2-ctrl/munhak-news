// 11/26 오늘의 문장 윤동주 「서시」: 늦가을 밤 언덕 위, 외투·목도리 차림의 청년이 서서 고개를 들어 별 하늘을 올려다본다. 곁의 나무에 남은 잎새가 바람에 떨고, 별이 깜박이며, 풀이 흔들린다. 밤이지만 하늘은 밝은 남색 대신 밝은 종이색(달빛). 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdcdad4, fog: [0xd8d6d0, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfccc4', line: '#c8c5bd', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2611, near: false });
  // 언덕
  const hill = K.inked(new THREE.Mesh(new THREE.SphereGeometry(6, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0xbcb9b1)), 80); hill.scale.set(1.4, 0.18, 1); hill.position.set(0, 0, -1); scene.add(hill);
  // 별
  const stars = []; for (let i = 0; i < 24; i++) { const s = new THREE.Mesh(new THREE.OctahedronGeometry(0.12 + (i % 3) * 0.05), K.flat(0x55534e)); s.position.set(-9 + (i * 3.7) % 18, 6 + (i * 1.9) % 6, -14 - (i % 4)); scene.add(s); stars.push({ s, k: i * 1.3 }); }
  // 나무(가지 + 남은 잎새)
  const tr = new THREE.Group(); tr.position.set(2.8, 1.0, -2.2); scene.add(tr);
  K.cyl(0.14, 0.22, 3.4, 0x45443f, 0, 1.7, 0, tr, 8);
  [[-0.9, 2.9, 0.7], [0.8, 3.2, -0.6], [0.1, 3.6, 0.2]].forEach(([x, y, r]) => { const b = K.cyl(0.05, 0.08, 1.6, 0x45443f, x / 2, y, 0, tr, 6); b.rotation.z = r; });
  const leaves = []; [[-1.3, 3.5], [1.2, 3.8], [0.3, 4.3], [-0.6, 3.2]].forEach(([x, y], i) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.18), new THREE.MeshLambertMaterial({ color: 0x55534e, side: THREE.DoubleSide })); m.position.set(x, y, 0); tr.add(m); leaves.push({ m, k: i }); });
  // 풀
  const grass = []; for (let i = 0; i < 26; i++) { const g = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.6, 4), K.lam(0x8a8782)); g.position.set(-3.5 + (i * 0.29) % 7, 1.0, -0.4 + (i * 0.37) % 2.2 - 1); scene.add(g); grass.push({ g, k: i * 0.5 }); }
  // 청년
  const P = K.person(scene, { x: -0.6, z: -0.6, rot: Math.PI - 0.5, coat: 0x45443f, pants: 0x2f2e2b, hair: 'short', outfit: 'longcoat', scarf: 0xf2f0ea, eyes: 'closed', brows: 'flat', mouth: 'small', scale: 1.05, seed: 2611 });
  P.root.position.y = 1.0;
  cam.position.set(0.4, 2.9, 6.6); cam.lookAt(0.4, 3.1, -2);
  return (t, ph) => {
    P.pose({ headPitch: 0.45 + 0.08 * Math.sin(ph), headYaw: 0.1 * Math.sin(ph), armL: { fwd: 0.15, elbow: 0.3 }, armR: { fwd: 0.15, elbow: 0.3 } });
    stars.forEach(o => o.s.scale.setScalar(0.7 + 0.5 * (0.5 + 0.5 * Math.sin(ph * 3 + o.k))));
    leaves.forEach(o => { o.m.rotation.set(0.4 * Math.sin(ph * 3 + o.k), 0.6 * Math.sin(ph * 2 + o.k), 0.3 * Math.sin(ph * 4 + o.k)); });
    grass.forEach(o => { o.g.rotation.z = 0.25 * Math.sin(ph * 2 + o.k); });
  };
}
