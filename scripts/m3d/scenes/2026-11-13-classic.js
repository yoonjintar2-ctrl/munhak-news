// 1분 고전 — 김유정 「봄·봄」: 초가 마당, 장인이 점순이 정수리에 손바닥을 대고 '아직 덜 컸다'며 고개를 젓고, 지게 진 '나'는 두 팔을 들었다 툭 떨군다
export const secs = 3;
export const opts = { bg: 0xc4c4bf, fog: [0xc0c0bb, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#b9b9b3', line: '#b3b3ad', tiles: 2, repeat: 4 });
  // 초가집
  const h = new THREE.Group(); h.position.set(-1, 0, -8); scene.add(h);
  K.box(9, 3.2, 4, 0xd8d8d0, 0, 1.6, 0, h);
  const roof = new THREE.Mesh(new THREE.SphereGeometry(6.2, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x9a9a92)); roof.scale.set(0.85, 0.42, 0.48); roof.position.set(0, 3.0, 0); h.add(roof);
  K.box(1.4, 2.2, 0.1, 0x55554f, -2, 1.1, 2.02, h); K.box(1.2, 1.0, 0.1, 0x6a6a64, 2.2, 1.9, 2.02, h);
  // 싸리 울타리 + 감자밭 고랑
  for (let i = 0; i < 16; i++) K.box(0.12, 1.2 + (i % 3) * 0.1, 0.12, 0x6e6e68, -12 + i * 0.75, 0.6, -4.5, scene);
  for (let r = 0; r < 4; r++) { const m = K.box(6, 0.3, 0.5, 0x8f8f88, 8, 0.15, -3 + r * 1.2, scene); }
  // 인물: 장인(왼쪽) · 점순이(가운데, 작게) · '나'(오른쪽, 지게)
  const J = K.person(scene, { x: -2.6, z: 1.2, rot: -(Math.PI / 2 + 0.45), coat: 0xdedad2, pants: 0x9a9a94, hair: 'bun', hairC: 0x8a8a8a, scale: 0.78 });
  const P = K.person(scene, { x: -1.15, z: 1.5, rot: Math.PI - 0.15, coat: 0xe8e4dc, pants: 0x55554f, hair: 'long', hairC: 0x1e1e1e, scale: 0.52 });
  const N = K.person(scene, { x: 2.4, z: 1.3, rot: (Math.PI / 2 + 0.55), coat: 0xcfcbc2, pants: 0x4a4a46, hair: 'short', hairC: 0x1e1e1e, scale: 0.9 });
  // 지게: '나' 등에 붙인 A자 틀
  const jg = new THREE.Group(); N.torso.add(jg); jg.position.set(0, 0.6, 0.75);
  [-0.45, 0.45].forEach(sx => { const p = K.cyl(0.07, 0.07, 3.4, 0x6a5a48, sx, 0.2, 0, jg, 6); p.rotation.z = -sx * 0.12; });
  [0.9, 0.1, -0.7].forEach(y => K.box(1.0, 0.08, 0.08, 0x6a5a48, 0, y, 0, jg));
  // 장인의 지게막대기
  const st = K.cyl(0.05, 0.05, 2.6, 0x5a4a3a, -3.6, 1.3, 1.2, scene, 6); st.rotation.z = 0.15;
  cam.position.set(0, 3.0, 9.5); cam.lookAt(0, 1.6, 0);
  return (t, ph) => {
    const meas = K.win(ph, 0.05, 0.5, 0.1);        // 손바닥으로 키 재기
    const no = K.win(ph, 0.45, 0.8, 0.08);         // 고개 젓기
    const up = K.win(ph, 0.55, 0.78, 0.07);        // '나' 두 팔 번쩍
    J.pose({ headPitch: -0.3, headYaw: Math.sin(ph * 6) * 0.35 * no, lean: 0.12,
      armR: { fwd: 0.4 + 1.25 * meas, out: -0.1, elbow: -0.1 - 0.2 * meas }, armL: { fwd: 0.15, out: 0.05, elbow: -0.6 } });
    P.pose({ headPitch: 0.2 + 0.1 * meas, headYaw: 0.4 * Math.sin(ph), armL: { fwd: 0.3, elbow: -1.2 }, armR: { fwd: 0.3, elbow: -1.2 } });
    N.pose({ headPitch: -0.15 * up + 0.1 * (1 - up), lean: -0.05 * up + 0.08 * (1 - up), headTilt: 0.15 * Math.sin(ph),
      armL: { fwd: 0.2 + 2.4 * up, out: 0.3 * up, elbow: -0.3 }, armR: { fwd: 0.2 + 2.4 * up, out: 0.3 * up, elbow: -0.3 }, bob: 0.03 * up });
  };
}
