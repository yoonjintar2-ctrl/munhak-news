// 마스코트 연필이 — bow
import { makePencil } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xe9e7e1, fog: [0xe9e7e1, 40, 120] };
export default function (K) {
  const { cam, scene, THREE } = K;
  K.ground(scene, { color: '#dcd9d2', line: '#d2cfc8', tiles: 2, repeat: 4 });
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  // 꾸벅: 끝인사로 고개(몸) 숙이기
  const b = K.win(ph, 0.25, 0.75, 0.15);
  return { lean: 0.55 * b, armL: { fwd: 0.4 * b, out: -0.15, elbow: 0.6 * b }, armR: { fwd: 0.4 * b, out: -0.15, elbow: 0.6 * b }, blink: b > 0.6 ? 1 : 0 };
  };
  return (t, ph) => M.pose(pose(ph));
}
