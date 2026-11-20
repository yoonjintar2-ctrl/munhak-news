// 11/21 오늘의 소설 구절 『토지』 "1897년의 한가위.": 한가위 아침, 기와집 솟을대문 앞 마당에서 마을 사람 셋이 북·꽹과리를 치며 돌고(한 사람은 상모 끈을 돌림), 대문 곁에 선 어린 소녀(댕기 머리)가 그 모습을 바라본다. 뒤로 누런 들판의 벼가 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xeae8e2, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#e2dfd7', line: '#d6d3cb', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 231, near: false });
  // 기와집 담 + 솟을대문(왼쪽)
  K.box(9, 2.2, 0.5, 0xe8e6e0, -7, 1.1, -5, scene); K.box(9.6, 0.3, 0.9, 0x45443f, -7, 2.35, -5, scene);
  K.box(2.6, 3.4, 0.5, 0x8a8782, -2.4, 1.7, -5, scene); K.box(1.6, 2.6, 0.1, 0x55534e, -2.4, 1.3, -4.7, scene);
  const roof = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 2.2, 1.0, 4, 1), K.lam(0x3a3936)), 30); roof.rotation.y = Math.PI / 4; roof.scale.set(1.3, 1, 0.6); roof.position.set(-2.4, 3.9, -5); scene.add(roof);
  K.box(6, 3, 4, 0xe8e6e0, -7, 1.5, -9, scene); const r2 = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 4.6, 1.6, 4, 1), K.lam(0x45443f)), 30); r2.rotation.y = Math.PI / 4; r2.scale.set(1.2, 1, 0.8); r2.position.set(-7, 3.8, -9); scene.add(r2);
  // 들판의 벼(오른쪽 뒤)
  const rice = []; for (let i = 0; i < 70; i++) { const g = new THREE.Group(); g.position.set(3 + (i % 14) * 0.9, 0, -9 - Math.floor(i / 14) * 1.2); scene.add(g); const s = K.cyl(0.03, 0.04, 1.2, 0xb0aca2, 0, 0.6, 0, g, 4); const h = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 5), K.lam(0xc8c3b8)); h.scale.y = 2; h.position.set(0.1, 1.2, 0); g.add(h); rice.push(g); }
  // 장독 셋
  [[-5.6, -3.6], [-5.0, -3.9], [-4.4, -3.5]].forEach(([x, z], i) => { K.cyl(0.35, 0.28, 0.7 - i * 0.1, 0x55534e, x, 0.35, z, scene, 14); });
  // 풍물패
  const drum = () => { const g = new THREE.Group(); K.cyl(0.4, 0.4, 0.5, 0x8a8782, 0, 0, 0, g, 16).rotation.z = Math.PI / 2; return g; };
  const gong = () => { const g = new THREE.Group(); K.cyl(0.32, 0.32, 0.06, 0x3a3936, 0, 0, 0, g, 16).rotation.x = Math.PI / 2; return g; };
  const band = [0, 1, 2].map(i => { const P = K.person(scene, { x: 0, z: 0, rot: 0, coat: [0xf2f0ea, 0xeceae4, 0xf2f0ea][i], pants: 0xd8d5cd, hair: 'short', scale: 0.85 }); return P; });
  band[0].hold('L', drum(), { at: [0.1, -0.1, -0.3] }); band[1].hold('L', gong(), { at: [0, -0.1, -0.2] });
  const sang = new THREE.Group(); band[2].headG.add(sang); sang.position.y = 0.6; const rib = K.box(1.8, 0.04, 0.12, 0xfbfaf6, 0.9, 0, 0, sang);
  K.cyl(0.08, 0.08, 0.3, 0x2a2a28, 0, 0.1, 0, sang, 6);
  // 소녀(대문 곁)
  const G = K.person(scene, { x: -0.6, z: -3.4, rot: -0.9, coat: 0x6e6c66, pants: 0x55534e, hair: 'long', scale: 0.6 });
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.75, 1.7, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0x55534e, side: THREE.DoubleSide })), 40); sk.position.y = 0.85; G.root.add(sk);
  cam.position.set(0.8, 3.4, 6.6); cam.lookAt(0.6, 1.6, -3.2);
  return (t, ph) => {
    band.forEach((P, i) => { const a = ph + i * 2.09; P.root.position.set(2.6 + 1.7 * Math.cos(a), 0, -2.4 + 0.9 * Math.sin(a)); P.root.rotation.y = -a; P.pose({ bob: 0.08 * Math.abs(Math.sin(ph * 6)), armR: { fwd: 0.8 + 0.6 * Math.sin(ph * 6 + i), elbow: 1.2 }, armL: { fwd: 0.7, elbow: 1.3 }, headPitch: -0.1 }); });
    sang.rotation.y = ph * 2;
    rice.forEach((g, i) => { g.rotation.z = 0.12 * Math.sin(ph * 2 + i * 0.3); });
    G.pose({ headYaw: -0.3 + 0.3 * Math.sin(ph), armR: { fwd: 0.6 + 0.6 * K.win(ph, 0.3, 0.6, 0.1), elbow: 0.6 }, armL: { fwd: 0.1 } });
  };
}
