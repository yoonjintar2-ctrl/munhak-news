// 마스코트 연필이 — write: 글쓰기: 몸을 숙여 연필심으로 종이에 쓱쓱
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: -2.75, z: 0 });
  const paper = K.box(2.4, 0.03, 1.8, 0xffffff, 2.55, 0.03, 1.45, scene); paper.rotation.y = 0.3;
  const ink = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.025, 6, 40, Math.PI * 1.6), K.flat(0x333333)); ink.rotation.x = -Math.PI / 2; ink.position.set(2.45, 0.06, 1.35); scene.add(ink);
  cam.position.set(0.3, 3.0, 13.5); cam.lookAt(0.3, 1.8, 0);
  const pose = (ph) => {
  const w = Math.sin(ph * 6), v = Math.sin(ph * 3);
  ink.material.opacity = 1; ink.geometry.dispose(); ink.geometry = new THREE.TorusGeometry(0.35, 0.025, 6, 40, Math.PI * 2 * (0.15 + 0.85 * ((ph / (Math.PI * 2)) % 1)));
  return { turn: 1.3 + 0.05 * w, lean: 1.8 + 0.03 * v, armL: { fwd: 0.4, out: 0.9, elbow: 0.6 }, armR: { fwd: 0.4, out: 0.9, elbow: 0.6 }, legL: 0.15, legR: 0.15 };
  };
  return (t, ph) => M.pose(pose(ph));
}
