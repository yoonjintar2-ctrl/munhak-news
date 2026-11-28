// 11/29 『삼미 슈퍼스타즈의 마지막 팬클럽』 장면③(after 5): 저녁 길가 포장마차 안. 탁자에 마주 앉은 두 사내 — 곱슬머리·조끼 차림 조성훈이 낡은 야구 모자를 내밀며 웃고, 긴 외투 차림 '나'가 놀란 얼굴로 바라본다. 천막 펄럭임·냄비 김·전구 흔들림. 카메라 비스듬히 고정
export const secs = 3;
export const opts = { bg: 0xe4e2dc, fog: [0xe0ded8, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfcbc1', line: '#c5c1b7', tiles: 8, repeat: 4 });
  K.backdrop(scene, { kind: 'city', seed: 2003 });
  // 천막(뒷벽·지붕·옆자락 흔들림)
  K.box(10, 4.6, 0.1, 0xc8c4bb, 0, 2.3, -4.2, scene); const roof = K.box(10.6, 0.12, 6.4, 0x8a8782, 0, 4.7, -1.2, scene); roof.rotation.x = -0.08;
  [-5, 5].forEach(x => K.cyl(0.06, 0.06, 4.7, 0x2a2a28, x, 2.35, 1.8, scene, 6));
  const flap = new THREE.Mesh(new THREE.PlaneGeometry(10.4, 0.8, 10, 2), new THREE.MeshLambertMaterial({ color: 0x6e6c66, side: THREE.DoubleSide })); flap.position.set(0, 4.25, 1.95); scene.add(flap); const fb = flap.geometry.attributes.position.array.slice();
  // 조리대 + 냄비 + 김
  K.box(4, 1.6, 1.2, 0x55534e, 2.4, 0.8, -3.4, scene); K.cyl(0.6, 0.55, 0.6, 0xb0aca4, 2.0, 1.9, -3.4, scene, 18); K.cyl(0.4, 0.45, 0.3, 0x6e6c66, 3.4, 1.75, -3.4, scene, 14);
  const steam = []; for (let i = 0; i < 5; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })); scene.add(s); steam.push({ s, k: i / 5 }); }
  // 매달린 전구 둘
  const bulbs = []; [-1.5, 1.5].forEach((x, i) => { const g = new THREE.Group(); g.position.set(x, 4.6, -0.8); scene.add(g); K.line([[0, 0, 0], [0, -1.0, 0]], g); const b = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })); b.position.y = -1.1; g.add(b); bulbs.push({ g, k: i }); });
  // 탁자 + 술잔·접시 + 둥근 의자
  K.cyl(1.2, 1.2, 0.1, 0xb0aca4, -0.4, 1.7, -0.6, scene, 24); K.cyl(0.12, 0.2, 1.7, 0x2a2a28, -0.4, 0.85, -0.6, scene, 8);
  K.cyl(0.35, 0.3, 0.06, 0xfbfaf6, -0.4, 1.78, -0.5, scene, 14); [-0.9, 0.2].forEach(x => K.cyl(0.07, 0.06, 0.2, 0xfbfaf6, x, 1.85, -0.7, scene, 8));
  [[-2.2, -0.4], [1.4, -0.8]].forEach(([x, z]) => K.cyl(0.4, 0.4, 1.0, 0x45443f, x, 0.5, z, scene, 12));
  // 두 사내(앉은 높이로 낮춤)
  const A = K.person(scene, { x: -2.2, z: -0.4, rot: -Math.PI / 2 - 0.3, coat: 0x2a2a28, outfit: 'longcoat', hair: 'short', eyes: 'wide', brows: 'up', mouth: 'open', seed: 11350 });
  const C = K.person(scene, { x: 1.4, z: -0.8, rot: Math.PI / 2 + 0.3, coat: 0x8a8782, outfit: 'vest', sleeve: 0xeeece6, hair: 'curly', beard: 'goatee', eyes: 'smile', brows: 'flat', mouth: 'smile', seed: 11351 });
  const cap = new THREE.Group(); const dome = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x45443f)), 30); dome.rotation.x = Math.PI; cap.add(dome); K.box(0.4, 0.04, 0.3, 0x45443f, 0, 0, 0.3, cap);
  C.hold('L', cap, { at: [0, -0.3, 0.1] });
  cam.position.set(0.2, 3.0, 6.6); cam.lookAt(-0.4, 1.9, -1.0);
  return (t, ph) => {
    const s = Math.sin(ph * 2);
    A.pose({ bob: -0.75, headPitch: 0.05, headYaw: 0.1, lean: -0.05, armL: { fwd: 1.1, elbow: 1.4 }, armR: { fwd: 1.0, elbow: 1.6 } });
    C.pose({ bob: -0.75, headTilt: 0.1 * s, armL: { fwd: 1.45 + 0.1 * s, elbow: 0.5, out: -0.1 }, armR: { fwd: 1.0, elbow: 1.5 } });
    for (let i = 0; i < fb.length / 3; i++) { const x = fb[i * 3], y = fb[i * 3 + 1]; flap.geometry.attributes.position.array[i * 3 + 2] = 0.12 * (0.4 - y) * Math.sin(ph * 2 + x * 0.8); } flap.geometry.attributes.position.needsUpdate = true;
    steam.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.s.position.set(2.0 + 0.15 * Math.sin(p * 7 + o.k * 4), 2.3 + p * 1.8, -3.4); o.s.scale.setScalar(0.6 + p * 1.8); o.s.material.opacity = 0.75 * (1 - p); });
    bulbs.forEach(o => { o.g.rotation.z = 0.08 * Math.sin(ph * 2 + o.k); });
  };
}
