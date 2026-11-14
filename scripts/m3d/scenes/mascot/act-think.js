// 마스코트 연필이 — think: 생각: 턱에 손 대고 갸웃
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const t = Math.sin(ph);
  return { side: 0.12 * t, lean: 0.04, armR: { fwd: 1.25, out: -0.55, elbow: 2.5, twist: 0.3 }, armL: { fwd: 0.5, out: -0.1, elbow: 1.5 }, smile: 0.4, blink: K.win(ph,0.5,0.54,0.01) };
  };
  return (t, ph) => M.pose(pose(ph));
}
