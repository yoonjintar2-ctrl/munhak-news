// 11/15 오늘의 시 「먼 후일」: 늦가을 강가 나루, 배웅하던 여인이 돌아서다 다시 강 쪽으로 고개를 돌린다. 강 위 나룻배는 제자리에서 출렁(진행 방향 없음), 갈대가 흔들리고 낙엽이 떨어진다
export const secs = 3;
export const opts = { bg: 0xedebe5, fog: [0xe7e5df, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d9d6cc', line: '#cac7bd', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'shore', seed: 61 });
  // 강물(가운데 띠) + 잔물결
  const water = new THREE.Mesh(new THREE.PlaneGeometry(80, 9), K.lam(0x8f8e88)); water.rotation.x = -Math.PI / 2; water.position.set(0, 0.03, -7); scene.add(water);
  const rip = []; for (let i = 0; i < 9; i++) { const r = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.06), K.flat(0xe6e5df)); r.rotation.x = -Math.PI / 2; scene.add(r); rip.push({ r, k: i / 9, z: -9.8 + (i % 4) * 1.5 }); }
  // 나루 말뚝 둘 + 나무 발판
  K.box(2.4, 0.18, 3.4, 0x75736c, -3.2, 0.25, -3.6, scene); [[-4.2, -5.2], [-2.2, -5.2]].forEach(([x, z]) => K.cyl(0.13, 0.13, 1.6, 0x4f4e4a, x, 0.6, z, scene, 8));
  // 나룻배(멀리, 사공 한 사람 — 노를 젓는 시늉, 떠나는 사람)
  const boat = new THREE.Group(); boat.position.set(2.8, 0.1, -6.2); scene.add(boat);
  K.box(3.2, 0.45, 1.1, 0x55544f, 0, 0.2, 0, boat); K.box(0.6, 0.3, 1.1, 0x55544f, 1.8, 0.35, 0, boat).rotation.z = 0.4;
  const G = K.person(boat, { x: -0.6, z: 0, rot: -Math.PI / 2, coat: 0x6f6e69, pants: 0x3e3e3b, hair: 'cap', scale: 0.8 });
  const oar = new THREE.Group(); oar.position.set(-0.6, 1.1, 0.4); boat.add(oar); K.cyl(0.04, 0.04, 2.4, 0x3a3a38, 0, -0.9, 0, oar, 6);
  // 갈대 무리(흔들림)
  const reeds = []; for (let i = 0; i < 14; i++) { const g = new THREE.Group(); g.position.set(-8 + (i % 7) * 0.5 + (i > 6 ? 12 : 0), 0, -2.6 - (i % 3) * 0.4); scene.add(g); K.cyl(0.03, 0.04, 1.5, 0x6a6964, 0, 0.75, 0, g, 5); const h = K.cyl(0.12, 0.05, 0.5, 0xe2e0d9, 0, 1.6, 0, g, 6); reeds.push({ g, k: i * 0.7 }); }
  // 감나무(오른쪽 앞, 가지 몇 개) + 떨어지는 잎
  K.cyl(0.22, 0.3, 3.6, 0x4a4945, 5.6, 1.8, -0.8, scene, 8);
  [[0.7, 3.2, 0.9], [-0.6, 3.4, -0.8], [0.2, 3.9, 0.3]].forEach(([a, y, r]) => { const b = K.cyl(0.07, 0.1, 1.8, 0x4a4945, 5.6 + a, y, -0.8, scene, 6); b.rotation.z = r; });
  [[6.2, 4.3], [5.0, 4.4], [5.7, 4.8]].forEach(([x, y]) => { const c = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.7, 10, 8), K.lam(0x8f8e88)), 60); c.position.set(x, y, -0.8); c.scale.y = 0.6; scene.add(c); });
  const leaves = []; for (let i = 0; i < 5; i++) { const l = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.14), new THREE.MeshLambertMaterial({ color: 0x55544f, side: THREE.DoubleSide })); scene.add(l); leaves.push({ l, k: i / 5, x: 4.6 + i * 0.45 }); }
  // 여인(왼쪽 앞, 강을 향했다가 돌아서고 다시 강을 돌아본다) — 머리 쪽진, 목도리
  const W = K.person(scene, { x: -1.8, z: 1.4, rot: 0.25, coat: 0x8a8882, pants: 0x4a4a47, hair: 'bun', scale: 1.0, scarf: 0xf2f0ea });
  cam.position.set(0.6, 3.2, 10.5); cam.lookAt(0.4, 2.0, -3);
  return (t, ph) => {
    rip.forEach(o => { const u = (o.k + ph / (Math.PI * 2)) % 1; o.r.position.set(-12 + u * 24, 0.05, o.z); });
    boat.position.y = 0.1 + 0.05 * Math.sin(ph * 2); boat.rotation.z = 0.03 * Math.sin(ph * 2 + 1);
    oar.rotation.z = 0.35 * Math.sin(ph * 2); G.pose({ lean: 0.1 + 0.1 * Math.sin(ph * 2), armL: { fwd: 0.9, elbow: 0.8 }, armR: { fwd: 0.9, elbow: 0.8 } });
    reeds.forEach(o => { o.g.rotation.z = 0.12 * Math.sin(ph * 2 + o.k) + 0.05; });
    leaves.forEach(o => { const u = (o.k + ph / (Math.PI * 2)) % 1; o.l.position.set(o.x - u * 1.6 + 0.2 * Math.sin(u * 12), 4.4 - u * 4.3, -0.4 + u * 0.8); o.l.rotation.set(u * 9, u * 5, u * 3); });
    // 0~0.35: 강을 바라봄 → 0.35~0.65: 돌아서며 고개 숙임 → 0.65~1: 다시 강 쪽으로 고개
    const away = K.win(ph, 0.3, 0.68, 0.1);
    W.pose({ torsoYaw: -0.9 * away, headYaw: -0.6 * away + 0.15 * K.win(ph, 0.7, 0.95, 0.08), headPitch: -0.3 * away - 0.05, armL: { fwd: 0.9, elbow: 1.6, out: -0.1 }, armR: { fwd: 0.9 + 0.15 * (1 - away), elbow: 1.6, out: -0.1 } });
  };
}
