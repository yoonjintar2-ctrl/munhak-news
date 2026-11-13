// 11/13 오늘의 문장 — 현진건 「운수 좋은 날」: 비 오는 골목, 설렁탕 그릇을 품은 인력거꾼이 집 쪽 불빛을 바라본다
export const secs = 3;
export const opts = { bg: 0x8a8a88, fog: [0x8c8c8a, 18, 70] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#a7a7a2', line: '#a19f9a', tiles: 4, repeat: 6 });
  // 골목 양쪽 담장 + 기와 지붕
  const roof = (x, z, w, d, y, rot = 0) => {
    const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = rot; scene.add(g);
    const sh = new THREE.Shape(); sh.moveTo(-d / 2 - 0.8, 0); sh.quadraticCurveTo(0, 0.9, 0, 2.2); sh.quadraticCurveTo(0, 0.9, d / 2 + 0.8, 0); sh.lineTo(-d / 2 - 0.8, 0);
    const m = K.inked(new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: w, bevelEnabled: false }), K.lam(0x3a3a3a)), 30);
    m.rotation.y = Math.PI / 2; m.position.x = -w / 2; g.add(m); return g; };
  // 왼쪽 집(가까운 쪽) — 창호 불빛
  K.box(0.8, 4.2, 22, 0x9b9b96, -6.5, 2.1, -6, scene);
  roof(-6.5, -6, 22, 2.4, 4.2, Math.PI / 2);
  // 오른쪽 집: 대문과 창호지 문(불빛)
  K.box(0.8, 4.2, 22, 0x9b9b96, 6.5, 2.1, -6, scene);
  roof(6.5, -6, 22, 2.4, 4.2, Math.PI / 2);
  const door = K.box(0.2, 2.6, 2.0, 0x5a5a58, 6.05, 1.3, -3.2, scene);
  const paper = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.2), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  paper.position.set(-6.08, 2.7, -1.2); paper.rotation.y = Math.PI / 2; scene.add(paper);
  K.line([[-6.07, 2.1, -0.4], [-6.07, 3.3, -0.4]], scene); K.line([[-6.07, 2.1, -2.0], [-6.07, 3.3, -2.0]], scene); K.line([[-6.07, 2.7, -0.4], [-6.07, 2.7, -2.0]], scene); K.line([[-6.07, 2.1, -1.2], [-6.07, 3.3, -1.2]], scene);
  // 막다른 골목 끝 담
  K.box(14, 4.6, 0.8, 0x8f8f8a, 0, 2.3, -17, scene); roof(0, -17, 14, 1.6, 4.6, 0);
  // 빈 인력거 (바퀴 둘, 좌석, 채)
  const rk = new THREE.Group(); rk.position.set(3.2, 0, -5.5); rk.rotation.y = -0.6; scene.add(rk);
  [-0.95, 0.95].forEach(sx => { const w = K.inked(new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.07, 6, 28), K.lam(0x222222)), 10); w.position.set(sx, 1.05, 0); w.rotation.y = Math.PI / 2; rk.add(w);
    for (let i = 0; i < 6; i++) { const sp = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.0), K.lam(0x333333)); sp.position.set(sx, 1.05, 0); sp.rotation.x = i * Math.PI / 6; rk.add(sp); } });
  K.box(1.8, 0.25, 1.1, 0x4a4a4a, 0, 1.35, 0.2, rk); K.box(1.8, 1.2, 0.18, 0x3a3a3a, 0, 1.95, 0.75, rk);
  const hood = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 1.9, 16, 1, true, 0, Math.PI), new THREE.MeshLambertMaterial({ color: 0x2e2e2e, side: THREE.DoubleSide })), 30);
  hood.rotation.z = Math.PI / 2; hood.position.set(0, 2.4, 0.5); hood.scale.set(1, 1, 0.7); rk.add(hood);
  [-0.8, 0.8].forEach(sx => { const s = K.cyl(0.05, 0.05, 3.4, 0x333333, sx, 0.7, -1.6, rk, 6); s.rotation.x = Math.PI / 2 - 0.3; });
  // 인력거꾼: 설렁탕 그릇을 두 손으로 품었다가, 고개를 들어 불 켜진 창을 본다
  const P = K.person(scene, { x: 0.4, z: 1.6, rot: 1.25, coat: 0x7a7a76, pants: 0x3a3a38, hair: 'short' });
  const bowl = new THREE.Group(); P.torso.add(bowl); bowl.position.set(0, 0.95, -0.72);
  K.cyl(0.42, 0.28, 0.32, 0xe9e6dd, 0, 0, 0, bowl, 20);
  const cloth = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.44, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0xbdb9ae)), 30); cloth.position.y = 0.14; cloth.scale.y = 0.55; bowl.add(cloth);
  const knot = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), K.lam(0xbdb9ae)); knot.position.y = 0.38; bowl.add(knot);
  // 김 (그릇에서 피어오르는 흰 김)
  const steam = []; for (let i = 0; i < 3; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })); P.torso.add(s); steam.push(s); }
  // 비: 위에서 아래로 정수 바퀴만큼 떨어져 끊김 없이 반복
  const N = 120, H = 12; const rs = [];
  const rg = new THREE.BufferGeometry(); const pos = new Float32Array(N * 6);
  for (let i = 0; i < N; i++) rs.push({ x: (Math.random() - 0.5) * 14, z: -14 + Math.random() * 20, y0: Math.random() * H, k: 2 + (i % 2) });
  rg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const rain = new THREE.LineSegments(rg, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })); scene.add(rain);
  cam.position.set(1.2, 3.1, 10.2); cam.lookAt(-0.6, 2.6, -2.5);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    rs.forEach((r, i) => { const y = H - ((r.y0 + r.k * u * H) % H); pos.set([r.x, y, r.z, r.x - 0.05, y + 0.55, r.z], i * 6); });
    rg.attributes.position.needsUpdate = true;
    const look = K.win(ph, 0.3, 0.82, 0.14);
    P.pose({ headPitch: -0.55 * (1 - look) + 0.12 * look, headYaw: 0.1 * look, torsoYaw: 0.05 * look, lean: 0.1 * (1 - look),
      armL: { fwd: 0.95, out: -0.25, elbow: -0.95 }, armR: { fwd: 0.95, out: -0.25, elbow: -0.95 }, bob: Math.sin(ph * 2) * 0.015 });
    steam.forEach((s, i) => { const v = ((u * 2 + i / 3) % 1); s.position.set(Math.sin(v * 6 + i) * 0.12, 1.45 + v * 1.1, -0.72); s.scale.setScalar(0.35 + v * 0.9); s.material.opacity = 0.5 * (1 - v); });
    paper.material.color.setScalar(0.88 + 0.12 * Math.sin(ph * 3) * Math.sin(ph * 5 + 1));
  };
}
