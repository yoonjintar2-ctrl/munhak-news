// 11/23 오늘의 사나이 브루스 리(3D 삽화, 실제 인물 아님): 나무 바닥 도장, 맨발의 무술가가 카메라 쪽을 향해(rot ≈ π) 오른발을 높이 차올리고 두 손을 세운다. 매달린 샌드백 흔들림, 창빛 속 먼지, 벽의 나무 인형. 세로 720×860
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 90], fov: 40, w: 720, h: 860 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(20, 0.2, 20, 0xc8c3b8, 0, -0.1, -4, scene); for (let i = 0; i < 12; i++) K.box(0.03, 0.02, 20, 0xb0ada5, -6 + i, 0.01, -4, scene);
  K.box(20, 9, 0.3, 0xe4e1d9, 0, 4.5, -8, scene);
  [-4, 3].forEach(x => { K.box(2.2, 3.4, 0.05, 0xfbfaf6, x, 5.0, -7.8, scene); K.box(0.08, 3.4, 0.12, 0x45443f, x, 5.0, -7.75, scene); });
  // 나무 인형(목인장)
  K.cyl(0.35, 0.35, 3.2, 0x6e6c66, -3.6, 1.6, -5.5, scene, 14); [[2.2, 0.3], [2.0, -0.3], [1.3, 0]].forEach(([y, x]) => K.cyl(0.06, 0.06, 0.8, 0x45443f, -3.6 + x, y, -5.1, scene, 8).rotation.x = Math.PI / 2);
  // 샌드백
  const bag = new THREE.Group(); bag.position.set(3.4, 6.4, -4.8); scene.add(bag); K.cyl(0.02, 0.02, 1.2, 0x1e1e1e, 0, -0.6, 0, bag, 6); K.cyl(0.55, 0.55, 2.4, 0x55534e, 0, -2.4, 0, bag, 16);
  const A = K.athlete(scene, { x: 0, z: -1.0, rot: Math.PI - 0.8, kind: 'fighter', scale: 1.05, bottom: 0x2a2a2a });
  const dust = []; for (let i = 0; i < 16; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.03, 5, 4), K.flat(0x8a8782)); scene.add(s); dust.push({ s, k: (i * 0.37) % 1, x: -5 + (i * 0.61) % 3 }); }
  cam.position.set(0.3, 3.2, 10.5); cam.lookAt(0.2, 2.6, -2.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), kick = K.win(ph, 0.25, 0.6, 0.12);
    A.pose({ lean: 0.15 * kick, headPitch: 0.05, armL: { fwd: 1.2, elbow: 1.6, out: 0.15 }, armR: { fwd: 0.8 + 0.4 * kick, elbow: 1.2 - 0.6 * kick, out: 0.1 },
      legL: { fwd: -0.1, knee: 0.2 }, legR: { fwd: 1.6 * kick, knee: 0.9 * (1 - kick) + 0.2 }, bob: -0.05 * kick });
    bag.rotation.z = 0.12 * Math.sin(ph * 2); bag.rotation.x = 0.05 * Math.cos(ph * 2);
    dust.forEach(o => { const v = (o.k + u * 0.5) % 1; o.s.position.set(o.x + 0.2 * Math.sin(ph + o.k * 9), 6.5 - v * 4, -6.5); });
  };
}
