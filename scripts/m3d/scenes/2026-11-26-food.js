// 11/26 문학 한술 『빨간 머리 앤』의 산딸기 주스: 초록 지붕 집 부엌 식탁(레이스 천) 위에 진한 붉은 음료가 든 유리병, 작은 유리잔 둘(반쯤 찬), 둥근 과자 접시, 꽃병. 창밖 사과나무 가지 흔들림·잔 속 음료 출렁임·꽃잎. 사람 없음. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeae8e2, fog: [0xe6e4de, 30, 90], fov: 40 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(16, 0.2, 14, 0xd2cdc2, 0, -0.1, -3, scene);
  K.box(16, 8, 0.3, 0xeeebe4, 0, 4, -6.4, scene);
  // 창 + 사과나무 가지
  K.box(3.0, 2.4, 0.1, 0xfbfaf6, 2.4, 4.4, -6.2, scene); K.box(3.2, 0.15, 0.3, 0x55534e, 2.4, 3.15, -6.1, scene); K.box(0.1, 2.4, 0.2, 0x55534e, 2.4, 4.4, -6.1, scene); K.box(3.0, 0.1, 0.2, 0x55534e, 2.4, 4.4, -6.1, scene);
  const br = new THREE.Group(); br.position.set(1.2, 5.2, -6.18); scene.add(br); const bb = K.box(2.6, 0.08, 0.02, 0x45443f, 1.2, 0, 0, br); bb.rotation.z = -0.25;
  const apples = []; [[0.6, -0.15], [1.5, -0.35], [2.2, -0.55]].forEach(([x, y]) => { const a = new THREE.Mesh(new THREE.CircleGeometry(0.16, 14), K.flat(0x6e6c66)); a.position.set(x, y - 0.15, 0.01); br.add(a); apples.push(a); });
  // 찬장
  K.box(2.2, 3.4, 0.8, 0x8a8782, -4.4, 1.7, -5.8, scene); [1.0, 2.0, 3.0].forEach(y => K.box(2.0, 0.06, 0.7, 0x55534e, -4.4, y, -5.5, scene)); [-5.0, -4.4, -3.8].forEach(x => K.cyl(0.25, 0.25, 0.04, 0xeeece6, x, 2.3, -5.6, scene, 14).rotation.x = Math.PI / 2);
  // 식탁 + 레이스 천
  const tb = new THREE.Group(); tb.position.set(0, 0, -2.4); scene.add(tb);
  K.box(4.6, 0.16, 2.6, 0x6e6c66, 0, 1.3, 0, tb); [[-2.1, -1.1], [2.1, -1.1], [-2.1, 1.1], [2.1, 1.1]].forEach(([x, z]) => K.box(0.14, 1.3, 0.14, 0x55534e, x, 0.65, z, tb));
  K.box(3.2, 0.02, 2.0, 0xf6f5f1, 0, 1.39, 0, tb);
  for (let i = 0; i < 9; i++) { const c = new THREE.Mesh(new THREE.CircleGeometry(0.12, 10), K.flat(0xf6f5f1)); c.position.set(-1.6 + i * 0.4, 1.32, 1.01); tb.add(c); }
  // 병(진한 음료) + 마개
  const bottle = new THREE.Group(); bottle.position.set(-0.7, 1.4, -0.2); tb.add(bottle);
  K.cyl(0.32, 0.34, 1.0, new THREE.MeshLambertMaterial({ color: 0xd8d5cd, transparent: true, opacity: 0.45, depthWrite: false }), 0, 0.5, 0, bottle, 18);
  K.cyl(0.3, 0.32, 0.9, 0x2f2e2b, 0, 0.45, 0, bottle, 18); K.cyl(0.12, 0.2, 0.35, 0x8a8782, 0, 1.17, 0, bottle, 14); K.cyl(0.1, 0.1, 0.15, 0x8a8782, 0, 1.4, 0, bottle, 10);
  // 잔 둘
  const drinks = []; [[0.3, 0.3], [0.95, 0.1]].forEach(([x, z]) => { const g = new THREE.Group(); g.position.set(x, 1.4, z); tb.add(g); K.cyl(0.2, 0.17, 0.5, new THREE.MeshLambertMaterial({ color: 0xe2dfd7, transparent: true, opacity: 0.45, depthWrite: false }), 0, 0.25, 0, g, 16); const d = K.cyl(0.18, 0.16, 0.28, 0x3a3936, 0, 0.15, 0, g, 16); const sf = new THREE.Mesh(new THREE.CircleGeometry(0.18, 16), K.flat(0x55534e)); sf.rotation.x = -Math.PI / 2; sf.position.y = 0.3; g.add(sf); drinks.push(sf); });
  // 과자 접시 + 꽃병
  K.cyl(0.55, 0.5, 0.05, 0xeeece6, 1.0, 1.43, 0.7, tb, 20); for (let i = 0; i < 5; i++) { const c = K.cyl(0.14, 0.14, 0.05, 0x9a978f, 1.0 + 0.28 * Math.cos(i * 1.26), 1.49 + (i % 2) * 0.03, 0.7 + 0.28 * Math.sin(i * 1.26), tb, 14); }
  K.cyl(0.18, 0.14, 0.5, 0x8a8782, -1.5, 1.65, -0.5, tb, 12);
  const flowers = []; for (let i = 0; i < 4; i++) { const f = new THREE.Group(); f.position.set(-1.5, 1.9, -0.5); tb.add(f); K.cyl(0.015, 0.015, 0.6, 0x45443f, 0, 0.3, 0, f, 4); const h = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), K.lam(0xeeece6)); h.position.y = 0.62; f.add(h); f.rotation.z = (i - 1.5) * 0.3; flowers.push({ f, k: i }); }
  const petals = []; for (let i = 0; i < 6; i++) { const p = new THREE.Mesh(new THREE.CircleGeometry(0.05, 6), K.flat(0xeeece6)); scene.add(p); petals.push({ p, k: i / 6 }); }
  cam.position.set(0.6, 3.4, 4.2); cam.lookAt(0.1, 1.6, -2.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    br.rotation.z = 0.05 * Math.sin(ph * 2); apples.forEach((a, i) => { a.position.x += 0; a.rotation.z = 0.2 * Math.sin(ph * 2 + i); });
    drinks.forEach((d, i) => { d.rotation.x = -Math.PI / 2 + 0.08 * Math.sin(ph * 2 + i); d.rotation.y = 0.08 * Math.cos(ph * 2 + i); });
    flowers.forEach(o => { o.f.rotation.x = 0.06 * Math.sin(ph * 2 + o.k); });
    petals.forEach(o => { const v = (o.k + u) % 1; o.p.position.set(1.4 + v * 2.0 + 0.1 * Math.sin(ph * 3 + o.k * 7), 5.2 - v * 1.8, -6.12); });
  };
}
