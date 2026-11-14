// 마스코트 연필이 — headspin: 물구나무 헤드스핀하며 연필심으로 바닥에 동그라미 글씨
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const paper = K.box(3.6, 0.03, 3.6, 0xffffff, 0, 0.03, 0, scene);
  const M = makePencil(K, { x: 0, z: 0 });
  const spin = new THREE.Group(); scene.add(spin); spin.add(M.root);
  M.root.rotation.z = Math.PI; M.root.position.y = 7.2;   // 거꾸로: 연필심이 바닥(종이)에 닿는다
  let ink = null;
  cam.position.set(0, 5.2, 12.5); cam.lookAt(0, 3.8, 0);
  return (t, ph) => {
    const u = (ph / (Math.PI * 2)) % 1;
    spin.rotation.y = ph * 2;                              // 3초에 두 바퀴
    spin.position.set(0.55 * Math.cos(ph), 0, 0.55 * Math.sin(ph));   // 심이 종이 위에서 동그라미를 그린다
    spin.rotation.z = 0.06 * Math.sin(ph * 2);
    if (ink) { scene.remove(ink); ink.geometry.dispose(); }
    ink = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.035, 6, 48, Math.PI * 2 * Math.max(0.02, u)), K.flat(0x333333)); ink.rotation.x = -Math.PI / 2; ink.position.y = 0.07; scene.add(ink);
    const k = Math.sin(ph * 6);
    M.pose({ legL: 0.5 * k, legR: -0.5 * k, armL: { fwd: 0.2, out: 1.5 + 0.2 * k, elbow: 0.3 }, armR: { fwd: 0.2, out: 1.5 - 0.2 * k, elbow: 0.3 }, smile: 1.2 });
  };
}
