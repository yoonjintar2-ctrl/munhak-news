// 11/29 「금 따는 콩밭」 장면①(after 0): 초가집 사립문 앞. 봇짐 멘 수재(두루마기·캡)가 손짓하며 콩밭 쪽을 가리키고, 지게 진 영식(바지저고리·머릿수건 대신 상투)이 귀를 기울인다. 닭 모이 쪼기·빨랫줄 옷 흔들림. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 95] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d2c8', line: '#cec9bf', tiles: 6, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 1136 });
  // 초가집: 흙벽 + 둥근 초가지붕
  K.box(6, 3, 3.4, 0xe9e7e1, -5, 1.5, -5, scene); const roof = K.inked(new THREE.Mesh(new THREE.SphereGeometry(3.6, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x8a8782)), 60); roof.scale.set(1.15, 0.55, 0.8); roof.position.set(-5, 3, -5); scene.add(roof);
  K.box(1.0, 1.8, 0.1, 0x45443f, -4.2, 0.9, -3.28, scene); K.box(0.8, 0.7, 0.1, 0xfbfaf6, -6.3, 1.8, -3.28, scene);
  // 싸리 울타리 + 사립문
  for (let i = 0; i < 18; i++) { const x = -9 + i * 0.45; if (x > -1.2 && x < 0.4) continue; K.box(0.08, 1.4, 0.08, 0x55534e, x, 0.7, -2.4, scene); }
  K.box(8.2, 0.07, 0.07, 0x55534e, -5, 1.1, -2.4, scene);
  const gate = new THREE.Group(); gate.position.set(-1.2, 0, -2.4); scene.add(gate); for (let i = 0; i < 4; i++) K.box(0.07, 1.3, 0.07, 0x45443f, 0.2 + i * 0.4, 0.7, 0, gate); K.box(1.5, 0.07, 0.07, 0x45443f, 0.8, 1.0, 0, gate);
  // 빨랫줄 + 옷
  K.cyl(0.05, 0.05, 2.6, 0x3a3936, 1.5, 1.3, -4.5, scene, 6); K.cyl(0.05, 0.05, 2.6, 0x3a3936, 6.5, 1.3, -4.5, scene, 6); K.line([[1.5, 2.5, -4.5], [4, 2.3, -4.5], [6.5, 2.5, -4.5]], scene);
  const cloth = []; [2.6, 4.0, 5.3].forEach((x, i) => { const c = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.1, 2, 4), new THREE.MeshLambertMaterial({ color: [0xfbfaf6, 0x8a8782, 0xeeece6][i], side: THREE.DoubleSide })); c.position.set(x, 1.8, -4.5); scene.add(c); cloth.push({ c, k: i }); });
  // 장독 + 닭
  [[-8, -3.4, 0.5], [-7.1, -3.6, 0.4]].forEach(([x, z, r]) => { const j = K.inked(new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), K.lam(0x45443f)), 40); j.scale.y = 1.1; j.position.set(x, r, z); scene.add(j); });
  const hens = []; [[2.2, -1.0], [3.0, -0.4]].forEach(([x, z], i) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = i ? 2 : 0.6; scene.add(g); const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), K.lam(i ? 0xfbfaf6 : 0x55534e)), 40); b.scale.set(1, 0.85, 1.3); b.position.y = 0.4; g.add(b);
    const h = new THREE.Group(); h.position.set(0, 0.6, 0.3); g.add(h); const hd = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), K.lam(i ? 0xfbfaf6 : 0x55534e)), 40); h.add(hd); const bk = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 4), K.lam(0x2a2a28)); bk.rotation.x = Math.PI / 2; bk.position.z = 0.16; h.add(bk); [-0.1, 0.1].forEach(sx => K.cyl(0.02, 0.02, 0.25, 0x2a2a28, sx, 0.12, 0, g, 4)); hens.push({ h, k: i }); });
  // 영식: 지게 지고(등에 붙임), 바지저고리
  const Y = K.person(scene, { x: -0.6, z: -0.8, rot: -Math.PI / 2 - 0.5, coat: 0xeeece6, pants: 0xd8d4cc, outfit: 'jeogori', hair: 'topknot', eyes: 'oval', brows: 'flat', mouth: 'small', seed: 11296 });
  const jg = new THREE.Group(); [-0.35, 0.35].forEach(x => K.box(0.08, 2.4, 0.08, 0x45443f, x, 0, 0, jg)); [-0.5, 0.2, 0.8].forEach(y => K.box(0.75, 0.07, 0.07, 0x45443f, 0, y, 0, jg)); jg.position.set(0, 1.9, 0.45); Y.root.add(jg);
  // 수재: 두루마기, 캡, 봇짐
  const S = K.person(scene, { x: 1.2, z: -1.0, rot: Math.PI / 2 + 0.5, coat: 0x55534e, outfit: 'durumagi', hair: 'cap', eyes: 'smile', brows: 'up', mouth: 'open', seed: 11297 });
  const bundle = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.45, 10, 8), K.lam(0x8a8782)), 40); bundle.scale.set(1, 0.8, 0.8); bundle.position.set(0, 2.6, 0.45); S.root.add(bundle);
  cam.position.set(-0.5, 3.0, 7.6); cam.lookAt(-0.2, 1.8, -2.0);
  return (t, ph) => {
    const s = Math.sin(ph * 2);
    S.pose({ headYaw: 0.1 + 0.15 * s, armL: { fwd: 1.4 + 0.3 * s, out: 0.3, elbow: 0.4, point: true }, armR: { fwd: 0.8 - 0.3 * s, elbow: 1.2, out: -0.2 } });
    Y.pose({ headTilt: -0.12, headYaw: -0.15, lean: 0.12, armL: { fwd: 0.6, elbow: 1.2 }, armR: { fwd: 0.6, elbow: 1.2 } });
    hens.forEach(o => { const w = Math.max(0, Math.sin(ph * 4 + o.k * 2)); o.h.position.y = 0.6 - 0.4 * w; o.h.position.z = 0.3 + 0.12 * w; });
    cloth.forEach(o => { o.c.rotation.y = 0.25 * Math.sin(ph * 2 + o.k); });
    gate.rotation.y = 0.08 * Math.sin(ph);
  };
}
