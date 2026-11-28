// 11/29 「금 따는 콩밭」 장면③(after 4): 산속 큰 바위 앞 고사상. 떡시루·물그릇·촛불 둘을 차려 놓고 영식(바지저고리)과 아내(저고리·한복 치마·쪽머리)가 나란히 몸을 숙여 두 손을 비비며 빈다. 촛불 흔들림·낙엽 떨어짐·솔가지 흔들림. 카메라 비스듬히 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 28, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d2cec4', line: '#cac6bc', tiles: 6, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 3313, near: false });
  // 큰 바위
  const rock = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(2.6, 1), K.lam(0x8a8782)), 35); rock.scale.set(1.3, 1.0, 0.8); rock.position.set(-5.2, 2.0, -3.6); scene.add(rock);
  const rock2 = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(1.0, 0), K.lam(0x6e6c66)), 35); rock2.position.set(-3.0, 0.7, -6.0); scene.add(rock2);
  // 소나무 둘(가지 흔들림)
  const pines = []; [[-4.6, -5.2], [5.8, -6.2]].forEach(([x, z], i) => { K.cyl(0.25, 0.35, 5.5, 0x3a3936, x, 2.75, z, scene, 8); const g = new THREE.Group(); g.position.set(x, 5.2, z); scene.add(g); [0, 1, 2].forEach(j => { const c = K.inked(new THREE.Mesh(new THREE.ConeGeometry(1.8 - j * 0.4, 1.2, 10), K.lam(0x55534e)), 50); c.position.y = j * 0.8; g.add(c); }); pines.push({ g, k: i }); });
  // 고사상: 낮은 상 + 떡시루 + 물그릇 + 촛불 둘
  K.box(2.4, 0.12, 1.2, 0x45443f, -2.4, 0.6, -2.2, scene); [[-3.5, -1.8], [-1.3, -1.8], [-3.5, -2.6], [-1.3, -2.6]].forEach(([x, z]) => K.box(0.1, 0.55, 0.1, 0x2a2a28, x, 0.28, z, scene));
  K.cyl(0.45, 0.32, 0.5, 0x55534e, -2.4, 0.92, -2.2, scene, 16); const cake = K.cyl(0.47, 0.47, 0.18, 0xeeece6, -2.4, 1.26, -2.2, scene, 16);
  K.cyl(0.18, 0.14, 0.15, 0xfbfaf6, -1.7, 0.74, -1.9, scene, 12);
  const flames = []; [-3.3, -1.5].forEach(x => { K.cyl(0.06, 0.06, 0.4, 0xfbfaf6, x, 0.86, -2.5, scene, 8); const f = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })); f.position.set(x, 1.17, -2.5); scene.add(f); flames.push(f); });
  // 부부(상 앞에서 몸을 깊이 숙여 손 비빔) — 바닥에 앉은 듯 낮춤
  const Y = K.person(scene, { x: -0.4, z: -2.6, rot: Math.PI / 2, coat: 0xeeece6, pants: 0xd8d4cc, outfit: 'jeogori', hair: 'topknot', eyes: 'closed', brows: 'worried', mouth: 'small', seed: 11301 });
  const W = K.person(scene, { x: 0.6, z: -1.2, rot: Math.PI / 2, coat: 0xc8c4bb, outfit: 'jeogori', skirt: 'chima', skirtC: 0x45443f, hair: 'bun', eyes: 'closed', brows: 'worried', mouth: 'small', seed: 11302 });
  [Y, W].forEach(P => { P.root.position.y = -0.9; });
  // 짚신 한 켤레
  [1.6, 2.0].forEach(x => K.box(0.3, 0.1, 0.6, 0x8a8782, x, 0.05, -0.4, scene));
  const leaves = []; for (let i = 0; i < 6; i++) { const l = new THREE.Mesh(new THREE.CircleGeometry(0.13, 5), new THREE.MeshLambertMaterial({ color: 0x45443f, side: THREE.DoubleSide })); scene.add(l); leaves.push({ l, k: i / 6 }); }
  cam.position.set(1.5, 3.0, 7.0); cam.lookAt(-1.4, 1.6, -2.0);
  return (t, ph) => {
    const s = Math.sin(ph * 4);
    [Y, W].forEach((P, i) => P.pose({ bob: -0.3, lean: 0.3 + 0.08 * Math.sin(ph * 2 + i), headPitch: 0.2, armL: { fwd: 0.9, elbow: 1.1, out: -0.4 + 0.06 * s }, armR: { fwd: 0.9, elbow: 1.1, out: -0.4 - 0.06 * s } }));
    flames.forEach((f, i) => { f.scale.set(1 + 0.15 * Math.sin(ph * 6 + i), 1 + 0.3 * Math.sin(ph * 5 + i * 2), 1); });
    pines.forEach(o => { o.g.rotation.z = 0.04 * Math.sin(ph * 2 + o.k); });
    leaves.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.l.position.set(-3 + o.k * 6 + 0.5 * Math.sin(p * 8 + o.k * 4), 5.2 - p * 5.1, -2.5 + o.k); o.l.rotation.set(p * 7, p * 5, o.k); });
  };
}
