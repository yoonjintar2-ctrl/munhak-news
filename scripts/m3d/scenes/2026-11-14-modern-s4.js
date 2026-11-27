// 11/14 1분 현대문학 장면④ 마담의 집: 캐시와 토미가 현관 앞에 서고, 토미가 문을 두드린다. 처마 등이 흔들리고 낙엽이 진다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3c8', line: '#c6c3b8', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 12 });
  K.box(12, 6.5, 0.5, 0xb3b1ab, 0, 3.25, -4.5, scene);                // 집 정면
  K.box(2.0, 3.4, 0.2, 0x3b3b39, 0.6, 1.7, -4.15, scene);             // 문
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), K.flat(0xe0e0da)); knob.position.set(1.3, 1.7, -4.0); scene.add(knob);
  K.box(3.0, 0.25, 1.4, 0x8c8b86, 0.6, 0.12, -3.5, scene);            // 계단
  const winT = K.canvasTex(128, 160, (g, w, h) => { g.fillStyle = '#e9e8e2'; g.fillRect(0, 0, w, h); g.strokeStyle = '#333'; g.lineWidth = 8; g.strokeRect(4, 4, w - 8, h - 8); g.beginPath(); g.moveTo(w / 2, 0); g.lineTo(w / 2, h); g.stroke(); });
  [-3.6, 4.6].forEach(x => { const m = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 2.2), new THREE.MeshLambertMaterial({ map: winT })); m.position.set(x, 3.6, -4.2); scene.add(m); });
  const lg = new THREE.Group(); lg.position.set(-1.0, 4.2, -3.9); scene.add(lg); K.line([[0, 0, 0], [0, -0.5, 0]], lg); K.cyl(0.25, 0.3, 0.55, 0xf1f0ea, 0, -0.8, 0, lg, 10);
  // 캐시(왼쪽, 토미 팔을 살짝 잡음) · 토미(문을 두드림)
  const C = K.person(scene, { x: -0.9, z: -1.6, rot: 0.3, coat: 0xd5d2ca, pants: 0x55554f, hair: 'long', scale: 0.95 });
  const Tm = K.person(scene, { x: 0.3, z: -2.6, rot: 0, coat: 0x8c8a84, pants: 0x3a3a38, hair: 'short', scale: 1.0 });
  // 낙엽
  const leaves = []; for (let i = 0; i < 14; i++) { const l = K.inked(new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.14), new THREE.MeshLambertMaterial({ color: i % 2 ? 0x55544f : 0x9a9893, side: THREE.DoubleSide })), 1); scene.add(l); leaves.push({ l, k: (i * 0.61) % 1, x: -6 + (i * 0.93) % 12, z: -2 + (i % 4) }); }
  cam.position.set(6.0, 3.0, 5.5); cam.lookAt(0.2, 2.2, -3.2);
  return (t, ph) => {
    lg.rotation.z = 0.15 * Math.sin(ph * 2);
    const knock = Math.max(0, Math.sin(ph * 6)) * K.win(ph, 0.05, 0.6, 0.06);
    Tm.pose({ headPitch: 0.05, armR: { fwd: 1.45 + 0.25 * knock, out: -0.05, elbow: 0.9 - 0.4 * knock }, armL: { fwd: 0.1 } });
    const look = K.win(ph, 0.55, 0.95, 0.08);
    C.pose({ headYaw: -0.5 * look, headPitch: 0.05, armR: { fwd: 0.7, out: -0.15, elbow: 0.7 }, armL: { fwd: 0.1 } });
    leaves.forEach(o => { const u = (o.k + ph / (Math.PI * 2)) % 1; o.l.position.set(o.x + Math.sin(ph * 2 + o.k * 6) * 0.6, 6 - u * 6, o.z); o.l.rotation.set(ph * 2 + o.k * 5, ph * 3, 0); });
  };
}
