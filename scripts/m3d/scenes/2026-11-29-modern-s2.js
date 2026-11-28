// 11/29 『삼미 슈퍼스타즈의 마지막 팬클럽』 장면②(after 3): 1990년대 말 늦은 밤 사무실(벽·바닥은 밝게, 창밖만 어둡게). 양복 차림 사내가 서류 더미 책상 앞에서 종이 한 장을 들고 굳은 얼굴로 선다. 형광등 깜박임·벽시계 추 흔들림·모니터 화면 줄. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe2e0da, fog: [0xdedcd6, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#cfcbc1', line: '#c5c1b7', tiles: 10, repeat: 4 });
  K.box(40, 12, 0.4, 0xe6e4de, 0, 6, -7, scene);
  // 창밖 밤 빌딩
  const nt = K.canvasTex(256, 128, (c, w, h) => { c.fillStyle = '#4a4946'; c.fillRect(0, 0, w, h); for (let i = 0; i < 6; i++) { c.fillStyle = '#5e5d59'; c.fillRect(i * 44, 40 - (i % 3) * 14, 36, h); c.fillStyle = '#cfcbc3'; for (let j = 0; j < 5; j++) if ((i + j) % 3) c.fillRect(i * 44 + 6 + (j % 2) * 14, 50 - (i % 3) * 14 + j * 14, 8, 6); } });
  const win = new THREE.Mesh(new THREE.PlaneGeometry(8, 3.6), new THREE.MeshBasicMaterial({ map: nt })); win.position.set(-2, 5.2, -6.75); scene.add(win);
  [[-2, 7.05, 8.3, 0.2], [-2, 3.35, 8.3, 0.2]].forEach(([x, y, w, h]) => K.box(w, h, 0.25, 0x55534e, x, y, -6.7, scene)); [-6.1, -2, 2.1].forEach(x => K.box(0.2, 3.9, 0.25, 0x55534e, x, 5.2, -6.7, scene));
  // 벽시계(추)
  K.box(1.0, 2.2, 0.3, 0x45443f, 5.0, 5.4, -6.7, scene); K.cyl(0.38, 0.38, 0.08, 0xfbfaf6, 5.0, 6.0, -6.5, scene, 18).rotation.x = Math.PI / 2;
  const pend = new THREE.Group(); pend.position.set(5.0, 5.4, -6.48); scene.add(pend); K.box(0.04, 0.8, 0.04, 0x2a2a28, 0, -0.4, 0, pend); K.cyl(0.14, 0.14, 0.05, 0xb0aca4, 0, -0.85, 0, pend, 12).rotation.x = Math.PI / 2;
  // 형광등
  const tube = new THREE.Mesh(new THREE.BoxGeometry(4, 0.15, 0.3), new THREE.MeshBasicMaterial({ color: 0xffffff })); tube.position.set(0, 9.0, -2); scene.add(tube); K.box(4.4, 0.1, 0.6, 0x55534e, 0, 9.15, -2, scene);
  // 책상 + 서류 더미 + 모니터 + 화분 + 의자
  K.box(5, 0.15, 2.2, 0x8a8782, 0.6, 1.9, -3.2, scene); K.box(5, 1.9, 0.1, 0x6e6c66, 0.6, 0.95, -4.25, scene); K.box(0.12, 1.9, 2.2, 0x6e6c66, -1.85, 0.95, -3.2, scene); K.box(0.12, 1.9, 2.2, 0x6e6c66, 3.05, 0.95, -3.2, scene);
  [[-1.2, 5], [-0.6, 3], [2.2, 7]].forEach(([x, n]) => { for (let i = 0; i < n; i++) K.box(0.9, 0.08, 0.7, i % 2 ? 0xfbfaf6 : 0xeeece6, x + (i % 2) * 0.05, 2.02 + i * 0.09, -3.4, scene); });
  K.box(1.4, 1.1, 1.0, 0xc8c4bb, 1.1, 2.6, -3.7, scene); const scr = K.box(1.1, 0.8, 0.05, 0x45443f, 1.1, 2.65, -3.18, scene);
  const scan = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.06), new THREE.MeshBasicMaterial({ color: 0xb0aca4 })); scan.position.set(1.1, 2.65, -3.14); scene.add(scan);
  K.cyl(0.25, 0.2, 0.4, 0x55534e, 2.7, 2.15, -3.0, scene, 10); const plant = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.4, 10, 8), K.lam(0x6e6c66)), 40); plant.position.set(2.7, 2.7, -3.0); scene.add(plant);
  K.box(1.2, 0.15, 1.2, 0x3a3936, -0.4, 1.3, -1.2, scene); K.box(1.2, 1.4, 0.15, 0x3a3936, -0.4, 2.1, -0.65, scene);
  // 사내: 양복+넥타이, 안경, 종이 한 장(손에)
  const M = K.person(scene, { x: -2.6, z: -1.6, rot: -Math.PI / 2 - 0.55, coat: 0x3a3936, outfit: 'suit', hair: 'short', glasses: true, eyes: 'wide', brows: 'worried', mouth: 'line', seed: 11340 });
  const paper = K.box(0.7, 0.95, 0.02, 0xfbfaf6, 0, -0.45, 0, new THREE.Group()); M.hold('R', paper.parent, { at: [0, -0.1, 0.05], rot: [-1.2, 0, 0] });
  cam.position.set(-0.5, 4.0, 7.2); cam.lookAt(-0.8, 2.6, -2.6);
  return (t, ph) => {
    M.pose({ headPitch: 0.25, headYaw: -0.15, armR: { fwd: 1.2, elbow: 0.9, out: -0.1 }, armL: { fwd: 0.15, elbow: 0.2 }, bob: 0.01 * Math.sin(ph) });
    pend.rotation.z = 0.3 * Math.sin(ph * 2);
    const flick = (K.win(ph, 0.3, 0.34, 0.01) + K.win(ph, 0.62, 0.65, 0.01)) > 0.5; tube.material.color.setHex(flick ? 0x8a8782 : 0xffffff);
    scan.position.y = 2.3 + ((ph / (Math.PI * 2) * 2) % 1) * 0.7;
  };
}
