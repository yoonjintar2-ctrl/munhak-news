// 11/29 오늘의 문장 「낙엽을 태우면서」: 늦가을 마당. 조끼 차림·베레모의 사내가 갈퀴로 낙엽 더미를 긁어모으고, 더미에서 연기가 피어오른다. 툇마루 위 커피잔에서 김, 나뭇잎이 떨어진다. 울타리·장독·빗자루. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 95] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d4d0c6', line: '#ccc8be', tiles: 6, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 1129 });
  // 툇마루(왼쪽 집 한 모서리)
  K.box(6, 0.5, 2.2, 0x8a8782, -5.2, 0.25, -2.6, scene); K.box(6, 4.2, 0.3, 0xe9e7e1, -5.2, 2.6, -3.7, scene); K.box(6.6, 0.3, 2.8, 0x45443f, -5.2, 4.8, -2.9, scene);
  [-7.8, -2.6].forEach(x => K.box(0.25, 4.3, 0.25, 0x55534e, x, 2.4, -1.6, scene));
  K.box(1.2, 1.0, 0.1, 0xf6f5f1, -5.2, 2.8, -3.5, scene); // 창
  const cup = K.cyl(0.18, 0.14, 0.3, 0xfbfaf6, -3.6, 0.65, -2.0, scene, 12); K.cyl(0.3, 0.32, 0.03, 0xfbfaf6, -3.6, 0.51, -2.0, scene, 14);
  // 장독 셋
  [[-8.2, -5.2, 0.7], [-7.0, -5.4, 0.55], [-9.1, -5.0, 0.5]].forEach(([x, z, r]) => { const j = K.inked(new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), K.lam(0x45443f)), 40); j.scale.y = 1.15; j.position.set(x, r * 1.1, z); scene.add(j); K.cyl(r * 0.5, r * 0.55, 0.12, 0x3a3936, x, r * 2.2, z, scene, 12); });
  // 나무(가지에 잎 조금)
  K.cyl(0.25, 0.35, 5, 0x3a3936, 5.5, 2.5, -4.5, scene, 8); const crown = K.inked(new THREE.Mesh(new THREE.SphereGeometry(2.2, 14, 10), K.lam(0x8a8782)), 60); crown.scale.y = 0.8; crown.position.set(5.5, 5.6, -4.5); scene.add(crown);
  // 빗자루 기대 놓기
  const br = K.cyl(0.04, 0.04, 2.4, 0x55534e, 3.6, 1.2, -3.8, scene, 6); br.rotation.z = 0.25;
  // 낙엽 더미 + 연기
  const pile = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.1, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x6e6c66)), 50); pile.scale.set(1.3, 0.6, 1); pile.position.set(0.8, 0, -0.6); scene.add(pile);
  for (let i = 0; i < 14; i++) { const l = new THREE.Mesh(new THREE.CircleGeometry(0.22, 5), new THREE.MeshLambertMaterial({ color: [0x55534e, 0x8a8782, 0x3a3936][i % 3], side: THREE.DoubleSide })); l.rotation.x = -Math.PI / 2; l.position.set(-3 + (i * 0.77) % 7, 0.03, -1 + (i * 0.53) % 4); scene.add(l); }
  const smoke = []; for (let i = 0; i < 7; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 8), new THREE.MeshBasicMaterial({ color: 0xf8f7f3, transparent: true })); scene.add(s); smoke.push({ s, k: i / 7 }); }
  const steam = []; for (let i = 0; i < 4; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })); scene.add(s); steam.push({ s, k: i / 4 }); }
  const falls = []; for (let i = 0; i < 6; i++) { const l = new THREE.Mesh(new THREE.CircleGeometry(0.13, 5), new THREE.MeshLambertMaterial({ color: 0x55534e, side: THREE.DoubleSide })); scene.add(l); falls.push({ l, k: i / 6 }); }
  // 사내: 조끼+셔츠, 베레모, 갈퀴(손에 붙임)
  const P = K.person(scene, { x: -1.0, z: -0.2, rot: -Math.PI / 2 + 0.5, coat: 0x45443f, outfit: 'vest', sleeve: 0xeeece6, pants: 0x3a3936, hair: 'beret', eyes: 'smile', brows: 'flat', mouth: 'smile', beard: 'mustache', seed: 11291 });
  const rake = new THREE.Group(); K.cyl(0.035, 0.035, 2.6, 0x3a3936, 0, -1.2, 0, rake, 6); const head = K.box(0.9, 0.08, 0.12, 0x2a2a28, 0, -2.5, 0, rake); for (let i = 0; i < 6; i++) K.box(0.03, 0.22, 0.03, 0x2a2a28, -0.4 + i * 0.16, -2.6, 0.05, rake);
  P.hold('R', rake, { at: [0, -0.05, 0], rot: [-0.5, 0, 0] });
  cam.position.set(-0.8, 3.0, 9.0); cam.lookAt(-1.0, 2.1, -1.6);
  return (t, ph) => {
    const s = Math.sin(ph * 2);
    P.pose({ lean: 0.25 + 0.08 * s, headPitch: 0.15, headYaw: 0.1, armR: { fwd: 0.45 + 0.2 * s, elbow: 0.3, out: 0.1 }, armL: { fwd: 0.7 + 0.2 * s, elbow: 0.9, out: -0.3 } });
    smoke.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.s.position.set(0.8 + 0.4 * Math.sin(p * 5 + o.k * 3) + p * 0.8, 0.6 + p * 4.2, -0.6); o.s.scale.setScalar(0.6 + p * 2.2); o.s.material.opacity = 0.8 * (1 - p); });
    steam.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.s.position.set(-3.6 + 0.05 * Math.sin(p * 9), 0.85 + p * 0.8, -2.0); o.s.scale.setScalar(0.6 + p * 1.4); o.s.material.opacity = 0.7 * (1 - p); });
    falls.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.l.position.set(4.2 + o.k * 2.4 + 0.5 * Math.sin(p * 8 + o.k * 4), 5.2 - p * 5.1, -3.5 + o.k * 1.5); o.l.rotation.set(p * 7, p * 5, o.k); });
  };
}
