// 11/23 소설 구절 「오발탄」: 1950년대 서울 밤거리, 낡은 외투의 사내가 가로등 아래 한 손으로 턱을 감싸 쥐고 서 있다. 가로등이 깜박이고 종잇조각이 굴러가며, 뒤 길로 택시가 +x(오른쪽)로 지나간다(택시 앞=+x, 전조등이 +x 쪽). 카메라 고정
export const secs = 3;
export const opts = { bg: 0xdcdad4, fog: [0xd8d6d0, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d0cdc5', line: '#c4c1b9', tiles: 4, repeat: 5 });
  K.backdrop(scene, { kind: 'town', seed: 2313, near: false });
  // 판잣집 벽들
  [-6, -3.2, 3.5, 6.2].forEach((x, i) => { K.box(2.6, 3 + i % 2, 0.3, [0x9a978f, 0xbcb9b1][i % 2], x, 1.6, -7, scene); K.box(2.8, 0.15, 1.2, 0x45443f, x, 3.2 + i % 2, -6.6, scene); });
  K.box(30, 0.04, 2.2, 0xbcb9b1, 0, 0.02, -4.5, scene); // 찻길
  // 가로등
  K.cyl(0.08, 0.1, 5, 0x3a3936, -1.3, 2.5, -1.8, scene, 8); K.box(1.2, 0.1, 0.1, 0x3a3936, -0.8, 4.95, -1.8, scene);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), K.flat(0xffffff)); bulb.position.set(-0.3, 4.75, -1.8); scene.add(bulb);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(1.6, 4.6, 24, 1, true), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, depthWrite: false, side: THREE.DoubleSide })); cone.position.set(-0.3, 2.4, -1.8); scene.add(cone);
  const M = K.person(scene, { x: 0.2, z: -1.4, rot: Math.PI * 0.9, coat: 0x45443f, pants: 0x2f2e2b, hair: 'short', scale: 1.0, scarf: 0xd8d5cd });
  // 택시: 몸통·지붕·전조등(+x 쪽)
  const taxi = new THREE.Group(); scene.add(taxi); K.box(3.0, 0.8, 1.4, 0x55534e, 0, 0.6, 0, taxi); K.box(1.5, 0.6, 1.3, 0x6e6c66, -0.3, 1.3, 0, taxi); K.box(0.06, 0.25, 0.3, 0xffffff, 1.52, 0.7, 0.4, taxi); K.box(0.06, 0.25, 0.3, 0xffffff, 1.52, 0.7, -0.4, taxi);
  [-1, 1].forEach(sx => [-0.7, 0.7].forEach(sz => K.cyl(0.3, 0.3, 0.2, 0x1e1e1e, sx, 0.3, sz, taxi, 12).rotation.x = Math.PI / 2));
  const papers = []; for (let i = 0; i < 6; i++) { const p = K.box(0.25, 0.02, 0.2, 0xfbfaf6, 0, 0, 0, scene); papers.push({ p, k: i / 6 }); }
  cam.position.set(0.8, 2.4, 5.4); cam.lookAt(-0.2, 1.8, -2.5);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    M.pose({ headPitch: 0.3, headTilt: 0.25, lean: -0.05, armR: { fwd: 1.0, elbow: 2.3, out: -0.15 }, armL: { fwd: 0.2 + 0.1 * Math.sin(ph), elbow: 0.3 } });
    const f = Math.sin(ph * 9) > 0.7 ? 0.08 : 0.2; cone.material.opacity = f; bulb.scale.setScalar(f > 0.1 ? 1 : 0.7);
    taxi.position.set(-12 + u * 24, 0, -4.5);
    papers.forEach(o => { const v = (o.k + u) % 1; o.p.position.set(-4 + v * 8, 0.05 + 0.15 * Math.abs(Math.sin(ph * 4 + o.k * 9)), -0.5 + o.k); o.p.rotation.y = ph * 2 + o.k * 5; });
  };
}
