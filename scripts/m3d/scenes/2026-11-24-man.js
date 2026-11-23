// 11/24 오늘의 사나이 양정모(3D 삽화, 실제 인물 아님): 둥근 레슬링 매트 위, 짙은 싱글렛과 밝은 싱글렛의 두 레슬러가 몸을 낮추고 서로의 어깨를 맞잡는다(앞 레슬러 얼굴이 카메라 쪽 rot -2.1·2.1로 마주 봄, 얼굴은 카메라 쪽으로 비스듬히). 심판이 팔을 들고, 관중석 깃발이 흔들리며 조명이 비친다. 세로 720×860
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 90], fov: 40, w: 720, h: 860 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(24, 0.2, 24, 0xc8c3b8, 0, -0.1, -4, scene);
  // 매트(정사각 + 원 두 개)
  K.box(10, 0.15, 10, 0xd8d5cd, 0, 0.07, -2.5, scene); K.cyl(4.2, 4.2, 0.04, 0x9a978f, 0, 0.16, -2.5, scene, 48); K.cyl(3.6, 3.6, 0.05, 0xe2dfd7, 0, 0.18, -2.5, scene, 48); K.cyl(0.6, 0.6, 0.06, 0xbcb9b1, 0, 0.2, -2.5, scene, 24);
  // 관중석(계단) + 관중 + 깃발
  for (let r = 0; r < 4; r++) { K.box(20, 0.6, 1.2, [0xbcb9b1, 0xaeaba3][r % 2], 0, 0.3 + r * 0.6, -9 - r * 1.2, scene); for (let i = 0; i < 14; i++) { const h = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), K.lam([0x6e6c66, 0x55534e, 0x8a8782][(i + r) % 3])); h.position.set(-8 + i * 1.2 + (r % 2) * 0.6, 1.0 + r * 0.6, -9.2 - r * 1.2); scene.add(h); K.box(0.5, 0.5, 0.3, [0x8a8782, 0x6e6c66][(i + r) % 2], h.position.x, 0.65 + r * 0.6, -9.2 - r * 1.2, scene); } }
  const flags = []; [-4, 1.5, 5].forEach((x, i) => { K.cyl(0.03, 0.03, 2.2, 0x262626, x, 3.4, -10.5, scene, 6); const f = K.box(1.2, 0.75, 0.03, i === 1 ? 0xeeece6 : 0xbcb9b1, x + 0.6, 4.1, -10.5, scene); flags.push(f); if (i === 1) { const c = new THREE.Mesh(new THREE.CircleGeometry(0.18, 20), K.flat(0x55534e)); c.position.set(x + 0.6, 4.1, -10.48); scene.add(c); } });
  // 조명
  const lights = []; [-3, 3].forEach(x => { K.box(1.4, 0.3, 0.6, 0x3a3936, x, 8.5, -4, scene); const c = new THREE.Mesh(new THREE.ConeGeometry(2.4, 8, 24, 1, true), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide })); c.position.set(x, 4.5, -4); scene.add(c); lights.push(c); });
  // 레슬러 둘
  const A = K.athlete(scene, { x: -0.75, z: -2.3, rot: -2.1, kind: 'fighter', scale: 0.95, top: 0x2a2a2a, bottom: 0x2a2a2a });
  const B = K.athlete(scene, { x: 0.85, z: -2.6, rot: 2.1, kind: 'fighter', scale: 0.95, top: 0x8a8782, bottom: 0x8a8782 });
  // 심판
  const R = K.person(scene, { x: 2.8, z: -4.2, rot: 2.6, coat: 0xeeece6, pants: 0x2c2c2c, hair: 'short', scale: 0.85 });
  cam.position.set(0.2, 3.0, 9.0); cam.lookAt(0.1, 2.2, -2.5);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), push = Math.sin(ph * 2);
    A.pose({ lean: -0.5 - 0.05 * push, headPitch: 0.3, armL: { fwd: 1.3, elbow: 0.5, out: 0.1 }, armR: { fwd: 1.4, elbow: 0.4, out: 0.05 }, legL: { fwd: 0.4, knee: 0.6 }, legR: { fwd: -0.3, knee: 0.4 }, bob: -0.25 });
    B.pose({ lean: -0.5 + 0.05 * push, headPitch: 0.3, armL: { fwd: 1.4, elbow: 0.4 }, armR: { fwd: 1.3, elbow: 0.5, out: 0.1 }, legL: { fwd: -0.3, knee: 0.4 }, legR: { fwd: 0.4, knee: 0.6 }, bob: -0.25 });
    A.root.position.x = -1.0 + 0.12 * push; B.root.position.x = 1.1 + 0.12 * push;
    R.pose({ armR: { fwd: 2.4 * K.win(ph, 0.3, 0.8, 0.1) + 0.2, out: 0.3 }, armL: { fwd: 0.2 }, headYaw: -0.3 });
    flags.forEach((f, i) => { f.rotation.y = 0.35 * Math.sin(ph * 3 + i); });
    lights.forEach((c, i) => { c.material.opacity = 0.1 + 0.04 * Math.sin(ph * 2 + i * 2); });
  };
}
