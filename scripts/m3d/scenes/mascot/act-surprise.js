// 마스코트 연필이 — surprise: 깜짝 놀람
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const s = K.win(ph, 0.2, 0.8, 0.06);
  return { bob: 0.25 * s, lean: -0.15 * s, armL: { fwd: 0.6 * s, out: 1.2 * s, elbow: 1.6 * s }, armR: { fwd: 0.6 * s, out: 1.2 * s, elbow: 1.6 * s }, smile: 1 - 0.7 * s, eyeBig: 1 + 0.35 * s };
  };
  return (t, ph) => M.pose(pose(ph));
}
