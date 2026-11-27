// 11/22 『싱아』 장면②(after 2): 비탈 동네 현저동의 좁은 셋방. 엄마가 등잔 아래 앉은 채 바느질하고(바늘 손이 오르내림), 책보를 등에 멘 딸이 문지방에서 엄마를 돌아본다. 등잔불이 일렁이고 창밖 빨랫줄 옷이 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2223 });
  K.box(14, 0.1, 10, 0xd4d1c9, 0, -0.05, -2, scene);
  // 창 + 빨랫줄
  K.box(2.6, 1.8, 0.05, 0xfbfaf6, 2.6, 3.0, -6.9, scene); K.box(0.08, 1.8, 0.12, 0x3a3936, 2.6, 3.0, -6.85, scene);
  K.line ? null : null; const clothes = []; for (let i = 0; i < 3; i++) { const c = K.box(0.5, 0.7, 0.03, [0x8a8782, 0xd8d5cd, 0x6e6c66][i], 1.8 + i * 0.75, 3.3, -7.2, scene); clothes.push(c); }
  // 반닫이 + 이불 + 바느질 그릇
  K.box(2.6, 1.6, 1.0, 0x6e6c66, -4.2, 0.8, -5.8, scene); K.box(2.4, 0.6, 0.9, 0xbcb9b1, -4.2, 1.9, -5.8, scene);
  K.cyl(0.4, 0.35, 0.18, 0x8a8782, -0.4, 0.09, -2.0, scene, 14); K.box(0.9, 0.04, 0.7, 0xf6f4ee, -1.4, 0.75, -2.1, scene);
  // 등잔
  K.cyl(0.05, 0.12, 0.9, 0x3a3936, -2.8, 0.45, -2.5, scene, 8); const flame = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), K.flat(0xffffff)); flame.scale.y = 2; flame.position.set(-2.8, 1.05, -2.5); scene.add(flame);
  const glow = new THREE.Mesh(new THREE.CircleGeometry(1.0, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, depthWrite: false })); glow.position.set(-2.8, 1.2, -6.9); scene.add(glow);
  // 엄마(앉음)
  const Mo = K.person(scene, { x: -1.6, z: -2.6, rot: -0.3, coat: 0xd8d5cd, pants: 0x55534e, hair: 'bun', scale: 0.95 });
  const mg = new THREE.Group(); mg.position.y = -1.05; scene.add(mg); mg.add(Mo.root);
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.4, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x6e6c66, side: THREE.DoubleSide })), 40); sk.position.y = 1.65; Mo.root.add(sk);
  // 문 + 딸
  K.box(1.6, 3.2, 0.1, 0xf6f4ee, 2.4, 1.6, -3.6, scene); K.box(0.12, 3.3, 0.2, 0x3a3936, 1.55, 1.6, -3.6, scene); K.box(0.12, 3.3, 0.2, 0x3a3936, 3.25, 1.6, -3.6, scene);
  const Gi = K.person(scene, { x: 2.4, z: -3.2, rot: 1.0 + Math.PI * 0.35, coat: 0x55534e, pants: 0x3a3936, hair: 'bob', scale: 0.7 });
  const bag = K.box(0.8, 0.6, 0.3, 0xbcb9b1, 0, 0, 0, scene); bag.position.set(0, 2.2, 0.35); Gi.root.add(bag);
  cam.position.set(0.3, 2.6, 5.0); cam.lookAt(0.2, 1.3, -2.8);
  return (t, ph) => {
    const sew = Math.sin(ph * 4);
    Mo.pose({ headPitch: 0.45, armR: { fwd: 1.1 + 0.35 * sew, elbow: 1.4, out: -0.1 }, armL: { fwd: 0.9, elbow: 1.3, out: -0.1 } });
    Gi.pose({ headYaw: 0.5 * K.win(ph, 0.2, 0.8, 0.15), headPitch: 0.05, armR: { fwd: 0.6 * K.win(ph, 0.35, 0.7, 0.1), out: 0.2 }, armL: { fwd: 0.3 } });
    flame.scale.set(1 + 0.15 * Math.sin(ph * 7), 2 + 0.4 * Math.sin(ph * 5), 1); glow.material.opacity = 0.26 + 0.08 * Math.sin(ph * 5);
    clothes.forEach((c, i) => { c.rotation.x = 0.25 * Math.sin(ph * 2 + i); });
  };
}
