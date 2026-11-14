// 마스코트 연필이 — talk: 나레이션(말하는 중): 정면을 보고 입을 오물오물, 두 손으로 가볍게 설명하는 몸짓 (원형 인서트용)
import { makePencil, stage } from './pencil.js';
export const secs = 3;
export const opts = { bg: 0xfdf3dc, fog: null, color: true };
export default function (K) {
  const { cam, scene, THREE } = K;
  stage(K);
  const M = makePencil(K, { x: 0, z: 0 });
  cam.position.set(0, 4.2, 11.5); cam.lookAt(0, 3.4, 0);
  const pose = (ph) => {
    const m = Math.abs(Math.sin(ph * 9)) * (0.6 + 0.4 * Math.sin(ph * 2));   // 말하는 입(벌렸다 닫았다)
    const g = Math.sin(ph * 2), h = Math.sin(ph * 3 + 1);
    return { smile: 0.45 + 1.3 * m, lean: 0.03 * g, side: 0.04 * h, bob: 0.025 * Math.abs(Math.sin(ph * 6)),
      armL: { fwd: 0.7 + 0.2 * g, out: 0.25, elbow: 1.1 + 0.25 * h }, armR: { fwd: 0.6 - 0.2 * h, out: 0.3, elbow: 1.0 + 0.25 * g },
      blink: K.win(ph, 0.42, 0.46, 0.01) };
  };
  return (t, ph) => M.pose(pose(ph));
}
