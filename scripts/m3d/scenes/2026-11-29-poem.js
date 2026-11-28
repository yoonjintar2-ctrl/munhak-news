// 11/29 오늘의 시 「세월이 가면」: 비 오는 저녁 명동 골목(밝은 종이색 유지). 긴 외투 깃을 세운 사내가 가로등 아래 벤치 곁에 서서 다방 유리창 쪽을 돌아본다. 벤치 위 낙엽, 빗줄기·낙엽이 떨어지고 가로등 갓이 살짝 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xdad8d2, 25, 80] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfcbc1', line: '#c4c0b6', tiles: 8, repeat: 5 });
  K.backdrop(scene, { kind: 'city', seed: 1956 });
  // 왼쪽 2층 다방 건물 + 큰 유리창(안이 밝음) + 차양
  K.box(8, 7, 3, 0xb0aca4, -6.5, 3.5, -5, scene);
  K.box(4.2, 2.6, 0.1, 0xfbfaf6, -5.6, 2.0, -3.44, scene); K.box(4.4, 0.18, 0.2, 0x3a3936, -5.6, 3.35, -3.4, scene); K.box(4.4, 0.18, 0.2, 0x3a3936, -5.6, 0.68, -3.4, scene);
  [-7.7, -5.6, -3.5].forEach(x => K.box(0.15, 2.7, 0.2, 0x3a3936, x, 2.0, -3.4, scene));
  const awn = K.box(4.8, 0.12, 1.4, 0x55534e, -5.6, 3.9, -2.8, scene); awn.rotation.x = 0.25;
  // 창 안 탁자·찻잔 실루엣
  K.box(1.0, 0.1, 0.6, 0x55534e, -6.4, 1.4, -3.7, scene); K.cyl(0.08, 0.06, 0.15, 0x3a3936, -6.3, 1.53, -3.7, scene, 8);
  // 오른쪽 담장 + 포스터(도형만)
  K.box(7, 2.2, 0.4, 0x8a8782, 5, 1.1, -5.5, scene); K.box(1.2, 1.6, 0.05, 0xeeece6, 4, 1.4, -5.27, scene); K.box(1.2, 1.6, 0.05, 0xc8c4bb, 6, 1.4, -5.27, scene);
  // 가로등
  K.cyl(0.08, 0.12, 5.6, 0x2a2a28, 1.6, 2.8, -2.2, scene, 8); const lampG = new THREE.Group(); lampG.position.set(1.6, 5.6, -2.2); scene.add(lampG);
  K.box(0.9, 0.08, 0.08, 0x2a2a28, 0.45, 0, 0, lampG); const shade = K.cyl(0.15, 0.45, 0.4, 0x2a2a28, 0.9, -0.3, 0, lampG, 12); const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })); bulb.position.set(0.9, -0.5, 0); lampG.add(bulb);
  // 벤치 + 위의 낙엽
  K.box(2.6, 0.12, 0.7, 0x55534e, 3.4, 0.9, -1.4, scene); K.box(2.6, 0.6, 0.1, 0x55534e, 3.4, 1.3, -1.75, scene); [2.3, 4.5].forEach(x => K.box(0.1, 0.9, 0.6, 0x2a2a28, x, 0.45, -1.4, scene));
  for (let i = 0; i < 5; i++) { const l = new THREE.Mesh(new THREE.CircleGeometry(0.16, 5), new THREE.MeshLambertMaterial({ color: 0x3a3936, side: THREE.DoubleSide })); l.rotation.x = -Math.PI / 2; l.position.set(2.6 + i * 0.4, 0.97, -1.3 + (i % 2) * 0.2); scene.add(l); }
  // 사내: 긴 외투, 중절모, 목도리
  const P = K.person(scene, { x: 0.8, z: -0.6, rot: Math.PI / 2 - 0.5, coat: 0x3a3936, outfit: 'longcoat', hair: 'fedora', scarf: 0xeeece6, eyes: 'narrow', brows: 'worried', mouth: 'line', seed: 11292 });
  // 빗줄기
  const rain = []; for (let i = 0; i < 40; i++) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.6, 0.02), new THREE.MeshBasicMaterial({ color: 0x8a8782 })); l.rotation.z = 0.15; scene.add(l); rain.push({ l, x: -9 + (i * 2.37) % 18, z: -4 + (i * 1.31) % 7, k: (i * 0.137) % 1 }); }
  const leaves = []; for (let i = 0; i < 5; i++) { const l = new THREE.Mesh(new THREE.CircleGeometry(0.14, 5), new THREE.MeshLambertMaterial({ color: 0x45443f, side: THREE.DoubleSide })); scene.add(l); leaves.push({ l, k: i / 5 }); }
  // 웅덩이
  const pud = new THREE.Mesh(new THREE.CircleGeometry(0.9, 18), K.lam(0xb0aca4)); pud.rotation.x = -Math.PI / 2; pud.scale.x = 1.8; pud.position.set(-1.6, 0.02, 0.8); scene.add(pud);
  cam.position.set(0.5, 2.8, 7.6); cam.lookAt(0.5, 2.4, -2);
  return (t, ph) => {
    P.pose({ headYaw: 0.5 + 0.15 * Math.sin(ph), headPitch: -0.05, armL: { fwd: 0.15, elbow: 0.4 }, armR: { fwd: 0.2, elbow: 0.5 } });
    lampG.rotation.x = 0.04 * Math.sin(ph * 2);
    rain.forEach(o => { const p = (ph / (Math.PI * 2) * 3 + o.k) % 1; o.l.position.set(o.x + p * 0.6, 7.5 - p * 7.5, o.z); });
    leaves.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.l.position.set(2.0 + o.k * 3 + 0.5 * Math.sin(p * 8 + o.k * 4), 5.0 - p * 4.9, -2 + o.k * 1.5); o.l.rotation.set(p * 7, p * 5, o.k); });
  };
}
