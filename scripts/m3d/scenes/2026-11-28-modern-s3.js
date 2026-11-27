// 11/28 『기억 전달자』 장면③(after 6): 밤, 마을을 빠져나가는 들길. 소년이 뒷자리 아기 의자에 아기를 태우고 자전거를 몬다. 진행 방향 +x — 나무·울타리 기둥이 x 큰 값→작은 값으로 흐름, 자전거 앞바퀴·핸들 +x 쪽, 소년 rot -π/2(+x를 봄). 하늘에 수색 비행기 불빛이 훑고 지나감. 바퀴 돎·나무 흐름·탐조등. 카메라 고정
export const secs = 3;
export const opts = { bg: 0x9a9892, fog: [0x96948e, 20, 70] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#8a8780', line: '#828079', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2911, night: true, near: false });
  K.box(60, 0.04, 2.4, 0xb4b0a8, 0, 0.02, 0.6, scene);
  const moon = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), new THREE.MeshBasicMaterial({ color: 0xfbfaf6 })); moon.position.set(-9, 11, -30); scene.add(moon);
  const trees = []; for (let i = 0; i < 8; i++) { const g = new THREE.Group(); scene.add(g); K.cyl(0.15, 0.22, 2.6, 0x2a2a28, 0, 1.3, 0, g, 6); const c = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 8), K.lam(0x45443f)), 40); c.scale.y = 1.3; c.position.y = 3.2; g.add(c); trees.push({ g, x0: -16 + i * 4.4, z: -3.2 - (i % 2) * 1.2 }); }
  const posts = []; for (let i = 0; i < 12; i++) { const p = K.box(0.12, 1.0, 0.12, 0x3a3936, 0, 0.5, 2.6, scene); posts.push({ p, x0: -15 + i * 2.6 }); }
  // 자전거(앞 = +x)
  const bk = new THREE.Group(); bk.position.set(0, 0, 0.6); scene.add(bk);
  const wheels = [-1.0, 1.0].map(x => { const w = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.06, 6, 24), K.lam(0x1e1e1e)); w.position.set(x, 0.65, 0); bk.add(w); [0, 1, 2].forEach(j => { const sp = K.box(1.2, 0.03, 0.03, 0x55534e, 0, 0, 0, w); sp.rotation.z = j * Math.PI / 3; }); return w; });
  [[-1.0, 0.65, 0, 1.6, 0.6], [0.0, 1.05, 0, 2.0, -0.35], [0.95, 1.2, 0, 1.2, -1.2]].forEach(([x, y, z, l, r]) => { const b = K.cyl(0.05, 0.05, l, 0x2a2a28, x * 0.5, y, z, bk, 6); b.rotation.z = r + Math.PI / 2; });
  K.box(0.12, 0.06, 0.9, 0x2a2a28, 1.0, 1.85, 0, bk); // 핸들
  K.box(0.5, 0.08, 0.3, 0x2a2a28, -0.3, 1.55, 0, bk); // 안장
  K.box(0.7, 0.5, 0.6, 0x6e6c66, -1.1, 1.55, 0, bk); // 아기 의자
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff })); lamp.position.set(1.15, 1.55, 0); bk.add(lamp);
  const B = K.person(scene, { x: -0.25, z: 0.6, rot: -Math.PI / 2, coat: 0xdedad2, outfit: 'sweater', pants: 0x3a3936, hair: 'short', eyes: 'wide', brows: 'worried', mouth: 'line', seed: 2912, scale: 0.75 }); { const L = new THREE.Group(); L.position.y = 0.55; scene.add(L); L.add(B.root); }
  const baby = new THREE.Group(); baby.position.set(-1.1, 1.95, 0.6); scene.add(baby); const bh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), K.lam(0xe2ddd4)); baby.add(bh); const bb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), K.lam(0xf2f0ea)), 40); bb.position.y = -0.3; baby.add(bb);
  // 수색 비행기 + 탐조등
  const plane = new THREE.Group(); scene.add(plane); K.box(1.8, 0.25, 0.3, 0x1e1e1e, 0, 0, 0, plane); K.box(0.4, 0.06, 2.4, 0x1e1e1e, 0.1, 0, 0, plane);
  const beam = new THREE.Mesh(new THREE.ConeGeometry(1.6, 9, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22, side: THREE.DoubleSide })); beam.position.y = -4.5; plane.add(beam);
  cam.position.set(0.4, 2.6, 7.4); cam.lookAt(0.2, 1.6, 0);
  return (t, ph) => {
    const p = ph / (Math.PI * 2), s = Math.sin(ph * 4);
    trees.forEach(o => { let x = o.x0 - p * 35.2; while (x < -18) x += 35.2; o.g.position.set(x, 0, o.z); });
    posts.forEach(o => { let x = o.x0 - p * 31.2; while (x < -16) x += 31.2; o.p.position.x = x; });
    wheels.forEach(w => { w.rotation.z = -ph * 6; });
    B.pose({ lean: 0.35, headPitch: -0.1, armL: { fwd: 1.25, elbow: 0.3, out: -0.15 }, armR: { fwd: 1.25, elbow: 0.3, out: 0.15 }, bob: 0.05 * s });
    baby.position.y = 1.95 + 0.03 * s;
    plane.position.set(-10 + 20 * p, 9.5, -8); beam.rotation.z = 0.25 * Math.sin(ph * 2);
  };
}
