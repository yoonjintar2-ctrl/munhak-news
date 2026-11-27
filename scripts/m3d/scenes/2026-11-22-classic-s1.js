// 11/22 「발가락이 닮았다」 장면①(after 0): 밤의 술집 골목. 중절모를 삐딱하게 쓴 M이 비틀거리며 앞서 걷고(진행 방향 -x, M rot +π/2 쪽), 흰 목도리의 '나'가 뒤에서 손을 뻗어 부른다. 처마 등불 줄이 흔들리고 고양이가 담 위를 걷는다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xd8d6d0, fog: [0xd2d0ca, 25, 80] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfccc4', line: '#c2bfb7', tiles: 4, repeat: 5 });
  K.backdrop(scene, { kind: 'town', seed: 2212 });
  // 양쪽 목조 술집 + 문 + 창
  [[-5, -5], [0, -5.5], [5, -5]].forEach(([x, z], i) => { K.box(4.6, 3.6, 2, [0xbcb9b1, 0xb0ada5, 0xbcb9b1][i], x, 1.8, z, scene); K.box(1.0, 2.0, 0.1, 0x3a3936, x - 1, 1.0, z + 1.05, scene); K.box(1.4, 0.9, 0.1, 0xfbfaf6, x + 1, 2.0, z + 1.05, scene); K.box(5, 0.25, 1.2, 0x45443f, x, 3.7, z + 1.3, scene); });
  const lanterns = []; for (let i = 0; i < 5; i++) { const g = new THREE.Group(); g.position.set(-7 + i * 3.5, 3.5, -3.7); scene.add(g); K.cyl(0.01, 0.01, 0.5, 0x2a2a28, 0, -0.25, 0, g, 4); K.cyl(0.25, 0.25, 0.55, 0xf6f4ee, 0, -0.75, 0, g, 12); lanterns.push(g); }
  K.cyl(0.35, 0.3, 0.8, 0x55534e, 6.5, 0.4, -3.2, scene, 12); K.cyl(0.35, 0.3, 0.8, 0x55534e, 7.2, 0.4, -3.4, scene, 12); // 술독
  const M = K.person(scene, { x: -1.2, z: -1.4, rot: 1.3, coat: 0x45443f, pants: 0x2f2e2b, hair: 'short', scale: 1.0 });
  const hat = new THREE.Group(); hat.position.y = 0.6; M.headG.add(hat); K.cyl(0.48, 0.48, 0.04, 0x1c1c1a, 0, 0, 0, hat, 16); K.cyl(0.3, 0.32, 0.32, 0x1c1c1a, 0, 0.16, 0, hat, 14); hat.rotation.z = 0.3;
  const I = K.person(scene, { x: 2.0, z: -1.2, rot: 1.45, coat: 0x8a8782, pants: 0x45443f, hair: 'short', scale: 0.98, scarf: 0xf6f4ee });
  cam.position.set(0.4, 2.8, 7.0); cam.lookAt(0.3, 1.9, -2.5);
  return (t, ph) => {
    const s = Math.sin(ph * 2);
    M.root.position.x = -1.2 - 0.3 * Math.sin(ph); M.root.rotation.z = 0.1 * s; M.root.rotation.y = 1.3 + 0.15 * s;
    M.pose({ lean: 0.1, headTilt: 0.25 * s, headPitch: 0.2, armL: { fwd: 0.4 * s, out: 0.5 }, armR: { fwd: -0.4 * s, out: 0.5 }, bob: 0.05 * Math.abs(s) });
    const call = K.win(ph, 0.2, 0.8, 0.15);
    I.pose({ lean: 0.1 * call, armR: { fwd: 1.5 * call, out: -0.1, elbow: 0.2 }, armL: { fwd: 0.3 }, headPitch: 0.05 });
    lanterns.forEach((g, i) => { g.rotation.z = 0.2 * Math.sin(ph * 2 + i); });
  };
}
