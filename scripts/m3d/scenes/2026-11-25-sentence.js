// 11/25 오늘의 문장 김수영 「풀」: 흐린 날 언덕 풀밭이 바람에 한쪽(+x)으로 물결치듯 눕다가 일어나고, 목도리 두른 사람이 멈춰 서서 풀을 내려다본다. 먹구름이 흐르고 빗줄기가 비껴 내린다. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xe2e0da, fog: [0xdedcd6, 30, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d4d1c9', line: '#cdcac2', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2511, near: false });
  // 풀: 밑동을 축으로 눕는 가는 잎들
  const blades = []; let s = 7;
  const R = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = 0; i < 300; i++) {
    const h = 0.6 + R() * 0.9, g = new THREE.ConeGeometry(0.09, h, 4); g.translate(0, h / 2, 0);
    const m = new THREE.Mesh(g, K.lam([0x8a8782, 0x9a978f, 0x7e7b75, 0xa8a59d][i % 4]));
    const x = -8 + R() * 14, z = -4 + R() * 8.5; m.position.set(x, 0, z); R(); scene.add(m); blades.push({ m, x, k: R() });
  }
  // 낮은 돌·말뚝 울타리·전봇대(배경 소품)
  K.box(0.9, 0.5, 0.7, 0x8a8782, -4.2, 0.25, -1.0, scene).rotation.y = 0.4;
  for (let i = 0; i < 6; i++) { K.cyl(0.07, 0.07, 1.1, 0x55534e, -5.5 + i * 1.6, 0.55, -6.5, scene, 6); if (i) K.box(1.6, 0.06, 0.06, 0x55534e, -6.3 + i * 1.6, 0.9, -6.5, scene); }
  K.cyl(0.1, 0.12, 6.5, 0x45443f, 4.6, 3.25, -8, scene, 8); K.box(1.6, 0.1, 0.1, 0x45443f, 4.6, 6.2, -8, scene);
  // 사람 + 우산(손에 붙임)
  const P = K.person(scene, { x: 2.4, z: -2.2, rot: 2.6, coat: 0x45443f, pants: 0x2f2e2b, hair: 'short', scale: 1.0, scarf: 0xd8d5cd });
  // 먹구름
  const clouds = []; for (let i = 0; i < 4; i++) { const c = new THREE.Group(); for (let j = 0; j < 4; j++) { const p = K.inked(new THREE.Mesh(new THREE.SphereGeometry(1.6, 12, 8), K.lam(0x9a978f)), 80); p.scale.y = 0.5; p.position.set(j * 1.9 - 2.8, (j % 2) * 0.4, 0); c.add(p); } c.position.set(-12 + i * 8, 9.5 + (i % 2), -20); scene.add(c); clouds.push(c); }
  // 빗방울 몇 줄
  const rain = []; for (let i = 0; i < 26; i++) { const r = K.box(0.015, 0.35, 0.015, 0xa8a59d, 0, 0, 0, scene); rain.push({ r, x: -6 + (i * 0.37) % 12, z: -5 + (i * 0.53) % 6, k: (i * 0.137) % 1 }); }
  cam.position.set(-0.4, 2.9, 8.6); cam.lookAt(0.6, 1.5, -1.8);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    blades.forEach(b => { const w = 0.5 + 0.45 * Math.sin(ph - b.x * 0.55 + b.k * 0.6); b.m.rotation.z = -w * 1.15; });
    P.pose({ headPitch: -0.45, headYaw: -0.2, lean: 0.08, armR: { fwd: 0.5 + 0.15 * Math.sin(ph), elbow: 0.6, out: 0.1 }, armL: { fwd: 0.2, elbow: 0.3 } });
        clouds.forEach((c, i) => { c.position.x = -12 + i * 8 + 1.2 * Math.sin(ph + i); });
    rain.forEach(o => { const v = (o.k + u * 3) % 1; o.r.position.set(o.x + v * 0.8, 6 - v * 6, o.z); o.r.rotation.z = -0.15; });
  };
}
