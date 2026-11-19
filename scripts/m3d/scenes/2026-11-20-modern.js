// 11/20 1분 현대문학 「미스터 방」 대표: 해방 직후 서울 길가. 신기료장수 방삼복(모자)이 낮은 나무 상자 앞에 앉아(몸을 낮춤) 헌 구두를 무릎에 얹고 송곳 바늘질을 한다. 뒤로 두 사람이 무늬 없는 깃발을 흔들며 서 있고, 전봇대 전깃줄에 참새가 앉아 있다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 40, 130] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#e2dfd7', line: '#d8d5cd', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 61 });
  // 기와 담장 + 가게 처마
  K.box(16, 2.4, 0.4, 0xd4d1c9, 0, 1.2, -6, scene); K.box(16.4, 0.3, 0.9, 0x55534e, 0, 2.5, -6, scene);
  K.box(4, 3.2, 2, 0xc8c5bd, 4.5, 1.6, -7.5, scene); K.box(4.6, 0.25, 2.8, 0x45443f, 4.5, 3.3, -7.0, scene);
  // 연장 상자 + 구두 몇 켤레
  K.box(1.4, 0.7, 0.8, 0x6e6c66, -0.6, 0.35, -1.0, scene); K.box(1.5, 0.08, 0.9, 0x45443f, -0.6, 0.72, -1.0, scene);
  [[-1.0, -0.5], [-0.5, -0.4], [-0.1, -0.55]].forEach(([x, z], i) => { const s = K.box(0.25, 0.18, 0.6, [0x2a2a28, 0x45443f, 0x3a3936][i], x - 0.8, 0.09, z + 1.2, scene); s.rotation.y = i * 0.4; });
  const M = K.person(scene, { x: 0.8, z: -0.9, rot: 1.9, coat: 0x6e6c66, pants: 0x3a3936, hair: 'cap', scale: 0.9 });
  const shoe = K.box(0.28, 0.22, 0.7, 0x2a2a28, 0, 0, 0, scene); M.hold('L', shoe, { at: [0, -0.15, -0.2], rot: [0.3, 0, 0] });
  const awl = K.cyl(0.02, 0.03, 0.5, 0xd8d6d0, 0, 0, 0, scene, 5); M.hold('R', awl, { at: [0, -0.2, 0], rot: [0.4, 0, 0] });
  // 깃발 든 사람 둘(뒤)
  const flags = [];
  [[-3.2, -4.2, 0x45443f, 'short'], [-1.6, -4.6, 0x8a8782, 'bun']].forEach(([x, z, c, h], i) => { const P = K.person(scene, { x, z, rot: 2.7 + i * 0.6, coat: c, pants: 0x2e2d2a, hair: h, scale: 0.85 });
    const pole = new THREE.Group(); K.cyl(0.03, 0.03, 2.0, 0x3a3936, 0, 0.9, 0, pole, 5); const fl = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.6, 6, 1), new THREE.MeshLambertMaterial({ color: 0xf6f4ee, side: THREE.DoubleSide })); fl.position.set(0.45, 1.6, 0); pole.add(fl);
    P.hold('R', pole, { at: [0, -0.1, 0], rot: [Math.PI, 0, 0] }); flags.push({ P, fl, k: i * 1.3 }); });
  const birds = []; for (let i = 0; i < 3; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), K.lam(0x333331)); b.scale.set(1.3, 1, 1); b.position.set(-6 + i * 0.7, 6.1, -10); scene.add(b); birds.push(b); }
  cam.position.set(0.0, 2.4, 5.2); cam.lookAt(-0.2, 1.5, -2.2);
  return (t, ph) => {
    const st = Math.sin(ph * 3);
    M.pose({ bob: -0.85, lean: -0.35, headPitch: 0.4, armL: { fwd: 0.9, out: -0.1, elbow: 1.1 }, armR: { fwd: 0.8 + 0.25 * st, out: -0.2, elbow: 1.2 - 0.3 * st } });
    flags.forEach(o => { const w = Math.sin(ph * 2 + o.k); o.P.pose({ headPitch: -0.15, armR: { fwd: 2.4 + 0.2 * w, out: 0.2, elbow: 0.2 }, armL: { fwd: 0.2, elbow: 0.3 } });
      const pos = o.fl.geometry.attributes.position; for (let j = 0; j < pos.count; j++) { const x = pos.getX(j); pos.setZ(j, 0.12 * Math.sin(ph * 4 + x * 5 + o.k) * (x + 0.45)); } pos.needsUpdate = true; });
    birds.forEach((b, i) => { b.position.y = 6.1 + 0.05 * Math.abs(Math.sin(ph * 4 + i)); b.rotation.z = 0.3 * Math.sin(ph * 2 + i * 2); });
  };
}
