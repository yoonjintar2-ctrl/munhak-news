// 11/21 1분 현대문학 「별것 아닌 것 같지만, 도움이 되는」 대표: 쇼핑센터 빵집 계산대. 왼쪽 외투 차림 어머니(긴 머리)가 계산대 위 케이크 견본 앨범을 손가락으로 가리키고, 오른쪽 흰 앞치마의 굵은 목 빵집 주인이 무뚝뚝하게 주문서에 적는다. 뒤 선반에 빵 덩이들, 천장 선풍기가 돌고 문에 달린 종이 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 281 });
  K.box(10, 0.2, 7, 0xdedbd3, 0, 0, -3, scene); K.box(10, 5, 0.3, 0xe8e6e0, 0, 2.5, -6.5, scene);
  // 선반 + 빵
  for (let r = 0; r < 3; r++) { K.box(5, 0.1, 0.8, 0x6e6c66, 1.5, 1.6 + r * 1.0, -6.0, scene); for (let i = 0; i < 6; i++) { const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), K.lam([0xa8a59e, 0x8a8782, 0xc8c3b8][(i + r) % 3])), 40); b.scale.set(1.3, 0.7, 0.8); b.position.set(-0.6 + i * 0.8, 1.85 + r * 1.0, -6.0); scene.add(b); } }
  // 계산대(유리 진열장) + 견본 앨범 + 주문서
  K.box(6, 1.6, 1.2, 0x8a8782, 0.6, 0.8, -2.8, scene); K.box(5.6, 0.9, 0.05, 0xf4f2ec, 0.3, 1.0, -2.18, scene);
  for (let i = 0; i < 4; i++) { const c = K.cyl(0.3, 0.3, 0.3, 0xc8c3b8, -1.5 + i * 1.2, 0.85, -2.6, scene, 16); }
  const alb = K.box(1.0, 0.06, 0.8, 0xfbfaf6, -1.9, 1.64, -2.5, scene); K.box(0.6, 0.05, 0.4, 0xfbfaf6, 1.4, 1.63, -2.7, scene);
  // 천장 선풍기 + 문 종
  const fan = new THREE.Group(); fan.position.set(0.5, 4.6, -3.5); scene.add(fan); K.cyl(0.15, 0.15, 0.3, 0x3a3936, 0, 0, 0, fan, 10); for (let i = 0; i < 4; i++) { const bl = K.box(1.4, 0.04, 0.3, 0x55534e, 0.7, -0.1, 0, new THREE.Group()); const g = new THREE.Group(); g.rotation.y = i * Math.PI / 2; g.add(bl.parent || bl); bl.parent && 0; fan.add(g); g.add(bl); }
  K.box(1.6, 3.4, 0.1, 0xb0aca2, -4.2, 1.7, -4.5, scene); const bell = new THREE.Group(); bell.position.set(-3.6, 3.4, -4.4); scene.add(bell); K.cyl(0.01, 0.01, 0.4, 0x2a2a28, 0, -0.2, 0, bell, 4); K.cyl(0.08, 0.16, 0.22, 0x3a3936, 0, -0.5, 0, bell, 10);
  const M = K.person(scene, { x: -3.3, z: -2.2, rot: -1.75, coat: 0x6e6c66, pants: 0x45443f, hair: 'long', scale: 0.92, scarf: 0xf2f0ea });
  const B = K.person(scene, { x: 1.2, z: -3.8, rot: Math.PI - 0.15, coat: 0xd8d5cd, pants: 0x55534e, hair: 'short', scale: 1.08 });
  K.box(1.0, 1.4, 0.05, 0xfbfaf6, 0, 1.0, -0.42, B.torso); // 앞치마
  const pen = K.cyl(0.02, 0.02, 0.3, 0x1c1c1a, 0, 0, 0, scene, 5); B.hold('R', pen, { at: [0, -0.12, 0], rot: [0.4, 0, 0] });
  cam.position.set(0.0, 2.9, 5.0); cam.lookAt(0.0, 2.0, -3.0);
  return (t, ph) => {
    const pt = K.win(ph, 0.1, 0.6, 0.12);
    M.pose({ armR: { fwd: 0.4 + 0.9 * pt, out: -0.2, elbow: 0.3, point: true }, armL: { fwd: 0.2 }, headPitch: 0.15 + 0.15 * pt, headYaw: -0.2 * (1 - pt) });
    B.pose({ headPitch: 0.35, lean: 0.05, armR: { fwd: 0.9, elbow: 1.2 + 0.15 * Math.sin(ph * 8) }, armL: { fwd: 0.8, elbow: 1.3 } });
    fan.rotation.y = ph * 2; bell.rotation.z = 0.2 * Math.sin(ph * 3);
  };
}
