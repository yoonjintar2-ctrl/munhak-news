// 11/21 카버 장면②(after 3): 밤 집 부엌. 벽걸이 전화가 울리며 흔들리고, 수건을 목에 건 아버지가 수화기를 귀에 대고 고개를 갸웃한다. 창밖은 어둡고 식탁 위 등이 흔들리며, 꼬인 전화선이 출렁인다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xd8d6d0, fog: [0xd4d2cc, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 301, night: true });
  K.box(10, 0.2, 7, 0xd8d5cd, 0, 0, -3, scene); K.box(10, 5, 0.3, 0xe8e6e0, 0, 2.5, -6.5, scene);
  K.box(2.2, 1.8, 0.06, 0x45443f, -2.6, 3.0, -6.3, scene); K.line([[-2.6, 2.1, -6.25], [-2.6, 3.9, -6.25]], scene);
  // 식탁 + 등
  K.box(2.6, 0.12, 1.4, 0x6e6c66, -1.6, 1.4, -3.6, scene); [[-2.7, -4.1], [-0.5, -4.1], [-2.7, -3.1], [-0.5, -3.1]].forEach(([x, z]) => K.box(0.1, 1.3, 0.1, 0x3a3936, x, 0.7, z, scene));
  K.cyl(0.12, 0.1, 0.3, 0xf2f0ea, -1.9, 1.6, -3.5, scene, 10);
  const lamp = new THREE.Group(); lamp.position.set(-1.6, 5.0, -3.6); scene.add(lamp); K.cyl(0.01, 0.01, 1.4, 0x2a2a28, 0, -0.7, 0, lamp, 4); K.cyl(0.1, 0.5, 0.4, 0x55534e, 0, -1.6, 0, lamp, 14);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), K.flat(0xffffff)); bulb.position.y = -1.8; lamp.add(bulb);
  // 벽걸이 전화 + 선
  const ph0 = new THREE.Group(); ph0.position.set(2.4, 2.8, -6.2); scene.add(ph0); K.box(0.5, 0.8, 0.25, 0x3a3936, 0, 0, 0, ph0);
  const P = K.person(scene, { x: 0.8, z: -4.4, rot: Math.PI - 0.6, coat: 0xd8d5cd, pants: 0x45443f, hair: 'short', scale: 0.95, scarf: 0xfbfaf6 });
  const rcv = K.box(0.15, 0.6, 0.15, 0x2a2a28, 0, 0, 0, scene); P.hold('L', rcv, { at: [0, -0.15, 0], rot: [0, 0, 0] });
  const coil = []; for (let i = 0; i < 10; i++) { const s = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.015, 4, 8), K.lam(0x2a2a28)); scene.add(s); coil.push(s); }
  const hp = new THREE.Vector3(), a = new THREE.Vector3(2.4, 2.5, -6.0);
  cam.position.set(0.0, 2.8, 4.6); cam.lookAt(0.6, 2.2, -4.0);
  return (t, ph) => {
    const ring = K.win(ph, 0.0, 0.25, 0.05);
    ph0.rotation.z = 0.08 * Math.sin(ph * 30) * ring;
    P.pose({ headTilt: 0.25 + 0.1 * Math.sin(ph), headPitch: 0.1, armL: { fwd: 1.2, out: 0.1, elbow: 2.2 }, armR: { fwd: 0.3 + 0.4 * K.win(ph, 0.5, 0.85, 0.1), elbow: 0.8 } });
    lamp.rotation.z = 0.06 * Math.sin(ph * 2);
    P.hands.L.getWorldPosition(hp); coil.forEach((s, i) => { const k = i / 9; s.position.lerpVectors(a, hp, k); s.position.y -= 0.5 * Math.sin(Math.PI * k) * (1 + 0.15 * Math.sin(ph * 2)); });
  };
}
