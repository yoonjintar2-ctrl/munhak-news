// 11/22 문학 한술 『올리버 트위스트』의 귀리죽: 구빈원 식당의 긴 나무 식탁, 찌그러진 양철 그릇에 묽은 회색 귀리죽과 양철 숟가락. 뒤편 큰 구리 솥에서 김이 오르고 솥에 걸친 국자가 흔들리며, 높은 창으로 잿빛 빛과 먼지가 떠다닌다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe2e0da, fog: [0xdedcd6, 30, 90], fov: 38 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(14, 0.2, 12, 0xc8c3b8, 0, -0.1, -2, scene); K.box(14, 7, 0.3, 0xe4e1d9, 0, 3.5, -6.2, scene);
  // 높은 창 셋
  [-3.5, 0, 3.5].forEach(x => { K.box(1.2, 2.2, 0.05, 0xfbfaf6, x, 5.0, -6.0, scene); K.box(0.08, 2.2, 0.12, 0x45443f, x, 5.0, -5.95, scene); });
  // 긴 식탁 + 긴 의자
  K.box(9, 0.2, 1.6, 0x77756f, 0, 1.0, -0.6, scene); [-4, 4].forEach(x => K.box(0.2, 1.0, 1.4, 0x55534e, x, 0.5, -0.6, scene)); K.box(9, 0.15, 0.6, 0x6e6c66, 0, 0.55, 0.7, scene);
  // 다른 빈 그릇들
  [-3, -1.5, 2.6, 3.8].forEach(x => K.cyl(0.38, 0.28, 0.22, 0x9a978f, x, 1.21, -0.7, scene, 18));
  // 주인공 그릇: 찌그러진 양철 + 묽은 죽
  const bowl = K.cyl(0.62, 0.42, 0.36, 0xa8a59e, 0.3, 1.28, -0.4, scene, 24); bowl.scale.set(1, 1, 0.92);
  const gruel = new THREE.Mesh(new THREE.CircleGeometry(0.55, 24), K.lam(0xd8d5cd)); gruel.rotation.x = -Math.PI / 2; gruel.position.set(0.3, 1.38, -0.4); scene.add(gruel);
  const spoon = new THREE.Group(); spoon.position.set(1.15, 1.13, -0.1); spoon.rotation.y = 0.5; scene.add(spoon); K.box(0.07, 0.03, 0.9, 0x8a8782, 0, 0, 0, spoon); K.cyl(0.14, 0.14, 0.03, 0x8a8782, 0, 0, -0.5, spoon, 12);
  K.box(0.5, 0.2, 0.35, 0xd8d5cd, -0.8, 1.2, -0.5, scene); // 빵 반 쪽
  // 구리 솥 + 받침 + 국자
  K.cyl(1.4, 1.1, 1.5, 0x6e6c66, -2.6, 1.6, -4.2, scene, 28); K.cyl(1.45, 1.45, 0.08, 0x45443f, -2.6, 2.36, -4.2, scene, 28); K.box(2.0, 0.9, 2.0, 0x55534e, -2.6, 0.45, -4.2, scene);
  const ladle = new THREE.Group(); ladle.position.set(-2.0, 2.4, -4.0); scene.add(ladle); K.cyl(0.04, 0.04, 2.0, 0x3a3936, 0, 0.3, 0, ladle, 6); K.cyl(0.25, 0.15, 0.2, 0x3a3936, 0, -0.7, 0, ladle, 12); ladle.rotation.z = -0.4;
  const steam = []; for (let i = 0; i < 22; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, depthWrite: false })); scene.add(s); steam.push({ s, k: i / 22 }); }
  const dust = []; for (let i = 0; i < 18; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.025, 5, 4), K.flat(0x8a8782)); scene.add(s); dust.push({ s, k: (i * 0.37) % 1, x: -1 + (i * 0.61) % 3 }); }
  cam.position.set(0.6, 3.0, 4.6); cam.lookAt(-0.2, 1.4, -1.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    steam.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(-2.6 + 0.8 * ((o.k * 7) % 1 - 0.5) + 0.15 * Math.sin(ph * 2 + o.k * 7), 2.5 + v * 2.6, -4.2); o.s.scale.setScalar(0.7 + v * 1.8); o.s.material.opacity = 0.3 * (1 - v); });
    ladle.rotation.z = -0.4 + 0.12 * Math.sin(ph * 2); ladle.rotation.x = 0.06 * Math.cos(ph * 2);
    dust.forEach(o => { const v = (o.k + u * 0.5) % 1; o.s.position.set(o.x + 0.2 * Math.sin(ph + o.k * 9), 5.5 - v * 3, -3.5); });
    gruel.position.y = 1.38 + 0.008 * Math.sin(ph * 3); spoon.rotation.z = 0.04 * Math.sin(ph * 2);
  };
}
