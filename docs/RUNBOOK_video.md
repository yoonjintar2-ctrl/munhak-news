> ⚠️ **예전 방식(맥)** — 2026-11-27 발행인 결정으로 맥북을 쉬게 하면서 「04:52 맥 크롬 영상 업로드」 예약 작업은 꺼 두었다. 지금은 docs/RUNBOOK_cloud_video.md (타입캐스트 + 유튜브 API, 맥 없음). 기록용으로 남겨 둔다.

# RUNBOOK — 05:00 1분 문학 영상 5편 (맥 크롬, Sonnet)
D = 오늘. 무인 실행: 묻지 않는다, 승인 요청 금지. **06:45 전에 업로드를 끝낸다**(06:50부터 미국주식 영상 작업이 크롬을 씀). 못 끝낸 편은 07:30 이후 다시 시도.
순서: 문학 한술 쇼츠 → 결말까지 쇼츠 classic → modern → 본편 classic → modern. 모두 **바로 공개**(예약 공개 안 씀).

## 1. 준비·렌더 (도구 호출 최소)
1. 저장소 pull. 맥(device_bash 한 번): `cd $HOME/mnt/qtts/out && ls shorts-D/DONE food-D/DONE && tar czf vid-D.tgz shorts-D food-D casual1/E_think.wav` → device_stage_files → `mkdir -p /tmp/q/out && tar xzf <staged> -C /tmp/q/out`.
   DONE 이 없으면 `sleep 280` 넣어 다시(05:40 까지), 그래도 없으면 보고하고 끝.
2. `bash scripts/daily/render_all.sh D` (Bash timeout 최대, 끝까지 기다림 — 필요하면 `nohup … &` 후 `sleep 540` 으로 기다림). 출력에 제목·qa 결과·`pushed video-upload` 가 나온다. `qa ❌` 인 편은 올리지 않고 보고.

## 2. 업로드 (Claude in Chrome — chrome-browser 스킬 먼저)
- 채널 전환: youtube.com 에서 아바타 클릭 → JS: `[...document.querySelectorAll('ytd-compact-link-renderer')].find(e=>e.innerText.includes('계정 전환')).click()` 2초 뒤 `[...document.querySelectorAll('ytd-account-item-renderer')].find(e=>e.innerText.includes('문학늬우스')).click()`.
- 먼저 `studio.youtube.com/channel/UCC6rvGkmmC-HgWYxdJ6KP-g/videos/short` 행 제목을 읽어 **오늘 것이 이미 있으면 그 편은 건너뜀**(중복 금지).
- 업로드 창: `studio.youtube.com/channel/UCC6rvGkmmC-HgWYxdJ6KP-g/videos/upload?d=ud` 7초 대기 후 JS:
```
const RAW='https://raw.githubusercontent.com/yoonjintar2-ctrl/munhak-news/video-upload/';window.RAW=RAW;
window.putFile=async(sel,name,type)=>{const b=await (await fetch(RAW+name+'?t='+Date.now())).blob();const f=new File([b],name,{type});const inp=document.querySelector(sel);const dt=new DataTransfer();dt.items.add(f);inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}));return b.size;};
window.setText=(sel,t)=>{const e=document.querySelector(sel);e.focus();document.execCommand('selectAll');document.execCommand('insertText',false,t);return e.innerText.length;};
await putFile('ytcp-uploads-file-picker input[type=file]','D-food.mp4','video/mp4')
```
  8초 뒤: `setText('#title-textarea #textbox', 제목)`, `setText('#description-textarea #textbox', await (await fetch(RAW+'desc-food.txt')).text())`, `document.querySelector('tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"]').click()`.
- **쇼츠(food, classic-full, modern-full)**: JS 한 번에 `#next-button` 3번(2초 간격) → `tp-yt-paper-radio-button[name="PUBLIC"]` → `#done-button` → 6초 뒤 `a[href*="shorts/"]` 링크 읽기.
- **본편(classic, modern)**: 제목·설명 뒤 `ytcp-video-metadata-playlists ytcp-dropdown-trigger` 클릭 → 확대 캡처로 줄 위치 확인 후 체크: classic = '1분 고전' + (origin 이 한국이면 '한국 문학', 아니면 '세계 문학'), modern = '1분 현대문학' + 같은 규칙 → '완료' → `#next-button` 1번 →
  자막 '추가'(동영상 요소 첫 줄 오른쪽) → '파일 업로드' → `await putFile('input#captions-file-loader','D-classic.srt','application/x-subrip')` 10초 → 오른쪽 위 '완료' →
  최종 화면 '동영상에서 가져오기' → 최종 화면이 있는 최근 본편(썸네일에 노란 배지) 하나 선택 → 10초 → '저장' →
  `#next-button` 2번 → PUBLIC → `#done-button` → `a[href*="youtu.be"]` 링크.
- 캡처는 필요한 때만(재생목록 확인 1장 정도). 쇼츠 맞춤 썸네일·댓글·커뮤니티는 하지 않는다. 일일 업로드 한도 경고가 뜨면 24시간 다시 시도하지 않는다.
- 끝: youtube.com 에서 같은 방법으로 **'샌디스크' 계정으로 되돌리고** 연 탭을 모두 닫는다.
보고: 5편 링크 + 문제 1줄.
