// 11/24 1분 현대문학 「오기 렌의 크리스마스 이야기」 대표: 브루클린 길모퉁이 담배 가게 앞, 앞치마 두른 점원 오기가 삼각대 위 카메라 셔터를 누르고(카메라 쪽 -z 너머 거리를 향해, rot -π/2, 오른쪽 길을 향함), 곁에서 코트 입은 작가가 지켜본다(rot -2.2). 신호등 깜박임·비둘기·길 건너 사람. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d5cd', line: '#ceCBc3'.toLowerCase(), tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'city', seed: 2408, near: false });
  // 가게 정면(뒤): 벽·진열창·차양·문
  K.box(8, 4, 0.4, 0xbcb9b1, -0.5, 2, -3.6, scene); K.box(2.6, 1.6, 0.06, 0xeeece6, -2.4, 1.8, -3.38, scene);
  for (let i = 0; i < 4; i++) K.box(0.4, 0.3, 0.2, [0x55534e, 0x8a8782][i % 2], -3.2 + i * 0.5, 1.3, -3.3, scene);
  const awn = K.box(8.2, 0.12, 1.4, 0x45443f, -0.5, 3.3, -2.9, scene); awn.rotation.x = -0.25;
  K.box(0.9, 2.2, 0.06, 0x55534e, 0.6, 1.1, -3.37, scene);
  // 길·건널목 줄·소화전·신호등
  K.box(3, 0.03, 30, 0xc8c5bd, 5.0, 0.02, -2, scene); for (let i = 0; i < 6; i++) K.box(3, 0.04, 0.5, 0xeeece6, 5.0, 0.03, -4 + i * 1.0, scene);
  K.cyl(0.2, 0.25, 0.8, 0x45443f, -3.4, 0.4, -1.8, scene, 10);
  K.cyl(0.07, 0.07, 4, 0x3a3936, 3.3, 2, -2.6, scene, 8); K.box(0.5, 1.2, 0.4, 0x262626, 3.3, 4.0, -2.6, scene);
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), K.flat(0xffffff)); lamp.position.set(3.3, 4.3, -2.38); scene.add(lamp);
  // 삼각대 + 카메라
  const tri = new THREE.Group(); tri.position.set(1.4, 0, -1.4); tri.rotation.y = -Math.PI / 2; scene.add(tri);
  [0, 2.1, 4.2].forEach(a => { const l = K.cyl(0.03, 0.03, 2.2, 0x1e1e1e, Math.cos(a) * 0.3, 1.05, Math.sin(a) * 0.3, tri, 6); l.rotation.z = Math.cos(a) * 0.25; l.rotation.x = -Math.sin(a) * 0.25; });
  K.box(0.5, 0.35, 0.3, 0x262626, 0, 2.3, 0, tri); K.cyl(0.1, 0.1, 0.25, 0x45443f, 0, 2.3, -0.25, tri, 10).rotation.x = Math.PI / 2;
  // 오기(앞치마) + 작가(코트)
  const A = K.person(scene, { x: 0.5, z: -1.4, rot: -Math.PI / 2, coat: 0x55534e, pants: 0x2f2e2b, hair: 'cap', scale: 1.0 });
  const apron = K.box(0.9, 1.3, 0.05, 0xeeece6, 0, 2.0, -0.55, A.root);
  const P = K.person(scene, { x: -1.4, z: -0.9, rot: -2.2, coat: 0x3a3936, pants: 0x262626, hair: 'short', scale: 1.0, scarf: 0xd8d5cd });
  // 지나가는 사람(길 건너, +x 로 걸음, rot -π/2)
  const X = K.person(scene, { x: 5.0, z: -8, rot: Math.PI, coat: 0x6e6c66, pants: 0x45443f, hair: 'long', scale: 0.9 });
  const B = K.bird(scene, { cx: -1, cy: 5.5, cz: -5, rx: 5, rz: 2, s: 0.7 });
  cam.position.set(0.3, 2.6, 6.2); cam.lookAt(0.4, 1.8, -1.8);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), click = K.win(ph, 0.35, 0.5, 0.05);
    A.pose({ lean: -0.2, headPitch: -0.05, armR: { fwd: 1.3, elbow: 0.8, out: -0.3 }, armL: { fwd: 1.1, elbow: 1.0, out: -0.2, point: click > 0.5 } });
    P.pose({ headYaw: 0.2 + 0.4 * K.win(ph, 0.55, 0.9, 0.1), armL: { fwd: 0.2 }, armR: { fwd: 1.0, elbow: 1.9 } });
    X.root.position.z = -8 + u * 7; X.pose({ bob: 0.03 * Math.abs(Math.sin(ph * 6)), armL: { fwd: 0.4 * Math.sin(ph * 6) }, armR: { fwd: -0.4 * Math.sin(ph * 6) } });
    lamp.material.color.setHex(Math.sin(ph * 3) > 0 ? 0xffffff : 0x8a8782);
    B.update(ph);
  };
}
