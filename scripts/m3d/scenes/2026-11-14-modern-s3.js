// 11/14 1분 현대문학 장면③ 루시 선생님의 말: 선생님이 두 팔을 펴고 말하고, 줄지어 선 아이들이 놀라 서로를 돌아본다. 창밖엔 비
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3c8', line: '#c6c3b8', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 28 });
  K.box(18, 6, 0.4, 0x6c6b66, 0, 3, -6, scene);
  const win = new THREE.Mesh(new THREE.PlaneGeometry(4, 2.6), K.lam(0xb9b9b4)); win.position.set(-4, 3.4, -5.75); scene.add(win);
  K.box(4.2, 0.12, 0.15, 0x3a3a38, -4, 2.05, -5.7, scene); K.box(4.2, 0.12, 0.15, 0x3a3a38, -4, 4.75, -5.7, scene);
  const rain = []; for (let i = 0; i < 26; i++) { const r = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.4, 0.02), K.flat(0x55554f)); scene.add(r); rain.push({ r, k: (i * 0.37) % 1, x: -5.8 + (i % 13) * 0.3 }); }
  // 선생님(오른쪽 앞, 아이들 쪽을 보며 손을 펼침)
  const T = K.person(scene, { x: 4.2, z: -1.2, rot: -1.1, coat: 0x9a9893, pants: 0x3e3e3b, hair: 'short', hairC: 0x3a3a38, scale: 1.0 });
  // 아이들(왼쪽, 선생님을 향해 두 줄)
  const kids = []; [[-3.2, 0.6], [-1.8, 0.2], [-0.4, 0.8], [-2.6, 2.2], [-1.0, 2.4]].forEach(([x, z], i) => kids.push(K.person(scene, { x, z, rot: 1.0 + (i % 2) * 0.15, coat: [0xd5d2ca, 0x8c8a84, 0xbab7af, 0xc9c7c1, 0x77756f][i], pants: 0x55554f, hair: ['long', 'short', 'short', 'long', 'short'][i], scale: 0.74 })));
  cam.position.set(0.5, 4.2, 10.5); cam.lookAt(0.3, 2.0, -1);
  return (t, ph) => {
    rain.forEach(o => { const u = (o.k + ph / (Math.PI * 2) * 2) % 1; o.r.position.set(o.x, 4.6 - u * 2.4, -5.7); });
    const say = Math.sin(ph * 3);
    T.pose({ headPitch: -0.05, armL: { fwd: 0.7 + 0.15 * say, out: 0.5, elbow: 0.6 }, armR: { fwd: 0.7 - 0.15 * say, out: 0.5, elbow: 0.6 }, lean: 0.03 * say });
    const turn = K.win(ph, 0.35, 0.85, 0.1);
    kids.forEach((k, i) => k.pose({ headYaw: (i % 2 ? 1 : -1) * 0.9 * turn, headPitch: -0.1 * turn, torsoYaw: (i % 2 ? 1 : -1) * 0.25 * turn, armL: { fwd: 0.15 }, armR: { fwd: i === 2 ? 0.9 * turn : 0.1, elbow: i === 2 ? 1.4 * turn : 0 } }));
  };
}
