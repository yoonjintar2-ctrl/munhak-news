// 11/23 오늘의 시 「정읍사」: 보름달 밤 언덕 바위 위에 선 여인이 두 손을 모아 달을 올려다본다. 아래 굽은 길에 등불 하나가 흔들리며 다가오고 억새가 바람에 눕는다. 카메라 고정(밤이지만 하늘은 밝은 달빛)
export const secs = 3;
export const opts = { bg: 0xd8d6d0, fog: [0xd4d2cc, 25, 80] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#c8c5bd', line: '#c0bdb5', tiles: 2, repeat: 3 });
  K.backdrop(scene, { kind: 'country', seed: 2312, near: false });
  const moon = new THREE.Mesh(new THREE.CircleGeometry(1.6, 40), K.flat(0xffffff)); moon.position.set(4.5, 8.5, -20); scene.add(moon);
  const halo = new THREE.Mesh(new THREE.CircleGeometry(2.6, 40), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })); halo.position.set(4.5, 8.5, -20.1); scene.add(halo);
  // 언덕 바위
  const rock = K.inked(new THREE.Mesh(new THREE.DodecahedronGeometry(1.6, 0), K.lam(0x8a8782)), 30); rock.scale.set(1.4, 0.6, 1); rock.position.set(-1.5, 0.5, -2); scene.add(rock);
  const W = K.person(scene, { x: -1.5, z: -2, rot: -0.55, coat: 0xeeece6, pants: 0xd8d5cd, hair: 'bun', scale: 0.95 }); W.root.position.y = 0.95;
  const sk = K.inked(new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.5, 18, 1, true), new THREE.MeshLambertMaterial({ color: 0x6e6c66, side: THREE.DoubleSide })), 40); sk.position.y = 0.8; W.root.add(sk);
  // 굽은 길 + 등불
  for (let i = 0; i < 12; i++) K.box(0.9, 0.02, 0.6, 0xe8e6e0, 1 + Math.sin(i * 0.5) * 2, 0.02, -3 - i * 1.2, scene).rotation.y = Math.cos(i * 0.5) * 0.5;
  const lamp = new THREE.Group(); scene.add(lamp); K.cyl(0.15, 0.15, 0.3, 0xffffff, 0, 0, 0, lamp, 10); const lg = new THREE.Mesh(new THREE.CircleGeometry(0.5, 20), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 })); lg.position.z = 0.1; lamp.add(lg);
  const reeds = []; for (let i = 0; i < 16; i++) { const r = K.box(0.03, 0.8, 0.03, 0x9a978f, -5 + (i * 0.47) % 10, 0.4, -0.5 - (i * 0.31) % 3, scene); reeds.push({ r, k: i * 0.5 }); }
  cam.position.set(0.5, 2.6, 6.5); cam.lookAt(0.2, 2.4, -4);
  return (t, ph) => {
    const u = ph / (Math.PI * 2);
    W.pose({ headPitch: -0.45, headYaw: -0.15 + 0.1 * Math.sin(ph), armL: { fwd: 1.3, elbow: 1.6, out: -0.25 }, armR: { fwd: 1.3, elbow: 1.6, out: -0.25 }, lean: 0.03 * Math.sin(ph) });
    const v = 0.5 + 0.5 * Math.sin(ph); lamp.position.set(1.5 + Math.sin(3 + v * 3) * 1.5, 0.9 + 0.05 * Math.sin(ph * 6), -12 + v * 4); lamp.rotation.z = 0.15 * Math.sin(ph * 4);
    reeds.forEach(o => { o.r.rotation.z = 0.25 + 0.15 * Math.sin(ph * 2 + o.k); });
    halo.material.opacity = 0.22 + 0.06 * Math.sin(ph * 2);
  };
}
