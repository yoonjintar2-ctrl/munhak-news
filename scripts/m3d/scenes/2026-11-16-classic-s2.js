// 11/16 1분 고전 장면② 소나기와 원두막: 비 쏟아지는 밭가 원두막. 마루에 웅크려 앉은 소녀를 둘러 수숫단이 비스듬히 덧세워져 있고, 소년이 수숫단 한 아름을 안고 걸어와(왼→오른쪽, 몸도 +x를 향함) 원두막 앞에 기대 세우고 빈손으로 돌아간다(-x를 향함). 소녀는 소년 쪽으로 고개를 돌린다. 빗줄기가 비스듬히 내리고 수수 이삭이 흔들린다
export const secs = 3;
export const opts = { bg: 0xe2e0da, fog: [0xdcdad4, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfccc2', line: '#c4c1b7', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 88 });
  // 원두막: 낮은 마루(아래는 짚 벽으로 막음) + 기둥 넷 + 초가 지붕
  const hx = 1.8, hz = -2.6, fy = 1.1;
  K.box(3.2, fy, 2.8, 0x8d8a82, hx, fy / 2, hz, scene);           // 마루 밑 짚벽
  K.box(3.4, 0.18, 3.0, 0x5c5a55, hx, fy + 0.09, hz, scene);       // 마루판
  [[-1.5, -1.3], [1.5, -1.3], [-1.5, 1.3], [1.5, 1.3]].forEach(([x, z]) => K.cyl(0.12, 0.14, 4.0, 0x4a4945, hx + x, 2.0 + fy * 0.5, hz + z, scene, 8));
  const rf = K.inked(new THREE.Mesh(new THREE.ConeGeometry(2.8, 1.5, 4), K.lam(0x6f6c65)), 30); rf.rotation.y = Math.PI / 4; rf.position.set(hx, 5.2, hz); scene.add(rf);
  // 수숫단 만들기: 가는 줄기 여러 개를 묶고, 위에 늘어진 이삭
  const sheaf = (parent) => { const g = new THREE.Group(); parent.add(g);
    for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2, r = 0.12 + (i % 3) * 0.05; const st = K.cyl(0.025, 0.03, 2.4, 0x77746c, Math.cos(a) * r, 1.2, Math.sin(a) * r, g, 4); st.rotation.z = Math.cos(a) * 0.05;
      const hd = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 5), K.lam(0x45433f)), 30); hd.scale.y = 2.0; hd.position.set(Math.cos(a) * (r + 0.08), 2.45, Math.sin(a) * (r + 0.08)); hd.rotation.z = Math.cos(a) * 0.6; hd.rotation.x = -Math.sin(a) * 0.6; g.add(hd); }
    K.cyl(0.2, 0.2, 0.08, 0x2f2f2c, 0, 1.1, 0, g, 10); return g; };
  // 이미 덧세운 수숫단(원두막 앞쪽 처마에 기대 세움)
  [[1.9, 0.22], [2.5, 0.25], [3.1, 0.2]].forEach(([x, tilt]) => { const s = sheaf(scene); s.position.set(hx - 1.6 + x, 0, hz + 1.9); s.rotation.x = -tilt; });
  // 수수밭(왼쪽 뒤) — 이삭 흔들림
  const sor = []; for (let i = 0; i < 18; i++) { const g = new THREE.Group(); g.position.set(-8 + (i % 6) * 0.8, 0, -4.2 - Math.floor(i / 6) * 0.9); scene.add(g); K.cyl(0.035, 0.045, 2.8, 0x6a6862, 0, 1.4, 0, g, 5); const h = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), K.lam(0x45433f)), 30); h.scale.y = 1.8; h.position.set(0.1, 2.85, 0); h.rotation.z = -0.5; g.add(h); sor.push({ g, k: i * 0.5 }); }
  // 소녀: 마루에 앉음(다리는 짚벽 뒤로 가려짐) — 밝은 스웨터, 긴 머리
  const G = K.person(scene, { x: hx - 0.45, z: hz + 0.3, rot: 2.45, coat: 0xa4a199, pants: 0x3e3d3a, hair: 'long', scale: 0.72 });
  // 소년: 수숫단을 옆구리에 끼고 걸어옴(+x 방향)
  const B = K.person(scene, { x: 0, z: 0.4, rot: -Math.PI / 2, coat: 0x3c3b38, pants: 0x55534e, hair: 'short', scale: 0.82 });
  const carried = sheaf(scene);
  // 빗줄기(비스듬히, 옅게)
  const rain = []; for (let i = 0; i < 70; i++) { const d = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.6, 0.012), K.flat(0xb9b7b1)); d.rotation.z = 0.18; scene.add(d); rain.push({ d, k: (i * 0.618) % 1, x: -9 + (i * 37 % 180) / 10, z: -6 + (i * 53 % 100) / 10 }); }
  // 웅덩이 둘
  [[-2.5, 1.6], [4.6, 1.2]].forEach(([x, z]) => { const p = new THREE.Mesh(new THREE.CircleGeometry(0.7, 20), K.lam(0xa9a7a1)); p.rotation.x = -Math.PI / 2; p.scale.y = 0.5; p.position.set(x, 0.02, z); scene.add(p); });
  cam.position.set(-0.4, 3.4, 8.6); cam.lookAt(0.6, 2.0, -1.6);
  return (t, ph) => {
    const u = (ph / (Math.PI * 2)) % 1;
    rain.forEach(o => { const v = (o.k + u * 3) % 1; o.d.position.set(o.x - v * 1.0, 8 - v * 8, o.z); });
    sor.forEach(o => { o.g.rotation.z = 0.1 * Math.sin(ph * 2 + o.k); });
    // 소년: 화면 밖 왼쪽에서 수숫단을 안고 들어와(0~0.42, +x를 봄) 원두막 앞에 기대 세우고(0.42~0.62) 빈손으로 왼쪽 밖으로 돌아감(0.62~1, -x를 봄). 반복 이음매는 화면 밖
    let x, face, hold;
    if (u < 0.42) { const f = u / 0.42, e = f * f * (3 - 2 * f); x = -8.2 + 6.6 * e; face = -Math.PI / 2; hold = 1; }
    else if (u < 0.62) { x = -1.6; face = -Math.PI / 2; hold = 1; }
    else { const f = (u - 0.62) / 0.38, e = f * f * (3 - 2 * f); x = -1.6 - 6.6 * e; face = Math.PI / 2; hold = 0; }
    const moving = u < 0.4 || u > 0.64; const step = moving ? Math.sin(u * 50) : 0;
    const set = K.win(ph, 0.44, 0.62, 0.05);
    B.root.position.set(x, 0.05 * Math.abs(step), 0.4); B.root.rotation.y = face;
    B.pose({ lean: -0.1 - 0.25 * set, headYaw: hold ? -0.35 : 0.35, headPitch: -0.05 - 0.2 * set,
      armL: hold ? { fwd: 0.9 + 0.5 * set, out: 0.15, elbow: 1.3 - 0.6 * set } : { fwd: 0.3 * step, elbow: 0.3 }, armR: hold ? { fwd: 0.6 + 0.5 * set, out: 0.1, elbow: 1.5 - 0.6 * set } : { fwd: -0.3 * step, elbow: 0.3 } });
    // 안은 수숫단 → 다 세우면 원두막 왼쪽 앞에 기대 선 채 남음
    if (u < 0.62) { carried.position.set(x + 0.55 + 0.6 * set, 0.55 + 0.1 * Math.abs(step) - 0.5 * set, 0.3); carried.rotation.set(-0.15 * set, 0, -0.55 + 0.35 * set); }
    else { carried.position.set(-0.45, 0.05, 0.3); carried.rotation.set(-0.15, 0, -0.2); }
    G.pose({ bob: fy + 0.18 - 1.75 * 0.72, headYaw: 0.3 * Math.sin(ph), headPitch: -0.05, lean: -0.15,
      armL: { fwd: 0.9, elbow: 1.7, out: -0.1 }, armR: { fwd: 0.9, elbow: 1.7, out: -0.1 } });
  };
}
