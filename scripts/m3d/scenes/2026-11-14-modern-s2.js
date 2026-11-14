// 11/14 1분 현대문학 장면② 헤일셤: 아이들이 이젤 앞에서 그림을 그리고, 문가의 마담이 화첩을 끼고 지켜본다
export const secs = 3;
export const opts = { bg: 0xeceae4, fog: [0xe6e4de, 40, 140] };
export default function (K) {
  const { THREE, scene, cam } = K;
  K.ground(scene, { color: '#d6d3c8', line: '#c6c3b8', tiles: 3, repeat: 4 });
  K.backdrop(scene, { kind: 'room', seed: 41 });
  K.box(18, 6, 0.4, 0xcfcdc7, 0, 3, -6, scene);                      // 뒷벽
  const winT = K.canvasTex(128, 192, (g, w, h) => { g.fillStyle = '#efefe9'; g.fillRect(0, 0, w, h); g.strokeStyle = '#3a3a38'; g.lineWidth = 8; g.strokeRect(4, 4, w - 8, h - 8); g.beginPath(); g.moveTo(w / 2, 0); g.lineTo(w / 2, h); g.moveTo(0, h / 2); g.lineTo(w, h / 2); g.stroke(); });
  [-5.5, -1.5, 2.5].forEach(x => { const m = new THREE.Mesh(new THREE.PlaneGeometry(2, 3), new THREE.MeshLambertMaterial({ map: winT })); m.position.set(x, 3.3, -5.75); scene.add(m); });
  K.box(1.8, 3.6, 0.2, 0x4f4e4a, 6.6, 1.8, -5.7, scene);            // 문
  // 이젤 3개 + 그리는 아이 3명(앞모습 대신 뒤·옆)
  const kids = [], brushes = [];
  [[-4.5, -1.5], [-1.0, -0.8], [2.6, -1.6]].forEach(([x, z], i) => {
    const e = new THREE.Group(); e.position.set(x, 0, z); scene.add(e);
    [-0.5, 0.5].forEach(a => { const l = K.cyl(0.05, 0.05, 2.8, 0x5a5955, a, 1.3, 0, e, 5); l.rotation.z = -a * 0.25; });
    const cv = K.box(1.4, 1.1, 0.06, 0xf4f4ef, 0, 2.0, 0.15, e); cv.rotation.x = -0.12;
    const k = K.person(scene, { x: x + 0.15, z: z + 1.5, rot: 0.15 * (i - 1), coat: [0xd5d2ca, 0x8c8a84, 0xbab7af][i], pants: 0x55554f, hair: ['long', 'short', 'short'][i], scale: 0.72 });
    kids.push(k);
  });
  // 마담(문가, 화첩을 안고 지켜봄)
  const M = K.person(scene, { x: 6.2, z: -3.6, rot: -0.6, coat: 0x3e3e3b, pants: 0x3e3e3b, hair: 'bun', hairC: 0x55554f, scale: 0.98 });
  const pf = K.box(0.9, 1.2, 0.08, 0x8a8984, 0, 0, 0, scene); M.torso.add(pf); pf.position.set(-0.55, 0.6, -0.55); pf.rotation.y = 0.4;
  cam.position.set(1.0, 4.4, 9.5); cam.lookAt(0.6, 2.0, -2.5);
  return (t, ph) => {
    kids.forEach((k, i) => { const s = Math.sin(ph * 3 + i * 2); k.pose({ headPitch: 0.05, headTilt: 0.08 * Math.sin(ph + i), armR: { fwd: 1.5 + 0.18 * s, out: 0.05 * s, elbow: 0.5 }, armL: { fwd: 0.2 } }); });
    const look = K.win(ph, 0.25, 0.75, 0.1);
    M.pose({ headYaw: -0.3 + 0.5 * look, headPitch: -0.05, armL: { fwd: 0.9, elbow: 1.3 }, armR: { fwd: 0.5 + 0.4 * look, elbow: 1.0 } });
  };
}
