// 11/16 1분 현대문학 장면② 제보: 동네 약국 앞, 흰 가운의 약사가 길 끝을 가리키며 이야기하고, 전단지를 든 큰아들이 그 쪽을 돌아본다. 약국 처마 차양이 흔들리고 비둘기가 땅을 쫀다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3ca', line: '#cac7be', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 63 });
  // 약국 건물(왼쪽) — 유리문·진열창, 간판은 십자 모양만(글자 없음)
  K.box(7, 5, 3, 0xd8d5cc, -4.2, 2.5, -4.0, scene);
  K.box(2.4, 3.0, 0.08, 0xf2f1ec, -2.6, 1.6, -2.45, scene); K.box(0.08, 3.0, 0.12, 0x4a4945, -2.6, 1.6, -2.42, scene);
  K.box(2.6, 1.8, 0.08, 0xeeede8, -5.8, 2.0, -2.45, scene);
  [[-6.3, 2.1], [-5.6, 1.7], [-5.1, 2.3]].forEach(([x, y]) => K.box(0.3, 0.45, 0.2, 0x6a6862, x, y, -2.6, scene));
  K.box(1.0, 0.3, 0.12, 0x2f2f2c, -4.2, 4.3, -2.4, scene); K.box(0.3, 1.0, 0.12, 0x2f2f2c, -4.2, 4.3, -2.4, scene);
  const awn = new THREE.Group(); awn.position.set(-4.2, 3.6, -2.4); scene.add(awn); const aw = K.box(7, 0.08, 1.2, 0x8a8780, 0, 0, 0.6, awn); aw.rotation.x = 0.35;
  // 약사(흰 가운) — 오른쪽(길 끝 +x)을 가리킴
  const Ph = K.person(scene, { x: -1.2, z: -1.0, rot: -Math.PI / 2 - 0.35, coat: 0xd9d6ce, pants: 0x3e3d3a, hair: 'short', scale: 0.95 });
  // 큰아들(전단지) — 약사와 마주 보다 가리킨 쪽을 돌아봄
  const S = K.person(scene, { x: -3.0, z: 1.2, rot: -1.25, coat: 0x3a3936, pants: 0x55534e, hair: 'short', scale: 0.98 });
  const fly = K.inked(new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.65), new THREE.MeshLambertMaterial({ color: 0xfafaf6, side: THREE.DoubleSide })), 1); scene.add(fly);
  // 길 끝 골목, 가로등, 화분, 비둘기
  K.cyl(0.08, 0.1, 5, 0x3a3936, 5.4, 2.5, -2.6, scene, 8); K.box(0.6, 0.25, 0.4, 0x3a3936, 5.4, 5.0, -2.6, scene);
  K.cyl(0.35, 0.28, 0.6, 0x6a6862, -0.2, 0.3, -2.3, scene, 10);
  const pg = new THREE.Group(); pg.position.set(3.2, 0, 1.6); scene.add(pg); const pb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), K.lam(0x55534e)), 40); pb.scale.set(1.5, 1, 1); pb.position.y = 0.25; pg.add(pb); const phd = new THREE.Group(); phd.position.set(0.3, 0.42, 0); pg.add(phd); K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), K.lam(0x3a3936)), 40); phd.add(new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), K.lam(0x3a3936)));
  cam.position.set(1.4, 3.3, 9.4); cam.lookAt(0.0, 2.0, -1.6);
  return (t, ph) => {
    awn.rotation.x = 0.05 * Math.sin(ph * 2);
    phd.position.y = 0.42 - 0.2 * Math.max(0, Math.sin(ph * 4)); phd.position.x = 0.3 + 0.08 * Math.max(0, Math.sin(ph * 4));
    const pt = K.win(ph, 0.15, 0.8, 0.1);
    Ph.pose({ headYaw: -0.25 * pt, headPitch: 0.0, torsoYaw: -0.35 * pt, armR: { fwd: 0.3 + 1.25 * pt, out: -0.1, elbow: 0.15, point: pt > 0.5 }, armL: { fwd: 0.5, elbow: 1.3 } });
    const look = K.win(ph, 0.35, 0.9, 0.1);
    S.pose({ headYaw: -0.5 * look, torsoYaw: -0.2 * look, headPitch: -0.05, armL: { fwd: 0.9, elbow: 0.9 }, armR: { fwd: 0.3, elbow: 0.5 } });
    fly.position.set(-2.4, 1.95, 1.5); fly.rotation.y = -1.25;
  };
}
