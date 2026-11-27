// 11/15 1분 고전 장면① 그리니치빌리지: 5월, 낮은 3층 벽돌집 앞 골목. 화판을 낀 두 젊은 화가가 마주 보고 웃으며 이야기한다. 가로등 아래 비둘기가 날고 차양이 들썩인다(탈것 없음)
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3c8', line: '#c6c3b8', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'city', seed: 81 });
  // 3층 벽돌집(가운데) + 이웃 건물
  const brick = K.windowsTex(4, 3, 3, '#9b968c');
  const H = new THREE.Mesh(new THREE.BoxGeometry(8, 7.5, 4), K.lam(0xffffff, { map: brick })); H.position.set(-0.5, 3.75, -6); scene.add(K.inked(H));
  K.box(8.6, 0.4, 4.6, 0x4a4a46, -0.5, 7.7, -6, scene);
  K.building(scene, -9.5, -7, 6, 4, 9, 4); K.building(scene, 8.5, -7, 6, 4, 8, 6);
  // 현관 계단 + 문
  [0, 1, 2].forEach(i => K.box(2.4 - i * 0.2, 0.25, 0.8 - i * 0.2, 0x8a8781, -0.5, 0.12 + i * 0.25, -3.6 - i * 0.2, scene)); K.box(1.4, 2.4, 0.1, 0x3a3a38, -0.5, 1.9, -3.95, scene);
  // 가게 차양(오른쪽 건물, 들썩)
  const aw = new THREE.Group(); aw.position.set(7.2, 3.2, -4.8); scene.add(aw);
  const cl = K.inked(new THREE.Mesh(new THREE.PlaneGeometry(4, 1.6), new THREE.MeshLambertMaterial({ color: 0xdedcd5, side: THREE.DoubleSide })), 1); cl.geometry.translate(0, 0, 0.8); cl.rotation.x = -Math.PI / 2 + 0.35; aw.add(cl);
  // 가로등 + 화분 + 벤치
  K.cyl(0.1, 0.12, 4.6, 0x3a3a38, -5.2, 2.3, -2.6, scene, 8); K.box(0.6, 0.7, 0.6, 0xe8e6df, -5.2, 4.8, -2.6, scene);
  K.cyl(0.45, 0.35, 0.8, 0x6a6964, 2.4, 0.4, -3.5, scene, 12); const bush = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.7, 12, 8), K.lam(0x7d7c76)), 60); bush.position.set(2.4, 1.3, -3.5); scene.add(bush);
  // 두 화가: 수(왼쪽, 목도리·쪽진 머리, 화판), 존시(오른쪽, 긴 머리, 화판)
  const S = K.person(scene, { x: -1.5, z: 1.2, rot: -Math.PI / 2 - 0.5, coat: 0x3e3e3b, pants: 0x2f2f2d, hair: 'bun', scale: 0.95, scarf: 0xf2f0ea });
  const J = K.person(scene, { x: 1.2, z: 1.2, rot: Math.PI / 2 + 0.5, coat: 0xa6a49d, pants: 0x55544f, hair: 'long', scale: 0.92 });
  const bdS = K.box(0.08, 1.2, 0.9, 0x6d6c67, 0, 0, 0, scene), bdJ = K.box(0.08, 1.2, 0.9, 0x6d6c67, 0, 0, 0, scene);
  const B1 = K.bird(scene, { cx: -2, cy: 6.5, cz: -2, rx: 5, rz: 2, s: 0.7 }), B2 = K.bird(scene, { cx: 1, cy: 7.5, cz: -3, rx: 6, rz: 2, s: 0.6 });
  cam.position.set(-0.2, 3.2, 9.5); cam.lookAt(-0.2, 2.6, -2);
  const side = (P, x, z, rot, d) => { const rx = Math.cos(rot), rz = -Math.sin(rot); return [x + rx * d, z + rz * d]; };
  return (t, ph) => {
    aw.rotation.x = 0.07 * Math.sin(ph * 2);
    const laugh = Math.abs(Math.sin(ph * 3));
    S.pose({ headYaw: -0.1, headPitch: 0.05 - 0.06 * laugh, headTilt: 0.08 * laugh, armL: { fwd: 0.25, out: 0.18, elbow: 0.4 }, armR: { fwd: 0.6 + 0.4 * Math.max(0, Math.sin(ph * 2)), elbow: 1.2 } });
    J.pose({ headYaw: 0.1, headPitch: -0.04 + 0.06 * laugh, headTilt: -0.06 * laugh, armR: { fwd: 0.25, out: 0.18, elbow: 0.4 }, armL: { fwd: 1.0, elbow: 1.6 * K.win(ph, 0.4, 0.75, 0.1) } });
    // 화판: 각자 바깥쪽 팔에 낌
    let [x, z] = side(S, -1.5, 1.2, -Math.PI / 2 - 0.5, -0.85); bdS.position.set(x, 1.9, z); bdS.rotation.y = -Math.PI / 2 - 0.5;
    [x, z] = side(J, 1.2, 1.2, Math.PI / 2 + 0.5, 0.82); bdJ.position.set(x, 1.85, z); bdJ.rotation.y = Math.PI / 2 + 0.5;
    B1.update(ph); B2.update(ph, 2);
  };
}
