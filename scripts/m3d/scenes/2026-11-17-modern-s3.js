// 11/17 1분 현대문학 「아홉 살 인생」 장면③: 겨울 산동네 비탈길. 보따리를 진 기종이 누나와 함께 아래 길로 걸어 내려가며(진행 방향: 화면 안쪽 -z) 뒤돌아 손을 흔들고, 언덕 위 여민이 두 팔을 흔들어 배웅한다. 눈발이 날리고 전깃줄 위 새가 날아오른다
export const secs = 3;
export const opts = { bg: 0xf0eee9, fog: [0xeae8e3, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#e4e2dc', line: '#dbd9d3', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 47 });
  // 길 양옆 판잣집, 전봇대
  [[-4.6, -4, 0xb4b1a9], [-5.0, -9, 0x9a9892], [4.6, -6, 0xc6c3bb], [5.2, -11, 0xa8a59d]].forEach(([x, z, c]) => { K.box(2.6, 2.0, 2.4, c, x, 1.0, z, scene); const r = K.box(3.0, 0.14, 2.8, 0x3a3936, x, 2.1, z, scene); r.rotation.z = x < 0 ? -0.1 : 0.1; });
  K.cyl(0.1, 0.14, 7, 0x2f2e2b, 3.0, 3.5, -2.5, scene, 8); K.box(1.4, 0.1, 0.1, 0x2f2e2b, 3.0, 6.6, -2.5, scene); K.line([[3.0, 6.6, -2.5], [-8, 5.8, -14]], scene);
  // 쌓인 눈 더미
  [[-2.6, -1.0], [2.4, -3.5]].forEach(([x, z]) => { const m = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.7, 10, 6), K.lam(0xf2f0eb)), 50); m.scale.y = 0.35; m.position.set(x, 0.1, z); scene.add(m); });
  // 여민(앞, 카메라 가까이, 뒷모습 비스듬히) / 기종과 누나(아래 길, 멀어짐)
  const Y = K.person(scene, { x: -0.8, z: -0.6, rot: 0.25, coat: 0x45443f, pants: 0x8a8782, hair: 'short', scale: 0.72, scarf: 0xe8e6e0 });
  const G = K.person(scene, { x: 0.6, z: -6.0, rot: 0, coat: 0x9a9892, pants: 0x2f2e2b, hair: 'cap', scale: 0.66 });
  const pack = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), K.lam(0x6a6964)), 40); pack.position.set(0, 1.0, 0.6); G.torso.add(pack);
  const S = K.person(scene, { x: 1.8, z: -6.4, rot: 0, coat: 0x55534e, pants: 0x2a2a28, hair: 'long', scale: 0.85 });
  K.box(0.6, 0.5, 0.3, 0x2f2e2b, 0, 1.3, 0, S.torso).position.set(0.75, 0.4, -0.2);
  const birds = [K.bird(scene, { cx: -2, cy: 8, cz: -12, rx: 6, rz: 2, s: 0.7 }), K.bird(scene, { cx: 1, cy: 9, cz: -14, rx: 7, rz: 3, s: 0.6 })];
  const N = 50, pos = new Float32Array(N * 3), base = []; for (let i = 0; i < N; i++) base.push([(Math.random() - 0.5) * 18, Math.random() * 9, -12 + Math.random() * 13, Math.random() * 6.28]);
  const snow = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.12 })); scene.add(snow);
  cam.position.set(1.6, 3.6, 4.6); cam.lookAt(0.4, 1.6, -5.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    base.forEach((b, i) => { pos[i * 3] = b[0] + 0.3 * Math.sin(ph + b[3]); pos[i * 3 + 1] = ((b[1] - u * 9) % 9 + 9) % 9; pos[i * 3 + 2] = b[2]; }); snow.geometry.attributes.position.needsUpdate = true;
    const wave = Math.sin(ph * 6);
    Y.pose({ headPitch: -0.1, headYaw: 0.1, armL: { fwd: 2.4, out: 0.3 + 0.25 * wave, elbow: 0.3 }, armR: { fwd: 2.4, out: 0.3 - 0.25 * wave, elbow: 0.3 } });
    const step = 0.6 * (0.5 - 0.5 * Math.cos(ph)), s = 0.12 * Math.sin(ph * 4);
    G.root.position.z = -6.0 - step; S.root.position.z = -6.4 - step;
    const back = K.win(ph, 0.2, 0.8, 0.12);
    G.pose({ bob: Math.abs(s) * 0.4, headYaw: 1.3 * back, torsoYaw: 0.5 * back, armL: { fwd: 2.2 * back + s * 2, out: 0.2, elbow: 0.4 + 0.5 * Math.sin(ph * 8) * back }, armR: { fwd: -s * 2 } });
    S.pose({ bob: Math.abs(s) * 0.4, headYaw: 0.5 * back, armL: { fwd: s * 2 }, armR: { fwd: -s * 2 } });
    birds.forEach((b, i) => b.update(ph, i * 2));
  };
}
