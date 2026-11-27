// 11/27 1분 고전 「백치 아다다」 대표: 섬마을 초가 앞 바닷가. 수롱이(흰 저고리·머리띠 대신 짧은 머리, 조끼)가 돈 꾸러미를 두 손으로 들어 보이며 웃고, 아다다(저고리+치마, 땋은 머리)가 근심스레 바라본다. 파도·빨랫줄 옷 펄럭임·갈매기. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 120] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'shore', seed: 2741 });
  K.box(40, 0.2, 14, 0xdedad2, 0, -0.1, 4, scene);
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(70, 30, 70, 20), K.lam(0x9a978f)); sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0.06, -12); scene.add(sea); const sp = sea.geometry.attributes.position, base = sp.array.slice();
  // 초가
  const hut = new THREE.Group(); hut.position.set(-6, 0, -2.5); scene.add(hut);
  K.box(4.6, 2.2, 3.0, 0xeeebe4, 0, 1.1, 0, hut); K.box(1.0, 1.6, 0.1, 0x45443f, 0.6, 0.8, 1.52, hut);
  const roof = K.inked(new THREE.Mesh(new THREE.SphereGeometry(2.9, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x8a8782)), 40); roof.scale.set(1.0, 0.45, 0.72); roof.position.y = 2.1; hut.add(roof);
  // 빨랫줄 + 옷
  K.cyl(0.07, 0.07, 2.6, 0x45443f, 0.5, 1.3, -3.5, scene, 6); K.cyl(0.07, 0.07, 2.6, 0x45443f, 4.5, 1.3, -3.5, scene, 6); K.line([[0.5, 2.5, -3.5], [4.5, 2.5, -3.5]], scene);
  const cl = []; [[1.3, 0xf6f5f1], [2.5, 0x6e6c66], [3.6, 0xeeece6]].forEach(([x, c]) => { const g = new THREE.Group(); g.position.set(x, 2.5, -3.5); scene.add(g); const m = K.box(0.8, 1.0, 0.04, c, 0, -0.5, 0, g); cl.push(g); });
  // 그물·항아리·배
  const net = K.box(1.6, 1.2, 0.05, 0xc8c4bb, -2.6, 0.8, -1.2, scene); net.rotation.y = 0.4; K.line([[-3.3, 1.4, -1.5], [-1.9, 0.2, -0.9]], scene); K.line([[-3.3, 0.2, -1.5], [-1.9, 1.4, -0.9]], scene);
  K.cyl(0.35, 0.45, 0.9, 0x55534e, -3.6, 0.45, 0.8, scene, 12); K.cyl(0.3, 0.4, 0.8, 0x6e6c66, -4.3, 0.4, 1.2, scene, 12);
  const boat = new THREE.Group(); boat.position.set(6, 0.2, -6); scene.add(boat); K.box(3, 0.6, 1.1, 0x55534e, 0, 0, 0, boat);
  const S = K.person(scene, { x: 1.6, z: 1.0, rot: Math.PI / 2 + 0.6, coat: 0xeeece6, sleeve: 0xeeece6, pants: 0x6e6c66, outfit: 'vest', hair: 'short', eyes: 'smile', brows: 'up', mouth: 'open', seed: 2742 });
  const money = K.box(0.6, 0.35, 0.25, 0x8a8782, 0, 0, 0, null); S.hold('R', money, { at: [0, -0.15, -0.1] });
  const A = K.person(scene, { x: -0.6, z: 0.8, rot: -Math.PI / 2 - 0.5, coat: 0xf2f0ea, outfit: 'jeogori', skirt: 'chima', skirtC: 0x55534e, hair: 'braid', eyes: 'oval', brows: 'worried', mouth: 'frown', seed: 2743, scale: 0.93 });
  const gulls = [K.bird(scene, { cx: 3, cy: 7, cz: -16, rx: 7, rz: 2, s: 0.8 })];
  cam.position.set(0.8, 3.0, 9.0); cam.lookAt(0.4, 2.0, -1);
  return (t, ph) => {
    for (let i = 0; i < sp.count; i++) { const x = base[i * 3], y = base[i * 3 + 1]; sp.array[i * 3 + 2] = 0.2 * Math.sin(x * 0.4 + ph * 2) + 0.1 * Math.cos(y * 0.8 + ph * 2); } sp.needsUpdate = true; sea.geometry.computeVertexNormals();
    const k = 0.5 + 0.5 * Math.sin(ph);
    S.pose({ headYaw: 0.2, armR: { fwd: 1.3 + 0.4 * k, out: -0.15, elbow: 0.6 }, armL: { fwd: 0.9 + 0.3 * k, out: 0.2, elbow: 1.2 }, bob: 0.04 * k });
    A.pose({ headPitch: 0.15, headYaw: -0.15 * k, armL: { fwd: 0.6, elbow: 1.6 }, armR: { fwd: 0.6, elbow: 1.6 } });
    cl.forEach((g, i) => { g.rotation.x = 0.35 * Math.sin(ph * 2 + i); });
    gulls[0].update(ph);
  };
}
