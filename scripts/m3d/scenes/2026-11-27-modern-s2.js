// 11/27 『마당을 나온 암탉』 장면②(after 2): 밤 들찔레 덤불 속 둥지에서 암탉이 알을 품고, 덤불 밖 청둥오리(진한 머리) 한 마리가 목을 길게 빼고 망을 본다. 풀 흔들림·반딧불처럼 깜박이는 달빛·구름. 밤이지만 밝은 회색. 카메라 고정
export const secs = 3;
export const opts = { bg: 0xcfcdc7, fog: [0xcbc9c3, 25, 100] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#bdb9b1', line: '#b5b1a9', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'country', seed: 2811, near: false, night: true });
  // 암탉·오리 만들기(장면 안 전용)
  const fowl = (x, z, rot, { s = 1, c = 0x8a8782, kind = 'hen', head = null } = {}) => {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot; g.scale.setScalar(s); scene.add(g);
    const b = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 12), K.lam(c)), 50); b.scale.set(1.35, kind === 'duck' ? 0.8 : 1, 0.95); b.position.y = kind === 'duck' ? 0.55 : 0.75; g.add(b);
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.55, 6), K.lam(c)); tail.position.set(0.7, kind === 'duck' ? 0.75 : 1.05, 0); tail.rotation.z = kind === 'duck' ? -1.2 : -0.6; g.add(tail);
    const wings = [-1, 1].map(sd => { const p = new THREE.Group(); p.position.set(0, b.position.y + 0.15, sd * 0.42); g.add(p); const w = K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 8), K.lam(c)), 50); w.scale.set(1.2, 0.5, 0.18); w.position.set(0.1, -0.1, 0); p.add(w); return p; });
    const nk = new THREE.Group(); nk.position.set(-0.55, b.position.y + 0.2, 0); g.add(nk);
    const n = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.35, 4, 8), K.lam(head ?? c)); n.position.y = 0.2; nk.add(n);
    const hd = new THREE.Group(); hd.position.y = 0.5; nk.add(hd);
    hd.add(K.inked(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), K.lam(head ?? c)), 50));
    const bk = new THREE.Mesh(kind === 'duck' ? new THREE.BoxGeometry(0.28, 0.06, 0.16) : new THREE.ConeGeometry(0.06, 0.18, 6), K.lam(0x3a3936)); if (kind !== 'duck') bk.rotation.z = Math.PI / 2; bk.position.x = -0.26; hd.add(bk);
    if (kind === 'hen') { const cb = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.16, 0.18), K.lam(0x2a2a28)); cb.position.y = 0.2; hd.add(cb); }
    [-1, 1].forEach(sd => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), K.flat(0x111111)); e.position.set(-0.12, 0.05, sd * 0.17); hd.add(e); });
    [-0.15, 0.15].forEach(zz => K.line([[0, 0.3, zz], [0, 0, zz], [-0.15, 0, zz]], g));
    return { g, nk, hd, wings };
  };

  const moon = new THREE.Mesh(new THREE.CircleGeometry(1.6, 28), K.flat(0xfbfaf6)); moon.position.set(-8, 12, -50); scene.add(moon);
  // 덤불(가시 덤불 공 여러 개)
  const bush = []; [[-1.8, -1.2, 1.4], [0.2, -1.8, 1.7], [2.0, -1.0, 1.3], [-0.6, -0.2, 1.0], [1.4, 0.4, 0.9]].forEach(([x, z, r], i) => { const m = K.inked(new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), K.lam(0x6e6c66)), 25); m.position.set(x, r * 0.8, z); scene.add(m); bush.push({ m, k: i }); });
  const nest = K.inked(new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.25, 8, 16), K.lam(0x8a8782)), 40); nest.rotation.x = Math.PI / 2; nest.position.set(0, 0.25, 1.0); scene.add(nest);
  const H = fowl(0, 1.0, 0.4, { s: 1.0, c: 0xa4a09a }); H.g.position.y = 0.05;
  const egg = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), K.lam(0xfbfaf6)); egg.scale.y = 1.3; egg.position.set(-0.55, 0.3, 1.5); scene.add(egg);
  const Dk = fowl(3.6, 2.2, 0.9, { s: 1.0, c: 0x8a8782, kind: 'duck', head: 0x2a2a28 });
  const grass = []; for (let i = 0; i < 30; i++) { const g = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.7, 4), K.lam(0x55534e)); g.position.set(-5 + (i * 0.37) % 10, 0.35, 2.4 + (i % 4) * 0.4); scene.add(g); grass.push({ g, k: i * 0.5 }); }
  const sparks = []; for (let i = 0; i < 6; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), K.flat(0xfbfaf6)); s.position.set(-3 + i * 1.3, 1.2 + (i % 3) * 0.5, 2.5 - (i % 2)); scene.add(s); sparks.push({ s, k: i * 1.3 }); }
  cam.position.set(1.2, 2.6, 7.6); cam.lookAt(0.8, 1.0, 0.5);
  return (t, ph) => {
    const k = 0.5 + 0.5 * Math.sin(ph);
    Dk.nk.rotation.z = -0.1 - 0.35 * k; Dk.g.rotation.y = 0.25 + 0.25 * Math.sin(ph);
    H.nk.rotation.z = 0.15 * Math.sin(ph * 2); H.wings.forEach((w, i) => { w.rotation.x = (i ? 1 : -1) * 0.1; });
    grass.forEach(o => { o.g.rotation.z = 0.25 * Math.sin(ph * 2 + o.k); });
    bush.forEach(o => { o.m.rotation.y = 0.03 * Math.sin(ph * 2 + o.k); });
    sparks.forEach(o => { o.s.visible = Math.sin(ph * 3 + o.k) > 0; });
  };
}
