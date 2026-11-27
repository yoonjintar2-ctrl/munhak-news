// 11/25 하루키 장면①(after 2): 조용한 길모퉁이에서 딱 마주친 소년(모자)과 소녀(긴 머리)가 놀라 멈춰 서서 서로를 본다. 소녀가 소년을 가리키고 소년은 한 손을 가슴에. 두 사람 마주 봄(소년 rot -2.0, 소녀 rot 2.0, 얼굴 카메라 쪽 비스듬). 우체통·가로등·담장, 꽃잎·전깃줄 흔들림. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d8d5cd', line: '#d0cdc5', tiles: 4, repeat: 5 });
  K.backdrop(scene, { kind: 'town', seed: 2532 });
  // 모퉁이 건물(ㄱ자) + 담장
  K.box(6, 3.6, 3, 0xe2dfd7, -5, 1.8, -5.5, scene); K.box(3, 3.6, 5, 0xd0cdc5, 4.8, 1.8, -5, scene);
  for (let i = 0; i < 4; i++) K.box(0.8, 0.9, 0.05, 0x6e6c66, -6.6 + i * 1.1, 2.3, -3.98, scene);
  K.box(7, 1.2, 0.3, 0xbcb9b1, -1, 0.6, -3.6, scene);
  // 우체통(둥근 기둥형) · 가로등
  K.cyl(0.35, 0.35, 1.3, 0x45443f, 2.6, 0.65, -2.2, scene, 16); K.cyl(0.4, 0.38, 0.2, 0x2f2e2b, 2.6, 1.4, -2.2, scene, 16); K.box(0.4, 0.06, 0.1, 0xeeece6, 2.6, 1.1, -1.87, scene);
  K.cyl(0.07, 0.1, 4.4, 0x2f2e2b, -3.2, 2.2, -2.6, scene, 8); const lp = K.box(0.6, 0.35, 0.4, 0x3a3936, -2.95, 4.35, -2.6, scene);
  const wire = []; for (let i = 0; i < 3; i++) wire.push(K.line([[-12, 6 - i * 0.3, -6], [0, 5.4 - i * 0.3, -6], [12, 6 - i * 0.3, -6]], scene));
  const B = K.person(scene, { x: 0.9, z: -0.8, rot: -2.0, coat: 0x45443f, pants: 0x2f2e2b, hair: 'cap', scale: 0.92 });
  const G = K.person(scene, { x: -0.8, z: -0.8, rot: 2.0, coat: 0xd8d5cd, pants: 0x55534e, hair: 'long', scale: 0.86, scarf: 0x6e6c66 });
  const pet = []; for (let i = 0; i < 14; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.07), new THREE.MeshLambertMaterial({ color: 0x8a8782, side: THREE.DoubleSide })); scene.add(m); pet.push({ m, k: i / 14 }); }
  cam.position.set(0.0, 2.4, 6.6); cam.lookAt(0.0, 1.6, -1.4);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), p = K.win(ph, 0.2, 0.75, 0.12);
    G.pose({ headTilt: 0.1 * p, lean: -0.05 * p, armR: { fwd: 0.3 + 1.2 * p, elbow: 0.2, point: p > 0.5 }, armL: { fwd: 0.8, elbow: 1.8 } });
    B.pose({ lean: -0.08 * p, headPitch: -0.05, headTilt: -0.08 * p, armL: { fwd: 0.9 * p + 0.2, elbow: 1.9 * p + 0.2 }, armR: { fwd: 0.2, elbow: 0.3 } });
    wire.forEach((w, i) => { w.position.y = 0.08 * Math.sin(ph * 2 + i); });
    pet.forEach(o => { const v = (o.k + u) % 1; o.m.position.set(-5 + v * 10, 5 - v * 4.8 + 0.3 * Math.sin(ph * 3 + o.k * 9), -2.2 + o.k * 2); o.m.rotation.set(ph * 3 + o.k * 7, ph * 2, o.k); });
  };
}
