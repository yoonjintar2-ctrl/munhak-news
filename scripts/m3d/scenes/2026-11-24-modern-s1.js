// 11/24 「오기 렌」 장면①(after 1): 담배 가게 안, 계산대 위 큰 사진첩. 코트 입은 작가(왼쪽, rot -1.65 오른쪽을 봄)가 한 장을 넘기다 손을 멈추고, 앞치마 두른 오기(계산대 뒤, rot π)가 내려다본다. 천장 선풍기 회전·넘어가는 책장. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2409 });
  K.box(14, 0.1, 10, 0xc8c5bd, 0, -0.05, -2, scene);
  // 뒤 선반(상자·병)
  for (let r = 0; r < 3; r++) { K.box(5, 0.1, 0.6, 0x55534e, 0.5, 1.6 + r * 0.9, -4.6, scene); for (let i = 0; i < 8; i++) K.box(0.4, 0.5, 0.4, [0x8a8782, 0xbcb9b1, 0x6e6c66][(i + r) % 3], -1.4 + i * 0.55, 1.9 + r * 0.9, -4.6, scene); }
  // 계산대 + 사진첩
  K.box(4.2, 1.4, 1.2, 0x6e6c66, 0.4, 0.7, -2.4, scene); K.box(4.4, 0.08, 1.4, 0x45443f, 0.4, 1.44, -2.4, scene);
  const album = new THREE.Group(); album.position.set(-0.2, 1.5, -2.2); scene.add(album);
  K.box(1.0, 0.06, 1.2, 0x262626, -0.5, 0, 0, album); K.box(1.0, 0.06, 1.2, 0x262626, 0.5, 0, 0, album);
  for (let i = 0; i < 4; i++) { K.box(0.4, 0.01, 0.45, 0xeeece6, -0.75 + (i % 2) * 0.45, 0.04, -0.27 + Math.floor(i / 2) * 0.55, album); K.box(0.4, 0.01, 0.45, 0xeeece6, 0.3 + (i % 2) * 0.45, 0.04, -0.27 + Math.floor(i / 2) * 0.55, album); }
  const page = new THREE.Group(); page.position.set(0, 0.05, 0); album.add(page); K.box(0.95, 0.02, 1.15, 0xfbfaf6, 0.48, 0, 0, page);
  // 금전등록기
  K.box(0.8, 0.6, 0.6, 0x3a3936, 1.8, 1.8, -2.6, scene);
  // 천장 선풍기
  const fan = new THREE.Group(); fan.position.set(0.3, 5.2, -2.4); scene.add(fan); K.cyl(0.05, 0.05, 0.8, 0x262626, 0, 0.4, 0, fan, 6);
  for (let i = 0; i < 4; i++) { const b = K.box(1.4, 0.04, 0.25, 0x45443f, 0, 0, 0, fan); b.rotation.y = i * Math.PI / 2; b.position.set(Math.cos(i * Math.PI / 2) * 0.7, 0, -Math.sin(i * Math.PI / 2) * 0.7); }
  const A = K.person(scene, { x: 0.8, z: -3.4, rot: Math.PI - 0.3, coat: 0x55534e, pants: 0x2f2e2b, hair: 'cap', scale: 1.0 });
  K.box(0.9, 1.3, 0.05, 0xeeece6, 0, 2.0, -0.55, A.root);
  const P = K.person(scene, { x: -1.7, z: -2.0, rot: -1.65, coat: 0x3a3936, pants: 0x262626, hair: 'short', scale: 1.0, scarf: 0xd8d5cd });
  cam.position.set(0.5, 3.4, 4.8); cam.lookAt(-0.1, 1.7, -2.4);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), flip = K.win(ph, 0.1, 0.4, 0.1), stop = K.win(ph, 0.45, 0.95, 0.1);
    page.rotation.z = Math.PI * flip;
    P.pose({ lean: -0.25, headPitch: -0.5, armR: { fwd: 1.0 + 0.2 * flip, elbow: 0.6, out: 0.2 }, armL: { fwd: 0.6 + 0.6 * stop, elbow: 1.6 * stop } });
    A.pose({ lean: -0.2, headPitch: -0.45, headYaw: 0.2 * stop, armL: { fwd: 0.6, elbow: 0.5 }, armR: { fwd: 0.6, elbow: 0.5 } });
    fan.rotation.y = ph * 2;
  };
}
