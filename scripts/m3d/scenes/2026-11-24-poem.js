// 11/24 오늘의 시 이육사 「교목」: 호숫가 언덕에 키 큰 나무 한 그루가 우뚝 서 있고, 호수에 그 그림자가 거꾸로 비친다(물결에 살짝 일렁임). 가지 끝 거미줄이 흔들리고 새가 난다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 35, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'country', seed: 2402, near: false });
  // 언덕(땅, 나무 뒤) + 호수(앞)
  K.box(40, 0.4, 14, 0xd2cfc7, 0, -0.2, -9.6, scene);
  K.box(40, 0.1, 10, 0xdcd9d1, 0, -0.03, 2.4, scene);
  for (let i = 0; i < 6; i++) K.box(3 + i % 3, 0.02, 0.04, 0xaeaba3, -6 + i * 2.6, 0.04, -1 + i * 1.1, scene);
  // 나무 만들기(줄기·가지·잎 덩이)
  function mkTree(parent) {
    const g = new THREE.Group(); parent.add(g);
    K.cyl(0.22, 0.42, 7.5, 0x3a3936, 0, 3.75, 0, g, 10);
    const tips = [];
    [[2.6, 0.8, 1.3], [3.6, -0.9, 1.2], [4.6, 0.9, 1.0], [5.6, -0.7, 0.9], [6.6, 0.5, 0.8]].forEach(([y, dx, s]) => {
      const b = K.cyl(0.07, 0.12, 1.9, 0x3a3936, dx * 0.6, y + 0.5, 0, g, 6); b.rotation.z = -dx * 0.9;
      const c = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.75 * s, 10, 8), K.lam(0x6e6c66)), 30); c.position.set(dx * 1.3, y + 1.1, 0); g.add(c); tips.push(c);
    });
    const top = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.9, 10, 8), K.lam(0x77756f)), 30); top.position.set(0, 7.8, 0); g.add(top); tips.push(top);
    return { g, tips };
  }
  const T = mkTree(scene); T.g.position.set(-1.5, 0, -3.0);
  const Rf = mkTree(scene); Rf.g.position.set(-1.5, 0.05, -2.6); Rf.g.rotation.x = Math.PI / 2; Rf.g.scale.set(1, 0.75, 0.02); Rf.g.traverse(o => { if (o.material && o.material.color) { o.material = o.material.clone(); o.material.color.setHex(0x8a8782); } });
  // 거미줄(가지 끝)
  const web = new THREE.Group(); web.position.set(-0.2, 4.4, -2.9); scene.add(web);
  for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; K.line([[0, 0, 0], [Math.cos(a) * 0.6, Math.sin(a) * 0.6, 0]], web); }
  [0.25, 0.45].forEach(r => { const pts = []; for (let i = 0; i <= 6; i++) { const a = i * Math.PI / 3; pts.push([Math.cos(a) * r, Math.sin(a) * r, 0]); } K.line(pts, web); });
  // 갈대·바위
  const reeds = []; for (let i = 0; i < 12; i++) { const r = K.box(0.04, 1.0 + (i % 3) * 0.3, 0.04, 0x55534e, 2.5 + i * 0.25, 0.5, -0.6 + (i % 2) * 0.3, scene); reeds.push(r); }
  const rock = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(0.8), K.lam(0x9a978f)), 30); rock.position.set(4.8, 0.35, -1.4); scene.add(rock);
  const B = K.bird(scene, { cx: 2, cy: 9, cz: -10, rx: 8, rz: 3, s: 0.9 });
  cam.position.set(1.5, 3.2, 11.5); cam.lookAt(-0.5, 2.6, -1.0);
  return (t, ph) => {
    T.tips.forEach((c, i) => { c.position.x += 0; c.rotation.z = 0.04 * Math.sin(ph * 2 + i); });
    Rf.g.scale.x = 1 + 0.03 * Math.sin(ph * 3); Rf.g.position.x = -1.5 + 0.06 * Math.sin(ph * 2);
    web.rotation.z = 0.15 * Math.sin(ph * 2); web.rotation.y = 0.3 * Math.sin(ph);
    reeds.forEach((r, i) => { r.rotation.z = 0.2 * Math.sin(ph * 2 + i * 0.5); });
    B.update(ph);
  };
}
