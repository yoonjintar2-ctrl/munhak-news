// 광고늬우스 3D 움직이는 삽화 키트 (three.js + 신문 망점·윤곽선 후처리)
// 장면 파일(scenes/*.js)은  export default function(K){ ...; return (t,ph)=>{...} }  형태로 쓴다.
//   t  = 0~SECS 초,  ph = 0~2π (한 바퀴 = 영상 한 번) → 모든 움직임을 ph의 sin/cos로 만들면 끊김 없이 반복된다.
import * as THREE from './vendor/three.module.min.js';
export { THREE };

export function setup({ w = 960, h = 640, bg = 0xe6e4de, fog = [0xe2e0da, 35, 110], fov = 50, color = false, ss = 2 } = {}) {
  // 11/14 발행인 "선이 너무 깨져" → 2배 크기로 그린 뒤 줄여서 내보낸다(ss=2, 매끈한 윤곽선)
  const R = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  const W0 = w, H0 = h; w = w * ss; h = h * ss;
  R.setPixelRatio(1); R.setSize(w, h); document.body.appendChild(R.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color(bg);
  if (fog) scene.fog = new THREE.Fog(fog[0], fog[1], fog[2]);
  const cam = new THREE.PerspectiveCamera(fov, w / h, 0.1, 300);
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(-6, 14, 10); scene.add(key);
  // 신문 후처리: 감마 → 먹 농담 단계 + 깊이 라플라시안 윤곽선 (망점 없음: 움직이면 무늬가 어지러움)
  const rt = new THREE.WebGLRenderTarget(w, h, { depthTexture: new THREE.DepthTexture(w, h) });
  const post = new THREE.ShaderMaterial({
    uniforms: { tC: { value: rt.texture }, tD: { value: rt.depthTexture }, res: { value: new THREE.Vector2(w, h) }, near: { value: 0.1 }, far: { value: 300 }, dsz: { value: 3.6 }, ss: { value: ss } },
    vertexShader: 'varying vec2 v;void main(){v=uv;gl_Position=vec4(position.xy,0.,1.);}',
    fragmentShader: `uniform sampler2D tC,tD;uniform vec2 res;uniform float near,far,dsz,ss;varying vec2 v;
 float lin(float d){float z=d*2.-1.;return (2.*near*far)/(far+near-z*(far-near));}
 float L(vec2 o){vec3 c=texture2D(tC,v+o/res).rgb;return pow(dot(c,vec3(.299,.587,.114)),1./2.2);}
 float D(vec2 o){return lin(texture2D(tD,v+o/res).r);}
 void main(){float l=L(vec2(0));
  // 망점·해칭은 움직일 때 무늬가 일렁여 어지럽다(발행인 11/13) → 먹 농담 4단(부드러운 경계)으로
  // 11/14 발행인 "배경이 다 회색이니 밝게" → 중간 회색은 밝게 끌어올리고(곡선) 어두운 인물·사물과 윤곽선은 그대로 진하게
  // 11/14 발행인 "얼굴·몸·옷 구분이 안 됨" → 밝기 곡선을 되돌려 인물 명암을 살리고(배경 밝기는 장면 bg·바닥색으로),
  // 색이 다른 면 사이(얼굴↔옷↔배경)에도 윤곽선을 긋는다(밝기 소벨)
  float t=pow(1.-l,1.15); float k=t*3.; float ink=(floor(k)+smoothstep(.35,.65,fract(k)))/3.; ink=pow(ink,1.15)*.82;
  float d0=D(vec2(0)); float o=1.5*ss;
  float lap=abs(D(vec2(o,0))+D(vec2(-o,0))+D(vec2(0,o))+D(vec2(0,-o))-4.*d0)/d0;
  ink=max(ink,smoothstep(.015,.04,lap));
  float gx=L(vec2(o,0))-L(vec2(-o,0)), gy=L(vec2(0,o))-L(vec2(0,-o));
  ink=max(ink,.9*smoothstep(.10,.22,length(vec2(gx,gy))));
  if(l>.8) ink*=.2;
  gl_FragColor=vec4(mix(vec3(.957,.945,.918),vec3(.09),clamp(ink,0.,1.)),1.);}`
  });
  const pscene = new THREE.Scene(); pscene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), post)); const pcam = new THREE.Camera();
  // color:true → 흑백 먹 후처리 없이 컬러 그대로(유튜브용 마스코트 등)
  if (color) { R.outputColorSpace = THREE.SRGBColorSpace; scene.add(new THREE.HemisphereLight(0xffffff, 0xf3dfb4, 1.1)); }
  const render = color ? () => { R.setRenderTarget(null); R.render(scene, cam); } : () => { R.setRenderTarget(rt); R.render(scene, cam); R.setRenderTarget(null); R.render(pscene, pcam); };
  return { R, scene, cam, render, post, w: W0, h: H0, ss };
}

