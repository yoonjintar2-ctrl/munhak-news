// 11/22 『싱아』 장면③(after 5): 한겨울 텅 빈 서울 비탈 골목 꼭대기. 목도리를 두른 젊은 여자가 홀로 서서(뒷모습에서 옆얼굴) 아래 기와지붕 시가지를 내려다본다. 눈발이 날리고 빈집 문짝이 삐걱이며 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe4e2dc, fog: [0xdedcd6, 20, 80] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(8, 0.4, 6, 0xeceae4, 0, -0.2, 1, scene); // 꼭대기 골목(눈 덮임)
  K.box(1.6, 2.6, 3.0, 0xbcb9b1, -3.4, 1.3, 0.5, scene); const door = K.box(0.05, 1.8, 0.9, 0x45443f, -2.58, 0.9, 1.2, scene);
  K.box(1.4, 2.0, 2.4, 0xc8c5bd, 3.4, 1.0, 0.4, scene);
  // 아래 시가지: 기와지붕들(계단식으로 내려감)
  for (let i = 0; i < 26; i++) { const x = -14 + (i * 1.37) % 28, z = -6 - (i * 0.71) % 18, y = -3 - (-z - 6) * 0.25; K.box(2.2, 1.4, 1.6, 0xd8d5cd, x, y, z, scene); const r = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 1.6, 0.9, 4, 1), K.lam(0x6e6c66)), 30); r.rotation.y = Math.PI / 4; r.scale.set(1, 1, 0.6); r.position.set(x, y + 1.1, z); scene.add(r); }
  K.cyl(0.08, 0.1, 3.5, 0x55534e, 2.2, 1.6, -0.6, scene, 6); // 전봇대
  const W = K.person(scene, { x: 0, z: 0.2, rot: 0.35, coat: 0x45443f, pants: 0x2f2e2b, hair: 'bob', scale: 1.0, scarf: 0xf2f0ea });
  const snow = []; for (let i = 0; i < 70; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 5), K.flat(0xffffff)); scene.add(s); snow.push({ s, x: -8 + (i * 0.731) % 16, z: -6 + (i * 0.37) % 9, k: (i * 0.137) % 1 }); }
  cam.position.set(2.2, 5.0, 8.5); cam.lookAt(-0.5, -0.6, -5);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    W.pose({ headPitch: 0.35, headYaw: 0.5 + 0.25 * Math.sin(ph), armL: { fwd: 0.9, elbow: 1.5, out: -0.1 }, armR: { fwd: 0.9, elbow: 1.5, out: -0.1 } });
    snow.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(o.x + 0.3 * Math.sin(ph * 2 + o.k * 9), 6 - v * 9, o.z); });
    door.rotation.y = 0.25 + 0.2 * Math.sin(ph * 2);
  };
}
