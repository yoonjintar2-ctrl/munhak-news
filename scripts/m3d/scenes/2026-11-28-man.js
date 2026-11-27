// 11/28 오늘의 사나이 장창선(3D 삽화, 실제 인물 아님): 1960년대 체육관 레슬링 매트. 두 자유형 선수가 어깨를 맞대고 맞잡아 겨루고, 흰 셔츠·나비넥타이(조끼) 심판이 옆에서 손을 든다. 관중 박수·천장 조명 흔들림·현수 깃발. 세로 720×860. 선수 얼굴은 옆모습(rot ±π/2 근처), 얼굴 세부 없음
export const secs = 3;
export const opts = { bg: 0xe4e2dc, fog: [0xe0ded8, 30, 90], fov: 40, w: 720, h: 860 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(60, 0.2, 40, 0xc8c4bb, 0, -0.1, 0, scene);
  const mat = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.4, 0.25, 40), K.lam(0x8a8782)); mat.position.y = 0.12; scene.add(mat);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.06, 6, 48), K.lam(0xfbfaf6)); ring.rotation.x = Math.PI / 2; ring.position.y = 0.26; scene.add(ring);
  const crowd = []; for (let r = 0; r < 4; r++) { K.box(40, 1.0, 1.6, 0xb0aca4, 0, 0.5 + r * 1.1, -8 - r * 1.8, scene);
    for (let i = 0; i < 20; i++) { const g = new THREE.Group(); g.position.set(-15 + i * 1.6 + (r % 2) * 0.8, 1.0 + r * 1.1, -8 - r * 1.8); scene.add(g); const c = [0x6e6c66, 0x55534e, 0x8a8782][(i + r) % 3];
      const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 0.45, 4, 8), K.lam(c)); b.position.y = 0.45; g.add(b); const h = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), K.lam(0xdcd6ce)); h.position.y = 1.25; g.add(h);
      if ((i + r) % 3 === 0) { const hs = [-1, 1].map(sx => { const a = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 4), K.lam(0xdcd6ce)); a.position.set(0.18 * sx, 0.9, 0.35); g.add(a); return a; }); crowd.push({ hs, k: i * 0.9 + r }); } } }
  const lamps = []; [-3, 0, 3].forEach((x, i) => { const g = new THREE.Group(); g.position.set(x, 9, -1); scene.add(g); K.cyl(0.02, 0.02, 1.6, 0x2a2a28, 0, -0.8, 0, g, 4); const sh = K.cyl(0.2, 0.7, 0.5, 0x2a2a28, 0, -1.8, 0, g, 12); const b = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff })); b.position.y = -2.05; g.add(b); lamps.push({ g, k: i }); });
  const banners = []; [-5, 5].forEach((x, i) => { const f = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 3, 2, 6), new THREE.MeshLambertMaterial({ color: i ? 0x55534e : 0xeeece6, side: THREE.DoubleSide })); f.position.set(x, 8, -14); scene.add(f); banners.push({ f, k: i }); });
  const A = K.athlete(scene, { x: -0.72, z: 0.3, rot: -Math.PI / 2 - 0.25, kind: 'fighter', top: 0x3a3936, bottom: 0x3a3936, gear: 0xd9d2c8 });
  const Bt = K.athlete(scene, { x: 0.72, z: 0.3, rot: Math.PI / 2 + 0.25, kind: 'fighter', top: 0x8a8782, bottom: 0x8a8782, skin: 0xd2cbc0, gear: 0xd2cbc0 });
  const R = K.person(scene, { x: 2.3, z: -2.0, rot: Math.PI + 0.5, coat: 0xf2f0ea, outfit: 'vest', sleeve: 0xf6f5f1, pants: 0x2a2a28, hair: 'short', eyes: 'dot', brows: 'stern', mouth: 'open', seed: 2921, scale: 0.9 });
  cam.position.set(0.2, 3.4, 11.0); cam.lookAt(0.2, 2.3, -0.6);
  return (t, ph) => {
    const s = Math.sin(ph * 2);
    A.pose({ lean: 0.55 + 0.05 * s, torsoYaw: 0.05 * s, headPitch: -0.35, armL: { fwd: 0.9, elbow: 0.7, out: 0.1 }, armR: { fwd: 0.8, elbow: 0.9, out: -0.1 }, legL: { fwd: 0.4, knee: 0.6 }, legR: { fwd: -0.5, knee: 0.3 } });
    Bt.pose({ lean: 0.55 - 0.05 * s, torsoYaw: -0.05 * s, headPitch: -0.35, armL: { fwd: 0.8, elbow: 0.9, out: -0.1 }, armR: { fwd: 0.9, elbow: 0.7, out: 0.1 }, legL: { fwd: -0.5, knee: 0.3 }, legR: { fwd: 0.4, knee: 0.6 } });
    A.root.position.x = -0.72 + 0.12 * s; Bt.root.position.x = 0.72 + 0.12 * s;
    R.pose({ headYaw: -0.5, armR: { fwd: 2.2, elbow: 0.2, out: 0.2 }, armL: { fwd: 0.3, elbow: 0.6 } });
    crowd.forEach(o => { const c = Math.max(0, Math.sin(ph * 6 + o.k)); o.hs[0].position.x = -0.18 + 0.1 * c; o.hs[1].position.x = 0.18 - 0.1 * c; });
    lamps.forEach(o => { o.g.rotation.z = 0.03 * Math.sin(ph + o.k); });
    banners.forEach(o => { o.f.rotation.y = 0.15 * Math.sin(ph * 2 + o.k); });
  };
}
