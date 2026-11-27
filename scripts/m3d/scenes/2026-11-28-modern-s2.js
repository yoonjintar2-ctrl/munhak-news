// 11/28 『기억 전달자』 장면②(after 2): 책이 가득한 기억 전달자의 방. 수염·안경·카디건(조끼) 차림의 노인이 소년의 등에 손을 얹고, 눈을 감은 소년 둘레로 기억의 눈송이가 피어오른다. 눈송이 소용돌이·노인 고개 끄덕임·스탠드 불빛. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe4e2dc, fog: [0xe0ded8, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d0cbc1', line: '#c8c3b9', tiles: 4, repeat: 3 });
  K.backdrop(scene, { kind: 'room', seed: 2901 });
  // 책장 두 개(책 빽빽)
  [[-4.6, -6.0], [-1.6, -6.0]].forEach(([x, z], si) => { K.box(2.6, 5.4, 0.7, 0x45443f, x, 2.7, z, scene); for (let r = 0; r < 5; r++) for (let i = 0; i < 7; i++) K.box(0.28, 0.75 + ((i * 7 + r * 3 + si) % 4) * 0.06, 0.5, [0x8a8782, 0xdedad2, 0x6e6c66, 0xb0aca4][(i + r + si) % 4], x - 1.0 + i * 0.33, 0.95 + r * 1.0, z + 0.12, scene); });
  // 안락의자·스탠드·탁자 위 책
  K.box(1.8, 1.0, 1.6, 0x55534e, 3.6, 0.5, -1.6, scene); K.box(1.8, 1.6, 0.4, 0x55534e, 3.6, 1.3, -2.3, scene);
  K.cyl(0.05, 0.05, 3.4, 0x2a2a28, 5.0, 1.7, -2.4, scene, 6); const shade = K.cyl(0.3, 0.55, 0.6, 0xf2f0ea, 5.0, 3.5, -2.4, scene, 12);
  K.box(1.4, 0.8, 1.0, 0x6e6c66, -3.4, 0.4, 0.4, scene); [0, 1].forEach(i => K.box(0.8, 0.14, 0.6, [0x2a2a28, 0xdedad2][i], -3.4, 0.87 + i * 0.14, 0.4, scene));
  const B = K.person(scene, { x: 0.2, z: 0.4, rot: Math.PI - 0.35, coat: 0x55534e, outfit: 'sweater', hair: 'short', eyes: 'closed', brows: 'up', mouth: 'small', seed: 2902, scale: 0.82 });
  const G = K.person(scene, { x: 1.5, z: -0.5, rot: Math.PI + 0.5, coat: 0x8a8782, outfit: 'vest', sleeve: 0xdedad2, hair: 'bald', beard: 'beard', glasses: true, eyes: 'narrow', brows: 'thick', mouth: 'line', seed: 2903 });
  const fl = []; for (let i = 0; i < 28; i++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.06 + (i % 3) * 0.02, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffffff })); scene.add(m); fl.push({ m, k: i / 28, r: 0.8 + (i % 5) * 0.25 }); }
  cam.position.set(0.6, 3.2, 7.4); cam.lookAt(0.4, 2.4, -0.8);
  return (t, ph) => {
    const s = Math.sin(ph);
    B.pose({ headPitch: -0.15, armL: { fwd: 0.15, elbow: 0.3 }, armR: { fwd: 0.15, elbow: 0.3 } });
    G.pose({ headPitch: 0.15 + 0.08 * Math.sin(ph * 2), headYaw: 0.4, lean: 0.08, armR: { fwd: 1.05, elbow: 0.4, out: -0.1 }, armL: { fwd: 0.4, elbow: 1.0 } });
    fl.forEach(o => { const a = o.k * Math.PI * 2 + ph, p = (ph / (Math.PI * 2) + o.k) % 1; o.m.position.set(0.2 + Math.cos(a * 2) * o.r, 0.8 + p * 3.8, 0.4 + Math.sin(a * 2) * o.r * 0.6); o.m.scale.setScalar(1 - 0.5 * p); });
    shade.material.color.setScalar(0.92 + 0.06 * s);
  };
}
