// 11/23 문학 한술 「수난이대」의 고등어: 시골 부엌 소반 위, 노릇하게 구운 고등어 한 마리가 긴 접시에 놓였고 곁에 고봉밥·수저. 화로 석쇠에서 김이 오르고, 창밖으로 개울 위 외나무다리와 흔들리는 풀. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe4e2dc, fog: [0xe0ded8, 30, 90], fov: 38 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(14, 0.2, 12, 0xc8c3b8, 0, -0.1, -2, scene); K.box(14, 7, 0.3, 0xe4e1d9, 0, 3.5, -6.2, scene);
  // 창 + 바깥 개울·외나무다리·풀
  K.box(3.6, 2.2, 0.05, 0xfbfaf6, 1.6, 3.6, -6.0, scene); K.box(3.8, 0.12, 0.15, 0x45443f, 1.6, 2.5, -5.95, scene); K.box(0.1, 2.2, 0.15, 0x45443f, 1.6, 3.6, -5.95, scene);
  K.box(3.2, 0.25, 0.03, 0xbcb9b1, 1.6, 2.8, -6.1, scene); K.box(2.6, 0.08, 0.03, 0x55534e, 1.6, 3.0, -6.1, scene).rotation.z = 0.03;
  const grass = []; for (let i = 0; i < 10; i++) { const g = K.box(0.03, 0.4, 0.02, 0x8a8782, 0.1 + i * 0.32, 2.85, -6.12, scene); grass.push(g); }
  // 소반
  K.cyl(1.5, 1.5, 0.12, 0x6e6c66, 0, 1.0, -1.0, scene, 10); [0, 1, 2, 3].forEach(i => { const a = i * Math.PI / 2 + 0.6; K.box(0.12, 1.0, 0.12, 0x55534e, Math.cos(a) * 1.1, 0.5, -1.0 + Math.sin(a) * 1.1, scene); });
  // 긴 접시 + 고등어(몸통·꼬리·등 줄무늬)
  K.cyl(0.85, 0.85, 0.05, 0xf2f0ea, 0.1, 1.09, -0.9, scene, 24).scale.set(1, 1, 0.45);
  const fish = new THREE.Group(); fish.position.set(0.1, 1.2, -0.9); scene.add(fish);
  const body = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.5, 18, 12), K.lam(0x8a8782)), 30); body.scale.set(1.4, 0.28, 0.32); fish.add(body);
  const tail = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.35, 3), K.lam(0x55534e)), 30); tail.rotation.z = Math.PI / 2; tail.position.x = 0.8; fish.add(tail);
  for (let i = 0; i < 5; i++) { const s = K.box(0.04, 0.02, 0.18, 0x3a3936, -0.4 + i * 0.18, 0.13, 0, fish); s.rotation.y = 0.4; }
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), K.flat(0x1e1e1e)); eye.position.set(-0.55, 0.05, 0.12); fish.add(eye);
  // 밥그릇(고봉) + 수저 + 김치 종지
  K.cyl(0.32, 0.22, 0.3, 0xd8d5cd, -0.9, 1.22, -1.3, scene, 18); const rice = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 10), K.lam(0xfbfaf6)), 20); rice.scale.y = 0.6; rice.position.set(-0.9, 1.4, -1.3); scene.add(rice);
  K.box(0.05, 0.02, 0.9, 0x55534e, -0.3, 1.08, -0.2, scene); K.box(0.04, 0.02, 0.9, 0x55534e, -0.2, 1.08, -0.2, scene);
  K.cyl(0.2, 0.16, 0.14, 0xbcb9b1, 0.9, 1.13, -1.5, scene, 14);
  // 화로 + 석쇠 + 김
  K.cyl(0.6, 0.5, 0.7, 0x45443f, -2.8, 0.35, -2.6, scene, 16); for (let i = 0; i < 5; i++) K.box(1.0, 0.03, 0.03, 0x1e1e1e, -2.8, 0.72, -3.0 + i * 0.2, scene);
  const steam = []; for (let i = 0; i < 16; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, depthWrite: false })); scene.add(s); steam.push({ s, k: i / 16, a: i < 10 }); }
  cam.position.set(0.4, 3.0, 3.6); cam.lookAt(-0.2, 1.3, -1.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    steam.forEach(o => { const v = (o.k * 1.6 + u) % 1; const [x, y, z] = o.a ? [-2.8, 0.8, -2.6] : [0.1, 1.3, -0.9]; o.s.position.set(x + 0.2 * Math.sin(ph * 2 + o.k * 9), y + v * 2.0, z); o.s.scale.setScalar(0.5 + v * 1.6); o.s.material.opacity = (o.a ? 0.35 : 0.22) * (1 - v); });
    grass.forEach((g, i) => { g.rotation.z = 0.25 * Math.sin(ph * 2 + i * 0.6); });
    fish.position.y = 1.2 + 0.005 * Math.sin(ph * 3);
  };
}
