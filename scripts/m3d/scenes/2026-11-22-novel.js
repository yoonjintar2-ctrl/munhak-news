// 11/22 오늘의 소설 구절 『오만과 편견』: 촛불 켜진 영국 시골 응접실. 베넷 부인(밝은 드레스·보닛 머리)이 몸을 기울여 신이 나서 손짓하며 말하고, 안락의자의 베넷 씨(진한 연미복)는 신문을 든 채 고개만 돌린다. 뒤 창가의 딸 둘이 창밖을 내다보고 커튼이 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2203 });
  K.box(16, 0.1, 12, 0xd8d5cd, 0, -0.05, -2, scene); K.box(5, 0.03, 3.5, 0xa8a59e, 0, 0.02, -1.5, scene);
  // 창(오른쪽 뒤) + 커튼
  K.box(2.6, 3.0, 0.1, 0xfbfaf6, 3.2, 3.0, -6.8, scene); K.box(0.1, 3.0, 0.15, 0x45443f, 3.2, 3.0, -6.7, scene); K.box(2.6, 0.1, 0.15, 0x45443f, 3.2, 3.0, -6.7, scene);
  const curL = K.box(0.7, 3.4, 0.08, 0x77756f, 1.7, 3.0, -6.6, scene), curR = K.box(0.7, 3.4, 0.08, 0x77756f, 4.7, 3.0, -6.6, scene);
  // 벽난로 + 촛대 + 액자
  K.box(2.4, 2.2, 0.8, 0xbcb9b1, -3.6, 1.1, -6.5, scene); K.box(1.4, 1.2, 0.3, 0x2a2a28, -3.6, 0.7, -6.2, scene); K.box(2.8, 0.15, 1.0, 0x8a8782, -3.6, 2.25, -6.4, scene);
  const flames = []; [-4.3, -2.9].forEach(x => { K.cyl(0.06, 0.08, 0.5, 0xf2f0ea, x, 2.6, -6.3, scene, 8); const f = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), K.flat(0xffffff)); f.scale.y = 1.8; f.position.set(x, 2.95, -6.3); scene.add(f); flames.push(f); });
  K.box(1.6, 1.1, 0.06, 0x8a8782, -3.6, 3.6, -6.85, scene);
  // 안락의자 + 베넷 씨
  K.box(1.6, 1.0, 1.4, 0x55534e, 2.0, 0.5, -2.8, scene); K.box(1.6, 1.6, 0.3, 0x55534e, 2.0, 1.4, -3.5, scene);
  const Mr = K.person(scene, { x: 2.0, z: -1.4, rot: Math.PI - 0.3, coat: 0x2f2e2b, pants: 0x45443f, hair: 'short', hairC: 0x8a8782, scale: 0.9 }); 
  const paper = K.box(1.0, 0.7, 0.02, 0xfbfaf6, 0, 0, 0, scene); Mr.hold('R', paper, { at: [-0.3, -0.25, -0.15], rot: [0.2, 0, 0] });
  // 베넷 부인(서서 몸을 기울임)
  const Mrs = K.person(scene, { x: -0.7, z: -1.6, rot: -2.0, coat: 0xbcb9b1, pants: 0x8a8782, hair: 'bun', scale: 0.95 });
  const dress = K.inked(new THREE.Mesh(new THREE.ConeGeometry(1.0, 2.1, 20, 1, true), new THREE.MeshLambertMaterial({ color: 0xd8d5cd, side: THREE.DoubleSide })), 40); dress.position.y = 1.05; Mrs.root.add(dress);
  // 창가 딸 둘(뒷모습)
  const G1 = K.person(scene, { x: 2.6, z: -5.6, rot: 0, coat: 0x8a8782, pants: 0x6e6c66, hair: 'long', scale: 0.8 }), G2 = K.person(scene, { x: 3.8, z: -5.7, rot: 0, coat: 0x55534e, pants: 0x45443f, hair: 'bun', scale: 0.78 });
  cam.position.set(0.2, 2.9, 6.5); cam.lookAt(0.5, 1.8, -3.0);
  return (t, ph) => {
    const talk = Math.sin(ph * 4);
    Mrs.pose({ lean: -0.2 - 0.05 * talk, headYaw: -0.1, headPitch: 0.05 * talk, armR: { fwd: 1.0 + 0.4 * talk, out: 0.2, elbow: 0.8 }, armL: { fwd: 0.6 + 0.3 * Math.sin(ph * 4 + 1), out: 0.3, elbow: 1.0 } });
    const turn = K.win(ph, 0.3, 0.75, 0.12);
    Mr.pose({ headYaw: -0.9 * turn, headPitch: 0.1, armR: { fwd: 1.1, elbow: 0.9 }, armL: { fwd: 1.0, elbow: 1.0 } });
    G1.pose({ headYaw: 0.3 * Math.sin(ph * 2), armR: { fwd: 1.4 * K.win(ph, 0.5, 0.9, 0.1), point: true } }); G2.pose({ headYaw: -0.4 + 0.2 * Math.sin(ph * 2), headTilt: 0.15 });
    curL.position.x = 1.7 + 0.12 * Math.sin(ph * 2); curL.rotation.z = 0.05 * Math.sin(ph * 2); curR.position.x = 4.7 - 0.1 * Math.sin(ph * 2 + 1);
    flames.forEach((f, i) => f.scale.set(1 + 0.15 * Math.sin(ph * 6 + i), 1.8 + 0.4 * Math.sin(ph * 5 + i), 1));
  };
}
