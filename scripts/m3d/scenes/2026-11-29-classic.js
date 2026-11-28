// 11/29 1분 고전 「금 따는 콩밭」 대표: 산골 콩밭 한가운데 깊은 구덩이. 삽에 기댄 영식(흰 바지저고리·상투)이 땀을 닦고, 맞은편 수재(조끼·캡)가 흙덩이를 들어 보이며 가리킨다. 흙더미·뽑힌 콩포기·지게. 콩잎 흔들림·흙 부스러기 떨어짐. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 95] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d2c8', line: '#cec9bf', tiles: 6, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 1935 });
  // 콩밭 이랑 + 콩포기
  const beans = []; for (let r = 0; r < 5; r++) for (let i = 0; i < 12; i++) { const x = -9 + i * 1.6 + (r % 2) * 0.6, z = -6 + r * 1.3; if (Math.abs(x) < 2.6 && z > -4.6 && z < -0.4) continue;
    const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g); K.cyl(0.03, 0.04, 0.6, 0x3a3936, 0, 0.3, 0, g, 5); const leaf = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 6), K.lam(0x6e6c66)), 50); leaf.scale.y = 0.6; leaf.position.y = 0.7; g.add(leaf); beans.push({ g, k: i * 0.7 + r }); }
  // 구덩이(어두운 원) + 흙더미 둘
  const pit = new THREE.Mesh(new THREE.CircleGeometry(1.4, 24), K.lam(0x2a2a28)); pit.rotation.x = -Math.PI / 2; pit.position.set(0, 0.03, -2.4); scene.add(pit);
  [[-2.2, -3.2, 1.0], [2.3, -3.6, 0.8]].forEach(([x, z, r]) => { const m = K.inked(new THREE.Mesh(new THREE.SphereGeometry(r, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x8a8782)), 50); m.scale.y = 0.7; m.position.set(x, 0, z); scene.add(m); });
  // 뽑힌 콩포기
  for (let i = 0; i < 4; i++) { const s = K.cyl(0.03, 0.03, 0.7, 0x3a3936, -2.8 + i * 0.3, 0.12, -1.6, scene, 5); s.rotation.z = Math.PI / 2 - 0.3; }
  // 지게
  const jg = new THREE.Group(); jg.position.set(4.6, 0, -2.0); jg.rotation.z = -0.25; scene.add(jg); [-0.35, 0.35].forEach(x => K.box(0.1, 2.6, 0.1, 0x45443f, x, 1.3, 0, jg)); [0.6, 1.3, 2.0].forEach(y => K.box(0.8, 0.08, 0.08, 0x45443f, 0, y, 0, jg));
  // 영식: 바지저고리(밝은 옷) + 상투, 삽
  const Y = K.person(scene, { x: -1.5, z: -1.6, rot: -Math.PI / 2 - 0.5, coat: 0xeeece6, pants: 0xd8d4cc, outfit: 'jeogori', hair: 'topknot', eyes: 'narrow', brows: 'worried', mouth: 'open', seed: 11294 });
  const shovel = new THREE.Group(); K.cyl(0.04, 0.04, 1.6, 0x45443f, 0, -0.7, 0, shovel, 6); K.box(0.4, 0.5, 0.05, 0x2a2a28, 0, -1.65, 0, shovel); Y.hold('R', shovel, { at: [0, -0.05, 0], rot: [-0.2, 0, 0] });
  // 수재: 조끼·셔츠·캡, 흙덩이
  const S = K.person(scene, { x: 1.5, z: -2.0, rot: Math.PI / 2 + 0.5, coat: 0x45443f, outfit: 'vest', sleeve: 0xd8d4cc, pants: 0x55534e, hair: 'cap', eyes: 'wide', brows: 'up', mouth: 'smile', seed: 11295 });
  const clod = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(0.22), K.lam(0x8a8782)), 30); S.hold('L', clod, { at: [0, -0.25, 0] });
  const crumbs = []; for (let i = 0; i < 4; i++) { const c = new THREE.Mesh(new THREE.SphereGeometry(0.05, 5, 4), K.lam(0x6e6c66)); scene.add(c); crumbs.push({ c, k: i / 4 }); }
  cam.position.set(0, 3.0, 7.2); cam.lookAt(0, 1.6, -2.2);
  const hv = new THREE.Vector3();
  return (t, ph) => {
    const s = Math.sin(ph * 2);
    Y.pose({ lean: 0.1, headYaw: -0.3, headTilt: 0.1, armR: { fwd: 0.35, elbow: 0.3 }, armL: { fwd: 1.3 + 0.1 * s, elbow: 1.9, out: 0.2 } });
    S.pose({ headYaw: 0.2, lean: -0.05, armL: { fwd: 1.6 + 0.2 * s, elbow: 0.5, out: 0.1 }, armR: { fwd: 1.2, elbow: 0.3, out: -0.3, point: true } });
    clod.getWorldPosition(hv);
    crumbs.forEach(o => { const p = (ph / (Math.PI * 2) * 2 + o.k) % 1; o.c.position.set(hv.x + 0.1 * (o.k - 0.5), hv.y - p * hv.y, hv.z + 0.05); });
    beans.forEach(o => { o.g.rotation.z = 0.08 * Math.sin(ph * 2 + o.k); });
  };
}
