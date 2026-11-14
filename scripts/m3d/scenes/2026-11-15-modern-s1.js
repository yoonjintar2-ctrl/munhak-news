// 11/15 1분 현대문학 장면① 전학 첫날: 미루나무 선 시골 학교 운동장 앞, 가방을 멘 전학생이 낯선 교사(校舍)를 두리번거린다. 멀리 아이들이 뛰놀고 깃발(무늬 없음)이 펄럭인다(탈것 없음)
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d4c8', line: '#cbc7bb', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 91 });
  // 단층 교사(길고 낮은 건물) + 창 + 지붕
  const tex = K.windowsTex(8, 1, 5, '#b8b4aa');
  const S = new THREE.Mesh(new THREE.BoxGeometry(18, 3.4, 3), K.lam(0xffffff, { map: tex })); S.position.set(1, 1.7, -11); scene.add(K.inked(S));
  const rf = K.box(19, 0.4, 4, 0x4f4e4a, 1, 3.6, -11, scene); rf.rotation.x = 0.1;
  // 교문 기둥 둘(글자 없음)
  [-3.6, 3.6].forEach(x => K.box(0.7, 2.6, 0.7, 0x8a8781, x, 1.3, -3, scene));
  // 미루나무 줄(흔들림)
  const trees = []; [-9, -6.5, 7, 9.5].forEach((x, i) => { const g = new THREE.Group(); g.position.set(x, 0, -6 - (i % 2) * 2); scene.add(g); K.cyl(0.15, 0.2, 2.2, 0x4a4945, 0, 1.1, 0, g, 6); const c = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.9, 5, 8), K.lam(0x77766f)), 40); c.position.y = 4.4; g.add(c); trees.push(g); });
  // 깃대 + 깃발(무늬 없음, 펄럭)
  K.cyl(0.07, 0.07, 6.5, 0x3a3a38, -2.0, 3.25, -8, scene, 6);
  const flag = new THREE.Group(); flag.position.set(-2.0, 6.0, -8); scene.add(flag); const fl = K.box(1.6, 1.0, 0.04, 0xe2e0d9, 0.8, 0, 0, flag);
  // 철봉
  [[4.5], [6.5]].forEach(([x]) => K.cyl(0.07, 0.07, 2.2, 0x3a3a38, x, 1.1, -6.5, scene, 6)); K.cyl(0.05, 0.05, 2.0, 0x3a3a38, 5.5, 2.15, -6.5, scene, 6).rotation.z = Math.PI / 2;
  // 멀리 뛰노는 아이 둘(제자리 뜀)
  const far = [K.person(scene, { x: 4.6, z: -8.2, rot: 0.8, coat: 0x8f8d87, scale: 0.6 }), K.person(scene, { x: 6.2, z: -8.6, rot: -0.8, coat: 0x55544f, scale: 0.6 })];
  // 전학생(앞, 학교를 바라봄: rot 0 → 화면 안쪽) — 책가방
  const B = K.person(scene, { x: 0.4, z: 2.0, rot: 0.15, coat: 0x3e3e3b, pants: 0x2f2f2d, hair: 'short', scale: 0.78, backpack: true });
  const Bd = K.bird(scene, { cx: 0, cy: 8, cz: -12, rx: 8, rz: 3, s: 0.7 });
  cam.position.set(-1.2, 2.6, 8.5); cam.lookAt(0.2, 2.0, -4);
  return (t, ph) => {
    trees.forEach((g, i) => g.rotation.z = 0.05 * Math.sin(ph * 2 + i));
    flag.rotation.y = 0.25 * Math.sin(ph * 4); fl.rotation.y = 0.15 * Math.sin(ph * 4 + 1);
    far.forEach((P, i) => P.pose({ bob: Math.abs(Math.sin(ph * 4 + i)) * 0.25, armL: { fwd: 2.2 * Math.abs(Math.sin(ph * 2 + i)) }, armR: { fwd: 0.4 }, headPitch: 0.2 }));
    B.pose({ headYaw: 0.9 * Math.sin(ph), headPitch: 0.12 + 0.05 * Math.sin(ph * 2), torsoYaw: 0.2 * Math.sin(ph), armL: { fwd: 0.3, out: 0.15, elbow: 0.9 }, armR: { fwd: 0.3, out: 0.15, elbow: 0.9 } });
    Bd.update(ph);
  };
}