// ---------- 재료·도우미 ----------
export const lam = (c, o = {}) => new THREE.MeshLambertMaterial(Object.assign({ color: c }, o));
export const flat = (c) => new THREE.MeshBasicMaterial({ color: c });
const edgesMat = new THREE.LineBasicMaterial({ color: 0x0b0b0b });
export function inked(mesh, th = 25) { mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, th), edgesMat)); return mesh; }
export function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; }
export function imgTex(url) { const t = new THREE.TextureLoader().load(url, () => { t.__ok = 1; }); t.colorSpace = THREE.SRGBColorSpace; K_waits.push(() => t.__ok); return t; }
export const K_waits = [];
export function box(w, h, d, c, x = 0, y = 0, z = 0, parent) { const m = inked(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), typeof c === 'number' ? lam(c) : c)); m.position.set(x, y, z); if (parent) parent.add(m); return m; }
export function cyl(rt, rb, h, c, x = 0, y = 0, z = 0, parent, seg = 18) { const m = inked(new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), typeof c === 'number' ? lam(c) : c), 40); m.position.set(x, y, z); if (parent) parent.add(m); return m; }
export function line(points, parent) { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(...p))), edgesMat); (parent).add(l); return l; }

// 반복 안에서 a~b 구간(0~1 비율)만 부드럽게 1이 되는 창 — 손짓·고개 돌리기 타이밍용
export function win(ph, a, b, soft = 0.08) { const u = ((ph / (Math.PI * 2)) % 1 + 1) % 1; const s = x => Math.min(1, Math.max(0, x)); const e = x => x * x * (3 - 2 * x); return e(s((u - a) / soft)) * e(s((b - u) / soft)); }

