// 11/22 1분 현대문학 『그 많던 싱아는 누가 다 먹었을까』 대표: 초여름 박적골 들판 개울가. 단발머리 소녀가 풀숲에서 꺾은 싱아 줄기를 입에 물고, 다른 손으로 또 한 줄기를 꺾으려 한다. 뒤로 초가 둘과 먼 산, 풀잎과 싱아 줄기가 바람에 흔들리고 나비가 난다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dcd9d1', line: '#d0cdc5', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2221, near: false });
  // 초가 둘
  [[-6, -10], [-2.5, -12]].forEach(([x, z]) => { K.box(3.2, 1.8, 2.2, 0xd8d5cd, x, 0.9, z, scene); const r = K.inked(new THREE.Mesh(new THREE.SphereGeometry(2.1, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x8a8782)), 40); r.scale.set(1, 0.55, 0.8); r.position.set(x, 1.8, z); scene.add(r); K.box(0.7, 1.2, 0.05, 0x45443f, x, 0.6, z + 1.12, scene); });
  // 개울
  const brook = new THREE.Mesh(new THREE.PlaneGeometry(30, 1.6, 30, 2), K.lam(0xbcb9b1)); brook.rotation.x = -Math.PI / 2; brook.position.set(0, 0.02, -4.5); scene.add(brook);
  // 싱아 줄기들(마디 있는 긴 줄기)
  const stalks = []; for (let i = 0; i < 18; i++) { const g = new THREE.Group(); g.position.set(-4 + (i * 0.53) % 8, 0, -1.8 - (i * 0.37) % 1.8); scene.add(g); const h = 1.6 + (i % 4) * 0.35; K.cyl(0.04, 0.05, h, 0x55534e, 0, h / 2, 0, g, 6); for (let j = 1; j < 3; j++) K.cyl(0.07, 0.07, 0.05, 0x3a3936, 0, h * j / 3, 0, g, 6); const lf = K.box(0.35, 0.03, 0.15, 0x6e6c66, 0.18, h * 0.5, 0, g); lf.rotation.z = 0.5; stalks.push(g); }
  // 소녀
  const G = K.person(scene, { x: 0.4, z: -0.6, rot: Math.PI - 0.5, coat: 0xd8d5cd, pants: 0x55534e, hair: 'bob', hairC: 0x1e1e1e, scale: 0.72 });
  const skirt = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.3, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0x6e6c66, side: THREE.DoubleSide })), 40); skirt.position.y = 0.8; G.root.add(skirt);
  const st = new THREE.Group(); K.cyl(0.035, 0.035, 0.9, 0x45443f, 0, -0.35, 0, st, 6); G.hold('R', st, { at: [0, -0.1, 0] });
  const flies = [K.bird(scene, { cx: 1.5, cy: 2.2, cz: -1.5, rx: 1.2, rz: 0.8, s: 0.35 }), K.bird(scene, { cx: -1.5, cy: 2.6, cz: -2.0, rx: 1.0, rz: 0.6, s: 0.3 })];
  cam.position.set(0.3, 2.4, 5.6); cam.lookAt(0.0, 1.5, -2.5);
  return (t, ph) => {
    const bite = K.win(ph, 0.1, 0.5, 0.1), reach = K.win(ph, 0.55, 0.95, 0.1);
    G.pose({ headPitch: 0.05 + 0.2 * reach, headYaw: -0.2 * reach, armR: { fwd: 1.3 * bite + 0.3, elbow: 1.9 * bite, out: -0.05 }, armL: { fwd: 0.9 * reach + 0.2, out: 0.3, elbow: 0.2 } });
    stalks.forEach((g, i) => { g.rotation.z = 0.08 * Math.sin(ph * 2 + i * 0.7); g.rotation.x = 0.05 * Math.cos(ph * 2 + i); });
    const pos = brook.geometry.attributes.position; for (let j = 0; j < pos.count; j++) pos.setZ(j, 0.04 * Math.sin(ph * 3 + pos.getX(j) * 0.8)); pos.needsUpdate = true;
    flies[0].update(ph); flies[1].update(ph, 2.0);
  };
}
