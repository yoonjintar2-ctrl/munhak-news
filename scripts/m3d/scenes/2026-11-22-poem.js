// 11/22 오늘의 시 「송인」: 비 갠 대동강 긴 둑. 버드나무 아래 선 사람(오른쪽을 보며 rot -π/2 쪽)이 손을 들어 강 위로 멀어지는 돛단배를 배웅한다. 배는 -z(안쪽)·+x로 천천히 멀어짐. 물결이 일렁이고 버들가지가 흔들리며 물새가 난다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'shore', seed: 2202, near: false });
  // 강물
  const water = new THREE.Mesh(new THREE.PlaneGeometry(80, 50, 40, 20), K.lam(0xc8c5bd)); water.rotation.x = -Math.PI / 2; water.position.set(0, -0.2, -22); scene.add(water);
  // 둑(풀빛 짙은 긴 언덕)
  K.box(40, 0.8, 6, 0xbcb9b1, 0, 0.0, 2.0, scene); const bank = K.box(40, 0.4, 2, 0xa8a59e, 0, 0.3, -1.2, scene); bank.rotation.x = 0.3;
  const grass = []; for (let i = 0; i < 40; i++) { const g = K.box(0.03, 0.25, 0.03, 0x55534e, -9 + (i * 0.47) % 18, 0.5, 0.4 + (i * 0.31) % 2.5, scene); grass.push(g); }
  // 버드나무 + 늘어진 가지
  K.cyl(0.25, 0.35, 4.5, 0x3a3936, -3.4, 2.6, 0.5, scene, 10);
  const twigs = []; for (let i = 0; i < 14; i++) { const g = new THREE.Group(); g.position.set(-3.4 + Math.cos(i) * 1.4, 4.9, 0.5 + Math.sin(i * 1.7) * 1.0); scene.add(g); K.box(0.05, 2.4 + (i % 3) * 0.5, 0.05, 0x55534e, 0, -1.2, 0, g); twigs.push(g); }
  const crown = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.6, 14, 10), K.lam(0x77756f)), 40); crown.scale.set(1.2, 0.6, 1); crown.position.set(-3.4, 5.0, 0.5); scene.add(crown);
  // 나루 말뚝 + 작은 배 묶인 것
  [-0.6, 0.2].forEach(x => K.cyl(0.08, 0.1, 1.2, 0x3a3936, x, 0.2, -2.0, scene, 6));
  // 배웅하는 사람
  const P = K.person(scene, { x: -1.6, z: 0.6, rot: -0.6 + Math.PI * 0, coat: 0xf2f0ea, pants: 0xd4d1c9, hair: 'bun', scale: 1.0, scarf: 0x55534e });
  const robe = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.9, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0xeeece6, side: THREE.DoubleSide })), 40); robe.position.y = 1.0; P.root.add(robe);
  // 돛단배(멀어짐)
  const boat = new THREE.Group(); scene.add(boat);
  const hull = K.box(3.4, 0.5, 1.1, 0x3a3936, 0, 0.2, 0, boat); K.cyl(0.05, 0.05, 3.2, 0x2a2a28, 0, 1.8, 0, boat, 6);
  const sail = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 2.5, 4, 4), new THREE.MeshLambertMaterial({ color: 0xf6f4ee, side: THREE.DoubleSide })); sail.position.set(0.6, 2.0, 0); boat.add(sail);
  const man = K.person(boat, { x: -0.8, z: 0, rot: Math.PI, coat: 0x45443f, pants: 0x2a2a28, hair: 'short', scale: 0.33 }); man.root.position.y = 0.45;
  const birds = [K.bird(scene, { cx: 4, cy: 6, cz: -14, rx: 5, rz: 3, s: 0.8 }), K.bird(scene, { cx: 7, cy: 7, cz: -16, rx: 4, rz: 2, s: 0.7 })];
  cam.position.set(0.5, 3.6, 11.5); cam.lookAt(0.8, 1.8, -5);
  return (t, ph) => {
    const pos = water.geometry.attributes.position; for (let j = 0; j < pos.count; j++) { const x = pos.getX(j), y = pos.getY(j); pos.setZ(j, 0.12 * Math.sin(ph * 2 + x * 0.6 + y * 0.4)); } pos.needsUpdate = true;
    const u = ph / (Math.PI * 2), b = 0.5 + 0.5 * Math.sin(ph - Math.PI / 2);
    boat.position.set(3.0 + b * 1.2, 0.05 * Math.sin(ph * 3), -7 - b * 2.0); boat.rotation.z = 0.04 * Math.sin(ph * 3);
    man.pose({ headYaw: 0.3, armR: { fwd: 1.8, out: 0.3, elbow: 0.2 } });
    const wave = K.win(ph, 0.1, 0.9, 0.15);
    P.pose({ headYaw: -0.2, headPitch: -0.05, armR: { fwd: 2.3 * wave, out: -0.3, elbow: 0.3 + 0.3 * Math.sin(ph * 6) * wave }, armL: { fwd: 0.6, elbow: 1.6 } });
    twigs.forEach((g, i) => { g.rotation.z = 0.12 * Math.sin(ph * 2 + i); g.rotation.x = 0.08 * Math.cos(ph * 2 + i * 0.7); });
    grass.forEach((g, i) => { g.rotation.z = 0.15 * Math.sin(ph * 2 + i * 0.5); });
    sail.rotation.y = 0.15 * Math.sin(ph * 2);
    birds[0].update(ph); birds[1].update(ph, 1.5);
  };
}
