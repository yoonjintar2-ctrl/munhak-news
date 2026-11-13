// 마스코트 연필이 — byebye: 두 손 흔들며 안녕
import { makePencil } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  const fl = new THREE.Mesh(new THREE.CircleGeometry(4.5, 48), K.lam(0xf3dfb4)); fl.rotation.x = -Math.PI / 2; fl.position.y = 0.01; scene.add(fl);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const w = Math.sin(ph * 5);
  return { bob: 0.05 * Math.abs(w), armL: { fwd: 0.2, out: 2.2 - 0.25 * w, elbow: 0.3 }, armR: { fwd: 0.2, out: 2.2 + 0.25 * w, elbow: 0.3 }, side: 0.05 * w };
  };
  return (t, ph) => M.pose(pose(ph));
}
