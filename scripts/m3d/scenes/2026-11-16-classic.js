// 11/16 1분 고전 「소나기」 대표: 가을 개울 징검다리. 단발머리 소녀가 가운데 돌에 쪼그려 앉아 물에 손을 담갔다 들어 보이고, 개울둑의 소년이 머뭇거리며 바라보다 고개를 숙인다. 물결이 흐르고(왼→오), 갈대가 흔들린다
export const secs = 3;
export const opts = { bg: 0xefede7, fog: [0xeae8e2, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d5cb', line: '#ccc9bf', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 53 });
  // 개울(앞뒤로 가로지르는 띠) + 잔물결
  const water = new THREE.Mesh(new THREE.PlaneGeometry(60, 5.5), K.lam(0x9a9892)); water.rotation.x = -Math.PI / 2; water.position.set(0, 0.03, -2.2); scene.add(water);
  const rip = []; for (let i = 0; i < 12; i++) { const r = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.05), K.flat(0xeeede8)); r.rotation.x = -Math.PI / 2; scene.add(r); rip.push({ r, k: i / 12, z: -4.4 + (i % 5) * 1.0 }); }
  // 징검다리 돌 다섯(뒤쪽 둑 → 앞쪽 둑)
  const stones = [[-2.4, -4.6], [-1.6, -3.5], [-0.8, -2.4], [0.0, -1.3], [0.8, -0.2]];
  stones.forEach(([x, z]) => { const s = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.35, 9), K.lam(0x77756f)), 40); s.position.set(x, 0.15, z); scene.add(s); });
  // 갈대(양쪽 둑)
  const reeds = []; for (let i = 0; i < 16; i++) { const g = new THREE.Group(); const side = i < 8; g.position.set(side ? -7 + (i % 8) * 0.45 : 3.2 + (i % 8) * 0.5, 0, side ? 0.9 - (i % 3) * 0.3 : 0.6 - (i % 3) * 0.3); scene.add(g); K.cyl(0.03, 0.04, 1.7, 0x6a6964, 0, 0.85, 0, g, 5); K.cyl(0.12, 0.05, 0.5, 0xe6e4dd, 0, 1.8, 0, g, 6); reeds.push({ g, k: i * 0.6 }); }
  // 소녀(가운데 돌, 쪼그려 앉음: bob 아래로) — 단발, 밝은 스웨터
  const G = K.person(scene, { x: -0.8, z: -2.4, rot: -Math.PI / 2 + 0.3, coat: 0x8f8c85, pants: 0x3e3d3a, hair: 'long', scale: 0.78 });
  // 소년(앞 둑, 오른쪽) — 짧은 머리, 진한 옷, 책보
  const B = K.person(scene, { x: 2.6, z: -5.6, rot: 2.32, coat: 0x3c3b38, pants: 0x55534e, hair: 'short', scale: 0.82 });
  K.box(0.7, 0.45, 0.25, 0x77756f, 3.1, 1.3, -5.9, scene);
  // 둑 위 돌 몇, 둑길 버드나무
  [[-4, 1.8], [4.6, 2.2], [-5.6, -6]].forEach(([x, z]) => { const r = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 6), K.lam(0x6a6964)), 40); r.scale.y = 0.5; r.position.set(x, 0.15, z); scene.add(r); });
  K.cyl(0.2, 0.3, 4, 0x4a4945, -6.5, 2, -7, scene, 8); const wl = []; for (let i = 0; i < 6; i++) { const l = K.cyl(0.04, 0.02, 2.4, 0x6a6964, -7.3 + i * 0.35, 3.0, -7, scene, 4); wl.push(l); }
  cam.position.set(0.6, 3.0, 6.8); cam.lookAt(0.6, 1.2, -2.6);
  return (t, ph) => {
    rip.forEach(o => { const u = (o.k + ph / (Math.PI * 2)) % 1; o.r.position.set(-9 + u * 18, 0.05, o.z); });
    reeds.forEach(o => { o.g.rotation.z = 0.1 * Math.sin(ph * 2 + o.k) + 0.04; });
    wl.forEach((l, i) => l.rotation.z = 0.08 * Math.sin(ph + i));
    const lift = K.win(ph, 0.4, 0.75, 0.1);
    G.pose({ bob: -0.9, lean: -0.55 + 0.25 * lift, headPitch: -0.3 + 0.3 * lift, headYaw: 0.5 * lift,
      armR: { fwd: 0.7 + 0.6 * lift, elbow: 0.2 + 0.6 * lift }, armL: { fwd: 0.6, elbow: 0.9 } });
    const shy = K.win(ph, 0.7, 0.98, 0.08);
    B.pose({ headYaw: -0.2 + 0.3 * shy, headPitch: -0.15 - 0.35 * shy, armL: { fwd: 0.1, elbow: 0.3 }, armR: { fwd: 0.35 * (1 - shy), elbow: 1.4 * (1 - shy) + 0.2 } });
  };
}
