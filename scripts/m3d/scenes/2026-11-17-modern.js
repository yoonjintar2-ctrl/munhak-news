// 11/17 1분 현대문학 「아홉 살 인생」 대표: 산동네 꼭대기. 판잣집들이 비탈에 층층이 서고, 맨 위 집 앞에 선 소년(여민)이 동네를 내려다보며 손가락으로 먼 곳을 가리킨다. 옆의 단짝(기종)이 두 팔을 벌려 허풍을 떤다. 빨랫줄 빨래가 흔들리고 연이 난다
export const secs = 3;
export const opts = { bg: 0xefede8, fog: [0xe9e7e2, 40, 150] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d5cc', line: '#cfccc3', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 87 });
  // 비탈 판잣집(아래로 갈수록 앞·낮게)
  const sh = (x, y, z, w, c) => { K.box(w, 1.6, 1.8, c, x, y + 0.8, z, scene); const r = K.box(w + 0.4, 0.12, 2.2, 0x3a3936, x, y + 1.7, z, scene); r.rotation.x = 0.12; K.box(0.5, 0.9, 0.05, 0x2a2a28, x - w * 0.25, y + 0.45, z + 0.92, scene); };
  // 언덕 덩어리
  const hill = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(6.5, 8, 3.2, 20), K.lam(0xcfccc4)), 40); hill.position.set(-1, 1.6, -9); scene.add(hill);
  sh(-3.0, 3.2, -9.5, 2.4, 0xb8b5ad); sh(0.0, 3.2, -10.5, 2.0, 0x9a9892); sh(2.6, 3.2, -9.2, 2.2, 0xc6c3bb);
  sh(-6.0, 0, -5, 2.6, 0xa8a59d); sh(5.6, 0, -4.6, 2.4, 0xb4b1a9); sh(7.8, 0, -8, 2.0, 0x8e8b84);
  // 계단 길
  for (let i = 0; i < 6; i++) K.box(1.6, 0.2, 0.7, 0x8a8782, -0.2, 0.1 + i * 0.55, -3.6 - i * 0.9, scene);
  // 빨랫줄 + 빨래
  K.cyl(0.05, 0.05, 2.6, 0x2f2e2b, -5.0, 1.3, -2.4, scene, 6); K.cyl(0.05, 0.05, 2.6, 0x2f2e2b, -1.6, 1.3, -2.0, scene, 6); K.line([[-5.0, 2.55, -2.4], [-1.6, 2.55, -2.0]], scene);
  const wash = []; for (let i = 0; i < 4; i++) { const g = new THREE.Group(); g.position.set(-4.6 + i * 0.8, 2.55, -2.35 + i * 0.1); scene.add(g); K.box(0.55, 0.8, 0.04, i % 2 ? 0x55534e : 0xeceae4, 0, -0.42, 0, g); wash.push(g); }
  // 두 아이(앞쪽 마당, 아래 동네를 내려다보는 쪽 = 화면 앞 오른쪽)
  const Y = K.person(scene, { x: 0.6, z: -5.6, rot: Math.PI - 0.5, coat: 0x45443f, pants: 0x8a8782, hair: 'short', scale: 0.7 });
  const G = K.person(scene, { x: 2.2, z: -6.0, rot: Math.PI + 0.6, coat: 0x9a9892, pants: 0x2f2e2b, hair: 'cap', scale: 0.68 });
  // 연 + 연줄
  const kite = K.inked(new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshLambertMaterial({ color: 0x3a3936, side: THREE.DoubleSide })), 1); kite.rotation.z = Math.PI / 4; scene.add(kite);
  const tail = []; for (let i = 0; i < 4; i++) { const b = K.box(0.12, 0.25, 0.02, 0xeeeeea, 0, 0, 0, scene); tail.push(b); }
  const bird = K.bird(scene, { cx: 4, cy: 9, cz: -16, rx: 8, rz: 3, s: 0.8 });
  cam.position.set(2.6, 6.4, 2.6); cam.lookAt(0.6, 4.8, -6.6);
  return (t, ph) => {
    const pt = K.win(ph, 0.15, 0.65, 0.1), brag = K.win(ph, 0.5, 0.95, 0.08);
    Y.pose({ bob: 3.2, headYaw: -0.5 * pt + 0.4 * brag, headPitch: 0.05, armR: { fwd: 1.6 * pt, out: 0.2, elbow: 0.15, point: pt > 0.5 }, armL: { fwd: 0.2, elbow: 0.4 } });
    G.pose({ headYaw: -0.6 + 0.3 * Math.sin(ph * 2), bob: 3.2 + 0.08 * Math.abs(Math.sin(ph * 6)) * brag, armL: { fwd: 0.6 + 0.9 * brag, out: 0.6 * brag, elbow: 0.4 }, armR: { fwd: 0.6 + 0.9 * brag, out: 0.6 * brag, elbow: 0.4 } });
    wash.forEach((g, i) => { g.rotation.x = 0.25 * Math.sin(ph + i); g.rotation.z = 0.06 * Math.sin(ph * 2 + i); });
    const kx = -2.5 + 0.8 * Math.sin(ph), ky = 7.6 + 0.5 * Math.sin(ph * 2);
    kite.position.set(kx, ky, -8); kite.rotation.y = 0.3 * Math.sin(ph * 2);
    tail.forEach((b, i) => b.position.set(kx + 0.1 * Math.sin(ph * 3 + i), ky - 0.7 - i * 0.35, -8));
    bird.update(ph);
  };
}
