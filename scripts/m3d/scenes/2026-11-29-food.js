// 11/29 문학 한술 체호프 「구스베리」: 19세기 러시아 시골 영지 베란다. 탁자 위 접시에 줄무늬 구스베리가 소복하고, 사모바르·유리 찻잔(김)·잼 단지. 창밖 정원 덤불이 흔들리고 열매 한 알이 굴러간다. 사람 없음. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d2cec4', line: '#cac6bc', tiles: 6, repeat: 3 });
  K.backdrop(scene, { kind: 'country', seed: 1898, near: false });
  // 베란다 기둥·난간·처마
  [-4.5, 0, 4.5].forEach(x => K.box(0.3, 6, 0.3, 0xeeece6, x, 3, -3.6, scene)); K.box(10, 0.4, 0.5, 0xeeece6, 0, 6, -3.6, scene);
  K.box(10, 0.15, 0.15, 0xb0aca4, 0, 1.4, -3.6, scene); for (let i = 0; i < 16; i++) K.box(0.08, 1.3, 0.08, 0xb0aca4, -4.4 + i * 0.6, 0.7, -3.6, scene);
  // 정원 덤불(흔들림)
  const bush = []; for (let i = 0; i < 6; i++) { const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.0 + (i % 2) * 0.3, 12, 8), K.lam(0x6e6c66)), 60); b.scale.y = 0.7; b.position.set(-6 + i * 2.4, 0.8, -7 - (i % 2)); scene.add(b); bush.push({ b, k: i }); }
  // 탁자 + 식탁보
  K.box(5.2, 0.2, 2.8, 0xfbfaf6, 0, 2.0, 0, scene); K.box(5.3, 0.6, 2.9, 0xeeece6, 0, 1.65, 0, scene); [[-2.4, -1.2], [2.4, -1.2], [-2.4, 1.2], [2.4, 1.2]].forEach(([x, z]) => K.box(0.2, 1.4, 0.2, 0x3a3936, x, 0.7, z, scene));
  // 접시 + 구스베리 더미(줄무늬: 진한 선 링)
  K.cyl(1.1, 0.9, 0.12, 0xfbfaf6, -0.6, 2.17, 0.2, scene, 28);
  const berry = (x, y, z) => { const g = new THREE.Group(); g.position.set(x, y, z); scene.add(g); const m = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 10), K.lam(0xb0aca4)), 40); m.scale.y = 1.15; g.add(m);
    for (let j = 0; j < 3; j++) { const r = new THREE.Mesh(new THREE.TorusGeometry(0.172, 0.008, 4, 16), K.lam(0x55534e)); r.rotation.y = j * Math.PI / 3; r.scale.y = 1.15; g.add(r); } K.cyl(0.01, 0.01, 0.08, 0x2a2a28, 0, 0.22, 0, g, 4); return g; };
  const pts = []; for (let i = 0; i < 9; i++) pts.push([Math.cos(i * 0.7) * 0.6, 0, Math.sin(i * 0.7) * 0.5]); for (let i = 0; i < 5; i++) pts.push([Math.cos(i * 1.3) * 0.3, 0.25, Math.sin(i * 1.3) * 0.25]); pts.push([0, 0.48, 0]);
  pts.forEach(([x, y, z]) => berry(-0.6 + x, 2.42 + y, 0.2 + z));
  const roll = berry(0.9, 2.27, 0.9);
  // 사모바르
  const sm = new THREE.Group(); sm.position.set(1.6, 2.1, -0.5); scene.add(sm); const body = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 12), K.lam(0x8a8782)), 40); body.scale.y = 1.3; body.position.y = 0.9; sm.add(body);
  K.cyl(0.35, 0.45, 0.3, 0x6e6c66, 0, 0.15, 0, sm, 14); K.cyl(0.12, 0.12, 0.5, 0x6e6c66, 0, 1.85, 0, sm, 10); K.cyl(0.18, 0.12, 0.2, 0x55534e, 0, 2.2, 0, sm, 10); const tap = K.cyl(0.04, 0.04, 0.4, 0x3a3936, -0.6, 0.6, 0, sm, 6); tap.rotation.z = Math.PI / 2;
  [-1, 1].forEach(sx => { const h = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.04, 6, 10, Math.PI), K.lam(0x3a3936)); h.position.set(sx * 0.62, 1.3, 0); h.rotation.z = sx * Math.PI / 2; sm.add(h); });
  // 유리 찻잔(받침+손잡이 홀더) + 잼 단지 + 숟가락
  K.cyl(0.2, 0.17, 0.4, 0x6e6c66, 0.5, 2.3, 0.6, scene, 12); K.cyl(0.3, 0.32, 0.03, 0xfbfaf6, 0.5, 2.11, 0.6, scene, 14);
  K.cyl(0.3, 0.3, 0.5, 0xc8c4bb, -2.0, 2.35, -0.5, scene, 14); K.cyl(0.32, 0.32, 0.08, 0x45443f, -2.0, 2.64, -0.5, scene, 14);
  const spoon = K.box(0.06, 0.02, 0.8, 0x55534e, -1.4, 2.12, 0.9, scene); spoon.rotation.y = 0.4;
  const steam = []; for (let i = 0; i < 4; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })); scene.add(s); steam.push({ s, k: i / 4 }); }
  const steam2 = []; for (let i = 0; i < 3; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })); scene.add(s); steam2.push({ s, k: i / 3 }); }
  cam.position.set(0, 4.2, 5.4); cam.lookAt(0, 2.3, -0.3);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    steam.forEach(o => { const p = (u + o.k) % 1; o.s.position.set(0.5 + 0.06 * Math.sin(p * 9), 2.6 + p * 1.0, 0.6); o.s.scale.setScalar(0.6 + p * 1.5); o.s.material.opacity = 0.7 * (1 - p); });
    steam2.forEach(o => { const p = (u + o.k) % 1; o.s.position.set(1.6 + 0.1 * Math.sin(p * 7), 4.5 + p * 1.2, -0.5); o.s.scale.setScalar(0.7 + p * 1.6); o.s.material.opacity = 0.6 * (1 - p); });
    const w = Math.sin(ph); roll.position.x = 0.9 + 0.25 * w; roll.rotation.z = -w * 1.5;
    bush.forEach(o => { o.b.rotation.z = 0.05 * Math.sin(ph * 2 + o.k); o.b.position.y = 0.8 + 0.03 * Math.sin(ph * 2 + o.k); });
  };
}
