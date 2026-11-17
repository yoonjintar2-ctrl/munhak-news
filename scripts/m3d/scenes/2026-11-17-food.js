// 11/17 문학 한술 「운수 좋은 날」 설렁탕: 나무 상 위 뚝배기 설렁탕(뽀얀 국물·편육·송송 썬 파·소면), 깍두기 접시, 수저.
// 뒤로 비 내리는 창호 창문. 김이 모락모락 오르고, 창밖 빗줄기가 내린다.
export const secs = 3;
export const opts = { bg: 0xeeece6, fog: [0xeceae4, 30, 90], fov: 38 };
export default function (K) {
  const { THREE, scene, cam } = K;
  // 나무 상
  const top = K.box(9, 0.35, 5.4, 0x8e7d6a, 0, -0.18, 0, scene);
  for (let i = 0; i < 4; i++) K.line([[-4.5, 0.001, -2.0 + i * 1.3], [4.5, 0.001, -2.0 + i * 1.3]], scene);
  // 뒷벽 + 창호 창문(비 오는 바깥은 회색)
  K.box(30, 14, 0.3, 0xe4e1d9, 0, 4, -6, scene);
  const win = K.box(6.0, 3.6, 0.2, 0xb9b7b1, 1.2, 3.4, -5.8, scene);
  for (let i = 1; i < 6; i++) K.box(0.08, 3.6, 0.25, 0x6e6a62, -1.8 + i * 1.0, 3.4, -5.7, scene);
  for (let j = 1; j < 4; j++) K.box(6.0, 0.08, 0.25, 0x6e6a62, 1.2, 1.6 + j * 0.9, -5.7, scene);
  K.box(6.3, 0.18, 0.35, 0x5a554d, 1.2, 1.55, -5.7, scene); K.box(6.3, 0.18, 0.35, 0x5a554d, 1.2, 5.25, -5.7, scene);
  const rain = []; for (let i = 0; i < 26; i++) { const r = new THREE.Mesh(new THREE.PlaneGeometry(0.025, 0.5), K.flat(0xf6f5f1)); r.position.z = -5.62; scene.add(r); rain.push({ r, x: -1.6 + (i * 0.223) % 5.6, k: (i * 0.37) % 1 }); }
  // 뚝배기(옹기 — 진한 색) : 아래가 좁고 위가 넓은 그릇 + 두꺼운 테
  const prof = [[0, 0], [0.85, 0], [1.05, 0.12], [1.32, 0.75], [1.42, 1.05], [1.36, 1.1], [1.26, 0.82], [0, 0.82]].map(p => new THREE.Vector2(p[0], p[1]));
  const bowl = K.inked(new THREE.Mesh(new THREE.LatheGeometry(prof, 36), K.lam(0x3a3632)), 35); bowl.position.set(-0.6, 0, 0.2); scene.add(bowl);
  // 뽀얀 국물
  const soup = new THREE.Mesh(new THREE.CircleGeometry(1.27, 36), K.lam(0xf4f2ec)); soup.rotation.x = -Math.PI / 2; soup.position.set(-0.6, 0.95, 0.2); scene.add(soup);
  // 편육 몇 점
  [[-0.95, 0.05, 0.4], [-0.35, -0.25, -0.5], [-0.2, 0.55, 0.9]].forEach(([dx, dz, r]) => { const m = K.box(0.55, 0.05, 0.32, 0xb4aca2, -0.6 + dx, 0.97, 0.2 + dz, scene); m.rotation.y = r; });
  // 소면 한 타래(옅은 고리)
  for (let i = 0; i < 3; i++) { const n = new THREE.Mesh(new THREE.TorusGeometry(0.22 + i * 0.05, 0.022, 6, 24), K.lam(0xe9e6de)); n.rotation.x = -Math.PI / 2; n.position.set(-0.15, 0.975, 0.55); scene.add(n); }
  // 송송 썬 파
  for (let i = 0; i < 16; i++) { const a = i * 2.4, rr = 0.25 + (i % 5) * 0.18; const g = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.018, 5, 10), K.lam(0x55604f)); g.rotation.x = -Math.PI / 2; g.position.set(-0.6 + rr * Math.cos(a), 0.985, 0.2 + rr * Math.sin(a)); scene.add(g); }
  // 깍두기 접시
  K.cyl(0.95, 0.8, 0.14, 0xf2f0ea, 2.0, 0.07, 0.6, scene, 28);
  const kk = []; for (let i = 0; i < 9; i++) { const c = K.box(0.26, 0.24, 0.26, 0x8f8a83, 1.6 + (i % 3) * 0.36, 0.27 + Math.floor(i / 3) * 0.02, 0.25 + Math.floor(i / 3) * 0.33, scene); c.rotation.y = i * 0.7; kk.push(c); }
  // 숟가락·젓가락(옆에 가지런히)
  const sp = new THREE.Group(); sp.position.set(-0.5, 0.03, 2.05); sp.rotation.y = 0.08; scene.add(sp);
  K.box(2.3, 0.04, 0.09, 0xcfcdc7, 0.6, 0, 0, sp); const head = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 8), K.lam(0xd8d6d0)), 40); head.scale.set(1.3, 0.18, 0.95); head.position.set(-0.75, 0.02, 0); sp.add(head);
  K.cyl(0.035, 0.05, 2.8, 0xcfcdc7, 0.5, 0.04, 2.45, scene, 6).rotation.z = Math.PI / 2;
  K.cyl(0.035, 0.05, 2.8, 0xcfcdc7, 0.5, 0.04, 2.6, scene, 6).rotation.z = Math.PI / 2;
  // 소금 종지
  K.cyl(0.32, 0.26, 0.22, 0xf2f0ea, 1.75, 0.11, -0.95, scene, 20);
  // 김: 삽화식 꼬불꼬불한 선 3가닥이 일렁이며 피어오름
  const steam = []; for (let i = 0; i < 3; i++) { const N = 28, pos = new Float32Array(N * 3); const g = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)); const l = new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x55524c })); scene.add(l); steam.push({ g, pos, N, x0: -1.05 + i * 0.45, z0: 0.2 - (i % 2) * 0.25, k: i * 2.1 }); }
  cam.position.set(0.9, 5.4, 7.6); cam.lookAt(0.4, 0.8, -0.3);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    steam.forEach(o => { for (let j = 0; j < o.N; j++) { const v = j / (o.N - 1); o.pos[j * 3] = o.x0 + (0.08 + 0.16 * v) * Math.sin(v * 9 - ph * 2 + o.k); o.pos[j * 3 + 1] = 1.3 + v * (1.9 + 0.15 * Math.sin(ph + o.k)); o.pos[j * 3 + 2] = o.z0; } o.g.attributes.position.needsUpdate = true; });
    rain.forEach(o => { const v = (o.k + u * 2) % 1; o.r.position.set(o.x, 5.0 - v * 3.2, -5.62); });
  };
}
