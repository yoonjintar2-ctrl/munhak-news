// 11/26 오늘의 소설 구절 『프랑켄슈타인』: 외딴 섬 오두막 실험실 안, 촛불 켠 탁자(유리병·책·도구) 곁의 젊은 과학자(조끼·셔츠)가 창 쪽을 보며 뒷걸음질 치고, 창밖에 커다란 그림자(얼굴 없음)가 서 있다. 촛불 흔들림·커튼 흔들림·창밖 파도. 폭력 없음. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdcdad4, fog: [0xd8d6d0, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2613 });
  K.box(40, 0.2, 14, 0xc8c3b8, 0, -0.1, -1, scene);
  // 창 밖 그림자(큰 사람 실루엣, 창 뒤)
  const shadow = new THREE.Group(); shadow.position.set(6.4, 0, -6.66); scene.add(shadow);
  const sb = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.9), K.flat(0x3a3936)); sb.position.y = 4.15; shadow.add(sb);
  const sh = new THREE.Mesh(new THREE.CircleGeometry(0.62, 20), K.flat(0x3a3936)); sh.position.y = 5.75; shadow.add(sh);
  const sn = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.5), K.flat(0x3a3936)); sn.position.y = 5.2; shadow.add(sn);
  // 커튼
  const cur = new THREE.Group(); cur.position.set(3.0, 6.8, -6.5); scene.add(cur); K.box(0.9, 3.8, 0.08, 0x8a8782, 0, -1.9, 0, cur);
  // 탁자 + 실험 도구
  const tb = new THREE.Group(); tb.position.set(-1.6, 0, -2.6); scene.add(tb);
  K.box(4.2, 0.15, 1.8, 0x55534e, 0, 1.5, 0, tb); [[-1.9, -0.8], [1.9, -0.8], [-1.9, 0.8], [1.9, 0.8]].forEach(([x, z]) => K.box(0.14, 1.5, 0.14, 0x45443f, x, 0.75, z, tb));
  [[-1.3, 0.5], [-0.8, 0.35], [-0.4, 0.6]].forEach(([x, h]) => K.cyl(0.14, 0.18, h, 0xe2dfd7, x, 1.58 + h / 2, -0.3, tb, 12));
  K.box(0.9, 0.18, 0.6, 0x3a3936, 0.6, 1.66, 0.2, tb); K.box(0.85, 0.05, 0.55, 0xf2f0ea, 0.6, 1.77, 0.2, tb);
  K.cyl(0.18, 0.2, 0.1, 0x45443f, 1.5, 1.63, -0.2, tb, 10); K.cyl(0.07, 0.07, 0.45, 0xf6f5f1, 1.5, 1.9, -0.2, tb, 8);
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 8), K.flat(0x55534e)); flame.position.set(1.5, 2.25, -0.2); tb.add(flame);
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.6, 14, 10), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, depthWrite: false })); glow.position.set(1.5, 2.25, -0.2); tb.add(glow);
  // 과학자
  const V = K.person(scene, { x: 1.6, z: -1.0, rot: Math.PI + 0.4, coat: 0x45443f, pants: 0x2a2a2a, sleeve: 0xeeece6, outfit: 'vest', hair: 'curly', eyes: 'wide', brows: 'worried', mouth: 'open', scale: 1.0, seed: 2613 });
  // 파도(창 아래)
  const waves = []; for (let i = 0; i < 6; i++) { const w = K.box(0.8, 0.12, 0.1, 0x8a8782, 4.0 + i * 0.75, 3.55, -6.62, scene); waves.push({ w, k: i }); }
  cam.position.set(1.4, 3.2, 5.8); cam.lookAt(2.0, 2.9, -3.2);
  return (t, ph) => {
    const s = Math.sin(ph);
    V.root.position.z = -1.0 + 0.25 * s;
    V.pose({ headYaw: -0.9, headPitch: -0.05, lean: 0.12, torsoYaw: -0.3, armL: { fwd: 1.1 + 0.2 * s, elbow: 0.6, out: 0.2 }, armR: { fwd: 0.6, elbow: 1.2 } });
    shadow.position.x = 6.4 + 0.15 * Math.sin(ph); sh.position.x = 0.08 * Math.sin(ph * 2);
    flame.scale.set(1, 1 + 0.35 * Math.sin(ph * 9), 1); flame.rotation.z = 0.25 * Math.sin(ph * 6); glow.material.opacity = 0.2 + 0.08 * Math.sin(ph * 9);
    cur.rotation.x = 0.12 + 0.1 * Math.sin(ph * 2);
    waves.forEach(o => { o.w.position.y = 3.55 + 0.06 * Math.sin(ph * 2 + o.k); });
  };
}
