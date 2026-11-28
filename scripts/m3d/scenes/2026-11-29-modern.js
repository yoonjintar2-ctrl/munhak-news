// 11/29 1분 현대문학 『삼미 슈퍼스타즈의 마지막 팬클럽』 대표: 1980년대 야구장 외야 관중석. 야구 모자 쓴 두 소년(스웨터·조끼)이 팻말(도형만, 글자 없음)을 흔들며 응원하고, 저 아래 그라운드 위로 공이 높이 떠오른다. 깃발 펄럭임·종이 꽃가루. 상표·로고 없음
export const secs = 3;
export const opts = { bg: 0xeae8e2, fog: [0xe6e4de, 40, 120] };
export default function (K) {
  const { THREE, scene, cam } = K;
  // 관중석 계단(뒤로 올라감) — 카메라는 관중석 위에서 그라운드를 내려다봄
  for (let r = 0; r < 4; r++) K.box(24, 0.6, 1.6, r % 2 ? 0xc8c4bb : 0xb8b4ac, 0, 0.3 + r * 0.6, 2 + r * 1.6, scene);
  // 펜스 + 그라운드(외야 잔디 줄무늬) + 내야 흙
  K.box(60, 1.4, 0.3, 0x55534e, 0, 0.0, 0.6, scene);
  for (let i = 0; i < 8; i++) { const g = new THREE.Mesh(new THREE.PlaneGeometry(80, 5), K.lam(i % 2 ? 0xb0aca4 : 0xa29e96)); g.rotation.x = -Math.PI / 2; g.position.set(0, -0.6, -2 - i * 5); scene.add(g); }
  const dia = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), K.lam(0xd2cec4)); dia.rotation.x = -Math.PI / 2; dia.rotation.z = Math.PI / 4; dia.position.set(0, -0.58, -38); scene.add(dia);
  [[0, -28], [7, -38], [-7, -38], [0, -48]].forEach(([x, z]) => K.box(0.8, 0.1, 0.8, 0xfbfaf6, x, -0.5, z, scene));
  // 건너편 관중석·조명탑
  K.box(80, 8, 4, 0xb0aca4, 0, 3, -60, scene); [-24, 24].forEach(x => { K.cyl(0.4, 0.5, 22, 0x45443f, x, 10, -55, scene, 8); K.box(5, 3, 0.6, 0xeeece6, x, 21, -55, scene); });
  // 깃발 셋
  const flags = []; [-9, 0, 9].forEach((x, i) => { K.cyl(0.05, 0.05, 6, 0x2a2a28, x, 9, -58, scene, 6); const f = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.4, 6, 2), new THREE.MeshLambertMaterial({ color: [0x55534e, 0xfbfaf6, 0x8a8782][i], side: THREE.DoubleSide })); f.position.set(x + 1.2, 11.2, -58); scene.add(f); flags.push({ f, b: f.geometry.attributes.position.array.slice(), k: i }); });
  // 수비수 셋(작게)
  const fielders = []; [[-10, -16], [2, -20], [12, -14]].forEach(([x, z], i) => { const p = K.person(scene, { x, z, rot: 0, coat: 0xfbfaf6, outfit: 'vest', hair: 'cap', seed: 11320 + i, scale: 0.6, detail: false }); p.root.position.y = -0.6; fielders.push(p); });
  // 공
  const ball = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 10), K.lam(0xffffff)), 30); scene.add(ball);
  // 두 소년(관중석 앞줄, 뒤쪽 3/4 → 그라운드를 봄)
  const A = K.person(scene, { x: -1.0, z: 2.4, rot: 0.35, coat: 0x45443f, outfit: 'sweater', hair: 'cap', eyes: 'wide', brows: 'up', mouth: 'open', seed: 11321, scale: 0.8 });
  const B = K.person(scene, { x: 1.2, z: 2.4, rot: -0.35, coat: 0x8a8782, outfit: 'vest', sleeve: 0xeeece6, hair: 'cap', eyes: 'smile', brows: 'up', mouth: 'open', seed: 11322, scale: 0.8 });
  [A, B].forEach(P => P.root.position.y = 0.6);
  const sign = new THREE.Group(); K.cyl(0.03, 0.03, 1.4, 0x3a3936, 0, -0.5, 0, sign, 6); const board = K.box(1.6, 0.9, 0.05, 0xfbfaf6, 0, -1.4, 0, sign); K.box(0.9, 0.18, 0.06, 0x2a2a28, 0, -1.3, 0, sign); K.box(0.18, 0.5, 0.06, 0x2a2a28, 0.6, -1.45, 0, sign);
  B.hold('R', sign, { at: [0, -0.05, 0], rot: [Math.PI, 0, 0] });
  // 앞줄 뒷머리 관중
  for (let i = 0; i < 7; i++) { if (i === 3) continue; const x = -7 + i * 2.2; const h = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 10), K.lam([0x2a2a28, 0x45443f][i % 2])), 40); h.position.set(x, 2.1, 4.2); scene.add(h); K.box(1.0, 1.0, 0.6, [0x6e6c66, 0x8a8782][i % 2], x, 1.4, 4.3, scene); }
  const conf = []; for (let i = 0; i < 12; i++) { const c = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.08), new THREE.MeshLambertMaterial({ color: [0xfbfaf6, 0x55534e, 0x8a8782][i % 3], side: THREE.DoubleSide })); scene.add(c); conf.push({ c, x: -3 + (i * 0.53) % 6, k: (i * 0.29) % 1 }); }
  cam.position.set(0, 5.2, 8.6); cam.lookAt(0, 2.0, -6);
  return (t, ph) => {
    const s = Math.sin(ph * 3);
    A.pose({ headPitch: -0.25, armL: { fwd: 2.6, out: 0.3, elbow: 0.2 }, armR: { fwd: 2.4 + 0.2 * s, out: 0.4, elbow: 0.3 }, bob: 0.6 + 0.08 * Math.abs(s) });
    B.pose({ headPitch: -0.2, headYaw: 0.3, armR: { fwd: 2.5 + 0.25 * s, out: 0.2, elbow: 0.2 }, armL: { fwd: 1.6, out: 0.5, elbow: 0.8 }, bob: 0.6 + 0.08 * Math.abs(Math.sin(ph * 3 + 1)) });
    const u = (ph / (Math.PI * 2)); ball.position.set(-2 + u * 8, 1 + 14 * Math.sin(Math.PI * u), -40 + u * 22);
    flags.forEach(o => { const a = o.f.geometry.attributes.position; for (let i = 0; i < a.count; i++) { const x = o.b[i * 3]; a.array[i * 3 + 2] = 0.3 * (x + 1.2) * Math.sin(ph * 2 + x * 2 + o.k); } a.needsUpdate = true; });
    conf.forEach(o => { const p = (u + o.k) % 1; o.c.position.set(o.x + 0.4 * Math.sin(p * 9 + o.k * 7), 6 - p * 5, 1.5 + o.k); o.c.rotation.set(p * 9, p * 7, 0); });
    fielders.forEach((p, i) => p.pose({ headPitch: -0.5, armL: { fwd: 0.8 + 0.3 * Math.sin(ph + i), elbow: 0.6 }, armR: { fwd: 0.3 } , bob: -0.6 }));
  };
}
