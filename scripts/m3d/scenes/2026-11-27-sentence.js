// 11/27 오늘의 문장 김기림 「바다와 나비」: 바닷가 바위에 앉은 베레모·안경의 청년(긴 외투)이 손을 들어, 바다 위를 낮게 나는 흰 나비를 가리킨다. 물결 출렁·나비 날갯짓·갈매기. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe8e6e0, fog: [0xe4e2dc, 30, 120] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'shore', seed: 2711 });
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(60, 30, 60, 30), K.lam(0x8f8c86)); sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0.05, -9); scene.add(sea);
  const sp = sea.geometry.attributes.position, base = sp.array.slice();
  const sand = new THREE.Mesh(new THREE.PlaneGeometry(40, 8), K.lam(0xeeebe4)); sand.rotation.x = -Math.PI / 2; sand.position.set(0, 0.0, 4); scene.add(sand);
  const rock = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(1.3, 0), K.lam(0x8a8782)), 30); rock.scale.set(1.4, 0.7, 1); rock.position.set(-4.2, 0.5, 2.6); scene.add(rock);
  const r2 = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(0.8, 0), K.lam(0x9a978f)), 30); r2.position.set(3.6, 0.4, 3.0); scene.add(r2);
  // 말뚝·밧줄·작은 배
  [4.6, 5.8].forEach(x => K.cyl(0.12, 0.12, 1.6, 0x55534e, x, 0.8, 1.2, scene, 8)); K.line([[4.6, 1.3, 1.2], [5.2, 1.0, 1.2], [5.8, 1.3, 1.2]], scene);
  const boat = new THREE.Group(); boat.position.set(7, 0.2, -4); scene.add(boat); K.box(2.6, 0.5, 1, 0x55534e, 0, 0, 0, boat); K.cyl(0.05, 0.05, 2, 0x333333, 0, 1.2, 0, boat, 5);
  const P = K.person(scene, { x: -2.4, z: 2.6, rot: -0.9, coat: 0x55534e, pants: 0x2e2e2c, outfit: 'longcoat', hair: 'beret', glasses: true, eyes: 'wide', brows: 'up', mouth: 'open', seed: 2712, scale: 1.0 });
  
  // 흰 나비
  const fly = new THREE.Group(); fly.scale.setScalar(1.3); scene.add(fly);
  const wm = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const wing = sd => { const g = new THREE.Group(); const w = new THREE.Mesh(new THREE.CircleGeometry(0.32, 16), wm); w.scale.set(1, 1.3, 1); w.position.set(sd * 0.3, 0.08, 0); g.add(w); const w2 = new THREE.Mesh(new THREE.CircleGeometry(0.22, 14), wm); w2.position.set(sd * 0.22, -0.25, 0); g.add(w2); g.rotation.x = -Math.PI / 2; fly.add(g); return g; };
  const WL = wing(-1), WR = wing(1); const bd = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.4, 3, 6), K.lam(0x222222)); bd.rotation.x = Math.PI / 2; fly.add(bd);
  const gulls = [K.bird(scene, { cx: 2, cy: 7, cz: -14, rx: 6, rz: 2, s: 0.8 }), K.bird(scene, { cx: -4, cy: 8.5, cz: -18, rx: 5, rz: 2, s: 0.7 })];
  cam.position.set(3.5, 3.2, 9.0); cam.lookAt(-0.6, 2.0, -0.5);
  return (t, ph) => {
    for (let i = 0; i < sp.count; i++) { const x = base[i * 3], y = base[i * 3 + 1]; sp.array[i * 3 + 2] = 0.18 * Math.sin(x * 0.5 + ph * 2) + 0.12 * Math.cos(y * 0.7 + ph * 2); } sp.needsUpdate = true; sea.geometry.computeVertexNormals();
    fly.position.set(1.4 + 1.4 * Math.cos(ph), 2.8 + 0.35 * Math.sin(ph * 2), -0.6 + 0.9 * Math.sin(ph)); fly.rotation.y = -ph;
    const f = 0.9 * Math.sin(ph * 14); WL.rotation.y = f; WR.rotation.y = -f;
    P.pose({ bob: 0, headYaw: -0.2 + 0.25 * Math.sin(ph), headPitch: -0.1, armR: { fwd: 1.5 + 0.15 * Math.sin(ph), out: -0.2, elbow: 0.2, point: true }, armL: { fwd: 0.3, elbow: 1.2 } });
    gulls[0].update(ph); gulls[1].update(ph, 2);
  };
}
