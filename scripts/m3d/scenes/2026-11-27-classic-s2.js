// 11/27 「백치 아다다」 장면②(after 3): 친정 부엌. 아궁이 앞에 웅크린 아다다(저고리+주름 치마, 쪽머리, 감은 눈)와 문간에서 손가락질하며 꾸짖는 어머니(앞치마+긴 치마, 머릿수건, 찌푸린 눈썹). 아궁이 불 일렁임·솥 김·등잔. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe2e0da, fog: [0xdedcd6, 30, 90], fov: 46 };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2761 });
  K.box(40, 0.2, 20, 0xcdc9c0, 0, -0.1, 0, scene);
  // 부뚜막 + 솥 + 아궁이
  K.box(5, 1.5, 1.8, 0xb0aca4, -1.5, 0.75, -4.6, scene);
  K.cyl(0.9, 0.6, 0.7, 0x2a2a28, -2.5, 1.8, -4.6, scene, 20); K.cyl(0.95, 0.95, 0.12, 0x3a3936, -2.5, 2.2, -4.6, scene, 20);
  K.cyl(0.6, 0.45, 0.5, 0x3a3936, -0.4, 1.7, -4.6, scene, 16);
  const mouth = K.box(1.1, 0.8, 0.1, 0x1e1e1e, -2.5, 0.5, -3.68, scene);
  const fire = []; for (let i = 0; i < 4; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.5, 6), K.flat(0xf6f5f1)); f.position.set(-2.8 + i * 0.2, 0.45, -3.6); scene.add(f); fire.push(f); }
  const steam = []; for (let i = 0; i < 5; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfafaf8, transparent: true })); scene.add(s); steam.push({ s, k: i / 5 }); }
  // 장작·물동이·바가지
  for (let i = 0; i < 4; i++) { const l = K.cyl(0.12, 0.12, 1.4, 0x55534e, -4.6, 0.15 + (i % 2) * 0.22, -2.6 + i * 0.25, scene, 8); l.rotation.z = Math.PI / 2; }
  K.cyl(0.45, 0.35, 0.8, 0x6e6c66, 2.0, 0.4, -4.6, scene, 14); const bowl = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), K.lam(0x9a978f)), 40); bowl.position.set(2.0, 0.95, -4.6); scene.add(bowl);
  // 문간
  K.box(0.3, 5, 0.3, 0x45443f, 3.2, 2.5, -1.2, scene); K.box(0.3, 5, 0.3, 0x45443f, 5.4, 2.5, -1.2, scene); K.box(2.5, 0.3, 0.3, 0x45443f, 4.3, 5, -1.2, scene);
  const A = K.person(scene, { x: -1.2, z: -1.6, rot: -0.9, coat: 0xeeece6, outfit: 'jeogori', skirt: 'pleat', skirtC: 0x55534e, hair: 'bun', eyes: 'closed', brows: 'worried', mouth: 'frown', seed: 2762, scale: 0.75 });
  
  const M = K.person(scene, { x: 3.4, z: 0.2, rot: Math.PI / 2 + 0.5, coat: 0x6e6c66, outfit: 'apron', skirt: 'long', skirtC: 0x3a3936, hair: 'kerchief', eyes: 'narrow', brows: 'stern', mouth: 'open', seed: 2763, scale: 0.95 });
  cam.position.set(1.0, 3.2, 7.5); cam.lookAt(0, 1.4, -2.5);
  return (t, ph) => {
    const k = 0.5 + 0.5 * Math.sin(ph * 2);
    A.pose({ lean: 0.7, headPitch: 0.5, armL: { fwd: 1.0, elbow: 2.0 }, armR: { fwd: 1.0, elbow: 2.0 }, bob: -0.5 + 0.02 * Math.sin(ph * 4) });
    M.pose({ lean: 0.1, headYaw: 0.2, armR: { fwd: 1.4 + 0.25 * k, out: -0.1, elbow: 0.2, point: true }, armL: { fwd: 0.4, elbow: 1.6, out: 0.2 } });
    fire.forEach((f, i) => { f.scale.y = 0.8 + 0.5 * Math.abs(Math.sin(ph * 3 + i)); });
    steam.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.s.position.set(-2.5 + 0.3 * Math.sin(p * 6), 2.4 + p * 2.4, -4.6); o.s.scale.setScalar(0.5 + p * 1.3); o.s.material.opacity = 0.8 * (1 - p); });
  };
}
