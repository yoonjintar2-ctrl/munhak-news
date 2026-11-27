// 마스코트 연필이 — walk: 총총 걷기(제자리)
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const w = Math.sin(ph * 4);
  return { bob: 0.08 * Math.abs(w), side: 0.05 * w, legL: 0.45 * w, legR: -0.45 * w, armL: { fwd: -0.5 * w, out: 0.1, elbow: 0.5 }, armR: { fwd: 0.5 * w, out: 0.1, elbow: 0.5 } };
  };
  return (t, ph) => M.pose(pose(ph));
}
