// 11/14 1분 고전 장면④ 개울: 물에 빠진 허 생원을 동이가 등에 업고 개울을 건넌다, 달빛·물결, 나귀와 조 선달은 건너편에서 지켜본다
export const secs = 3;
export const opts = { bg: 0x80807b, fog: [0x7c7c77, 28, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#7d7c77', line: '#7a7974', tiles: 2, repeat: 3 });
  // 개울(가로로 흐름) + 물결 줄
  const wt = new THREE.Mesh(new THREE.PlaneGeometry(60, 5), K.lam(0x5b5b58)); wt.rotation.x = -Math.PI / 2; wt.position.set(0, 0.03, 0.5); scene.add(wt);
  const rip = []; for (let i = 0; i < 16; i++) { const r = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.07), K.flat(0xe3e3dd)); r.rotation.x = -Math.PI / 2; scene.add(r); rip.push({ r, k: i / 16, z: -1.5 + (i % 5) * 0.95 }); }
  [[-5, 2.6], [-3.6, -1.6], [4.2, 2.4], [6, -1.4], [1.0, 2.9]].forEach(([x, z]) => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.45, 10, 8), K.lam(0x6a6964)); s.scale.set(1.3, 0.45, 1); s.position.set(x, 0.1, z); scene.add(K.inked(s)); });
  // 동이(앞으로 숙여 걷는다) + 등에 업힌 허 생원(동이 몸통에 붙여 같이 움직임)
  const Dg = K.person(scene, { x: 0.5, z: 0.6, rot: -Math.PI / 2 + 0.75, coat: 0xe2dfd7, pants: 0x9a978f, hair: 'short', scale: 0.96 });
  const H = K.person(scene, { x: 0, z: 0, rot: 0, coat: 0x6f6d68, pants: 0x55534f, hair: 'short', hairC: 0x777773, scale: 0.86 });
  Dg.torso.add(H.root); H.root.position.set(0, -1.0, 0.8); H.root.rotation.set(-0.3, 0, 0); H.root.scale.setScalar(0.8);
  // 건너편: 나귀 + 조 선달
  const D = new THREE.Group(); D.position.set(-6.5, 0, -5.5); D.rotation.y = 0.3; scene.add(D);
  K.box(2.2, 1.0, 0.9, 0x5e5d58, 0, 1.6, 0, D); [[-0.8, 0.3], [0.8, 0.3], [-0.8, -0.3], [0.8, -0.3]].forEach(([x, z]) => K.cyl(0.1, 0.08, 1.2, 0x55544f, x, 0.6, z, D, 6));
  const dn = new THREE.Group(); dn.position.set(1.1, 1.9, 0); D.add(dn); const nk = K.box(0.9, 0.45, 0.4, 0x5e5d58, 0.35, 0.3, 0, dn); nk.rotation.z = 0.7; K.box(0.75, 0.38, 0.38, 0x6a6964, 0.85, 0.65, 0, dn);
  const Jo = K.person(scene, { x: -3.8, z: -5.0, rot: 0.2, coat: 0xc2bfb7, pants: 0xa9a69e, hair: 'short', scale: 0.88 });
  const moon = new THREE.Mesh(new THREE.CircleGeometry(2.0, 32), K.flat(0xfbfbf6)); moon.position.set(10, 14, -45); scene.add(moon);
  cam.position.set(2.5, 3.2, 9.5); cam.lookAt(0.3, 2.3, -0.5);
  return (t, ph) => {
    rip.forEach(o => { const u = (o.k + ph / (Math.PI * 2)) % 1; o.r.position.set(-12 + u * 24, 0.05, o.z); });
    const st = Math.sin(ph * 2);
    Dg.pose({ lean: -0.3, headPitch: 0.45, headYaw: -0.3, bob: Math.abs(st) * 0.08, armL: { fwd: -0.5, out: 0.25, elbow: 1.3 }, armR: { fwd: -0.5, out: 0.25, elbow: 1.3 } });
    H.pose({ headYaw: 0.5 + 0.2 * Math.sin(ph), headPitch: 0.1, armL: { fwd: 1.3, out: 0.3, elbow: 1.1 }, armR: { fwd: 1.3, out: 0.3, elbow: 1.1 } });
    Jo.pose({ headYaw: -0.3, armR: { fwd: 0.9 * K.win(ph, 0.2, 0.7, 0.1), out: 0.2, point: true } });
    dn.rotation.z = 0.08 * Math.sin(ph * 2);
  };
}
