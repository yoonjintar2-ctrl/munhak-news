// 마스코트 연필이 — sad: 시무룩(작품 속 슬픈 장면)
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const s = Math.sin(ph);
  return { lean: 0.25, side: 0.04 * s, armL: { fwd: 0.05, out: -0.2 }, armR: { fwd: 0.05, out: -0.2 }, smile: -0.8, blink: K.win(ph,0.45,0.5,0.01) };
  };
  return (t, ph) => M.pose(pose(ph));
}
