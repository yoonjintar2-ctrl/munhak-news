// 11/21 오늘의 문장 『광장』: 넓은 돌바닥 광장 한가운데 홀로 선 사람(뒷모습에서 고개를 들어 옆얼굴), 광장 가장자리 건물의 불 켜진 작은 창 하나를 올려다본다. 비둘기 두 마리가 돌고, 그 창의 커튼이 흔들리며, 바닥 비둘기가 모이를 쫀다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 40, 130] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#e4e1d9', line: '#cfccc4', tiles: 10, repeat: 6 });
  K.backdrop(scene, { kind: 'city', seed: 211 });
  // 광장 둘레 건물(앞쪽 큰 건물 셋)
  [[-9, -14, 8, 9], [0, -16, 8, 12], [9, -14, 8, 8]].forEach(([x, z, w, h], i) => { K.box(w, h, 5, [0xd8d5cd, 0xcfccc4, 0xd8d5cd][i], x, h / 2, z, scene); for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) K.box(1.0, 1.3, 0.1, 0x8a8782, x - 2.6 + c * 2.6, 2.2 + r * 2.8, z + 2.55, scene); });
  // 불 켜진 작은 창(가운데 건물) + 커튼
  const lit = K.box(1.6, 2.0, 0.12, 0xffffff, 2.6, 8.4, -13.4, scene); const glow = new THREE.Mesh(new THREE.CircleGeometry(1.8, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, depthWrite: false })); glow.position.set(2.6, 8.4, -13.3); scene.add(glow);
  const cur = K.box(0.45, 1.2, 0.05, 0x8a8782, 2.2, 8.4, -13.25, scene);
  // 가로등 둘, 벤치 하나, 분수대
  [-5, 5].forEach(x => { K.cyl(0.08, 0.1, 5, 0x3a3936, x, 2.5, -6, scene, 8); K.box(0.5, 0.4, 0.5, 0xf4f2ec, x, 5.1, -6, scene); });
  K.box(2.4, 0.15, 0.6, 0x55534e, -4.5, 0.75, -3.2, scene); [-5.5, -3.5].forEach(x => K.box(0.12, 0.7, 0.5, 0x3a3936, x, 0.35, -3.2, scene));
  K.cyl(2.2, 2.4, 0.6, 0xbcb9b1, 4.5, 0.3, -8, scene, 28);
  const P = K.person(scene, { x: -1.4, z: -2.2, rot: -0.35, coat: 0x45443f, pants: 0x2a2a28, hair: 'short', scale: 0.95, scarf: 0xf2f0ea });
  const birds = [K.bird(scene, { cx: -1, cy: 8, cz: -9, rx: 6, rz: 3, s: 1.0 }), K.bird(scene, { cx: 2, cy: 9.5, cz: -10, rx: 5, rz: 2, s: 0.9 })];
  const pg = new THREE.Group(); pg.position.set(-2.2, 0, -1.2); scene.add(pg); const pb = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), K.lam(0x77756f)), 50); pb.scale.set(1.4, 1, 1); pb.position.y = 0.25; pg.add(pb);
  const ph2 = new THREE.Group(); ph2.position.set(0.28, 0.38, 0); pg.add(ph2); ph2.add(new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), K.lam(0x77756f)));
  cam.position.set(0.8, 2.8, 6.2); cam.lookAt(0.2, 3.6, -6);
  return (t, ph) => {
    P.pose({ headPitch: -0.55 - 0.08 * Math.sin(ph), headYaw: -0.7 - 0.12 * Math.sin(ph), torsoYaw: -0.2, armL: { fwd: 0.1, out: 0.05 }, armR: { fwd: 0.2 + 1.9 * K.win(ph, 0.35, 0.8, 0.12), out: -0.15, elbow: 0.2, point: true } });
    birds[0].update(ph); birds[1].update(ph, 2.0);
    cur.position.x = 2.1 + 0.25 * Math.sin(ph * 2); lit.material.color.setScalar(0.92 + 0.08 * Math.sin(ph * 3));
    ph2.rotation.z = -0.5 * Math.max(0, Math.sin(ph * 4)); ph2.position.y = 0.38 - 0.12 * Math.max(0, Math.sin(ph * 4));
  };
}
