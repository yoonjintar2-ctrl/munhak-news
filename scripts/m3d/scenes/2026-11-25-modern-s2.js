// 11/25 하루키 장면②(after 3): 골목 갈림길에서 소년과 소녀가 등을 돌려 반대쪽으로 걸어가며 한 번씩 뒤돌아 손을 흔든다. 소년 진행 -x(화면 왼쪽 앞, rot +1.3), 소녀 진행 +x(화면 오른쪽 앞, rot -1.3), 둘 다 고개를 돌려 서로를 본다. 전깃줄 흔들림·새·저녁빛. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe4e2dc, fog: [0xe0ded8, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d4d1c9', line: '#cdcac2', tiles: 4, repeat: 5 });
  K.backdrop(scene, { kind: 'town', seed: 2533 });
  // 갈림길: 가운데 건물 모서리 + 양 갈래 길 담장
  K.box(3.4, 3.8, 3.4, 0xd0cdc5, 0, 1.9, -6.2, scene); K.box(3.6, 0.3, 3.6, 0x55534e, 0, 3.9, -6.2, scene);
  K.box(5, 1.1, 0.3, 0xbcb9b1, -5, 0.55, -4.2, scene); K.box(5, 1.1, 0.3, 0xbcb9b1, 5, 0.55, -4.2, scene);
  K.cyl(0.1, 0.12, 6.5, 0x45443f, -2.4, 3.25, -4.6, scene, 8); K.cyl(0.1, 0.12, 6.5, 0x45443f, 2.4, 3.25, -4.6, scene, 8);
  const wire = []; for (let i = 0; i < 3; i++) wire.push(K.line([[-12, 6 - i * 0.3, -4.6], [-2.4, 6.2 - i * 0.3, -4.6], [2.4, 6.2 - i * 0.3, -4.6], [12, 6 - i * 0.3, -4.6]], scene));
  K.box(0.5, 0.5, 0.5, 0x8a8782, 3.2, 0.25, -3.6, scene); K.cyl(0.3, 0.25, 0.5, 0x6e6c66, -3.4, 0.25, -3.6, scene, 10);
  const B = K.person(scene, { x: -1.6, z: -1.0, rot: 1.3, coat: 0x45443f, pants: 0x2f2e2b, hair: 'cap', scale: 0.92 });
  const G = K.person(scene, { x: 1.6, z: -1.0, rot: -1.3, coat: 0xd8d5cd, pants: 0x55534e, hair: 'long', scale: 0.86, scarf: 0x6e6c66 });
  const bird = K.bird(scene, { cx: 0, cy: 7, cz: -8, rx: 8, rz: 2, s: 0.6 });
  cam.position.set(0.0, 2.6, 7.2); cam.lookAt(0.0, 1.6, -1.6);
  return (t, ph) => {
    const st = Math.sin(ph * 4), wv = K.win(ph, 0.3, 0.8, 0.12);
    B.pose({ bob: 0.05 * Math.abs(st), headYaw: 1.2 * wv, torsoYaw: 0.3 * wv, armR: { fwd: 0.3 * st }, armL: { fwd: 2.4 * wv - 0.3 * st * (1 - wv), out: 0.3 * wv, elbow: 0.3 * wv + 0.15 * Math.sin(ph * 10) * wv } });
    G.pose({ bob: 0.05 * Math.abs(Math.cos(ph * 4)), headYaw: -1.2 * wv, torsoYaw: -0.3 * wv, armL: { fwd: 0.3 * st }, armR: { fwd: 2.4 * wv + 0.3 * st * (1 - wv), out: 0.3 * wv, elbow: 0.3 * wv + 0.15 * Math.sin(ph * 10) * wv } });
    B.root.position.x = -1.6 - 0.4 * (1 - Math.cos(ph)) / 2 * 1.5; G.root.position.x = 1.6 + 0.4 * (1 - Math.cos(ph)) / 2 * 1.5;
    wire.forEach((w, i) => { w.position.y = 0.08 * Math.sin(ph * 2 + i); });
    bird.update(ph);
  };
}
