// 마스코트 연필이 — bow: 꾸벅 인사
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const b = K.win(ph, 0.25, 0.75, 0.15);
  return { lean: 0.55 * b, armL: { fwd: 0.4 * b, out: -0.15, elbow: 0.6 * b }, armR: { fwd: 0.4 * b, out: -0.15, elbow: 0.6 * b }, blink: b > 0.6 ? 1 : 0 };
  };
  return (t, ph) => M.pose(pose(ph));
}
