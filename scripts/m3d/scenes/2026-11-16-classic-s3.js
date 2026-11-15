// 11/16 1분 고전 장면③ 불어난 개울: 소년이 소녀를 업고 물살을 한 걸음씩 건넌다(진행 방향 -z 뒤쪽 둑에서 앞쪽 둑 +z로, 소년 rot π → +z, 카메라 비스듬히). 물살이 빠르게 흐르고 갈대가 크게 흔들린다
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
  [].forEach(([x, z]) => { const s = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.35, 9), K.lam(0x77756f)), 40); s.position.set(x, 0.15, z); scene.add(s); });
  // 갈대(양쪽 둑)
  const reeds = []; for (let i = 0; i < 16; i++) { const g = new THREE.Group(); const side = i < 8; g.position.set(side ? -7 + (i % 8) * 0.45 : 3.2 + (i % 8) * 0.5, 0, side ? 0.9 - (i % 3) * 0.3 : 0.6 - (i % 3) * 0.3); scene.add(g); K.cyl(0.03, 0.04, 1.7, 0x6a6964, 0, 0.85, 0, g, 5); K.cyl(0.12, 0.05, 0.5, 0xe6e4dd, 0, 1.8, 0, g, 6); reeds.push({ g, k: i * 0.6 }); }
  // 소녀(가운데 돌, 쪼그려 앉음: bob 아래로) — 단발, 밝은 스웨터
  const carry = new THREE.Group(); scene.add(carry);
  const G = K.person(carry, { x: 0, z: -0.6, rot: Math.PI, coat: 0x8f8c85, pants: 0x3e3d3a, hair: 'long', scale: 0.74 });
  // 소년(앞 둑, 오른쪽) — 짧은 머리, 진한 옷, 책보
  const B = K.person(carry, { x: 0, z: 0, rot: Math.PI, coat: 0x3c3b38, pants: 0x55534e, hair: 'short', scale: 0.82 });
  G.root.position.y = 1.95;
  const water2 = new THREE.Mesh(new THREE.PlaneGeometry(60, 5.5), K.lam(0x8a8882)); water2.rotation.x = -Math.PI / 2; water2.position.set(0, 0.75, -2.2); scene.add(water2);
  // 둑 위 돌 몇, 둑길 버드나무
  [[-4, 1.8], [4.6, 2.2], [-5.6, -6]].forEach(([x, z]) => { const r = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 6), K.lam(0x6a6964)), 40); r.scale.y = 0.5; r.position.set(x, 0.15, z); scene.add(r); });
  K.cyl(0.2, 0.3, 4, 0x4a4945, -6.5, 2, -7, scene, 8); const wl = []; for (let i = 0; i < 6; i++) { const l = K.cyl(0.04, 0.02, 2.4, 0x6a6964, -7.3 + i * 0.35, 3.0, -7, scene, 4); wl.push(l); }
  cam.position.set(4.6, 3.6, 4.4); cam.lookAt(0.0, 2.4, -2.4);
  return (t, ph) => {
    rip.forEach(o => { const u = (o.k + ph / (Math.PI * 2) * 2) % 1; o.r.position.set(-9 + u * 18, 0.78, o.z); });
    reeds.forEach(o => { o.g.rotation.z = 0.2 * Math.sin(ph * 3 + o.k) + 0.08; });
    wl.forEach((l, i) => l.rotation.z = 0.12 * Math.sin(ph * 2 + i));
    carry.position.set(0, 0.08 * Math.abs(Math.sin(ph * 2)), -2.2 + 0.25 * Math.sin(ph));
    B.pose({ lean: -0.35, headPitch: 0.15, armL: { fwd: -0.3, out: 0.25, elbow: 1.2 }, armR: { fwd: -0.3, out: 0.25, elbow: 1.2 } });
    G.pose({ lean: -0.25, headPitch: 0.05, headYaw: 0.4 * Math.sin(ph), armL: { fwd: 1.3, out: -0.25, elbow: 1.0 }, armR: { fwd: 1.3, out: -0.25, elbow: 1.0 } });
  };
}
