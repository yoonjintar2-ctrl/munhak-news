// 11/16 1분 현대문학 「엄마를 부탁해」 대표: 붐비는 지하철 승강장. 전동차 문 앞의 노신사(남편)가 뒤를 돌아보며 손을 뻗고, 인파 너머 쪽진 머리 여인의 뒷모습이 멈춰 서 있다. 형광등이 깜박이고 인파가 오간다(전동차는 정차, 진행 방향 없음)
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 34, 120] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3ca', line: '#cac7be', tiles: 4, repeat: 5 });
  // 승강장 뒷벽 + 기둥 + 안전선
  K.box(40, 9, 0.4, 0xdcd9d1, 0, 4.5, -8.5, scene);
  [-9, -3, 3, 9].forEach(x => K.box(0.8, 9, 0.8, 0xb9b6ae, x, 4.5, -2.8, scene));
  K.box(40, 0.05, 0.25, 0x5a5955, 0, 0.03, -4.6, scene);
  // 전동차(뒤, 정차) — 문 열림
  const car = new THREE.Group(); car.position.set(0, 0, -6.4); scene.add(car);
  K.box(30, 4.4, 2.6, 0x8d8b85, 0, 2.6, 0, car); K.box(30, 0.35, 2.7, 0x5a5955, 0, 3.4, 0.02, car);
  [-10, -4, 2, 8].forEach(x => { K.box(1.6, 1.1, 0.06, 0xeeede8, x, 3.0, 1.32, car); });
  K.box(1.8, 3.4, 0.08, 0x3a3936, -1.0, 1.9, 1.32, car);
  // 형광등 줄
  const lights = []; for (let i = 0; i < 6; i++) { const l = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.15, 0.3), K.flat(0xfbfaf4)); l.position.set(-12 + i * 4.8, 7.6, -3.5); scene.add(l); lights.push(l); }
  // 의자, 쓰레기통
  K.box(3, 0.15, 0.7, 0x4a4945, 6.2, 1.0, -7.6, scene); K.cyl(0.4, 0.4, 1.1, 0x55534e, -6.4, 0.55, -7.6, scene, 12);
  // 남편: 전동차 문 안쪽 경계에서 돌아봄
  const H = K.person(scene, { x: -1.0, z: -4.9, rot: Math.PI - 0.6, coat: 0x3c3b38, pants: 0x2a2a28, hair: 'cap', scale: 0.95 });
  K.box(0.7, 0.5, 0.3, 0x6a6862, -0.35, 1.3, -4.6, scene); // 가방
  // 엄마: 인파 너머(오른쪽 앞), 뒷모습 — 쪽진 머리
  const M = K.person(scene, { x: 4.2, z: 1.0, rot: 0.15, coat: 0x9a978f, pants: 0x4a4946, hair: 'bun', scale: 0.85 });
  // 인파(오가는 사람들)
  const crowd = []; const cs = [[-6.5, -1.5, 0x4a4946, 'short', 1], [-4.2, 0.8, 0x6a6862, 'long', -1], [2.2, -1.2, 0x55534e, 'short', 1], [7.2, 1.6, 0x777570, 'cap', -1], [-7.8, 2.2, 0x3f3e3b, 'short', 1]];
  cs.forEach(([x, z, c, h, dir], i) => { const p = K.person(scene, { x, z, rot: dir > 0 ? -Math.PI / 2 : Math.PI / 2, coat: c, hair: h, scale: 0.9 + (i % 2) * 0.05 }); crowd.push({ p, x, dir, k: i * 1.3 }); });
  cam.position.set(0.8, 6.0, 14.5); cam.lookAt(0.6, 2.0, -3.0);
  return (t, ph) => {
    lights[2].material.color.setHex(Math.sin(ph * 9) > 0.7 ? 0xbdbcb6 : 0xfbfaf4);
    crowd.forEach(o => { o.p.root.position.x = o.x + o.dir * 0.9 * Math.sin(ph + o.k); o.p.root.rotation.y = Math.cos(ph + o.k) * o.dir > 0 ? -Math.PI / 2 : Math.PI / 2;
      const sw = 0.35 * Math.sin(ph * 6 + o.k); o.p.pose({ armL: { fwd: sw, elbow: 0.3 }, armR: { fwd: -sw, elbow: 0.3 } }); });
    const reach = K.win(ph, 0.25, 0.85, 0.1);
    H.pose({ headYaw: -0.3 - 0.3 * reach, headPitch: 0.05, torsoYaw: -0.25 * reach, armR: { fwd: 0.4 + 0.9 * reach, out: -0.1, elbow: 0.25 }, armL: { fwd: 0.3, elbow: 1.0 } });
    M.pose({ headYaw: 0.35 * Math.sin(ph), headPitch: -0.1, armL: { fwd: 0.3, elbow: 1.2 }, armR: { fwd: 0.3, elbow: 1.2 } });
  };
}
