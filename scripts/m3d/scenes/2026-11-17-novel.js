// 11/17 오늘의 소설 「벙어리 삼룡이」 마지막 장면: 밤, 불빛이 일렁이는 기와지붕 위. 사내가 지붕마루 뒤에 무릎 꿇고 앉아 새아씨를 무릎에 뉘고 내려다본다. 아래에서 연기와 불티가 올라가고 빛이 깜박인다(불길·상처는 그리지 않음)
export const secs = 3;
export const opts = { bg: 0x6e6c68, fog: [0x6a6864, 30, 120] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#5a5854', line: '#55534f', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'town', seed: 9, night: true });
  // 뒤 하늘의 빛 판(밝기가 깜박임)
  const glowM = new THREE.MeshBasicMaterial({ color: 0xbdbab3 }); const glow = new THREE.Mesh(new THREE.PlaneGeometry(160, 60), glowM); glow.position.set(0, 4, -40); scene.add(glow);
  // 한옥 지붕: 몸채 + 경사 지붕 두 면 + 용마루
  K.box(12, 3.0, 5, 0xb8b5ad, 0, 1.5, -4, scene);
  const r1 = K.box(13, 0.3, 3.4, 0x3a3936, 0, 3.9, -2.9, scene); r1.rotation.x = 0.55;
  const r2 = K.box(13, 0.3, 3.4, 0x3a3936, 0, 3.9, -5.1, scene); r2.rotation.x = -0.55;
  K.box(13.4, 0.45, 0.6, 0x2a2a28, 0, 4.85, -4, scene);
  for (let i = 0; i < 12; i++) K.box(0.08, 0.06, 3.2, 0x55534f, -6 + i * 1.1, 4.0, -2.8, scene).rotation.x = 0.55;
  // 사내(용마루 뒤, 무릎 꿇어 다리를 가림), 새아씨(마루 위에 비스듬히 누움)
  const M = K.person(scene, { x: 1.0, z: -4.5, rot: Math.PI - 0.2, coat: 0x6c6a65, pants: 0x2a2a28, hair: 'short', scale: 1.0 });
  const Wm = K.person(scene, { x: -0.6, z: -3.7, rot: 0, coat: 0xe2dfd8, pants: 0x9a9892, hair: 'bun', scale: 0.92, detail: false });
  Wm.root.rotation.set(Math.PI / 2, 0, -Math.PI / 2 + 0.06);
  // 불티(아래→위), 연기
  const N = 40, pos = new Float32Array(N * 3), base = []; for (let i = 0; i < N; i++) base.push([(Math.random() - 0.5) * 14, Math.random() * 9, -1 - Math.random() * 6]);
  const sparks = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.14 })); scene.add(sparks);
  const smoke = []; for (let i = 0; i < 6; i++) { const s = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.6, 10, 8), K.lam(0x8f8d88)), 80); scene.add(s); smoke.push(s); }
  cam.position.set(1.0, 6.4, 4.2); cam.lookAt(-0.2, 5.6, -3.8);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    const f = 0.72 + 0.08 * Math.sin(ph * 7) + 0.05 * Math.sin(ph * 13 + 1); glowM.color.setScalar(f);
    base.forEach((b, i) => { pos[i * 3] = b[0] + 0.2 * Math.sin(ph * 2 + i); pos[i * 3 + 1] = 2 + ((b[1] + u * 9) % 9); pos[i * 3 + 2] = b[2]; }); sparks.geometry.attributes.position.needsUpdate = true;
    smoke.forEach((s, i) => { const v = (u + i / 6) % 1; s.position.set((i % 2 ? 5.5 : -6.5) + v * 1.2, 4 + v * 5 + i * 0.3, -9); s.scale.setScalar(0.5 + v * 1.0); });
    M.pose({ bob: 3.15, headYaw: -0.35, headPitch: -0.55 + 0.08 * Math.sin(ph), headTilt: 0.1, lean: 0.25, armL: { fwd: 0.35, elbow: 0.5 }, armR: { fwd: 0.55 + 0.08 * Math.sin(ph), out: 0.25, elbow: 0.7 } });
    Wm.root.position.x = -3.3; Wm.root.position.z = -3.9;
    Wm.pose({ bob: 5.25, headPitch: 0.1, armL: { fwd: -0.1, elbow: 0.2 }, armR: { fwd: 0.05 * Math.sin(ph), elbow: 0.3 } });
  };
}
