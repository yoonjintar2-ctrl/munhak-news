// 11/29 『삼미 슈퍼스타즈의 마지막 팬클럽』 장면①(after 1): 1980년대 중학교 교실 창가. 야구 모자를 책상에 둔 소년(목폴라 스웨터)이 고개를 숙이고, 앞자리 아이들이 돌아보며 손가락질하고 웃는다. 커튼 흔들림·칠판 앞 분필 가루. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d2cec4', line: '#c6c2b8', tiles: 10, repeat: 4 });
  K.box(40, 12, 0.4, 0xe9e7e1, 0, 6, -8, scene); K.box(0.4, 12, 20, 0xe2e0da, 8, 6, 0, scene);
  // 칠판 + 분필받이 + 시간표 액자 + 시계
  K.box(9, 3.2, 0.15, 0x45443f, -1, 4.2, -7.75, scene); K.box(9.2, 0.15, 0.4, 0x6e6c66, -1, 2.55, -7.6, scene);
  K.line([[-4.5, 4.8, -7.65], [-2, 4.6, -7.65]], scene); K.line([[-4.5, 4.2, -7.65], [-1, 4.2, -7.65]], scene);
  K.box(1.4, 1.8, 0.1, 0xfbfaf6, 5.2, 4.6, -7.75, scene); K.cyl(0.5, 0.5, 0.1, 0xfbfaf6, -1, 7.0, -7.7, scene, 20).rotation.x = Math.PI / 2;
  // 창(오른쪽 벽) + 커튼
  K.box(0.1, 3.6, 4.6, 0xfbfaf6, 7.75, 4.4, -1.5, scene); K.box(0.2, 0.2, 4.8, 0x55534e, 7.7, 6.3, -1.5, scene);
  const curt = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 4.0, 3, 8), new THREE.MeshLambertMaterial({ color: 0xc8c4bb, side: THREE.DoubleSide })); curt.rotation.y = -Math.PI / 2; curt.position.set(7.55, 4.3, 1.2); scene.add(curt); const cb = curt.geometry.attributes.position.array.slice();
  // 책상 줄
  const desk = (x, z) => { K.box(1.6, 0.1, 1.0, 0x8a8782, x, 1.5, z, scene); [[-0.7, -0.4], [0.7, -0.4], [-0.7, 0.4], [0.7, 0.4]].forEach(([dx, dz]) => K.box(0.08, 1.5, 0.08, 0x2a2a28, x + dx, 0.75, z + dz, scene)); };
  [[-3.4, -4.4], [0, -4.4], [3.4, -4.4], [-3.4, -1.8], [3.4, -1.8], [0, -1.8]].forEach(([x, z]) => desk(x, z));
  desk(3.4, 0.8); const cap = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), K.lam(0x2a2a28)), 30); cap.position.set(3.0, 1.56, 0.8); scene.add(cap); K.box(0.4, 0.04, 0.3, 0x2a2a28, 3.0, 1.57, 1.1, scene);
  // 소년(뒷줄 창가, 고개 숙임)
  const B = K.person(scene, { x: 3.6, z: 1.6, rot: Math.PI - 0.4, coat: 0x45443f, outfit: 'sweater', hair: 'short', eyes: 'closed', brows: 'worried', mouth: 'frown', seed: 11330, scale: 0.78 });
  // 앞자리 아이들 — 돌아보며(얼굴이 카메라 쪽) 놀림
  const kids = []; [[0, -1.2, 'bob', 'pleat', 0x8a8782], [-3.4, -1.2, 'curly', null, 0x55534e], [0.4, -3.8, 'ponytail', 'a', 0x6e6c66]].forEach(([x, z, hair, skirt, c], i) => {
    const p = K.person(scene, { x, z, rot: Math.PI - 0.6 + i * 0.2, coat: c, outfit: i === 1 ? 'vest' : 'sweater', sleeve: 0xeeece6, skirt, skirtC: 0x3a3936, hair, eyes: ['smile', 'narrow', 'wide'][i], brows: 'up', mouth: ['open', 'smile', 'open'][i], seed: 11331 + i, scale: 0.76 }); kids.push({ p, k: i }); });
  const dust = []; for (let i = 0; i < 6; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.04, 5, 4), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })); scene.add(d); dust.push({ d, k: i / 6 }); }
  cam.position.set(-3.0, 4.4, 8.0); cam.lookAt(1.2, 2.2, -1.6);
  return (t, ph) => {
    const s = Math.sin(ph * 3);
    B.pose({ headPitch: 0.5, lean: 0.15, armL: { fwd: 0.9, elbow: 1.4, out: -0.2 }, armR: { fwd: 0.9, elbow: 1.4, out: -0.2 } });
    kids.forEach(o => o.p.pose({ torsoYaw: 0.2 * Math.sin(ph * 2 + o.k), headTilt: 0.12 * s, armR: o.k !== 1 ? { fwd: 1.4, out: 0.1, elbow: 0.2, point: true } : { fwd: 1.0, elbow: 1.6 }, armL: { fwd: 0.8 + 0.3 * s, elbow: 1.6 } }));
    for (let i = 0; i < cb.length / 3; i++) { const y = cb[i * 3 + 1]; curt.geometry.attributes.position.array[i * 3 + 2] = 0.12 * (2 - y) / 4 * Math.sin(ph * 2 + cb[i * 3] * 2); } curt.geometry.attributes.position.needsUpdate = true;
    dust.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.d.position.set(-3 + o.k * 3, 2.6 - p * 1.6, -7.3); o.d.material.opacity = 0.8 * (1 - p); });
  };
}
