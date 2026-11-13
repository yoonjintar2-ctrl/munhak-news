// 문학늬우스 마스코트 '연필이': 육각 연필 몸통(뾰족한 심이 머리), 몸통에 눈, 가는 팔다리
export function makePencil(K, { x = 0, y = 0, z = 0, s = 1 } = {}) {
  const { THREE, scene } = K;
  const root = new THREE.Group(); root.position.set(x, y, z); root.scale.setScalar(s); scene.add(root);
  const hip = new THREE.Group(); hip.position.y = 1.5; root.add(hip);          // 다리 위(몸 전체 회전·통통 튀기 기준)
  const body = new THREE.Group(); hip.add(body);
  // 몸통: 지우개(아래) → 쇠 띠 → 육각 몸통 → 깎인 나무 → 심(위)
  K.cyl(0.62, 0.62, 0.55, 0xf29aa6, 0, 0.27, 0, body, 24);                     // 지우개(분홍)
  K.cyl(0.66, 0.66, 0.42, 0xc9ccd1, 0, 0.75, 0, body, 24);                     // 쇠 띠
  [0.62, 0.88].forEach(y2 => K.cyl(0.675, 0.675, 0.05, 0x6f6f6b, 0, y2, 0, body, 24));
  const hex = K.cyl(0.68, 0.68, 3.4, 0xf7c325, 0, 2.66, 0, body, 6); hex.rotation.y = Math.PI / 6;
  const wood = new THREE.Mesh(new THREE.ConeGeometry(0.68, 1.2, 6, 1, true), K.lam(0xe8c9a0, { side: THREE.DoubleSide })); wood.position.y = 4.96; wood.rotation.y = Math.PI / 6; body.add(K.inked(wood));
  const lead = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.42, 12), K.lam(0x2a2a2a)); lead.position.y = 5.42; body.add(lead);
  // 눈(무광, 작은 흰 반사점 하나)
  const eyes = new THREE.Group(); eyes.position.set(0, 3.55, 0.62); body.add(eyes);
  const lids = [];
  [-0.26, 0.26].forEach(ex => {
    const w = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 14), K.lam(0xffffff)); w.scale.set(1, 1.25, 0.45); w.position.x = ex; eyes.add(w);
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), K.flat(0x111111)); p.scale.set(1, 1.2, 0.5); p.position.set(ex, -0.02, 0.09); eyes.add(p);
    const hl = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), K.flat(0xffffff)); hl.position.set(ex + 0.04, 0.05, 0.14); eyes.add(hl);
    const lid = new THREE.Mesh(new THREE.SphereGeometry(0.235, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0xf7c325)); lid.scale.set(1, 1.25, 0.5); lid.position.set(ex, 0, 0.005); lid.visible = false; eyes.add(lid); lids.push(lid);
  });
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.025, 8, 16, Math.PI), K.flat(0x111111)); mouth.rotation.z = Math.PI; mouth.position.set(0, 3.15, 0.66); body.add(mouth);
  // 팔: 어깨 → 위팔 → 팔꿈치 → 아래팔 → 손
  const arm = (sd) => {
    const sp = new THREE.Group(); sp.position.set(sd * 0.7, 2.75, 0); body.add(sp);
    K.cyl(0.05, 0.05, 1.0, 0x2b2b2b, 0, -0.5, 0, sp, 8);
    const el = new THREE.Group(); el.position.y = -1.0; sp.add(el);
    K.cyl(0.05, 0.05, 0.9, 0x2b2b2b, 0, -0.45, 0, el, 8);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 10), K.lam(0xffffff)); hand.position.y = -0.95; el.add(K.inked(hand));
    return { sp, el, sd };
  };
  const A = { L: arm(-1), R: arm(1) };
  // 다리
  const leg = (sd) => {
    const g = new THREE.Group(); g.position.set(sd * 0.3, 1.5, 0); root.add(g);
    K.cyl(0.055, 0.055, 1.4, 0x2b2b2b, 0, -0.7, 0, g, 8);
    const f = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 10), K.lam(0xffffff)); f.scale.set(1, 0.55, 1.5); f.position.set(0, -1.42, 0.12); g.add(K.inked(f));
    return g;
  };
  const Lg = { L: leg(-1), R: leg(1) };
  const setArm = (a, o = {}) => { a.sp.rotation.x = -(o.fwd || 0); a.sp.rotation.z = a.sd * (0.35 + (o.out || 0)); a.el.rotation.x = -Math.abs(o.elbow || 0); a.sp.rotation.y = a.sd * (o.twist || 0); };
  return {
    root, body, hip,
    pose({ lean = 0, side = 0, turn = 0, bob = 0, armL = {}, armR = {}, legL = 0, legR = 0, blink = 0, smile = 1, eyeBig = 1 } = {}) {
      hip.position.y = 1.5 + bob; body.rotation.x = lean; body.rotation.z = side; root.rotation.y = turn;
      setArm(A.L, armL); setArm(A.R, armR);
      Lg.L.rotation.x = legL; Lg.R.rotation.x = legR; Lg.L.position.y = Lg.R.position.y = 1.5 + Math.min(0, bob);
      eyes.scale.set(eyeBig, (blink > 0.5 ? 0.12 : 1) * eyeBig, 1);
      mouth.scale.set(1, smile, 1);
    },
  };
}
