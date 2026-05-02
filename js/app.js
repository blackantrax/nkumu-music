/* ============================================================
   NKUMU MUSIC — App JavaScript
============================================================ */

/* ── Scroll-reveal ───────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('revealed'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-right').forEach((el, i) => {
  if (!el.dataset.delay) {
    const siblings = el.parentElement.querySelectorAll('.reveal, .reveal-right');
    const idx = Array.from(siblings).indexOf(el);
    el.dataset.delay = idx * 80;
  }
  revealObserver.observe(el);
});

/* ── Sticky Header ───────────────────────────────────────── */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Mobile Nav ──────────────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
navToggle?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  mobileNav.setAttribute('aria-hidden', String(!open));
});

/* ── Genre Tabs ──────────────────────────────────────────── */
const genreTabs = document.querySelectorAll('.genre-tab');
const artistCards = document.querySelectorAll('.artist-card');

genreTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    genreTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const genre = tab.dataset.genre;
    artistCards.forEach(card => {
      const match = genre === 'all' || card.dataset.genre === genre;
      card.style.display = match ? '' : 'none';
    });
  });
});

/* ── Artist Follow Buttons ───────────────────────────────── */
document.querySelectorAll('.artist-follow-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const following = btn.classList.toggle('following');
    btn.textContent = following ? 'Following' : 'Follow';
    const artistName = btn.closest('.artist-card')?.querySelector('.artist-name')?.textContent?.trim() || 'Artist';
    showToast(following ? `Following ${artistName}` : `Unfollowed ${artistName}`);
  });
});

/* ── Carousel Controls ───────────────────────────────────── */
const carousel = document.getElementById('artists-carousel');
document.getElementById('carousel-prev')?.addEventListener('click', () => {
  carousel?.scrollBy({ left: -230, behavior: 'smooth' });
});
document.getElementById('carousel-next')?.addEventListener('click', () => {
  carousel?.scrollBy({ left: 230, behavior: 'smooth' });
});

/* ── Track Like Buttons ──────────────────────────────────── */
document.querySelectorAll('.track-btn[aria-label="Like"]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('liked');
  });
});

/* ── Track Play Buttons ──────────────────────────────────── */
const trackData = [
  { title: 'Douala Nights', artist: 'Parfait Mbongo', duration: '4:23', art: 'linear-gradient(135deg,#FCD116,#8B6914)', durationSec: 263 },
  { title: 'Ma Mère', artist: 'Grace Eyenga', duration: '5:01', art: 'linear-gradient(135deg,#00A854,#004A25)', durationSec: 301 },
  { title: 'Kamer Vibes', artist: 'DJ Kamer', duration: '3:45', art: 'linear-gradient(135deg,#CE1126,#6B0813)', durationSec: 225 },
  { title: 'Bikutsi Queen', artist: 'Sylvie Bikutsi', duration: '4:10', art: 'linear-gradient(135deg,#7B2FBE,#3A1460)', durationSec: 250 },
  { title: 'Rue de Mboppi', artist: 'MC Douala', duration: '3:20', art: 'linear-gradient(135deg,#0A6E8A,#04303D)', durationSec: 200 },
];

document.querySelectorAll('.track-play').forEach((btn, i) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const track = trackData[i] || trackData[0];
    loadTrack(track);
  });
});

document.querySelectorAll('.chart-track').forEach((row, i) => {
  row.addEventListener('click', () => {
    const track = trackData[i] || trackData[0];
    loadTrack(track);
  });
});

/* ── How It Works Tabs ───────────────────────────────────── */
const howTabs = document.querySelectorAll('.how-tab');
howTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    howTabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.how-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(`tab-${tab.dataset.tab}`);
    target?.classList.add('active');
    target?.querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('revealed');
      setTimeout(() => el.classList.add('revealed'), 50);
    });
  });
});

/* ── Pricing Toggle ──────────────────────────────────────── */
const pricingToggle = document.getElementById('pricing-toggle');
const toggleMonthly = document.getElementById('toggle-monthly');
const toggleAnnual = document.getElementById('toggle-annual');
let isAnnual = false;

pricingToggle?.addEventListener('click', () => {
  isAnnual = !isAnnual;
  pricingToggle.classList.toggle('on', isAnnual);
  toggleMonthly.classList.toggle('active', !isAnnual);
  toggleAnnual.classList.toggle('active', isAnnual);

  document.querySelectorAll('.price-val').forEach(el => {
    const monthly = parseInt(el.dataset.monthly);
    const annual = parseInt(el.dataset.annual);
    const val = isAnnual ? annual : monthly;
    el.textContent = val.toLocaleString();
  });
});

/* ── Countdown Timer ─────────────────────────────────────── */
function startCountdown(targetDays) {
  const target = new Date();
  target.setDate(target.getDate() + targetDays);

  function update() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) return;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    const days = document.getElementById('c1-days');
    const hours = document.getElementById('c1-hours');
    const mins = document.getElementById('c1-min');
    const secs = document.getElementById('c1-sec');
    if (days) days.textContent = String(d).padStart(2, '0');
    if (hours) hours.textContent = String(h).padStart(2, '0');
    if (mins) mins.textContent = String(m).padStart(2, '0');
    if (secs) secs.textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}
