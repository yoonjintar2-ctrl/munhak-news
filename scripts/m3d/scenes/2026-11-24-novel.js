// 11/24 소설 구절 손창섭 「비 오는 날」: 비 내리는 피란지 언덕, 낡은 판잣집 처마 밑 문 앞에 우산을 든 사내(원구)가 서서 문을 두드리려 한다(사내는 집 쪽 -z 를 보되 비스듬히 rot 0.5). 빗줄기·처마 물방울·흔들리는 문짝. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xdad8d2, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfccc4', line: '#c6c3bb', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 2403, near: false });
  // 판잣집: 널빤지 벽·처마·창·문
  for (let i = 0; i < 12; i++) K.box(0.5, 3.0, 0.15, i % 2 ? 0x8a8782 : 0x9a978f, -3 + i * 0.5, 1.5, -3.5, scene);
  const eave = K.box(6.8, 0.15, 1.6, 0x45443f, -0.25, 3.15, -2.9, scene); eave.rotation.x = 0.12;
  K.box(1.2, 0.9, 0.05, 0xd8d5cd, -2.0, 1.9, -3.4, scene); K.box(1.2, 0.06, 0.08, 0x3a3936, -2.0, 1.9, -3.36, scene);
  const door = new THREE.Group(); door.position.set(0.6, 0, -3.38); scene.add(door); K.box(1.1, 2.3, 0.08, 0x6e6c66, 0.55, 1.15, 0, door);
  // 양동이·장독·빨랫줄
  K.cyl(0.3, 0.25, 0.5, 0x55534e, 2.4, 0.25, -2.6, scene, 12); K.cyl(0.45, 0.35, 0.9, 0x6e6c66, -3.2, 0.45, -2.5, scene, 14);
  K.line([[-3.6, 2.4, -1.5], [-1.5, 2.2, -1.5]], scene);
  // 사내 + 우산
  const M = K.person(scene, { x: 2.3, z: -2.2, rot: 1.6, coat: 0x45443f, pants: 0x2f2e2b, hair: 'short', scale: 1.0, scarf: 0xd8d5cd });
  const um = new THREE.Group(); K.cyl(0.03, 0.03, 1.6, 0x1e1e1e, 0, 0.8, 0, um, 6);
  const canopy = K.inked(new THREE.Mesh(new THREE.ConeGeometry(1.1, 0.45, 12, 1, true), new THREE.MeshLambertMaterial({ color: 0x3a3936, side: THREE.DoubleSide })), 30); canopy.position.y = 1.6; um.add(canopy);
  scene.add(um); um.position.set(2.15, 2.75, -2.2); um.rotation.z = -0.1;
  // 비·물방울
  const rain = []; for (let i = 0; i < 50; i++) { const r = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.4, 0.014), K.flat(0x9a978f)); scene.add(r); rain.push({ r, x: -5 + (i * 0.731) % 10, z: -2 + (i * 0.37) % 5, k: (i * 0.173) % 1 }); }
  const drips = []; for (let i = 0; i < 8; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 4), K.flat(0x55534e)); scene.add(d); drips.push({ d, x: -3 + i * 0.8, k: i / 8 }); }
  cam.position.set(0.9, 2.5, 5.4); cam.lookAt(0.6, 1.8, -2.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), knock = K.win(ph, 0.45, 0.75, 0.08);
    M.pose({ headPitch: 0.15, lean: 0.05, armL: { fwd: 1.5, elbow: 1.3, out: -0.25 }, armR: { fwd: 0.9 + 0.5 * knock + 0.15 * Math.sin(ph * 12) * knock, elbow: 1.2, out: -0.1 } });
    rain.forEach(o => { const v = (o.k + u * 4) % 1; o.r.position.set(o.x, 6 - v * 6, o.z); });
    drips.forEach(o => { const v = (o.k + u * 2) % 1; o.d.position.set(o.x, 2.85 - v * 2.8, -2.2); });
    door.rotation.y = -0.08 - 0.06 * Math.sin(ph);
  };
}
