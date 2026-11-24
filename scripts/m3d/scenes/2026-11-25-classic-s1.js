// 11/25 「달밤」 장면①(after 2): 아침 골목, 신문 뭉치를 두 팔에 안은 머리 큰 수건이 허리에 찬 방울을 흔들며 '원배달' 흉내를 내며 제자리걸음으로 뽐낸다. 진행 방향 +x(화면 오른쪽), 수건 rot -2.2(오른쪽 앞, 얼굴 카메라 쪽). 돌담·감나무·참새, 방울 흔들림. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3cb', line: '#cfccc4', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 2522 });
  // 돌담(돌 무더기)
  for (let i = 0; i < 26; i++) { const r = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.42, 8, 6), K.lam([0x9a978f, 0x8a8782, 0xaeaba3][i % 3])), 40); r.scale.set(1.2, 0.75, 0.9); r.position.set(-7 + (i % 13) * 1.1, 0.3 + Math.floor(i / 13) * 0.55, -3.6); scene.add(r); }
  // 감나무
  const tr = new THREE.Group(); tr.position.set(4.4, 0, -4.6); scene.add(tr); K.cyl(0.2, 0.32, 3.4, 0x45443f, 0, 1.7, 0, tr, 8);
  const cr = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.7, 14, 10), K.lam(0x8a8782)), 70); cr.position.y = 3.9; tr.add(cr);
  for (let i = 0; i < 7; i++) { const p = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), K.lam(0x3a3936)); p.position.set(Math.cos(i * 0.9) * 1.6, 3.2 + (i % 4) * 0.45, Math.sin(i * 0.9) * 1.6); tr.add(p); }
  // 지게·항아리 소품
  K.cyl(0.4, 0.3, 0.8, 0x55534e, -4.4, 0.4, -2.4, scene, 12); K.box(0.1, 1.8, 0.1, 0x6e6c66, -5.4, 0.9, -2.6, scene);
  // 수건
  const S = K.person(scene, { x: -0.4, z: -0.4, rot: -2.2, coat: 0x6e6c66, pants: 0x3a3936, hair: 'short', scale: 1.0 });
  S.headG.scale.setScalar(1.3);
  const papers = new THREE.Group(); K.box(0.9, 0.45, 0.6, 0xeeece6, 0, 0, 0, papers); K.box(0.92, 0.05, 0.62, 0x8a8782, 0, 0.12, 0, papers);
  S.hold('L', papers, { at: [0.35, -0.05, -0.15], rot: [0, 0.2, 0] });
  // 허리 방울
  const bell = new THREE.Group(); bell.position.set(0.55, 1.95, -0.3); S.root.add(bell);
  K.line([[0, 0, 0], [0, -0.25, 0]], bell); const bb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), K.lam(0x2f2e2b)), 40); bb.position.y = -0.33; bell.add(bb);
  const birds = [K.bird(scene, { cx: 1, cy: 6.5, cz: -6, rx: 6, rz: 2, s: 0.6 })];
  cam.position.set(0.2, 2.5, 6.6); cam.lookAt(0.2, 1.7, -1.4);
  return (t, ph) => {
    const st = Math.sin(ph * 4);
    S.pose({ bob: 0.08 * Math.abs(st), headYaw: 0.25 * Math.sin(ph * 2), headTilt: 0.1 * st, lean: -0.08, armL: { fwd: 0.9, elbow: 1.5 }, armR: { fwd: 0.4 + 0.5 * Math.max(0, st), elbow: 0.8, out: 0.2 } });
    bell.rotation.z = 0.6 * Math.sin(ph * 4); bell.rotation.x = 0.3 * Math.cos(ph * 4);
    cr.rotation.z = 0.03 * Math.sin(ph * 2);
    birds.forEach(b => b && b.update && b.update(ph));
  };
}
