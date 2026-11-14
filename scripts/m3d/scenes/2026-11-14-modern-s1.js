// 11/14 1분 현대문학 장면① 간병사 캐시: 들판 사이 시골길을 작은 차로 달린다(차는 그대로, 전봇대·나무가 스쳐 지나감) — 진행 방향 +x(배경이 오른쪽→왼쪽으로 흐름), 운전자 rot -π/2
export const secs = 3;
export const opts = { bg: 0xc6c6c2, fog: [0xc2c2be, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#adaca5', line: '#aaa9a2', tiles: 2, repeat: 4 });
  const road = new THREE.Mesh(new THREE.PlaneGeometry(120, 4), K.lam(0x6f6e6a)); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.02, 0.5); scene.add(road);
  const dash = []; for (let i = 0; i < 10; i++) { const d = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.12), K.flat(0xe8e8e2)); d.rotation.x = -Math.PI / 2; scene.add(d); dash.push({ d, k: i / 10 }); }
  // 지나가는 것들: 전봇대·나무(멀리 천천히), 앞 울타리 말뚝(빨리)
  const poles = []; for (let i = 0; i < 4; i++) { const g = new THREE.Group(); scene.add(g); K.cyl(0.1, 0.12, 6, 0x4a4a46, 0, 3, 0, g, 6); K.box(1.4, 0.1, 0.1, 0x4a4a46, 0, 5.6, 0, g); poles.push({ g, k: i / 4, z: -4, span: 48, sp: 1 }); }
  for (let i = 0; i < 5; i++) { const g = new THREE.Group(); scene.add(g); K.cyl(0.25, 0.35, 3, 0x55554f, 0, 1.5, 0, g, 8); const t = new THREE.Mesh(new THREE.SphereGeometry(1.8, 12, 8), K.lam(0x7d7c76)); t.position.y = 3.8; g.add(K.inked(t)); poles.push({ g, k: i / 5 + 0.1, z: -16, span: 60, sp: 0.5 }); }
  for (let i = 0; i < 8; i++) { const g = new THREE.Group(); scene.add(g); K.cyl(0.07, 0.08, 1.0, 0x4a4a46, 0, 0.5, 0, g, 5); poles.push({ g, k: i / 8, z: 4.2, span: 30, sp: 2 }); }
  // 작은 차 + 운전하는 캐시(창으로 머리·어깨)
  const car = new THREE.Group(); car.position.set(0, 0, 0.6); scene.add(car);
  K.box(4.0, 0.9, 1.8, 0x5f5f5b, 0, 0.75, 0, car); K.box(2.2, 0.9, 1.6, new THREE.MeshLambertMaterial({ color: 0xdedcd6, transparent: true, opacity: 0.28, depthWrite: false }), -0.2, 1.65, 0, car);   // 유리창(속이 보이게)
  const wheels = [[-1.3, 0.9], [1.3, 0.9], [-1.3, -0.9], [1.3, -0.9]].map(([x, z]) => { const w = K.cyl(0.38, 0.38, 0.22, 0x222222, x, 0.38, z, car, 14); w.rotation.x = Math.PI / 2; return w; });
  const P = K.person(scene, { x: 0, z: 0, rot: -Math.PI / 2, coat: 0xd5d2ca, pants: 0x55554f, hair: 'long', scale: 0.55 });
  car.add(P.root); P.root.position.set(0.1, 0.2, 0.15);
  cam.position.set(1.0, 2.8, 10); cam.lookAt(0, 1.4, -2);
  return (t, ph) => {
    const u0 = ph / (Math.PI * 2);
    dash.forEach(o => { const u = (o.k + u0 * 2) % 1; o.d.position.set(15 - u * 30, 0.04, 0.5); });
    poles.forEach(o => { const u = (o.k + u0 * o.sp) % 1; o.g.position.set(o.span / 2 - u * o.span, 0, o.z); });
    car.position.y = 0.04 * Math.abs(Math.sin(ph * 6)); wheels.forEach(w => w.rotation.y = -ph * 4);
    P.pose({ headYaw: 0.25 * K.win(ph, 0.4, 0.8, 0.1), armL: { fwd: 1.2, elbow: 0.6 }, armR: { fwd: 1.2, elbow: 0.6 } });
  };
}
