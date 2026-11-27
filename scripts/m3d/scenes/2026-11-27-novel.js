// 11/27 오늘의 소설 구절 『도리언 그레이의 초상』 제2장: 화가의 작업실. 이젤 위 커다란 초상화(얼굴 없는 인물 실루엣) 앞에서 콧수염의 신사(양복·지팡이)가 몸을 기울여 곱슬머리 청년(조끼)에게 속삭이고, 청년은 고개를 돌려 그림을 본다. 담배 연기·창밖 라일락 가지 흔들림. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeae8e2, fog: [0xe6e4de, 30, 90], fov: 44 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2731 });
  K.box(40, 0.2, 20, 0xd4d0c7, 0, -0.1, 0, scene);
  // 이젤 + 초상화
  const ez = new THREE.Group(); ez.position.set(-2.6, 0, -2.6); ez.rotation.y = 0.35; scene.add(ez);
  [-0.8, 0.8].forEach(x => { const l = K.box(0.12, 5.4, 0.12, 0x45443f, x, 2.6, 0, ez); l.rotation.z = -x * 0.08; }); const bl = K.box(0.12, 5, 0.12, 0x45443f, 0, 2.4, 0.9, ez); bl.rotation.x = -0.3;
  K.box(2.4, 0.12, 0.4, 0x45443f, 0, 1.5, -0.05, ez);
  K.box(2.4, 3.0, 0.12, 0x3a3936, 0, 3.1, -0.12, ez); K.box(2.1, 2.7, 0.1, 0xc8c4bb, 0, 3.1, -0.2, ez);
  const fig = new THREE.Mesh(new THREE.CircleGeometry(0.4, 18), K.flat(0x6e6c66)); fig.position.set(0, 3.6, -0.26); fig.rotation.y = Math.PI; ez.add(fig);
  const sh = new THREE.Mesh(new THREE.CircleGeometry(0.85, 18, 0, Math.PI), K.flat(0x55534e)); sh.position.set(0, 2.2, -0.26); sh.rotation.y = Math.PI; ez.add(sh);
  // 탁자·꽃병·소파
  K.cyl(0.9, 0.9, 0.1, 0x55534e, 3.2, 1.5, -1.5, scene, 20); K.cyl(0.12, 0.2, 1.5, 0x45443f, 3.2, 0.75, -1.5, scene, 10);
  K.cyl(0.18, 0.25, 0.6, 0xeeece6, 3.0, 1.85, -1.5, scene, 12);
  const fl = []; for (let i = 0; i < 5; i++) { const f = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), K.lam(0x8a8782)); f.position.set(2.85 + (i % 3) * 0.15, 2.3 + (i % 2) * 0.2, -1.5 + (i - 2) * 0.08); scene.add(f); fl.push(f); }
  K.box(3.6, 0.8, 1.4, 0x6e6c66, 4.6, 0.6, -4.8, scene); K.box(3.6, 1.4, 0.4, 0x5e5c57, 4.6, 1.4, -5.4, scene);
  // 창밖 라일락 가지
  const lil = new THREE.Group(); lil.position.set(6, 6.2, -6.6); scene.add(lil); const lb = K.box(3.2, 0.08, 0.02, 0x45443f, 0, 0, 0, lil); lb.rotation.z = -0.4;
  for (let i = 0; i < 6; i++) { const c = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.6, 8), K.lam(0x9a978f)); c.rotation.z = Math.PI; c.position.set(-1.2 + i * 0.5, 0.3 - i * 0.2 - 0.3, 0.05); lil.add(c); }
  const H = K.person(scene, { x: 0.6, z: -0.6, rot: Math.PI - 0.9, coat: 0x3a3936, pants: 0x2a2a28, outfit: 'suit', hair: 'short', beard: 'mustache', eyes: 'narrow', brows: 'up', mouth: 'smile', seed: 2732 });
  const cane = K.cyl(0.04, 0.04, 2.3, 0x1e1e1e, 0, -1.1, 0, null, 6); H.hold('R', cane, { at: [0, -0.1, 0], rot: [0, 0, 0] });
  const Dg = K.person(scene, { x: -0.7, z: 0.4, rot: Math.PI - 0.2, coat: 0xeeece6, sleeve: 0xf6f5f1, pants: 0x45443f, outfit: 'vest', hair: 'curly', eyes: 'wide', brows: 'worried', mouth: 'small', seed: 2733, scale: 0.97 });
  const cig = K.cyl(0.03, 0.03, 0.3, 0xf6f5f1, 0, 0, 0, null, 6); H.hold('L', cig, { at: [0, -0.1, -0.1], rot: [Math.PI / 2, 0, 0] });
  const smoke = []; for (let i = 0; i < 6; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfafaf8, transparent: true, opacity: 0.8 })); scene.add(s); smoke.push({ s, k: i / 6 }); }
  cam.position.set(1.2, 3.6, 8.5); cam.lookAt(-0.4, 2.6, -1.5);
  const v = new THREE.Vector3();
  return (t, ph) => {
    const k = 0.5 + 0.5 * Math.sin(ph);
    H.pose({ lean: 0.12 + 0.1 * k, headYaw: 0.5, headTilt: 0.15, armL: { fwd: 1.1, out: 0.1, elbow: 1.6 }, armR: { fwd: 0.2, elbow: 0.1 } });
    Dg.pose({ headYaw: -0.9 + 0.6 * k, torsoYaw: -0.2 * k, armL: { fwd: 0.2, elbow: 0.4 }, armR: { fwd: 0.4 + 0.3 * k, elbow: 1.0 } });
    cig.getWorldPosition(v); smoke.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.s.position.set(v.x + 0.2 * Math.sin(p * 6), v.y + 0.2 + p * 1.6, v.z); o.s.scale.setScalar(0.4 + p * 0.9); o.s.material.opacity = 0.6 * (1 - p); });
    lil.rotation.z = 0.06 * Math.sin(ph * 2); fl.forEach((f, i) => { f.position.y += 0.002 * Math.sin(ph * 3 + i); });
  };
}
