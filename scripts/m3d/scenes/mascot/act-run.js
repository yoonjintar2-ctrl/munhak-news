// 마스코트 연필이 — run: 헐레벌떡 달리기(제자리)
import { makePencil } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  const fl = new THREE.Mesh(new THREE.CircleGeometry(4.5, 48), K.lam(0xf3dfb4)); fl.rotation.x = -Math.PI / 2; fl.position.y = 0.01; scene.add(fl);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const w = Math.sin(ph * 8);
  return { turn: 0.9, lean: 0.25, bob: 0.15 * Math.abs(w), legL: 0.8 * w, legR: -0.8 * w, armL: { fwd: -1.0 * w, out: 0.1, elbow: 1.4 }, armR: { fwd: 1.0 * w, out: 0.1, elbow: 1.4 } };
  };
  return (t, ph) => M.pose(pose(ph));
}
