// 마스코트 연필이 — hello: 인사: 손을 크게 흔든다
import { makePencil } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  const fl = new THREE.Mesh(new THREE.CircleGeometry(4.5, 48), K.lam(0xf3dfb4)); fl.rotation.x = -Math.PI / 2; fl.position.y = 0.01; scene.add(fl);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
  const w = Math.sin(ph * 4);
  return { bob: 0.05 * Math.abs(Math.sin(ph*2)), side: 0.06 * w, armR: { fwd: 0.2, out: 2.3 + 0.25*w, elbow: 0.2 }, armL: { fwd: 0.1, out: 0.05 }, blink: K.win(ph,0.62,0.66,0.01) };
  };
  return (t, ph) => M.pose(pose(ph));
}