// ---------- 배경 ----------
export function ground(scene, { color = '#d2d2cc', line = '#b0b0aa', tiles = 8, repeat = 10 } = {}) {
  const t = canvasTex(1024, 1024, (g, w, h) => { g.fillStyle = color; g.fillRect(0, 0, w, h); g.strokeStyle = line; g.lineWidth = 2; for (let i = 0; i <= tiles; i++) { g.beginPath(); g.moveTo(i * w / tiles, 0); g.lineTo(i * w / tiles, h); g.stroke(); g.beginPath(); g.moveTo(0, i * h / tiles); g.lineTo(w, i * h / tiles); g.stroke(); } });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshLambertMaterial({ map: t })); m.rotation.x = -Math.PI / 2; scene.add(m); return m;
}
export function windowsTex(cols, rows, seed = 1, wall = '#8c8c8a') {
  let s = seed; const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  return canvasTex(512, 1024, (g, w, h) => { g.fillStyle = wall; g.fillRect(0, 0, w, h); const cw = w / cols, rh = h / rows;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const on = rnd() > 0.45; const v = on ? 175 + rnd() * 20 | 0 : 128; g.fillStyle = `rgb(${v},${v},${v - 4})`; g.fillRect(c * cw + cw * 0.18, r * rh + rh * 0.2, cw * 0.64, rh * 0.55); }
    g.strokeStyle = '#6a6a68'; g.lineWidth = 2; for (let c = 0; c <= cols; c += 2) { g.beginPath(); g.moveTo(c * cw, 0); g.lineTo(c * cw, h); g.stroke(); } });
}
export function building(scene, x, z, w, d, h, seed = 1, rot = 0) {
  const tex = windowsTex(Math.max(2, Math.round(w * 1.2)), Math.max(3, Math.round(h * 0.9)), seed);
  const side = lam(0x8a8a8a), dark = lam(0x555555);
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [side, side, dark, dark, new THREE.MeshLambertMaterial({ map: tex, emissive: 0x444444, emissiveMap: tex }), new THREE.MeshLambertMaterial({ map: tex })]);
  m.position.set(x, h / 2, z); m.rotation.y = rot; scene.add(inked(m)); return m;
}
// 그림을 띄운 화면(전광판·TV·모니터). drift=화면 속 영상이 천천히 흐르는 정도
// crop=[u0,v0,u1,v1] (0~1, 아래가 v=0) — 원본 그림의 일부만 화면에 띄울 때
export function screen(scene, { tex, x = 0, y = 0, z = 0, w = 8, h = 5, rot = 0, frame = 0x111111, border = 0.5, crop = [0.02, 0.02, 0.98, 0.98] }) {
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = rot; scene.add(g);
  box(w + border, h + border, 0.5, frame, 0, 0, -0.3, g);
  const s = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex })); s.position.z = 0.01; g.add(s);
  const [u0, v0, u1, v1] = crop; tex.repeat.set(u1 - u0, v1 - v0);
  return { g, s, update(ph, drift = 0.012) { tex.offset.set(u0 + Math.sin(ph) * drift, v0 + Math.cos(ph) * drift * 0.5); } };
}
// 갓등·등불 줄: 각자 진자처럼 흔들림
export function lanternString(scene, { x0 = -10, x1 = 10, y = 10.5, z = 2, n = 9, sag = 1.4, size = 1 } = {}) {
  const ls = []; const geo = new THREE.CylinderGeometry(0.42 * size, 0.42 * size, 0.95 * size, 16, 1);
  for (let i = 0; i < n; i++) { const u = i / (n - 1); const g = new THREE.Group(); g.position.set(x0 + (x1 - x0) * u, y - Math.sin(u * Math.PI) * sag, z);
    const b = inked(new THREE.Mesh(geo, flat(0xf2efe6)), 10); b.position.y = -0.78 * size; g.add(b);
    [-0.2, 0.2].forEach(dy => { const r = new THREE.Mesh(new THREE.TorusGeometry(0.42 * size, 0.04, 6, 20), flat(0x111111)); r.rotation.x = Math.PI / 2; r.position.y = (-0.78 + dy) * size; g.add(r); });
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.25 * size, 0.3 * size, 0.15, 12), lam(0x111111)); cap.position.y = -0.24 * size; g.add(cap);
    const st = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.3), lam(0x111111)); st.position.y = -0.1; g.add(st);
    const tas = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.06, 0.45 * size, 6), lam(0x222222)); tas.position.y = -1.5 * size; g.add(tas);
    scene.add(g); ls.push(g); }
  const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([x0 - 1.5 + (x1 - x0 + 3) * u, y + 0.2 - Math.sin(u * Math.PI) * (sag + 0.2), z]); } line(pts, scene);
  return { ls, update(ph, amp = 0.22) { ls.forEach((g, i) => { g.rotation.z = Math.sin(ph + i * 0.8) * amp; g.rotation.x = Math.cos(ph * 2 + i * 0.5) * amp * 0.35; g.rotation.y = Math.sin(ph + i) * 0.4; }); } };
}
// 떠다니는 먼지·눈
export function motes(scene, { n = 45, box: B = [40, 22, 18], z0 = -8, size = 0.12 } = {}) {
  const p = new Float32Array(n * 3), sd = []; for (let i = 0; i < n; i++) { p[i * 3] = (Math.random() - 0.5) * B[0]; p[i * 3 + 1] = Math.random() * B[1]; p[i * 3 + 2] = z0 + Math.random() * B[2]; sd.push(Math.random() * 6.28); }
  const base = p.slice(); const pts = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(p, 3)), new THREE.PointsMaterial({ color: 0xffffff, size, transparent: true, opacity: 0.85 })); scene.add(pts);
  return { update(ph) { for (let i = 0; i < n; i++) { p[i * 3 + 1] = base[i * 3 + 1] + Math.sin(ph + sd[i]) * 0.6; p[i * 3] = base[i * 3] + Math.cos(ph + sd[i]) * 0.3; } pts.geometry.attributes.position.needsUpdate = true; } };
}
// 날아가는 새(타원 궤도를 한 바퀴 돌아 제자리로)
export function bird(scene, { cx = 0, cy = 18, cz = -10, rx = 14, rz = 4, s = 1 } = {}) {
  const g = new THREE.Group(); scene.add(g); const body = inked(new THREE.Mesh(new THREE.SphereGeometry(0.25 * s, 10, 8), lam(0x222222))); body.scale.set(1.6, 0.8, 0.8); g.add(body);
  const wings = [-1, 1].map(sd => { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.9 * s, 0.32 * s), new THREE.MeshLambertMaterial({ color: 0x222222, side: THREE.DoubleSide })); w.geometry.translate(0.45 * s, 0, 0); const p = new THREE.Group(); p.add(w); p.rotation.y = sd > 0 ? 0 : Math.PI; g.add(p); return p; });
  return { update(ph, off = 0) { const a = ph + off; g.position.set(cx + Math.cos(a) * rx, cy + Math.sin(a * 2) * 0.6, cz + Math.sin(a) * rz); g.rotation.y = -a + Math.PI / 2; const f = Math.sin(ph * 12) * 0.7; wings[0].rotation.x = f; wings[1].rotation.x = f; } };
}

