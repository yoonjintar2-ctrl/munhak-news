// 마스코트 연필이 — read
import { makePencil } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xe9e7e1, fog: [0xe9e7e1, 40, 120] };
export default function (K) {
  const { cam, scene, THREE } = K;
  K.ground(scene, { color: '#dcd9d2', line: '#d2cfc8', tiles: 2, repeat: 4 });
  const M = makePencil(K, { x: 0, z: 0 });
  const book = K.box(1.3, 0.9, 0.08, 0x8a8a84, 0, 2.25, 1.25, M.body); book.rotation.x = -0.9;
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  // 책 읽기: 두 손으로 책을 들고 고개를 살짝 숙여 넘긴다
  const f = Math.sin(ph * 2);
  return { lean: 0.12, armL: { fwd: 0.8, out: -0.2, elbow: 1.0 }, armR: { fwd: 0.8 + 0.15 * Math.max(0,f), out: -0.2, elbow: 1.0 }, side: 0.03 * f };
  };
  return (t, ph) => M.pose(pose(ph));
}
