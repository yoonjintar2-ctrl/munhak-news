// 11/21 카버 장면③(after ending): 한밤 빵집 안쪽 작업대 식탁. 앞치마 두른 빵집 주인이 따뜻한 롤빵 접시를 내밀고, 마주 앉은 부부(어머니 긴 머리·아버지)가 빵을 집어 든다. 롤빵에서 김이 오르고 천장 등이 흔들리며, 창밖은 어둠. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xd8d6d0, fog: [0xd4d2cc, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 311, night: true });
  K.box(10, 0.2, 7, 0xd8d5cd, 0, 0, -3, scene); K.box(10, 5, 0.3, 0xe8e6e0, 0, 2.5, -6.5, scene);
  // 오븐 + 선반 + 밀가루 포대
  K.box(2.2, 2.4, 1.2, 0x55534e, 3.4, 1.2, -5.6, scene); K.box(1.4, 0.8, 0.05, 0x3a3936, 3.4, 1.4, -4.98, scene);
  K.box(3, 0.1, 0.6, 0x6e6c66, -2.6, 3.0, -6.1, scene); for (let i = 0; i < 4; i++) { const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), K.lam(0x8a8782)), 40); b.scale.set(1.3, 0.7, 0.8); b.position.set(-3.6 + i * 0.7, 3.25, -6.1); scene.add(b); }
  K.box(0.8, 1.0, 0.5, 0xeeece6, -4.0, 0.5, -4.6, scene);
  // 작업대 식탁
  K.box(3.2, 0.12, 1.6, 0x8a8782, 0, 1.4, -3.4, scene); [[-1.4, -4.0], [1.4, -4.0], [-1.4, -2.8], [1.4, -2.8]].forEach(([x, z]) => K.box(0.1, 1.3, 0.1, 0x3a3936, x, 0.7, z, scene));
  K.cyl(0.6, 0.5, 0.06, 0xf4f2ec, 0, 1.5, -3.3, scene, 20); const rolls = []; for (let i = 0; i < 5; i++) { const r = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), K.lam(0xa8a59e)), 40); r.scale.set(1.2, 0.7, 1); r.position.set(-0.3 + (i % 3) * 0.3, 1.62, -3.4 + Math.floor(i / 3) * 0.3); scene.add(r); rolls.push(r); }
  const loaf = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 8), K.lam(0x45443f)), 40); loaf.scale.set(1.5, 0.6, 0.8); loaf.position.set(0.9, 1.65, -3.6); scene.add(loaf);
  [-1.0, 1.0].forEach(x => K.cyl(0.1, 0.08, 0.2, 0xf2f0ea, x, 1.56, -3.0, scene, 10));
  const lamp = new THREE.Group(); lamp.position.set(-1.6, 5.6, -3.0); scene.add(lamp); K.cyl(0.01, 0.01, 1.4, 0x2a2a28, 0, -0.7, 0, lamp, 4); K.cyl(0.1, 0.6, 0.45, 0x55534e, 0, -1.6, 0, lamp, 14); const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), K.flat(0xffffff)); bulb.position.y = -1.8; lamp.add(bulb);
  const B = K.person(scene, { x: 0.2, z: -4.6, rot: Math.PI, coat: 0xd8d5cd, pants: 0x55534e, hair: 'short', scale: 1.0 }); K.box(1.0, 1.4, 0.05, 0xfbfaf6, 0, 1.0, -0.42, B.torso);
  const M = K.person(scene, { x: -2.0, z: -3.0, rot: -2.2, coat: 0x6e6c66, pants: 0x45443f, hair: 'long', scale: 0.85 }); M.root.position.y = -0.55;
  const H = K.person(scene, { x: 2.0, z: -3.0, rot: 2.2, coat: 0x45443f, pants: 0x2a2a28, hair: 'short', scale: 0.9 }); H.root.position.y = -0.55;
  const roll = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), K.lam(0xa8a59e)), 40); M.hold('R', roll, { at: [0, -0.15, 0] });
  const steam = []; for (let i = 0; i < 18; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false })); scene.add(s); steam.push({ s, k: i / 18 }); }
  cam.position.set(0.0, 3.0, 4.4); cam.lookAt(0.0, 1.9, -3.4);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), give = K.win(ph, 0.1, 0.6, 0.12);
    B.pose({ lean: -0.15 * give, armR: { fwd: 0.4 + 0.6 * give, elbow: 0.8 }, armL: { fwd: 0.4 + 0.6 * give, elbow: 0.8 }, headPitch: 0.2 });
    M.pose({ armR: { fwd: 0.7 + 0.5 * Math.sin(ph), elbow: 1.2 + 0.4 * Math.sin(ph) }, armL: { fwd: 0.6, elbow: 1.3 }, headPitch: 0.15 });
    H.pose({ headPitch: 0.2 + 0.1 * Math.sin(ph * 2), armL: { fwd: 0.8, elbow: 1.2 }, armR: { fwd: 0.6 + 0.3 * K.win(ph, 0.5, 0.9, 0.1), elbow: 1.0 } });
    lamp.rotation.z = 0.05 * Math.sin(ph * 2);
    steam.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(-0.2 + 0.4 * ((o.k * 7) % 1) + 0.1 * Math.sin(ph * 2 + o.k * 9), 1.7 + v * 1.4, -3.4 + 0.1 * Math.cos(ph + o.k * 5)); o.s.scale.setScalar(0.6 + v * 1.8); o.s.material.opacity = 0.5 * (1 - v); });
  };
}
