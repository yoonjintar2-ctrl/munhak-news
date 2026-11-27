// 11/28 『기억 전달자』 장면①(after 1): 열두 살 기념식 강당. 단상 위 정장 차림의 수석 원로(여성, 펜슬 치마)가 손을 들어 가리키고, 똑같은 옷의 아이들 줄 가운데 조너스가 홀로 한 걸음 나선다. 객석 뒷머리들. 깃발 흔들림·아이들 서로 돌아봄. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  const lift = (P, y) => { const L = new THREE.Group(); L.position.y = y; scene.add(L); L.add(P.root); };
  K.ground(scene, { color: '#d2cec4', line: '#cac6bc', tiles: 4, repeat: 3 });
  K.box(40, 14, 0.4, 0xe9e7e1, 0, 7, -8, scene); K.box(40, 0.5, 0.3, 0x55534e, 0, 0.25, -7.8, scene);
  K.box(14, 0.9, 5, 0x8a8782, 0, 0.45, -5.2, scene); [0, 1, 2].forEach(i => K.box(14, 0.3, 0.5, 0x6e6c66, 0, 0.15 + i * 0.3 - 0.3, -2.5 + i * 0.01, scene));
  K.box(1.2, 1.4, 0.8, 0x3a3936, 3.6, 1.6, -5.6, scene); // 연단
  const flags = []; [-5.6, 5.6].forEach((x, i) => { K.cyl(0.05, 0.05, 5, 0x2a2a28, x, 3.4, -7, scene, 6); const f = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2, 6, 2), new THREE.MeshLambertMaterial({ color: 0x8a8782, side: THREE.DoubleSide })); f.position.set(x + (i ? -0.7 : 0.7), 4.8, -7); scene.add(f); flags.push({ f, b: f.geometry.attributes.position.array.slice(), k: i, sgn: i ? -1 : 1 }); });
  const E = K.person(scene, { x: 3.6, z: -6.3, rot: Math.PI, coat: 0x45443f, outfit: 'suit', skirt: 'pencil', skirtC: 0x3a3936, hair: 'bob', eyes: 'oval', brows: 'flat', mouth: 'smile', glasses: true, seed: 2891 }); lift(E, 0.9);
  const kids = []; [-4.6, -3.1, -1.6, 1.4, 2.9, 4.4].forEach((x, i) => { const p = K.person(scene, { x, z: -4.4 - (i % 2) * 0.6, rot: Math.PI, coat: 0x8a8782, outfit: 'sweater', hair: ['bob', 'short', 'ponytail', 'short', 'curly', 'braid'][i], eyes: ['dot', 'wide', 'oval', 'dot', 'narrow', 'smile'][i], brows: 'up', mouth: ['open', 'small', 'line', 'open', 'small', 'line'][i], seed: 2892 + i, scale: 0.72 }); lift(p, 0.9); kids.push({ p, k: i, x }); });
  const J = K.person(scene, { x: -0.1, z: -3.2, rot: Math.PI - 0.2, coat: 0x2a2a28, outfit: 'sweater', hair: 'short', eyes: 'wide', brows: 'worried', mouth: 'small', seed: 2899, scale: 0.75 }); lift(J, 0.9);
  // 객석 뒷머리
  for (let i = 0; i < 12; i++) { const x = -6 + i * 1.1 + (i % 2) * 0.3, z = 2.2 + (i % 3) * 0.9; const h = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), K.lam(0x2a2a28)), 40); h.scale.setScalar(0.75); h.position.set(x, 1.3, z + 1.2); scene.add(h); K.box(0.9, 0.9, 0.6, [0x6e6c66, 0x55534e, 0x8a8782][i % 3], x, 0.6, z + 1.3, scene); }
  cam.position.set(0, 4.4, 8.0); cam.lookAt(0, 2.6, -3.8);
  return (t, ph) => {
    const s = Math.sin(ph);
    E.pose({ headYaw: -0.6, armR: { fwd: 1.3, out: 0.4, elbow: 0.2, point: true }, armL: { fwd: 0.4, elbow: 1.2 } });
    J.pose({ headPitch: 0.1 * s, lean: 0.05, armL: { fwd: 0.1, elbow: 0.2 }, armR: { fwd: 0.1, elbow: 0.2 } });
    kids.forEach(o => o.p.pose({ headYaw: (o.x < 0 ? -1 : 1) * (0.5 + 0.3 * Math.sin(ph * 2 + o.k)), armL: { fwd: 0.05 }, armR: { fwd: 0.05 } }));
    flags.forEach(o => { const a = o.f.geometry.attributes.position; for (let i = 0; i < a.count; i++) { const x = o.b[i * 3]; a.array[i * 3 + 2] = 0.15 * (x * o.sgn + 0.7) * Math.sin(ph * 2 + x * 2 + o.k); } a.needsUpdate = true; });
  };
}