startCountdown(15);

/* ── Music Player ────────────────────────────────────────── */
let isPlaying = false;
let currentSec = 0;
let totalSec = 263;
let progressInterval = null;

const playerTitle = document.getElementById('player-title');
const playerArtist = document.getElementById('player-artist');
const playerArt = document.getElementById('player-art');
const playerFill = document.getElementById('player-fill');
const playerThumb = document.getElementById('player-thumb');
const playerCurrent = document.getElementById('player-current');
const playerTotal = document.getElementById('player-total');
const btnPlay = document.getElementById('btn-play');
const playerBar = document.getElementById('player-bar');

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function loadTrack(track) {
  if (playerTitle) playerTitle.textContent = track.title;
  if (playerArtist) playerArtist.textContent = track.artist;
  if (playerArt) playerArt.style.background = track.art;
  if (playerTotal) playerTotal.textContent = track.duration;
  totalSec = track.durationSec;
  currentSec = 0;
  updateProgress();
  startPlayback();
  showToast(`Now playing: ${track.title}`);
}

function startPlayback() {
  isPlaying = true;
  updatePlayBtn();
  clearInterval(progressInterval);
  progressInterval = setInterval(() => {
    currentSec = Math.min(currentSec + 1, totalSec);
    updateProgress();
    if (currentSec >= totalSec) {
      isPlaying = false;
      updatePlayBtn();
      clearInterval(progressInterval);
    }
  }, 1000);
}

function updateProgress() {
  const pct = totalSec > 0 ? (currentSec / totalSec) * 100 : 0;
  if (playerFill) playerFill.style.width = pct + '%';
  if (playerThumb) playerThumb.style.left = pct + '%';
  if (playerCurrent) playerCurrent.textContent = formatTime(currentSec);
}

function updatePlayBtn() {
  const playIcon = btnPlay?.querySelector('.icon-play');
  const pauseIcon = btnPlay?.querySelector('.icon-pause');
  if (playIcon) playIcon.style.display = isPlaying ? 'none' : '';
  if (pauseIcon) pauseIcon.style.display = isPlaying ? '' : 'none';
}

btnPlay?.addEventListener('click', () => {
  isPlaying = !isPlaying;
  updatePlayBtn();
  if (isPlaying) {
    progressInterval = setInterval(() => {
      currentSec = Math.min(currentSec + 1, totalSec);
      updateProgress();
      if (currentSec >= totalSec) {
        isPlaying = false;
        updatePlayBtn();
        clearInterval(progressInterval);
      }
    }, 1000);
  } else {
    clearInterval(progressInterval);
  }
});

document.getElementById('btn-next')?.addEventListener('click', () => {
  const current = trackData.findIndex(t => t.title === playerTitle?.textContent);
  const next = trackData[(current + 1) % trackData.length];
  loadTrack(next);
});

document.getElementById('btn-prev')?.addEventListener('click', () => {
  if (currentSec > 3) {
    currentSec = 0; updateProgress(); return;
  }
  const current = trackData.findIndex(t => t.title === playerTitle?.textContent);
  const prev = trackData[(current - 1 + trackData.length) % trackData.length];
  loadTrack(prev);
});

playerBar?.addEventListener('click', (e) => {
  const rect = playerBar.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  currentSec = Math.round(ratio * totalSec);
  updateProgress();
});

/* Player like */
const playerLike = document.getElementById('player-like');
playerLike?.addEventListener('click', () => {
  const liked = playerLike.classList.toggle('liked');
  showToast(liked ? 'Added to your liked songs' : 'Removed from liked songs');
});

/* ── Pre-order Buttons ───────────────────────────────────── */
document.querySelectorAll('.preorder-actions .btn-primary, .preorder-info .btn-sm').forEach(btn => {
  if (btn.textContent.includes('Pre-Order') || btn.textContent.includes('Pre-order')) {
    btn.addEventListener('click', () => {
      const albumName = btn.closest('.preorder-card')?.querySelector('h3')?.textContent || 'this album';
      showToast(`Pre-order confirmed for "${albumName}"!`);
      btn.textContent = 'Pre-Ordered ✓';
      btn.style.background = 'var(--green-light)';
      btn.style.borderColor = 'var(--green-light)';
    });
  }
});

/* ── CAMAS Vote Button ───────────────────────────────────── */
document.querySelector('.btn-gold')?.addEventListener('click', (e) => {
  e.preventDefault();
  showToast('CAMAS voting opens December 1st — register now!');
});

/* ── Toast ───────────────────────────────────────────────── */
const toastEl = document.getElementById('toast');
let toastTimer = null;

function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

/* ── Smooth anchor scroll ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (mobileNav?.classList.contains('open')) {
      mobileNav.classList.remove('open');
      navToggle?.classList.remove('open');
    }
  });
});

/* ── Init: trigger player to start with track 1 ─────────── */
updateProgress();
