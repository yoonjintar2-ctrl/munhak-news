// 11/22 「발가락이 닮았다」 장면②(after 3): 비 오는 날 작은 병원 앞. 검은 우산을 쓴 M이 유리문 앞을 서성이고(좌우로 오감), 2층 창가에 흰 가운의 '나'가 서서 그를 내려다본다. 빗줄기, 처마 물방울, 웅덩이 파문. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xd8d6d0, 25, 80] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d4d1c9', line: '#c8c5bd', tiles: 4, repeat: 5 });
  K.backdrop(scene, { kind: 'town', seed: 2213 });
  // 2층 병원 건물
  K.box(9, 7, 3, 0xd8d5cd, 0, 3.5, -6, scene); K.box(9.6, 0.3, 1.4, 0x55534e, 0, 3.4, -4.1, scene);
  K.box(1.8, 2.6, 0.1, 0x9a978f, 0, 1.3, -4.45, scene); K.box(0.08, 2.6, 0.15, 0x3a3936, 0, 1.3, -4.4, scene); // 유리문
  [-2.8, 2.8].forEach(x => K.box(1.6, 1.4, 0.1, 0xfbfaf6, x, 1.8, -4.45, scene));
  K.box(2.2, 1.8, 0.1, 0xfbfaf6, 2.4, 5.3, -4.45, scene); // 2층 창(밝음)
  K.box(2.6, 0.2, 1.0, 0x55534e, 2.4, 3.95, -4.0, scene); const Dr = K.person(scene, { x: 2.4, z: -4.1, rot: Math.PI, coat: 0xf2f0ea, pants: 0x55534e, hair: 'short', scale: 0.7 }); const dg = new THREE.Group(); dg.position.y = 4.05; scene.add(dg); dg.add(Dr.root);
  K.box(0.9, 0.5, 0.2, 0x8a8782, -2.8, 4.8, -4.4, scene); // 간판(글자 없음)
  // M + 우산
  const M = K.person(scene, { x: 0, z: -2.2, rot: 0.3, coat: 0x45443f, pants: 0x2f2e2b, hair: 'short', scale: 1.0 });
  const umb = new THREE.Group(); K.cyl(0.03, 0.03, 1.6, 0x1c1c1a, 0, 0.8, 0, umb, 6); const can = K.inked(new THREE.Mesh(new THREE.ConeGeometry(1.1, 0.5, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0x2a2a28, side: THREE.DoubleSide })), 40); can.position.y = 1.7; umb.add(can);
  umb.position.set(0.35, 2.2, -0.3); M.root.add(umb);
  const rain = []; for (let i = 0; i < 80; i++) { const r = K.box(0.015, 0.45, 0.015, 0xa8a59e, 0, 0, 0, scene); rain.push({ r, x: -7 + (i * 0.731) % 14, z: -3.6 + (i * 0.37) % 5, k: (i * 0.137) % 1 }); }
  const rip = []; for (let i = 0; i < 3; i++) { const m = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.26, 24), new THREE.MeshBasicMaterial({ color: 0x8a8782, transparent: true, opacity: 0.6, side: THREE.DoubleSide })); m.rotation.x = -Math.PI / 2; m.position.set(-3 + i * 2.6, 0.03, 0.2); scene.add(m); rip.push({ m, k: i / 3 }); }
  cam.position.set(0.5, 3.0, 8.0); cam.lookAt(0.3, 2.8, -3.5);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), s = Math.sin(ph);
    M.root.position.x = 1.4 * s; M.root.rotation.y = Math.cos(ph) > 0 ? -1.2 : 1.2; 
    const w = Math.sin(ph * 4);
    M.pose({ headPitch: 0.25, headYaw: 0.4 * Math.sin(ph * 2), armR: { fwd: 1.4, elbow: 1.2, out: -0.1 }, armL: { fwd: 0.3 * w }, legL: { fwd: 0.3 * w }, legR: { fwd: -0.3 * w } });
    Dr.pose({ headPitch: 0.45, headYaw: -0.3 * s, armL: { fwd: 0.4, elbow: 1.2 }, armR: { fwd: 0.4, elbow: 1.2 } });
    rain.forEach(o => { const v = (o.k + u * 3) % 1; o.r.position.set(o.x, 7 - v * 7.4, o.z); });
    rip.forEach(o => { const v = (o.k + u * 2) % 1; o.m.scale.setScalar(0.5 + v * 3); o.m.material.opacity = 0.6 * (1 - v); });
  };
}
