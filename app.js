const app = document.getElementById("app");
const music = document.getElementById("music");

function screen(html) {
  app.innerHTML = html;
}
startScreen();

function startScreen() {
  screen(`
    <div class="card">
      <h1>Hey you 💖</h1>
      <input id="name" placeholder="Your name ❤️"/>
      <button onclick="enter()">Enter</button>
    </div>
  `);
}

function enter() {
  STATE.name = document.getElementById("name").value;
  music.play();
  choiceScreen();
}
function choiceScreen() {
  screen(`
    <div class="card">
      <h2>Pick what feels like us 💌</h2>
      <button onclick="choose('hug')">Hugs 🤗</button>
      <button onclick="choose('talk')">Late talks 🌙</button>
      <button onclick="choose('adventure')">Adventures ✨</button>
    </div>
  `);
}

function choose(c) {
  STATE.choices.push(c);
  gameScreen();
}
function gameScreen() {
  STATE.score = 0;
  screen(`
    <div class="card">
      <h2>Tap 10 hearts 💖</h2>
      <p id="count">0</p>
      <button onclick="tap()">💖</button>
    </div>
  `);
}

function tap() {
  STATE.score++;
  document.getElementById("count").innerText = STATE.score;
  navigator.vibrate?.(20);

  if (STATE.score >= 10) {
    STATE.unlocked.game = true;
    chatScreen();
  }
}function chatScreen() {
  screen(`
    <div class="card">
      <p><b>You:</b> Why me?</p>
      <button onclick="reply()">Reply ❤️</button>
    </div>
  `);
}

function reply() {
  STATE.unlocked.chat = true;
  puzzleScreen();
}
function puzzleScreen() {
  screen(`
    <div class="card">
      <p>Enter the word that describes us 🔐</p>
      <input id="pass"/>
      <button onclick="check()">Unlock</button>
    </div>
  `);
}

function check() {
  const val = document.getElementById("pass").value;
  if (val === SECRET_PASSWORD) {
    STATE.unlocked.puzzle = true;
    countdownScreen();
  } else {
    alert("Not quite 😏");
  }
}
function countdownScreen() {
  screen(`
    <div class="card">
      <h2>Our moment ⏳</h2>
      <p id="timer">Loading…</p>
    </div>
  `);

  startCountdown();
}
function startCountdown() {
  const target = new Date(COUNTDOWN_DATE).getTime();

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      clearInterval(interval);
      STATE.unlocked.countdown = true;
      finalScreen();
      return;
    }

    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff / (1000*60*60)) % 24);
    const m = Math.floor((diff / (1000*60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById("timer").innerText =
      `${d}d ${h}h ${m}m ${s}s`;
  }, 1000);
}
function finalScreen() {
  const trait = STORY[STATE.choices[0]];

  screen(`
    <div class="card">
      <h1>${STATE.name} 💖</h1>
      <p>${trait}</p>
      <p>Febbyyy ❤️</p>

<p>You’re the girl that I love the most.</p>

<p>You have been consistently on my mind for a year now.</p>

<p>You make me feel happy and safe.</p>

<p>Knowing you was the best thing that ever happened to me.</p>

<p>Whenever I think about you, I feel something I can’t explain ✨</p>

<p>Those eyes are like arrows of love,</p>

<p>piercing my little heart ❤️</p>

<p>Seeing you in the crowd,</p>

<p>with those dreamy hair and beautiful lips,</p>

<p>makes me fall for you again,</p>

<p>just like the first time I saw you.</p>

<p>Your smile melts my heart.</p>

<p>You make me the happiest.</p>

<p>So I am humbly asking you, my lady…</p>
      <h3>Will you be my Valentine? 🌹</h3>
      <button onclick="surprise()">🎁 Surprise</button>
    </div>
  `);
}

function surprise() {
  const msg = SURPRISES[Math.floor(Math.random() * SURPRISES.length)];
  alert(msg);
}