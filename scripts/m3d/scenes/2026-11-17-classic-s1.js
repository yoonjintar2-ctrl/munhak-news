// 11/17 1분 고전 「외투」 장면①: 재봉사 페트로비치의 좁은 방. 탁자 위에 낡은 외투를 펼쳐 들어 보이며 고개를 젓는 재봉사(앞치마), 모자를 두 손에 쥔 아카키가 마주 서서 고개를 숙인다. 실패가 굴러가고 창가 등잔이 흔들린다
export const secs = 3;
export const opts = { bg: 0xebe9e3, fog: [0xe5e3dd, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d0ccc2', line: '#c4c0b6', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 44 });
  // 재단 탁자
  K.box(4.4, 0.18, 2.0, 0x5a5853, -0.4, 1.8, -3.4, scene); [[-2.4, -4.2], [1.6, -4.2], [-2.4, -2.6], [1.6, -2.6]].forEach(([x, z]) => K.box(0.14, 1.8, 0.14, 0x3a3936, x, 0.9, z, scene));
  // 펼친 낡은 외투(천)
  const cloth = K.inked(new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.6, 4, 4), new THREE.MeshLambertMaterial({ color: 0x8a8781, side: THREE.DoubleSide })), 1); scene.add(cloth);
  // 가위, 실패, 다리미, 옷본 걸린 줄
  K.box(0.5, 0.05, 0.12, 0x1f1f1d, 0.9, 1.93, -3.0, scene); K.box(0.12, 0.05, 0.4, 0x1f1f1d, 1.1, 1.93, -3.1, scene);
  const spool = K.cyl(0.14, 0.14, 0.3, 0xe8e6e0, 0, 0, 0, scene, 12); spool.rotation.z = Math.PI / 2;
  K.box(0.7, 0.35, 0.35, 0x2a2a28, -1.9, 2.07, -3.8, scene);
  K.line([[-6, 6.4, -6.5], [6, 6.4, -6.5]], scene); const hang = []; for (let i = 0; i < 4; i++) { const g = new THREE.Group(); g.position.set(-4.5 + i * 2.6, 6.4, -6.5); scene.add(g); const m = K.box(1.0, 1.4, 0.05, i % 2 ? 0x6a6964 : 0x9a9892, 0, -0.75, 0, g); hang.push(g); }
  // 등잔(창가 선반)
  K.box(1.6, 0.12, 0.6, 0x45443f, 3.8, 3.4, -6.2, scene); const lampG = new THREE.Group(); lampG.position.set(3.8, 3.46, -6.2); scene.add(lampG); K.cyl(0.18, 0.22, 0.35, 0x3a3936, 0, 0.18, 0, lampG, 10); const flame = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 8), K.flat(0xffffff)), 1); flame.position.y = 0.52; lampG.add(flame);
  // 페트로비치(탁자 뒤, 앞치마) — 아카키를 향함, 아카키(탁자 오른쪽 앞) — 재봉사를 향함
  const P = K.person(scene, { x: -1.2, z: -5.0, rot: Math.PI - 0.6, coat: 0x45443f, pants: 0x2a2a28, hair: 'short', scale: 1.0 });
  K.box(0.9, 1.1, 0.05, 0xd8d5ce, 0, 0.55, -0.64, P.torso);
  const A = K.person(scene, { x: 2.6, z: -2.4, rot: 1.9, coat: 0x7a7872, pants: 0x3e3d3a, hair: 'short', scale: 0.95 });
  const hat = K.cyl(0.32, 0.36, 0.3, 0x1f1f1d, 0, 0, 0, scene, 14);
  cam.position.set(1.6, 4.2, 6.2); cam.lookAt(0.0, 2.4, -3.2);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    const no = K.win(ph, 0.2, 0.7, 0.08);
    P.pose({ headYaw: 0.35 * Math.sin(ph * 6) * no, headPitch: -0.1, lean: 0.15, armL: { fwd: 1.0, out: 0.2, elbow: 0.6 }, armR: { fwd: 1.0, out: 0.2, elbow: 0.6 } });
    cloth.position.set(-0.4, 2.05 + 0.08 * Math.sin(ph), -3.3); cloth.rotation.set(-1.25 + 0.1 * Math.sin(ph * 2), 0, 0.05 * Math.sin(ph * 3));
    const bow = K.win(ph, 0.55, 0.95, 0.1);
    A.pose({ headYaw: 0.2, headPitch: -0.15 - 0.35 * bow, lean: 0.12 * bow, armL: { fwd: 0.7, out: -0.15, elbow: 1.3 }, armR: { fwd: 0.7, out: -0.15, elbow: 1.3 } });
    hat.position.set(2.6 - 0.75, 2.75 - 0.2 * bow, -2.4 - 0.35); hat.rotation.x = Math.PI / 2 - 0.2;
    spool.position.set(-1.6 + 1.6 * (0.5 - 0.5 * Math.cos(ph)), 2.03, -2.7); spool.rotation.x = -ph * 2;
    hang.forEach((g, i) => g.rotation.z = 0.08 * Math.sin(ph + i));
    flame.scale.y = 1 + 0.25 * Math.sin(ph * 9); lampG.rotation.z = 0.02 * Math.sin(ph * 3);
  };
}
