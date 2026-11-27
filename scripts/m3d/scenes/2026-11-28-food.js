// 11/28 문학 한술 「이상한 나라의 앨리스」 잼 타르트: 재판정 탁자 위 큰 은접시에 동그란 잼 타르트가 수북하고, 찻주전자·찻잔·장미 화병. 붉은 커튼(진한 회색) 살랑임·찻주전자 김·장미 꽃잎 떨어짐. 사람 없음. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d2cec4', line: '#cac6bc', tiles: 4, repeat: 3 });
  K.box(40, 14, 0.4, 0xeae8e2, 0, 7, -6, scene);
  // 재판석(높은 의자 두 개) — 하트·카드 무늬 없이 단순 형태
  [-1.8, 1.8].forEach(x => { K.box(1.6, 4.6, 0.4, 0x55534e, x, 2.3, -5.4, scene); const t = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x55534e)); t.position.set(x, 4.6, -5.4); t.scale.z = 0.3; scene.add(t); });
  const curt = []; [-5.6, 5.6].forEach((x, i) => { const c = new THREE.Mesh(new THREE.PlaneGeometry(3, 9, 6, 8), new THREE.MeshLambertMaterial({ color: 0x6e6c66, side: THREE.DoubleSide })); c.position.set(x, 4.5, -5.6); scene.add(c); curt.push({ c, b: c.geometry.attributes.position.array.slice(), k: i }); });
  // 탁자 + 식탁보
  K.box(6, 0.2, 3, 0xf6f5f1, 0, 2.0, 0, scene); K.box(6.1, 0.9, 3.1, 0xeeece6, 0, 1.5, 0, scene); [[-2.7, -1.3], [2.7, -1.3], [-2.7, 1.3], [2.7, 1.3]].forEach(([x, z]) => K.box(0.2, 1.1, 0.2, 0x3a3936, x, 0.55, z, scene));
  // 은접시 + 타르트 더미
  const dish = K.cyl(1.5, 1.2, 0.15, 0xb0aca4, -0.3, 2.18, 0.1, scene, 32);
  const tarts = []; const pos = [[0, 0, 0], [0.55, 0, 0.3], [-0.55, 0, 0.3], [0.5, 0, -0.45], [-0.5, 0, -0.45], [0, 0, 0.7], [0, 0, -0.75], [0.95, 0, -0.1], [-0.95, 0, -0.1], [0.25, 0.2, 0.1], [-0.3, 0.2, -0.15], [0.05, 0.38, -0.02]];
  pos.forEach(([x, y, z], i) => { const g = new THREE.Group(); g.position.set(-0.3 + x, 2.3 + y, 0.1 + z); g.rotation.set((i % 3 - 1) * 0.12, i, (i % 2 - 0.5) * 0.15); scene.add(g);
    const sh = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.26, 0.12, 14), K.lam(0xc8c4bb)), 40); g.add(sh); const rim = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.05, 6, 14), K.lam(0xb0aca4)); rim.rotation.x = Math.PI / 2; rim.position.y = 0.06; g.add(rim);
    const jam = new THREE.Mesh(new THREE.CircleGeometry(0.21, 14), K.lam(0x2a2a28)); jam.rotation.x = -Math.PI / 2; jam.position.y = 0.065; g.add(jam); tarts.push(g); });
  // 찻주전자·찻잔·화병
  const pot = new THREE.Group(); pot.position.set(2.0, 2.1, -0.4); scene.add(pot); const pb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 12), K.lam(0xfbfaf6)), 40); pb.scale.y = 0.85; pb.position.y = 0.45; pot.add(pb);
  const sp = K.cyl(0.05, 0.09, 0.6, 0xfbfaf6, -0.55, 0.55, 0, pot, 8); sp.rotation.z = 0.9; const hd = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 6, 12, Math.PI), K.lam(0xfbfaf6)); hd.position.set(0.5, 0.5, 0); hd.rotation.z = -Math.PI / 2; pot.add(hd); K.cyl(0.08, 0.12, 0.12, 0x3a3936, 0, 0.92, 0, pot, 8);
  [[1.5, 0.8], [2.6, 0.6]].forEach(([x, z]) => { K.cyl(0.32, 0.38, 0.04, 0xfbfaf6, x, 2.12, z, scene, 14); K.cyl(0.2, 0.15, 0.25, 0xfbfaf6, x, 2.26, z, scene, 12); });
  K.cyl(0.18, 0.25, 0.9, 0x45443f, -2.4, 2.55, -0.6, scene, 12);
  const roses = []; [[-0.15, 0.2], [0.18, 0.1], [0, -0.2]].forEach(([dx, dz], i) => { K.cyl(0.02, 0.02, 0.8, 0x3a3936, -2.4 + dx, 3.2, -0.6 + dz, scene, 4); const r = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), K.lam(0x55534e)), 40); r.position.set(-2.4 + dx, 3.65, -0.6 + dz); scene.add(r); roses.push(r); });
  const petals = []; for (let i = 0; i < 4; i++) { const p = new THREE.Mesh(new THREE.CircleGeometry(0.08, 6), new THREE.MeshLambertMaterial({ color: 0x55534e, side: THREE.DoubleSide })); scene.add(p); petals.push({ p, k: i / 4 }); }
  const steam = []; for (let i = 0; i < 5; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })); scene.add(s); steam.push({ s, k: i / 5 }); }
  cam.position.set(0, 4.2, 5.6); cam.lookAt(0, 2.3, -0.2);
  return (t, ph) => {
    curt.forEach(o => { const a = o.c.geometry.attributes.position; for (let i = 0; i < a.count; i++) { const y = o.b[i * 3 + 1]; a.array[i * 3 + 2] = 0.12 * (4.5 - y) / 9 * Math.sin(ph * 2 + o.b[i * 3] * 2 + o.k); } a.needsUpdate = true; });
    steam.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.s.position.set(1.45 + 0.15 * Math.sin(p * 7), 2.8 + p * 1.6, -0.4); o.s.scale.setScalar(0.6 + p * 1.6); o.s.material.opacity = 0.75 * (1 - p); });
    petals.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.p.position.set(-2.3 + 0.4 * Math.sin(p * 8 + o.k * 5), 3.6 - p * 1.5, -0.4 + o.k * 0.6); o.p.rotation.set(p * 6, p * 4, 0); });
    roses.forEach((r, i) => { r.position.y = 3.65 + 0.02 * Math.sin(ph * 2 + i); });
  };
}
