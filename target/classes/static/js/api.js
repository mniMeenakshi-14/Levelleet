/* Levelleet backend layer: login, sign up, progress sync, leaderboard.
   The game still works as a guest (localStorage only). Once logged in, every
   change is also saved to the Java/MySQL backend a moment later. */
(function () {
"use strict";

var BASE = String(window.LEVELLEET_API_BASE || '').replace(/\/+$/, '');
var TK = 'levelleet-token', UK = 'levelleet-user';
var root = document.getElementById('auth');

var token = '', user = '';
try { token = localStorage.getItem(TK) || ''; user = localStorage.getItem(UK) || ''; } catch (e) {}

var view = 'auth';      // 'auth' | 'board'
var mode = 'login';     // 'login' | 'register'
var busy = false;
var status = '';
var board = null;
var timer = 0, dirty = false, inflight = false;

var STAR = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 2l3.1 6.6 7.2.9-5.3 5 1.4 7.2L12 18.1 5.6 21.7 7 14.5 1.7 9.5l7.2-.9z" fill="#ffd23f" stroke="#d9a400" stroke-width="1.5" stroke-linejoin="round"/></svg>';

function $(id) { return document.getElementById(id); }
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function bridge() { return window.LevelleetBridge; }

/* ---------- Session ---------- */
function setSession(t, u) {
  token = t || ''; user = u || '';
  try {
    if (token) { localStorage.setItem(TK, token); localStorage.setItem(UK, user); }
    else { localStorage.removeItem(TK); localStorage.removeItem(UK); }
  } catch (e) {}
  if (bridge()) bridge().refresh();
}
function label() {
  if (!token) return 'Login';
  return user.length > 9 ? user.slice(0, 8) + '…' : user;
}

/* ---------- HTTP ---------- */
async function api(path, o) {
  o = o || {};
  var headers = { 'Content-Type': 'application/json' };
  var useAuth = o.auth !== false && token;
  if (useAuth) headers.Authorization = 'Bearer ' + token;
  var res;
  try {
    res = await fetch(BASE + path, {
      method: o.method || 'GET',
      headers: headers,
      body: o.body ? JSON.stringify(o.body) : undefined,
      keepalive: !!o.keepalive
    });
  } catch (e) {
    var ne = new Error('Cannot reach the server. Is the backend running?');
    ne.network = true;
    throw ne;
  }
  var data = null;
  try { data = await res.json(); } catch (e) {}
  if (!res.ok) {
    var err = new Error((data && data.error) || ('Request failed (' + res.status + ')'));
    err.status = res.status;
    if (res.status === 401 && useAuth) {      // token expired or revoked
      setSession('', '');
      status = '';
      if (!root.hidden) render();
    }
    throw err;
  }
  return data;
}

/* ---------- Progress sync ---------- */
function setStatus(t) {
  status = t;
  var el = $('au-status');
  if (el) el.textContent = t;
}
function schedule() {
  if (!token) return;
  dirty = true;
  clearTimeout(timer);
  timer = setTimeout(function () { flush(false); }, 1500);
}
async function flush(keepalive) {
  clearTimeout(timer);
  if (!token || !dirty || inflight) return;
  inflight = true; dirty = false;
  setStatus('Saving…');
  var failed = false;
  try {
    await api('/api/progress', { method: 'PUT', body: bridge().snapshot(), keepalive: !!keepalive });
    setStatus('Saved just now');
  } catch (e) {
    failed = true; dirty = !!token;
    setStatus(e.network ? 'Offline. Will retry.' : 'Could not save. Will retry.');
    if (token) timer = setTimeout(function () { flush(false); }, 15000);
  } finally {
    inflight = false;
    if (!failed && dirty && token) timer = setTimeout(function () { flush(false); }, 1500);
  }
}
/* After login: the server copy wins. A brand new account takes the local progress. */
async function pullOrPush() {
  var p = await api('/api/progress');
  if (p.exists) {
    dirty = false;
    bridge().apply(p);
    setStatus('Synced from your account');
  } else {
    dirty = true;
    await flush(false);
  }
}

/* ---------- Overlay ---------- */
function shell(inner) {
  root.innerHTML = '<div class="au-card" role="dialog" aria-modal="true">' +
    '<button class="au-x" data-act="authclose" aria-label="Close">×</button>' + inner + '</div>';
}
function setMsg(text, ok) {
  var el = $('au-msg');
  if (el) { el.textContent = text || ''; el.className = 'au-msg' + (ok ? ' ok' : ''); }
  var b = $('au-submit');
  if (b) b.disabled = busy;
}
function render() {
  if (view === 'board') return renderBoard();
  if (token) return renderAccount();
  renderForm();
}
function renderForm() {
  var reg = mode === 'register';
  shell(
    '<h2>' + (reg ? 'Join Levelleet' : 'Welcome back') + '</h2>' +
    '<p class="au-sub">' + (reg
      ? 'Make a free account to keep your stars, coins and streak on every device.'
      : 'Log in to load your stars, coins and streak.') + '</p>' +
    '<div class="au-tabs">' +
      '<button data-act="authtab" data-m="login" class="' + (!reg ? 'on' : '') + '">Log in</button>' +
      '<button data-act="authtab" data-m="register" class="' + (reg ? 'on' : '') + '">Sign up</button>' +
    '</div>' +
    '<form class="au-form" id="authform" autocomplete="on">' +
      '<label>Username<input id="au-user" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="20" required placeholder="3 to 20 letters, numbers, _"></label>' +
      '<label>Password<input id="au-pass" name="password" type="password" autocomplete="' + (reg ? 'new-password' : 'current-password') + '" maxlength="72" required placeholder="At least 6 characters"></label>' +
      '<p class="au-msg" id="au-msg" role="alert"></p>' +
      '<button class="btn" id="au-submit" type="submit">' + (reg ? 'Create account' : 'Log in') + '</button>' +
    '</form>' +
    '<div class="au-row"><button class="btn ghost small" data-act="authboard">Leaderboard</button></div>' +
    '<button class="au-link" data-act="authclose">Continue as guest</button>'
  );
  var u = $('au-user'); if (u && !('ontouchstart' in window)) u.focus();
}
function renderAccount() {
  shell(
    '<h2>Your account</h2>' +
    '<div class="au-who"><div class="au-av">' + esc(user.charAt(0).toUpperCase()) + '</div>' +
      '<div><b>' + esc(user) + '</b><span id="au-status">' + esc(status || 'Progress saves automatically') + '</span></div></div>' +
    '<div class="au-row">' +
      '<button class="btn grapeb" data-act="authboard">Leaderboard</button>' +
      '<button class="btn" data-act="authsync">Sync now</button>' +
    '</div>' +
    '<button class="btn ghost" data-act="authlogout">Log out</button>'
  );
}
async function renderBoard() {
  shell('<h2>Leaderboard</h2><p class="au-sub">Top players by stars.</p><div id="au-list" class="au-empty">Loading…</div>' +
    '<button class="btn ghost" data-act="authback">Back</button>');
  try {
    board = await api('/api/leaderboard?limit=20', { auth: false });
    var el = $('au-list'); if (!el) return;
    if (!board.length) { el.textContent = 'No players yet. Be the first!'; return; }
    el.className = '';
    el.innerHTML = '<ol class="au-board">' + board.map(function (r) {
      return '<li class="' + (token && r.username === user ? 'me' : '') + '">' +
        '<span class="au-rank">' + r.rank + '</span>' +
        '<span class="au-name">' + esc(r.username) + '<small>' + r.xp + ' XP</small></span>' +
        '<span class="au-stars">' + r.stars + STAR + '</span></li>';
    }).join('') + '</ol>';
  } catch (e) {
    var el2 = $('au-list'); if (el2) el2.textContent = e.message;
  }
}
function open(v) {
  view = v || 'auth';
  root.hidden = false;
  render();
}
function close() { root.hidden = true; }

/* ---------- Events ---------- */
document.addEventListener('click', async function (e) {
  if (e.target === root) { close(); return; }
  var t = e.target.closest('[data-act]');
  if (!t) return;
  switch (t.dataset.act) {
    case 'account': open('auth'); break;
    case 'authclose': close(); break;
    case 'authtab': mode = t.dataset.m; renderForm(); break;
    case 'authboard': view = 'board'; render(); break;
    case 'authback': view = 'auth'; render(); break;
    case 'authsync':
      setStatus('Syncing…');
      try { await flush(false); await pullOrPush(); } catch (err) { setStatus(err.message); }
      break;
    case 'authlogout':
      try { dirty = true; await flush(false); } catch (err) {}
      try { await api('/api/auth/logout', { method: 'POST' }); } catch (err) {}
      setSession('', ''); status = ''; dirty = false;
      bridge().reset();
      view = 'auth'; mode = 'login'; render();
      break;
  }
});

document.addEventListener('submit', async function (e) {
  if (e.target.id !== 'authform') return;
  e.preventDefault();
  if (busy) return;
  var u = $('au-user').value.trim().toLowerCase();
  var p = $('au-pass').value;
  if (!/^[a-z0-9_]{3,20}$/.test(u)) return setMsg('Username must be 3 to 20 letters, numbers or underscores.');
  if (p.length < 6) return setMsg('Password needs at least 6 characters.');
  busy = true; setMsg('Please wait…', true);
  try {
    var r = await api('/api/auth/' + mode, { method: 'POST', body: { username: u, password: p }, auth: false });
    setSession(r.token, r.username);
    try { await pullOrPush(); }
    catch (err) { dirty = true; setStatus('Could not sync yet. Will retry.'); schedule(); }
    busy = false;
    view = 'auth'; render();
  } catch (err) {
    busy = false; setMsg(err.message);
  }
});

document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !root.hidden) close(); });
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') flush(true);
});
window.addEventListener('pagehide', function () { flush(true); });

/* ---------- Boot ---------- */
window.LevelleetSync = { schedule: schedule, label: label, isLoggedIn: function () { return !!token; } };

if (token) {
  api('/api/auth/me')
    .then(function (r) { user = r.username; try { localStorage.setItem(UK, user); } catch (e) {} bridge().refresh(); return pullOrPush(); })
    .catch(function (err) { if (err.network) setStatus('Offline. Using saved progress.'); });
}
})();
