// 11/22 오늘의 사나이 도란도 피에트리(1908 런던 올림픽 마라톤): 경기장 흙 트랙, 흰 러닝셔츠의 마라토너가 탈진해 비틀거리며 카메라 쪽으로 다가온다(진행 방향 +z, 선수 rot ≈ π). 곁에서 진한 양복·밀짚모자의 심판이 팔을 뻗어 부축하려 한다. 뒤 관중석 관중이 손을 흔들고 깃발(무늬 없음)이 펄럭인다. 카메라 고정(세로)
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 90], fov: 40, w: 720, h: 860 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(30, 0.2, 40, 0xd4d1c9, 0, -0.1, -8, scene);
  [-2.2, 2.2].forEach(x => K.box(0.08, 0.02, 40, 0xfbfaf6, x, 0.01, -8, scene));
  K.box(6, 0.03, 0.25, 0xfbfaf6, 0, 0.02, 4.6, scene); // 결승선(무늬 없음)
  // 관중석 계단 + 관중
  for (let r = 0; r < 4; r++) K.box(30, 0.8, 1.6, [0xbcb9b1, 0xb0ada5][r % 2], 0, 0.4 + r * 0.8, -14 - r * 1.6, scene);
  const fans = []; for (let i = 0; i < 30; i++) { const r = i % 4, g = new THREE.Group(); g.position.set(-12 + (i * 0.83) % 24, 0.8 + r * 0.8, -14 - r * 1.6); scene.add(g); const c = [0x6a6863, 0x8a8782, 0x55534e][i % 3];
    const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.35, 0.6, 4, 8), K.lam(c)); b.position.y = 0.6; g.add(b); const h = new THREE.Mesh(new THREE.SphereGeometry(0.25, 10, 8), K.lam(0xdcd6ce)); h.position.y = 1.4; g.add(h); const hat = K.cyl(0.32, 0.32, 0.06, 0x3a3936, 0, 1.6, 0, g, 12);
    const a = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.6, 3, 6), K.lam(c)); a.position.set(0.4, 1.4, 0); g.add(a); fans.push({ a, k: i * 0.37 }); }
  const flags = []; for (let i = 0; i < 5; i++) { K.cyl(0.05, 0.05, 4, 0x55534e, -10 + i * 5, 5.5, -20, scene, 6); const f = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.9, 6, 1), new THREE.MeshLambertMaterial({ color: [0xf6f4ee, 0x8a8782][i % 2], side: THREE.DoubleSide })); f.position.set(-10 + i * 5 + 0.7, 7.0, -20); scene.add(f); flags.push(f); }
  // 선수
  const A = K.athlete(scene, { x: 0, z: 1.0, rot: Math.PI, kind: 'runner', scale: 1.0, top: 0xa8a59e, bottom: 0x2a2a2a });
  // 심판(오른쪽, 선수 쪽을 봄)
  const O = K.person(scene, { x: 1.9, z: 1.4, rot: 2.3, coat: 0x2f2e2b, pants: 0x45443f, hair: 'short', scale: 1.05 });
  const sh = new THREE.Group(); sh.position.y = 0.55; O.headG.add(sh); K.cyl(0.6, 0.6, 0.04, 0xd8d5cd, 0, 0, 0, sh, 20); K.cyl(0.32, 0.34, 0.3, 0xd8d5cd, 0, 0.16, 0, sh, 16);
  cam.position.set(0.4, 3.4, 13.5); cam.lookAt(0.3, 2.3, -1.0);
  return (t, ph) => {
    const s = Math.sin(ph * 2), wob = Math.sin(ph * 2);
    A.root.rotation.z = 0.12 * wob; A.root.position.x = 0.25 * wob; A.root.position.z = 1.0 + 0.4 * Math.sin(ph);
    A.pose({ lean: -0.1, headPitch: 0.35 + 0.1 * Math.sin(ph * 4), bob: 0.06 * Math.abs(Math.cos(ph * 2)), armL: { fwd: 0.2 + 0.2 * s, out: 0.35, elbow: 0.6 }, armR: { fwd: 0.2 - 0.2 * s, out: 0.35, elbow: 0.6 },
      legL: { fwd: -0.35 * s, knee: 0.5 + 0.4 * Math.max(0, s) }, legR: { fwd: 0.35 * s, knee: 0.5 + 0.4 * Math.max(0, -s) } });
    const reach = K.win(ph, 0.15, 0.85, 0.15);
    O.pose({ lean: -0.2 * reach, armL: { fwd: 0.8 + 0.7 * reach, out: 0.2, elbow: 0.4 }, armR: { fwd: 0.4 + 0.6 * reach, elbow: 0.8 }, headPitch: 0.15 });
    fans.forEach(o => { o.a.rotation.z = 0.3 + 0.5 * Math.sin(ph * 6 + o.k * 20); });
    flags.forEach((f, i) => { const pos = f.geometry.attributes.position; for (let j = 0; j < pos.count; j++) { const x = pos.getX(j); pos.setZ(j, 0.15 * Math.sin(ph * 4 + x * 4 + i)); } pos.needsUpdate = true; });
  };
}
