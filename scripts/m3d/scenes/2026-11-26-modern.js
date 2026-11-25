// 11/26 1분 현대문학 권정생 『몽실 언니』 대표: 1950년 무렵 시골 흙길, 단발머리 소녀(몽실, 저고리+치마)가 포대기로 아기를 업고 지팡이를 짚으며 걸어간다(진행 방향 +x, 소녀 rot -π/2 + 약간 카메라 쪽). 길가 마른 풀·장승처럼 선 고목·멀리 보따리 진 피란민. 마른 풀 흔들림·지팡이·걸음(몸 기우뚱). 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d4d1c9', line: '#cdcac2', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2641, near: true });
  const road = new THREE.Mesh(new THREE.PlaneGeometry(40, 2.6), K.lam(0xc4bfb4)); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.02, -0.6); scene.add(road);
  // 고목 + 초가 + 짚단
  const tr = new THREE.Group(); tr.position.set(-4.2, 0, -3.2); scene.add(tr); K.cyl(0.3, 0.45, 3.6, 0x45443f, 0, 1.8, 0, tr, 8);
  [[-0.6, 3.6, 0.7], [0.7, 3.8, -0.6]].forEach(([x, y, r]) => { const b = K.cyl(0.08, 0.12, 2.0, 0x45443f, x, y, 0, tr, 6); b.rotation.z = r; });
  const hut = new THREE.Group(); hut.position.set(4.6, 0, -5.5); scene.add(hut); K.box(3.2, 1.8, 2.2, 0xe2dfd7, 0, 0.9, 0, hut);
  const thatch = K.inked(new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x8a8782)), 40); thatch.scale.set(1.0, 0.5, 0.75); thatch.position.y = 1.8; hut.add(thatch);
  [[1.8, -2.6], [2.4, -2.9]].forEach(([x, z]) => { const s = K.cyl(0.35, 0.45, 1.1, 0x9a978f, x, 0.55, z, scene, 10); });
  const grass = []; for (let i = 0; i < 30; i++) { const g = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.35, 4), K.lam(0x8a8782)); g.position.set(-6 + (i * 0.41) % 12, 0.17, -2.4 - (i * 0.37) % 1.4); scene.add(g); grass.push({ g, k: i * 0.5 }); }
  // 피란민(멀리, 보따리)
  const refs = []; [[-1, -9], [0.6, -9.4], [2.0, -9.2]].forEach(([x, z], i) => { const P = K.person(scene, { x, z, rot: -Math.PI / 2, coat: [0x6e6c66, 0x8a8782, 0x55534e][i], hair: ['kerchief', 'short', 'cap'][i], scale: 0.7, seed: 2650 + i }); const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), K.lam(0xd8d5cd)), 40); b.position.set(0, 1.6, 0.4); P.torso.add(b); refs.push(P); });
  // 몽실 + 아기(포대기) + 지팡이
  const M = K.person(scene, { x: -0.6, z: -0.4, rot: -Math.PI / 2 - 0.45, coat: 0xeeece6, outfit: 'jeogori', skirt: 'long', skirtC: 0x45443f, hair: 'bob', eyes: 'dot', brows: 'worried', mouth: 'line', scale: 0.85, seed: 2642 });
  const baby = new THREE.Group(); baby.position.set(0.3, 0.75, 0.55); M.torso.add(baby);
  const wrap = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), K.lam(0x8a8782)), 40); wrap.scale.set(1, 1.2, 0.7); baby.add(wrap);
  const bh = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), K.lam(0xdcd6ce)), 40); bh.position.set(0, 0.6, 0.05); baby.add(bh);
  const bhair = new THREE.Mesh(new THREE.SphereGeometry(0.23, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.45), K.lam(0x262626)); bhair.position.set(0, 0.62, 0.05); baby.add(bhair);
  K.box(0.9, 0.12, 0.7, 0x6e6c66, 0, 0.1, 0, baby).rotation.x = 0;
  const stick = K.cyl(0.04, 0.04, 1.7, 0x45443f, 0, 0, 0); M.hold('L', stick, { at: [0, -0.55, 0], rot: [0, 0, 0] });
  cam.position.set(0.8, 2.6, 6.4); cam.lookAt(-0.2, 1.4, -1.0);
  return (t, ph) => {
    const s = Math.sin(ph * 2), u = ph / (Math.PI * 2);
    M.root.position.x = -0.9 + 0.6 * u;
    M.pose({ headPitch: -0.1, headYaw: 0.15, lean: -0.08, bob: 0.06 * Math.abs(s), armL: { fwd: 0.35 + 0.15 * s, elbow: 0.3, out: 0.15 }, armR: { fwd: 0.8, elbow: 1.6, out: 0.1 } });
    M.root.rotation.z = 0.06 * s;
    refs.forEach((P, i) => { P.root.position.x = [-1, 0.6, 2.0][i] + 1.2 * u; P.pose({ bob: 0.04 * Math.abs(Math.sin(ph * 2 + i)) }); });
    grass.forEach(o => { o.g.rotation.z = 0.3 * Math.sin(ph * 2 + o.k); });
  };
}
