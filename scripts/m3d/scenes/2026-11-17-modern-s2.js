// 11/17 1분 현대문학 「아홉 살 인생」 장면②: 교실. 여민이 상 받은 그림(도형만, 글자 없음)을 두 손으로 들어 보이고, 옆 책상의 짝 우림이 고개를 돌려 바라본다. 뒤의 아이들이 손뼉 친다. 창가 화분 잎과 칠판 앞 분필 가루가 움직인다
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xe8e6e0, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d2cec4', line: '#c6c2b8', tiles: 6, repeat: 3 });
  K.backdrop(scene, { kind: 'room', seed: 62 });
  // 칠판(진한 판, 글자 없음) + 교탁
  K.box(7, 2.6, 0.12, 0x3a3936, 0, 4.0, -6.8, scene); K.box(2.0, 1.6, 1.0, 0x55534e, 3.6, 0.8, -5.2, scene);
  // 책상 넷
  const desk = (x, z) => { K.box(1.6, 0.1, 1.0, 0x6a6964, x, 1.5, z, scene); [[-0.7, -0.4], [0.7, -0.4], [-0.7, 0.4], [0.7, 0.4]].forEach(([a, b]) => K.box(0.08, 1.5, 0.08, 0x3a3936, x + a, 0.75, z + b, scene)); };
  desk(-1.2, -2.0); desk(1.2, -2.0); desk(-1.6, -4.4); desk(1.6, -4.4);
  // 창가 화분
  K.cyl(0.35, 0.28, 0.6, 0x4a4945, -5.0, 2.9, -6.0, scene, 12); K.box(1.6, 0.12, 0.8, 0x55534e, -5.0, 2.55, -6.0, scene);
  const leaves = []; for (let i = 0; i < 5; i++) { const g = new THREE.Group(); g.position.set(-5.0, 3.2, -6.0); g.rotation.y = i * 1.25; scene.add(g); const l = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), K.lam(0x6a6964)), 40); l.scale.set(0.4, 1, 0.2); l.position.set(0.25, 0.3, 0); g.add(l); leaves.push(g); }
  // 그림(밝은 종이 + 해·집·사람 도형)
  const pic = new THREE.Group(); scene.add(pic);
  K.box(1.4, 1.0, 0.04, 0xf6f5f0, 0, 0, 0, pic); const sun = K.cyl(0.14, 0.14, 0.02, 0x2a2a28, 0.4, 0.25, 0.03, pic, 14); sun.rotation.x = Math.PI / 2;
  K.box(0.4, 0.3, 0.02, 0x55534e, -0.3, -0.25, 0.03, pic); const tri = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.22, 3), K.lam(0x2a2a28)), 1); tri.position.set(-0.3, -0.0, 0.03); pic.add(tri);
  // 여민(왼쪽 책상 앞에 서서 그림 듦), 우림(오른쪽 책상, 리본 머리), 뒤 아이 둘
  const Y = K.person(scene, { x: -1.2, z: -1.0, rot: Math.PI - 0.25, coat: 0x45443f, pants: 0x8a8782, hair: 'short', scale: 0.72 });
  const U = K.person(scene, { x: 1.4, z: -1.2, rot: Math.PI + 0.5, coat: 0xd8d5ce, pants: 0x55534e, hair: 'long', scale: 0.7 });
  const B1 = K.person(scene, { x: -1.6, z: -5.4, rot: Math.PI, coat: 0x7a7872, pants: 0x2a2a28, hair: 'cap', scale: 0.68 });
  const B2 = K.person(scene, { x: 1.6, z: -5.4, rot: Math.PI, coat: 0x55534e, pants: 0x9a9892, hair: 'short', scale: 0.68 });
  const dust = K.motes(scene, { n: 14, box: [5, 2.5, 0.6], z0: -6.6, size: 0.07 });
  cam.position.set(0.2, 3.4, 4.8); cam.lookAt(0.0, 2.0, -3.0);
  return (t, ph) => {
    const lift = 0.5 + 0.5 * K.win(ph, 0.1, 0.9, 0.15);
    Y.pose({ headPitch: 0.1, headYaw: -0.3 * K.win(ph, 0.5, 0.9, 0.08), armL: { fwd: 0.8 + 0.4 * lift, out: -0.25, elbow: 0.7 }, armR: { fwd: 0.8 + 0.4 * lift, out: -0.25, elbow: 0.7 } });
    const yp = Y.root.position; pic.position.set(yp.x - 0.05, 1.5 + 0.45 * lift, yp.z + 0.8); pic.rotation.y = -0.25; pic.rotation.z = 0.04 * Math.sin(ph * 2);
    const look = K.win(ph, 0.25, 0.95, 0.12);
    U.pose({ bob: -0.5, headYaw: -0.2 - 0.6 * look, headPitch: 0.15 * look, armL: { fwd: 1.1, elbow: 1.4 }, armR: { fwd: 1.0, elbow: 1.5 } });
    const clap = Math.max(0, Math.sin(ph * 8));
    [B1, B2].forEach((b, i) => b.pose({ headYaw: (i ? 0.3 : -0.3), armL: { fwd: 1.1, out: -0.2 - 0.15 * clap, elbow: 0.9 }, armR: { fwd: 1.1, out: -0.2 - 0.15 * clap, elbow: 0.9 } }));
    leaves.forEach((g, i) => g.rotation.z = 0.12 * Math.sin(ph + i));
    dust.update(ph);
  };
}
