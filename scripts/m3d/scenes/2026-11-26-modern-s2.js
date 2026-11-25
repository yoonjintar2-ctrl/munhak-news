// 11/26 『몽실 언니』 장면②(after 3): 마을 우물가, 아기를 업은 몽실(지팡이)이 우물가 아주머니(앞치마·머릿수건)에게 빈 그릇을 두 손으로 내민다. 뒤로 보따리 진 피란민 행렬이 지나간다(+x). 두레박 흔들림·행렬 걸음·아주머니 고개. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d2cfc7', line: '#cbc8c0', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2646, near: true });
  // 우물(돌 둘레) + 두레박 틀
  const well = K.cyl(1.0, 1.1, 0.9, 0x9a978f, 0.2, 0.45, -2.4, scene, 16); K.cyl(0.8, 0.8, 0.92, 0x45443f, 0.2, 0.46, -2.4, scene, 16);
  [-0.9, 1.3].forEach(x => K.box(0.15, 2.4, 0.15, 0x55534e, x, 1.2, -2.4, scene)); K.box(2.4, 0.12, 0.12, 0x55534e, 0.2, 2.4, -2.4, scene);
  const pail = new THREE.Group(); pail.position.set(0.2, 2.4, -2.4); scene.add(pail); K.line([[0, 0, 0], [0, -1.1, 0]], pail); K.cyl(0.22, 0.18, 0.35, 0x6e6c66, 0, -1.25, 0, pail, 10);
  K.cyl(0.35, 0.3, 0.6, 0x45443f, 1.8, 0.3, -1.8, scene, 12); // 물동이
  // 아주머니
  const A = K.person(scene, { x: 1.6, z: -0.8, rot: Math.PI / 2 + 0.6, coat: 0x8a8782, outfit: 'apron', skirt: 'pleat', skirtC: 0x55534e, hair: 'kerchief', eyes: 'smile', brows: 'flat', mouth: 'small', seed: 2647 });
  // 몽실 + 아기 + 그릇
  const M = K.person(scene, { x: -0.8, z: -0.4, rot: -Math.PI / 2 - 0.25, coat: 0xeeece6, outfit: 'jeogori', skirt: 'long', skirtC: 0x45443f, hair: 'bob', eyes: 'oval', brows: 'worried', mouth: 'small', scale: 0.85, seed: 2648 });
  const baby = new THREE.Group(); baby.position.set(0.3, 0.75, 0.55); M.torso.add(baby);
  const wrap = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), K.lam(0x8a8782)), 40); wrap.scale.set(1, 1.2, 0.7); baby.add(wrap);
  const bh = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), K.lam(0xdcd6ce)), 40); bh.position.set(0, 0.6, 0.05); baby.add(bh);
  const bowl = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), K.lam(0xd8d5cd)), 40); M.hold('R', bowl, { at: [0, -0.2, -0.05], rot: [Math.PI, 0, 0] });
  // 피란 행렬(뒤, +x로 걸음)
  const refs = []; for (let i = 0; i < 5; i++) { const P = K.person(scene, { x: -6 + i * 2.2, z: -7.5, rot: -Math.PI / 2, coat: [0x6e6c66, 0x8a8782, 0x55534e, 0x9a978f, 0x45443f][i], hair: ['kerchief', 'cap', 'short', 'bun', 'fedora'][i], scale: 0.75, seed: 2660 + i }); const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), K.lam(0xd8d5cd)), 40); b.position.set(0, 1.6, 0.4); P.torso.add(b); refs.push({ P, x: -6 + i * 2.2, k: i }); }
  cam.position.set(0.2, 2.6, 6.2); cam.lookAt(0.2, 1.4, -1.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), s = Math.sin(ph);
    M.pose({ headPitch: 0.15, lean: -0.1, armR: { fwd: 1.3 + 0.1 * s, elbow: 0.5 }, armL: { fwd: 1.1 + 0.1 * s, elbow: 0.6 } });
    A.pose({ headPitch: -0.15, headTilt: 0.15 * s, armL: { fwd: 0.7 + 0.2 * s, elbow: 0.8 }, armR: { fwd: 0.3, elbow: 1.0 } });
    pail.rotation.z = 0.12 * Math.sin(ph * 2);
    refs.forEach(o => { o.P.root.position.x = o.x + 2.2 * u; o.P.pose({ bob: 0.05 * Math.abs(Math.sin(ph * 4 + o.k)), armL: { fwd: 0.3 * Math.sin(ph * 4 + o.k) }, armR: { fwd: -0.3 * Math.sin(ph * 4 + o.k) } }); });
  };
}
