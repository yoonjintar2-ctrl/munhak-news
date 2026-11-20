// 11/21 1분 고전 「허생전」 대표: 비 새는 초가 오막살이 방 안(앞이 트인 단면). 갓 쓴 선비(흰 도포)가 등잔 아래 책을 펼쳐 읽고, 오른쪽에서 바느질하던 아내(저고리·치마, 쪽머리)가 손을 멈추고 돌아보며 손짓한다. 처마 빗방울, 등잔불, 천장에서 떨어지는 빗물이 그릇에 똑똑. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xd8d6d0, fog: [0xd4d2cc, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfccc4', line: '#c4c1b9', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 241, night: true, near: false });
  // 방: 바닥(장판) + 뒷벽 + 옆벽 + 초가 지붕 + 기둥
  K.box(8, 0.4, 5, 0xc8c3b8, 0, 0.2, -3, scene); K.box(8, 4, 0.3, 0xe8e6e0, 0, 2.4, -5.4, scene); K.box(0.3, 4, 5, 0xdedbd3, -4, 2.4, -3, scene);
  K.box(1.4, 1.0, 0.06, 0xfbfaf6, 1.8, 2.8, -5.22, scene); for (let i = 0; i < 3; i++) K.line([[1.1, 2.4 + i * 0.35, -5.18], [2.5, 2.4 + i * 0.35, -5.18]], scene);
  const roof = K.inked(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 6.6, 2.0, 4, 1), K.lam(0x8a8782)), 40); roof.rotation.y = Math.PI / 4; roof.scale.set(1.0, 1, 0.65); roof.position.set(0, 5.4, -3); scene.add(roof);
  [-3.8, 3.8].forEach(x => K.cyl(0.14, 0.16, 4.2, 0x3a3936, x, 2.3, -0.7, scene, 8));
  // 서안 + 책 + 등잔
  K.box(1.6, 0.1, 0.8, 0x45443f, -1.2, 1.0, -3.0, scene); [[-1.9, -3.3], [-0.5, -3.3], [-1.9, -2.7], [-0.5, -2.7]].forEach(([x, z]) => K.box(0.08, 0.6, 0.08, 0x3a3936, x, 0.7, z, scene));
  K.box(0.7, 0.04, 0.5, 0xfbfaf6, -1.3, 1.08, -2.9, scene); K.box(0.6, 0.18, 0.45, 0x8a8782, -0.3, 1.14, -3.1, scene);
  K.cyl(0.05, 0.1, 0.5, 0x3a3936, -2.0, 1.3, -3.1, scene, 8);
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), K.flat(0xffffff)); flame.scale.y = 2; flame.position.set(-2.0, 1.66, -3.1); scene.add(flame);
  const glow = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, depthWrite: false })); glow.position.set(-2.0, 1.8, -5.2); scene.add(glow);
  // 선비
  const S = K.person(scene, { x: -1.2, z: -3.85, rot: Math.PI - 0.2, coat: 0xeeece6, pants: 0xd4d1c9, hair: 'short', scale: 0.85 }); S.root.position.y = -0.3;
  const gat = new THREE.Group(); gat.position.y = 0.62; S.headG.add(gat); K.cyl(0.75, 0.75, 0.03, 0x1c1c1a, 0, 0, 0, gat, 24); K.cyl(0.26, 0.3, 0.45, 0x1c1c1a, 0, 0.22, 0, gat, 16);
  const robe = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.9, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0xf2f0ea, side: THREE.DoubleSide })), 40); robe.position.y = 1.0; S.root.add(robe);
  // 아내(쪽머리, 진한 치마)
  const W = K.person(scene, { x: 1.7, z: -2.6, rot: 1.9, coat: 0xd8d5cd, pants: 0x55534e, hair: 'bun', scale: 0.8 }); W.root.position.y = -0.45;
  const ck = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.95, 1.6, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x55534e, side: THREE.DoubleSide })), 40); ck.position.y = 1.15; W.root.add(ck);
  K.box(0.8, 0.05, 0.6, 0xfbfaf6, 1.2, 0.45, -2.2, scene); // 바느질감
  // 빗물받이 그릇 + 떨어지는 물방울
  K.cyl(0.3, 0.22, 0.25, 0x55534e, 0.4, 0.52, -1.6, scene, 14); const drop = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), K.flat(0x55534e)); scene.add(drop);
  const rain = []; for (let i = 0; i < 22; i++) { const r = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.5, 0.02), K.flat(0x8a8782)); scene.add(r); rain.push({ r, x: -4 + (i * 0.37) % 8, z: -0.5 + ((i * 0.29) % 1) * 0.4, k: (i * 0.173) % 1 }); }
  cam.position.set(0.3, 2.6, 5.2); cam.lookAt(0.0, 1.5, -3.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), turn = K.win(ph, 0.25, 0.75, 0.15);
    S.pose({ headPitch: 0.45 - 0.35 * turn, headYaw: 0.6 * turn, armL: { fwd: 0.9, elbow: 1.2 }, armR: { fwd: 0.9, elbow: 1.2 } });
    W.pose({ headYaw: 0.3 * turn, lean: 0.1, armR: { fwd: 0.5 + 0.9 * turn, out: 0.1, elbow: 0.6 + 0.3 * Math.sin(ph * 6) * turn }, armL: { fwd: 0.6, elbow: 1.4 } });
    flame.scale.set(1 + 0.15 * Math.sin(ph * 7), 2 + 0.4 * Math.sin(ph * 5), 1); glow.material.opacity = 0.26 + 0.08 * Math.sin(ph * 5);
    rain.forEach(o => { const v = (o.k + u * 3) % 1; o.r.position.set(o.x, 4.2 - v * 3.8, o.z); });
    const dv = (u * 2) % 1; drop.position.set(0.4, 4.0 - dv * 3.4, -1.6);
  };
}
