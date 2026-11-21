// 11/22 『싱아』 장면①(after 1): 시골 흙길, 짐 보따리를 머리에 인 엄마가 단발머리 딸의 손을 잡고 마을을 떠나 걸어간다. 진행 방향 +x(오른쪽) — 엄마·딸 rot -π/2, 길가 풀·돌·전봇대는 -x 쪽으로 흐름. 딸은 고개를 돌려 왼쪽 뒤 초가 마을을 돌아본다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'country', seed: 2222, near: false });
  K.box(60, 0.2, 20, 0xd4d1c9, 0, -0.1, -4, scene); K.box(60, 0.05, 2.2, 0xe4e1d9, 0, 0.02, -1.2, scene);
  [[-9, -9], [-6, -11]].forEach(([x, z]) => { K.box(3, 1.7, 2, 0xd8d5cd, x, 0.85, z, scene); const r = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.9, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x8a8782)), 40); r.scale.set(1, 0.55, 0.8); r.position.set(x, 1.7, z); scene.add(r); });
  const side = []; for (let i = 0; i < 16; i++) { const g = new THREE.Group(); scene.add(g); if (i % 4 === 0) K.cyl(0.08, 0.1, 3.5, 0x55534e, 0, 1.75, 0, g, 6); else if (i % 4 === 1) K.cyl(0.3, 0.35, 0.3, 0x8a8782, 0, 0.15, 0, g, 8); else { K.box(0.04, 0.6, 0.04, 0x55534e, 0, 0.3, 0, g); K.box(0.04, 0.5, 0.04, 0x55534e, 0.12, 0.25, 0.05, g); } side.push({ g, k: i / 16, z: i % 2 ? 0.6 : -2.8 }); }
  const Mo = K.person(scene, { x: 0.6, z: -1.2, rot: -Math.PI / 2, coat: 0xd8d5cd, pants: 0x55534e, hair: 'bun', scale: 1.0 });
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.95, 2.0, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0x6e6c66, side: THREE.DoubleSide })), 40); sk.position.y = 1.0; Mo.root.add(sk);
  const bundle = K.box(0.9, 0.45, 0.7, 0x8a8782, 0, 0.55, 0, Mo.headG);
  const Gi = K.person(scene, { x: -0.6, z: -1.0, rot: -Math.PI / 2, coat: 0xc8c5bd, pants: 0x45443f, hair: 'bob', scale: 0.62 });
  const sk2 = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.1, 14, 1, true), new THREE.MeshLambertMaterial({ color: 0x55534e, side: THREE.DoubleSide })), 40); sk2.position.y = 0.7; Gi.root.add(sk2);
  cam.position.set(0.0, 2.8, 8.0); cam.lookAt(0.0, 1.6, -1.5);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), w = Math.sin(ph * 4);
    side.forEach(o => { const v = (o.k + u) % 1; o.g.position.set(12 - v * 24, 0, o.z); });
    Mo.pose({ bob: 0.05 * Math.abs(w), legL: { fwd: 0.35 * w }, legR: { fwd: -0.35 * w }, armR: { fwd: 2.6, elbow: 0.6 }, armL: { fwd: 0.4, out: 0.35 } });
    Gi.pose({ bob: 0.05 * Math.abs(w), legL: { fwd: 0.45 * w }, legR: { fwd: -0.45 * w }, armR: { fwd: 0.4, out: -0.3 }, armL: { fwd: -0.2 * w }, headYaw: 1.2 * K.win(ph, 0.2, 0.8, 0.15), headPitch: 0.05 });
  };
}
