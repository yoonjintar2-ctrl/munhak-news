// 11/27 「백치 아다다」 결말 장면(after ending): 새벽 바닷가 바위 위, 아다다(저고리+한복 치마, 머리 푼 긴 머리)가 두 팔을 벌려 종이돈을 바다로 흩뿌린다. 지폐가 바람에 날려 물결 위로 떨어짐·파도·갈매기. 폭력 장면 없음. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe6e4de, fog: [0xe2e0da, 30, 120] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'shore', seed: 2781 });
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(70, 40, 60, 30), K.lam(0x9a978f)); sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0.05, -8); scene.add(sea); const sp = sea.geometry.attributes.position, base = sp.array.slice();
  const rock = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(1.8, 1), K.lam(0x6e6c66)), 30); rock.scale.set(1.6, 0.6, 1.2); rock.position.set(-1.5, 0.5, 2); scene.add(rock);
  [[3.5, 3], [-5.5, 3.5], [5.5, 1]].forEach(([x, z], i) => { const r = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(0.7 + i * 0.2, 0), K.lam(0x8a8782)), 30); r.position.set(x, 0.3, z); scene.add(r); });
  const sun = new THREE.Mesh(new THREE.CircleGeometry(3, 32, 0, Math.PI), K.flat(0xfbfaf6)); sun.position.set(-8, 0.2, -60); scene.add(sun);
  const foam = []; for (let i = 0; i < 6; i++) { const f = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.15), K.flat(0xf6f5f1)); f.rotation.x = -Math.PI / 2; f.position.set(-6 + i * 2.6, 0.32, -0.4); scene.add(f); foam.push(f); }
  const A = K.person(scene, { x: -1.4, z: 2.0, rot: -0.6, coat: 0xf2f0ea, outfit: 'jeogori', skirt: 'chima', skirtC: 0x45443f, hair: 'long', eyes: 'closed', brows: 'worried', mouth: 'small', seed: 2782, scale: 0.95 });
  
  const bills = []; for (let i = 0; i < 14; i++) { const b = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.2), new THREE.MeshLambertMaterial({ color: 0xeeece6, side: THREE.DoubleSide })); scene.add(b); bills.push({ b, k: i / 14, s: i * 2.3 }); }
  const gulls = [K.bird(scene, { cx: 1, cy: 6.5, cz: -10, rx: 6, rz: 2, s: 0.9 }), K.bird(scene, { cx: -3, cy: 8, cz: -16, rx: 5, rz: 2, s: 0.7 })];
  cam.position.set(4.2, 3.4, 8.0); cam.lookAt(-1.2, 2.4, -1);
  return (t, ph) => {
    for (let i = 0; i < sp.count; i++) { const x = base[i * 3], y = base[i * 3 + 1]; sp.array[i * 3 + 2] = 0.2 * Math.sin(x * 0.4 + ph * 2) + 0.12 * Math.cos(y * 0.6 + ph * 2); } sp.needsUpdate = true; sea.geometry.computeVertexNormals();
    const k = 0.5 + 0.5 * Math.sin(ph * 2);
    A.pose({ bob: 1.0, headPitch: -0.15, armL: { fwd: 1.6 + 0.4 * k, out: 0.5, elbow: 0.2 }, armR: { fwd: 1.6 + 0.4 * k, out: 0.5, elbow: 0.2 } });
    bills.forEach(o => { const p = (ph / (Math.PI * 2) + o.k) % 1; o.b.position.set(-1.2 + Math.sin(o.s) * 1.2 + p * 2.5, 4.0 + p * 1.2 - p * p * 4.6, 1.0 - p * 4.5); o.b.rotation.set(p * 9 + o.s, p * 6, o.s); });
    foam.forEach((f, i) => { f.position.z = -0.4 + 0.5 * Math.sin(ph + i); });
    gulls[0].update(ph); gulls[1].update(ph, 2);
  };
}
