// 11/25 1분 현대문학 하루키 「100퍼센트의 여자아이」 대표: 봄날 아침 도쿄 뒷골목, 꽃집 앞에서 남녀가 엇갈려 지나친다. 사내는 +x(오른쪽)로 걷는 중 rot -2.0(오른쪽 앞) 이면서 고개를 왼쪽 뒤로 돌려 여자를 돌아보고, 여자는 -x(왼쪽)로 걷는 중 rot 2.0. 꽃집 화분 꽃 흔들림·꽃잎·비둘기. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d5cd', line: '#d0cdc5', tiles: 4, repeat: 5 });
  K.backdrop(scene, { kind: 'city', seed: 2531 });
  // 골목 양옆 낮은 건물 + 꽃집
  K.box(5, 4.2, 3, 0xe2dfd7, -5.2, 2.1, -5, scene); K.box(4.4, 5.0, 3, 0xd0cdc5, 4.6, 2.5, -5.2, scene);
  K.box(4.2, 2.6, 0.1, 0x6e6c66, -5.2, 1.3, -3.45, scene); K.box(3.8, 2.0, 0.08, 0xf2f0ea, -5.2, 1.5, -3.38, scene);
  const awn = K.box(4.6, 0.12, 1.4, 0x55534e, -5.2, 2.9, -2.9, scene); awn.rotation.x = 0.25;
  const flowers = [];
  for (let i = 0; i < 6; i++) { const x = -7 + i * 0.75; K.cyl(0.25, 0.2, 0.45, 0x8a8782, x, 0.22, -2.6, scene, 10); const st = new THREE.Group(); st.position.set(x, 0.45, -2.6); scene.add(st); K.cyl(0.02, 0.02, 0.6, 0x45443f, 0, 0.3, 0, st, 5); const f = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), K.lam([0xf2f0ea, 0xbcb9b1, 0xd8d5cd][i % 3])), 50); f.position.y = 0.65; st.add(f); flowers.push(st); }
  // 자전거(소품), 자판기, 전봇대
  const bk = new THREE.Group(); bk.position.set(3.4, 0, -3.2); bk.rotation.y = 0.2; scene.add(bk);
  [-0.6, 0.6].forEach(x => { const w = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.04, 6, 20), K.lam(0x2f2e2b)); w.position.set(x, 0.4, 0); bk.add(w); });
  K.line([[-0.6, 0.4, 0], [0, 0.8, 0], [0.6, 0.4, 0], [0.1, 0.4, 0], [-0.6, 0.4, 0]], bk); K.line([[0, 0.8, 0], [0.5, 1.05, 0]], bk);
  K.box(0.9, 1.8, 0.7, 0xbcb9b1, 6.2, 0.9, -3.3, scene); K.box(0.6, 0.6, 0.05, 0x55534e, 6.2, 1.3, -2.93, scene);
  K.cyl(0.1, 0.12, 6.5, 0x45443f, 1.6, 3.25, -4.2, scene, 8); K.box(1.4, 0.1, 0.1, 0x45443f, 1.6, 6.2, -4.2, scene);
  // 두 사람
  const M = K.person(scene, { x: 0.9, z: -0.6, rot: -2.3, coat: 0x45443f, pants: 0x2f2e2b, hair: 'short', scale: 1.0 });
  const W = K.person(scene, { x: -1.4, z: -1.3, rot: 2.3, coat: 0xbcb9b1, pants: 0x55534e, hair: 'long', scale: 0.92, scarf: 0x55534e });
  const bird = K.bird(scene, { cx: 0, cy: 6.0, cz: -6, rx: 7, rz: 2, s: 0.6 });
  const pet = []; for (let i = 0; i < 14; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.07), new THREE.MeshLambertMaterial({ color: 0x8a8782, side: THREE.DoubleSide })); scene.add(m); pet.push({ m, k: i / 14 }); }
  cam.position.set(-0.2, 2.3, 6.6); cam.lookAt(-0.4, 1.9, -1.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), st = Math.sin(ph * 4), look = K.win(ph, 0.25, 0.85, 0.15);
    M.pose({ bob: 0.05 * Math.abs(st), headYaw: -1.3 * look, torsoYaw: -0.35 * look, armL: { fwd: 0.3 * st }, armR: { fwd: -0.3 * st } });
    W.pose({ bob: 0.05 * Math.abs(Math.cos(ph * 4)), headYaw: 0.1, headPitch: -0.1, armL: { fwd: -0.25 * st }, armR: { fwd: 0.25 * st } });
    M.root.position.x = 0.9 + 0.35 * Math.sin(ph); W.root.position.x = -1.4 - 0.35 * Math.sin(ph);
    flowers.forEach((f, i) => { f.rotation.z = 0.15 * Math.sin(ph * 2 + i); });
    bird.update(ph);
    pet.forEach(o => { const v = (o.k + u) % 1; o.m.position.set(-6 + v * 10, 5 - v * 4.8 + 0.3 * Math.sin(ph * 3 + o.k * 9), -2 + o.k * 2); o.m.rotation.set(ph * 3 + o.k * 7, ph * 2, o.k); });
  };
}
