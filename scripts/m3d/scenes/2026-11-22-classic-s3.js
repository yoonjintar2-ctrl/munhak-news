// 11/22 「발가락이 닮았다」 장면③(after 4): 진찰실. 진찰대 위 포대기에 싼 갓난아이, M(오른쪽)이 아이의 작은 발을 가리켜 보이고, 흰 가운의 '나'(왼쪽)가 몸을 숙여 들여다본다. 탁상 등 불빛이 일렁이고 창밖 나뭇가지가 흔들린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2214 });
  K.box(16, 0.1, 12, 0xd8d5cd, 0, -0.05, -2, scene);
  K.box(2.4, 3.6, 0.8, 0x8a8782, -4.6, 1.8, -6.2, scene); for (let c = 0; c < 4; c++) K.cyl(0.14, 0.14, 0.4, 0xf6f4ee, -5.4 + c * 0.55, 2.2, -5.75, scene, 10);
  K.box(2.2, 2.2, 0.05, 0xfbfaf6, 2.6, 3.4, -6.9, scene); const branch = new THREE.Group(); branch.position.set(3.6, 4.4, -7.0); scene.add(branch); K.box(1.6, 0.06, 0.06, 0x55534e, -0.8, 0, 0, branch); for (let i = 0; i < 4; i++) K.cyl(0.12, 0.12, 0.03, 0x6e6c66, -0.3 - i * 0.35, -0.12, 0, branch, 8);
  K.box(1.6, 0.12, 1.0, 0x6e6c66, -2.4, 1.4, -3.4, scene); K.box(0.12, 1.4, 0.12, 0x45443f, -3.0, 0.7, -3.4, scene); K.box(0.12, 1.4, 0.12, 0x45443f, -1.8, 0.7, -3.4, scene);
  K.cyl(0.04, 0.04, 0.7, 0x2a2a28, -2.8, 1.8, -3.4, scene, 6); const shade = K.cyl(0.18, 0.4, 0.35, 0x55534e, -2.8, 2.2, -3.4, scene, 14); const glow = new THREE.Mesh(new THREE.CircleGeometry(0.6, 20), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, depthWrite: false })); glow.rotation.x = -Math.PI / 2; glow.position.set(-2.6, 1.47, -3.3); scene.add(glow);
  const Dr = K.person(scene, { x: -1.6, z: -2.0, rot: -1.55, coat: 0xf2f0ea, pants: 0x55534e, hair: 'short', scale: 0.97 });
  const M = K.person(scene, { x: 1.6, z: -1.9, rot: 1.75, coat: 0x45443f, pants: 0x2f2e2b, hair: 'short', scale: 0.98 });
  const baby = new THREE.Group(); const wrap = K.inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.5, 4, 10), K.lam(0xd8d5cd)), 40); wrap.rotation.z = Math.PI / 2; baby.add(wrap); const bh = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 10), K.lam(0xe4ded6)); bh.position.set(-0.45, 0.05, 0); baby.add(bh);
  const foot = new THREE.Group(); foot.position.set(0.45, 0.05, 0); baby.add(foot); const ft = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.14, 3, 6), K.lam(0xe4ded6)); ft.rotation.z = Math.PI / 2; ft.position.x = 0.1; foot.add(ft);
  K.box(2.2, 1.3, 1.1, 0xbcb9b1, 0, 0.65, -2.4, scene); K.box(2.2, 0.12, 1.1, 0xf6f4ee, 0, 1.36, -2.4, scene); baby.position.set(0, 1.62, -2.3); baby.rotation.y = 0.2; scene.add(baby); baby.scale.setScalar(1.3);
  cam.position.set(0.3, 2.9, 5.0); cam.lookAt(0.0, 1.9, -1.8);
  return (t, ph) => {
    const show = K.win(ph, 0.15, 0.8, 0.15);
    M.pose({ headPitch: 0.35, headYaw: 0.2 * show, armL: { fwd: 0.3 }, armR: { fwd: 0.6 + 0.6 * show, out: 0.05, elbow: 0.3, point: true } });
    Dr.pose({ lean: -0.1 - 0.2 * show, headPitch: 0.3 + 0.2 * show, armL: { fwd: 0.4, elbow: 1.0 }, armR: { fwd: 0.3 + 0.4 * show, elbow: 1.2 } });
    foot.rotation.z = 0.4 * Math.sin(ph * 4); branch.rotation.z = 0.08 * Math.sin(ph * 2);
    glow.material.opacity = 0.3 + 0.06 * Math.sin(ph * 5);
  };
}
