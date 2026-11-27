// 11/24 「오기 렌」 장면③(after 5): 작은 아파트 식탁, 머리가 센 할머니(왼쪽, rot -2.0)와 오기(오른쪽, rot 2.0)가 마주 앉아 크리스마스 저녁을 먹는다. 촛불 흔들림·창밖 눈·작은 트리 반짝임. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2411 });
  K.box(14, 0.1, 10, 0xc8c5bd, 0, -0.05, -2, scene);
  // 창(바깥 밝음) + 눈
  K.box(2.6, 2.0, 0.05, 0xfbfaf6, 0, 3.0, -5.0, scene); K.box(0.08, 2.0, 0.12, 0x45443f, 0, 3.0, -4.95, scene); K.box(2.6, 0.08, 0.12, 0x45443f, 0, 3.0, -4.95, scene);
  const snow = []; for (let i = 0; i < 24; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), K.flat(0x8a8782)); scene.add(s); snow.push({ s, x: -1.2 + (i * 0.37) % 2.4, k: (i * 0.29) % 1 }); }
  // 식탁 + 그릇 + 병 + 촛불
  K.box(2.8, 0.1, 1.4, 0x6e6c66, 0, 1.4, -2.6, scene); [-1.2, 1.2].forEach(x => K.box(0.1, 1.4, 0.1, 0x55534e, x, 0.7, -2.6, scene));
  K.box(2.8, 0.02, 1.4, 0xeeece6, 0, 1.46, -2.6, scene);
  [-0.8, 0.8].forEach(x => { K.cyl(0.32, 0.28, 0.06, 0xd8d5cd, x, 1.5, -2.5, scene, 18); K.box(0.4, 0.15, 0.25, 0x8a8782, x, 1.58, -2.5, scene); });
  K.cyl(0.1, 0.12, 0.6, 0x3a3936, 0.2, 1.77, -2.9, scene, 10); K.cyl(0.08, 0.06, 0.2, 0xeeece6, -0.3, 1.57, -2.9, scene, 10); K.cyl(0.08, 0.06, 0.2, 0xeeece6, 0.6, 1.57, -2.4, scene, 10);
  K.cyl(0.05, 0.05, 0.4, 0xfbfaf6, -0.1, 1.67, -2.7, scene, 8);
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.18, 8), K.flat(0xffffff)); flame.position.set(-0.1, 1.97, -2.7); scene.add(flame);
  // 작은 트리 + 전구
  K.cyl(0.0, 0.6, 1.6, 0x55534e, 2.6, 1.0, -3.8, scene, 10); K.box(0.3, 0.25, 0.3, 0x45443f, 2.6, 0.12, -3.8, scene);
  const bulbs = []; for (let i = 0; i < 8; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), K.flat(0xffffff)); const a = i * 1.3, h = 0.3 + i * 0.15; b.position.set(2.6 + Math.cos(a) * (0.6 - h * 0.33), h + 0.25, -3.8 + Math.sin(a) * (0.6 - h * 0.33) + 0.05); scene.add(b); bulbs.push(b); }
  // 앉은 두 사람
  const g1 = new THREE.Group(); g1.position.y = -0.8; scene.add(g1);
  const G = K.person(scene, { x: -1.6, z: -2.4, rot: -1.75, coat: 0x8a8782, pants: 0x6e6c66, hair: 'bun', scale: 0.92, scarf: 0xeeece6 }); g1.add(G.root);
  const g2 = new THREE.Group(); g2.position.y = -0.85; scene.add(g2);
  const A = K.person(scene, { x: 1.6, z: -2.4, rot: 1.75, coat: 0x55534e, pants: 0x2f2e2b, hair: 'short', scale: 1.0 }); g2.add(A.root);
  [-1.9, 1.9].forEach(x => { K.box(0.8, 0.1, 0.8, 0x55534e, x, 0.85, -2.4, scene); K.box(0.1, 1.2, 0.8, 0x55534e, x + (x < 0 ? -0.4 : 0.4), 1.4, -2.4, scene); });
  cam.position.set(0.0, 2.6, 3.6); cam.lookAt(0.0, 1.7, -2.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), talk = K.win(ph, 0.1, 0.5, 0.1), laugh = K.win(ph, 0.55, 0.9, 0.1);
    G.pose({ headPitch: -0.05 + 0.08 * Math.sin(ph * 4) * talk, headTilt: 0.15 * laugh, armR: { fwd: 1.1 + 0.3 * talk, elbow: 1.0, out: -0.1 }, armL: { fwd: 1.0, elbow: 1.2 } });
    A.pose({ headPitch: -0.1 + 0.1 * laugh, headYaw: 0.0, armL: { fwd: 1.1 + 0.25 * Math.sin(ph * 2), elbow: 1.5 }, armR: { fwd: 1.0, elbow: 1.2 } });
    const f = 1 + 0.2 * Math.sin(ph * 9) + 0.1 * Math.sin(ph * 15); flame.scale.set(1, f, 1);
    bulbs.forEach((b, i) => b.material.color.setHex(Math.sin(ph * 4 + i * 1.7) > 0 ? 0xffffff : 0x6e6c66));
    snow.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(o.x + 0.1 * Math.sin(ph * 2 + o.k * 9), 3.9 - v * 1.8, -5.1); });
  };
}
