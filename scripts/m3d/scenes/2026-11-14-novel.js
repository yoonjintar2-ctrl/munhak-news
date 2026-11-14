// 11/14 오늘의 소설 구절 — 생텍쥐페리 『어린 왕자』: 바람 부는 밀밭 언덕, 목도리를 두른 아이와 여우가 마주 본다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3c8', line: '#c6c3b8', tiles: 2, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 4 });
  // 밀 단: 큰 덩어리 몇 개(바람에 흔들림)
  const wheat = []; [[-9, -7], [-5.5, -9], [-2, -8], [3.5, -9], [7, -7.5], [10, -10], [-12, -10]].forEach(([x, z], i) => { const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g);
    const c = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1, 14, 10), K.lam(0xd8d2ba)), 70); c.scale.set(0.8, 1.3, 0.8); c.position.y = 1.1; g.add(c); wheat.push({ g, o: i * 0.8 }); });
  // 낮은 언덕
  const hill = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 12, 0, Math.PI * 2, 0, 0.25), K.lam(0xadaba2)); hill.position.set(0, -29, -30); scene.add(hill);
  // 아이(목도리)
  const P = K.person(scene, { x: -1.4, z: 1.5, rot: -Math.PI / 2 - 0.6, coat: 0x6a6862, pants: 0x3a3936, hair: 'short', hairC: 0xe6d8a8, scale: 0.6, scarf: 0xf2f0ea });
  const scarf = new THREE.Group(); scarf.position.set(0.15, 1.45, 0.62); P.torso.add(scarf);
  const sc1 = K.box(0.22, 0.9, 0.06, 0x77756f, 0, -0.45, 0, scarf);
  // 여우
  const F = new THREE.Group(); F.position.set(1.5, 0, 1.2); F.rotation.y = Math.PI + 0.4; scene.add(F);
  const fb = K.inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.8, 4, 10), K.lam(0x8f8b82)), 40); fb.rotation.z = Math.PI / 2 - 0.5; fb.position.set(0, 0.62, 0); F.add(fb);
  [[0.15, 0.18], [0.15, -0.18]].forEach(([x, z]) => K.cyl(0.07, 0.06, 0.6, 0x55534d, x + 0.2, 0.3, z, F, 6));
  const fh = new THREE.Group(); fh.position.set(0.45, 1.05, 0); F.add(fh);
  const head = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.26, 14, 10), K.lam(0x9a968c)), 60); fh.add(head);
  const snout = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.38, 8), K.lam(0xe4e2dc)); snout.rotation.z = -Math.PI / 2; snout.position.set(0.3, -0.05, 0); fh.add(snout);
  [-1, 1].forEach(s => { const e = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.32, 6), K.lam(0x6a675f)); e.position.set(-0.02, 0.3, s * 0.13); fh.add(e); });
  const tail = new THREE.Group(); tail.position.set(-0.55, 0.45, 0); F.add(tail);
  const tm = K.inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.7, 4, 8), K.lam(0x9a968c)), 40); tm.rotation.z = 1.2; tm.position.set(-0.35, 0.05, 0); tail.add(tm);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), K.lam(0xeeeeea)); tip.position.set(-0.75, 0.2, 0); tail.add(tip);
  const sun = new THREE.Mesh(new THREE.CircleGeometry(1.8, 32), K.flat(0xf8f7f2)); sun.position.set(-10, 9, -50); scene.add(sun);
  const b1 = K.bird(scene, { cx: 4, cy: 10, cz: -18, rx: 9, rz: 2, s: 0.8 });
  cam.position.set(0, 2.4, 8.5); cam.lookAt(0, 1.0, -2);
  return (t, ph) => {
    wheat.forEach(o => { o.g.rotation.z = 0.06 * Math.sin(ph + o.o); });
    scarf.rotation.x = 0.7 + 0.25 * Math.sin(ph * 3); scarf.rotation.z = 0.2 * Math.sin(ph * 2);
    const tilt = K.win(ph, 0.1, 0.55, 0.1), reach = K.win(ph, 0.5, 0.9, 0.1);
    fh.rotation.x = 0.35 * tilt; fh.rotation.z = 0.15 * Math.sin(ph);
    tail.rotation.y = 0.4 * Math.sin(ph * 2); tail.rotation.z = 0.15 * Math.sin(ph * 2 + 1);
    P.pose({ headPitch: -0.3, headTilt: -0.2 * tilt, lean: -0.12 * reach, armR: { fwd: 0.9 * reach, out: -0.1, elbow: 0.2 }, armL: { fwd: 0.15, elbow: 0.3 } });
    b1.update(ph);
  };
}
