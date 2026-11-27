// 11/18 오늘의 소설 「빵」: 새벽 두 시 반의 좁은 부엌. 식탁 옆에 선 잠옷 차림의 늙은 남편이 문간의 아내 쪽으로 고개를 돌리며 어색하게 손을 내젓고, 아내는 식탁의 빵 접시를 내려다본다. 머리 위 전등이 흔들리고 창 커튼이 바람에 날린다(밤 장면이지만 전등 불빛으로 밝게)
export const secs = 3;
export const opts = { bg: 0xdedcd6, fog: [0xd8d6d0, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfcbc1', line: '#c6c2b8', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 58 });
  // 식탁 + 접시 + 빵 + 칼
  K.box(3.0, 0.16, 1.6, 0x5a5853, 0.6, 1.7, -3.6, scene); [[-0.8, -4.3], [2.0, -4.3], [-0.8, -2.9], [2.0, -2.9]].forEach(([x, z]) => K.box(0.12, 1.7, 0.12, 0x3a3936, x, 0.85, z, scene));
  K.cyl(0.45, 0.4, 0.06, 0xf2f0ea, 0.3, 1.81, -3.4, scene, 20);
  const loaf = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.4, 14, 10), K.lam(0x8a7f70)), 40); loaf.scale.set(1.3, 0.55, 0.8); loaf.position.set(0.3, 1.98, -3.4); scene.add(loaf);
  K.box(0.7, 0.03, 0.08, 0x1f1f1d, 1.2, 1.8, -3.2, scene);
  // 찬장, 창(커튼)
  K.box(1.6, 2.8, 0.8, 0x6a6964, 3.8, 1.4, -5.6, scene); K.box(1.5, 0.05, 0.75, 0x45443f, 3.8, 2.0, -5.2, scene);
  K.box(2.4, 1.8, 0.1, 0x6e6c67, -1.4, 3.6, -6.4, scene); K.box(2.1, 1.5, 0.05, 0xb8b6b0, -1.4, 3.6, -6.32, scene);
  const curtain = new THREE.Group(); curtain.position.set(-2.3, 4.5, -6.2); scene.add(curtain); K.box(0.7, 1.8, 0.04, 0xeceae4, 0, -0.9, 0, curtain);
  // 전등(줄에 매달림)
  const lamp = new THREE.Group(); lamp.position.set(0.6, 6.4, -3.6); scene.add(lamp); K.cyl(0.02, 0.02, 1.8, 0x1f1f1d, 0, -0.9, 0, lamp, 4);
  const shade = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.5, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0x3a3936, side: THREE.DoubleSide })), 40); shade.position.y = -1.9; lamp.add(shade);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), K.flat(0xffffff)); bulb.position.y = -2.05; lamp.add(bulb);
  // 남편(식탁 오른쪽, 아내 쪽 = -x를 향함, 밝은 잠옷) · 아내(문간 왼쪽, +x를 향함, 진한 숄)
  const H = K.person(scene, { x: 2.4, z: -2.6, rot: Math.PI / 2 + 0.5, coat: 0xd8d5ce, pants: 0xc8c5be, hair: 'short', hairC: 0x262626, scale: 0.95 });
  const Wf = K.person(scene, { x: -2.0, z: -2.3, rot: -Math.PI / 2 - 0.45, coat: 0x45443f, pants: 0x6a6964, hair: 'bun', scale: 0.9, scarf: 0xe8e6e0 });
  K.box(0.2, 4.2, 0.4, 0x45443f, -2.9, 2.1, -3.0, scene); // 문틀
  cam.position.set(0.4, 3.4, 5.6); cam.lookAt(0.3, 2.0, -3.2);
  return (t, ph) => {
    lamp.rotation.z = 0.08 * Math.sin(ph); lamp.rotation.x = 0.04 * Math.sin(ph + 1);
    curtain.rotation.x = -0.25 - 0.2 * Math.sin(ph); curtain.rotation.z = 0.05 * Math.sin(ph * 2);
    const ex = K.win(ph, 0.1, 0.6, 0.1), down = K.win(ph, 0.45, 0.95, 0.12);
    H.pose({ headYaw: 0.1, headPitch: -0.1 + 0.1 * ex, lean: 0.05, armR: { fwd: 0.6 + 0.6 * ex, out: 0.25 + 0.25 * Math.sin(ph * 6) * ex, elbow: 1.0 }, armL: { fwd: 0.15, elbow: 0.4 } });
    Wf.pose({ headYaw: -0.3 * down, headPitch: -0.45 * down, armL: { fwd: 0.7, out: -0.2, elbow: 1.5 }, armR: { fwd: 0.7, out: -0.2, elbow: 1.5 } });
  };
}
