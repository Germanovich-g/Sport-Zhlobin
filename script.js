/* ============================================================
   ДАННЫЕ
   ============================================================ */

const DATA = [
  // ---------- ОБЪЕКТЫ ----------
  { id:'led', layer:'objects', title:'Ледовый дворец', address:'ул. Карла Маркса, 3/1',
    text:'Домашняя арена ХК «Металлург-Жлобин». Вмещает 2009 зрителей. Здесь проходят матчи Экстралиги и крупные турниры.',
    lat:52.8930, lng:30.0250, photo:'' },
  { id:'dvor', layer:'objects', title:'Дворец игровых видов спорта', address:'ул. Карла Маркса, 3/1',
    text:'Современный комплекс на 1500 мест. Принимает соревнования по волейболу, гандболу, единоборствам и теннису.',
    lat:52.8925, lng:30.0265, photo:'' },
  { id:'pool', layer:'objects', title:'Плавательный бассейн', address:'ул. Карла Маркса, 3/1',
    text:'Первая водная арена области с 50-метровыми дорожками и трибунами на 500 мест.',
    lat:52.8942, lng:30.0238, photo:'' },
  { id:'row', layer:'objects', title:'Гребная база', address:'ул. Карла Маркса, 3/1',
    text:'База для тренировок по академической гребле и гребле на байдарках и каноэ.',
    lat:52.8955, lng:30.0270, photo:'' },
  { id:'ski', layer:'objects', title:'Лыжероллерная трасса', address:'в районе ЦОР',
    text:'Асфальтированная трасса длиной 2500 метров для тренировок биатлонистов и массового катания.',
    lat:52.8900, lng:30.0330, photo:'' },
  { id:'stadium', layer:'objects', title:'Городской стадион', address:'ул. Парижской Коммуны, 13',
    text:'Главная площадка для футбольных матчей и лёгкой атлетики (ДЮСШ г. Жлобина).',
    lat:52.8895, lng:30.0195, photo:'' },

  // ---------- СПОРТСМЕНЫ ----------
  { id:'rudenkov', layer:'people', title:'Василий Руденков', address:'Олимпийский чемпион 1960 (Рим)',
    text:'Олимпийский чемпион 1960 года по метанию молота. Уроженец Жлобинщины.',
    lat:52.8910, lng:30.0220, photo:'' },
  { id:'lovetsky', layer:'people', title:'Владимир Ловецкий', address:'Серебро Олимпиады-1972',
    text:'Серебряный призёр Олимпиады 1972 года (Мюнхен) в эстафете 4×100 м.',
    lat:52.8935, lng:30.0280, photo:'' },
  { id:'kirov', layer:'people', title:'Николай Киров', address:'Бронза Олимпиады-1980',
    text:'Бронзовый призёр Олимпиады 1980 года (Москва) в беге на 800 м.',
    lat:52.8950, lng:30.0245, photo:'' },
  { id:'levshunov', layer:'people', title:'Артём Левшунов', address:'Драфт НХЛ — 2-й номер',
    text:'Выбран на драфте НХЛ под 2-м номером (рекорд для Беларуси), играет за «Чикаго». Воспитанник ЦОР.',
    lat:52.8920, lng:30.0290, photo:'' },
  { id:'pinchuk', layer:'people', title:'Виталий Пинчук', address:'Сборная Беларуси · НХЛ',
    text:'Нападающий сборной Беларуси и клуба НХЛ «Нэшвилл». Воспитанник ЦОР.',
    lat:52.8918, lng:30.0250, photo:'' },
  { id:'borikov', layer:'people', title:'Егор Бориков', address:'Контракт с «Ютой» (НХЛ)',
    text:'Молодой талант, подписавший контракт с клубом НХЛ «Юта». Воспитанник жлобинской школы.',
    lat:52.8945, lng:30.0295, photo:'' },
  { id:'metallurg', layer:'people', title:'ХК «Металлург-Жлобин»', address:'4-кратный чемпион Беларуси',
    text:'Чемпион Беларуси 2012, 2022, 2023 и 2024 годов. Базируется в Ледовом дворце.',
    lat:52.8933, lng:30.0248, photo:'' },
  { id:'iskra', layer:'people', title:'ВК «Искра»', address:'Чемпион Беларуси 2023/2024',
    text:'Чемпион Республики Беларусь по волейболу сезона 2023/2024.',
    lat:52.8927, lng:30.0262, photo:'' },

  // ---------- СОБЫТИЯ ----------
  { id:'cis-games', layer:'events', title:'II Игры стран СНГ', address:'2023 / 2026 · ЦОР',
    text:'Жлобин был выбран площадкой для проведения соревнований по самбо в Центре олимпийского резерва.',
    lat:52.8898, lng:30.0305, photo:'' },
  { id:'narmania', layer:'events', title:'Турнир памяти Шоты Нармания', address:'Ежегодно · греко-римская борьба',
    text:'Международный турнир по греко-римской борьбе. В 2026 году собрал 22 команды из Беларуси и России.',
    lat:52.8960, lng:30.0260, photo:'' },
  { id:'spartakiada', layer:'events', title:'Спартакиада Союзного государства', address:'Студенческие соревнования',
    text:'Жлобин принимал старт масштабных соревнований среди студентов Беларуси и России.',
    lat:52.8905, lng:30.0320, photo:'' }
];

