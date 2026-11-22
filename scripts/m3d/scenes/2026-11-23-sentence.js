// 11/23 오늘의 문장 『허클베리 핀의 모험』: 강 위 뗏목, 거적 움막 앞에 앉은 맨발 소년이 편지를 두 손으로 찢는다. 종잇조각이 바람에 날리고 물결·강가 나무가 흔들린다. 뗏목은 제자리(카메라 고정)
export const secs = 3;
export const opts = { bg: 0xe4e2dc, fog: [0xe0ded8, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'shore', seed: 2311, near: false });
  const water = K.box(60, 0.1, 40, 0xbcb9b1, 0, -0.05, -6, scene);
  const waves = []; for (let i = 0; i < 14; i++) { const w = K.box(1.6, 0.03, 0.06, 0xf2f0ea, -8 + (i * 1.37) % 16, 0.03, -4 + (i * 0.71) % 8, scene); waves.push({ w, k: i * 0.7 }); }
  const raft = new THREE.Group(); scene.add(raft);
  for (let i = 0; i < 7; i++) K.cyl(0.25, 0.25, 6, 0x77756f, -1.5 + i * 0.5, 0.25, -1.5, raft, 10).rotation.x = Math.PI / 2;
  // 거적 움막
  const hut = new THREE.Mesh(new THREE.ConeGeometry(1.4, 1.8, 4, 1, true), new THREE.MeshLambertMaterial({ color: 0x8a8782, side: THREE.DoubleSide })); K.inked(hut, 30); hut.rotation.y = Math.PI / 4; hut.position.set(0.3, 1.4, -3.2); raft.add(hut);
  K.cyl(0.05, 0.05, 2.5, 0x3a3936, 1.8, 1.7, -0.2, raft, 6); // 장대
  const boy = K.person(scene, { x: -0.3, z: -1.2, rot: Math.PI, coat: 0x55534e, pants: 0x8a8782, hair: 'short', scale: 0.75 });
  const bg = new THREE.Group(); bg.position.y = -0.85; scene.add(bg); bg.add(boy.root); boy.root.position.y = 0.5;
  const pL = K.box(0.3, 0.4, 0.01, 0xfbfaf6, 0, 0, 0, scene), pR = K.box(0.3, 0.4, 0.01, 0xfbfaf6, 0, 0, 0, scene);
  boy.hold('L', pL, { at: [0.05, -0.1, 0.1] }); boy.hold('R', pR, { at: [-0.05, -0.1, 0.1] });
  const bits = []; for (let i = 0; i < 10; i++) { const b = K.box(0.12, 0.12, 0.01, 0xfbfaf6, 0, 0, 0, scene); bits.push({ b, k: i / 10 }); }
  cam.position.set(1.2, 2.6, 5.6); cam.lookAt(-0.2, 1.0, -1.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), tear = K.win(ph, 0.2, 0.6, 0.12);
    boy.pose({ headPitch: 0.35, armL: { fwd: 1.2, elbow: 1.2, out: -0.2 + 0.3 * tear }, armR: { fwd: 1.2, elbow: 1.2, out: -0.2 + 0.3 * tear } });
    raft.position.y = 0.04 * Math.sin(ph * 2); raft.rotation.z = 0.015 * Math.sin(ph * 2);
    bits.forEach(o => { const v = (o.k + u) % 1; o.b.position.set(-0.3 + v * 4 + 0.3 * Math.sin(ph * 3 + o.k * 9), 1.6 + v * 1.5 + 0.2 * Math.sin(ph * 4 + o.k * 5), -0.6 - v * 1.5); o.b.rotation.set(ph * 3 + o.k * 6, ph * 2, o.k); });
    waves.forEach(o => { o.w.position.y = 0.03 + 0.02 * Math.sin(ph * 2 + o.k); o.w.scale.x = 0.8 + 0.3 * Math.sin(ph + o.k); });
  };
}
