// 마스코트 연필이 — read: 책 읽기
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  const book = K.box(1.3, 0.9, 0.08, 0xc0392b, 0, 2.25, 1.25, M.body); book.rotation.x = -0.9;
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const f = Math.sin(ph * 2);
  return { lean: 0.12, armL: { fwd: 0.8, out: -0.2, elbow: 1.0 }, armR: { fwd: 0.8 + 0.15 * Math.max(0,f), out: -0.2, elbow: 1.0 }, side: 0.03 * f };
  };
  return (t, ph) => M.pose(pose(ph));
}
