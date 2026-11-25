// 11/26 「탈출기」 장면③(after 3): 등잔불 켠 방 안, 노모(머릿수건)와 아내(저고리)가 마주 앉아 맷돌을 돌리고, 박군은 가마솥 아궁이에 장작을 밀어 넣는다. 솥 김·맷돌 회전·불꽃. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xdad8d2, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(30, 0.2, 16, 0xc4bfb4, 0, -0.1, -2, scene);
  K.box(30, 8, 0.4, 0xeae7e0, 0, 4, -5.4, scene);
  K.box(2.0, 1.4, 0.1, 0xf6f5f1, -4.5, 4.4, -5.15, scene); K.box(0.06, 1.4, 0.14, 0x55534e, -4.5, 4.4, -5.1, scene);
  // 두부 틀·콩 자루
  K.box(1.2, 0.4, 0.8, 0x6e6c66, 3.6, 0.2, -1.2, scene); K.box(1.1, 0.06, 0.7, 0xeeece6, 3.6, 0.42, -1.2, scene);
  const sack = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 8), K.lam(0x9a978f)), 40); sack.scale.set(1, 1.3, 1); sack.position.set(-4.0, 0.6, -3.6); scene.add(sack);
  // 가마솥 + 아궁이
  K.box(2.4, 1.2, 1.4, 0x8a8782, 3.0, 0.6, -4.2, scene); const pot = K.cyl(0.9, 0.7, 0.6, 0x2f2e2b, 3.0, 1.45, -4.2, scene, 18); K.cyl(1.0, 1.0, 0.08, 0x45443f, 3.0, 1.78, -4.2, scene, 18);
  const flames = []; for (let i = 0; i < 4; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.4, 6), K.lam(0xbcb9b1)); f.position.set(2.7 + i * 0.2, 0.35, -3.45); scene.add(f); flames.push(f); }
  K.box(0.9, 0.6, 0.1, 0x2a2a28, 3.0, 0.45, -3.48, scene);
  // 맷돌
  const mill = new THREE.Group(); mill.position.set(-1.4, 0, -2.6); scene.add(mill);
  K.cyl(0.8, 0.8, 0.3, 0x9a978f, 0, 0.15, 0, mill, 18); const top = K.cyl(0.75, 0.75, 0.3, 0x8a8782, 0, 0.45, 0, mill, 18); const hd = K.cyl(0.05, 0.05, 0.6, 0x45443f, 0, 0, 0, top, 6); hd.position.set(0.55, 0.3, 0);
  const sitDown = (P) => { P.root.position.y = -0.95; };
  const Mo = K.person(scene, { x: -2.7, z: -2.6, rot: -Math.PI / 2 + 0.2, coat: 0x8a8782, outfit: 'apron', skirt: 'tiered', skirtC: 0x45443f, hair: 'kerchief', eyes: 'closed', brows: 'worried', mouth: 'line', seed: 2630 });
  const Wf = K.person(scene, { x: -0.1, z: -2.6, rot: Math.PI / 2 - 0.2, coat: 0xf2f0ea, outfit: 'jeogori', skirt: 'chima', skirtC: 0x6e6c66, hair: 'braid', eyes: 'narrow', brows: 'flat', mouth: 'small', seed: 2631 });
  [Mo, Wf].forEach(sitDown);
  const B = K.person(scene, { x: 2.2, z: -2.6, rot: Math.PI - 0.6, coat: 0xe6e3dc, pants: 0x55534e, outfit: 'jeogori', hair: 'short', eyes: 'dot', brows: 'stern', mouth: 'line', seed: 2632 });
  B.root.position.y = -0.5;
  const log = K.cyl(0.08, 0.08, 1.0, 0x45443f, 0, 0, 0); B.hold('L', log, { at: [0, -0.15, 0], rot: [Math.PI / 2, 0, 0] });
  // 등잔
  K.cyl(0.1, 0.14, 0.9, 0x45443f, -4.4, 0.45, -1.4, scene, 8); const fl = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 8), K.flat(0x55534e)); fl.position.set(-4.4, 1.0, -1.4); scene.add(fl);
  const steam = []; for (let i = 0; i < 9; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, depthWrite: false })); scene.add(s); steam.push({ s, k: i / 9 }); }
  cam.position.set(0.4, 3.2, 5.8); cam.lookAt(0.2, 1.3, -2.8);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    top.rotation.y = ph;
    Mo.pose({ headPitch: -0.3, armL: { fwd: 0.9 + 0.2 * Math.sin(ph), elbow: 0.8 }, armR: { fwd: 0.5, elbow: 1.2 } });
    Wf.pose({ headPitch: -0.25, armR: { fwd: 0.9 + 0.2 * Math.cos(ph), elbow: 0.8 }, armL: { fwd: 0.5, elbow: 1.2 } });
    B.pose({ lean: -0.35, headPitch: -0.3, armL: { fwd: 0.9 + 0.3 * Math.sin(ph), elbow: 0.4 }, armR: { fwd: 0.6, elbow: 1.0 } });
    flames.forEach((f, i) => { f.scale.y = 1 + 0.4 * Math.sin(ph * 8 + i * 1.5); });
    fl.scale.y = 1 + 0.3 * Math.sin(ph * 9);
    steam.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(3.0 + 0.2 * Math.sin(ph * 2 + o.k * 9), 1.9 + v * 2.0, -4.2); o.s.scale.setScalar(0.6 + v * 1.6); o.s.material.opacity = 0.32 * (1 - v); });
  };
}
