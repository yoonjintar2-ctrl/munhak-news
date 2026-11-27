// 마스코트 연필이 — run: 헐레벌떡 달리기(제자리)
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const w = Math.sin(ph * 8);
  return { turn: 0.9, lean: 0.25, bob: 0.15 * Math.abs(w), legL: 0.8 * w, legR: -0.8 * w, armL: { fwd: -1.0 * w, out: 0.1, elbow: 1.4 }, armR: { fwd: 1.0 * w, out: 0.1, elbow: 1.4 } };
  };
  return (t, ph) => M.pose(pose(ph));
}
