// 11/26 『몽실 언니』 장면①(after 1): 시골 기와집 마당, 몽실이 흙마당에 넘어져 다리를 감싸고 앉았고, 툇마루의 어머니(밀양댁, 저고리+치마)가 아기를 안은 채 놀라 손을 뻗는다. 닭 푸드덕·빨랫줄 흔들림. 폭력 장면 없이 넘어진 뒤 모습만. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d2cfc7', line: '#cbc8c0', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 2643, near: false });
  // 집채 + 툇마루 + 지붕
  K.box(9, 3.6, 3, 0xe6e3dc, 0, 1.8, -6, scene); K.box(9, 0.5, 1.4, 0x6e6c66, 0, 0.5, -3.9, scene);
  const rf = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.01, 6.0, 1.8, 4, 1), K.lam(0x45443f)), 30); rf.rotation.y = Math.PI / 4; rf.scale.set(1.3, 1, 0.45); rf.position.set(0, 4.5, -6.0); scene.add(rf);
  [-2, 0, 2].forEach(x => K.box(1.2, 1.6, 0.06, 0xf6f5f1, x, 1.6, -4.48, scene));
  // 빨랫줄 + 옷
  K.cyl(0.06, 0.06, 2.6, 0x45443f, -5.4, 1.3, -2.0, scene, 6); K.cyl(0.06, 0.06, 2.6, 0x45443f, 5.4, 1.3, -2.0, scene, 6); K.line([[-5.4, 2.5, -2.0], [5.4, 2.5, -2.0]], scene);
  const cloths = []; [-3.6, -2.2, 3.0].forEach((x, i) => { const c = new THREE.Group(); c.position.set(x, 2.5, -2.0); scene.add(c); K.box(0.9, 1.0, 0.04, [0xeeece6, 0x9a978f, 0xd8d5cd][i], 0, -0.5, 0, c); cloths.push(c); });
  // 장독·닭
  [[4.5, -3.5], [5.2, -3.8]].forEach(([x, z]) => K.cyl(0.35, 0.45, 0.8, 0x45443f, x, 0.4, z, scene, 12));
  const hen = new THREE.Group(); hen.position.set(2.6, 0, 0.4); scene.add(hen);
  const hb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), K.lam(0xeeece6)), 40); hb.scale.set(1.3, 1, 0.9); hb.position.y = 0.4; hen.add(hb);
  const hh = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), K.lam(0xeeece6)), 40); hh.position.set(0.35, 0.7, 0); hen.add(hh);
  const wingL = K.box(0.4, 0.05, 0.25, 0xd8d5cd, 0, 0.5, 0.3, hen), wingR = K.box(0.4, 0.05, 0.25, 0xd8d5cd, 0, 0.5, -0.3, hen);
  // 어머니(툇마루, 아기 안음)
  const Mo = K.person(scene, { x: -1.4, z: -2.9, rot: Math.PI - 0.3, coat: 0xf2f0ea, outfit: 'jeogori', skirt: 'chima', skirtC: 0x55534e, hair: 'bun', eyes: 'wide', brows: 'worried', mouth: 'open', seed: 2644 });
  Mo.root.position.y = 0;
  const bb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 10), K.lam(0x8a8782)), 40); bb.scale.set(1.3, 0.9, 0.9); Mo.hold('L', bb, { at: [0.1, -0.2, -0.25] });
  // 몽실(넘어져 앉음)
  const M = K.person(scene, { x: 0.6, z: -0.6, rot: Math.PI + 0.5, coat: 0xd8d5cd, outfit: 'jeogori', skirt: 'a', skirtC: 0x45443f, hair: 'bob', eyes: 'closed', brows: 'worried', mouth: 'frown', scale: 0.75, seed: 2645 });
  M.root.position.y = -1.15;
  cam.position.set(0.6, 2.8, 6.4); cam.lookAt(-0.2, 1.3, -2.0);
  return (t, ph) => {
    const s = Math.sin(ph);
    Mo.pose({ lean: -0.2, headPitch: -0.25, armR: { fwd: 1.2 + 0.25 * s, elbow: 0.2, out: 0.1 }, armL: { fwd: 0.9, elbow: 1.5 } });
    M.pose({ lean: -0.35, headPitch: -0.3 + 0.1 * s, armL: { fwd: 0.9, elbow: 0.9 }, armR: { fwd: 0.9 + 0.1 * s, elbow: 0.9 } });
    const f = Math.abs(Math.sin(ph * 4)); wingL.rotation.x = -0.8 * f; wingR.rotation.x = 0.8 * f; hen.position.x = 2.6 + 0.3 * Math.sin(ph); hen.position.y = 0.15 * f;
    cloths.forEach((c, i) => { c.rotation.x = 0.15 * Math.sin(ph * 2 + i); });
  };
}
