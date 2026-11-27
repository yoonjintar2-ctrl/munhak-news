// 11/25 문학 한술 『하이디』의 구운 치즈: 알프스 통나무 오두막 안 화덕, 기다란 쇠꼬챙이에 꽂힌 큼직한 치즈 덩이가 불 위에서 천천히 돌며 노릇하게 녹고, 앞 나무 식탁에 둥근 빵·염소젖 사발·나무 접시. 불꽃 일렁임·김·꼬챙이 회전. 창밖 눈 덮인 산. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 90], fov: 40 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(16, 0.2, 14, 0xc8c3b8, 0, -0.1, -3, scene);
  // 통나무 벽(가로 원통) + 창(밖 눈 덮인 산)
  for (let i = 0; i < 9; i++) { const l = K.cyl(0.4, 0.4, 16, [0xbcb9b1, 0xaeaba3][i % 2], 0, 0.4 + i * 0.78, -7.2, scene, 12); l.rotation.z = Math.PI / 2; }
  K.box(2.6, 2.0, 0.1, 0xf6f5f1, 3.6, 4.2, -6.7, scene); K.box(2.8, 0.15, 0.3, 0x55534e, 3.6, 3.15, -6.65, scene); K.box(0.12, 2.0, 0.25, 0x55534e, 3.6, 4.2, -6.62, scene);
  const mt = K.inked(new THREE.Mesh(new THREE.ConeGeometry(1.0, 1.1, 4), K.lam(0xd8d5cd)), 30); mt.position.set(3.2, 3.9, -6.6); scene.add(mt);
  // 돌 화덕 + 불
  K.box(3.4, 0.5, 2.0, 0x8a8782, -2.4, 0.25, -5.4, scene); K.box(3.4, 3.4, 0.4, 0x9a978f, -2.4, 1.9, -6.6, scene); K.box(1.6, 3.0, 1.6, 0x8a8782, -2.4, 5.0, -6.2, scene);
  for (let i = 0; i < 5; i++) { const lg = K.cyl(0.12, 0.12, 1.4, 0x45443f, -2.4, 0.6, -5.4 + (i - 2) * 0.22, scene, 8); lg.rotation.z = Math.PI / 2; lg.rotation.y = (i - 2) * 0.2; }
  const flames = []; for (let i = 0; i < 6; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.8, 8), K.lam(i % 2 ? 0x8a8782 : 0xbcb9b1)); f.position.set(-3.0 + i * 0.25, 1.15, -5.4 + (i % 2) * 0.2); scene.add(f); flames.push(f); }
  const glow = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2, depthWrite: false })); glow.position.set(-2.4, 1.2, -5.3); scene.add(glow);
  // 쇠꼬챙이 + 치즈 덩이(불 위)
  const spit = new THREE.Group(); spit.position.set(-2.4, 2.2, -4.4); spit.rotation.x = -0.35; scene.add(spit);
  const rod = K.cyl(0.04, 0.04, 3.0, 0x262626, 0, 0, 0.5, spit, 6); rod.rotation.x = Math.PI / 2;
  const cheese = new THREE.Group(); cheese.position.z = -0.7; spit.add(cheese);
  const cg = new THREE.CylinderGeometry(0.55, 0.55, 0.45, 3, 1); const cm = K.inked(new THREE.Mesh(cg, K.lam(0xd8d0b8)), 30); cm.rotation.x = Math.PI / 2; cheese.add(cm);
  const melt = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), K.lam(0xeeece6)); melt.position.set(0, -0.45, 0); cheese.add(melt);
  // 식탁 + 빵 + 사발 + 접시
  const tb = new THREE.Group(); tb.position.set(1.0, 0, -1.6); scene.add(tb);
  K.box(3.4, 0.16, 1.8, 0x6e6c66, 0, 1.2, 0, tb); [[-1.5, -0.7], [1.5, -0.7], [-1.5, 0.7], [1.5, 0.7]].forEach(([x, z]) => K.box(0.14, 1.2, 0.14, 0x55534e, x, 0.6, z, tb));
  const bread = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.45, 18, 12), K.lam(0x9a978f)), 40); bread.scale.set(1, 0.55, 1); bread.position.set(-0.8, 1.48, 0.1); tb.add(bread);
  [-0.15, 0.15].forEach(x => K.line([[-0.8 + x, 1.72, -0.25], [-0.8 + x, 1.72, 0.4]], tb));
  K.cyl(0.34, 0.24, 0.3, 0x8a8782, 0.5, 1.43, 0.05, tb, 18); K.cyl(0.31, 0.31, 0.02, 0xfbfaf6, 0.5, 1.57, 0.05, tb, 18);
  K.cyl(0.42, 0.4, 0.05, 0xbcb9b1, 1.2, 1.31, 0.45, tb, 18); const slice = K.box(0.4, 0.06, 0.3, 0xe2dfd7, 1.2, 1.37, 0.45, tb);
  K.box(0.04, 0.03, 0.6, 0x45443f, 1.6, 1.3, 0.2, tb);
  // 염소 방울 걸이(벽)·삼발 의자
  K.cyl(0.18, 0.14, 0.3, 0x45443f, 5.2, 3.0, -6.9, scene, 10); K.cyl(0.3, 0.3, 0.08, 0x55534e, 3.6, 0.8, -0.6, scene, 12);
  const steam = []; for (let i = 0; i < 10; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, depthWrite: false })); scene.add(s); steam.push({ s, k: i / 10 }); }
  cam.position.set(0.8, 3.0, 4.6); cam.lookAt(-0.4, 1.7, -3.2);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    flames.forEach((f, i) => { const s = 1 + 0.3 * Math.sin(ph * 8 + i * 1.7); f.scale.set(1, s, 1); f.rotation.z = 0.15 * Math.sin(ph * 5 + i); });
    glow.material.opacity = 0.16 + 0.06 * Math.sin(ph * 8);
    cheese.rotation.z = ph; melt.scale.y = 1 + 0.4 * (0.5 + 0.5 * Math.sin(ph * 2));
    steam.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(1.5 + 0.12 * Math.sin(ph * 2 + o.k * 9), 1.65 + v * 1.1, -1.55); o.s.scale.setScalar(0.6 + v * 1.4); o.s.material.opacity = 0.28 * (1 - v); });
  };
}
