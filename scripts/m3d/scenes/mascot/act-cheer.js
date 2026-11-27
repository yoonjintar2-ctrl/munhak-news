// 마스코트 연필이 — cheer: 신남: 두 팔 번쩍 폴짝
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const j = Math.max(0, Math.sin(ph * 2));
  return { bob: 0.9 * j, armL: { fwd: 0.2, out: 2.4 - 0.4*j, elbow: 0.2 }, armR: { fwd: 0.2, out: 2.4 - 0.4*j, elbow: 0.2 }, legL: -0.3 * j, legR: 0.3 * j };
  };
  return (t, ph) => M.pose(pose(ph));
}
