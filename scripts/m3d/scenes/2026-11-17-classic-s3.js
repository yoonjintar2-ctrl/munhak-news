// 11/17 1분 고전 「외투」 장면③: 한밤 끝없이 텅 빈 광장. 외투를 잃은 아카키가 눈밭에 털썩 앉아 어깨를 감싸 쥐고, 멀리 두 사내의 그림자가 외투를 들고 멀어진다. 먼 가로등 불빛이 흔들리고 눈이 내린다(폭력 장면 없음)
export const secs = 3;
export const opts = { bg: 0x9c9a95, fog: [0x96948f, 25, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d6d0', line: '#d0cec8', tiles: 2, repeat: 3 });
  K.backdrop(scene, { kind: 'town', seed: 12, night: true });
  // 먼 가로등 둘, 경비 초소
  const lamps = [[-7, -16], [8, -20]].map(([x, z]) => { K.cyl(0.08, 0.12, 5, 0x1f1f1d, x, 2.5, z, scene, 8); const g = new THREE.Group(); g.position.set(x, 5.0, z); scene.add(g); K.line([[0, 0, 0], [0, -0.6, 0]], g); const l = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 8), K.flat(0xffffff)), 1); l.position.y = -0.8; g.add(l); return { g, l }; });
  K.box(1.4, 2.6, 1.4, 0x55534e, 10, 1.3, -24, scene); const roof = K.inked(new THREE.Mesh(new THREE.ConeGeometry(1.2, 1, 4), K.lam(0x2f2e2b)), 30); roof.position.set(10, 3.1, -24); scene.add(roof);
  // 눈 더미·발자국 판
  [[-3, -2], [3.5, -4], [-5, -8]].forEach(([x, z]) => { const m = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.8, 10, 6), K.lam(0xeeece7)), 50); m.scale.y = 0.35; m.position.set(x, 0.1, z); scene.add(m); });
  // 아카키(앉음: bob 아래로, 외투 없이 밝은 셔츠)
  const A = K.person(scene, { x: -0.6, z: -1.5, rot: Math.PI - 0.35, coat: 0xbcb9b2, pants: 0x3e3d3a, hair: 'short', scale: 0.95 });
  // 멀어지는 두 사내(뒷모습), 하나는 외투를 둘러맴
  const T1 = K.person(scene, { x: 2.5, z: -10, rot: 0.3, coat: 0x1f1f1d, pants: 0x2a2a28, hair: 'cap', scale: 0.9 });
  const T2 = K.person(scene, { x: 4.0, z: -10.5, rot: 0.3, coat: 0x2f2e2b, pants: 0x1f1f1d, hair: 'short', scale: 0.9 });
  const coat = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.6, 1.8, 10), K.lam(0x45443f)), 40); coat.position.set(0.6, 2.0, 0.6); coat.rotation.z = 0.4; T2.torso.add(coat);
  const N = 70, pos = new Float32Array(N * 3), base = []; for (let i = 0; i < N; i++) base.push([(Math.random() - 0.5) * 20, Math.random() * 10, -12 + Math.random() * 14, Math.random() * 6.28]);
  const snow = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.14 })); scene.add(snow);
  cam.position.set(2.0, 3.0, 5.0); cam.lookAt(0.4, 1.4, -4.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    base.forEach((b, i) => { pos[i * 3] = b[0] + 0.25 * Math.sin(ph + b[3]); pos[i * 3 + 1] = ((b[1] - u * 10) % 10 + 10) % 10; pos[i * 3 + 2] = b[2]; }); snow.geometry.attributes.position.needsUpdate = true;
    const shiver = 0.03 * Math.sin(ph * 30);
    A.pose({ bob: -1.55, lean: 0.3, headPitch: -0.3 + 0.25 * K.win(ph, 0.4, 0.9, 0.1), headYaw: 1.1 * K.win(ph, 0.4, 0.9, 0.1), torsoYaw: shiver, armL: { fwd: 0.8, out: -0.45, elbow: 1.5 }, armR: { fwd: 0.8, out: -0.45, elbow: 1.5 } });
    const s = 0.12 * Math.sin(ph * 4);
    T1.root.position.z = -10 - 1.0 * Math.sin(ph / 2) ** 2; T2.root.position.z = -10.5 - 1.0 * Math.sin(ph / 2) ** 2;
    T1.pose({ bob: Math.abs(s) * 0.5, armL: { fwd: s * 2 }, armR: { fwd: -s * 2 } });
    T2.pose({ bob: Math.abs(s) * 0.5, headYaw: 0.6 * K.win(ph, 0.6, 0.9, 0.08), armL: { fwd: -s * 2 }, armR: { fwd: 1.0, elbow: 1.4 } });
    lamps.forEach((o, i) => { o.g.rotation.z = 0.08 * Math.sin(ph + i); o.l.scale.setScalar(1 + 0.1 * Math.sin(ph * 5 + i)); });
  };
}
