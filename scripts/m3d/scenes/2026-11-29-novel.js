// 11/29 오늘의 소설 구절 「죽은 사람들」: 1904년 더블린 호텔 방, 밤. 셔츠·조끼 차림 사내가 창가에서 커튼을 젖히고 창밖 가로등 불빛 속에 비스듬히 내리는 눈을 본다. 침대 머리맡 촛불이 흔들리고 커튼이 살랑인다. 방은 밝은 벽, 창밖만 어둡게
export const secs = 3;
export const opts = { bg: 0xe2e0da, fog: [0xdedcd6, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfcbc1', line: '#c7c3b9', tiles: 5, repeat: 3 });
  K.box(40, 14, 0.4, 0xe9e7e1, 0, 7, -6, scene); K.box(0.4, 14, 20, 0xe2e0da, -9, 7, 3, scene);
  K.box(40, 0.4, 0.2, 0x4a4a46, 0, 0.2, -5.75, scene);
  // 창(밖은 밤) + 창틀
  const out = K.canvasTex(256, 256, (c, w, h) => { c.fillStyle = '#4a4946'; c.fillRect(0, 0, w, h); c.fillStyle = '#6e6c66'; c.fillRect(0, h * 0.7, w, h * 0.3); c.fillStyle = '#d8d4cc'; c.beginPath(); c.arc(w * 0.75, h * 0.35, 10, 0, 7); c.fill(); });
  const win = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 4.2), new THREE.MeshBasicMaterial({ map: out })); win.position.set(1.4, 4.0, -5.75); scene.add(win);
  [[1.4, 6.15, 3.9, 0.2], [1.4, 1.85, 3.9, 0.3], [1.4, 4.0, 3.7, 0.1]].forEach(([x, y, w, h]) => K.box(w, h, 0.25, 0x3a3936, x, y, -5.7, scene)); [-0.45, 1.4, 3.25].forEach(x => K.box(0.18, 4.4, 0.25, 0x3a3936, x, 4.0, -5.7, scene));
  // 커튼 둘
  const curt = []; [-1.3, 4.1].forEach((x, i) => { const c = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 5.4, 4, 8), new THREE.MeshLambertMaterial({ color: 0x8a8782, side: THREE.DoubleSide })); c.position.set(x, 4.0, -5.5); scene.add(c); curt.push({ c, b: c.geometry.attributes.position.array.slice(), k: i }); });
  // 눈(창 앞 평면 바로 안쪽에서만 보이게 창 영역 안에서 움직임)
  const snow = []; for (let i = 0; i < 26; i++) { const s = new THREE.Mesh(new THREE.CircleGeometry(0.05 + (i % 3) * 0.02, 6), new THREE.MeshBasicMaterial({ color: 0xffffff })); scene.add(s); snow.push({ s, x: -0.3 + (i * 0.37) % 3.4, k: (i * 0.173) % 1 }); }
  // 침대·머리맡 탁자·촛불
  K.box(4.2, 0.9, 3, 0xf2f0ea, -5.2, 0.8, -3.2, scene); K.box(4.4, 2.0, 0.25, 0x45443f, -5.2, 1.4, -4.7, scene); K.box(1.4, 0.5, 2.6, 0xfbfaf6, -6.4, 1.4, -3.2, scene);
  const sleeper = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 10), K.lam(0x2a2a28)), 40); sleeper.position.set(-6.3, 1.75, -3.0); scene.add(sleeper);
  K.box(1.0, 1.4, 1.0, 0x55534e, -2.6, 0.7, -4.4, scene); K.cyl(0.08, 0.08, 0.5, 0xfbfaf6, -2.6, 1.65, -4.4, scene, 8);
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })); flame.position.set(-2.6, 2.03, -4.4); scene.add(flame);
  // 의자에 걸친 외투
  K.box(1.0, 0.1, 1.0, 0x45443f, 4.8, 1.1, -2.4, scene); K.box(1.0, 1.4, 0.1, 0x45443f, 4.8, 1.8, -2.9, scene); [[4.35, -1.95], [5.25, -1.95], [4.35, -2.85], [5.25, -2.85]].forEach(([x, z]) => K.box(0.08, 1.1, 0.08, 0x2a2a28, x, 0.55, z, scene));
  K.box(0.9, 1.3, 0.15, 0x2a2a28, 4.8, 1.75, -2.8, scene);
  // 사내(뒤 3/4) — 창을 바라봄
  const P = K.person(scene, { x: 1.0, z: -3.4, rot: 0.35, coat: 0x45443f, outfit: 'vest', sleeve: 0xf2f0ea, pants: 0x2a2a28, hair: 'short', eyes: 'closed', brows: 'worried', mouth: 'small', beard: 'mustache', seed: 11293 });
  cam.position.set(-1.0, 3.8, 6.6); cam.lookAt(-0.6, 3.0, -3.5);
  return (t, ph) => {
    P.pose({ headPitch: -0.1, headYaw: -0.25, armL: { fwd: 1.4, out: 0.5, elbow: 0.6 }, armR: { fwd: 0.1, elbow: 0.3 }, bob: 0.02 * Math.sin(ph) });
    snow.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.s.position.set(o.x + p * 0.8 - 0.4, 5.9 - p * 3.9, -5.68); });
    curt.forEach(o => { const a = o.c.geometry.attributes.position; for (let i = 0; i < a.count; i++) { const y = o.b[i * 3 + 1]; a.array[i * 3 + 2] = 0.1 * (2.7 - y) / 5.4 * Math.sin(ph * 2 + o.b[i * 3] * 3 + o.k); } a.needsUpdate = true; });
    flame.scale.set(1 + 0.15 * Math.sin(ph * 6), 1 + 0.25 * Math.sin(ph * 5 + 1), 1); flame.position.x = -2.6 + 0.02 * Math.sin(ph * 4);
  };
}
