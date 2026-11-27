// 11/21 문학 한술 백석 「국수」의 메밀국수: 겨울밤 온돌방 소반 위, 놋그릇에 동치미 국물을 부은 메밀국수(가는 회색 면발 + 무 조각 + 고기 몇 점)와 동치미 보시기, 놋수저·젓가락. 뒤 창호 창밖에 눈이 내리고 등잔불이 일렁이며 국수 그릇 위로 김이 오른다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe2e0da, fog: [0xdedcd6, 30, 90], fov: 38 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(14, 0.2, 10, 0xc8c3b8, 0, -0.1, -2, scene); K.box(14, 6, 0.3, 0xe8e6e0, 0, 3, -5.2, scene);
  // 창(열린 창호) + 바깥 어둠 + 눈
  K.box(3.6, 2.4, 0.05, 0x8a8782, 1.6, 3.4, -5.0, scene); K.box(3.8, 0.12, 0.2, 0x3a3936, 1.6, 4.65, -4.95, scene); K.box(3.8, 0.12, 0.2, 0x3a3936, 1.6, 2.15, -4.95, scene);
  K.box(0.12, 2.6, 0.2, 0x3a3936, -0.25, 3.4, -4.95, scene); K.box(0.12, 2.6, 0.2, 0x3a3936, 3.45, 3.4, -4.95, scene);
  const snow = []; for (let i = 0; i < 40; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 5), K.flat(0xffffff)); scene.add(s); snow.push({ s, x: 0 + (i * 0.37) % 3.3, k: (i * 0.271) % 1 }); }
  // 소반(둥근) + 다리
  K.cyl(1.7, 1.7, 0.12, 0x6e6c66, 0, 0.9, -1.2, scene, 32); for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.6; K.box(0.12, 0.85, 0.12, 0x45443f, Math.cos(a) * 1.3, 0.42, -1.2 + Math.sin(a) * 1.3, scene); }
  // 놋그릇 + 국물 + 면발 + 무 + 고기
  K.cyl(0.75, 0.5, 0.5, 0xb0aca2, -0.2, 1.22, -1.2, scene, 28); const soup = new THREE.Mesh(new THREE.CircleGeometry(0.7, 28), K.lam(0xeeece6)); soup.rotation.x = -Math.PI / 2; soup.position.set(-0.2, 1.43, -1.2); scene.add(soup);
  for (let i = 0; i < 26; i++) { const n = new THREE.Mesh(new THREE.TorusGeometry(0.18 + (i % 5) * 0.06, 0.014, 4, 40), K.lam(0x8a8782)); n.rotation.set(Math.PI / 2 + 0.25 * Math.sin(i * 1.3), 0.25 * Math.cos(i * 0.7), 0); n.position.set(-0.2 + 0.1 * Math.cos(i * 2.1), 1.46 + (i % 4) * 0.025, -1.2 + 0.1 * Math.sin(i * 1.7)); scene.add(n); }
  [[0.1, -1.0], [-0.45, -1.35], [0.0, -1.5]].forEach(([x, z], i) => { const r = K.box(0.22, 0.04, 0.22, 0xfbfaf6, x, 1.52, z, scene); r.rotation.y = i; });
  [[-0.35, -0.95], [-0.15, -1.15]].forEach(([x, z]) => { const m = K.box(0.25, 0.05, 0.12, 0x8a8782, x, 1.55, z, scene); m.rotation.y = 0.4; });
  // 동치미 보시기 + 수저
  K.cyl(0.38, 0.28, 0.3, 0xd8d5cd, 1.1, 1.12, -0.8, scene, 20); K.box(0.16, 0.12, 0.16, 0xfbfaf6, 1.05, 1.28, -0.8, scene); K.box(0.12, 0.12, 0.12, 0xfbfaf6, 1.2, 1.29, -0.7, scene);
  K.box(0.06, 0.03, 1.1, 0x8a8782, 0.9, 1.0, -0.1, scene).rotation.y = 0.15; K.cyl(0.12, 0.12, 0.03, 0x8a8782, 0.82, 1.0, -0.65, scene, 12);
  [1.15, 1.25].forEach(x => K.box(0.03, 0.03, 1.2, 0x55534e, x, 1.0, -0.1, scene).rotation.y = 0.12);
  // 등잔
  K.cyl(0.06, 0.12, 0.7, 0x3a3936, -2.2, 1.3, -2.6, scene, 8); const flame = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), K.flat(0xffffff)); flame.scale.y = 2; flame.position.set(-2.2, 1.8, -2.6); scene.add(flame);
  const glow = new THREE.Mesh(new THREE.CircleGeometry(1.0, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, depthWrite: false })); glow.position.set(-2.2, 1.9, -5.0); scene.add(glow);
  const steam = []; for (let i = 0; i < 24; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false })); scene.add(s); steam.push({ s, k: i / 24 }); }
  cam.position.set(0.0, 3.0, 3.6); cam.lookAt(0.0, 1.4, -1.4);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    steam.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(-0.2 + 0.4 * ((o.k * 7) % 1 - 0.5) + 0.12 * Math.sin(ph * 2 + o.k * 7), 1.6 + v * 1.6, -1.2 + 0.1 * Math.cos(ph + o.k * 5)); o.s.scale.setScalar(0.6 + v * 1.6); o.s.material.opacity = 0.45 * (1 - v); });
    snow.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(o.x + 0.1 * Math.sin(ph * 2 + o.k * 9), 4.5 - v * 2.3, -4.9); });
    flame.scale.set(1 + 0.15 * Math.sin(ph * 7), 2 + 0.4 * Math.sin(ph * 5), 1); glow.material.opacity = 0.26 + 0.08 * Math.sin(ph * 5);
  };
}
