// 11/24 「오기 렌」 장면②(after 3): 가게 앞 길, 책을 품에 안은 소년이 오른쪽(+x)으로 달아나며(rot -1.65, 얼굴 진행 방향) 지갑을 떨어뜨리고, 앞치마 두른 오기가 문에서 뛰쳐나와 손을 뻗는다(rot -2.3). 신문 가판대·소화전·날리는 종이. 진행 방향 +x. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d5cd', line: '#cfccc4', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'city', seed: 2410, near: false });
  // 가게(왼쪽 뒤)
  K.box(5, 4, 0.4, 0xbcb9b1, -3.6, 2, -3.2, scene); K.box(2.2, 1.6, 0.06, 0xeeece6, -4.2, 1.8, -2.98, scene);
  const door = new THREE.Group(); door.position.set(-2.1, 0, -2.98); scene.add(door); K.box(0.9, 2.2, 0.06, 0x55534e, 0.45, 1.1, 0, door);
  K.box(5.2, 0.12, 1.4, 0x45443f, -3.6, 3.3, -2.4, scene);
  // 가판대·소화전·우체통
  K.box(1.4, 1.2, 0.8, 0x6e6c66, 3.6, 0.6, -3.4, scene); for (let i = 0; i < 4; i++) K.box(0.5, 0.02, 0.35, 0xeeece6, 3.2 + (i % 2) * 0.6, 1.22, -3.6 + Math.floor(i / 2) * 0.4, scene);
  K.cyl(0.2, 0.25, 0.8, 0x45443f, 1.6, 0.4, -3.6, scene, 10); K.box(0.6, 1.2, 0.5, 0x3a3936, 5.2, 0.6, -3.8, scene);
  // 소년(책 품음)
  const Bo = K.person(scene, { x: 1.0, z: -1.3, rot: -1.65, coat: 0x6e6c66, pants: 0x3a3936, hair: 'cap', scale: 0.8 });
  const books = K.box(0.5, 0.35, 0.3, 0xeeece6, 0, 0, 0, scene); Bo.hold('R', books, { at: [0, -0.2, 0.15] });
  const wallet = K.box(0.25, 0.05, 0.18, 0x262626, 0, 0, 0, scene);
  // 오기
  const A = K.person(scene, { x: -1.7, z: -1.9, rot: -2.2, coat: 0x55534e, pants: 0x2f2e2b, hair: 'short', scale: 1.0 });
  K.box(0.9, 1.3, 0.05, 0xeeece6, 0, 2.0, -0.55, A.root);
  const papers = []; for (let i = 0; i < 6; i++) { const p = K.box(0.3, 0.02, 0.22, 0xfbfaf6, 0, 0, 0, scene); papers.push({ p, k: i / 6 }); }
  cam.position.set(0.0, 2.3, 6.2); cam.lookAt(0.2, 1.5, -2.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), s = Math.sin(ph * 6), reach = K.win(ph, 0.2, 0.8, 0.12);
    Bo.root.position.x = 0.6 + 0.8 * Math.sin(ph); Bo.pose({ lean: 0.0, bob: 0.06 * Math.abs(s), headYaw: -0.5 * K.win(ph, 0.5, 0.8, 0.1), armR: { fwd: 0.8, elbow: 1.9 }, armL: { fwd: 0.7 * s } });
    const fall = (u * 1.5) % 1; wallet.position.set(0.3 + 0.3 * fall, 1.6 * (1 - fall * fall), -1.0); wallet.rotation.set(ph * 3, ph, 0);
    A.pose({ lean: -0.25 * reach, armR: { fwd: 1.6 * reach, out: 0.2 }, armL: { fwd: 0.6 * reach, elbow: 0.8 }, headPitch: 0.05 });
    door.rotation.y = -0.9 + 0.1 * Math.sin(ph * 2);
    papers.forEach(o => { const v = (o.k + u) % 1; o.p.position.set(-5 + v * 10, 0.1 + 0.4 * Math.abs(Math.sin(ph * 3 + o.k * 9)), -0.4 + o.k); o.p.rotation.set(ph * 2, ph + o.k * 5, 0); });
  };
}
