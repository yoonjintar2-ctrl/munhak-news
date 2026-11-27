// 11/19 오늘의 문장 「칼의 노래」 "버려진 섬마다 꽃이 피었다": 썰물 진 남해 바닷가 바위 위에 갑옷 차림 장수가 등을 보이고 서서 건너편 빈 섬들을 바라본다. 발치의 들꽃 무더기가 바람에 흔들리고, 물결이 밀려오며, 갈매기가 난다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xeae8e2, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#dedbd3', line: '#d4d1c9', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'shore', seed: 19 });
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(120, 40), K.lam(0xb4b2ab)); sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0.04, -24); scene.add(sea);
  // 건너편 빈 섬 세 개(낮은 언덕 + 소나무 몇 그루)
  const isle = (x, z, r, h, c) => { const m = K.inked(new THREE.Mesh(new THREE.SphereGeometry(r, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(c)), 60); m.scale.y = h / r; m.position.set(x, 0, z); scene.add(m); return m; };
  isle(-9, -22, 5, 3.2, 0x8f8c85); isle(4, -28, 7, 4.2, 0xa29f98); isle(14, -20, 3.5, 2.2, 0x87847d);
  [[-10, -21], [-8, -20.5], [4.5, -24.5], [13.5, -19]].forEach(([x, z], i) => { const g = new THREE.Group(); g.position.set(x, 2.2 + (i == 2 ? 1.6 : 0), z); scene.add(g); K.cyl(0.08, 0.12, 1.2, 0x4a4945, 0, 0.6, 0, g, 6); const c = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.0, 8), K.lam(0x5a5853)), 50); c.position.y = 1.4; g.add(c); });
  // 바위 + 장수
  const rock = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(2.2), K.lam(0x7a7770)), 30); rock.scale.set(1.1, 0.45, 0.9); rock.position.set(0.4, 0.0, -3.2); scene.add(rock);
  [[-3.4, -2.2, 0.8], [4.2, -1.5, 0.6], [-1.5, 0.4, 0.4]].forEach(([x, z, r]) => { const s = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(r), K.lam(0x6c6963)), 30); s.position.set(x, r * 0.4, z); scene.add(s); });
  const G = K.person(scene, { x: 0.6, z: -3.2, rot: 0.15, coat: 0x2e2d2a, pants: 0x3e3d3a, hair: 'bun', scale: 1.0 });
  G.root.position.y = 0.95;
  // 갑옷 비늘 띠·어깨덮개, 허리 칼
  [0.25, 0.55, 0.85].forEach(y => { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.68, 0.08, 18), K.lam(0x7a7872)); b.position.y = y; G.torso.add(b); });
  [-1, 1].forEach(sd => { const p = K.box(0.55, 0.12, 0.7, 0x6a6862, sd * 0.78, 1.42, 0, G.torso); p.rotation.z = sd * -0.35; });
  const sw = K.cyl(0.05, 0.05, 2.0, 0x1c1c1a, 0.72, 0.1, 0.2, G.torso, 6); sw.rotation.x = 0.5;
  // 들꽃 무더기(바위 양옆) — 덤불 위에 흰 꽃송이, 바람에 흔들림
  const fl = []; [[-3.2, -1.6], [-2.2, -0.6], [3.4, -1.2], [2.4, -0.2], [-4.4, -2.8]].forEach(([x, z], j) => { const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g);
    const bush = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.75, 12, 8), K.lam(0x6e6c66)), 60); bush.scale.y = 0.55; bush.position.y = 0.3; g.add(bush);
    for (let i = 0; i < 6; i++) { const f = new THREE.Group(); const a = i * 1.05 + j; f.position.set(Math.cos(a) * 0.45, 0.62, Math.sin(a) * 0.35); g.add(f);
      for (let k = 0; k < 5; k++) { const pe = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 5), K.lam(0xf8f7f2)); pe.position.set(Math.cos(k * 1.256) * 0.1, 0, Math.sin(k * 1.256) * 0.1); f.add(pe); }
      const c = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), K.lam(0x55534e)); c.position.y = 0.03; f.add(c); fl.push(f); } });
  // 물결
  const rip = []; for (let i = 0; i < 7; i++) { const r = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 0.08), K.flat(0xf3f2ee)); r.rotation.x = -Math.PI / 2; scene.add(r); rip.push({ r, k: i / 7, x: -9 + i * 3 }); }
  const gull = K.bird(scene, { cx: 2, cy: 7.5, cz: -12, rx: 6, rz: 2, s: 0.8 });
  cam.position.set(0.4, 4.0, 5.8); cam.lookAt(0.5, 2.7, -6.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    const look = K.win(ph, 0.25, 0.85, 0.15);
    G.pose({ headYaw: -0.45 * look, headPitch: -0.05, torsoYaw: -0.1 * look, armL: { fwd: 0.1, elbow: 0.2 }, armR: { fwd: 0.25, elbow: 0.7 } });
    fl.forEach((g, i) => { g.rotation.z = 0.35 * Math.sin(ph + i * 0.6); g.position.y = 0.62 + 0.05 * Math.sin(ph * 2 + i); });
    rip.forEach(o => { const v = (o.k + u) % 1; o.r.position.set(o.x, 0.06, -12 + v * 6); o.r.scale.x = 0.6 + 0.6 * Math.sin(Math.PI * v); });
    if (gull && gull.update) gull.update(ph);
  };
}
