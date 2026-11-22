// 11/23 『82년생 김지영』 장면②(after 3): 홍보 회사 사무실, 여인이 모니터 앞에서 서류를 넘기고, 뒤편 유리 회의실 안에서 남자 동료 셋이 모여 이야기한다. 선풍기·펄럭이는 서류·화분. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xeae8e2, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2333 });
  K.box(16, 0.1, 12, 0xd8d5cd, 0, -0.05, -3, scene);
  // 유리 회의실
  const glass = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 0.05), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })); glass.position.set(1.2, 1.5, -4.2); scene.add(glass);
  K.box(6.1, 0.08, 0.1, 0x45443f, 1.2, 3.0, -4.2, scene); K.box(0.08, 3, 0.1, 0x45443f, -1.8, 1.5, -4.2, scene); K.box(0.08, 3, 0.1, 0x45443f, 4.2, 1.5, -4.2, scene);
  K.box(2.6, 0.1, 1.2, 0x6e6c66, 1.2, 1.0, -5.6, scene);
  const men = [0.0, 1.2, 2.4].map((x, i) => K.person(scene, { x, z: -5.0 - (i % 2) * 1.0, rot: [Math.PI * 0.8, Math.PI, -Math.PI * 0.8][i], coat: [0x2f2e2b, 0x45443f, 0x3a3936][i], pants: 0x2f2e2b, hair: 'short', scale: 0.95 }));
  // 여인 책상 + 모니터 + 서류 + 선풍기 + 화분
  K.box(2.6, 0.1, 1.2, 0x8a8782, -2.4, 1.2, -1.4, scene); K.box(0.1, 1.2, 1.1, 0x55534e, -3.6, 0.6, -1.4, scene); K.box(0.1, 1.2, 1.1, 0x55534e, -1.2, 0.6, -1.4, scene);
  K.box(1.0, 0.7, 0.06, 0x3a3936, -2.6, 1.75, -1.85, scene); K.box(0.95, 0.6, 0.02, 0xd8d5cd, -2.6, 1.75, -1.81, scene);
  const papers = []; for (let i = 0; i < 3; i++) papers.push(K.box(0.4, 0.01, 0.55, 0xfbfaf6, -1.8 + i * 0.05, 1.27 + i * 0.01, -1.2, scene));
  const fan = new THREE.Group(); fan.position.set(-1.5, 1.6, -1.7); scene.add(fan); for (let i = 0; i < 3; i++) { const b = K.box(0.06, 0.35, 0.02, 0x8a8782, 0, 0.18, 0, fan); b.geometry.translate(0, 0.0, 0); const g = new THREE.Group(); g.rotation.z = i * 2.09; g.add(b); fan.add(g); }
  K.cyl(0.04, 0.04, 0.3, 0x55534e, -1.5, 1.4, -1.72, scene, 6);
  K.cyl(0.3, 0.25, 0.5, 0x9a978f, 4.8, 0.25, -2.0, scene, 12); K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.6, 10, 8), K.lam(0x77756f)), 30).position.set(4.8, 1.0, -2.0); scene.children.at(-1);
  const W = K.person(scene, { x: -2.6, z: -0.6, rot: 0.0, coat: 0x9a978f, pants: 0x3a3936, hair: 'bob', scale: 0.95 });
  const wg = new THREE.Group(); wg.position.y = -0.6; scene.add(wg); wg.add(W.root);
  cam.position.set(-0.6, 2.8, 4.2); cam.lookAt(0.0, 1.6, -3.0);
  return (t, ph) => {
    const look = K.win(ph, 0.45, 0.85, 0.1);
    W.pose({ headYaw: -0.9 * look, headPitch: 0.2 * (1 - look), armL: { fwd: 1.0, elbow: 1.2 }, armR: { fwd: 1.0 + 0.2 * Math.sin(ph * 4), elbow: 1.0, out: -0.1 } });
    men.forEach((m, i) => m.pose({ headPitch: 0.05 * Math.sin(ph * 4 + i), armR: { fwd: 0.4 + 0.6 * K.win(ph, 0.1 + i * 0.25, 0.3 + i * 0.25, 0.08), elbow: 1.0 }, armL: { fwd: 0.3 } }));
    fan.rotation.z = ph * 8; papers.forEach((p, i) => { p.rotation.x = -0.15 * Math.max(0, Math.sin(ph * 4 + i)); });
  };
}
