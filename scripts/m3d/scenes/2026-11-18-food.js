// 11/18 문학 한술 「빵」: 식탁 위 나무 도마에 거무스름한 호밀빵 한 덩이와 썰어 둔 두 쪽, 빵칼, 흰 접시 두 개(한 접시엔 빵 한 쪽). 뒤로 밤 창문, 커튼이 바람에 흔들리고 머리 위 전등갓이 흔들린다. 부스러기가 조금 떨어진다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xeae8e2, 30, 90], fov: 38 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(9, 0.35, 5.4, 0xb4afa6, 0, -0.18, 0, scene);
  for (let i = 0; i < 3; i++) K.line([[-4.5, 0.001, -1.6 + i * 1.6], [4.5, 0.001, -1.6 + i * 1.6]], scene);
  K.box(30, 14, 0.3, 0xe4e1d9, 0, 4, -6, scene);
  K.box(5.0, 3.2, 0.2, 0x6e6c67, 1.6, 2.5, -5.8, scene); K.box(4.6, 2.8, 0.1, 0x8a8882, 1.6, 2.5, -5.7, scene); K.box(0.08, 2.8, 0.2, 0x45443f, 1.6, 2.5, -5.62, scene);
  const cur = new THREE.Group(); cur.position.set(-1.0, 4.2, -5.5); scene.add(cur); K.box(1.0, 3.2, 0.04, 0xf0eee8, 0, -1.6, 0, cur);
  // 도마 + 빵 덩이(반쯤 썬 단면) + 썬 두 쪽 + 빵칼
  K.box(3.2, 0.18, 1.9, 0x6e5f4e, -0.6, 0.09, 0.0, scene);
  const loaf = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.0, 20, 14), K.lam(0x4a4440)), 35); loaf.scale.set(1.0, 0.55, 0.75); loaf.position.set(-1.1, 0.55, 0.0); scene.add(loaf);
  const cut = new THREE.Mesh(new THREE.CircleGeometry(0.62, 24), K.lam(0xcfc8bc)); cut.scale.set(1.0, 0.85, 1); cut.rotation.y = Math.PI / 2; cut.position.set(-0.32, 0.52, 0.0); scene.add(cut);
  const sl = []; for (let i = 0; i < 2; i++) { const g = new THREE.Group(); g.position.set(0.25 + i * 0.5, 0.2, 0.15 - i * 0.2); g.position.y = 0.26 + i * 0.12; g.position.x = 0.35 + i * 0.25; g.rotation.set(0.12, 0.2, -0.15); scene.add(g); const s = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.14, 24), K.lam(0xd6cfc3)), 35); s.scale.set(1, 1, 0.8); g.add(s); sl.push(g); }
  const knife = new THREE.Group(); knife.position.set(0.0, 0.25, 0.85); scene.add(knife); K.box(1.6, 0.03, 0.22, 0xd8d6d0, 0, 0, 0, knife); K.box(0.8, 0.12, 0.16, 0x2a2a28, -1.15, 0, 0, knife);
  // 접시 두 개(오른쪽 접시에 빵 한 쪽)
  K.cyl(0.75, 0.62, 0.08, 0xf4f2ee, 2.3, 0.04, -0.6, scene, 28); K.cyl(0.75, 0.62, 0.08, 0xf4f2ee, 2.4, 0.04, 1.2, scene, 28);
  const one = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.1, 24), K.lam(0xd6cfc3)), 35); one.scale.set(1, 1, 0.8); one.position.set(2.4, 0.14, 1.2); scene.add(one);
  K.box(2.6, 0.12, 0.6, 0x45443f, -3.2, 2.6, -5.6, scene); [[-4.0, 0x3a3936], [-3.3, 0x8a8782], [-2.6, 0x55534e]].forEach(([x, c]) => K.cyl(0.22, 0.22, 0.6, c, x, 2.96, -5.6, scene, 12));
  // 전등
  const lamp = new THREE.Group(); lamp.position.set(0.4, 6.0, -1.6); scene.add(lamp); K.cyl(0.02, 0.02, 2.4, 0x1f1f1d, 0, -1.2, 0, lamp, 4);
  const shade = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.8, 0.6, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x3a3936, side: THREE.DoubleSide })), 40); shade.position.y = -2.6; lamp.add(shade);
  const crumbs = []; for (let i = 0; i < 6; i++) { const c = K.box(0.06, 0.05, 0.06, 0x8a8278, 0, 0, 0, scene); crumbs.push({ c, x: 0.0 + (i % 3) * 0.18, z: 0.4 + Math.floor(i / 3) * 0.2, k: i / 6 }); }
  cam.position.set(0.8, 3.2, 6.2); cam.lookAt(0.6, 1.3, -1.2);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    lamp.rotation.z = 0.06 * Math.sin(ph); lamp.rotation.x = 0.04 * Math.sin(ph + 1);
    cur.rotation.x = -0.2 - 0.15 * Math.sin(ph); cur.rotation.z = 0.04 * Math.sin(ph * 2);
    knife.rotation.y = 0.05 * Math.sin(ph * 2); knife.position.y = 0.25 + 0.02 * Math.abs(Math.sin(ph * 2));
    crumbs.forEach(o => { const v = (u + o.k) % 1; o.c.position.set(o.x, 0.6 - 0.45 * Math.min(1, v * 1.4), o.z); });
  };
}
