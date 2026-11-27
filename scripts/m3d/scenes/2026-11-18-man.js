// 11/18 오늘의 사나이 영국 SAS: 비 내리는 웨일스 브레컨 비컨스 능선(선발 과정 행군). 무거운 배낭을 멘 대원 둘이 오른쪽 위 능선으로 걸어 오른다(진행 방향 = 화면 오른쪽 안쪽, 얼굴·발끝도 그쪽). 빗줄기, 낮게 흐르는 구름, 능선 꼭대기 돌무더기(케언). 카메라 고정
export const secs = 3;
export const opts = { bg: 0xcfcdc7, fog: [0xc8c6c0, 20, 70], fov: 40, w: 720, h: 860 };
export default function (K) {
  const { THREE, scene, cam } = K;
  // 비탈(오른쪽 위로 오르는 풀밭) + 먼 능선 두 겹
  const slope = new THREE.Mesh(new THREE.PlaneGeometry(80, 60, 1, 1), K.lam(0x9a978f)); slope.rotation.x = -Math.PI / 2; slope.rotation.z = 0; scene.add(slope);
  const hill = (x, z, r, h, c) => { const m = K.inked(new THREE.Mesh(new THREE.SphereGeometry(r, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(c)), 60); m.scale.y = h / r; m.position.set(x, 0, z); scene.add(m); return m; };
  hill(16, -20, 20, 8, 0x8a8780); hill(-18, -28, 26, 11, 0xa9a69f); hill(30, -34, 24, 14, 0xb6b3ac);
  // 길: 비탈 위로 이어진 발자국 길
  for (let i = 0; i < 12; i++) K.box(0.9, 0.05, 0.5, 0x6f6c66, -4 + i * 1.3, 0.03, 6 - i * 1.6, scene).rotation.y = -0.6;
  // 케언(돌무더기) — 능선 꼭대기
  [[0, 0.6, 1.4], [0.2, 1.5, 1.0], [-0.1, 2.2, 0.7]].forEach(([dx, y, r]) => { const st = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(r), K.lam(0x6c6963)), 30); st.position.set(12 + dx, 8.4 + y, -14); scene.add(st); });
  // 풀숲·바위
  for (let i = 0; i < 14; i++) { const r = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(0.35 + (i % 3) * 0.2), K.lam([0x7a776f, 0x8a877f, 0x6a675f][i % 3])), 30); r.position.set(-14 + (i * 3.7) % 26, 0.2, 2 - (i * 2.3) % 14); scene.add(r); }
  // 대원 둘(배낭·헬멧·조끼), 오른쪽 안쪽(-x 방향이 왼쪽이니 오른쪽 = +x 쪽 → rot -π/2 기준으로 조금 안쪽)
  const A = K.athlete(scene, { x: 1.6, z: 2.6, rot: -1.15, kind: 'soldier', scale: 1.1 });
  const B = K.athlete(scene, { x: -2.6, z: 4.6, rot: -1.15, kind: 'soldier', scale: 1.05 });
  // 비: 가는 사선 빗줄기
  const rain = []; for (let i = 0; i < 90; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.9, 0.03), K.flat(0xf2f1ec)); m.rotation.z = 0.25; scene.add(m); rain.push({ m, x: -14 + (i * 7.31) % 30, z: -6 + (i * 3.17) % 14, k: (i * 0.137) % 1 }); }
  // 낮은 구름 띠
  const cl = []; for (let i = 0; i < 5; i++) { const c = new THREE.Mesh(new THREE.SphereGeometry(4 + i, 16, 10), new THREE.MeshBasicMaterial({ color: 0xe6e4df, transparent: true, opacity: 0.55, depthWrite: false })); c.scale.y = 0.35; c.position.set(-20 + i * 11, 12 + (i % 2) * 2, -26); scene.add(c); cl.push(c); }
  cam.position.set(-2.0, 5.5, 22); cam.lookAt(-1.5, 3.4, 0);
  return (t, ph) => {
    const st = (p, o) => { const s = Math.sin(ph * 2 + o);
      return { legL: { fwd: 0.45 * s, knee: 0.35 + 0.3 * Math.max(0, -s) }, legR: { fwd: -0.45 * s, knee: 0.35 + 0.3 * Math.max(0, s) },
        armL: { fwd: -0.3 * s, elbow: 0.5 }, armR: { fwd: 0.3 * s, elbow: 0.5 }, lean: 0.28, headPitch: 0.1, bob: 0.05 * Math.abs(Math.cos(ph * 2 + o)) }; };
    A.pose(st(ph, 0)); B.pose(st(ph, 1.4));
    A.root.position.x = 1.6 + 0.25 * Math.sin(ph); B.root.position.x = -2.6 + 0.25 * Math.sin(ph);
    rain.forEach(o => { const v = (o.k + (ph / (Math.PI * 2)) * 3) % 1; o.m.position.set(o.x - v * 2.0, 12 - v * 12, o.z); });
    cl.forEach((c, i) => { c.position.x = -20 + i * 11 + 1.2 * Math.sin(ph + i); });
  };
}
