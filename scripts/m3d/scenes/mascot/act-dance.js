// 마스코트 연필이 — dance: 신나는 춤
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const d = Math.sin(ph * 4);
  return { side: 0.2 * d, turn: 0.2 * Math.sin(ph * 2), bob: 0.15 * Math.abs(d), armL: { fwd: 0.4, out: 1.6 + 0.5 * d, elbow: 0.8 }, armR: { fwd: 0.4, out: 1.6 - 0.5 * d, elbow: 0.8 }, legL: 0.25 * d, legR: -0.25 * d };
  };
  return (t, ph) => M.pose(pose(ph));
}
