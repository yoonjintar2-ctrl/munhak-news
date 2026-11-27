// 1분 현대문학 — 손원평 『아몬드』: 헌책방, 곤이는 팔을 휘두르며 따지고, 윤재는 책을 든 채 꼼짝 않고 그를 바라본다. 창밖으로 빛이 천천히 지나간다
export const secs = 3;
export const opts = { bg: 0xbcbcb7, fog: [0xb8b8b3, 25, 70] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#a9a9a3', line: '#a3a39d', tiles: 2, repeat: 6 });
  K.box(22, 9, 0.3, 0xd0d0ca, 0, 4.5, -6, scene); // 뒷벽
  // 책장 두 개(책 높이·명도를 조금씩 달리)
  const shelf = (x0) => { K.box(5, 6, 1.2, 0x5e5850, x0, 3, -5.2, scene);
    for (let r = 0; r < 4; r++) { let x = x0 - 2.2; let i = 0;
      while (x < x0 + 2.1) { const w = 0.22 + ((i * 7 + r * 3) % 4) * 0.05, hgt = 0.9 + ((i * 5 + r) % 3) * 0.15;
        const g = 0x70 + ((i * 37 + r * 11) % 7) * 0x10; K.box(w, hgt, 0.8, (g << 16) | (g << 8) | g, x + w / 2, 0.55 + r * 1.4 + hgt / 2, -4.9, scene); x += w + 0.04; i++; }
      K.box(4.8, 0.1, 1.0, 0x4a453e, x0, 0.5 + r * 1.4, -4.9, scene); } };
  shelf(-6); shelf(6);
  // 창(가운데) + 지나가는 빛
  K.box(4, 3, 0.1, 0xeeeee8, 0, 4.5, -5.8, scene);
  const beam = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 9), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 })); beam.rotation.x = -Math.PI / 2; beam.position.set(0, 0.02, -1); scene.add(beam);
  // 계산대 위 책 더미
  K.box(3, 1.2, 1.4, 0x6a645c, 3.6, 0.6, 1.0, scene);
  [0, 1, 2].forEach(i => K.box(0.9 - i * 0.08, 0.16, 0.65, 0xcfcac0 - i * 0x101010, 3.3, 1.28 + i * 0.17, 1.0, scene));
  // 곤이(왼쪽, 거친 몸짓) · 윤재(오른쪽, 책 들고 정지)
  const G = K.person(scene, { x: -1.6, z: 1.6, rot: -(Math.PI / 2 + 0.55), coat: 0x3a3a3a, pants: 0x2a2a2a, hair: 'short', hairC: 0x111111, scale: 0.86 });
  const Y = K.person(scene, { x: 1.4, z: 1.6, rot: (Math.PI / 2 + 0.6), coat: 0xdcdcd6, pants: 0x55554f, hair: 'short', hairC: 0x1e1e1e, scale: 0.86 });
  const book = K.box(0.55, 0.75, 0.12, 0x8a8a84, 0, 0, 0, scene);
  cam.position.set(0, 3.2, 10); cam.lookAt(0, 2.2, 0);
  const hand = new THREE.Vector3();
  return (t, ph) => {
    beam.position.x = -4 + (ph / (Math.PI * 2)) * 8; beam.material.opacity = 0.1 + 0.1 * Math.sin(ph);
    const rant = 0.5 + 0.5 * Math.sin(ph * 3);
    const calm = K.win(ph, 0.62, 0.95, 0.08);  // 곤이가 잠깐 멈칫하는 순간
    G.pose({ lean: 0.18 * (1 - calm), headPitch: -0.05 - 0.15 * calm, headYaw: 0.15 * Math.sin(ph * 3) * (1 - calm), torsoYaw: 0.2 * Math.sin(ph * 3) * (1 - calm),
      armR: { fwd: 0.6 + 1.2 * rant * (1 - calm), out: 0.3 * rant, elbow: -0.6 - 0.6 * rant, point: rant > 0.6 && calm < 0.5 },
      armL: { fwd: 0.3 + 0.9 * (1 - rant) * (1 - calm), out: 0.5 * (1 - calm), elbow: -1.0 }, bob: 0.04 * Math.abs(Math.sin(ph * 3)) * (1 - calm) });
    Y.pose({ headPitch: -0.12, headYaw: 0.05 * Math.sin(ph), headTilt: 0.12 * calm,
      armL: { fwd: 1.0, out: -0.25, elbow: -1.2 }, armR: { fwd: 1.0, out: -0.25, elbow: -1.2 } });
    Y.root.updateMatrixWorld(true); Y.torso.localToWorld(hand.set(0, 0.95, -0.95)); book.position.copy(hand); book.rotation.y = Y.root.rotation.y;
  };
}