// ---------- 사람(관절 있는 인형) ----------
// 기본은 -z 쪽(화면 안쪽)을 바라본다. pose({headYaw,headPitch,torsoYaw,lean, armL:{fwd,out,elbow,point}, armR:{...}, bob})
//   headYaw>0 = 왼쪽(-x)으로 고개, fwd = 팔을 앞으로 드는 각(라디안), point=true면 검지 편 손
// 회색 밝기(0~1)와 대비 맞추기: 얼굴(밝게)·옷(중간~진하게)·머리(진하게)가 늘 구분되게 (11/14 발행인 "얼굴인지 몸인지 옷인지 구분이 안 됨")
const lumOf = c => { const r = (c >> 16 & 255) / 255, g = (c >> 8 & 255) / 255, b = (c & 255) / 255; return .299 * r + .587 * g + .114 * b; };
const grayOf = v => { const k = Math.round(Math.max(0, Math.min(1, v)) * 255); return (k << 16) | (k << 8) | k; };
export function person(scene, { x = 0, z = 0, rot = 0, coat = 0x5e5e5e, pants = 0x2c2c2c, skin = 0xdcd6ce, hair = 'short', hairC = 0x1e1e1e, backpack = false, scale = 1, scarf = null, detail = true } = {}) {
  if (lumOf(skin) < .72) skin = 0xdcd6ce;
  if (Math.abs(lumOf(coat) - lumOf(skin)) < .3) coat = grayOf(Math.min(lumOf(coat), lumOf(skin) - .38));
  if (lumOf(hairC) > .35) hairC = 0x262626;
  if (Math.abs(lumOf(pants) - lumOf(coat)) < .12) pants = grayOf(Math.max(.1, lumOf(coat) - .22));
  const trim = grayOf(Math.max(.08, lumOf(coat) - .2));
  const root = new THREE.Group(); root.position.set(x, 0, z); root.rotation.y = rot; root.scale.setScalar(scale); scene.add(root);
  [-0.22, 0.22].forEach(sx => cyl(0.2, 0.17, 1.8, pants, sx, 0.9, 0, root, 10));
  [-0.22, 0.22].forEach(sx => box(0.34, 0.16, 0.56, 0x1a1a1a, sx, 0.08, -0.08, root));
  const torso = new THREE.Group(); torso.position.y = 1.8; root.add(torso);
  const body = inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.6, 1.0, 6, 14), lam(coat)), 40); body.position.y = 0.75; torso.add(body);
  const sh = new THREE.Mesh(new THREE.SphereGeometry(0.64, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), lam(coat)); sh.scale.set(1.25, 0.5, 0.9); sh.position.y = 1.32; torso.add(sh);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.19, 0.3, 10), lam(skin)); neck.position.y = 1.55; torso.add(neck);
  const headG = new THREE.Group(); headG.position.y = 1.68; torso.add(headG);
  const head = inked(new THREE.Mesh(new THREE.SphereGeometry(0.4, 22, 16), lam(skin)), 60); head.position.y = 0.3; headG.add(head);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.18, 8), lam(skin)); nose.rotation.x = -Math.PI / 2; nose.position.set(0, 0.27, -0.42); headG.add(nose);
  [-1, 1].forEach(sd => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), lam(skin)); e.scale.set(0.5, 1, 0.8); e.position.set(sd * 0.4, 0.28, 0.02); headG.add(e); });
  const hm = lam(hairC);
  // 머리카락: 정수리 + 뒤통수만 덮고 얼굴(-z)은 비워 둔다 → 고개를 돌리면 옆얼굴이 보인다
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.43, 22, 14, 0, Math.PI * 2, 0, Math.PI * 0.3), hm); cap.position.y = 0.32; headG.add(cap);
  const back = new THREE.Mesh(new THREE.SphereGeometry(0.43, 22, 14, -0.15, Math.PI + 0.3, 0, Math.PI * 0.72), hm); back.position.y = 0.32; headG.add(back);
  [-1, 1].forEach(sd => { const ey = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), flat(0x111111)); ey.position.set(sd * 0.15, 0.36, -0.36); headG.add(ey);
    const br = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.03), flat(0x111111)); br.position.set(sd * 0.15, 0.45, -0.37); headG.add(br); });
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.025, 0.03), flat(0x333333)); mouth.position.set(0, 0.13, -0.38); headG.add(mouth);
  [-1, 1].forEach(sd => { const ear = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), lam(skin)); ear.scale.set(0.45, 1, 0.7); ear.position.set(sd * 0.4, 0.3, 0.02); headG.add(ear); });
  if (detail) { // 옷 세부: 깃·단추줄·허리띠·소매끝 — 멀리서도 '옷 입은 사람'으로 읽히게
    const col = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.07, 6, 16), lam(trim)); col.rotation.x = Math.PI / 2; col.position.y = 1.45; torso.add(col);
    box(0.06, 1.0, 0.05, trim, 0, 0.75, -0.6, torso);
    [1.05, 0.75, 0.45].forEach(y => { const bt = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 4), flat(0x111111)); bt.position.set(0, y, -0.63); torso.add(bt); });
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.12, 18), lam(0x1c1c1c)); belt.position.y = 0.12; torso.add(belt);
  }
  if (scarf != null) { const sc = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.11, 8, 16), lam(scarf)); sc.rotation.x = Math.PI / 2; sc.position.y = 1.47; torso.add(sc); }
  if (hair === 'long') { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.56, 1.0, 18, 1, true, -Math.PI * 0.85, Math.PI * 1.7), new THREE.MeshLambertMaterial({ color: hairC, side: THREE.DoubleSide })); l.position.set(0, -0.05, 0.05); headG.add(l); }
  if (hair === 'bun') { const b = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), hm); b.position.set(0, 0.62, 0.25); headG.add(b); }
  if (hair === 'cap') { const c = cyl(0.45, 0.45, 0.22, 0x333333, 0, 0.55, 0, headG); const bill = box(0.6, 0.05, 0.4, 0x333333, 0, 0.47, -0.45, headG); }
  if (backpack) { box(1.0, 1.25, 0.5, 0x4a4a4a, 0, 0.8, 0.6, torso); box(1.04, 0.42, 0.56, 0x333333, 0, 1.3, 0.62, torso); }
  const arm = sd => { const sp = new THREE.Group(); sp.position.set(sd * 0.8, 1.3, 0); torso.add(sp);
    const up = inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.62, 4, 10), lam(coat)), 40); up.position.y = -0.42; sp.add(up);
    const el = new THREE.Group(); el.position.y = -0.84; sp.add(el);
    const fo = inked(new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.55, 4, 10), lam(coat)), 40); fo.position.y = -0.38; el.add(fo);
    const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.1, 10), lam(trim)); cuff.position.y = -0.66; el.add(cuff);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), lam(skin)); hand.position.y = -0.8; el.add(hand);
    const finger = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.24, 3, 6), lam(skin)); finger.position.y = -1.0; finger.visible = false; el.add(finger);
    return { sp, el, finger }; };
  const A = { L: arm(-1), R: arm(1) };
  function setArm(a, o = {}, sd) { a.sp.rotation.x = o.fwd || 0; a.sp.rotation.z = sd * (0.1 + (o.out || 0)); a.el.rotation.x = Math.abs(o.elbow || 0); /* 팔꿈치는 늘 앞으로만 굽는다(부호 무시) */ a.finger.visible = !!o.point; }
  return { root, torso, headG,
    pose(o = {}) { headG.rotation.y = o.headYaw || 0; headG.rotation.x = o.headPitch || 0; headG.rotation.z = o.headTilt || 0;
      torso.rotation.y = o.torsoYaw || 0; torso.rotation.x = o.lean || 0; root.position.y = o.bob || 0;
      setArm(A.L, o.armL, -1); setArm(A.R, o.armR, 1); } };
}

