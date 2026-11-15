// 11/16 1분 고전 장면③ 불어난 개울: 소년이 소녀를 업고 물살을 건너 앞쪽 둑으로 온다. 진행 방향 +z(화면 앞쪽), 소년·소녀 모두 rot π(+z를 봄). 소녀는 소년 등 뒤에서 오른쪽 어깨 너머로 얼굴을 내밀고 두 팔로 목을 감는다. 물은 왼→오른쪽으로 흐르고 갈대가 흔들린다. 카메라는 앞쪽 비스듬히 위
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xe8e6e0, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d5cb', line: '#ccc9bf', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 53 });
  // 개울: 가로 띠(z -5 ~ 1), 물이 정강이까지 — 물 면을 띄워 다리를 가림
  const water = new THREE.Mesh(new THREE.PlaneGeometry(60, 6), K.lam(0x96948e)); water.rotation.x = -Math.PI / 2; water.position.set(0, 0.7, -2.0); scene.add(water);
  K.box(60, 0.75, 0.3, 0x8a8780, 0, 0.37, 1.05, scene); // 앞 둑 가장자리
  const rip = []; for (let i = 0; i < 16; i++) { const r = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.05), K.flat(0xeeede8)); r.rotation.x = -Math.PI / 2; scene.add(r); rip.push({ r, k: i / 16, z: -4.6 + (i % 6) * 0.95 }); }
  // 물에 잠긴 징검돌 머리
  [[-2.6, -3.6], [-1.4, -2.6], [2.4, -1.2]].forEach(([x, z]) => { const s = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 0.2, 9), K.lam(0x6f6d67)), 40); s.position.set(x, 0.72, z); scene.add(s); });
  // 갈대(양 옆 둑), 앞 둑의 돌·책보
  const reeds = []; for (let i = 0; i < 16; i++) { const g = new THREE.Group(); const L = i < 8; g.position.set(L ? -6.5 + (i % 8) * 0.45 : 3.6 + (i % 8) * 0.5, 0, L ? 1.8 - (i % 3) * 0.3 : 1.6 - (i % 3) * 0.3); scene.add(g); K.cyl(0.03, 0.04, 1.7, 0x6a6964, 0, 0.85, 0, g, 5); K.cyl(0.12, 0.05, 0.5, 0xe6e4dd, 0, 1.8, 0, g, 6); reeds.push({ g, k: i * 0.6 }); }
  K.box(0.7, 0.4, 0.4, 0x77756f, 2.4, 0.2, 2.4, scene);
  [[-3.4, 2.6], [3.0, 3.0]].forEach(([x, z]) => { const r = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 6), K.lam(0x6a6964)), 40); r.scale.y = 0.5; r.position.set(x, 0.15, z); scene.add(r); });
  // 소년 + 업힌 소녀
  const carry = new THREE.Group(); carry.position.set(0, 0, -1.6); scene.add(carry);
  const B = K.person(carry, { x: 0, z: 0, rot: Math.PI, coat: 0x3a3936, pants: 0x55534e, hair: 'short', scale: 0.86 });
  const G = K.person(carry, { x: 0.42, z: -0.6, rot: Math.PI, coat: 0xa7a49c, pants: 0x4a4946, hair: 'long', scale: 0.7 });
  
  cam.position.set(-2.4, 3.6, 6.4); cam.lookAt(0.0, 2.4, -1.6);
  return (t, ph) => {
    rip.forEach(o => { const u = (o.k + ph / (Math.PI * 2) * 2) % 1; o.r.position.set(-9 + u * 18, 0.72, o.z); });
    reeds.forEach(o => { o.g.rotation.z = 0.16 * Math.sin(ph * 3 + o.k) + 0.06; });
    const st = Math.sin(ph * 2);
    carry.position.y = 0.06 * Math.abs(st); carry.rotation.z = 0.035 * st; carry.position.z = -1.6 + 0.15 * Math.sin(ph);
    B.pose({ lean: -0.22, headPitch: -0.2, headYaw: 0.1 * st, armL: { fwd: -0.5, out: 0.25, elbow: 1.2 }, armR: { fwd: -0.5, out: 0.25, elbow: 1.2 } });
    G.pose({ bob: 0.98, lean: -0.3, headYaw: 0.15 + 0.12 * Math.sin(ph), headTilt: -0.15, headPitch: -0.1,
      armL: { fwd: 1.25, out: -0.45, elbow: 0.7 }, armR: { fwd: 1.25, out: -0.45, elbow: 0.7 } });
  };
}
