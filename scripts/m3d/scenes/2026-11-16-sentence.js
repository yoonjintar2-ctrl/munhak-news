// 11/16 오늘의 문장 「만세전」: 눈 내리는 한밤 대전역 승강장. 외투 차림 청년(이인화)이 객차 문 앞에서 돌아서 어두운 역 마당을 바라보다 고개를 떨군다. 등불이 흔들리고 증기가 피어오르며 눈이 내린다(기차는 멈춰 있음, 진행 방향 없음)
export const secs = 3;
export const opts = { bg: 0x5c5c59, fog: [0x5a5a57, 26, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#bdbbb5', line: '#b3b1ab', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 24, night: true });
  // 승강장 바닥(눈 덮인 밝은 판) + 가장자리
  K.box(30, 0.5, 5, 0xd8d6d0, 0, 0.25, -1.2, scene); K.box(30, 0.12, 0.3, 0x4a4a47, 0, 0.52, -3.6, scene);
  // 객차(뒤쪽, 왼쪽에서 오른쪽으로 길게) — 창 몇 개, 문
  const car = new THREE.Group(); car.position.set(-2, 0, -5.6); scene.add(car);
  K.box(18, 4.8, 2.6, 0x45453f, 0, 2.9, 0, car); K.box(18.2, 0.4, 2.8, 0x2f2f2c, 0, 5.45, 0, car);
  for (let i = 0; i < 6; i++) { if (i === 3) continue; K.box(1.4, 1.1, 0.08, 0xe9e2c8, -7.5 + i * 2.8, 3.8, 1.32, car); }
  K.box(1.4, 3.6, 0.1, 0x2a2a28, 0.9, 2.3, 1.33, car); // 문
  [-6, -2, 2, 6].forEach(x => K.cyl(0.55, 0.55, 0.3, 0x222222, x, 0.55, 1.2, car, 14).rotation.x = Math.PI / 2);
  // 가로등 + 흔들리는 등
  K.cyl(0.08, 0.1, 4.6, 0x2f2f2c, 4.6, 2.5, -0.4, scene, 8); K.box(1.2, 0.08, 0.08, 0x2f2f2c, 4.1, 4.8, -0.4, scene);
  const lamp = new THREE.Group(); lamp.position.set(3.6, 4.75, -0.4); scene.add(lamp);
  K.cyl(0.02, 0.02, 0.5, 0x222222, 0, -0.25, 0, lamp, 4); const glow = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), K.flat(0xfff6dc)); glow.position.y = -0.6; lamp.add(glow);
  // 벤치, 짐 가방, 빈 역 표지판(글자 없음)
  K.box(2.2, 0.12, 0.6, 0x3f3f3c, -5.5, 1.0, 0.2, scene); [-6.4, -4.6].forEach(x => K.box(0.1, 0.5, 0.5, 0x2f2f2c, x, 0.75, 0.2, scene));
  K.box(0.8, 0.55, 0.35, 0x55524a, 0.2, 0.8, 0.6, scene);
  K.cyl(0.06, 0.06, 2.8, 0x2f2f2c, -8.5, 1.9, -0.6, scene, 6); K.box(2.0, 0.6, 0.08, 0xe2e0da, -8.5, 3.3, -0.6, scene);
  // 청년 — 객차 문 앞, 화면 쪽(역 마당)으로 돌아섬
  const P = K.person(scene, { x: 1.2, z: -0.6, rot: Math.PI - 0.35, coat: 0x2f2f2c, pants: 0x1f1f1d, hair: 'short', scale: 1.0, scarf: 0xeeece6 });
  // 증기 덩이
  const st = []; for (let i = 0; i < 5; i++) { const s = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.6, 12, 8), K.lam(0xd8d8d2, { transparent: true, opacity: 0.7 })), 80); scene.add(s); st.push({ s, k: i / 5 }); }
  const snow = K.motes(scene, { n: 70, box: [26, 10, 14], z0: -8, size: 0.1 });
  const sn = []; for (let i = 0; i < 40; i++) { const f = new THREE.Mesh(new THREE.SphereGeometry(0.05, 5, 4), K.flat(0xffffff)); scene.add(f); sn.push({ f, k: (i * 0.137) % 1, x: -10 + (i * 53 % 200) / 10, z: -3 + (i * 31 % 70) / 10 }); }
  cam.position.set(-0.5, 3.2, 9.5); cam.lookAt(0.4, 2.3, -2);
  return (t, ph) => {
    lamp.rotation.z = 0.12 * Math.sin(ph); lamp.rotation.x = 0.05 * Math.cos(ph);
    st.forEach(o => { const u = (o.k + ph / (Math.PI * 2)) % 1; o.s.position.set(-7 + u * 1.5, 0.6 + u * 3.5, -4.2); o.s.scale.setScalar(0.5 + u * 1.2); o.s.material.opacity = 0.75 * (1 - u); });
    sn.forEach(o => { const u = (o.k + ph / (Math.PI * 2)) % 1; o.f.position.set(o.x + 0.3 * Math.sin(u * 6 + o.k * 9), 7 - u * 7, o.z); });
    snow.update(ph);
    const look = K.win(ph, 0.1, 0.55, 0.1), drop = K.win(ph, 0.55, 0.95, 0.1);
    P.pose({ headYaw: 0.5 * look - 0.1, headPitch: 0.08 * look - 0.55 * drop, torsoYaw: 0.15 * look, lean: 0.08 * drop,
      armL: { fwd: 0.15, elbow: 0.3 }, armR: { fwd: 0.2 + 1.25 * drop, elbow: 0.2 + 1.9 * drop, out: -0.25 * drop } });
  };
}
