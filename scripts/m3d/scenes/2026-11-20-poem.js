// 11/20 오늘의 시 「추야우중」: 비 내리는 가을밤, 초가 처마 아래 활짝 열린 방문 안. 갓 쓴 선비(흰 도포)가 서안 앞에 서서 붓을 든 채 고개를 숙이고, 서안 위 등잔불이 일렁인다. 처마에서 빗줄기가 떨어지고 마당의 오동잎이 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xc8c6c0, fog: [0xc4c2bc, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#bdbab2', line: '#b3b0a8', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 91, night: true });
  // 집: 툇마루 + 기둥 + 방 안 벽 + 초가 지붕
  K.box(9, 0.5, 2.0, 0x6e6c66, 0, 0.25, -2.2, scene); K.box(9, 4.6, 0.3, 0xe8e6e0, 0, 2.6, -5.2, scene);
  [-4.3, -1.4, 1.4, 4.3].forEach(x => K.cyl(0.16, 0.18, 4.6, 0x3a3936, x, 2.5, -1.4, scene, 8));
  const roof = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 7.2, 2.4, 4, 1), K.lam(0x77756f)), 40); roof.rotation.y = Math.PI / 4; roof.scale.set(1.0, 1, 0.55); roof.position.set(0, 5.9, -3.2); scene.add(roof);
  K.box(10.6, 0.35, 0.6, 0x55534e, 0, 4.85, -0.6, scene);
  // 창호 문짝(열림)
  [-4.0, 4.0].forEach(x => { K.box(1.3, 3.0, 0.08, 0xfaf9f4, x, 2.3, -4.9, scene); for (let i = 0; i < 4; i++) K.line([[x - 0.6, 1.1 + i * 0.75, -4.84], [x + 0.6, 1.1 + i * 0.75, -4.84]], scene); });
  // 서안 + 등잔 + 종이
  K.box(2.0, 0.12, 0.9, 0x45443f, 0.8, 1.6, -3.8, scene); [[0, -4.15], [1.6, -4.15], [0, -3.45], [1.6, -3.45]].forEach(([x, z]) => K.box(0.1, 1.1, 0.1, 0x3a3936, x, 1.05, z, scene));
  K.box(0.9, 0.02, 0.6, 0xfbfaf6, 0.5, 1.67, -3.7, scene); K.cyl(0.06, 0.12, 0.6, 0x3a3936, 1.5, 1.96, -3.9, scene, 8);
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), K.flat(0xffffff)); flame.scale.y = 2; flame.position.set(1.5, 2.4, -3.9); scene.add(flame);
  const glow = new THREE.Mesh(new THREE.CircleGeometry(1.1, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, depthWrite: false })); glow.position.set(1.5, 2.4, -5.0); scene.add(glow);
  const P = K.person(scene, { x: -0.6, z: -3.4, rot: -1.0, coat: 0xeeece6, pants: 0xd4d1c9, hair: 'short', scale: 0.9 });
  P.root.position.y = 0.5;
  const gat = new THREE.Group(); gat.position.y = 0.62; P.headG.add(gat); K.cyl(0.75, 0.75, 0.03, 0x1c1c1a, 0, 0, 0, gat, 24); K.cyl(0.26, 0.3, 0.45, 0x1c1c1a, 0, 0.22, 0, gat, 16);
  const robe = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.9, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0xe4e1d9, side: THREE.DoubleSide })), 40); robe.position.y = 1.0; P.root.add(robe);
  const brush = K.cyl(0.025, 0.04, 0.55, 0x2a2a28, 0, 0, 0, scene, 6); P.hold('R', brush, { at: [0, -0.15, 0], rot: [0.2, 0, 0] });
  // 오동나무 잎(마당 왼쪽)
  K.cyl(0.18, 0.24, 4.5, 0x45443f, -6.2, 2.25, 1.0, scene, 8); const leaves = []; for (let i = 0; i < 9; i++) { const l = K.inked(new THREE.Mesh(new THREE.CircleGeometry(0.5, 8), new THREE.MeshLambertMaterial({ color: 0x77756f, side: THREE.DoubleSide })), 30); l.position.set(-6.2 + (i % 3 - 1) * 0.9, 4.2 + Math.floor(i / 3) * 0.6, 1.0 + (i % 2) * 0.4); scene.add(l); leaves.push({ l, k: i }); }
  // 비
  const rain = []; for (let i = 0; i < 45; i++) { const r = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.6, 0.02), K.flat(0xfbfaf6)); scene.add(r); rain.push({ r, x: -7 + (i * 0.73) % 14, z: -0.8 + ((i * 0.37) % 1) * 3.5, k: (i * 0.173) % 1 }); }
  cam.position.set(0.6, 2.7, 5.6); cam.lookAt(0.2, 2.3, -3.2);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    P.pose({ headPitch: 0.4 + 0.1 * Math.sin(ph), headTilt: 0.06 * Math.sin(ph), armR: { fwd: 0.9 + 0.08 * Math.sin(ph * 2), out: -0.2, elbow: 1.0 }, armL: { fwd: 0.4, out: -0.1, elbow: 1.3 } });
    flame.scale.set(1 + 0.15 * Math.sin(ph * 7), 2 + 0.4 * Math.sin(ph * 5), 1); glow.material.opacity = 0.3 + 0.08 * Math.sin(ph * 5);
    rain.forEach(o => { const v = (o.k + u * 3) % 1; o.r.position.set(o.x, 5.0 - v * 5.2, o.z); });
    leaves.forEach(o => { o.l.rotation.set(0.6 + 0.25 * Math.sin(ph * 2 + o.k), o.k, 0.2 * Math.sin(ph + o.k)); });
  };
}
