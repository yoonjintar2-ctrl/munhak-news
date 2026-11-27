// 11/24 문학 한술 「춘향전」의 막걸리: 모서리 떨어진 낡은 개다리소반 위 막걸리 한 사발·깍두기 종지·콩나물 접시·젓가락. 뒤쪽 잔칫상엔 떡·고기·과일이 높이 괴어 있고, 사발 위 김과 촛불이 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 90], fov: 38 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(16, 0.2, 14, 0xc8c3b8, 0, -0.1, -3, scene); K.box(16, 7, 0.3, 0xe4e1d9, 0, 3.5, -7.2, scene);
  // 뒤 병풍
  for (let i = 0; i < 6; i++) { const p = K.box(1.2, 3.0, 0.08, i % 2 ? 0xd8d5cd : 0xcac7bf, -3 + i * 1.2, 1.6, -6.6, scene); p.rotation.y = i % 2 ? 0.25 : -0.25; K.box(0.7, 0.04, 0.02, 0x8a8782, -3 + i * 1.2, 2.3, -6.55, scene); }
  // 뒤 잔칫상(큰 상) + 고임 음식
  K.box(4.2, 0.18, 1.6, 0x55534e, 0.6, 1.3, -4.6, scene); [-1.3, 2.5].forEach(x => K.box(0.18, 1.2, 0.18, 0x45443f, x, 0.6, -4.6, scene));
  [[-0.8, 0xeeece6], [0.2, 0xbcb9b1], [1.2, 0xd8d5cd], [2.1, 0x9a978f]].forEach(([x, c], i) => { K.cyl(0.32, 0.36, 0.12, 0x6e6c66, x, 1.45, -4.6, scene, 16); for (let j = 0; j < 4; j++) K.cyl(0.28 - j * 0.05, 0.3 - j * 0.05, 0.16, c, x, 1.58 + j * 0.16, -4.6, scene, 14); });
  // 앞 개다리소반(모서리 한쪽 떨어짐)
  const tb = new THREE.Group(); tb.position.set(0, 0, -1.2); scene.add(tb);
  K.box(2.2, 0.1, 1.5, 0x6e6c66, 0, 0.95, 0, tb); K.box(0.4, 0.12, 0.4, 0xc8c3b8, 1.0, 0.96, 0.65, tb);
  [[-0.9, -0.6], [0.9, -0.6], [-0.9, 0.6], [0.9, 0.6]].forEach(([x, z], i) => { const l = K.box(0.1, 0.9, 0.1, 0x55534e, x, 0.45, z, tb); l.rotation.z = (x < 0 ? 0.15 : -0.15); });
  // 막걸리 사발(뽀얀 술)
  K.cyl(0.34, 0.22, 0.3, 0x8a8782, -0.35, 1.15, -0.1, tb, 22);
  const brew = K.cyl(0.31, 0.31, 0.02, 0xf2f0ea, -0.35, 1.29, -0.1, tb, 22);
  // 깍두기 종지
  K.cyl(0.25, 0.2, 0.16, 0xd8d5cd, 0.55, 1.08, -0.25, tb, 16); for (let i = 0; i < 6; i++) { const c = K.box(0.11, 0.11, 0.11, i % 2 ? 0x9a978f : 0x8a8782, 0.47 + (i % 3) * 0.09, 1.19 + Math.floor(i / 3) * 0.06, -0.3 + (i % 2) * 0.1, tb); c.rotation.y = i; }
  // 콩나물 접시
  K.cyl(0.32, 0.28, 0.05, 0xeeece6, 0.45, 1.03, 0.35, tb, 18); for (let i = 0; i < 9; i++) { const s = K.box(0.25, 0.018, 0.018, 0xfbfaf6, 0.45 + 0.05 * Math.cos(i), 1.08, 0.3 + (i % 5) * 0.03, tb); s.rotation.y = i * 0.7; const h = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 4), K.flat(0xbcb9b1)); h.position.set(0.45 + 0.12 * Math.cos(i * 0.7), 1.09, 0.3 + (i % 5) * 0.03 - 0.12 * Math.sin(i * 0.7)); tb.add(h); }
  // 젓가락
  K.box(0.04, 0.03, 0.8, 0x45443f, -0.75, 1.02, 0.45, tb); K.box(0.04, 0.03, 0.8, 0x45443f, -0.65, 1.02, 0.45, tb);
  // 촛대 + 불꽃
  K.cyl(0.12, 0.18, 0.15, 0x45443f, 2.6, 1.47, -4.2, scene, 10); K.cyl(0.06, 0.06, 0.5, 0xfbfaf6, 2.6, 1.8, -4.2, scene, 8);
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 8), K.flat(0xffffff)); flame.position.set(2.6, 2.15, -4.2); scene.add(flame);
  const steam = []; for (let i = 0; i < 10; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, depthWrite: false })); scene.add(s); steam.push({ s, k: i / 10 }); }
  cam.position.set(0.3, 2.6, 3.4); cam.lookAt(0.0, 1.2, -2.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    brew.scale.set(1 + 0.02 * Math.sin(ph * 4), 1, 1 + 0.02 * Math.cos(ph * 4));
    const f = 1 + 0.18 * Math.sin(ph * 9) + 0.08 * Math.sin(ph * 15); flame.scale.set(1, f, 1); flame.rotation.z = 0.1 * Math.sin(ph * 5);
    steam.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(-0.35 + 0.12 * Math.sin(ph * 2 + o.k * 9), 1.4 + v * 1.0, -1.3); o.s.scale.setScalar(0.6 + v * 1.4); o.s.material.opacity = 0.28 * (1 - v); });
    tb.rotation.z = 0.004 * Math.sin(ph * 2);
  };
}
