// 11/29 「금 따는 콩밭」 장면②(after 2): 콩밭 둑. 머릿수건·앞치마·긴 치마의 아내가 두 손을 모아 말리고, 갓 쓰고 지팡이 짚은 노인이 고개를 젓는다. 구덩이 속 영식(허리까지 잠김)은 삽질을 멈추지 않는다. 흙 튀김·콩잎 흔들림. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 95] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d2c8', line: '#cec9bf', tiles: 6, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2271 });
  const beans = []; for (let r = 0; r < 4; r++) for (let i = 0; i < 14; i++) { const x = -10 + i * 1.5 + (r % 2) * 0.6, z = -7 + r * 1.2; if (x > -1.8 && x < 2.8) continue;
    const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g); K.cyl(0.03, 0.04, 0.6, 0x3a3936, 0, 0.3, 0, g, 5); const leaf = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 6), K.lam(0x6e6c66)), 50); leaf.scale.y = 0.6; leaf.position.y = 0.7; g.add(leaf); beans.push({ g, k: i * 0.7 + r }); }
  // 구덩이: 어두운 원 + 둘레 흙더미, 영식은 낮게(허리까지)
  const pit = new THREE.Mesh(new THREE.CircleGeometry(1.5, 24), K.lam(0x2a2a28)); pit.rotation.x = -Math.PI / 2; pit.position.set(0.6, 0.03, -3.2); scene.add(pit);
  const rim = K.inked(new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.35, 8, 24), K.lam(0x8a8782)), 50); rim.rotation.x = -Math.PI / 2; rim.position.set(0.6, 0.1, -3.2); scene.add(rim);
  const mound = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.2, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x8a8782)), 50); mound.scale.y = 0.7; mound.position.set(3.4, 0, -4.2); scene.add(mound);
  const Y = K.person(scene, { x: 0.6, z: -3.2, rot: Math.PI - 0.3, coat: 0xeeece6, pants: 0xd8d4cc, outfit: 'jeogori', hair: 'topknot', eyes: 'narrow', brows: 'stern', mouth: 'frown', seed: 11298 });
  Y.root.position.y = -1.3;
  const shovel = new THREE.Group(); K.cyl(0.04, 0.04, 1.6, 0x45443f, 0, -0.7, 0, shovel, 6); K.box(0.4, 0.5, 0.05, 0x2a2a28, 0, -1.65, 0, shovel); Y.hold('R', shovel, { at: [0, -0.05, 0], rot: [0.3, 0, 0] });
  const dirt = []; for (let i = 0; i < 5; i++) { const c = new THREE.Mesh(new THREE.SphereGeometry(0.08, 5, 4), K.lam(0x6e6c66)); scene.add(c); dirt.push({ c, k: i / 5 }); }
  // 아내: 앞치마·긴 치마·머릿수건
  const W = K.person(scene, { x: -2.2, z: -1.4, rot: -Math.PI / 2 - 0.4, coat: 0x8a8782, outfit: 'apron', skirt: 'long', skirtC: 0x55534e, hair: 'kerchief', eyes: 'wide', brows: 'worried', mouth: 'open', seed: 11299 });
  // 노인: 두루마기·갓·흰 수염, 지팡이
  const O = K.person(scene, { x: -4.2, z: -2.6, rot: -Math.PI / 2 - 0.3, coat: 0xd8d4cc, outfit: 'durumagi', hair: 'gat', beard: 'beard', eyes: 'narrow', brows: 'thick', mouth: 'frown', seed: 11300, scale: 0.95 });
  const cane = K.cyl(0.035, 0.035, 1.9, 0x2a2a28, 0, -0.9, 0, new THREE.Group(), 6); O.hold('R', cane.parent || cane, { at: [0, -0.05, 0], rot: [0.15, 0, 0] });
  // 둑길 소품: 바구니·수건 걸린 말뚝
  K.cyl(0.4, 0.3, 0.45, 0x55534e, -3.0, 0.23, 0.2, scene, 12); K.cyl(0.06, 0.06, 1.4, 0x3a3936, 5.5, 0.7, -1.5, scene, 6); K.box(0.6, 0.5, 0.03, 0xfbfaf6, 5.5, 1.2, -1.45, scene);
  cam.position.set(-0.8, 3.2, 7.4); cam.lookAt(-0.6, 1.4, -2.4);
  return (t, ph) => {
    const s = Math.sin(ph * 2);
    Y.pose({ bob: -1.2, lean: 0.45 + 0.25 * s, headPitch: 0.2, armR: { fwd: 0.9 + 0.5 * s, elbow: 0.4 }, armL: { fwd: 1.0 + 0.5 * s, elbow: 0.8 } });
    W.pose({ lean: 0.1, headYaw: 0.1, armL: { fwd: 1.1, elbow: 1.5, out: -0.25 }, armR: { fwd: 1.1, elbow: 1.5, out: -0.25 }, bob: 0.03 * s });
    O.pose({ headYaw: 0.35 * Math.sin(ph * 3), armR: { fwd: 0.4, elbow: 0.3 }, armL: { fwd: 0.6, elbow: 1.2 } });
    dirt.forEach(o => { const p = (ph / (Math.PI * 2) * 2 + o.k) % 1; o.c.position.set(1.0 + p * 2.4, 0.4 + 2.2 * p * (1 - p) * 4 * 0.5, -3.4 - p * 0.8); });
    beans.forEach(o => { o.g.rotation.z = 0.08 * Math.sin(ph * 2 + o.k); });
  };
}
