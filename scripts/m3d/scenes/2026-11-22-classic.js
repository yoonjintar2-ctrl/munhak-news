// 11/22 1분 고전 「발가락이 닮았다」 대표: 1930년대 작은 진찰실. 흰 가운의 '나'가 책상 앞에 앉아 있고, 맞은편 양복 차림의 M이 모자를 두 손에 쥔 채 머뭇거리며 서 있다. 창밖에 비가 내리고 천장 전등갓이 흔들리며 시계추가 움직인다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2211 });
  K.box(16, 0.1, 12, 0xd8d5cd, 0, -0.05, -2, scene);
  // 약장(유리병) + 진찰대
  K.box(2.4, 3.6, 0.8, 0x8a8782, -4.4, 1.8, -6.2, scene); for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) K.cyl(0.14, 0.14, 0.4, [0xf6f4ee, 0xbcb9b1][(r + c) % 2], -5.2 + c * 0.55, 1.2 + r * 1.0, -5.75, scene, 10);
  K.box(3.0, 0.8, 1.2, 0xbcb9b1, 4.5, 0.6, -5.5, scene); K.box(3.0, 0.15, 1.2, 0xf6f4ee, 4.5, 1.05, -5.5, scene);
  // 창 + 빗줄기
  K.box(2.4, 2.4, 0.05, 0x9a978f, 1.2, 3.4, -6.9, scene); K.box(2.5, 0.1, 0.15, 0x3a3936, 1.2, 3.4, -6.85, scene); K.box(0.1, 2.5, 0.15, 0x3a3936, 1.2, 3.4, -6.85, scene);
  const rain = []; for (let i = 0; i < 26; i++) { const r = K.box(0.02, 0.4, 0.02, 0xf6f4ee, 0, 0, 0, scene); rain.push({ r, x: 0.1 + (i * 0.43) % 2.2, k: (i * 0.29) % 1 }); }
  // 시계
  K.box(0.8, 2.2, 0.4, 0x55534e, -1.8, 1.1, -6.6, scene); const pend = new THREE.Group(); pend.position.set(-1.8, 1.5, -6.35); scene.add(pend); K.box(0.03, 0.7, 0.03, 0xd8d5cd, 0, -0.35, 0, pend); K.cyl(0.12, 0.12, 0.04, 0xd8d5cd, 0, -0.72, 0, pend, 12).rotation.x = Math.PI / 2;
  // 책상 + 의사(왼쪽, 오른쪽을 봄)
  K.box(2.6, 0.15, 1.3, 0x6e6c66, -1.2, 1.4, -2.2, scene); [[-2.4, -2.7], [0, -2.7], [-2.4, -1.7], [0, -1.7]].forEach(([x, z]) => K.box(0.12, 1.4, 0.12, 0x45443f, x, 0.7, z, scene));
  K.box(0.7, 0.05, 0.5, 0xfbfaf6, -0.8, 1.5, -2.2, scene);
  const Dr = K.person(scene, { x: -2.4, z: -2.0, rot: -1.6, coat: 0xf2f0ea, pants: 0x55534e, hair: 'short', scale: 0.95 }); Dr.root.position.y = -0.4;
  K.box(0.8, 0.9, 0.8, 0x3a3936, -2.6, 0.45, -2.0, scene);
  // M(오른쪽, 왼쪽을 봄) + 모자
  const M = K.person(scene, { x: 1.4, z: -1.6, rot: 1.75, coat: 0x45443f, pants: 0x2f2e2b, hair: 'short', scale: 0.98 });
  const hat = new THREE.Group(); K.cyl(0.42, 0.42, 0.05, 0x2a2a28, 0, 0, 0, hat, 16); K.cyl(0.26, 0.28, 0.3, 0x2a2a28, 0, 0.15, 0, hat, 14); M.hold('R', hat, { at: [0, -0.15, -0.2], rot: [Math.PI / 2, 0, 0] });
  // 전등갓
  const lamp = new THREE.Group(); lamp.position.set(-0.2, 6.0, -2.0); scene.add(lamp); K.cyl(0.02, 0.02, 1.6, 0x2a2a28, 0, -0.8, 0, lamp, 4); K.cyl(0.2, 0.6, 0.4, 0x55534e, 0, -1.7, 0, lamp, 16); const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), K.flat(0xffffff)); bulb.position.y = -1.9; lamp.add(bulb);
  cam.position.set(0.0, 3.0, 6.0); cam.lookAt(-0.2, 1.9, -2.5);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), h = K.win(ph, 0.25, 0.75, 0.15);
    Dr.pose({ headYaw: 0.1, headPitch: 0.05 - 0.1 * h, armL: { fwd: 1.0, elbow: 1.2 }, armR: { fwd: 0.9 + 0.3 * h, elbow: 1.0 } });
    M.pose({ headPitch: 0.3 - 0.25 * h, headYaw: -0.1 * Math.sin(ph * 2), lean: 0.05, armR: { fwd: 0.9, elbow: 1.3 + 0.2 * Math.sin(ph * 4) }, armL: { fwd: 0.8, elbow: 1.4 } });
    rain.forEach(o => { const v = (o.k + u * 2) % 1; o.r.position.set(o.x, 4.5 - v * 2.3, -6.85); });
    pend.rotation.z = 0.35 * Math.sin(ph * 2); lamp.rotation.z = 0.06 * Math.sin(ph * 2); lamp.rotation.x = 0.04 * Math.cos(ph * 2);
  };
}
