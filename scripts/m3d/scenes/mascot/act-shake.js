// 마스코트 연필이 — shake: 아니아니 도리도리
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const s = Math.sin(ph * 4);
  return { turn: 0.35 * s, armL: { fwd: 0.9, out: 0.4 + 0.3 * s, elbow: 1.3 }, armR: { fwd: 0.9, out: 0.4 - 0.3 * s, elbow: 1.3 }, smile: 0.5 };
  };
  return (t, ph) => M.pose(pose(ph));
}