// ---------- 배경 채우기 (11/14 발행인 "배경에도 아무것도 없다, 삽화에 리소스가 안 들어간다") ----------
// K.backdrop(scene, { kind: 'country'|'town'|'city'|'room'|'shore', seed, night, cx }) — 장면 뒤를 겹겹이(먼 산·중경·근경) 채운다.
// 인물·주요 사물은 z -6 ~ 4 안쪽에 두면 가리지 않는다. room 은 벽이 z=-7 에 선다.
function rnd(seed) { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
function tree(parent, x, z, s = 1, kind = 0, c = 0x8e8e88) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s); parent.add(g);
  cyl(0.18, 0.25, 1.6, 0x5a5a56, 0, 0.8, 0, g, 8);
  if (kind === 0) { const m = inked(new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 9), lam(c)), 70); m.scale.set(1, 1.15, 1); m.position.y = 2.6; g.add(m); }
  else { [0, 1, 2].forEach(i => { const m = inked(new THREE.Mesh(new THREE.ConeGeometry(1.25 - i * 0.3, 1.5, 9), lam(c)), 60); m.position.y = 2.0 + i * 0.85; g.add(m); }); }
  return g;
}
function house(parent, x, z, s = 1, rot = 0, wall = 0xd4d2cc, roof = 0x55534e, R = Math.random) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot; g.scale.setScalar(s); parent.add(g);
  box(3, 2.2, 2.4, wall, 0, 1.1, 0, g);
  const rf = inked(new THREE.Mesh(new THREE.CylinderGeometry(0.01, 2.0, 1.3, 4, 1), lam(roof)), 30); rf.rotation.y = Math.PI / 4; rf.scale.set(1.15, 1, 0.92); rf.position.y = 2.85; g.add(rf);
  box(0.6, 1.1, 0.06, 0x3a3a38, -0.6, 0.55, 1.22, g);
  box(0.7, 0.55, 0.06, 0x4a4a48, 0.7, 1.35, 1.22, g); box(0.05, 0.55, 0.08, 0xeeeeea, 0.7, 1.35, 1.24, g);
  if (R() > 0.5) box(0.35, 0.8, 0.35, 0x6a6a66, 0.9, 3.0, -0.4, g);
  return g;
}
export function backdrop(scene, { kind = 'country', seed = 1, night = false, cx = 0, near = true } = {}) {
  const R = rnd(seed), G = new THREE.Group(); scene.add(G);
  const tone = v => night ? Math.max(0.12, v - 0.42) : v;
  const gl = v => { const k = Math.round(tone(v) * 255); return (k << 16) | (k << 8) | k; };
  // 구름(낮) — 하늘이 비어 보이지 않게
  if (!night && kind !== 'room') for (let i = 0; i < 5; i++) { const c = new THREE.Group(); c.position.set(cx - 40 + i * 20 + R() * 8, 13 + R() * 6, -70 - R() * 15); G.add(c);
    for (let j = 0; j < 4; j++) { const p = inked(new THREE.Mesh(new THREE.SphereGeometry(2 + R() * 1.5, 12, 8), lam(0xf6f5f1)), 80); p.scale.y = 0.55; p.position.set(j * 2.4 - 3.6, R() * 0.8, 0); c.add(p); } }
  if (kind === 'country' || kind === 'town' || kind === 'shore') {
    // 먼 산 세 겹(멀수록 밝게)
    [[-85, 0.84, 34], [-65, 0.78, 26], [-48, 0.72, 20]].forEach(([z, v, r], li) => { for (let i = -2; i <= 2; i++) {
      const m = inked(new THREE.Mesh(new THREE.SphereGeometry(r, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), lam(gl(v))), 80);
      m.scale.set(1.3, 0.28 + R() * 0.2, 0.6); m.position.set(cx + i * r * 1.9 + (li - 1) * 9, -0.2, z); G.add(m); } });
  }
  if (kind === 'country') {
    for (let i = 0; i < 16; i++) tree(G, cx - 34 + i * 4.4 + R() * 2, -24 - R() * 12, 0.8 + R() * 0.6, R() > 0.6 ? 1 : 0, gl(0.6 + R() * 0.12));
    for (let i = 0; i < 3; i++) house(G, cx - 22 + i * 19 + R() * 5, -36 - R() * 6, 0.9, R() * 0.6 - 0.3, gl(0.85), gl(0.38), R);
    if (near) for (let i = 0; i < 14; i++) { const x = cx - 21 + i * 3; cyl(0.08, 0.08, 1.2, 0x55554f, x, 0.6, -12, G, 6); if (i) box(3, 0.08, 0.08, 0x55554f, x - 1.5, 0.95, -12, G); }
    if (near) for (let i = 0; i < 30; i++) { const t = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.28, 4), lam(gl(0.55))); t.position.set(cx - 16 + R() * 32, 0.14, -10.5 + R() * 6); G.add(t); }
  }
  if (kind === 'town') {
    for (let i = 0; i < 9; i++) house(G, cx - 30 + i * 7.5 + R() * 2, -18 - R() * 8, 1 + R() * 0.3, R() * 0.4 - 0.2, gl(0.8 + R() * 0.1), gl(0.35 + R() * 0.15), R);
    for (let i = 0; i < 6; i++) { const x = cx - 25 + i * 10; cyl(0.12, 0.15, 7, 0x4a4a46, x, 3.5, -10, G, 6); box(1.4, 0.1, 0.1, 0x4a4a46, x, 6.6, -10, G);
      if (i) line([[x - 10, 6.5, -10], [x - 5, 5.9, -10], [x, 6.5, -10]], G); }
    for (let i = 0; i < 6; i++) tree(G, cx - 28 + i * 11 + R() * 3, -26 - R() * 4, 0.9, 0, gl(0.62));
  }
  if (kind === 'city') { for (let i = 0; i < 8; i++) building(G, cx - 35 + i * 10, -30 - R() * 10, 7, 7, 10 + R() * 18, seed + i); }
  if (kind === 'shore') {
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(260, 60), lam(gl(0.7))); sea.rotation.x = -Math.PI / 2; sea.position.set(cx, 0.02, -40); G.add(sea);
    for (let i = 0; i < 18; i++) { const x = cx - 40 + R() * 80, z = -14 - R() * 40; line([[x, 0.05, z], [x + 1.6, 0.05, z]], G); }
    for (let i = 0; i < 2; i++) { const b = new THREE.Group(); b.position.set(cx - 15 + i * 26, 0, -30 - i * 8); G.add(b); box(3, 0.6, 1, 0x55534e, 0, 0.3, 0, b); cyl(0.05, 0.05, 2.5, 0x333333, 0, 1.8, 0, b, 5); }
  }
  if (kind === 'room') {
    box(40, 14, 0.4, gl(0.86), cx, 7, -7, G);
    // 창(밖이 밝게) + 창틀
    box(5, 3.6, 0.1, 0xf6f5f1, cx + 6, 5, -6.75, G); box(5.4, 0.25, 0.3, 0x55534e, cx + 6, 3.1, -6.7, G); box(5.4, 0.25, 0.3, 0x55534e, cx + 6, 6.9, -6.7, G);
    box(0.25, 4, 0.3, 0x55534e, cx + 3.4, 5, -6.7, G); box(0.25, 4, 0.3, 0x55534e, cx + 8.6, 5, -6.7, G); box(0.15, 3.6, 0.2, 0x55534e, cx + 6, 5, -6.7, G);
    // 액자·선반·책
    box(2.2, 1.6, 0.12, 0x3c3c3a, cx - 5, 5.6, -6.75, G); box(1.8, 1.2, 0.14, gl(0.7), cx - 5, 5.6, -6.72, G);
    box(4, 0.15, 0.8, 0x4a4a46, cx - 9, 3.6, -6.5, G);
    for (let i = 0; i < 9; i++) box(0.3, 0.7 + R() * 0.4, 0.6, gl(0.3 + R() * 0.4), cx - 10.6 + i * 0.4, 4.05, -6.5, G);
    // 걸레받이·바닥 러그
    box(40, 0.4, 0.2, 0x4a4a46, cx, 0.2, -6.75, G);
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(9, 5), lam(gl(0.62))); rug.rotation.x = -Math.PI / 2; rug.position.set(cx, 0.02, -1); G.add(rug);
    line([[cx - 4.3, 0.03, -3.3], [cx + 4.3, 0.03, -3.3], [cx + 4.3, 0.03, 1.3], [cx - 4.3, 0.03, 1.3], [cx - 4.3, 0.03, -3.3]], G);
  }
  return G;
}
