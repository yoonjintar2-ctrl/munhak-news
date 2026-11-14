// 11/14 1분 고전 장면① 파장: 봉평 장이 파하는 오후, 허 생원이 전(좌판)을 거두고 조 선달은 짐을 묶는다, 나귀는 매여 있다
export const secs = 3;
export const opts = { bg: 0xb4b3ae, fog: [0xb0afaa, 28, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#a9a8a2', line: '#a4a39d', tiles: 3, repeat: 4 });
  // 좌판 둘 + 차양(천막) — 차양 천이 바람에 들썩
  const awn = [];
  [[-3.2, -1.5], [3.6, -2.5]].forEach(([x, z], i) => {
    K.box(3.6, 0.15, 1.6, 0x7a7974, x, 1.6, z, scene); [[-1.6, -0.7], [1.6, -0.7], [-1.6, 0.7], [1.6, 0.7]].forEach(([a, b]) => K.cyl(0.07, 0.07, 1.6, 0x5a5955, x + a, 0.8, z + b, scene, 6));
    [[-1.7, -0.8], [1.7, -0.8]].forEach(([a, b]) => K.cyl(0.06, 0.06, 3.4, 0x55544f, x + a, 1.7, z + b - 0.2, scene, 6));
    const g = new THREE.Group(); g.position.set(x, 3.4, z - 1.0); scene.add(g);
    const cl = K.inked(new THREE.Mesh(new THREE.PlaneGeometry(3.8, 1.8), new THREE.MeshLambertMaterial({ color: i ? 0xdcdad4 : 0xc9c7c1, side: THREE.DoubleSide })), 1);
    cl.geometry.translate(0, 0, 0.9); cl.rotation.x = -Math.PI / 2 + 0.25; g.add(cl); awn.push(g);
  });
  // 좌판 위 피륙(천 뭉치)
  const rolls = []; for (let i = 0; i < 4; i++) { const r = K.cyl(0.22, 0.22, 1.1, i % 2 ? 0xe6e4de : 0x8d8c86, -4.4 + i * 0.75, 1.9, -1.5, scene, 12); r.rotation.z = Math.PI / 2; rolls.push(r); }
  K.box(1.2, 0.6, 0.8, 0x4f4e4a, 3.0, 1.98, -2.5, scene); K.box(0.8, 0.5, 0.7, 0x6a6964, 4.4, 1.93, -2.5, scene);
  // 나귀(말뚝에 매임)
  const D = new THREE.Group(); D.position.set(-7.6, 0, 0.4); D.rotation.y = 0.5; scene.add(D);
  K.box(2.2, 1.0, 0.9, 0x5e5d58, 0, 1.6, 0, D); [[-0.8, 0.3], [0.8, 0.3], [-0.8, -0.3], [0.8, -0.3]].forEach(([x, z]) => K.cyl(0.1, 0.08, 1.2, 0x55544f, x, 0.6, z, D, 6));
  const dn = new THREE.Group(); dn.position.set(1.1, 1.9, 0); D.add(dn); const nk = K.box(0.9, 0.45, 0.4, 0x5e5d58, 0.35, 0.3, 0, dn); nk.rotation.z = 0.7; K.box(0.75, 0.38, 0.38, 0x6a6964, 0.85, 0.65, 0, dn);
  const tail = new THREE.Group(); tail.position.set(-1.1, 1.8, 0); D.add(tail); K.cyl(0.05, 0.03, 0.8, 0x4a4945, 0, -0.4, 0, tail, 5);
  K.cyl(0.08, 0.1, 1.4, 0x4a4a46, -5.9, 0.7, 1.6, scene, 6); K.line([[-5.9, 1.2, 1.6], [-6.7, 2.0, 1.0]], scene);
  // 허 생원(피륙을 걷어 개는 손), 조 선달(짐 묶기)
  const H = K.person(scene, { x: -3.3, z: 0.3, rot: 0, coat: 0xd0cdc5, pants: 0xb8b5ad, hair: 'short', hairC: 0x777773, scale: 0.92 });
  const J = K.person(scene, { x: 2.4, z: -0.6, rot: -0.5, coat: 0xc2bfb7, pants: 0xa9a69e, hair: 'short', scale: 0.9 });
  // 파장하고 돌아가는 사람 하나(멀리 걸어감)
  const P = K.person(scene, { x: 9, z: -9, rot: Math.PI / 2, coat: 0x8a8984, pants: 0x55544f, scale: 0.85 });
  const sun = new THREE.Mesh(new THREE.CircleGeometry(2.4, 32), K.flat(0xf2f1ec)); sun.position.set(16, 9, -60); scene.add(sun);
  cam.position.set(-1.2, 3.6, 11.5); cam.lookAt(-0.8, 2.0, -2);
  return (t, ph) => {
    awn.forEach((g, i) => g.rotation.x = 0.06 * Math.sin(ph * 2 + i * 1.3));
    const fold = Math.sin(ph * 2);
    H.pose({ headPitch: -0.35, lean: -0.15, armL: { fwd: 1.1 + 0.25 * fold, elbow: 0.9, out: 0.05 }, armR: { fwd: 1.1 - 0.25 * fold, elbow: 0.9, out: 0.05 } });
    rolls[1].position.y = 1.9 + Math.max(0, fold) * 0.25;
    J.pose({ headPitch: -0.4, lean: -0.2, armL: { fwd: 1.0, elbow: 1.2 + 0.3 * Math.sin(ph * 4) }, armR: { fwd: 1.0, elbow: 1.2 - 0.3 * Math.sin(ph * 4) } });
    dn.rotation.z = 0.12 * Math.sin(ph * 2) - 0.1; tail.rotation.x = 0.4 * Math.sin(ph * 3);
    P.root.position.x = 9 - 2 * (ph / (Math.PI * 2)) * 0; P.pose({ armL: { fwd: Math.sin(ph * 4) * 0.4 }, armR: { fwd: -Math.sin(ph * 4) * 0.4 }, bob: Math.abs(Math.sin(ph * 4)) * 0.06 });
  };
}
