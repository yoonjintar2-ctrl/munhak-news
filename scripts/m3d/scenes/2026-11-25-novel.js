// 11/25 소설 구절 도스토옙스키 『백야』: 환한 여름밤(백야) 페테르부르크 운하. 돌 둑과 쇠 난간에 기댄 아가씨(머리 쪽진·긴 치마)가 물을 내려다보고, 외투 차림 젊은 사내가 몇 걸음 떨어져 멈춰 서서 아가씨 쪽을 본다. 가로등 불빛이 흔들리고 물결이 일며 작은 배가 지나간다(배 진행 +x). 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe4e2dc, fog: [0xe0ded8, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  // 둑길(앞) · 운하 물(뒤) · 건너편 건물들
  K.box(30, 0.6, 6, 0xc8c5bd, 0, -0.3, 1.5, scene);
  const water = new THREE.Mesh(new THREE.PlaneGeometry(60, 14), K.lam(0x8a8782)); water.rotation.x = -Math.PI / 2; water.position.set(0, -0.05, -7); scene.add(water);
   K.box(30, 1.4, 2, 0x9a978f, 0, -0.4, -13, scene);
  for (let i = 0; i < 7; i++) { const h = 6 + (i % 3) * 1.5; const b = K.box(4.2, h, 3, [0xd8d5cd, 0xcac7bf, 0xe2dfd7][i % 3], -13 + i * 4.4, h / 2 - 0.3, -15.5, scene);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) K.box(0.6, 0.9, 0.05, 0x6e6c66, -14.2 + i * 4.4 + c * 1.2, 1.6 + r * 1.8, -13.98, scene); }
  const dome = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.6, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x8a8782)), 40); dome.position.set(4.2, 9.5, -15.5); scene.add(dome); K.cyl(0.08, 0.08, 1.6, 0x55534e, 4.2, 11.6, -15.5, scene, 6);
  // 쇠 난간
  for (let i = 0; i < 16; i++) K.cyl(0.04, 0.04, 1.05, 0x2f2e2b, -9 + i * 1.2, 0.52, -1.3, scene, 6);
  K.box(19, 0.08, 0.08, 0x2f2e2b, -0.0, 1.05, -1.3, scene); K.box(19, 0.05, 0.05, 0x2f2e2b, 0, 0.55, -1.3, scene);
  // 가로등
  K.cyl(0.07, 0.1, 4.2, 0x2f2e2b, 3.6, 2.1, -1.0, scene, 8); const lampG = new THREE.Group(); lampG.position.set(3.6, 4.2, -1.0); scene.add(lampG);
  K.box(0.5, 0.6, 0.5, 0x3a3936, 0, -0.1, 0, lampG); const glow = new THREE.Mesh(new THREE.SphereGeometry(0.75, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, depthWrite: false })); lampG.add(glow);
  // 아가씨(난간에 기대 물을 봄)
  const G = K.person(scene, { x: -0.6, z: -0.6, rot: 0.25, coat: 0x6e6c66, pants: 0x3a3936, hair: 'bun', scale: 0.9, scarf: 0xeeece6 });
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.95, 1.8, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x45443f, side: THREE.DoubleSide })), 40); sk.position.y = 0.95; G.root.add(sk);
  // 젊은 사내(오른쪽에서 멈춰 섬, 아가씨 쪽 -x 을 봄)
  const M = K.person(scene, { x: 2.4, z: 0.4, rot: 1.9, coat: 0x2f2e2b, pants: 0x262626, hair: 'cap', scale: 1.0 });
  // 작은 배
  const boat = new THREE.Group(); scene.add(boat); K.box(2.4, 0.35, 0.9, 0x55534e, 0, 0, 0, boat); K.box(0.4, 0.4, 0.5, 0x6e6c66, -0.6, 0.3, 0, boat);
  const rip = []; for (let i = 0; i < 12; i++) { const l = K.box(1.2, 0.02, 0.04, 0xeeece6, 0, -0.33, 0, scene); rip.push({ l, x: -10 + (i * 1.9) % 20, z: -3.5 - (i * 0.7) % 8, k: i * 0.5 }); }
  cam.position.set(1.4, 4.2, 9.8); cam.lookAt(0.2, 0.9, -3.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), turn = K.win(ph, 0.45, 0.85, 0.12);
    G.pose({ lean: 0.25, headPitch: -0.35 + 0.2 * turn, headYaw: -0.9 * turn, armL: { fwd: 0.9, elbow: 0.8 }, armR: { fwd: 0.9, elbow: 0.8 } });
    M.pose({ headYaw: 0.1, headPitch: -0.05, armR: { fwd: 0.4 * K.win(ph, 0.1, 0.4, 0.1), elbow: 0.6 }, armL: { fwd: 0.1, elbow: 0.3 } });
    glow.material.opacity = 0.2 + 0.08 * Math.sin(ph * 5); lampG.rotation.z = 0.03 * Math.sin(ph * 2);
    boat.position.set(-9 + u * 18, -0.2 + 0.05 * Math.sin(ph * 4), -7);
    rip.forEach(o => { o.l.position.set(o.x + 0.4 * Math.sin(ph + o.k), -0.33, o.z); o.l.scale.x = 0.7 + 0.3 * Math.sin(ph * 2 + o.k); });
  };
}
