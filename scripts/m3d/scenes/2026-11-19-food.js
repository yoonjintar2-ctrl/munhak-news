// 11/19 문학 한술 「마들렌」(프루스트): 창가 탁자 위 흰 접시에 조가비 모양 마들렌 두 개, 찻잔과 받침, 홍차에 적신 마들렌 한 조각을 얹은 찻숟가락. 찻잔에서 김이 오르고, 창밖에 눈발이 날리며 레이스 커튼이 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xeae8e2, 30, 90], fov: 38 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(9, 0.35, 5.4, 0xc8c3b8, 0, -0.18, 0, scene); K.box(9.2, 0.04, 5.6, 0xf2f0ea, 0, 0.01, 0, scene); // 탁자 + 식탁보
  K.box(30, 14, 0.3, 0xe4e1d9, 0, 4, -6, scene);
  // 창(바깥 겨울 하늘) + 창살
  K.box(5.0, 3.6, 0.2, 0x6e6c66, 0.8, 3.0, -5.8, scene); K.box(4.6, 3.2, 0.1, 0x9a978f, 0.8, 3.0, -5.7, scene); K.box(0.1, 3.2, 0.2, 0x45443f, 0.8, 3.0, -5.62, scene); K.box(4.6, 0.1, 0.2, 0x45443f, 0.8, 3.0, -5.62, scene);
  const cur = new THREE.Group(); cur.position.set(-1.9, 4.8, -5.4); scene.add(cur); K.box(1.2, 3.6, 0.04, 0xf6f4ef, 0, -1.8, 0, cur);
  const snow = []; for (let i = 0; i < 30; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 5), K.flat(0xffffff)); scene.add(s); snow.push({ s, x: -1.3 + (i * 0.37) % 4.3, k: (i * 0.173) % 1 }); }
  // 마들렌 만들기(조가비: 납작한 반타원 + 홈 선)
  const madel = (x, z, ry, sc = 1) => { const g = new THREE.Group(); g.position.set(x, 0.14, z); g.rotation.y = ry; g.scale.setScalar(sc); scene.add(g);
    const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.6, 22, 12, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x9a8d76)), 30); b.scale.set(1.0, 0.6, 0.72); g.add(b);
    const hump = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 10), K.lam(0x8a7d66)), 40); hump.scale.set(1.0, 0.6, 0.9); hump.position.set(0.1, 0.25, 0); g.add(hump);
    return g; };
  K.cyl(1.1, 0.9, 0.08, 0xf8f7f3, -1.2, 0.08, 0.3, scene, 30);
  madel(-1.5, 0.1, 0.4); madel(-0.9, 0.6, -0.5);
  // 찻잔 + 받침 + 홍차
  K.cyl(0.9, 0.75, 0.06, 0xf8f7f3, 1.4, 0.06, -0.2, scene, 28);
  K.cyl(0.55, 0.42, 0.75, 0xf8f7f3, 1.4, 0.48, -0.2, scene, 24); const tea = new THREE.Mesh(new THREE.CircleGeometry(0.5, 24), K.lam(0x5a554d)); tea.rotation.x = -Math.PI / 2; tea.position.set(1.4, 0.8, -0.2); scene.add(tea);
  const handle = K.inked(new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 8, 16), K.lam(0xf8f7f3)), 1); handle.position.set(2.0, 0.5, -0.2); scene.add(handle);
  // 숟가락 + 적신 조각
  const sp = new THREE.Group(); sp.position.set(1.0, 0.18, 1.0); sp.rotation.y = 0.5; scene.add(sp); K.box(1.2, 0.04, 0.1, 0xdedcd6, 0.4, 0, 0, sp); const bowl = K.cyl(0.18, 0.14, 0.05, 0xdedcd6, -0.3, 0.02, 0, sp, 14); bowl.scale.z = 0.7;
  const piece = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x9a8c75)), 40); piece.scale.y = 0.6; piece.position.set(-0.3, 0.05, 0); sp.add(piece);
  // 김
  const steam = []; for (let i = 0; i < 16; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false })); scene.add(s); steam.push({ s, k: i / 16 }); }
  cam.position.set(0.0, 2.6, 4.2); cam.lookAt(0.1, 0.7, -0.4);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    steam.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(1.4 + 0.2 * Math.sin(ph * 2 + o.k * 7), 0.9 + v * 2.0, -0.2 + 0.1 * Math.cos(ph + o.k * 5)); o.s.scale.setScalar(0.6 + v * 1.8); o.s.material.opacity = 0.5 * (1 - v); });
    snow.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(o.x + 0.15 * Math.sin(ph + o.k * 9), 4.5 - v * 3.0, -5.65); });
    cur.rotation.x = -0.12 - 0.1 * Math.sin(ph); cur.rotation.z = 0.03 * Math.sin(ph * 2);
    sp.rotation.z = 0.02 * Math.sin(ph * 2);
  };
}
