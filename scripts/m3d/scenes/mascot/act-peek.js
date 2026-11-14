// 마스코트 연필이 — peek: 옆에서 빼꼼
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const p = K.win(ph, 0.15, 0.85, 0.2);
  return { side: -0.5 * p, armR: { fwd: 0.2, out: 1.8 * p, elbow: 0.6 }, armL: { fwd: 0.1, out: 0.1 }, eyeBig: 1 + 0.15 * p, blink: K.win(ph,0.55,0.58,0.01) };
  };
  return (t, ph) => M.pose(pose(ph));
}
