// 11/14 오늘의 문장 — 현진건 「운수 좋은 날」: 비 오는 밤 셋방, 설렁탕 그릇 앞에 무릎 꿇은 사내가 누운 아내를 흔들다 고개를 떨군다
export const secs = 3;
export const opts = { bg: 0x8e8e8a, fog: [0x8e8e8a, 30, 80] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#a6a39b', line: '#9f9c94', tiles: 2, repeat: 3 });
  // 방: 뒷벽 + 왼벽 + 창(밖에 비)
  K.box(16, 7, 0.3, 0xb4b1aa, 0, 3.5, -4, scene); K.box(0.3, 7, 10, 0xa8a59e, -6.5, 3.5, 1, scene);
  K.box(3.2, 2.4, 0.1, 0x3c3c3a, 3.2, 3.9, -3.82, scene);
  K.box(3.4, 0.12, 0.2, 0x5a5a56, 3.2, 5.1, -3.75, scene); K.box(3.4, 0.12, 0.2, 0x5a5a56, 3.2, 2.7, -3.75, scene); K.box(0.1, 2.4, 0.2, 0x5a5a56, 3.2, 3.9, -3.75, scene);
  const rain = []; for (let i = 0; i < 14; i++) { const r = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.45, 0.02), K.flat(0xcfcfca)); r.position.set(1.8 + (i * 0.21) % 2.9, 4, -3.86); scene.add(r); rain.push({ r, o: (i * 0.37) % 1 }); }
  // 요 위에 누운 아내(이불 + 머리)
  K.box(2.2, 0.2, 4.4, 0xd9d6ce, -2.6, 0.1, 0.2, scene);
  const quilt = K.box(2.0, 0.6, 3.0, 0x8a877f, -2.6, 0.45, -0.6, scene);
  const head = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.38, 18, 14), K.lam(0xb8b4ae)), 60); head.position.set(-2.6, 0.5, 1.6); scene.add(head);
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.41, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), K.lam(0x1e1e1e)); hair.rotation.x = Math.PI / 2; hair.position.set(-2.6, 0.5, 1.65); scene.add(hair);
  K.box(0.9, 0.25, 0.6, 0xeeeeea, -2.6, 0.32, 1.8, scene);
  // 설렁탕 그릇 + 김
  const bowl = K.cyl(0.45, 0.3, 0.38, 0xe4e2dc, -0.4, 0.2, 2.4, scene, 20);
  const steam = []; for (let i = 0; i < 3; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), new THREE.MeshBasicMaterial({ color: 0xf2f2ee, transparent: true, opacity: 0.5 })); scene.add(s); steam.push({ s, o: i / 3 }); }
  // 매달린 등(흔들림)
  const lampG = new THREE.Group(); lampG.position.set(-0.8, 7, 0); scene.add(lampG);
  K.line([[0, 0, 0], [0, -2.6, 0]], lampG);
  const shade = K.cyl(0.15, 0.55, 0.45, 0x3a3a38, 0, -2.7, 0, lampG, 16);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), K.flat(0xffffff)); bulb.position.y = -2.95; lampG.add(bulb);
  // 무릎 꿇은 사내(다리를 바닥 아래로 내려 무릎 꿇은 높이)
  const P = K.person(scene, { x: -1.0, z: 1.0, rot: Math.PI / 2 + 0.2, coat: 0x6e6c66, pants: 0x3a3a38, hair: 'short' });
  cam.position.set(3.2, 4.4, 9.0); cam.lookAt(-1.6, 0.9, -0.2);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    rain.forEach(o => { const v = (u * 3 + o.o) % 1; o.r.position.y = 5 - v * 2.2; });
    steam.forEach(o => { const v = (u + o.o) % 1; o.s.position.set(-0.4 + Math.sin(v * 6 + o.o * 5) * 0.12, 0.5 + v * 1.4, 2.4); o.s.scale.setScalar(0.6 + v * 1.4); o.s.material.opacity = 0.45 * (1 - v); });
    lampG.rotation.z = Math.sin(ph) * 0.08; lampG.rotation.x = Math.cos(ph) * 0.04;
    const shake = K.win(ph, 0.05, 0.5, 0.08), drop = K.win(ph, 0.5, 0.95, 0.1);
    P.root.position.y = -0.95;
    P.pose({ lean: -0.35 - 0.25 * drop + 0.04 * Math.sin(ph * 12) * shake, headPitch: -0.25 - 0.45 * drop, headYaw: 0.05 * Math.sin(ph * 8) * shake,
      armR: { fwd: 1.0 * shake + 0.35 * drop, out: -0.1, elbow: 0.4 + 0.1 * Math.sin(ph * 12) * shake },
      armL: { fwd: 0.9 * shake + 1.0 * drop, out: -0.2 * drop, elbow: 0.5 + 1.4 * drop } });
    P.root.position.y = -0.95;
  };
}
