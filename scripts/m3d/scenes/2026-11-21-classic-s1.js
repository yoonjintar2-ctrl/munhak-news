// 11/21 「허생전」 장면①(after 1): 부잣집 대청 앞마당. 오른쪽 부자 변씨(진한 두루마기, 탕건)가 엽전 꾸러미가 든 궤짝을 두 손으로 내밀고, 왼쪽 해진 흰 옷의 허생(갓)이 한 손을 내밀어 받는다. 뒤 대청 마루에서 식구 둘이 고개를 빼고 수군댄다. 처마 풍경이 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#e4e1d9', line: '#d6d3cb', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 251, near: false });
  // 대청: 마루 + 기둥 + 기와지붕 + 뒷벽 창
  K.box(10, 0.8, 3, 0x8a8782, 0, 0.4, -5.5, scene); K.box(10, 3.6, 0.3, 0xe8e6e0, 0, 2.6, -7, scene);
  [-4.6, -1.5, 1.5, 4.6].forEach(x => K.cyl(0.16, 0.18, 3.8, 0x3a3936, x, 2.7, -4.2, scene, 8));
  const roof = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 7.6, 2.0, 4, 1), K.lam(0x45443f)), 30); roof.rotation.y = Math.PI / 4; roof.scale.set(1.0, 1, 0.5); roof.position.set(0, 5.4, -5.6); scene.add(roof);
  for (let i = 0; i < 3; i++) K.box(1.4, 1.6, 0.06, 0xfbfaf6, -3 + i * 3, 2.8, -6.8, scene);
  const bell = new THREE.Group(); bell.position.set(4.6, 4.5, -3.9); scene.add(bell); K.cyl(0.02, 0.02, 0.5, 0x2a2a28, 0, -0.25, 0, bell, 4); K.cyl(0.12, 0.2, 0.3, 0x3a3936, 0, -0.6, 0, bell, 10);
  // 장독대·화분
  [[-6.5, -2.5], [-5.8, -2.8]].forEach(([x, z]) => K.cyl(0.4, 0.3, 0.8, 0x55534e, x, 0.4, z, scene, 14)); K.cyl(0.35, 0.25, 0.5, 0x77756f, 6, 0.25, -2.4, scene, 12);
  // 허생(왼쪽, 오른쪽을 봄 → rot -π/2 쪽으로)
  const H = K.person(scene, { x: -1.3, z: -1.6, rot: -1.97, coat: 0xeeece6, pants: 0xd4d1c9, hair: 'short', scale: 0.95 });
  const gat = new THREE.Group(); gat.position.y = 0.62; H.headG.add(gat); K.cyl(0.75, 0.75, 0.03, 0x1c1c1a, 0, 0, 0, gat, 24); K.cyl(0.26, 0.3, 0.45, 0x1c1c1a, 0, 0.22, 0, gat, 16);
  const robe = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.9, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0xf2f0ea, side: THREE.DoubleSide })), 40); robe.position.y = 1.0; H.root.add(robe);
  // 변씨(오른쪽, 왼쪽을 봄)
  const B = K.person(scene, { x: 1.4, z: -1.6, rot: 1.97, coat: 0x45443f, pants: 0x3a3936, hair: 'short', scale: 1.0 });
  K.cyl(0.36, 0.42, 0.35, 0x1c1c1a, 0, 0.62, 0, B.headG, 14);
  const robe2 = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.95, 2.0, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x45443f, side: THREE.DoubleSide })), 40); robe2.position.y = 1.0; B.root.add(robe2);
  const chest = new THREE.Group(); K.box(0.9, 0.5, 0.6, 0x6e6c66, 0, 0, 0, chest); for (let i = 0; i < 3; i++) K.cyl(0.08, 0.08, 0.5, 0x2a2a28, -0.25 + i * 0.25, 0.3, 0, chest, 8).rotation.z = Math.PI / 2;
  B.hold('R', chest, { at: [-0.2, -0.3, -0.2] });
  // 대청 위 식구 둘
  const F = [K.person(scene, { x: -3, z: -5.6, rot: 2.8, coat: 0xa8a59e, pants: 0x55534e, hair: 'bun', scale: 0.75 }), K.person(scene, { x: -2.2, z: -5.8, rot: 2.9, coat: 0x6e6c66, pants: 0x45443f, hair: 'short', scale: 0.8 })];
  F.forEach(P => P.root.position.y = 0.8);
  cam.position.set(0.2, 2.8, 6.0); cam.lookAt(0.0, 2.0, -2.5);
  return (t, ph) => {
    const give = K.win(ph, 0.15, 0.75, 0.15);
    B.pose({ lean: -0.15 * give, armR: { fwd: 0.6 + 0.6 * give, elbow: 0.6 - 0.3 * give }, armL: { fwd: 0.5 + 0.5 * give, elbow: 0.7 }, headPitch: 0.1 });
    H.pose({ armL: { fwd: 0.2 + 1.0 * give, out: -0.1, elbow: 0.3 }, armR: { fwd: 0.1 }, headPitch: -0.05, headYaw: 0.1 });
    F[0].pose({ headYaw: 0.6 + 0.3 * Math.sin(ph * 2), headTilt: 0.2, armR: { fwd: 1.2, elbow: 1.8 } }); F[1].pose({ headYaw: -0.4 + 0.2 * Math.sin(ph * 2), lean: -0.2 });
    bell.rotation.z = 0.25 * Math.sin(ph * 2); bell.rotation.x = 0.1 * Math.cos(ph * 2);
  };
}
