// 마스코트 연필이 — hello
import { makePencil } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xe9e7e1, fog: [0xe9e7e1, 40, 120] };
export default function (K) {
  const { cam, scene, THREE } = K;
  K.ground(scene, { color: '#dcd9d2', line: '#d2cfc8', tiles: 2, repeat: 4 });
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  // 인사: 손을 크게 흔든다
  const w = Math.sin(ph * 4);
  return { bob: 0.05 * Math.abs(Math.sin(ph*2)), side: 0.06 * w, armR: { fwd: 0.3, out: 1.9 + 0.15*w, elbow: 0.5 + 0.35 * w }, armL: { fwd: 0.1, out: 0.05 }, blink: K.win(ph,0.62,0.66,0.01) };
  };
  return (t, ph) => M.pose(pose(ph));
}
