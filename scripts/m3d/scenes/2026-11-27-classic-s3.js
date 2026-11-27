// 11/27 「백치 아다다」 장면③(after 4): 달밤 나루터. 보따리를 멘 수롱이(셔츠+조끼 대신 흰 저고리, 모자)가 손을 내밀어 아다다(저고리+A라인 대신 한복 치마, 땋은 머리)를 작은 나룻배로 이끈다. 배 흔들림·물결·달빛 반짝임. 밤이지만 하늘은 밝은 회색. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xcfcdc7, fog: [0xcbc9c3, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'shore', seed: 2771 });
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(70, 40, 60, 30), K.lam(0x8a8782)); sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0.05, -10); scene.add(sea); const sp = sea.geometry.attributes.position, base = sp.array.slice();
  K.box(14, 0.2, 6, 0xd4d0c7, -6, 0.0, 6, scene);
  // 나루 판자 + 말뚝
  K.box(2.2, 0.2, 6, 0x6e6c66, -1.6, 0.6, 1.0, scene); [[-2.6, -1.8], [-0.6, -1.8], [-2.6, 1.5], [-0.6, 1.5]].forEach(([x, z]) => K.cyl(0.12, 0.12, 1.6, 0x45443f, x, 0.3, z, scene, 8));
  const moon = new THREE.Mesh(new THREE.CircleGeometry(2.2, 32), K.flat(0xfbfaf6)); moon.position.set(8, 13, -60); scene.add(moon);
  const glints = []; for (let i = 0; i < 8; i++) { const g = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.08), K.flat(0xfbfaf6)); g.rotation.x = -Math.PI / 2; g.position.set(4 + (i % 3) * 0.6, 0.3, -6 - i * 2.5); scene.add(g); glints.push(g); }
  const isl = K.inked(new THREE.Mesh(new THREE.SphereGeometry(6, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x6e6c66)), 60); isl.scale.set(1.8, 0.4, 0.6); isl.position.set(10, 0, -34); scene.add(isl);
  const boat = new THREE.Group(); boat.position.set(1.2, 0.2, 0.2); scene.add(boat);
  K.box(1.4, 0.5, 3.6, 0x55534e, 0, 0, 0, boat); K.box(1.2, 0.1, 0.3, 0x3a3936, 0, 0.25, 0.4, boat);
  const oar = K.cyl(0.05, 0.05, 3, 0x2a2a28, 0.8, 0.6, 1.0, boat, 6); oar.rotation.x = 1.1;
  const S = K.person(scene, { x: 0.9, z: 0.6, rot: Math.PI / 2 + 0.9, coat: 0xeeece6, pants: 0x55534e, outfit: 'jeogori', hair: 'cap', eyes: 'dot', brows: 'flat', mouth: 'small', seed: 2772 });
  const bundle = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 8), K.lam(0x6e6c66)), 40); bundle.position.set(0, 0.6, 0.55); S.torso.add(bundle);
  const A = K.person(scene, { x: -1.4, z: 0.9, rot: -Math.PI / 2 - 0.6, coat: 0xdedad2, outfit: 'jeogori', skirt: 'chima', skirtC: 0x6e6c66, hair: 'braid', eyes: 'wide', brows: 'up', mouth: 'small', seed: 2773, scale: 0.92 });
  
  cam.position.set(3.5, 3.6, 8.5); cam.lookAt(-0.3, 2.0, -0.5);
  return (t, ph) => {
    for (let i = 0; i < sp.count; i++) { const x = base[i * 3], y = base[i * 3 + 1]; sp.array[i * 3 + 2] = 0.15 * Math.sin(x * 0.5 + ph * 2) + 0.1 * Math.cos(y * 0.6 + ph * 2); } sp.needsUpdate = true; sea.geometry.computeVertexNormals();
    boat.rotation.z = 0.05 * Math.sin(ph * 2); boat.position.y = 0.2 + 0.06 * Math.sin(ph * 2); 
    S.pose({ bob: 0.45 + 0.06 * Math.sin(ph * 2), headYaw: 0.6, armL: { fwd: 1.3, out: 0.1, elbow: 0.3 }, armR: { fwd: 0.3, elbow: 0.6 } });
    A.pose({ bob: 0.7, headYaw: -0.1, headPitch: 0.1, armR: { fwd: 1.0 + 0.2 * Math.sin(ph), elbow: 0.4 }, armL: { fwd: 0.5, elbow: 1.4 } });
    glints.forEach((g, i) => { g.material.color.setScalar(0.85 + 0.15 * Math.sin(ph * 3 + i)); });
  };
}
