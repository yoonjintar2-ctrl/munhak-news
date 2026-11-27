// 11/16 1분 현대문학 장면① 전단지: 골목 담벼락에 큰딸이 전단지를 붙이고(팔을 뻗어 누름), 큰아들이 지나가는 행인에게 전단지를 내밀고 행인이 고개를 젓는다. 붙인 전단지 끝이 바람에 펄럭인다(글자·사진 없음)
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3ca', line: '#cac7be', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 41 });
  // 담벼락(왼쪽 뒤로 길게) + 기와 얹은 위
  K.box(14, 4.2, 0.5, 0xa9a69e, -2, 2.1, -3.2, scene); K.box(14.4, 0.35, 0.9, 0x55534e, -2, 4.35, -3.2, scene);
  // 이미 붙은 전단지들(흰 종이, 글자 없음, 사진 자리 회색 네모)
  const fl = []; [[-6.5, 1.9], [-5.0, 2.1], [-3.3, 1.8], [-1.2, 2.0]].forEach(([x, y], i) => { const g = new THREE.Group(); g.position.set(x, y + 0.45, -2.92); scene.add(g); const p = K.inked(new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.0), new THREE.MeshLambertMaterial({ color: 0xfafaf6, side: THREE.DoubleSide })), 1); p.position.y = -0.5; g.add(p); const ph = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), K.flat(0x8a8882)); ph.position.set(0, -0.3, 0.01); g.add(ph); fl.push({ g, k: i }); });
  // 전봇대, 자전거(단순), 화분
  K.cyl(0.15, 0.18, 7, 0x4a4945, 4.8, 3.5, -3.6, scene, 8);
  const bike = new THREE.Group(); bike.position.set(-8.4, 0, -2.4); scene.add(bike); [-0.8, 0.8].forEach(x => { const w = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.05, 6, 20), K.lam(0x2f2f2c)); w.position.set(x, 0.45, 0); bike.add(w); }); K.line([[-0.8, 0.45, 0], [0, 0.9, 0], [0.8, 0.45, 0], [0.2, 0.45, 0], [0, 0.9, 0]], bike);
  K.cyl(0.4, 0.3, 0.6, 0x6a6862, 3.6, 0.3, -2.4, scene, 10); K.inked(K.cyl(0.05, 0.05, 0.8, 0x4a4945, 3.6, 0.9, -2.4, scene, 5));
  // 큰딸: 담 앞, 담 쪽(-z)을 보며 전단지를 붙임 — 긴 머리, 목도리
  const D = K.person(scene, { x: 0.6, z: -1.9, rot: 0.2, coat: 0x55534e, pants: 0x2f2f2c, hair: 'long', scale: 0.92, scarf: 0xeeece6 });
  const newF = K.inked(new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.0), new THREE.MeshLambertMaterial({ color: 0xfafaf6, side: THREE.DoubleSide })), 1); newF.position.set(0.5, 2.0, -2.9); scene.add(newF);
  // 큰아들(오른쪽) ↔ 행인: 서로 마주 봄
  const S = K.person(scene, { x: 2.6, z: 0.6, rot: -Math.PI / 2 + 0.35, coat: 0x3a3936, pants: 0x55534e, hair: 'short', scale: 0.98 });
  const sf = K.inked(new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.65), new THREE.MeshLambertMaterial({ color: 0xfafaf6, side: THREE.DoubleSide })), 1); scene.add(sf);
  const P = K.person(scene, { x: 4.6, z: 0.2, rot: Math.PI / 2 + 0.35, coat: 0x8d8a83, pants: 0x3e3d3a, hair: 'cap', scale: 0.95 });
  cam.position.set(0.8, 3.4, 9.6); cam.lookAt(0.6, 1.9, -1.6);
  return (t, ph) => {
    fl.forEach(o => { o.g.rotation.x = 0.12 + 0.12 * Math.sin(ph * 3 + o.k); });
    const press = K.win(ph, 0.1, 0.6, 0.1);
    D.pose({ headPitch: 0.1, headYaw: 0.1 * Math.sin(ph), armR: { fwd: 1.5 + 0.2 * press, elbow: 0.5 - 0.3 * press }, armL: { fwd: 1.3, elbow: 0.8 } });
    newF.position.set(0.85, 2.05, -2.9 + 0.08 * (1 - press));
    const offer = K.win(ph, 0.15, 0.8, 0.1);
    S.pose({ headYaw: 0.1, headPitch: -0.05, lean: -0.08 * offer, armR: { fwd: 0.6 + 0.8 * offer, elbow: 0.4, out: -0.15 }, armL: { fwd: 0.4, elbow: 1.0 } });
    sf.position.set(3.3 + 0.35 * offer, 1.7 + 0.5 * offer, 0.45); sf.rotation.y = -1.0;
    const no = K.win(ph, 0.5, 0.95, 0.08);
    P.pose({ headYaw: 0.35 * no * Math.sin(ph * 10), headPitch: -0.1, armL: { fwd: 0.2, elbow: 0.6 }, armR: { fwd: 0.4 + 0.5 * no, elbow: 1.3 } });
  };
}
