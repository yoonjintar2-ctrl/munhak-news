// 11/26 오늘의 시 변영로 「논개」: 진주성 성벽 아래 바위(의암) 곁으로 강물이 흐르고, 물결 위로 붉은 꽃잎(진한 색)이 떠내려간다. 한복(저고리+치마) 여인이 바위 위에 서서 강을 바라보고 치마·옷고름이 바람에 날린다. 폭력 없음. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe2e0da, fog: [0xdedcd6, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'country', seed: 2612, near: false });
  // 강
  const river = new THREE.Mesh(new THREE.PlaneGeometry(60, 14), K.lam(0x9a978f)); river.rotation.x = -Math.PI / 2; river.position.set(0, 0.02, 0.5); scene.add(river);
  K.box(60, 0.4, 10, 0xcdcac2, 0, -0.1, -10, scene);
  // 성벽(돌 블록) + 누각
  for (let i = 0; i < 10; i++) for (let j = 0; j < 3; j++) K.box(2.0, 0.9, 1.2, [0xc8c5bd, 0xbab7af][(i + j) % 2], -10 + i * 2.05 + (j % 2) * 0.9, 0.55 + j * 0.92, -7.5, scene);
  const pav = new THREE.Group(); pav.position.set(4.5, 3.3, -8); scene.add(pav);
  [-1.6, 1.6].forEach(x => K.cyl(0.15, 0.15, 2.2, 0x55534e, x, 1.1, 0, pav, 8));
  const roof = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.01, 3.0, 1.2, 4, 1), K.lam(0x45443f)), 30); roof.rotation.y = Math.PI / 4; roof.scale.set(1.4, 1, 0.6); roof.position.y = 2.7; pav.add(roof);
  // 바위
  const rock = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(1.6, 0), K.lam(0x8a8782)), 30); rock.scale.set(1.4, 0.6, 1.0); rock.position.set(-1.6, 0.4, -1.6); scene.add(rock);
  // 강가 버드나무
  const wt = new THREE.Group(); wt.position.set(-6, 0, -4); scene.add(wt); K.cyl(0.2, 0.3, 3.4, 0x45443f, 0, 1.7, 0, wt, 8);
  const fr = []; for (let i = 0; i < 9; i++) { const f = new THREE.Group(); f.position.set(-1.2 + i * 0.3, 3.4, (i % 3) * 0.3 - 0.3); wt.add(f); K.box(0.04, 1.8, 0.04, 0x6e6c66, 0, -0.9, 0, f); fr.push({ f, k: i }); }
  // 여인
  const W = K.person(scene, { x: -1.6, z: -1.6, rot: Math.PI - 1.0, coat: 0xf2f0ea, pants: 0x55534e, hair: 'bun', outfit: 'jeogori', skirt: 'chima', skirtC: 0x55534e, eyes: 'narrow', brows: 'stern', mouth: 'line', scale: 1.0, seed: 2612 });
  W.root.position.y = 0.95;
  // 꽃잎
  const petals = []; for (let i = 0; i < 16; i++) { const p = new THREE.Mesh(new THREE.CircleGeometry(0.22, 6), new THREE.MeshLambertMaterial({ color: 0x2a2a28, side: THREE.DoubleSide })); p.rotation.x = -Math.PI / 2; scene.add(p); petals.push({ p, k: i / 16, z: -0.8 + (i * 0.53) % 4 }); }
  const ripples = []; for (let i = 0; i < 10; i++) { const l = K.box(1.4, 0.02, 0.05, 0xeeece6, 0, 0.04, 0, scene); ripples.push({ l, k: i / 10, z: -1 + (i * 0.71) % 5 }); }
  cam.position.set(0.6, 2.9, 6.2); cam.lookAt(-1.0, 2.0, -1.8);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    W.pose({ headYaw: 0.15 * Math.sin(ph), headPitch: 0.1, armL: { fwd: 0.4, elbow: 1.4 }, armR: { fwd: 0.2 + 0.1 * Math.sin(ph), elbow: 0.5, out: 0.2 } });
    petals.forEach(o => { const v = (o.k + u) % 1; o.p.position.set(-10 + v * 20, 0.06 + 0.03 * Math.sin(ph * 3 + o.k * 9), o.z); o.p.rotation.z = ph + o.k * 6; });
    ripples.forEach(o => { const v = (o.k + u) % 1; o.l.position.set(-10 + v * 20, 0.04, o.z); });
    fr.forEach(o => { o.f.rotation.z = 0.15 * Math.sin(ph * 2 + o.k * 0.6); o.f.rotation.x = 0.08 * Math.sin(ph * 2 + o.k); });
  };
}
