// 11/23 1분 고전 「귀여운 여인」 대표: 러시아 시골집 창가, 머릿수건을 쓴 올렌카가 탁자에 턱을 괴고 비 내리는 마당을 내다본다. 빗줄기·흔들리는 커튼·찻잔 김. 카메라 고정(실내에서 창 쪽, 여인 옆모습)
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2321 });
  K.box(14, 0.1, 10, 0xd4d1c9, 0, -0.05, -2, scene);
  // 큰 창(바깥은 밝음) + 창틀 + 커튼
  K.box(3.4, 2.6, 0.05, 0xfbfaf6, 1.2, 2.8, -5.0, scene); K.box(0.1, 2.6, 0.15, 0x45443f, 1.2, 2.8, -4.95, scene); K.box(3.4, 0.1, 0.15, 0x45443f, 1.2, 2.8, -4.95, scene);
  const cur = []; [-0.8, 3.2].forEach(x => { const c = K.box(0.7, 3.0, 0.06, 0x9a978f, x, 2.8, -4.7, scene); cur.push(c); });
  const rain = []; for (let i = 0; i < 40; i++) { const r = K.box(0.015, 0.35, 0.01, 0x9a978f, 0, 0, 0, scene); rain.push({ r, x: -0.3 + (i * 0.311) % 3.1, k: (i * 0.137) % 1 }); }
  // 탁자 + 사모바르 + 찻잔
  K.box(2.6, 0.12, 1.4, 0x6e6c66, 0.4, 1.4, -3.4, scene); K.box(0.12, 1.4, 0.12, 0x55534e, -0.7, 0.7, -3.0, scene); K.box(0.12, 1.4, 0.12, 0x55534e, 1.5, 0.7, -3.0, scene);
  K.cyl(0.35, 0.45, 0.9, 0x8a8782, 1.2, 1.9, -3.6, scene, 16); K.cyl(0.12, 0.12, 0.2, 0x55534e, 1.2, 2.45, -3.6, scene, 10);
  K.cyl(0.14, 0.11, 0.16, 0xf2f0ea, 0.2, 1.54, -3.1, scene, 14);
  const steam = []; for (let i = 0; i < 10; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false })); scene.add(s); steam.push({ s, k: i / 10 }); }
  // 올렌카(의자에 앉음)
  K.box(0.9, 0.1, 0.9, 0x55534e, -1.4, 0.9, -3.1, scene); K.box(0.9, 1.4, 0.1, 0x55534e, -1.4, 1.6, -2.65, scene);
  const O = K.person(scene, { x: -1.4, z: -3.1, rot: -1.2, coat: 0x6e6c66, pants: 0x55534e, hair: 'bun', scale: 0.95, scarf: 0xeeece6 });
  const g = new THREE.Group(); g.position.y = -0.75; scene.add(g); g.add(O.root);
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.2, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x55534e, side: THREE.DoubleSide })), 40); sk.position.y = 1.2; O.root.add(sk);
  const kerchief = new THREE.Mesh(new THREE.SphereGeometry(0.36, 14, 10, 0, Math.PI * 2, 0, Math.PI / 1.7), K.lam(0xd8d5cd)); K.inked(kerchief, 30); kerchief.position.y = 0.08; O.headG.add(kerchief);
  cam.position.set(-0.6, 2.4, 3.6); cam.lookAt(0.2, 1.9, -3.4);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    O.pose({ headPitch: 0.1, headYaw: 0.15 * Math.sin(ph), lean: 0.2, armR: { fwd: 1.4, elbow: 2.0, out: -0.1 }, armL: { fwd: 0.9, elbow: 1.4 } });
    rain.forEach(o => { const v = (o.k + u * 3) % 1; o.r.position.set(o.x, 4.0 - v * 2.4, -5.2); });
    cur.forEach((c, i) => { c.rotation.y = 0.12 * Math.sin(ph * 2 + i); });
    steam.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(0.2 + 0.05 * Math.sin(ph * 3 + o.k * 7), 1.65 + v * 0.8, -3.1); o.s.material.opacity = 0.5 * (1 - v); o.s.scale.setScalar(0.6 + v); });
  };
}
