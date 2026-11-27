// 11/28 오늘의 문장 「빈처」: 1920년대 셋방, 등잔 아래 원고지 책상. 조끼 차림 청년 작가가 일어서 바느질하던 아내(저고리+한복 치마, 쪽머리)의 두 손을 감싸 쥔다. 등잔불 흔들림·그림자·창호지 문 바람. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e3dc, fog: [0xe2dfd8, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d4cfc4', line: '#ccc7bc', tiles: 4, repeat: 3 });
  K.backdrop(scene, { kind: 'room', seed: 2811 });
  // 창호지 문(격자는 성기게)
  const door = new THREE.Group(); door.position.set(-6, 0, -6.6); scene.add(door);
  K.box(3.4, 5, 0.15, 0xf4f2ec, 0, 2.5, 0, door); [-0.85, 0.85].forEach(x => K.box(0.08, 5, 0.2, 0x55534e, x, 2.5, 0.05, door)); [1.6, 3.3].forEach(y => K.box(3.4, 0.08, 0.2, 0x55534e, 0, y, 0.05, door));
  // 낮은 책상 + 원고지 + 붓/펜 + 등잔
  K.box(3.2, 0.12, 1.6, 0x4a4844, 1.6, 1.0, -1.6, scene); [[-1.4, -0.6], [1.4, -0.6], [-1.4, 0.6], [1.4, 0.6]].forEach(([x, z]) => K.box(0.14, 1.0, 0.14, 0x3a3936, 1.6 + x, 0.5, -1.6 + z, scene));
  K.box(1.0, 0.03, 1.3, 0xfbfaf6, 1.1, 1.08, -1.6, scene); K.box(0.8, 0.03, 1.1, 0xf2f0ea, 2.2, 1.08, -1.4, scene);
  K.cyl(0.03, 0.03, 0.9, 0x1e1e1e, 2.6, 1.12, -1.9, scene, 6).rotation.z = Math.PI / 2;
  K.cyl(0.16, 0.22, 0.5, 0x3a3936, 3.0, 1.32, -2.0, scene, 10); K.cyl(0.05, 0.05, 0.3, 0x2a2a28, 3.0, 1.7, -2.0, scene, 6);
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), new THREE.MeshBasicMaterial({ color: 0xfffdf6 })); flame.position.set(3.0, 1.95, -2.0); scene.add(flame);
  // 바느질 바구니·반짇고리·책 더미
  K.cyl(0.5, 0.4, 0.4, 0x6e6c66, -3.0, 0.2, 0.2, scene, 14); K.box(0.6, 0.06, 0.4, 0xf2f0ea, -3.0, 0.43, 0.2, scene);
  [0, 1, 2].forEach(i => K.box(0.9, 0.18, 0.65, [0x55534e, 0x8a8782, 0x3a3936][i], 4.6, 0.09 + i * 0.18, -2.6, scene));
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(1.3, 20), new THREE.MeshBasicMaterial({ color: 0xbdb8ae, transparent: true, opacity: 0.45 })); shadow.position.set(-0.4, 3.6, -6.55); scene.add(shadow);
  const Hu = K.person(scene, { x: 0.75, z: 0.6, rot: Math.PI / 2 + 0.35, coat: 0xe6e3dc, outfit: 'vest', sleeve: 0xf2f0ea, hair: 'short', eyes: 'closed', brows: 'up', mouth: 'smile', seed: 2812 });
  const Wi = K.person(scene, { x: -1.25, z: 0.7, rot: -Math.PI / 2 - 0.3, coat: 0xf2f0ea, outfit: 'jeogori', skirt: 'chima', skirtC: 0x55534e, hair: 'bun', eyes: 'smile', brows: 'flat', mouth: 'small', seed: 2813, scale: 0.86 });
  cam.position.set(-0.4, 3.0, 8.6); cam.lookAt(-0.2, 2.1, -0.6);
  return (t, ph) => {
    const s = Math.sin(ph);
    Hu.pose({ lean: 0.05, headPitch: 0.15, headYaw: 0.05 * s, armL: { fwd: 0.95, elbow: 0.9, out: -0.15 }, armR: { fwd: 0.95, elbow: 0.9, out: 0.1 } });
    Wi.pose({ headPitch: -0.12 + 0.06 * s, headTilt: 0.12, armL: { fwd: 0.9, elbow: 0.8 }, armR: { fwd: 0.9, elbow: 0.8, out: -0.1 } });
    const f = 1 + 0.18 * Math.sin(ph * 5) + 0.08 * Math.sin(ph * 9); flame.scale.set(1, f * 1.4, 1);
    shadow.position.x = -0.4 + 0.12 * Math.sin(ph * 5); shadow.scale.setScalar(1 + 0.05 * Math.sin(ph * 9));
    door.rotation.y = 0.02 * Math.sin(ph * 2);
  };
}
