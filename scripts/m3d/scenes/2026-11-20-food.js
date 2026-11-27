// 11/20 문학 한술 「동백꽃」의 구운 감자: 싸리 울타리 아래 짚방석 위에 껍질이 터진 구운 감자 세 개, 갈라진 틈으로 하얀 속살과 김이 오른다. 곁에 호미와 나뭇단. 울타리 너머 노란 생강나무 꽃가지가 흔들리고 닭이 고개를 까딱인다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xeae8e2, 30, 90], fov: 38 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dedbd3', line: '#d4d1c9', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 111, near: false });
  // 짚방석(가는 줄무늬)
  K.box(4.4, 0.08, 2.6, 0xc8c3b8, 0, 0.04, 0, scene); for (let i = 0; i < 12; i++) K.line([[-2.2, 0.09, -1.2 + i * 0.22], [2.2, 0.09, -1.2 + i * 0.22]], scene);
  // 감자 세 개(타원 + 터진 틈의 흰 속살)
  const pot = (x, z, ry, s) => { const g = new THREE.Group(); g.position.set(x, 0.3 * s, z); g.rotation.y = ry; g.scale.setScalar(s); scene.add(g);
    const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 14), K.lam(0x6e6458)), 30); b.scale.set(1.35, 0.72, 0.9); g.add(b);
    const crack = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 10), K.lam(0xfaf6ec)), 40); crack.scale.set(1.5, 0.35, 0.6); crack.position.set(0.05, 0.3, 0); g.add(crack);
    { const ch = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), K.lam(0x45403a)); ch.scale.set(1.2, 0.5, 0.5); ch.position.set(-0.35, -0.05, 0.36); g.add(ch); } return g; };
  pot(-0.9, 0.2, 0.3, 1.0); pot(0.35, -0.2, -0.4, 0.95); pot(0.2, 0.75, 0.9, 0.85);
  // 호미 + 나뭇단
  K.box(1.2, 0.08, 0.1, 0x55534e, 1.8, 0.12, 0.6, scene).rotation.y = 0.5; const hb = K.box(0.35, 0.05, 0.28, 0x3a3936, 1.25, 0.1, 0.95, scene); hb.rotation.y = 0.5;
  for (let i = 0; i < 9; i++) { const s = K.cyl(0.07, 0.07, 2.4, 0x6e6c66, 0, 0, 0, scene, 6); s.rotation.z = Math.PI / 2; s.position.set(-2.4, 0.15 + (i % 3) * 0.14, -1.6 + Math.floor(i / 3) * 0.14); }
  // 싸리 울타리
  for (let i = 0; i < 30; i++) if (i % 2) K.cyl(0.04, 0.05, 1.6 + (i % 3) * 0.2, 0xa8a59e, -6 + i * 0.42, 0.8, -3.4, scene, 5);
  K.box(13, 0.08, 0.08, 0x8a8782, 0, 1.1, -3.35, scene);
  // 생강나무 꽃가지
  const br = new THREE.Group(); br.position.set(2.2, 0.6, -3.6); scene.add(br); const flw = [];
  for (let j = 0; j < 3; j++) { const arm = new THREE.Group(); arm.rotation.z = 0.6 - j * 0.5; br.add(arm); K.cyl(0.03, 0.04, 2.0, 0x45443f, 0, 1.0, 0, arm, 5);
    for (let i = 0; i < 6; i++) { const f = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), K.lam(0xf4f0d8)), 40); f.position.set(((i % 2) - 0.5) * 0.2, 0.4 + i * 0.28, 0); arm.add(f); } flw.push(arm); }
  // 닭
  const hen = new THREE.Group(); hen.position.set(-2.6, 0, -4.0); scene.add(hen); const hbd = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 10), K.lam(0x8a8782)), 50); hbd.scale.set(1.3, 1, 0.9); hbd.position.y = 0.5; hen.add(hbd);
  const hh = new THREE.Group(); hh.position.set(0.45, 0.85, 0); hen.add(hh); hh.add(new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), K.lam(0x8a8782))); K.box(0.06, 0.16, 0.16, 0x2a2a28, 0, 0.18, 0, hh);
  // 김
  const steam = []; for (let i = 0; i < 24; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false })); scene.add(s); steam.push({ s, k: i / 24, b: [[-0.9, 0.2], [0.35, -0.2], [0.2, 0.75]][i % 3] }); }
  cam.position.set(0.0, 2.4, 4.8); cam.lookAt(0.2, 0.9, -1.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    steam.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(o.b[0] + 0.15 * Math.sin(ph * 2 + o.k * 7), 0.55 + v * 1.8, o.b[1] + 0.1 * Math.cos(ph + o.k * 5)); o.s.scale.setScalar(0.6 + v * 1.8); o.s.material.opacity = 0.5 * (1 - v); });
    flw.forEach((a, i) => { a.rotation.x = 0.08 * Math.sin(ph * 2 + i); });
    hh.rotation.z = -0.35 * Math.max(0, Math.sin(ph * 4)); hh.position.x = 0.45 + 0.08 * Math.max(0, Math.sin(ph * 4));
  };
}
