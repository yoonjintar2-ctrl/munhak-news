// 마스코트 연필이 — point
import { makePencil } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xe9e7e1, fog: [0xe9e7e1, 40, 120] };
export default function (K) {
  const { cam, scene, THREE } = K;
  K.ground(scene, { color: '#dcd9d2', line: '#d2cfc8', tiles: 2, repeat: 4 });
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  // 설명: 옆(화면 쪽)을 가리키며 고개를 끄덕
  const n = Math.sin(ph * 3);
  return { turn: 0.25, lean: 0.05 * n, armL: { fwd: 1.35, out: 0.6, elbow: 0.15 }, armR: { fwd: 0.5, out: 0.15, elbow: 1.2 + 0.2 * n }, bob: 0.03 * Math.abs(n), blink: K.win(ph,0.3,0.34,0.01) };
  };
  return (t, ph) => M.pose(pose(ph));
}
