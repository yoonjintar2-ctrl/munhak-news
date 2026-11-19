// 11/20 「미스터 방」 장면②: 이층집 응접실. 오른쪽 양복 차림의 미스터 방(진한 양복)이 서서 담배를 든 손을 거들먹거리며 흔들고, 왼쪽 흰 두루마기에 갓을 쓴 늙은 백 주사가 허리를 굽혀 두 손을 모은다. 탁자 위 선물 꾸러미, 담배 연기가 오르고 벽시계 추가 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xebe9e3, fog: [0xe7e5df, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dcd8ce', line: '#d2cec4', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 71 });
  // 탁자 + 선물 꾸러미
  K.box(2.4, 0.12, 1.2, 0x45443f, 0.2, 1.2, -3.2, scene); [[-0.8, -3.6], [1.2, -3.6], [-0.8, -2.8], [1.2, -2.8]].forEach(([x, z]) => K.box(0.12, 1.2, 0.12, 0x3a3936, x, 0.6, z, scene));
  [[-0.4, 0.5, 0xf2f0ea], [0.3, 0.4, 0x8a8782], [0.8, 0.35, 0xdedbd3]].forEach(([x, s, c]) => { const g = K.box(s * 1.2, s, s, c, x, 1.26 + s / 2, -3.2, scene); K.box(s * 1.2 + 0.02, 0.05, s + 0.02, 0x2a2a28, x, 1.26 + s / 2, -3.2, scene); });
  // 안락의자(오른쪽 뒤)
  K.box(1.4, 0.6, 1.2, 0x55534e, 3.6, 0.6, -4.2, scene); K.box(1.4, 1.4, 0.3, 0x55534e, 3.6, 1.3, -4.8, scene);
  // 벽시계
  K.box(0.9, 1.6, 0.3, 0x45443f, -2.4, 4.6, -6.6, scene); const pend = new THREE.Group(); pend.position.set(-2.4, 4.2, -6.4); scene.add(pend); K.cyl(0.02, 0.02, 0.8, 0xeeeeea, 0, -0.4, 0, pend, 4); K.cyl(0.14, 0.14, 0.05, 0xeeeeea, 0, -0.85, 0, pend, 12).rotation.x = Math.PI / 2;
  const M = K.person(scene, { x: 2.0, z: -1.6, rot: 2.35, coat: 0x2e2d2a, pants: 0x2a2a28, hair: 'short', scale: 0.98, scarf: 0xf2f0ea });
  const cig = K.cyl(0.02, 0.02, 0.25, 0xfbfaf6, 0, 0, 0, scene, 5); M.hold('R', cig, { at: [0, -0.1, -0.08], rot: [Math.PI / 2, 0, 0] });
  const W = K.person(scene, { x: -1.3, z: -1.5, rot: -2.0, coat: 0xeeece6, pants: 0xd4d1c9, hair: 'short', scale: 0.92 });
  const gat = new THREE.Group(); gat.position.y = 0.62; W.headG.add(gat); K.cyl(0.75, 0.75, 0.03, 0x1c1c1a, 0, 0, 0, gat, 24); K.cyl(0.26, 0.3, 0.45, 0x1c1c1a, 0, 0.22, 0, gat, 16);
  const robe = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.9, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0xe4e1d9, side: THREE.DoubleSide })), 40); robe.position.y = 1.0; W.root.add(robe);
  const smoke = []; for (let i = 0; i < 10; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false })); scene.add(s); smoke.push({ s, k: i / 10 }); }
  const tip = new THREE.Vector3();
  cam.position.set(0.2, 3.1, 5.6); cam.lookAt(0.3, 2.2, -2.2);
  return (t, ph) => {
    const bow = 0.5 + 0.5 * Math.sin(ph * 2), swag = Math.sin(ph * 2);
    W.pose({ lean: -(0.35 + 0.2 * bow), headPitch: 0.3, armL: { fwd: 0.9, out: -0.35, elbow: 1.0 }, armR: { fwd: 0.9, out: -0.35, elbow: 1.0 } });
    M.pose({ lean: 0.12, headPitch: -0.2, headYaw: 0.15 * swag, armR: { fwd: 1.0 + 0.35 * swag, out: 0.2, elbow: 1.4 }, armL: { fwd: 0.3, out: 0.3, elbow: 1.6 } });
    pend.rotation.z = 0.3 * Math.sin(ph * 2);
    cig.getWorldPosition(tip); const u = ph / (Math.PI * 2);
    smoke.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(tip.x + 0.15 * Math.sin(ph * 2 + o.k * 9), tip.y + 0.1 + v * 1.6, tip.z); o.s.scale.setScalar(0.6 + v * 2); o.s.material.opacity = 0.5 * (1 - v); });
  };
}
