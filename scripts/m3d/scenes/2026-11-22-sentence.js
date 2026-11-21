// 11/22 오늘의 문장 「장마」: 장대비 내리는 시골집 툇마루. 흰 한복의 두 할머니가 서로 등을 돌리고 섰고, 그 사이 소년이 한쪽 할머니를 돌아본다. 처마에서 빗물이 줄줄 떨어지고 마당 물웅덩이에 파문, 장독 셋. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xd8d6d0, 25, 80] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d4d1c9', line: '#c8c5bd', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2201, near: false });
  // 집: 마루 + 벽 + 기둥 + 처마
  K.box(11, 0.7, 3.2, 0x8a8782, 0, 0.35, -4.2, scene); K.box(11, 3.8, 0.3, 0xe8e6e0, 0, 2.6, -5.8, scene);
  [-1.6, 1.6].forEach(x => K.box(2.2, 2.2, 0.06, 0xf6f4ee, x, 2.4, -5.6, scene));
  [-5, -1.7, 1.7, 5].forEach(x => K.cyl(0.15, 0.17, 3.6, 0x3a3936, x, 2.5, -2.8, scene, 8));
  K.box(12.5, 0.35, 4.6, 0x45443f, 0, 4.4, -4.0, scene).rotation.x = -0.18;
  // 장독대
  [[-6.2, -0.8, 0.55], [-5.2, -0.5, 0.45], [-4.4, -0.9, 0.38]].forEach(([x, z, r]) => K.cyl(r, r * 0.75, r * 2, 0x45443f, x, r, z, scene, 14));
  // 물웅덩이 + 파문
  const rip = []; for (let i = 0; i < 4; i++) { const m = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.26, 24), new THREE.MeshBasicMaterial({ color: 0x8a8782, transparent: true, opacity: 0.6, side: THREE.DoubleSide })); m.rotation.x = -Math.PI / 2; m.position.set(1.5 + (i % 2) * 1.6, 0.03, 0.2 + (i >> 1) * 0.9); scene.add(m); rip.push({ m, k: i / 4 }); }
  
  // 할머니 둘(등을 돌림) + 소년
  const gL = K.person(scene, { x: -2.6, z: -3.6, rot: 1.3, coat: 0xf2f0ea, pants: 0xe4e1d9, hair: 'bun', hairC: 0x6a6863, scale: 0.85 });
  const gR = K.person(scene, { x: 2.4, z: -3.6, rot: -1.3, coat: 0xeceae4, pants: 0xdcd9d1, hair: 'bun', hairC: 0x55534e, scale: 0.85 });
  [gL, gR].forEach(P => { P.root.position.y = 0.2; const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.4, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0xeeece6, side: THREE.DoubleSide })), 40); sk.position.y = 0.9; P.root.add(sk); });
  const boy = K.person(scene, { x: 0, z: -3.3, rot: 0.1 + Math.PI, coat: 0x55534e, pants: 0x3a3936, hair: 'short', scale: 0.6 }); boy.root.position.y = 0.7;
  // 빗줄기
  const rain = []; for (let i = 0; i < 90; i++) { const r = K.box(0.015, 0.5, 0.015, 0xa8a59e, 0, 0, 0, scene); rain.push({ r, x: -8 + (i * 0.731) % 16, z: -1.8 + (i * 0.37) % 4, k: (i * 0.137) % 1 }); }
  const drip = []; for (let i = 0; i < 12; i++) { const r = K.box(0.04, 0.3, 0.04, 0x55534e, 0, 0, 0, scene); drip.push({ r, x: -5.5 + i, k: (i * 0.29) % 1 }); }
  cam.position.set(0.0, 2.6, 7.2); cam.lookAt(0.0, 1.8, -3.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), look = K.win(ph, 0.2, 0.7, 0.15);
    boy.pose({ headYaw: -0.9 * look + 0.5 * (1 - look), headPitch: 0.1, armL: { fwd: 0.3 }, armR: { fwd: 0.3 + 0.5 * look, elbow: 0.6 } });
    gL.pose({ headPitch: 0.3, lean: -0.15, armL: { fwd: 0.6, elbow: 1.2 }, armR: { fwd: 0.6, elbow: 1.2 } });
    gR.pose({ headPitch: 0.25, headYaw: 0.5 * look, lean: -0.1, armL: { fwd: 0.5, elbow: 1.3 }, armR: { fwd: 0.5, elbow: 1.3 } });
    rain.forEach(o => { const v = (o.k + u * 3) % 1; o.r.position.set(o.x, 7 - v * 7.5, o.z); });
    drip.forEach(o => { const v = (o.k + u * 2) % 1; o.r.position.set(o.x, 4.0 - v * 4.1, -1.6); });
    rip.forEach(o => { const v = (o.k + u * 2) % 1; o.m.scale.setScalar(0.5 + v * 3); o.m.material.opacity = 0.6 * (1 - v); });
  };
}
