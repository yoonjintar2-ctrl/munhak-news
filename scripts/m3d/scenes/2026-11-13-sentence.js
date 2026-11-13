// 11/13 오늘의 문장(창간호) — 이상 「날개」: 정오의 거리, 걸음을 멈춘 사내가 두 팔을 날개처럼 펴 본다. 비둘기가 돌고 종이쪽이 날린다
export const secs = 3;
export const opts = { bg: 0xc4c4c0, fog: [0xc0c0bc, 40, 120] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#b9b9b3', line: '#b0b0aa', tiles: 3, repeat: 6 });
  // 1930년대 경성 거리: 큰 백화점 건물과 양옆 건물들
  K.building(scene, 0, -26, 20, 10, 22, 5, 0);
  K.building(scene, -18, -18, 9, 9, 14, 9, 0.35); K.building(scene, 18, -18, 9, 9, 16, 21, -0.35);
  K.building(scene, -27, -6, 8, 10, 10, 31, 0.6); K.building(scene, 27, -6, 8, 10, 11, 37, -0.6);
  K.cyl(1.4, 1.4, 3, 0x8a8a86, 0, 23.5, -24, scene, 20); K.cyl(0.08, 0.08, 6, 0x333333, 6, 25, -24, scene, 6);
  [-6, 6].forEach(x => { K.cyl(0.12, 0.16, 6, 0x2a2a28, x, 3, -4, scene, 8); K.box(0.7, 0.5, 0.7, 0x2a2a28, x, 6.2, -4, scene); });
  // 주인공: 걷던 걸음을 멈추고 두 팔을 천천히 날개처럼 편다
  const P = K.person(scene, { x: 0, z: 3.2, rot: Math.PI - 0.35, coat: 0x8f8d88, pants: 0x3a3a38, hair: 'short' });
  const A = K.person(scene, { x: -5.5, z: -6, rot: 0.2, coat: 0x6a6a66, scale: 0.95 });
  const B = K.person(scene, { x: 5.2, z: -9, rot: -0.3, coat: 0xbcbab3, hair: 'long', scale: 0.92 });
  const b1 = K.bird(scene, { cy: 14, cz: -6, rx: 11, rz: 3 }), b2 = K.bird(scene, { cy: 16, cz: -8, rx: 9, rz: 3, s: 0.85 }), b3 = K.bird(scene, { cy: 12.5, cz: -4, rx: 13, rz: 4, s: 0.9 });
  const pages = []; for (let i = 0; i < 7; i++) { const m = K.inked(new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.75), new THREE.MeshLambertMaterial({ color: 0xf4f2ec, side: THREE.DoubleSide })), 1); scene.add(m); pages.push({ m, o: i / 7, x: -6 + i * 2, r: i * 1.3 }); }
  cam.position.set(1.5, 3.4, 13.5); cam.lookAt(0, 5.2, -6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    b1.update(ph); b2.update(ph, 2.1); b3.update(ph, 4.2);
    pages.forEach(p => { const v = (u + p.o) % 1; p.m.position.set(p.x + Math.sin(v * Math.PI * 2 + p.r) * 1.5, 0.6 + Math.sin(v * Math.PI) * 9, -3 + Math.cos(v * Math.PI * 2 + p.r) * 2); p.m.rotation.set(Math.sin(ph + p.r) * 3, Math.cos(ph + p.r) * 2, v * Math.PI * 2); });
    const open = K.win(ph, 0.18, 0.78, 0.18);
    P.pose({ headPitch: 0.42 * open, lean: -0.05 * open,
      armL: { fwd: 0.25 * open, out: 1.25 * open, elbow: 0.15 * open }, armR: { fwd: 0.25 * open, out: 1.25 * open, elbow: 0.15 * open }, bob: Math.sin(ph * 2) * 0.01 });
    const w = ph * 2;
    A.pose({ armL: { fwd: Math.sin(w) * 0.35 }, armR: { fwd: -Math.sin(w) * 0.35 }, bob: Math.abs(Math.sin(w)) * 0.05, headYaw: 0.6 * K.win(ph, 0.4, 0.8, 0.1) });
    B.pose({ armL: { fwd: -Math.sin(w + 1) * 0.3 }, armR: { fwd: Math.sin(w + 1) * 0.3 }, bob: Math.abs(Math.sin(w + 1)) * 0.05 });
  };
}
