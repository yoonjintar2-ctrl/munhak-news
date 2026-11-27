// 11/19 오늘의 사나이 하형주(1984 LA 올림픽 유도 95kg급 금): 올림픽 유도장 매트 위, 흰 도복의 두 선수가 서로 깃과 소매를 잡고 맞붙어 힘겨루기를 한다(앞쪽 선수는 카메라 쪽을 비스듬히 봄, rot≈π−0.9). 뒤로 관중석 그림자, 머리 위 조명, 매트 가장자리 심판. 카메라 고정(세로)
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xdad8d2, 26, 70], fov: 40, w: 720, h: 860 };
export default function (K) {
  const { THREE, scene, cam } = K;
  // 매트(안쪽 경기장 + 바깥 띠)
  K.box(18, 0.3, 14, 0xc8c5bd, 0, -0.15, -1, scene); K.box(12, 0.32, 9, 0xe9e6df, 0, -0.14, -1, scene);
  for (let i = -2; i <= 2; i++) K.line([[-6, 0.03, -1 + i * 1.8], [6, 0.03, -1 + i * 1.8]], scene);
  // 관중석
  const crowd = []; for (let r = 0; r < 4; r++) { K.box(44, 1.0, 1.6, 0xa8a59e, 0, 0.2 + r * 1.1, -10 - r * 1.8, scene);
    for (let i = 0; i < 24; i++) { const g = new THREE.Group(); g.position.set(-21 + i * 1.8 + (r % 2) * 0.9, 1.0 + r * 1.1, -10 - r * 1.8); scene.add(g);
      const c = [0x6a6863, 0x7c7a75, 0x5e5c58][(i + r) % 3]; const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.45, 0.5, 4, 8), K.lam(c)); b.position.y = 0.5; g.add(b); const h = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), K.lam(c)); h.position.y = 1.35; g.add(h);
      if ((i * 5 + r * 3) % 7 === 0) { const a = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.7, 3, 8), K.lam(c)); a.position.set(0.45, 1.75, 0); a.rotation.z = -0.3; g.add(a); crowd.push({ a, k: i * 0.7 + r }); } } }
  // 조명 틀
  K.box(20, 0.3, 0.3, 0x45443f, 0, 13, -3, scene); const lamps = []; [-6, -2, 2, 6].forEach(x => { K.cyl(0.5, 0.9, 0.8, 0x45443f, x, 12.5, -3, scene, 14); const l = new THREE.Mesh(new THREE.CircleGeometry(0.85, 18), K.flat(0xfaf9f4)); l.rotation.x = Math.PI / 2; l.position.set(x, 12.09, -3); scene.add(l); lamps.push(l); });
  // 두 선수(맞잡기) + 심판
  const A = K.athlete(scene, { x: -1.0, z: 0.0, rot: -1.85, kind: 'judoka', scale: 1.15 });
  const B = K.athlete(scene, { x: 1.0, z: 0.0, rot: 1.85, kind: 'judoka', scale: 1.1, top: 0xd9d6ce, bottom: 0xd9d6ce });
  const belt = (P) => { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.14, 18), K.lam(0x1c1c1a)); b.position.y = 0.15; P.torso.add(b); }; belt(A); belt(B);
  const R = K.person(scene, { x: 4.6, z: -3.4, rot: -0.6, coat: 0x2e2d2a, pants: 0x3a3936, scale: 1.0 });
  cam.position.set(0.4, 4.2, 14.0); cam.lookAt(0.2, 3.4, -1);
  return (t, ph) => {
    const s = Math.sin(ph * 2), push = Math.sin(ph);
    A.pose({ lean: 0.3 + 0.05 * push, headPitch: -0.15, armL: { fwd: 1.15 + 0.1 * s, out: -0.15, elbow: 0.5 }, armR: { fwd: 1.05 - 0.1 * s, out: -0.25, elbow: 0.7 }, legL: { fwd: 0.25 + 0.1 * push, side: 0.15, knee: 0.35 }, legR: { fwd: -0.35, side: -0.15, knee: 0.25 }, bob: -0.05 + 0.04 * Math.abs(s) });
    B.pose({ lean: 0.3 - 0.05 * push, headPitch: -0.2, armL: { fwd: 1.05 - 0.1 * s, out: -0.25, elbow: 0.7 }, armR: { fwd: 1.15 + 0.1 * s, out: -0.15, elbow: 0.5 }, legL: { fwd: -0.3, side: 0.15, knee: 0.3 }, legR: { fwd: 0.25 - 0.1 * push, side: -0.15, knee: 0.35 }, bob: -0.05 + 0.04 * Math.abs(s) });
    A.root.position.x = -1.0 + 0.15 * push; B.root.position.x = 1.0 + 0.15 * push;
    R.pose({ headYaw: 0.3, armR: { fwd: 0.5 + 0.2 * Math.max(0, Math.sin(ph * 2)), out: 0.3, elbow: 0.3 }, armL: { fwd: 0.1, elbow: 0.3 } });
    crowd.forEach(o => { o.a.position.y = 1.75 + 0.15 * Math.sin(ph * 2 + o.k); });
  };
}
