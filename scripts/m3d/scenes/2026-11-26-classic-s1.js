// 11/26 「탈출기」 장면①(after 1): 간도 언덕 위, 큰 보따리를 등에 진 박군과 노모(머릿수건), 아내(저고리+치마)가 멈춰 서서 끝없는 벌판을 내려다본다. 카메라는 비스듬히 뒤에서. 마른 풀 흔들림·기러기 떼·박군이 손을 들어 가리킴. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 110] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d2cfc7', line: '#cbc8c0', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2624, near: false });
  const grass = []; for (let i = 0; i < 40; i++) { const g = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.7, 4), K.lam(0x8a8782)); g.position.set(-6 + (i * 0.31) % 12, 0.35, 1 - (i * 0.53) % 7); scene.add(g); grass.push({ g, k: i * 0.4 }); }
  K.box(0.15, 1.4, 0.15, 0x55534e, 3.6, 0.7, -2.5, scene); K.box(0.15, 1.4, 0.15, 0x55534e, 5.6, 0.7, -2.5, scene); K.box(2.2, 0.1, 0.1, 0x55534e, 4.6, 1.2, -2.5, scene); // 길가 말뚝
  const stone = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(0.5, 0), K.lam(0x9a978f)), 30); stone.position.set(-3.4, 0.3, -1.0); scene.add(stone);
  const B = K.person(scene, { x: 1.8, z: -1.6, rot: 0.25, coat: 0xe6e3dc, pants: 0x55534e, outfit: 'jeogori', hair: 'short', brows: 'up', mouth: 'small', seed: 2625 });
  const bundle = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 10), K.lam(0x6e6c66)), 40); bundle.scale.set(1, 0.8, 0.7); bundle.position.set(0, 0.6, 0.65); B.torso.add(bundle);
  const W = K.person(scene, { x: -0.2, z: -0.8, rot: -0.2, coat: 0xf2f0ea, outfit: 'jeogori', skirt: 'chima', skirtC: 0x6e6c66, hair: 'bun', eyes: 'wide', mouth: 'small', seed: 2626, scale: 0.95 });
  const M = K.person(scene, { x: -2.1, z: -0.2, rot: -0.1, coat: 0x8a8782, outfit: 'apron', skirt: 'long', skirtC: 0x45443f, hair: 'kerchief', brows: 'worried', mouth: 'line', seed: 2627, scale: 0.9 });
  const geese = []; for (let i = 0; i < 5; i++) geese.push(K.bird(scene, { cx: -2 + i * 1.4, cy: 7 + (i % 2) * 0.6, cz: -14 - i, rx: 3, rz: 1, s: 0.5 }));
  cam.position.set(-5.2, 3.4, 5.6); cam.lookAt(0.2, 1.7, -2.4);
  return (t, ph) => {
    B.pose({ headYaw: 0.2, armR: { fwd: 1.6 + 0.15 * Math.sin(ph), elbow: 0.2, point: true }, armL: { fwd: 0.3, elbow: 1.0 } });
    W.pose({ headYaw: -0.4 + 0.2 * Math.sin(ph), armL: { fwd: 0.5, elbow: 1.3 }, armR: { fwd: 0.5, elbow: 1.3 } });
    M.pose({ headPitch: 0.1, headYaw: 0.3 * Math.sin(ph * 0.5), armL: { fwd: 0.3, elbow: 0.8 }, armR: { fwd: 0.3, elbow: 0.8 } });
    grass.forEach(o => { o.g.rotation.z = 0.3 * Math.sin(ph * 2 + o.k); });
    geese.forEach(g => g.update(ph));
  };
}
