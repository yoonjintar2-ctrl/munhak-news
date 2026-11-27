// 11/20 오늘의 문장 「소년이 온다」: 밤 방 안, 창가 작은 상 위에 촛불 하나와 흰 국화 몇 송이를 꽂은 병. 상 앞에 선 여인(쪽진 머리, 진한 옷)이 고개를 숙이고 두 손을 모은다. 커튼이 흔들리고 촛불이 일렁이며 국화 송이가 살짝 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe4e2dc, fog: [0xe0ded8, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d5cd', line: '#cecbc3', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 81 });
  // 창(밤, 어둡게) 덮개
  K.box(4.8, 3.4, 0.05, 0x55534e, 6, 5, -6.7, scene);
  const cur = new THREE.Group(); cur.position.set(3.7, 6.9, -6.4); scene.add(cur); K.box(1.3, 3.8, 0.05, 0xf6f4ef, 0, -1.9, 0, cur);
  const cur2 = new THREE.Group(); cur2.position.set(8.3, 6.9, -6.4); scene.add(cur2); K.box(1.3, 3.8, 0.05, 0xf6f4ef, 0, -1.9, 0, cur2);
  // 상 + 병 + 국화 + 촛불
  K.box(2.6, 0.14, 1.3, 0x45443f, 0.6, 1.3, -3.6, scene); [[-0.6, -4.1], [1.8, -4.1], [-0.6, -3.1], [1.8, -3.1]].forEach(([x, z]) => K.box(0.14, 1.3, 0.14, 0x3a3936, x, 0.65, z, scene));
  K.cyl(0.18, 0.24, 0.7, 0xdedbd3, 1.2, 1.72, -3.7, scene, 14);
  const flowers = []; [[1.0, 2.6, -3.7], [1.25, 2.85, -3.75], [1.45, 2.55, -3.6], [1.15, 2.4, -3.5], [1.35, 2.7, -3.9]].forEach(([x, y, z], i) => { const g = new THREE.Group(); g.position.set(1.2, 2.05, -3.7); scene.add(g);
    K.line([[0, 0, 0], [x - 1.2, y - 2.05, z + 3.7]], g); const f = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), K.lam(0xfbfaf6)), 80); f.scale.y = 0.7; f.position.set(x - 1.2, y - 2.05, z + 3.7); g.add(f); flowers.push({ g, k: i }); });
  K.cyl(0.09, 0.1, 0.45, 0xf6f4ef, 0.1, 1.6, -3.5, scene, 10); K.cyl(0.2, 0.2, 0.06, 0x3a3936, 0.1, 1.38, -3.5, scene, 12);
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), K.flat(0xffffff)); flame.scale.y = 2.2; flame.position.set(0.1, 1.95, -3.5); scene.add(flame);
  const glow = new THREE.Mesh(new THREE.CircleGeometry(0.5, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, depthWrite: false })); glow.position.set(0.1, 1.95, -3.45); scene.add(glow);
  // 의자 위 교복 윗옷(접어 둠)
  K.box(1.1, 0.12, 1.0, 0x55534e, -2.6, 1.2, -3.6, scene); K.box(1.1, 1.3, 0.12, 0x55534e, -2.6, 1.9, -4.1, scene); [[-3.1, -4.05], [-2.1, -4.05], [-3.1, -3.15], [-2.1, -3.15]].forEach(([x, z]) => K.box(0.1, 1.2, 0.1, 0x45443f, x, 0.6, z, scene));
  K.box(0.9, 0.18, 0.8, 0x2a2a28, -2.6, 1.35, -3.6, scene); K.box(0.06, 0.06, 0.06, 0xeeeeea, -2.6, 1.46, -3.25, scene);
  const W = K.person(scene, { x: -1.0, z: -2.0, rot: -0.75, coat: 0x45443f, pants: 0x3a3936, hair: 'bun', scale: 0.95 });
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.9, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x3a3936, side: THREE.DoubleSide })), 40); sk.position.y = 0.95; W.root.add(sk);
  cam.position.set(-2.4, 2.9, 3.6); cam.lookAt(0.2, 1.9, -3.2);
  return (t, ph) => {
    const br = Math.sin(ph);
    W.pose({ headPitch: 0.45 + 0.08 * br, lean: -0.08, armL: { fwd: 1.1, out: -0.35, elbow: 1.2 }, armR: { fwd: 1.1, out: -0.35, elbow: 1.2 } });
    flame.scale.set(1 + 0.15 * Math.sin(ph * 7), 2.2 + 0.4 * Math.sin(ph * 5), 1); flame.position.x = 0.1 + 0.02 * Math.sin(ph * 6); glow.material.opacity = 0.25 + 0.08 * Math.sin(ph * 5);
    cur.rotation.x = -0.1 - 0.08 * Math.sin(ph); cur2.rotation.x = -0.08 - 0.08 * Math.sin(ph + 1);
    flowers.forEach(o => { o.g.rotation.z = 0.05 * Math.sin(ph * 2 + o.k); });
  };
}
