// 마스코트 연필이 — shy: 부끄부끄 얼굴 가리기
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const s = Math.sin(ph * 2);
  return { side: 0.1 * s, turn: 0.15 * s, lean: 0.08, armL: { fwd: 1.45, out: -0.6, elbow: 2.2 }, armR: { fwd: 1.45, out: -0.6, elbow: 2.2 }, blink: 1, smile: 0.8 };
  };
  return (t, ph) => M.pose(pose(ph));
}
