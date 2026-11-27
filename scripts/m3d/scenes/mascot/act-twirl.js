// 마스코트 연필이 — twirl: 제자리 한 바퀴 빙글
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const u = (ph / (Math.PI * 2)) % 1;
  return { turn: Math.PI * 2 * K.win(ph, 0.1, 0.9, 0.3) * u, bob: 0.2 * Math.sin(Math.PI * u), armL: { fwd: 0.2, out: 1.4, elbow: 0.3 }, armR: { fwd: 0.2, out: 1.4, elbow: 0.3 }, legL: 0.2 * Math.sin(ph * 4) };
  };
  return (t, ph) => M.pose(pose(ph));
}
