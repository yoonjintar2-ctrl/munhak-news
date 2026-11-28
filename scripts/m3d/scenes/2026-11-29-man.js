// 11/29 오늘의 사나이 한수안(3D 삽화, 실제 인물 아님): 1948년 실내 경기장 권투 링. 짧은 운동복의 플라이급 선수가 글러브를 올려 자세를 잡고 가볍게 스텝, 링 로프·코너 기둥, 셔츠·조끼 심판이 옆에서 지켜본다. 관중 박수·천장 조명 흔들림·현수 깃발. 세로 720×860. 선수 얼굴은 카메라 쪽 비스듬히(rot ≈ π), 얼굴 세부 없음
export const secs = 3;
export const opts = { bg: 0xe4e2dc, fog: [0xe0ded8, 30, 90], fov: 40, w: 720, h: 860 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(60, 0.2, 40, 0xc8c4bb, 0, -0.1, 0, scene);
  K.box(7.6, 0.9, 7.6, 0x8a8782, 0, 0.45, 0, scene); const can = K.box(7.2, 0.06, 7.2, 0xeeece6, 0, 0.93, 0, scene);
  [[-3.5, -3.5], [3.5, -3.5], [-3.5, 3.5], [3.5, 3.5]].forEach(([x, z]) => K.cyl(0.12, 0.12, 2.2, 0x2a2a28, x, 2.0, z, scene, 8));
  [1.5, 2.1, 2.7].forEach(y => { K.line([[-3.5, y, -3.5], [3.5, y, -3.5]], scene); K.line([[-3.5, y, -3.5], [-3.5, y, 3.5]], scene); K.line([[3.5, y, -3.5], [3.5, y, 3.5]], scene); K.box(7.0, 0.05, 0.05, 0xfbfaf6, 0, y, 3.5, scene); });
  K.box(0.5, 0.6, 0.5, 0x45443f, -3.0, 1.25, 3.0, scene); // 코너 의자
  const crowd = []; for (let r = 0; r < 4; r++) { K.box(40, 1.0, 1.6, 0xb0aca4, 0, 0.5 + r * 1.1, -8 - r * 1.8, scene);
    for (let i = 0; i < 20; i++) { const g = new THREE.Group(); g.position.set(-15 + i * 1.6 + (r % 2) * 0.8, 1.0 + r * 1.1, -8 - r * 1.8); scene.add(g); const c = [0x6e6c66, 0x55534e, 0x8a8782][(i + r) % 3];
      const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 0.45, 4, 8), K.lam(c)); b.position.y = 0.45; g.add(b); const h = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), K.lam(0xdcd6ce)); h.position.y = 1.25; g.add(h);
      if ((i + r) % 3 === 0) { const hs = [-1, 1].map(sx => { const a = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 4), K.lam(0xdcd6ce)); a.position.set(0.18 * sx, 0.9, 0.35); g.add(a); return a; }); crowd.push({ hs, k: i * 0.9 + r }); } } }
  const lamps = []; [-3, 0, 3].forEach((x, i) => { const g = new THREE.Group(); g.position.set(x, 9, -1); scene.add(g); K.cyl(0.02, 0.02, 1.6, 0x2a2a28, 0, -0.8, 0, g, 4); const sh = K.cyl(0.2, 0.7, 0.5, 0x2a2a28, 0, -1.8, 0, g, 12); const b = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff })); b.position.y = -2.05; g.add(b); lamps.push({ g, k: i }); });
  const banners = []; [-5, 5].forEach((x, i) => { const f = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 3, 2, 6), new THREE.MeshLambertMaterial({ color: i ? 0x55534e : 0xeeece6, side: THREE.DoubleSide })); f.position.set(x, 8, -14); scene.add(f); banners.push({ f, k: i }); });
  const A = K.athlete(scene, { x: 0, z: 0.4, rot: Math.PI - 0.35, kind: 'boxer', top: 0x2a2a28, bottom: 0x2a2a28, gear: 0x3a3936 });
  A.root.position.y = 0.95;
  const R = K.person(scene, { x: 2.3, z: -1.8, rot: Math.PI + 0.5, coat: 0xf2f0ea, outfit: 'vest', sleeve: 0xf6f5f1, pants: 0x2a2a28, hair: 'short', eyes: 'dot', brows: 'stern', mouth: 'open', seed: 2921, scale: 0.9 });
  cam.position.set(0.3, 4.0, 11.0); cam.lookAt(0.2, 3.2, -0.4);
  return (t, ph) => {
    const s = Math.sin(ph * 2);
    A.pose({ lean: 0.15 + 0.03 * s, torsoYaw: 0.15 * s, headPitch: 0.05, armL: { fwd: 1.5 + 0.25 * Math.max(0, Math.sin(ph * 2)), elbow: 2.0 - 0.8 * Math.max(0, Math.sin(ph * 2)), out: 0.15 }, armR: { fwd: 1.3, elbow: 2.2, out: 0.1 }, legL: { fwd: 0.25, knee: 0.3 }, legR: { fwd: -0.3, knee: 0.35 }, bob: 0.06 * Math.abs(Math.sin(ph * 4)) });
    A.root.position.x = 0.15 * s; A.root.position.y = 0.95;
    R.pose({ headYaw: -0.5, armR: { fwd: 0.6, elbow: 0.8, out: 0.2 }, armL: { fwd: 0.3, elbow: 0.6 }, bob: 0.95 });
    crowd.forEach(o => { const c = Math.max(0, Math.sin(ph * 6 + o.k)); o.hs[0].position.x = -0.18 + 0.1 * c; o.hs[1].position.x = 0.18 - 0.1 * c; });
    lamps.forEach(o => { o.g.rotation.z = 0.03 * Math.sin(ph + o.k); });
    banners.forEach(o => { o.f.rotation.y = 0.15 * Math.sin(ph * 2 + o.k); });
  };
}