const LAYER_LABELS = { objects:'Объект', people:'Спортсмен / команда', events:'Событие' };
const LAYER_EMOJI  = { objects:'🏟️', people:'🏆', events:'🎉' };

/* ============================================================
   КАРТА
   ============================================================ */

const map = L.map('mapContainer', {
  center: [52.8928, 30.0272],
  zoom: 15,
  scrollWheelZoom: true
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap',
  maxZoom: 19
}).addTo(map);

const markerMap = new Map();

function makeIcon(item) {
  return L.divIcon({
    className: '',
    html: `<div class="pin-marker pin-marker--${item.layer}"><span>${LAYER_EMOJI[item.layer]}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -34]
  });
}

function popupHTML(item) {
  const photo = item.photo
    ? `<img src="${item.photo}" alt="" style="width:100%;border-radius:8px;margin-bottom:8px;">`
    : '';
  return `
    <div style="min-width:220px;max-width:260px;font-family:inherit;">
      ${photo}
      <strong style="font-size:1rem;display:block;margin-bottom:4px;">${item.title}</strong>
      <small style="color:#64748b;">${item.address}</small>
      <p style="margin-top:8px;font-size:.9rem;line-height:1.5;">${item.text}</p>
    </div>`;
}

DATA.forEach(item => {
  const marker = L.marker([item.lat, item.lng], { icon: makeIcon(item) })
    .addTo(map)
    .bindPopup(popupHTML(item));
  markerMap.set(item.id, { marker, data: item });
});

/* ============================================================
   ФИЛЬТРЫ + ПОИСК
   ============================================================ */

let currentLayer = 'all';
let currentSearch = '';

function applyFilters() {
  let visible = 0;
  const q = currentSearch.trim().toLowerCase();

  markerMap.forEach(({ marker, data }) => {
    const layerOk = currentLayer === 'all' || data.layer === currentLayer;
    const searchOk = !q
      || data.title.toLowerCase().includes(q)
      || data.address.toLowerCase().includes(q)
      || data.text.toLowerCase().includes(q);

    const ok = layerOk && searchOk;
    if (ok) {
      if (!map.hasLayer(marker)) marker.addTo(map);
      visible++;
    } else {
      if (map.hasLayer(marker)) map.removeLayer(marker);
    }
  });

  document.getElementById('resultHint').innerHTML =
    `Показано точек: <strong>${visible}</strong> из ${DATA.length}`;

  renderAllCards();
}

document.querySelectorAll('.chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    currentLayer = btn.dataset.layer;
    applyFilters();
  });
});

document.getElementById('searchInput').addEventListener('input', (e) => {
  currentSearch = e.target.value;
  applyFilters();
});

/* ============================================================
   МОДАЛКА
   ============================================================ */

const modal = document.getElementById('modal');
const modalPhoto = document.getElementById('modalPhoto');
const modalBadge = document.getElementById('modalBadge');
const modalTitle = document.getElementById('modalTitle');
const modalText  = document.getElementById('modalText');
const modalMeta  = document.getElementById('modalMeta');

function openModal(item) {
  modalPhoto.innerHTML = item.photo
    ? `<img src="${item.photo}" alt="">`
    : LAYER_EMOJI[item.layer];
  modalBadge.textContent = LAYER_LABELS[item.layer];
  modalTitle.textContent = item.title;
  modalText.textContent  = item.text;
  modalMeta.textContent  = '📍 ' + item.address;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
modal.addEventListener('click', e => {
  if (e.target.dataset.close !== undefined) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ============================================================
   КАРТОЧКИ-СПИСКИ
   ============================================================ */

function cardHTML(item) {
  const img = item.photo
    ? `<img src="${item.photo}" alt="">`
    : LAYER_EMOJI[item.layer];
  return `
    <div class="card__img">${img}</div>
    <h3>${item.title}</h3>
    <p>${item.text}</p>
    <p class="card__meta">📍 ${item.address}</p>`;
}

function renderCards(layer, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const q = currentSearch.trim().toLowerCase();
  const items = DATA.filter(i => {
    if (i.layer !== layer) return false;
    if (currentLayer !== 'all' && i.layer !== currentLayer) return false;
    if (!q) return true;
    return i.title.toLowerCase().includes(q)
        || i.address.toLowerCase().includes(q)
        || i.text.toLowerCase().includes(q);
  });

  if (!items.length) {
    container.innerHTML = '<p style="color:var(--muted);grid-column:1/-1;">Ничего не найдено.</p>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card reveal';
    card.innerHTML = cardHTML(item);
    card.addEventListener('click', () => {
      map.setView([item.lat, item.lng], 17);
      markerMap.get(item.id).marker.openPopup();
      document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
    });
    container.appendChild(card);
  });

  observeReveal();
}

function renderAllCards() {
  renderCards('objects', 'objectsList');
  renderCards('people', 'peopleList');
  renderCards('events', 'eventsList');
}

/* ============================================================
   ТЕМА
   ============================================================ */

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('zhlobin-theme');
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
updateThemeIcon();

function updateThemeIcon() {
  themeToggle.textContent = document.documentElement.dataset.theme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  const cur = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = cur;
  localStorage.setItem('zhlobin-theme', cur);
  updateThemeIcon();
});

/* ============================================================
   МОБИЛЬНОЕ МЕНЮ
   ============================================================ */

const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

/* ============================================================
   REVEAL-АНИМАЦИЯ
   ============================================================ */

let io;
function observeReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }
  if (!io) {
    io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => io.observe(el));
}

/* ============================================================
   АНИМАЦИЯ СЧЁТЧИКОВ
   ============================================================ */

function animateCounters() {
  document.querySelectorAll('.stat__num').forEach(el => {
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.max(1, Math.round(target / 40));
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = cur;
    }, 30);
  });
}

/* ============================================================
   СТАРТ
   ============================================================ */

renderAllCards();
observeReveal();

// запуск счётчиков при первом появлении героя
const heroStats = document.querySelector('.hero__stats');
if (heroStats && 'IntersectionObserver' in window) {
  const statsIO = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        animateCounters();
        statsIO.disconnect();
      }
    });
  }, { threshold: 0.4 });
  statsIO.observe(heroStats);
} else {
  animateCounters();
}