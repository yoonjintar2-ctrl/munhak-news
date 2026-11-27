// 11/24 「화수분」 장면①(after 0): 겨울밤 행랑방, 등잔불 아래 아범이 무릎에 얼굴을 묻고 울고(앉음), 곁에 앉은 어멈이 어깨에 손을 얹는다. 등잔불 흔들림·문틈 눈발. 밤 실내지만 등잔빛으로 밝게. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xdad8d2, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2405 });
  K.box(14, 0.1, 10, 0xc8c5bd, 0, -0.05, -2, scene);
  // 장판·이불 개킨 것·벽장·문
  K.box(4.6, 0.04, 3.2, 0xd8d5cd, 0, 0.02, -2.6, scene);
  [0, 0.35, 0.7].forEach((y, i) => K.box(1.6, 0.32, 1.0, [0x9a978f, 0x8a8782, 0xbcb9b1][i], -3.2, 0.18 + y, -4.6, scene));
  const door = K.box(1.4, 2.4, 0.06, 0xeeece6, 3.0, 1.25, -4.2, scene); K.box(0.06, 2.4, 0.1, 0x45443f, 3.0, 1.25, -4.15, scene);
  // 등잔(받침대+불꽃)
  K.cyl(0.08, 0.2, 1.2, 0x45443f, -2.0, 0.6, -3.0, scene, 10); K.cyl(0.2, 0.15, 0.12, 0x6e6c66, -2.0, 1.26, -3.0, scene, 12);
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.25, 8), K.flat(0xffffff)); flame.position.set(-2.0, 1.45, -3.0); scene.add(flame);
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, depthWrite: false })); glow.position.copy(flame.position); scene.add(glow);
  // 앉은 아범(무릎 세우고 고개 묻음)
  const g1 = new THREE.Group(); g1.position.y = -0.9; scene.add(g1);
  const M = K.person(scene, { x: -0.7, z: -2.7, rot: 2.6, coat: 0x55534e, pants: 0x3a3936, hair: 'short', scale: 1.0 }); g1.add(M.root);
  [-0.25, 0.25].forEach(x => { const kn = K.cyl(0.2, 0.2, 1.1, 0x3a3936, x, 1.2, 0.55, M.root, 10); kn.rotation.x = -0.9; });
  // 앉은 어멈
  const g2 = new THREE.Group(); g2.position.y = -0.85; scene.add(g2);
  const W = K.person(scene, { x: 0.6, z: -2.4, rot: -2.6, coat: 0x8a8782, pants: 0x6e6c66, hair: 'bun', scale: 0.92, scarf: 0xeeece6 }); g2.add(W.root);
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.2, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0x6e6c66, side: THREE.DoubleSide })), 40); sk.position.y = 1.3; W.root.add(sk);
  const snow = []; for (let i = 0; i < 20; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), K.flat(0x9a978f)); scene.add(s); snow.push({ s, k: (i * 0.29) % 1, x: 2.4 + (i * 0.13) % 0.5 }); }
  cam.position.set(-0.2, 2.3, 4.4); cam.lookAt(-0.4, 1.2, -2.8);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), sob = Math.sin(ph * 6);
    M.pose({ lean: -0.6, headPitch: -0.7, bob: 0.03 * sob, armL: { fwd: 0.9, elbow: 2.3, out: -0.25 }, armR: { fwd: 0.9, elbow: 2.3, out: -0.25 } });
    W.pose({ lean: -0.15, headYaw: 0.1, headPitch: -0.2, armR: { fwd: 1.2 + 0.08 * Math.sin(ph * 2), out: -0.1, elbow: 0.4 }, armL: { fwd: 0.6, elbow: 1.5 } });
    const f = 1 + 0.15 * Math.sin(ph * 9) + 0.08 * Math.sin(ph * 17); flame.scale.set(1, f, 1); glow.material.opacity = 0.14 + 0.06 * Math.sin(ph * 9);
    door.rotation.y = 0.04 * Math.sin(ph);
    snow.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(o.x - v * 1.2, 2.3 - v * 1.6 + 0.2 * Math.sin(ph * 3 + o.k * 9), -4.1); });
  };
}
