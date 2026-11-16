// 11/17 1분 고전 「외투」 대표: 관청 사무실. 낡은 외투 차림의 아카키가 책상에 몸을 숙여 서류를 베껴 쓰고(펜 든 손이 움직임), 뒤쪽 젊은 동료 둘이 그를 가리키며 수군댄다. 서류 몇 장이 펄럭이고 갓등이 흔들린다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d4d0c6', line: '#c8c4ba', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 31 });
  // 아카키 책상(앞) + 서류 더미 + 잉크병
  K.box(3.2, 0.15, 1.6, 0x4a4945, 0, 1.9, -1.2, scene); [[-1.5, -1.9], [1.5, -1.9], [-1.5, -0.5], [1.5, -0.5]].forEach(([x, z]) => K.box(0.12, 1.9, 0.12, 0x3a3936, x, 0.95, z, scene));
  K.box(0.9, 0.6, 0.7, 0xf2f0ea, 1.0, 2.28, -1.4, scene); K.box(0.8, 0.12, 0.6, 0xe4e2db, 0.1, 2.03, -1.0, scene);
  K.cyl(0.12, 0.14, 0.25, 0x1f1f1d, -1.0, 2.1, -1.5, scene, 10);
  K.box(3.0, 1.3, 0.08, 0x45443f, 0, 1.2, -0.48, scene);
  // 뒤쪽 동료 책상, 서류장
  K.box(3.0, 0.15, 1.4, 0x5a5853, -3.4, 1.9, -4.6, scene); K.box(0.12, 1.9, 1.3, 0x3a3936, -4.8, 0.95, -4.6, scene); K.box(0.12, 1.9, 1.3, 0x3a3936, -2.0, 0.95, -4.6, scene);
  K.box(2.4, 4.6, 1.0, 0x55534e, 4.4, 2.3, -6.0, scene); for (let i = 0; i < 4; i++) K.box(2.2, 0.06, 0.9, 0x2f2e2b, 4.4, 1.0 + i * 1.1, -5.45, scene);
  // 갓등(천장에서)
  const lamp = new THREE.Group(); lamp.position.set(0.2, 8.0, -1.4); scene.add(lamp); K.line([[0, 0, 0], [0, -3.4, 0]], lamp);
  const shade = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.5, 14, 1, true), new THREE.MeshLambertMaterial({ color: 0x2f2e2b, side: THREE.DoubleSide })), 30); shade.position.y = -3.6; lamp.add(shade);
  // 아카키(책상 뒤에서 앞을 향해 앉은 듯 — 다리는 책상에 가림, 낡은 외투: 밝은 회색)
  const A = K.person(scene, { x: 0.0, z: -2.4, rot: Math.PI, coat: 0x7a7872, pants: 0x3e3d3a, hair: 'short', scale: 0.95 });
  // 동료 둘(뒤, 진한 옷)
  const C1 = K.person(scene, { x: -3.6, z: -5.6, rot: Math.PI - 0.5, coat: 0x2f2e2b, pants: 0x55534e, hair: 'short', scale: 0.95 });
  const C2 = K.person(scene, { x: -2.2, z: -6.0, rot: Math.PI - 0.9, coat: 0x45443f, pants: 0x2a2a28, hair: 'cap', scale: 0.95 });
  // 펄럭이는 종이
  const papers = []; for (let i = 0; i < 4; i++) { const p = K.inked(new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.65), new THREE.MeshLambertMaterial({ color: 0xf4f2ec, side: THREE.DoubleSide })), 1); scene.add(p); papers.push(p); }
  cam.position.set(0.8, 4.4, 5.6); cam.lookAt(-0.6, 2.4, -3.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    A.pose({ bob: -0.55, lean: 0.35, headPitch: -0.5, headYaw: 0.05 * Math.sin(ph * 2), armR: { fwd: 0.9 + 0.08 * Math.sin(ph * 10), out: -0.1, elbow: 1.2 + 0.15 * Math.sin(ph * 10) }, armL: { fwd: 0.8, out: 0.1, elbow: 1.3 } });
    const pt = K.win(ph, 0.15, 0.6, 0.08), lg = K.win(ph, 0.5, 0.95, 0.08);
    C1.pose({ headYaw: -0.6 + 0.6 * lg, headTilt: 0.1 * lg, armR: { fwd: 1.4 * pt, elbow: 0.2, point: pt > 0.5 }, armL: { fwd: 0.3, elbow: 1.6 * lg } });
    C2.pose({ headYaw: 0.7 - 0.2 * pt, bob: 0.05 * Math.abs(Math.sin(ph * 6)) * lg, armL: { fwd: 1.1 * lg, elbow: 1.9 * lg }, armR: { fwd: 0.2, elbow: 0.3 } });
    lamp.rotation.z = 0.05 * Math.sin(ph); lamp.rotation.x = 0.03 * Math.sin(ph * 2);
    papers.forEach((p, i) => { const v = (u + i / 4) % 1; p.position.set(-1.0 + v * 4.5, 2.6 + 1.6 * Math.sin(v * Math.PI) + i * 0.2, -3.2 + i * 0.4); p.rotation.set(v * 6.28 + i, v * 3.14, 0.4 * Math.sin(ph + i)); });
  };
}
