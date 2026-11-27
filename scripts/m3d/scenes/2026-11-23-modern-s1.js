// 11/23 『82년생 김지영』 장면①(after 0): 명절 시댁 거실, 상 앞에 앉은 여인이 몸을 곧게 세우고 말하자 맞은편 시부모와 남편이 놀라 돌아본다. 송편 접시·흔들리는 커튼·주전자 김. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe8e6e0, 30, 90] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.backdrop(scene, { kind: 'room', seed: 2332 });
  K.box(14, 0.1, 10, 0xd4d1c9, 0, -0.05, -2, scene);
  K.box(2.6, 2.0, 0.05, 0xfbfaf6, 3.0, 3.0, -6.9, scene); const cur = K.box(0.8, 2.4, 0.06, 0xbcb9b1, 4.6, 3.0, -6.7, scene);
  K.box(2.2, 1.2, 0.7, 0x55534e, -3.8, 0.6, -6.4, scene); K.box(1.6, 1.0, 0.1, 0x3a3936, -3.8, 1.8, -6.4, scene); // 장식장 + 텔레비전
  // 상 + 송편 접시 + 주전자
  K.box(3.6, 0.12, 1.8, 0x6e6c66, 0, 0.75, -2.8, scene); [[-1.6, -2.1], [1.6, -2.1], [-1.6, -3.5], [1.6, -3.5]].forEach(([x, z]) => K.box(0.12, 0.7, 0.12, 0x55534e, x, 0.38, z, scene));
  K.cyl(0.5, 0.45, 0.08, 0xf2f0ea, -0.4, 0.85, -2.8, scene, 20); for (let i = 0; i < 7; i++) { const s = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), K.lam(0xdcd9d1)), 20); s.scale.set(1.4, 0.8, 0.9); s.position.set(-0.6 + (i % 4) * 0.13, 0.95, -2.9 + Math.floor(i / 4) * 0.2); scene.add(s); }
  K.cyl(0.2, 0.25, 0.35, 0x8a8782, 0.8, 0.98, -2.9, scene, 14);
  const steam = []; for (let i = 0; i < 8; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false })); scene.add(s); steam.push({ s, k: i / 8 }); }
  const sit = (o, y = -1.0) => { const P = K.person(scene, o); const g = new THREE.Group(); g.position.y = y; scene.add(g); g.add(P.root); return P; };
  const W = sit({ x: -2.3, z: -2.8, rot: -1.57, coat: 0xa8a59e, pants: 0x55534e, hair: 'bob', scale: 0.95 });
  const Fa = sit({ x: -0.8, z: -4.3, rot: Math.PI, coat: 0x45443f, pants: 0x3a3936, hair: 'short', hairC: 0x55534e, scale: 1.0 });
  const Mo = sit({ x: 0.6, z: -4.3, rot: Math.PI, coat: 0x6e6c66, pants: 0x55534e, hair: 'bun', scale: 0.95 });
  const Hu = sit({ x: 2.3, z: -2.8, rot: 1.57, coat: 0x2f2e2b, pants: 0x3a3936, hair: 'short', scale: 1.0 });
  cam.position.set(0.6, 3.2, 3.2); cam.lookAt(0, 1.0, -3.0);
  return (t, ph) => {
    const u = ph / (Math.PI * 2), sp = K.win(ph, 0.15, 0.75, 0.12);
    W.pose({ headPitch: -0.1 * sp, lean: 0.1 * sp, armR: { fwd: 0.5 + 0.9 * sp, elbow: 0.8, out: 0.2 }, armL: { fwd: 0.6, elbow: 1.2 } });
    Fa.pose({ headPitch: 0.1, headYaw: 0.4 * sp, lean: -0.15 * sp, armL: { fwd: 0.7, elbow: 1.2 }, armR: { fwd: 0.7, elbow: 1.2 } });
    Mo.pose({ headYaw: 0.5 * sp, armL: { fwd: 1.2 * sp, elbow: 1.8 }, armR: { fwd: 0.7, elbow: 1.2 } });
    Hu.pose({ headYaw: 0.3 * sp, armR: { fwd: 0.8, elbow: 1.0 }, armL: { fwd: 0.8, elbow: 1.0 } });
    cur.rotation.y = 0.15 * Math.sin(ph * 2);
    steam.forEach(o => { const v = (o.k + u) % 1; o.s.position.set(0.95 + 0.05 * Math.sin(ph * 3 + o.k * 7), 1.2 + v * 0.8, -2.9); o.s.material.opacity = 0.5 * (1 - v); o.s.scale.setScalar(0.6 + v); });
  };
}
