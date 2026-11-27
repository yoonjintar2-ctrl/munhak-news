// 11/21 「허생전」 장면③(after 6): 허생의 오막살이 방. 왼쪽 허생(흰 옷·갓)이 손가락 세 개를 펴 보이며 몸을 내밀고, 오른쪽 군복 차림 이완(전립 모자, 진한 옷)이 팔짱을 낀 채 고개를 젓는다. 가운데 소반 위 찻잔, 창호문 밖 대나무가 흔들리고 등잔불이 일렁인다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 271 });
  K.box(9, 0.4, 6, 0xd8d5cd, 0, 0.2, -3, scene); K.box(9, 4.6, 0.3, 0xe8e6e0, 0, 2.5, -6, scene);
  // 창호문 + 대나무 그림자
  K.box(2.4, 2.4, 0.06, 0xfbfaf6, 2.2, 2.6, -5.8, scene); for (let i = 0; i < 4; i++) K.line([[1.0, 1.6 + i * 0.6, -5.75], [3.4, 1.6 + i * 0.6, -5.75]], scene); K.line([[2.2, 1.4, -5.75], [2.2, 3.8, -5.75]], scene);
  const bam = []; for (let i = 0; i < 3; i++) { const g = new THREE.Group(); g.position.set(1.5 + i * 0.6, 1.4, -5.9); scene.add(g); K.cyl(0.05, 0.05, 2.6, 0x8a8782, 0, 1.3, 0, g, 5); bam.push(g); }
  // 소반 + 찻잔 + 등잔
  K.cyl(0.8, 0.8, 0.1, 0x55534e, 0, 0.9, -2.6, scene, 20); K.cyl(0.1, 0.12, 0.5, 0x3a3936, 0, 0.6, -2.6, scene, 8);
  [-0.3, 0.3].forEach(x => K.cyl(0.12, 0.09, 0.15, 0xf2f0ea, x, 1.03, -2.6, scene, 10));
  K.cyl(0.05, 0.1, 0.5, 0x3a3936, -3.0, 0.65, -4.5, scene, 8); const flame = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), K.flat(0xffffff)); flame.scale.y = 2; flame.position.set(-3.0, 1.0, -4.5); scene.add(flame);
  const H = K.person(scene, { x: -1.6, z: -2.6, rot: -1.75, coat: 0xeeece6, pants: 0xd4d1c9, hair: 'short', scale: 0.9 }); H.root.position.y = -0.45;
  const gat = new THREE.Group(); gat.position.y = 0.62; H.headG.add(gat); K.cyl(0.75, 0.75, 0.03, 0x1c1c1a, 0, 0, 0, gat, 24); K.cyl(0.26, 0.3, 0.45, 0x1c1c1a, 0, 0.22, 0, gat, 16);
  const robe = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.7, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0xf2f0ea, side: THREE.DoubleSide })), 40); robe.position.y = 1.1; H.root.add(robe);
  const L = K.person(scene, { x: 1.6, z: -2.6, rot: 1.75, coat: 0x3a3936, pants: 0x2a2a28, hair: 'short', scale: 0.95 }); L.root.position.y = -0.45;
  const hat = new THREE.Group(); hat.position.y = 0.6; L.headG.add(hat); K.cyl(0.62, 0.62, 0.04, 0x1c1c1a, 0, 0, 0, hat, 20); K.cyl(0.3, 0.36, 0.35, 0x1c1c1a, 0, 0.18, 0, hat, 14);
  const robe2 = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.95, 1.7, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x3a3936, side: THREE.DoubleSide })), 40); robe2.position.y = 1.1; L.root.add(robe2);
  cam.position.set(0.0, 2.6, 5.0); cam.lookAt(0.0, 1.6, -2.6);
  return (t, ph) => {
    const say = K.win(ph, 0.05, 0.55, 0.1), no = K.win(ph, 0.5, 0.95, 0.08);
    H.pose({ lean: -0.15 * say, armR: { fwd: 0.6 + 0.9 * say, out: -0.2, elbow: 0.5, point: true }, armL: { fwd: 0.6, elbow: 1.4 }, headPitch: -0.05 });
    L.pose({ headYaw: 0.35 * Math.sin(ph * 6) * no, headPitch: 0.1, armL: { fwd: 0.9, out: -0.5, elbow: 1.9 }, armR: { fwd: 0.9, out: -0.5, elbow: 1.9 } });
    bam.forEach((g, i) => { g.rotation.z = 0.1 * Math.sin(ph * 2 + i); });
    flame.scale.set(1 + 0.15 * Math.sin(ph * 7), 2 + 0.4 * Math.sin(ph * 5), 1);
  };
}
