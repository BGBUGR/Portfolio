/* =========================================================
   작품 데이터 — 새 작품은 이 목록에 항목만 추가하면 됩니다.
   type: 'youtube'(유튜브 팝업 재생) | 'file'(영상 파일 재생) | 없음(팝업에 제목만)
   vertical: true 이면 세로 영상(쇼츠) 비율의 팝업
   thumb 가 없으면 color 색상 블록을 썸네일로 사용합니다.
   ========================================================= */
const CATEGORIES = ['전체', '2D 모션그래픽', '3D 모션그래픽', '미디어아트·공연', '영상편집'];

const WORKS = [
  { title: '[영웅] 타이틀 시퀀스 | [HERO] Title Sequence', cat: '2D 모션그래픽', tool: 'After Effects · Blender',
    thumb: 'images/thumb-hero.webp', fit: 'cover', tags: ['타이틀 시퀀스', '모션디자인'],
    type: 'youtube', id: 'iPdwkiZb9nM' },
  { title: 'WICKED', cat: '2D 모션그래픽', tool: '[사용 툴]',
    thumb: 'images/thumb-wicked.webp', fit: 'contain', tags: [],
    type: 'youtube', id: 'XApS3H2XpVI', vertical: true },
  { title: 'DAVID IS THINKING', cat: '2D 모션그래픽', tool: 'After Effects',
    thumb: 'images/thumb-david.webp', fit: 'contain', tags: [],
    type: 'youtube', id: 'yD7Kw9xh8xY', vertical: true },
  { title: 'JOKER', cat: '2D 모션그래픽', tool: 'After Effects',
    thumb: 'images/thumb-joker.webp', fit: 'contain', tags: [],
    type: 'youtube', id: 'p7Nl6COZ_90', vertical: true },
  { title: "It's Me", cat: '3D 모션그래픽', tool: 'AI',
    thumb: 'images/thumb-itsme.jpg', fit: 'cover', tags: [],
    type: 'file', src: 'videos/its-me.mp4' },
  { title: '내 속도로 | My Own Pace', cat: '영상편집', tool: 'AI · YouTube',
    thumb: 'images/thumb-mypace.png', fit: 'cover', tags: [],
    type: 'youtube', id: 'nOqjNUru2II' },

  /* 아래는 자리표시자 — 실제 작품으로 교체하거나 삭제하세요 */
  { title: '[작품 제목]', cat: '2D 모션그래픽', tool: 'After Effects', color: '#ffb86b', tags: ['타이포그래피', '인포그래픽'] },
  { title: '[작품 제목]', cat: '3D 모션그래픽', tool: 'Cinema 4D · Blender', color: '#e7a6ff', tags: ['3D 연출', '애니메이션'] },
  { title: '[작품 제목]', cat: '영상편집', tool: 'Premiere Pro', color: '#7fe0c4', tags: ['홍보영상', '컷 편집'] },
  { title: '[작품 제목]', cat: '2D 모션그래픽', tool: 'After Effects', color: '#ffd23f', tags: ['애니메이션'] },
  { title: '[작품 제목]', cat: '미디어아트·공연', tool: 'After Effects', color: '#c6a8f5', tags: ['무대 LED 영상', '공간형 비주얼'] },
  { title: '[작품 제목]', cat: '3D 모션그래픽', tool: 'Cinema 4D · Blender', color: '#ff8a5c', tags: ['3D 연출'] },
  { title: '[작품 제목]', cat: '영상편집', tool: 'Premiere Pro', color: '#9ad0ff', tags: ['인터뷰', '스케치'] }
];

/* ---------- 요소 ---------- */
const tabsEl = document.getElementById('tabs');
const gridEl = document.getElementById('grid');
const modalEl = document.getElementById('modal');
const modalPanel = modalEl.querySelector('.modal-panel');
const modalMedia = document.getElementById('modal-media');
const modalTitle = document.getElementById('modal-title');
const modalMeta = document.getElementById('modal-meta');

let currentCat = '전체';

/* ---------- 탭 ---------- */
function renderTabs() {
  tabsEl.innerHTML = '';
  CATEGORIES.forEach((label) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tab' + (label === currentCat ? ' is-active' : '');
    btn.textContent = label;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', label === currentCat);
    btn.addEventListener('click', () => {
      currentCat = label;
      renderTabs();
      renderCards();
    });
    tabsEl.appendChild(btn);
  });
}

/* ---------- 카드 ---------- */
function thumbStyle(w) {
  if (w.thumb) {
    return `background-color:#000;background-image:url('${w.thumb}');background-size:${w.fit || 'cover'}`;
  }
  return `background:${w.color || '#1d1d22'}`;
}

function renderCards() {
  const list = currentCat === '전체' ? WORKS : WORKS.filter((w) => w.cat === currentCat);
  gridEl.innerHTML = '';
  list.forEach((w) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb" style="${thumbStyle(w)}">
        ${w.thumb ? '' : '<div class="thumb-label">썸네일 16:9</div>'}
      </div>
      <div class="card-body">
        <div class="card-title">${w.title}</div>
        <div class="card-meta">${w.cat} · ${w.tool}</div>
        <div class="card-tags">${w.tags.map((t) => `<span>${t}</span>`).join('')}</div>
      </div>`;
    card.addEventListener('click', () => openModal(w));
    gridEl.appendChild(card);
  });
}

/* ---------- 영상 팝업 ---------- */
function openModal(w) {
  modalTitle.textContent = w.title;
  modalMeta.textContent = `${w.cat} · ${w.tool}`;
  modalPanel.classList.toggle('is-vertical', !!w.vertical);

  if (w.type === 'youtube') {
    const url = `https://www.youtube.com/embed/${w.id}?autoplay=1&rel=0&playsinline=1`;
    modalMedia.innerHTML =
      `<iframe src="${url}" title="${w.title}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  } else if (w.type === 'file') {
    modalMedia.innerHTML = `<video src="${w.src}" controls autoplay playsinline></video>`;
  } else {
    modalMedia.innerHTML = `<div style="position:absolute;inset:0;${thumbStyle(w)}"></div>`;
  }

  modalEl.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalMedia.innerHTML = '';          // 영상 재생도 함께 멈춤
  modalEl.hidden = true;
  document.body.style.overflow = '';
}

modalEl.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-close')) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalEl.hidden) closeModal();
});

/* ---------- 시작 ---------- */
renderTabs();
renderCards();
