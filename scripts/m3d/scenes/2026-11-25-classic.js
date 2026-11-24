// 11/25 1분 고전 이태준 「달밤」 대표: 성북동 기와집 대문 앞 밤. 머리 큰 신문 배달꾼(수건, 옆구리에 신문 뭉치)이 신이 나서 손짓하며 떠들고, 대문가의 주인('나', 저고리)이 웃으며 듣는다. 둥근 달, 처마 등불 흔들림, 지는 나뭇잎. 밤이지만 달빛·등불로 밝게. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xd8d6d0, fog: [0xd4d2cc, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cdcac2', line: '#c6c3bb', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2521, near: false });
  hanokGate(K, scene, 0);
  // 달
  const moon = new THREE.Mesh(new THREE.CircleGeometry(1.4, 32), K.flat(0xfbfaf6)); moon.position.set(-6, 9.5, -22); scene.add(moon);
  const halo = new THREE.Mesh(new THREE.CircleGeometry(2.4, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })); halo.position.set(-6, 9.5, -22.1); scene.add(halo);
  // 처마 등
  const lantern = new THREE.Group(); lantern.position.set(1.6, 3.2, -2.6); scene.add(lantern);
  K.line([[0, 0, 0], [0, -0.5, 0]], lantern); const lb = K.cyl(0.25, 0.25, 0.5, 0xf2f0ea, 0, -0.8, 0, lantern, 12);
  // 나무 + 낙엽
  const tr = new THREE.Group(); tr.position.set(-4.6, 0, -3.5); scene.add(tr); K.cyl(0.2, 0.3, 3.6, 0x45443f, 0, 1.8, 0, tr, 8);
  const cr = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.6, 14, 10), K.lam(0x8a8782)), 70); cr.position.y = 4.0; tr.add(cr);
  const leaves = []; for (let i = 0; i < 12; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.14), new THREE.MeshLambertMaterial({ color: 0x55534e, side: THREE.DoubleSide })); scene.add(m); leaves.push({ m, k: i / 12 }); }
  // 수건(머리 크게, 신문 뭉치)
  const S = K.person(scene, { x: -1.2, z: -0.6, rot: 2.3, coat: 0x6e6c66, pants: 0x3a3936, hair: 'short', scale: 0.95 });
  S.headG.scale.setScalar(1.3);
  const papers = new THREE.Group(); K.box(0.7, 0.35, 0.5, 0xeeece6, 0, 0, 0, papers); K.box(0.72, 0.04, 0.52, 0x8a8782, 0, 0.05, 0, papers);
  S.hold('L', papers, { at: [0.15, 0.05, -0.1], rot: [0, 0.3, 0] });
  // 주인(대문가, 저고리)
  const O = K.person(scene, { x: 1.0, z: -1.6, rot: -2.4, coat: 0x9a978f, pants: 0x45443f, hair: 'short', scale: 1.0 });
  cam.position.set(-0.4, 2.6, 7.2); cam.lookAt(-0.1, 1.8, -1.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), g = Math.sin(ph * 3);
    S.pose({ headYaw: 0.35 + 0.15 * Math.sin(ph * 2), headTilt: 0.1 * g, bob: 0.03 * Math.abs(g), armR: { fwd: 1.0 + 0.5 * g, elbow: 0.9 - 0.4 * g, out: 0.25 }, armL: { fwd: 0.4, elbow: 1.3 } });
    O.pose({ headYaw: -0.2, headPitch: -0.05 + 0.06 * Math.sin(ph * 2), headTilt: 0.08 * Math.sin(ph), armL: { fwd: 0.3, elbow: 1.0 }, armR: { fwd: 0.3, elbow: 1.0 } });
    lantern.rotation.z = 0.12 * Math.sin(ph * 2); lb.material.color.setScalar(0.92 + 0.06 * Math.sin(ph * 6));
    leaves.forEach(o => { const v = (o.k + u) % 1; o.m.position.set(-4.6 + v * 3 + 0.3 * Math.sin(ph * 2 + o.k * 9), 4.2 - v * 4.1, -3 + o.k); o.m.rotation.set(ph * 2 + o.k * 5, ph + o.k, 0); });
  };
}
// 기와 담장 + 대문(지붕 얹은)
function hanokGate(K, scene, cx) {
  const { THREE } = K;
  K.box(4.2, 2.0, 0.4, 0xd8d5cd, cx - 2.6, 1.0, -3.4, scene); K.box(4.2, 2.0, 0.4, 0xd8d5cd, cx + 4.6, 1.0, -3.4, scene);
  [-2.6, 4.6].forEach(x => { const c = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 4.4, 10, 1, false, 0, Math.PI), K.lam(0x55534e)), 30); c.rotation.z = Math.PI / 2; c.position.set(cx + x, 2.05, -3.4); scene.add(c); });
  K.box(0.25, 2.8, 0.3, 0x45443f, cx + 0.3, 1.4, -3.3, scene); K.box(0.25, 2.8, 0.3, 0x45443f, cx + 2.2, 1.4, -3.3, scene);
  K.box(0.9, 2.3, 0.08, 0x6e6c66, cx + 0.8, 1.15, -3.35, scene); const dr = K.box(0.9, 2.3, 0.08, 0x6e6c66, cx + 1.7, 1.15, -3.0, scene); dr.rotation.y = -0.6;
  const rf = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.01, 1.9, 0.9, 4, 1), K.lam(0x45443f)), 30); rf.rotation.y = Math.PI / 4; rf.scale.set(1.0, 1, 0.55); rf.position.set(cx + 1.25, 3.2, -3.3); scene.add(rf);
  // 집채 지붕선(담 너머)
  const rr = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.01, 4.5, 1.6, 4, 1), K.lam(0x55534e)), 30); rr.rotation.y = Math.PI / 4; rr.scale.set(1.4, 1, 0.5); rr.position.set(cx + 4.0, 3.2, -6.5); scene.add(rr);
  K.box(6, 2.4, 2.4, 0xe2dfd7, cx + 4.0, 1.2, -6.5, scene);
}
