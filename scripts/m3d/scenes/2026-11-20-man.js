// 11/20 오늘의 사나이 황영조(1992 바르셀로나 올림픽 마라톤 금): 몬주익 언덕 오르막을 달려 올라오는 마라토너(러닝 셔츠·반바지, 얼굴 세부 없음). 진행 방향 +z(카메라 쪽), 선수 rot ≈ π. 길바닥 표시선·관중은 -z 쪽으로 흐른다(카메라에서 멀어짐) → 선수가 다가오는 것으로 읽힘. 길가 관중이 손을 흔들고 깃발(무늬·글자 없음)이 펄럭인다. 카메라 고정(세로)
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 90], fov: 40, w: 720, h: 860 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'country', seed: 121, near: false });
  // 오르막 도로(뒤로 갈수록 높아짐)
  const road = new THREE.Group(); road.rotation.x = -0.12; scene.add(road);
  K.box(7, 0.2, 80, 0xd4d1c9, 0, -0.1, -30, road); K.box(3, 0.22, 80, 0xbcb9b1, -6, -0.1, -30, road); K.box(3, 0.22, 80, 0xbcb9b1, 6, -0.1, -30, road);
  const dashes = []; for (let i = 0; i < 14; i++) { const d = K.box(0.25, 0.04, 1.6, 0xfbfaf6, 0, 0.02, 0, road); dashes.push({ d, k: i / 14 }); }
  // 관중(양옆)
  const fans = []; for (let i = 0; i < 26; i++) { const sd = i % 2 ? 1 : -1, g = new THREE.Group(); road.add(g); const c = [0x6a6863, 0x8a8782, 0x55534e][i % 3];
    const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 0.8, 4, 8), K.lam(c)); b.position.y = 0.9; g.add(b); const h = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), K.lam(0xdcd6ce)); h.position.y = 1.85; g.add(h);
    const a = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.7, 3, 6), K.lam(c)); a.position.set(-sd * 0.45, 1.9, 0); g.add(a); fans.push({ g, a, sd, k: (i * 0.077) % 1 }); }
  // 깃발 기둥(무늬 없음)
  const flags = []; for (let i = 0; i < 6; i++) { const sd = i % 2 ? 1 : -1; K.cyl(0.06, 0.06, 5, 0x55534e, sd * 7.5, 2.5, -6 - i * 7, road, 6); const f = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.9, 6, 1), new THREE.MeshLambertMaterial({ color: [0xf6f4ee, 0x8a8782][i % 2], side: THREE.DoubleSide })); f.position.set(sd * 7.5 - sd * 0.7, 4.4, -6 - i * 7); road.add(f); flags.push(f); }
  // 언덕 위 경기장(먼 원통)
  K.cyl(9, 10, 4, 0xd8d5cd, 0, 6, -70, scene, 30);
  const A = K.athlete(scene, { x: 0, z: 1.0, rot: Math.PI, kind: 'runner', scale: 1.0, top: 0xf2f0ea, bottom: 0x2a2a2a });
  K.box(0.9, 0.6, 0.02, 0xfbfaf6, 0, 1.1, -0.42, A.torso); // 번호표(무늬 없음)
  cam.position.set(0.6, 3.6, 14.5); cam.lookAt(0.0, 2.3, -2.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), s = Math.sin(ph * 4), c = Math.cos(ph * 4);
    A.pose({ lean: -0.15, headPitch: -0.05, bob: 0.12 * Math.abs(c), armL: { fwd: 0.6 * s, out: 0.05, elbow: 1.5 }, armR: { fwd: -0.6 * s, out: 0.05, elbow: 1.5 },
      legL: { fwd: -0.7 * s, knee: 0.3 + 0.8 * Math.max(0, s) }, legR: { fwd: 0.7 * s, knee: 0.3 + 0.8 * Math.max(0, -s) } });
    dashes.forEach(o => { const v = (o.k + u * 2) % 1; o.d.position.z = 8 - v * 56; });
    fans.forEach(o => { const v = (o.k + u * 2) % 1; o.g.position.set(o.sd * (5.4 + (o.k * 3) % 1.2), 0, 8 - v * 56); o.a.rotation.z = o.sd * (0.3 + 0.3 * Math.sin(ph * 6 + o.k * 20)); });
    flags.forEach((f, i) => { const pos = f.geometry.attributes.position; for (let j = 0; j < pos.count; j++) { const x = pos.getX(j); pos.setZ(j, 0.15 * Math.sin(ph * 4 + x * 4 + i)); } pos.needsUpdate = true; });
  };
}
