// 11/26 1분 고전 최서해 「탈출기」 대표: 간도 흙집 안 등잔불 아래, 무명 저고리 사내(박군)가 앉은뱅이 상 앞에서 붓으로 편지를 쓰고, 뒤편에서 아내(저고리+치마)와 노모(머릿수건+앞치마)가 마주 앉아 맷돌을 돌린다. 등잔불 흔들림·맷돌 회전·창밖 눈발. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xdad8d2, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.box(30, 0.2, 16, 0xc8c3b8, 0, -0.1, -2, scene);
  K.box(30, 8, 0.4, 0xeae7e0, 0, 4, -6.2, scene); K.box(0.4, 8, 12, 0xe2dfd8, -7, 4, -1, scene);
  // 창(문살) + 눈발
  K.box(2.4, 1.8, 0.1, 0xf6f5f1, 3.2, 4.2, -5.95, scene); [-0.6, 0, 0.6].forEach(dx => K.box(0.06, 1.8, 0.14, 0x55534e, 3.2 + dx, 4.2, -5.9, scene)); K.box(2.4, 0.06, 0.14, 0x55534e, 3.2, 4.2, -5.9, scene);
  const snow = []; for (let i = 0; i < 14; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 4), K.flat(0x8a8782)); scene.add(s); snow.push({ s, k: i / 14, x: 2.1 + (i * 0.17) % 2.2 }); }
  // 벽 선반·항아리·걸린 옷
  K.box(3, 0.12, 0.6, 0x55534e, -3.5, 4.6, -5.8, scene); [-4.5, -3.6, -2.7].forEach((x, i) => K.cyl(0.25, 0.3, 0.6 + i * 0.1, 0x8a8782, x, 4.95, -5.8, scene, 12));
  K.cyl(0.6, 0.45, 1.2, 0x6e6c66, -5.8, 0.6, -4.8, scene, 14);
  // 맷돌 + 두 여인
  const mill = new THREE.Group(); mill.position.set(-1.6, 0, -3.8); scene.add(mill);
  K.cyl(0.8, 0.8, 0.3, 0x9a978f, 0, 0.15, 0, mill, 18); const top = K.cyl(0.75, 0.75, 0.3, 0x8a8782, 0, 0.45, 0, mill, 18); const handle = K.cyl(0.05, 0.05, 0.6, 0x45443f, 0.6, 0.8, 0, top, 6); handle.position.set(0.55, 0.3, 0);
  const sitDown = (P) => { P.root.position.y = -0.95; };
  const Wf = K.person(scene, { x: -2.9, z: -3.8, rot: -Math.PI / 2 - 0.3, coat: 0xf2f0ea, outfit: 'jeogori', skirt: 'chima', skirtC: 0x6e6c66, hair: 'bun', eyes: 'closed', brows: 'worried', mouth: 'line', seed: 2621 });
  const Mo = K.person(scene, { x: -0.3, z: -3.8, rot: Math.PI / 2 + 0.3, coat: 0x8a8782, outfit: 'apron', skirt: 'long', skirtC: 0x55534e, hair: 'kerchief', eyes: 'narrow', brows: 'worried', mouth: 'frown', seed: 2622 });
  [Wf, Mo].forEach(sitDown);
  // 박군 + 상 + 등잔
  const tb = new THREE.Group(); tb.position.set(1.4, 0, -0.6); scene.add(tb);
  K.box(1.8, 0.1, 1.0, 0x55534e, 0, 0.7, 0, tb); [[-0.8, -0.4], [0.8, -0.4], [-0.8, 0.4], [0.8, 0.4]].forEach(([x, z]) => K.box(0.1, 0.7, 0.1, 0x45443f, x, 0.35, z, tb));
  K.box(0.9, 0.02, 0.6, 0xf6f5f1, -0.2, 0.76, 0.05, tb);
  K.cyl(0.12, 0.16, 0.5, 0x45443f, 0.6, 1.0, -0.25, tb, 10); const fl = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 8), K.flat(0x55534e)); fl.position.set(0.6, 1.35, -0.25); tb.add(fl);
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.7, 14, 10), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, depthWrite: false })); glow.position.set(0.6, 1.35, -0.25); tb.add(glow);
  const B = K.person(scene, { x: 2.5, z: -0.6, rot: Math.PI / 2 - 0.35, coat: 0xe6e3dc, pants: 0x55534e, outfit: 'jeogori', hair: 'short', brows: 'stern', mouth: 'line', eyes: 'narrow', seed: 2623 });
  sitDown(B);
  const brush = K.cyl(0.025, 0.02, 0.45, 0x2a2a28, 0, 0, 0); B.hold('R', brush, { at: [0, -0.15, 0], rot: [0.3, 0, 0] });
  cam.position.set(0.6, 3.0, 6.4); cam.lookAt(0.2, 1.3, -2.2);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    top.rotation.y = ph;
    Wf.pose({ headPitch: -0.25, armR: { fwd: 0.9 + 0.2 * Math.sin(ph), elbow: 0.8 }, armL: { fwd: 0.4, elbow: 1.2 } });
    Mo.pose({ headPitch: -0.3, headTilt: 0.1, armL: { fwd: 0.9 + 0.2 * Math.cos(ph), elbow: 0.8 }, armR: { fwd: 0.5, elbow: 1.2 } });
    B.pose({ headPitch: -0.45, lean: -0.2, armR: { fwd: 0.9 + 0.08 * Math.sin(ph * 4), elbow: 1.2, out: 0.05 }, armL: { fwd: 0.7, elbow: 1.5 } });
    fl.scale.set(1, 1 + 0.4 * Math.sin(ph * 9), 1); glow.material.opacity = 0.2 + 0.08 * Math.sin(ph * 7);
    snow.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(o.x + 0.1 * Math.sin(ph * 2 + o.k * 9), 5.0 - v * 1.6, -6.05); });
  };
}
