// 11/25 하루키 장면③(after 4): 겨울 작은 방, 두꺼운 이불을 덮고 누운 사람(머리만 보임, 뒤척임) 곁에 쟁반 위 김 오르는 찻잔과 약봉지. 창밖으로 눈이 내리고 커튼이 살짝 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe2e0da, fog: [0xdedcd6, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2534 });
  K.box(20, 0.1, 12, 0xcfccc4, 0, -0.05, -2, scene);
  // 다다미 결
  for (let i = 0; i < 5; i++) K.line([[-6 + i * 3, 0.02, -6.5], [-6 + i * 3, 0.02, 3]], scene);
  const BG = new THREE.Group(); BG.position.set(5.0, 0, -1.2); scene.add(BG);
  // 요 + 이불 + 베개 + 누운 사람(머리)
  K.box(2.4, 0.18, 4.4, 0xeeece6, -0.6, 0.09, -2.4, BG);
  const quilt = K.inked(new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.5, 3.2, 4, 1, 4), K.lam(0x8a8782)), 30); quilt.position.set(-0.6, 0.42, -1.9); BG.add(quilt);
  for (let i = 0; i < 4; i++) K.line([[-1.85, 0.68, -3.3 + i * 0.9], [0.65, 0.68, -3.3 + i * 0.9]], BG);
  K.box(1.0, 0.3, 0.6, 0xf2f0ea, -0.6, 0.33, -4.1, BG);
  const head = new THREE.Group(); head.position.set(-0.6, 0.72, -3.75); BG.add(head);
  const hd = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.36, 18, 14), K.lam(0xdcd6ce)), 60); head.add(hd);
  const hr = new THREE.Mesh(new THREE.SphereGeometry(0.38, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), K.lam(0x262626)); hr.rotation.x = -1.3; hr.position.z = -0.03; head.add(hr);
  // 쟁반 + 찻잔 + 약봉지 + 주전자
  K.box(1.4, 0.06, 0.9, 0x6e6c66, 1.6, 0.05, -2.8, BG);
  K.cyl(0.18, 0.14, 0.28, 0xeeece6, 1.3, 0.22, -2.8, BG, 14); K.box(0.4, 0.04, 0.3, 0xf2f0ea, 1.9, 0.1, -2.95, BG);
  K.cyl(0.28, 0.3, 0.45, 0x45443f, 1.9, 0.3, -2.55, BG, 14);
  const steam = []; for (let i = 0; i < 8; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, depthWrite: false })); BG.add(s); steam.push({ s, k: i / 8 }); }
  // 창밖 눈 + 커튼(창: x 6, y 5, z -6.75)
  const snow = []; for (let i = 0; i < 26; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 4), K.flat(0x9a978f)); scene.add(s); snow.push({ s, x: 3.8 + (i * 0.37) % 4.4, k: (i * 0.173) % 1 }); }
  const cur = new THREE.Group(); cur.position.set(3.4, 7.0, -6.5); scene.add(cur); K.box(1.2, 4.0, 0.06, 0xd8d5cd, 0.6, -2.0, 0, cur);
  cam.position.set(5.4, 2.6, 0.8); cam.lookAt(5.0, 1.9, -4.6);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    head.rotation.z = 0.25 * Math.sin(ph); quilt.scale.y = 1 + 0.05 * Math.sin(ph * 2); quilt.position.y = 0.42 + 0.012 * Math.sin(ph * 2);
    steam.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(1.3 + 0.08 * Math.sin(ph * 2 + o.k * 9), 0.4 + v * 1.0, -2.8); o.s.scale.setScalar(0.6 + v * 1.6); o.s.material.opacity = 0.32 * (1 - v); });
    snow.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(o.x + 0.2 * Math.sin(ph * 2 + o.k * 7), 6.6 - v * 3.2, -6.55); });
    cur.rotation.z = 0.04 * Math.sin(ph * 2); cur.rotation.y = 0.08 * Math.sin(ph * 2);
  };
}
