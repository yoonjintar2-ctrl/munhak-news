// 마스코트 연필이 — cheer
import { makePencil } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xe9e7e1, fog: [0xe9e7e1, 40, 120] };
export default function (K) {
  const { cam, scene, THREE } = K;
  K.ground(scene, { color: '#dcd9d2', line: '#d2cfc8', tiles: 2, repeat: 4 });
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  // 신남: 두 팔 번쩍 들고 폴짝
  const j = Math.max(0, Math.sin(ph * 2));
  return { bob: 0.9 * j, armL: { fwd: 0.2, out: 2.4 - 0.4*j, elbow: 0.2 }, armR: { fwd: 0.2, out: 2.4 - 0.4*j, elbow: 0.2 }, legL: -0.3 * j, legR: 0.3 * j };
  };
  return (t, ph) => M.pose(pose(ph));
}
